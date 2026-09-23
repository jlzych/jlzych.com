// Small media helpers shared by the recorder and the gallery.

// Formats seconds as m:ss.
export function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Chrome's MediaRecorder writes WebM files without a duration, so players show
// an endless scrubber. Seeking far past the end makes the browser scan the file
// and discover the real duration; then we jump back to the start.
export function fixInfiniteDuration(media) {
  media.addEventListener("loadedmetadata", () => {
    if (media.duration !== Infinity) return;
    const reset = () => {
      media.removeEventListener("timeupdate", reset);
      media.currentTime = 0;
    };
    media.addEventListener("timeupdate", reset);
    media.currentTime = 1e101;
  });
}
