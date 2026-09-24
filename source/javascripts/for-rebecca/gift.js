// The corner gift: Pusheen pops back out when hovered (or tapped on touch).

const gift = document.querySelector(".fr-arcs__gift img");

if (gift) {
  // Let the entrance finish before a hover can restart it.
  let ready = false;

  const pop = () => {
    if (!ready) return;
    if (!gift.classList.contains("is-popping")) {
      gift.classList.add("is-popping");
      return;
    }
    // Already popped before: rewind the same animation and play it again.
    for (const animation of gift.getAnimations()) {
      animation.currentTime = 0;
      animation.play();
    }
  };

  // is-popping stays on after a pop: taking it off would bring back the
  // entrance animation and replay it from off screen.
  gift.addEventListener("animationend", () => {
    ready = true;
  });

  gift.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") pop();
  });

  gift.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") pop();
  });
}
