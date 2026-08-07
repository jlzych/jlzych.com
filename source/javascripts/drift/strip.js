// The sediment strip: left-anchored vertical bands, one per capture, growing
// toward the present, with a fisheye lens under the pointer.
//
// Two rules keep it feeling right:
//   1. Band centers are fixed. Magnification grows a band in place, it never
//      shifts a center — so the tallest band stays under the cursor.
//   2. The lens is a raised cosine over a 160px radius, not a linear ramp.

import { state, setState, subscribe, notify } from "./state.js";
import { createSpring } from "./spring.js";

const MAGNIFY_RADIUS = 160;
const MAX_BOOST = 64;
const HEIGHT_BOOST_RATIO = 0.4;
const SNAP_RADIUS = 12; // commits act as magnetic detents while scrubbing
const MARKER_LANE = 16;
const BOTTOM_MARGIN = 28; // headroom above the bands for the lens to grow into
const MAX_BAND_WIDTH = 60;
const TOOLTIP_DELAY = 500;
const THUMB_CONCURRENCY = 6;

export function initStrip(root) {
  // Pointer work happens on the track, not the whole strip — the play button
  // shares the strip and must not scrub when you reach for it.
  const trackEl = root.querySelector(".dt__track");
  const bandsEl = root.querySelector(".dt__bands");
  const markersEl = root.querySelector(".dt__markers");
  const playheadEl = root.querySelector(".dt__playhead");
  const tooltipEl = root.querySelector(".dt__tooltip");

  const frames = state.frames;
  const count = frames.length;

  const bands = [];
  const thumbs = [];
  const rawWidths = new Float64Array(count);
  const baseWidths = new Float64Array(count);
  const centers = new Float64Array(count);
  const restOpacity = new Float64Array(count);
  const gitIndices = [];

  // Last values written to the DOM, so a pointer move only touches the ~dozen
  // bands the lens actually reached.
  const prev = { left: [], width: [], height: [], top: [], z: [], opacity: [] };

  let width = 0;
  let bandArea = 0;
  let baseHeight = 0;
  let rect = null;
  let dragging = false;
  let hovering = false;
  let layoutQueued = false;

  const spring = createSpring((x) => {
    hoverX = x;
    requestLayout();
  });
  let hoverX = 0;

  build();
  measure();
  layout();
  loadThumbs();

  new ResizeObserver(() => {
    measure();
    if (!hovering && !dragging) {
      spring.set(centers[state.currentIndex] || 0);
      hoverX = spring.value;
    }
    layout();
  }).observe(bandsEl);

  subscribe(() => {
    syncClasses();
    if (!hovering && !dragging && spring.value !== centers[state.currentIndex]) {
      spring.to(centers[state.currentIndex] || 0);
    }
    requestLayout();
  });

  /* ---------------------------------------------------------------- build */

  function build() {
    const bandFragment = document.createDocumentFragment();
    const markerFragment = document.createDocumentFragment();

    frames.forEach((frame, i) => {
      const band = document.createElement("div");
      band.className = "dt__band";

      const img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      band.appendChild(img);

      bands.push(band);
      thumbs.push(img);
      bandFragment.appendChild(band);

      if (frame.isGitEvent) {
        gitIndices.push(i);
        const dot = document.createElement("div");
        dot.className = "dt__dot";
        dot.dataset.index = String(i);
        markerFragment.appendChild(dot);
        wireTooltip(dot, i);
      }
    });

    bandsEl.appendChild(bandFragment);
    markersEl.appendChild(markerFragment);
    syncClasses();
  }

  function loadThumbs() {
    // Newest first: those bands are the widest and the eye lands there.
    const order = frames.map((_, i) => count - 1 - i);
    let cursor = 0;
    let active = 0;

    function pump() {
      while (active < THUMB_CONCURRENCY && cursor < order.length) {
        const i = order[cursor++];
        const img = thumbs[i];
        active++;
        const done = (loaded) => {
          if (loaded) img.classList.add("is-loaded");
          active--;
          pump();
        };
        img.addEventListener("load", () => done(true), { once: true });
        img.addEventListener("error", () => done(false), { once: true });
        img.src = state.base + (frames[i].thumb || frames[i].image);
      }
    }
    pump();
  }

  /* ------------------------------------------------------------- geometry */

  function measure() {
    rect = bandsEl.getBoundingClientRect();
    width = rect.width;
    const height = bandsEl.offsetHeight;
    bandArea = height - MARKER_LANE;
    baseHeight = Math.max(20, bandArea - BOTTOM_MARGIN);

    let total = 0;
    for (let i = 0; i < count; i++) {
      const progress = count > 1 ? i / (count - 1) : 1;
      // Newer frames are wider and more opaque — the strip reads as sediment
      // laid down over time, thickening toward the present.
      rawWidths[i] = Math.max(1.5, 1.5 + Math.pow(progress, 2.5) * 22);
      restOpacity[i] = 0.3 + progress * 0.7;
      total += rawWidths[i];
    }

    // Bidirectional fit: stretch to fill when frames are sparse, compress when
    // they're dense, but never let one band balloon past 60px.
    const scale = total > 0 ? width / total : 1;
    let x = 0;
    for (let i = 0; i < count; i++) {
      baseWidths[i] = Math.min(rawWidths[i] * scale, MAX_BAND_WIDTH);
      centers[i] = x + baseWidths[i] / 2;
      x += baseWidths[i];
    }

    for (const dot of markersEl.querySelectorAll(".dt__dot")) {
      // The dot sits in the marker lane, centered 8px below the bands; its
      // 16px hit target is centered on that point.
      dot.style.left = `${centers[Number(dot.dataset.index)]}px`;
      dot.style.top = `${bandArea}px`;
    }
  }

  function requestLayout() {
    if (layoutQueued) return;
    layoutQueued = true;
    requestAnimationFrame(() => {
      layoutQueued = false;
      layout();
    });
  }

  function layout() {
    const skimming = state.skimmingIndex;

    for (let i = 0; i < count; i++) {
      const dist = Math.abs(hoverX - centers[i]);
      let w = baseWidths[i];
      let h = baseHeight;

      if (dist < MAGNIFY_RADIUS) {
        const t = 1 - dist / MAGNIFY_RADIUS;
        const boost = (MAX_BOOST * (Math.cos((1 - t) * Math.PI) + 1)) / 2;
        w += boost;
        h += boost * HEIGHT_BOOST_RATIO;
      }

      const left = centers[i] - w / 2;
      const top = (bandArea - h) / 2;
      const z = dist < MAGNIFY_RADIUS ? Math.round(MAGNIFY_RADIUS - dist) : 0;
      const opacity = i === skimming ? 1 : restOpacity[i];
      const node = bands[i];

      if (prev.left[i] !== left) node.style.left = `${(prev.left[i] = left)}px`;
      if (prev.width[i] !== w) node.style.width = `${(prev.width[i] = w)}px`;
      if (prev.height[i] !== h) node.style.height = `${(prev.height[i] = h)}px`;
      if (prev.top[i] !== top) node.style.top = `${(prev.top[i] = top)}px`;
      if (prev.z[i] !== z) node.style.zIndex = String((prev.z[i] = z));
      if (prev.opacity[i] !== opacity) node.style.opacity = String((prev.opacity[i] = opacity));
    }

    playheadEl.hidden = !state.isPlaying;
    if (state.isPlaying) playheadEl.style.left = `${centers[state.currentIndex]}px`;
  }

  function syncClasses() {
    for (let i = 0; i < count; i++) {
      bands[i].classList.toggle("is-current", i === state.currentIndex);
      bands[i].classList.toggle(
        "is-selected",
        i !== state.currentIndex && state.selection.has(frames[i].id),
      );
    }
  }

  /* -------------------------------------------------------------- pointer */

  function localX(event) {
    if (!rect) measure();
    return Math.max(0, Math.min(width, event.clientX - rect.left));
  }

  // Commits are detents: land within 12px of one and the scrub snaps to it.
  function indexAt(x, snap = true) {
    if (snap) {
      let best = -1;
      let bestDist = SNAP_RADIUS;
      for (const i of gitIndices) {
        const dist = Math.abs(x - centers[i]);
        if (dist <= bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      if (best >= 0) return best;
    }
    let nearest = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < count; i++) {
      const dist = Math.abs(x - centers[i]);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    }
    return nearest;
  }

  function skimTo(event) {
    const x = localX(event);
    spring.set(x);
    hoverX = x;
    setState({ skimmingIndex: indexAt(x) });
    requestLayout();
  }

  function endHover() {
    hovering = false;
    dragging = false;
    hideTooltip();
    setState({ skimmingIndex: null });
    spring.to(centers[state.currentIndex] || 0);
    requestLayout();
  }

  trackEl.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    hovering = true;
    measure();
    skimTo(event);
  });

  trackEl.addEventListener("pointermove", (event) => {
    if (!hovering && !dragging) return;
    skimTo(event);
  });

  trackEl.addEventListener("pointerdown", (event) => {
    dragging = true;
    trackEl.setPointerCapture(event.pointerId);
    measure();
    skimTo(event);
  });

  trackEl.addEventListener("pointerup", (event) => {
    const x = localX(event);
    const multi = event.metaKey || event.ctrlKey || event.shiftKey;
    if (multi) {
      // Exact band, no snapping — you're picking this one deliberately.
      const id = frames[indexAt(x, false)].id;
      if (state.selection.has(id)) state.selection.delete(id);
      else state.selection.add(id);
      notify();
    } else {
      state.selection.clear();
      setState({ currentIndex: indexAt(x), isPlaying: false });
      notify();
    }
    dragging = false;
    if (event.pointerType !== "mouse") endHover();
  });

  trackEl.addEventListener("pointerleave", () => {
    if (!dragging) endHover();
  });

  trackEl.addEventListener("pointercancel", endHover);

  /* -------------------------------------------------------------- tooltip */

  let tooltipTimer = null;

  function wireTooltip(dot, index) {
    dot.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") return;
      clearTimeout(tooltipTimer);
      tooltipTimer = setTimeout(() => showTooltip(index), TOOLTIP_DELAY);
    });
    dot.addEventListener("pointerleave", hideTooltip);
  }

  function showTooltip(index) {
    const frame = frames[index];
    const hash = frame.commitHash ? frame.commitHash.slice(0, 7) : "commit";
    tooltipEl.textContent = `Commit ${hash} · ${frame.branch}`;
    tooltipEl.style.visibility = "hidden";
    tooltipEl.classList.add("is-visible");
    tooltipEl.style.left = "0px";
    tooltipEl.style.bottom = `${bandsEl.offsetHeight - (bandArea + 8) + 22}px`;

    // Keep the bubble inside the strip: near an edge it slides inward rather
    // than clipping.
    const half = tooltipEl.offsetWidth / 2;
    const x = Math.max(half, Math.min(width - half, centers[index]));
    tooltipEl.style.left = `${x - half}px`;
    tooltipEl.style.visibility = "";
  }

  function hideTooltip() {
    clearTimeout(tooltipTimer);
    tooltipEl.classList.remove("is-visible");
  }
}
