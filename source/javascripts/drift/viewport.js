// The viewport: the captured frame and its metadata pill.
//
// Every frame is shown twice — its thumbnail underneath (already in cache from
// the strip) and the full JPEG on top, revealed once it decodes. Skimming
// therefore paints instantly at thumbnail sharpness and resolves a beat later,
// instead of flashing empty while a 60KB image arrives.

import { state, subscribe, displayIndex } from "./state.js";

const PREFETCH_AHEAD = 4;
// Scrub the whole strip and every frame would otherwise stay decoded — ~2.4MB
// of bitmap each, which mobile Safari will not forgive. Evicting only drops our
// reference; the browser's HTTP cache still spares the re-download.
const CACHE_LIMIT = 30;

export function initViewport(root) {
  const thumbEl = root.querySelector(".dt__frame--thumb");
  const fullEl = root.querySelector(".dt__frame--full");
  const meta = {
    branch: root.querySelector(".dt__meta-branch"),
    commit: root.querySelector(".dt__meta-commit"),
    url: root.querySelector(".dt__meta-url"),
    time: root.querySelector(".dt__meta-time"),
  };

  const cache = new Map();
  let shownIndex = -1;
  let requestId = 0;

  function preload(index) {
    const frame = state.frames[index];
    if (!frame) return null;

    const cached = cache.get(frame.id);
    if (cached) {
      // A Map iterates in insertion order, so re-inserting marks this frame as
      // the most recently used and keeps the coldest one first in line.
      cache.delete(frame.id);
      cache.set(frame.id, cached);
      return cached;
    }

    const img = new Image();
    img.src = state.base + frame.image;
    cache.set(frame.id, img);
    while (cache.size > CACHE_LIMIT) {
      cache.delete(cache.keys().next().value);
    }
    return img;
  }

  function show(index) {
    const frame = state.frames[index];
    if (!frame) return;
    const id = ++requestId;

    thumbEl.src = state.base + (frame.thumb || frame.image);

    const img = preload(index);
    if (img.complete && img.naturalWidth) {
      fullEl.src = img.src;
      fullEl.classList.add("is-loaded");
    } else {
      fullEl.classList.remove("is-loaded");
      img.addEventListener(
        "load",
        () => {
          if (id !== requestId) return; // skimmed past it already
          fullEl.src = img.src;
          fullEl.classList.add("is-loaded");
        },
        { once: true },
      );
    }

    renderMeta(frame);

    // Walk outward from where the eye is, so a play or an arrow key finds the
    // next frames already decoded.
    requestIdle(() => {
      for (let d = 1; d <= PREFETCH_AHEAD; d++) {
        preload(index + d);
        preload(index - d);
      }
    });
  }

  function renderMeta(frame) {
    setItem(meta.branch, frame.branch);
    setItem(meta.commit, frame.commitHash ? frame.commitHash.slice(0, 6) : null);
    setItem(meta.url, frame.url ? frame.url.split("?")[0] : null);
    setItem(meta.time, formatTime(frame.timestamp));
  }

  subscribe(() => {
    const index = displayIndex();
    if (index === shownIndex) return;
    shownIndex = index;
    show(index);
  });
}

function setItem(el, value) {
  if (!el) return;
  el.hidden = !value;
  if (value) el.querySelector("span").textContent = value;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function requestIdle(fn) {
  if (typeof requestIdleCallback === "function") requestIdleCallback(fn, { timeout: 500 });
  else setTimeout(fn, 60);
}
