// Tiny shutter-click synthesized with WebAudio — no asset needed.
// Plays a short filtered noise burst + click transient, like a camera shutter.
let ctx: AudioContext | null = null;
let unlocked = false;

export function unlockSfx() {
  unlocked = true;
}

if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", () => unlockSfx(), { once: true });
  window.addEventListener("keydown", () => unlockSfx(), { once: true });
}

export function playShutter(volume = 0.16) {
  try {
    if (!unlocked || typeof window === "undefined") return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;

    // Click transient
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(2400, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.03);
    oscGain.gain.setValueAtTime(volume, t);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    osc.connect(oscGain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);

    // Shutter noise burst
    const len = Math.floor(ctx.sampleRate * 0.07);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3200;
    filter.Q.value = 0.9;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.9, t + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    noise.connect(filter).connect(noiseGain).connect(ctx.destination);
    noise.start(t + 0.02);
  } catch {
    // never break the UI for audio
  }
}
