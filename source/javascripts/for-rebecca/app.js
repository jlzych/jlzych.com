// The birthday recorder: welcome → question 1 → question 2 → thank you.
//
// Each question moves through phases on the same screen:
//   choose → countdown → recording → review → (save) → next question
// Saving starts that answer's upload in the background, so friends move on
// right away; the finishing screen waits for any uploads still running.

import { QUESTIONS, WORKER_URL } from "./config.js";
import { canRecord, openStream, closeStream, Recording, ScreenAwake } from "./recorder.js";
import { createAudioContext, LevelMeter } from "./waveform.js";
import { Upload } from "./upload.js";
import { burst } from "./confetti.js";
import { formatTime, fixInfiniteDuration } from "./media.js";
import "./gift.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const el = {
  screens: $$("[data-screen]"),
  question: $('[data-screen="question"]'),
  nameForm: $("[data-name-form]"),
  unsupportedNotice: $("[data-unsupported-notice]"),
  inappText: $("[data-inapp-text]"),
  copyLink: $("[data-copy-link]"),
  stepNumber: $("[data-step-number]"),
  questionText: $("[data-question-text]"),
  questionHint: $("[data-question-hint]"),
  recordButtons: $$("[data-record]"),
  fileInputs: $$("[data-file-input]"),
  stage: $("[data-stage]"),
  preview: $("[data-preview]"),
  wave: $("[data-wave]"),
  meter: $("[data-meter]"),
  countdown: $("[data-countdown]"),
  recLabel: $("[data-rec-label]"),
  recTime: $("[data-rec-time]"),
  stop: $("[data-stop]"),
  cancel: $("[data-cancel]"),
  reviewStage: $("[data-review-stage]"),
  reviewVideo: $("[data-review-video]"),
  reviewAudio: $("[data-review-audio]"),
  rerecord: $("[data-rerecord]"),
  save: $("[data-save]"),
  saveLabel: $("[data-save-label]"),
  progress: $("[data-progress]"),
  progressBar: $("[data-progress-bar]"),
  finishingTitle: $("[data-finishing-title]"),
  finishingText: $("[data-finishing-text]"),
  uploadError: $("[data-upload-error]"),
  retry: $("[data-retry]"),
  downloads: $("[data-downloads]"),
  doneName: $("[data-done-name]"),
  celebrate: $("[data-celebrate]"),
  deniedTitle: $("[data-denied-title]"),
  deniedText: $("[data-denied-text]"),
  deniedRetry: $("[data-denied-retry]"),
  confetti: $(".fr-confetti"),
};

const state = {
  token: new URLSearchParams(location.search).get("k"),
  session: uuid(),
  name: "",
  step: 0,
  kind: null, // "video" | "audio"
  stream: null,
  meter: null,
  recording: null,
  result: null, // the recording being reviewed
  reviewUrl: null,
  uploads: [],
  countdownAbort: null,
  timer: 0,
};

const awake = new ScreenAwake();

// crypto.randomUUID is missing on iOS before 15.4.
function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  );
}
const supported = canRecord();

/* ---------------------------------------------------------------------------
   Screens & phases
   ------------------------------------------------------------------------ */

function showScreen(name) {
  for (const screen of el.screens) screen.hidden = screen.dataset.screen !== name;
  window.scrollTo(0, 0);
  const heading = $(`[data-screen="${name}"] h1`);
  heading?.focus({ preventScroll: true });
}

function setPhase(phase) {
  el.question.dataset.phase = phase;
}

function renderQuestion() {
  const question = QUESTIONS[state.step];
  el.question.dataset.step = String(state.step + 1);
  el.stepNumber.textContent = state.step + 1;
  el.questionText.textContent = question.text;
  el.questionHint.textContent = question.hint;
  el.saveLabel.textContent = state.step === QUESTIONS.length - 1 ? "Save & finish" : "Save & next";

  // On question 2, suggest whatever they used for question 1.
  for (const button of el.recordButtons) {
    button.classList.toggle("is-suggested", button.dataset.record === state.kind);
  }

  setPhase("choose");
  showScreen("question");
}

/* ---------------------------------------------------------------------------
   Welcome
   ------------------------------------------------------------------------ */

function initWelcome() {
  if (!state.token) {
    showScreen("badlink");
    return;
  }

  // Catch a wrong or truncated link now, not after they've recorded. If the
  // check itself can't connect, let them carry on; uploads retry later.
  fetch(`${WORKER_URL}/check`, { headers: { Authorization: `Bearer ${state.token}` } })
    .then((response) => {
      if (response.status === 401) showScreen("badlink");
    })
    .catch(() => {});

  if (!supported) {
    el.unsupportedNotice.hidden = false;
    const inApp = /Instagram|FBAN|FBAV|FB_IAB|Messenger|Snapchat|TikTok|Line\//i.test(navigator.userAgent);
    if (inApp) {
      el.inappText.textContent =
        "Looks like you opened this inside another app. Tap the ••• menu and choose “Open in browser” (or copy the link into Safari or Chrome).";
    }
  }

  el.copyLink.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      el.copyLink.querySelector("span").textContent = "Copied!";
    } catch {
      window.prompt("Copy this link:", location.href);
    }
  });

  el.nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(el.nameForm).get("name").trim();
    if (!name) return;
    state.name = name;
    renderQuestion();
  });

  showScreen("welcome");
}

/* ---------------------------------------------------------------------------
   Recording
   ------------------------------------------------------------------------ */

async function startRecording(kind) {
  state.kind = kind;

  // Without MediaRecorder, hand off to the phone's own camera / recorder.
  if (!supported) {
    $(`[data-file-input="${kind}"]`).click();
    return;
  }

  // Must happen before the first await so iOS treats it as part of the tap.
  const audioContext = kind === "audio" ? createAudioContext() : null;

  releaseMedia();
  try {
    state.stream = await openStream(kind);
  } catch (error) {
    audioContext?.close();
    showPermissionProblem(error, kind);
    return;
  }

  el.stage.dataset.kind = kind;
  el.recLabel.textContent = kind === "video" ? "Recording video" : "Recording audio";

  if (kind === "video") {
    el.preview.srcObject = state.stream;
    el.preview.play().catch(() => {});
  } else if (audioContext) {
    state.meter = new LevelMeter({
      context: audioContext,
      stream: state.stream,
      canvas: el.wave,
      onLevel: (level) => el.meter.style.setProperty("--level", level.toFixed(3)),
    });
  }

  awake.hold();
  setPhase("countdown");

  const finished = await countdown();
  if (!finished) return;

  state.recording = new Recording(state.stream, kind);
  try {
    state.recording.start();
  } catch (error) {
    console.error(error);
    releaseMedia();
    showPermissionProblem(error, kind);
    return;
  }

  setPhase("recording");
  el.recTime.textContent = "0:00";
  state.timer = setInterval(() => {
    el.recTime.textContent = formatTime(state.recording.elapsed);
  }, 250);
}

// 3-2-1. Resolves false if cancelled.
function countdown() {
  const abort = new AbortController();
  state.countdownAbort = abort;

  return new Promise((resolve) => {
    let count = 3;
    const show = () => {
      el.countdown.textContent = count;
      // Restart the pop animation for each number.
      el.countdown.classList.remove("is-ticking");
      void el.countdown.offsetWidth;
      el.countdown.classList.add("is-ticking");
    };
    show();

    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) return show();
      clearInterval(interval);
      el.countdown.textContent = "";
      state.countdownAbort = null;
      resolve(true);
    }, 1000);

    abort.signal.addEventListener("abort", () => {
      clearInterval(interval);
      el.countdown.textContent = "";
      resolve(false);
    });
  });
}

async function stopRecording() {
  if (!state.recording) return;
  clearInterval(state.timer);
  el.stop.disabled = true;

  try {
    const result = await state.recording.stop();
    state.recording = null;
    releaseMedia();
    if (!result.blob.size) {
      alert("Hmm, that recording came out empty. Mind trying again?");
      setPhase("choose");
      return;
    }
    showReview(result);
  } finally {
    el.stop.disabled = false;
  }
}

function cancelRecording() {
  state.countdownAbort?.abort();
  state.countdownAbort = null;
  clearInterval(state.timer);
  state.recording?.stop().catch(() => {});
  state.recording = null;
  releaseMedia();
  setPhase("choose");
}

// Turns the camera light off and stops the level meter.
function releaseMedia() {
  state.meter?.stop();
  state.meter = null;
  closeStream(state.stream);
  state.stream = null;
  el.preview.srcObject = null;
  el.stage.style.removeProperty("--aspect");
  awake.release();
}

function showPermissionProblem(error, kind) {
  const what = kind === "video" ? "camera & microphone" : "microphone";
  if (error?.name === "NotFoundError" || error?.name === "OverconstrainedError") {
    el.deniedTitle.textContent = `We couldn't find a ${kind === "video" ? "camera" : "microphone"}`;
    el.deniedText.textContent =
      "Make sure one is connected and not being used by another app, then try again. Or upload a clip instead.";
  } else if (error?.name === "NotReadableError") {
    el.deniedTitle.textContent = `Your ${what} is busy`;
    el.deniedText.textContent =
      "Another app (like FaceTime or Zoom) may be using it. Close it and try again.";
  } else {
    el.deniedTitle.textContent = `We need your ${what}`;
    el.deniedText.textContent = "It looks like access was blocked. To turn it back on:";
  }
  showScreen("denied");
}

// Match the preview box to the camera's real shape — portrait on phones,
// landscape on laptops — and keep it updated if the phone rotates.
function updatePreviewAspect() {
  const { videoWidth, videoHeight } = el.preview;
  if (videoWidth && videoHeight) {
    el.stage.style.setProperty("--aspect", (videoWidth / videoHeight).toFixed(4));
  }
}

/* ---------------------------------------------------------------------------
   Review
   ------------------------------------------------------------------------ */

function showReview(result) {
  state.result = result;
  clearReview();
  state.reviewUrl = URL.createObjectURL(result.blob);
  el.reviewStage.dataset.kind = result.kind;

  const player = result.kind === "video" ? el.reviewVideo : el.reviewAudio;
  player.src = state.reviewUrl;
  player.load();

  setPhase("review");
  showScreen("question");
}

function clearReview() {
  for (const player of [el.reviewVideo, el.reviewAudio]) {
    player.pause();
    player.removeAttribute("src");
    player.load();
  }
  el.reviewStage.style.removeProperty("--aspect");
  if (state.reviewUrl) URL.revokeObjectURL(state.reviewUrl);
  state.reviewUrl = null;
}

function updateReviewAspect() {
  const { videoWidth, videoHeight } = el.reviewVideo;
  if (videoWidth && videoHeight) {
    el.reviewStage.style.setProperty("--aspect", (videoWidth / videoHeight).toFixed(4));
  }
}

function useFile(file) {
  if (!file) return;
  const kind = file.type.startsWith("audio/") ? "audio" : "video";
  state.kind = kind;
  showReview({
    blob: file,
    mimeType: file.type || (kind === "video" ? "video/mp4" : "audio/mp4"),
    kind,
    duration: null,
  });
}

function save() {
  const question = QUESTIONS[state.step];
  const recording = state.result;
  const upload = new Upload({
    recording,
    session: state.session,
    question: question.id,
    name: state.name,
    token: state.token,
  });
  upload.label = question.label;
  state.uploads.push(upload);
  // Failures surface on the finishing screen, which offers a retry.
  upload.run().catch((error) => console.warn(error));

  // The upload keeps its own reference to the blob.
  clearReview();
  state.result = null;

  state.step += 1;
  if (state.step < QUESTIONS.length) {
    renderQuestion();
  } else {
    finish();
  }
}

/* ---------------------------------------------------------------------------
   Finishing & done
   ------------------------------------------------------------------------ */

function renderProgress() {
  const total = state.uploads.reduce((sum, u) => sum + u.total, 0);
  const loaded = state.uploads.reduce((sum, u) => sum + u.loaded, 0);
  const percent = total ? Math.round((loaded / total) * 100) : 0;
  el.progressBar.style.width = `${percent}%`;
  el.progress.setAttribute("aria-valuenow", String(percent));
}

async function finish() {
  showScreen("finishing");
  el.uploadError.hidden = true;
  el.progress.hidden = false;
  el.finishingTitle.textContent = "Sending your love…";
  el.finishingText.textContent = "Hang tight — please keep this page open until it's done.";
  awake.hold();

  const unsubscribe = state.uploads.map((upload) => upload.onChange(renderProgress));
  renderProgress();

  const results = await Promise.allSettled(state.uploads.map((upload) => upload.run()));
  unsubscribe.forEach((off) => off());
  awake.release();

  if (results.every((result) => result.status === "fulfilled")) {
    celebrate();
  } else {
    showUploadError();
  }
}

function showUploadError() {
  const failed = state.uploads.filter((upload) => upload.status === "error");
  const unauthorized = failed.some((upload) => upload.error?.status === 401);

  el.finishingTitle.textContent = "Uh oh, that didn't go through";
  el.finishingText.textContent = unauthorized
    ? "This link doesn't seem to be working. Please check you used the full link Jeff sent."
    : "It might be a spotty connection. Try again — your recordings are still here.";
  el.uploadError.hidden = false;
  el.progress.hidden = true;

  // Last resort: let them save the files and send them another way.
  el.downloads.replaceChildren(
    ...state.uploads.map((upload) => {
      const { blob, mimeType, kind } = upload.recording;
      const ext = /mp4/.test(mimeType) ? (kind === "audio" ? "m4a" : "mp4")
        : /quicktime/.test(mimeType) ? "mov"
        : /webm/.test(mimeType) ? "webm"
        : (mimeType.split("/")[1] || "bin").split(";")[0];
      const link = document.createElement("a");
      link.className = "fr-link-button";
      link.href = URL.createObjectURL(blob);
      link.download = `For Rebecca - ${state.name} - ${upload.label}.${ext}`;
      link.textContent = `Save “${upload.label}”`;
      const item = document.createElement("li");
      item.append(link);
      return item;
    }),
  );
}

function celebrate() {
  el.doneName.textContent = state.name ? `, ${state.name}` : "";
  showScreen("done");
  burst(el.confetti);
}

/* ---------------------------------------------------------------------------
   Wiring
   ------------------------------------------------------------------------ */

for (const button of el.recordButtons) {
  button.addEventListener("click", () => startRecording(button.dataset.record));
}

for (const input of el.fileInputs) {
  input.addEventListener("change", () => {
    useFile(input.files[0]);
    input.value = "";
  });
}

el.stop.addEventListener("click", stopRecording);
el.cancel.addEventListener("click", cancelRecording);
el.rerecord.addEventListener("click", () => {
  clearReview();
  state.result = null;
  startRecording(state.kind);
});
el.save.addEventListener("click", save);
el.retry.addEventListener("click", finish);
el.celebrate.addEventListener("click", () => burst(el.confetti));
el.deniedRetry.addEventListener("click", () => {
  el.question.dataset.phase = "choose";
  showScreen("question");
});

el.preview.addEventListener("loadedmetadata", updatePreviewAspect);
el.preview.addEventListener("resize", updatePreviewAspect);
el.reviewVideo.addEventListener("loadedmetadata", updateReviewAspect);
fixInfiniteDuration(el.reviewVideo);
fixInfiniteDuration(el.reviewAudio);

// Phones suspend the page when you switch apps or lock the screen. Keep what
// was recorded so far rather than losing it.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const phase = el.question.dataset.phase;
    if (phase === "recording") stopRecording();
    else if (phase === "countdown") cancelRecording();
  } else if (state.recording || state.uploads.some((u) => u.status === "uploading")) {
    awake.hold(); // The browser drops wake locks when the page is hidden.
  }
});

window.addEventListener("beforeunload", (event) => {
  const unsaved = state.recording || state.result;
  const uploading = state.uploads.some((u) => u.status !== "done");
  if (unsaved || uploading) {
    event.preventDefault();
    event.returnValue = "";
  }
});

initWelcome();
