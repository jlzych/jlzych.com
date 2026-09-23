// A burst of confetti in the site's monogram colors, drawn on a full-screen
// canvas. No-op for people who prefer reduced motion.

// Monogram colors, plus the accent teal and gold so pieces show on the cream page.
const COLORS = ["#3dbbd3", "#adebef", "#ccf7aa", "#fcf398", "#fed874", "#00a2a8", "#c29d3f"];
const GRAVITY = 0.12;
const DRAG = 0.985;

let particles = [];
let raf = 0;

export function burst(canvas, { count = 240 } = {}) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Two cannons at the bottom corners, aimed up and inward.
  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0;
    const angle = (fromLeft ? -60 : -120) + (Math.random() - 0.5) * 40;
    const speed = (Math.random() * 0.7 + 0.6) * Math.min(24, height / 34);
    particles.push({
      x: fromLeft ? 0 : width,
      y: height,
      vx: Math.cos((angle * Math.PI) / 180) * speed,
      vy: Math.sin((angle * Math.PI) / 180) * speed,
      size: Math.random() * 8 + 9,
      color: COLORS[i % COLORS.length],
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      wobble: Math.random() * Math.PI * 2,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    });
  }

  cancelAnimationFrame(raf);
  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    particles = particles.filter((p) => p.y < height + 40);

    for (const p of particles) {
      p.vx *= DRAG;
      p.vy = p.vy * DRAG + GRAVITY;
      p.wobble += 0.1;
      p.x += p.vx + Math.sin(p.wobble) * 0.6;
      p.y += p.vy;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // Squash on one axis to fake the paper flipping over.
      ctx.scale(1, Math.abs(Math.cos(p.wobble)) * 0.8 + 0.2);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (particles.length) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}
