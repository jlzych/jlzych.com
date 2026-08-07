// Shared state for the timeline. One plain object, a patch function, and a
// list of subscribers — the modules below own their own DOM and re-read from
// here whenever something changes.

export const state = {
  base: "", // where frames/ and thumbs/ live
  project: null,
  frames: [],
  currentIndex: 0,
  skimmingIndex: null, // frame under the cursor, previewed but not committed
  selection: new Set(),
  isPlaying: false,
};

const subscribers = [];

export function subscribe(fn) {
  subscribers.push(fn);
}

export function setState(patch) {
  let changed = false;
  for (const key in patch) {
    if (state[key] !== patch[key]) {
      state[key] = patch[key];
      changed = true;
    }
  }
  if (changed) notify();
}

// Selection is a Set we mutate in place, so it needs to announce itself.
export function notify() {
  for (const fn of subscribers) fn(state);
}

export function displayIndex() {
  return state.skimmingIndex ?? state.currentIndex;
}

export function currentFrame() {
  return state.frames[displayIndex()] || null;
}
