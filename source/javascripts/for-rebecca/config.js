// Settings for the birthday recorder and gallery.

const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);

// The deployed Worker (see workers/birthday/README.md). Locally, `npx wrangler dev`
// serves it on :8787.
export const WORKER_URL = isLocal
  ? "http://localhost:8787"
  : "https://rebecca-birthday.jlzych.workers.dev";

export const QUESTIONS = [
  {
    id: "met",
    label: "How we met",
    text: "How did you first meet Becca?",
    hint: "Where were you? What was your first impression of her?",
  },
  {
    id: "memory",
    label: "Favorite memory",
    text: "What's your favorite memory of Becca?",
    hint: "Big or small, whatever comes to mind first.",
  },
];

// Recordings upload in parts this size. Every part but the last must be the same
// size (an R2 rule), and at least 5MB.
export const PART_SIZE = 10 * 1024 * 1024;
