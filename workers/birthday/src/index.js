// Receives birthday recordings from /for-rebecca/ and serves them back to the
// gallery at /for-rebecca/gallery/.
//
// Uploads use R2's multipart API so recordings can be any length: the browser
// slices each recording into 10MB parts and sends them one request at a time,
// which keeps every request well under the Worker's 100MB body limit.
//
// Routes:
//   POST   /upload/:session/:question?action=create            → { uploadId, key }
//   PUT    /upload/:session/:question?action=part&uploadId&part → { partNumber, etag }
//   POST   /upload/:session/:question?action=complete&uploadId  → { key, size }
//   GET    /check                               → 204 if the invite key is valid
//   GET    /list                         (admin) → friends with their clips
//   GET    /file/recordings/…            (admin) → the clip, with Range support
//   DELETE /file/recordings/…            (admin) → removes a clip (for test data)
//
// Uploads need UPLOAD_TOKEN; everything else needs ADMIN_TOKEN. Either can be
// sent as `Authorization: Bearer …` or as `?t=…` (media elements can't send
// headers).

const QUESTIONS = new Set(["met", "memory"]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_PART_BYTES = 20 * 1024 * 1024;

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    let response;
    try {
      response = await route(request, env);
    } catch (err) {
      console.error(err);
      response = json({ error: "Something went wrong" }, 500);
    }

    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(cors)) headers.set(name, value);
    return new Response(response.body, { status: response.status, headers });
  },
};

async function route(request, env) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);

  if (parts[0] === "upload" && parts.length === 3) {
    if (!(await authorized(request, url, env.UPLOAD_TOKEN))) return unauthorized();
    return handleUpload(request, url, env, parts[1], parts[2]);
  }

  // Lets the recorder reject a bad invite link before anyone records.
  if (parts[0] === "check" && request.method === "GET") {
    if (!(await authorized(request, url, env.UPLOAD_TOKEN))) return unauthorized();
    return new Response(null, { status: 204 });
  }

  if (parts[0] === "list" && request.method === "GET") {
    if (!(await authorized(request, url, env.ADMIN_TOKEN))) return unauthorized();
    return handleList(env);
  }

  if (parts[0] === "file" && parts[1] === "recordings") {
    if (!(await authorized(request, url, env.ADMIN_TOKEN))) return unauthorized();
    const key = parts.slice(1).map(decodeURIComponent).join("/");
    if (request.method === "GET" || request.method === "HEAD") {
      return handleFile(request, url, env, key);
    }
    if (request.method === "DELETE") {
      await env.BUCKET.delete(key);
      return json({ deleted: key });
    }
  }

  return json({ error: "Not found" }, 404);
}

/* ---------------------------------------------------------------------------
   Uploads
   ------------------------------------------------------------------------ */

async function handleUpload(request, url, env, session, question) {
  if (!UUID.test(session) || !QUESTIONS.has(question)) {
    return json({ error: "Bad session or question" }, 400);
  }

  const action = url.searchParams.get("action");

  if (action === "create" && request.method === "POST") {
    const mimeType = (request.headers.get("Content-Type") || "").toLowerCase();
    const baseType = mimeType.split(";")[0].trim();
    if (!/^(video|audio)\/[a-z0-9.+-]+$/.test(baseType)) {
      return json({ error: "Recordings must be video or audio" }, 415);
    }

    const name = decodeHeader(request.headers.get("X-Friend-Name")).slice(0, 100);
    if (!name) return json({ error: "Missing name" }, 400);

    const key = `recordings/${session}/${question}.${extensionFor(baseType)}`;
    const upload = await env.BUCKET.createMultipartUpload(key, {
      httpMetadata: { contentType: baseType },
      customMetadata: {
        name,
        question,
        kind: baseType.startsWith("video/") ? "video" : "audio",
        mimeType,
        duration: String(Number(request.headers.get("X-Duration")) || ""),
        createdAt: new Date().toISOString(),
      },
    });
    return json({ uploadId: upload.uploadId, key });
  }

  const uploadId = url.searchParams.get("uploadId");
  const key = url.searchParams.get("key");
  if (!uploadId || !key || !key.startsWith(`recordings/${session}/${question}.`)) {
    return json({ error: "Missing upload" }, 400);
  }
  const upload = env.BUCKET.resumeMultipartUpload(key, uploadId);

  if (action === "part" && request.method === "PUT") {
    const partNumber = Number(url.searchParams.get("part"));
    const length = Number(request.headers.get("Content-Length"));
    if (!Number.isInteger(partNumber) || partNumber < 1 || partNumber > 10000) {
      return json({ error: "Bad part number" }, 400);
    }
    if (!length || length > MAX_PART_BYTES) {
      return json({ error: "Part too large" }, 413);
    }
    const part = await upload.uploadPart(partNumber, request.body);
    return json({ partNumber: part.partNumber, etag: part.etag });
  }

  if (action === "complete" && request.method === "POST") {
    const uploadedParts = await request.json();
    const object = await upload.complete(uploadedParts);
    return json({ key: object.key, size: object.size });
  }

  return json({ error: "Unknown action" }, 400);
}

function extensionFor(baseType) {
  const known = {
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/quicktime": "mov",
    "video/x-matroska": "mkv",
    "audio/mp4": "m4a",
    "audio/x-m4a": "m4a",
    "audio/aac": "aac",
    "audio/webm": "webm",
    "audio/ogg": "ogg",
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/x-wav": "wav",
  };
  return known[baseType] || "bin";
}

/* ---------------------------------------------------------------------------
   Gallery
   ------------------------------------------------------------------------ */

async function handleList(env) {
  const friends = new Map();
  let cursor;

  do {
    const page = await env.BUCKET.list({
      prefix: "recordings/",
      include: ["customMetadata", "httpMetadata"],
      cursor,
    });

    for (const object of page.objects) {
      const [, session] = object.key.split("/");
      const meta = object.customMetadata || {};
      if (!friends.has(session)) {
        friends.set(session, { session, name: meta.name, createdAt: meta.createdAt, clips: {} });
      }
      const friend = friends.get(session);
      if (meta.createdAt && meta.createdAt < friend.createdAt) friend.createdAt = meta.createdAt;
      friend.clips[meta.question] = {
        key: object.key,
        kind: meta.kind,
        mimeType: meta.mimeType || object.httpMetadata?.contentType,
        duration: Number(meta.duration) || null,
        size: object.size,
      };
    }

    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  const list = [...friends.values()].sort((a, b) =>
    (a.createdAt || "").localeCompare(b.createdAt || ""),
  );
  return json({ friends: list });
}

async function handleFile(request, url, env, key) {
  if (request.method === "HEAD") {
    const head = await env.BUCKET.head(key);
    if (!head) return json({ error: "Not found" }, 404);
    return new Response(null, { headers: fileHeaders(head, url) });
  }

  // Safari won't play (or scrub) media unless the server honors Range requests.
  // The size is needed to resolve open-ended ranges, so look it up first.
  const head = await env.BUCKET.head(key);
  if (!head) return json({ error: "Not found" }, 404);

  const range = parseRange(request.headers.get("Range"), head.size);
  if (range === "unsatisfiable") {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${head.size}` },
    });
  }

  const object = await env.BUCKET.get(key, range ? { range } : {});
  if (!object) return json({ error: "Not found" }, 404);
  const headers = fileHeaders(object, url);

  if (range) {
    const end = range.offset + range.length - 1;
    headers.set("Content-Range", `bytes ${range.offset}-${end}/${object.size}`);
    headers.set("Content-Length", String(range.length));
    return new Response(object.body, { status: 206, headers });
  }

  headers.set("Content-Length", String(object.size));
  return new Response(object.body, { headers });
}

// Parses a single "bytes=start-end", "bytes=start-" or "bytes=-suffix" range
// into { offset, length }. Returns null for no (or multi-part) range.
function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec((header || "").trim());
  if (!match || (!match[1] && !match[2])) return null;

  let start;
  let end;
  if (!match[1]) {
    const suffix = Math.min(Number(match[2]), size);
    start = size - suffix;
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  }

  if (start >= size || end < start) return "unsatisfiable";
  return { offset: start, length: end - start + 1 };
}

function fileHeaders(object, url) {
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "private, max-age=3600");

  if (url.searchParams.has("download")) {
    const meta = object.customMetadata || {};
    const label = meta.question === "met" ? "how we met" : "favorite memory";
    const ext = object.key.split(".").pop();
    const filename = `${meta.name || "Friend"} - ${label}.${ext}`.replace(/["\\/]/g, "");
    headers.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
  }
  return headers;
}

/* ---------------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------------ */

async function authorized(request, url, secret) {
  if (!secret) return false;
  const header = request.headers.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : url.searchParams.get("t") || "";
  const a = new TextEncoder().encode(token);
  const b = new TextEncoder().encode(secret);
  return a.byteLength === b.byteLength && crypto.subtle.timingSafeEqual(a, b);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim());
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Friend-Name, X-Duration, Range",
    "Access-Control-Expose-Headers": "ETag, Content-Length, Content-Range, Accept-Ranges",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function decodeHeader(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function unauthorized() {
  return json({ error: "Unauthorized" }, 401);
}
