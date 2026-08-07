// Entry point for the hero timeline. Loads the manifest exported from the real
// Drift database, wires the pieces together, and owns the playback clock.
//
// If the manifest can't be fetched the static product screenshot stays where it
// is — the hero degrades to exactly what it was before.

import { state, setState, notify, subscribe } from "./state.js";
import { initViewport } from "./viewport.js";
import { initStrip } from "./strip.js";

const FRAME_MS = 1000 / 6; // the app plays back at 6fps
const AUTOPLAY_RATIO = 0.9; // how much of the window must be on screen to start

async function boot() {
  const root = document.querySelector(".dt");
  if (!root) return;

  const base = root.dataset.timelineBase;
  let manifest;
  try {
    const response = await fetch(`${base}manifest.json`);
    if (!response.ok) throw new Error(`manifest ${response.status}`);
    manifest = await response.json();
  } catch (error) {
    showFallback();
    return;
  }
  if (!manifest.frames || !manifest.frames.length) {
    showFallback();
    return;
  }

  state.base = base;
  state.project = manifest.project;
  state.frames = manifest.frames;
  state.currentIndex = manifest.frames.length - 1; // rest on the newest capture

  labelChrome(root, manifest);

  // The strip measures itself as it builds, so it has to be on screen first.
  root.hidden = false;

  const playback = createPlayback();
  initViewport(root);
  initStrip(root);
  wirePlayButton(root, playback);
  notify();

  wireKeyboard(root.querySelector(".dt__window"), playback);
  wireAutoplay(root, playback);
}

// Play through once when the window is all but fully on screen, and stop when
// it leaves — nobody wants a filmstrip playing to an empty room.
function wireAutoplay(root, playback) {
  const windowEl = root.querySelector(".dt__window");
  if (!windowEl) return;

  // An animation that starts on its own is exactly what reduced motion is for.
  let armed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Autoplay is an introduction, not a mode: the first deliberate touch of the
  // widget retires it, and it doesn't re-arm on the way back up the page.
  const disarm = () => {
    armed = false;
  };
  root.addEventListener("pointerdown", disarm, { once: true });
  root.addEventListener("keydown", disarm, { once: true });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        playback.stop();
        return;
      }
      if (!armed) return;
      // A window taller than the viewport can never reach 90%, so settle for
      // most of whatever this screen is able to show.
      const reachable = Math.min(1, window.innerHeight / entry.boundingClientRect.height);
      if (entry.intersectionRatio >= Math.min(AUTOPLAY_RATIO, reachable * 0.95)) {
        armed = false;
        playback.play();
      }
    },
    // Fine-grained steps: the target ratio is computed per callback, so the
    // observer has to report often enough not to step over it.
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );
  observer.observe(windowEl);
}

// Only now does the 1.1MB screenshot get fetched — the happy path never
// touches it.
function showFallback() {
  const wrapper = document.querySelector(".dt-fallback");
  if (!wrapper) return;
  const img = wrapper.querySelector("img");
  if (img && !img.src) img.src = img.dataset.fallbackSrc;
  wrapper.hidden = false;
}

function labelChrome(root, manifest) {
  const name = root.querySelector(".dt__project");
  if (name && manifest.project && manifest.project.name) {
    name.textContent = manifest.project.name;
  }
  const branches = [...new Set(manifest.frames.map((frame) => frame.branch))];
  const branchValue = root.querySelector(".dt__filter-branch");
  if (branchValue) {
    branchValue.textContent = branches.length === 1 ? branches[0] : "All branches";
  }
}

// The button sits in the strip, but it belongs to playback — so it's wired
// here rather than through the strip or the viewport.
function wirePlayButton(root, playback) {
  const button = root.querySelector(".dt__play");
  if (!button) return;
  button.addEventListener("click", playback.toggle);
  subscribe(() => {
    root.classList.toggle("is-playing", state.isPlaying);
    button.setAttribute("aria-label", state.isPlaying ? "Pause" : "Play");
  });
}

function createPlayback() {
  let timer = null;

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    setState({ isPlaying: false });
  }

  function play() {
    if (timer) return;
    // Play from here; if we're already at the end, start over.
    if (state.currentIndex >= state.frames.length - 1) setState({ currentIndex: 0 });
    setState({ isPlaying: true });
    timer = setInterval(() => {
      if (state.currentIndex >= state.frames.length - 1) {
        stop();
        return;
      }
      setState({ currentIndex: state.currentIndex + 1 });
    }, FRAME_MS);
  }

  function go(delta) {
    stop();
    const next = Math.max(0, Math.min(state.frames.length - 1, state.currentIndex + delta));
    state.selection.clear();
    setState({ currentIndex: next, skimmingIndex: null });
    notify();
  }

  return {
    play,
    stop,
    toggle: () => (state.isPlaying ? stop() : play()),
    prev: () => go(-1),
    next: () => go(1),
  };
}

function wireKeyboard(windowEl, playback) {
  if (!windowEl) return;
  // Scoped to the widget: the page still scrolls with the keyboard everywhere
  // else, and Space only pauses when you've actually focused the app.
  windowEl.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        playback.prev();
        break;
      case "ArrowRight":
        event.preventDefault();
        playback.next();
        break;
      case " ":
      case "Spacebar":
        event.preventDefault();
        playback.toggle();
        break;
      default:
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
