// The one spring in the interface: the magnification lens easing back to the
// current frame when the pointer leaves the strip.
//
// SwiftUI's .spring(response: 0.3, dampingFraction: 0.65) — the app's exact
// curve — is stiffness 438, damping 27, mass 1. Integrated with semi-implicit
// Euler at a fixed 1/60s step so the shape doesn't drift with frame rate.

const STIFFNESS = 438;
const DAMPING = 27;
const MASS = 1;
const STEP = 1 / 60;
const REST = 0.1;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export function createSpring(onUpdate) {
  let value = 0;
  let velocity = 0;
  let target = 0;
  let raf = null;
  let last = 0;

  function tick(now) {
    // Accumulate real elapsed time, then advance in fixed steps.
    let elapsed = Math.min((now - last) / 1000, 0.064);
    last = now;
    for (let t = 0; t < elapsed; t += STEP) {
      const force = -STIFFNESS * (value - target) - DAMPING * velocity;
      velocity += (force / MASS) * STEP;
      value += velocity * STEP;
    }
    if (Math.abs(value - target) > REST || Math.abs(velocity) > REST) {
      onUpdate(value);
      raf = requestAnimationFrame(tick);
    } else {
      value = target;
      velocity = 0;
      raf = null;
      onUpdate(value);
    }
  }

  return {
    get value() {
      return value;
    },
    // Jump without animating — used when the pointer takes over.
    set(next) {
      this.stop();
      value = next;
      target = next;
      velocity = 0;
    },
    to(next) {
      target = next;
      if (reduceMotion.matches) {
        this.set(next);
        onUpdate(value);
        return;
      }
      if (raf === null) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    },
    stop() {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      velocity = 0;
    },
  };
}
