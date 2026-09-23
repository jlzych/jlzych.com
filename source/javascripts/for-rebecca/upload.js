// Uploads a recording to the Worker in parts (R2 multipart upload), so any
// length of recording fits under the Worker's per-request size limit and a
// dropped connection only retries one part.
//
// An Upload can be run again after it fails; it picks up where it left off.

import { WORKER_URL, PART_SIZE } from "./config.js";

const ATTEMPTS = 4;

export class Upload {
  constructor({ recording, session, question, name, token }) {
    this.recording = recording;
    this.session = session;
    this.question = question;
    this.name = name;
    this.token = token;

    this.total = recording.blob.size;
    this.status = "pending";
    this.completedParts = [];
    this.inFlight = 0;
    this.listeners = new Set();
  }

  get loaded() {
    const done = this.completedParts.reduce((sum, part) => sum + part.size, 0);
    return Math.min(this.total, done + this.inFlight);
  }

  onChange(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  #emit() {
    for (const listener of this.listeners) listener(this);
  }

  // Starts (or resumes) the upload. Returns the same promise if it's already
  // running.
  run() {
    if (this.status === "done") return Promise.resolve();
    if (this.status === "uploading") return this.promise;

    this.status = "uploading";
    this.#emit();
    this.promise = this.#upload().then(
      () => {
        this.status = "done";
        this.#emit();
      },
      (error) => {
        this.status = "error";
        this.error = error;
        this.inFlight = 0;
        this.#emit();
        throw error;
      },
    );
    return this.promise;
  }

  async #upload() {
    const { blob, mimeType, duration } = this.recording;
    if (!blob.size) throw new Error("The recording is empty");

    if (!this.uploadId) {
      const created = await withRetry(() =>
        this.#request("POST", "create", null, {
          "Content-Type": mimeType || blob.type,
          "X-Friend-Name": encodeURIComponent(this.name),
          "X-Duration": String(duration || ""),
        }),
      );
      this.uploadId = created.uploadId;
      this.key = created.key;
    }

    const partCount = Math.ceil(blob.size / PART_SIZE);
    for (let partNumber = 1; partNumber <= partCount; partNumber++) {
      if (this.completedParts.some((part) => part.partNumber === partNumber)) continue;

      const start = (partNumber - 1) * PART_SIZE;
      const chunk = blob.slice(start, Math.min(start + PART_SIZE, blob.size));
      const part = await withRetry(() => this.#sendPart(partNumber, chunk));
      this.completedParts.push({ partNumber, etag: part.etag, size: chunk.size });
      this.inFlight = 0;
      this.#emit();
    }

    await withRetry(() =>
      this.#request(
        "POST",
        "complete",
        JSON.stringify(this.completedParts.map(({ partNumber, etag }) => ({ partNumber, etag }))),
        { "Content-Type": "application/json" },
      ),
    );
  }

  #url(action, extra = {}) {
    const params = new URLSearchParams({ action, ...extra });
    if (this.uploadId) {
      params.set("uploadId", this.uploadId);
      params.set("key", this.key);
    }
    return `${WORKER_URL}/upload/${this.session}/${this.question}?${params}`;
  }

  async #request(method, action, body, headers) {
    const response = await fetch(this.#url(action), {
      method,
      body,
      headers: { Authorization: `Bearer ${this.token}`, ...headers },
    });
    if (!response.ok) throw await httpError(response.status, response.text());
    return response.json();
  }

  // XHR rather than fetch: it's the only way to get upload progress.
  #sendPart(partNumber, chunk) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", this.#url("part", { part: partNumber }));
      xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
      xhr.responseType = "json";
      xhr.upload.addEventListener("progress", (event) => {
        this.inFlight = event.loaded;
        this.#emit();
      });
      xhr.addEventListener("load", async () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
        else reject(await httpError(xhr.status, JSON.stringify(xhr.response)));
      });
      xhr.addEventListener("error", () => {
        this.inFlight = 0;
        reject(new Error("Network error"));
      });
      xhr.send(chunk);
    });
  }
}

async function httpError(status, bodyPromise) {
  const error = new Error(`Upload failed (${status}): ${await bodyPromise}`);
  error.status = status;
  return error;
}

// Retries network hiccups and server errors with backoff; gives up right
// away on errors retrying can't fix (bad token, bad request).
async function withRetry(task) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await task();
    } catch (error) {
      const permanent = error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429;
      if (permanent || attempt >= ATTEMPTS) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
    }
  }
}
