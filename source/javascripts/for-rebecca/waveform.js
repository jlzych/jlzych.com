// Live microphone level for audio recordings: a scrolling bar waveform (like
// Voice Memos) drawn on a canvas, plus a 0–1 level reported every frame so the
// page can pulse the mic badge.

const BAR_WIDTH = 4;
const BAR_GAP = 4;

// Create this synchronously inside the tap handler, before any `await` — iOS
// only lets audio start from a user gesture.
export function createAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return AudioContext ? new AudioContext() : null;
}

export class LevelMeter {
  constructor({ context, stream, canvas, onLevel }) {
    this.context = context;
    this.canvas = canvas;
    this.onLevel = onLevel;
    this.history = [];
    this.level = 0;

    this.analyser = context.createAnalyser();
    this.analyser.fftSize = 1024;
    this.samples = new Float32Array(this.analyser.fftSize);
    this.source = context.createMediaStreamSource(stream);
    this.source.connect(this.analyser);

    this.resize = this.resize.bind(this);
    this.frame = this.frame.bind(this);
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(canvas);
    this.resize();

    context.resume?.();
    this.raf = requestAnimationFrame(this.frame);
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = this.canvas.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.color = getComputedStyle(this.canvas).color;
  }

  frame() {
    this.analyser.getFloatTimeDomainData(this.samples);
    let sum = 0;
    for (const sample of this.samples) sum += sample * sample;
    const rms = Math.sqrt(sum / this.samples.length);

    // Speech sits around 0.02–0.2 RMS; stretch it so talking fills the range.
    const target = Math.min(1, Math.pow(rms * 5, 0.8));
    // Rise quickly, fall slowly, so the motion feels like a voice, not noise.
    this.level += (target - this.level) * (target > this.level ? 0.6 : 0.15);

    this.history.push(this.level);
    const capacity = Math.ceil(this.width / (BAR_WIDTH + BAR_GAP)) + 1;
    if (this.history.length > capacity) this.history.splice(0, this.history.length - capacity);

    this.draw();
    this.onLevel?.(this.level);
    this.raf = requestAnimationFrame(this.frame);
  }

  draw() {
    const { ctx, width, height, history } = this;
    if (!ctx || !width) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = this.color;

    const mid = height / 2;
    for (let i = 0; i < history.length; i++) {
      // Newest bar on the right edge, older ones scrolling left.
      const x = width - (history.length - i) * (BAR_WIDTH + BAR_GAP);
      const barHeight = Math.max(BAR_WIDTH, history[i] * height * 0.95);
      // Fade older bars out toward the left edge.
      ctx.globalAlpha = 0.25 + 0.75 * (i / history.length);
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, mid - barHeight / 2, BAR_WIDTH, barHeight, BAR_WIDTH / 2);
      } else {
        ctx.rect(x, mid - barHeight / 2, BAR_WIDTH, barHeight);
      }
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.observer.disconnect();
    this.source.disconnect();
    this.onLevel?.(0);
    this.ctx?.clearRect(0, 0, this.width, this.height);
    this.context.close?.().catch(() => {});
  }
}
