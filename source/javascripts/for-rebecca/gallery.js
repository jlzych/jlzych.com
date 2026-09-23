// Rebecca's gallery: every friend's two answers, ready to play.
//
// The admin token lives in the URL hash (#…), which browsers never send to a
// server, so it stays out of logs and referrers.

import { WORKER_URL, QUESTIONS } from "./config.js";
import { burst } from "./confetti.js";
import { fixInfiniteDuration } from "./media.js";

const grid = document.querySelector("[data-grid]");
const summary = document.querySelector("[data-summary]");
const token = decodeURIComponent(location.hash.slice(1));

const MIC_BADGE = `
  <div class="fr-meter__badge fr-meter__badge--still" aria-hidden="true">
    <span class="fr-meter__ring"></span><span class="fr-meter__ring"></span>
    <span class="fr-meter__ring"></span><span class="fr-meter__ring"></span>
    <span class="fr-meter__mic">
      <svg class="fr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg>
    </span>
  </div>`;

async function load() {
  if (!token) {
    summary.textContent = "This link is missing its key — ask Jeff for the full link.";
    return;
  }

  let friends;
  try {
    const response = await fetch(`${WORKER_URL}/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 401) {
      summary.textContent = "This link's key doesn't match — ask Jeff for the full link.";
      return;
    }
    if (!response.ok) throw new Error(`List failed (${response.status})`);
    ({ friends } = await response.json());
  } catch (error) {
    console.error(error);
    summary.textContent = "Couldn't load the messages. Check your connection and refresh.";
    return;
  }

  if (!friends.length) {
    summary.textContent = "No messages yet — check back soon!";
    return;
  }

  summary.textContent =
    friends.length === 1
      ? "A message from someone who loves you."
      : `Messages from ${friends.length} people who love you.`;

  grid.replaceChildren(...friends.map(renderFriend));
  burst(document.querySelector(".fr-confetti"));
}

function renderFriend(friend) {
  const card = document.createElement("article");
  card.className = "frg-card";

  const name = document.createElement("h2");
  name.className = "frg-card__name";
  name.textContent = friend.name || "A friend";
  card.append(name);

  for (const question of QUESTIONS) {
    const clip = friend.clips[question.id];
    if (clip) card.append(renderClip(question, clip));
  }
  return card;
}

function renderClip(question, clip) {
  const wrap = document.createElement("section");
  wrap.className = "frg-clip";

  const src = fileUrl(clip.key);
  const label = document.createElement("p");
  label.className = "frg-clip__label";
  label.innerHTML = `<span></span><a download>Download</a>`;
  label.querySelector("span").textContent = question.label;
  label.querySelector("a").href = `${src}&download=1`;
  wrap.append(label);

  const kind = clip.kind === "audio" ? "audio" : "video";
  const player = document.createElement(kind);
  player.controls = true;
  player.preload = "metadata";
  player.src = src;
  player.setAttribute("playsinline", "");
  fixInfiniteDuration(player);

  if (!player.canPlayType((clip.mimeType || "").split(";")[0])) {
    const note = document.createElement("p");
    note.className = "fr-small";
    note.textContent = "This one may not play in this browser. Try Download instead.";
    wrap.append(note);
  }

  if (kind === "audio") {
    const box = document.createElement("div");
    box.className = "frg-audio";
    box.innerHTML = MIC_BADGE;
    box.append(player);
    wrap.append(box);
  } else {
    wrap.append(player);
  }

  // Only one clip plays at a time.
  player.addEventListener("play", () => {
    for (const other of document.querySelectorAll("video, audio")) {
      if (other !== player) other.pause();
    }
  });

  return wrap;
}

function fileUrl(key) {
  const path = key.split("/").map(encodeURIComponent).join("/");
  return `${WORKER_URL}/file/${path}?t=${encodeURIComponent(token)}`;
}

load();
