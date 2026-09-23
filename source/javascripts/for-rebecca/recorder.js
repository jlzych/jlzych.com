// Wraps getUserMedia + MediaRecorder.
//
// The container format is picked at runtime: mp4 first, because it plays
// everywhere (including on Rebecca's iPhone), then WebM for browsers that
// can't record mp4 (Firefox, older Chrome).

const VIDEO_TYPES = [
  "video/mp4;codecs=avc1,mp4a.40.2",
  "video/mp4",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

const AUDIO_TYPES = [
  "audio/mp4;codecs=mp4a.40.2",
  "audio/mp4",
  "audio/webm;codecs=opus",
  "audio/webm",
];

export function canRecord() {
  return Boolean(
    window.isSecureContext &&
      navigator.mediaDevices?.getUserMedia &&
      typeof window.MediaRecorder === "function",
  );
}

function pickMimeType(kind) {
  const candidates = kind === "video" ? VIDEO_TYPES : AUDIO_TYPES;
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

// Must be called from a tap/click — iOS only grants access in a user gesture.
export function openStream(kind) {
  const audio = { echoCancellation: true, noiseSuppression: true, autoGainControl: true };
  const video =
    kind === "video"
      ? { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }
      : false;
  return navigator.mediaDevices.getUserMedia({ audio, video });
}

export function closeStream(stream) {
  stream?.getTracks().forEach((track) => track.stop());
}

export class Recording {
  constructor(stream, kind) {
    this.stream = stream;
    this.kind = kind;
    this.chunks = [];
    this.startedAt = 0;
    this.stoppedAt = 0;
  }

  start() {
    const mimeType = pickMimeType(this.kind);
    const options = { audioBitsPerSecond: 128_000 };
    if (this.kind === "video") options.videoBitsPerSecond = 2_000_000;
    if (mimeType) options.mimeType = mimeType;

    this.recorder = new MediaRecorder(this.stream, options);
    this.recorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) this.chunks.push(event.data);
    });

    this.done = new Promise((resolve, reject) => {
      this.recorder.addEventListener("stop", () => resolve(this.#result(mimeType)));
      this.recorder.addEventListener("error", (event) => reject(event.error || event));
    });

    // Ask for data every second, so an interrupted recording still keeps
    // everything up to that point.
    this.recorder.start(1000);
    this.startedAt = performance.now();
  }

  get elapsed() {
    if (!this.startedAt) return 0;
    return ((this.stoppedAt || performance.now()) - this.startedAt) / 1000;
  }

  stop() {
    if (this.recorder && this.recorder.state !== "inactive") {
      this.stoppedAt = performance.now();
      this.recorder.stop();
    }
    return this.done;
  }

  #result(requestedType) {
    const fallback = this.kind === "video" ? "video/webm" : "audio/webm";
    const mimeType = this.recorder.mimeType || requestedType || this.chunks[0]?.type || fallback;
    return {
      blob: new Blob(this.chunks, { type: mimeType }),
      mimeType,
      kind: this.kind,
      duration: Math.round(this.elapsed),
    };
  }
}

// Keeps the screen on during long recordings and uploads. Silently does
// nothing where the Wake Lock API isn't available.
export class ScreenAwake {
  async hold() {
    if (this.lock || !("wakeLock" in navigator)) return;
    try {
      this.lock = await navigator.wakeLock.request("screen");
      this.lock.addEventListener("release", () => (this.lock = null));
    } catch {
      this.lock = null;
    }
  }

  release() {
    this.lock?.release().catch(() => {});
    this.lock = null;
  }
}
