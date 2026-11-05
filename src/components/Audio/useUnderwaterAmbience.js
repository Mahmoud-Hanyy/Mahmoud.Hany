import { useEffect, useRef } from "react";

/**
 * Synthesizes a continuous "bottom of the ocean" ambience entirely in the
 * browser with the Web Audio API — no MP3 file required.
 *
 * Layers:
 *  1. Filtered brown noise -> the deep, muffled underwater rumble.
 *  2. A slow LFO wobbling the filter cutoff -> the sense of a current
 *     drifting past, so the rumble isn't static.
 *  3. Randomly-timed short sine "blips" with a quick pitch drop -> distant
 *     bubbles rising and popping.
 *
 * Everything is built once and torn down on unmount / when stopped, so it's
 * safe to mount this behind a toggle.
 */
export default function useUnderwaterAmbience() {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const bubbleTimeoutRef = useRef(null);

  const start = () => {
    if (ctxRef.current) return; // already running

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    // --- Layer 1: brown noise (deeper/warmer than white noise) ---
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.2; // compensate for brown noise's naturally low level
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // --- Filter that shapes the noise into a muffled "underwater" rumble ---
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 340;
    filter.Q.value = 0.7;

    // --- Slow LFO on the filter cutoff = drifting current ---
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06; // one slow swell roughly every ~16s
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // --- Master gain with a gentle fade-in ---
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.4);

    noise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    noise.start();
    lfo.start();

    // --- Layer 3: occasional bubble blips ---
    const scheduleBubble = () => {
      const delay = 1800 + Math.random() * 4200;
      bubbleTimeoutRef.current = setTimeout(() => {
        playBubble(ctx, masterGain);
        scheduleBubble();
      }, delay);
    };
    scheduleBubble();

    nodesRef.current = { noise, filter, lfo, lfoGain, masterGain };
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !nodes) return;

    clearTimeout(bubbleTimeoutRef.current);

    const { masterGain, noise, lfo } = nodes;
    const now = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0, now + 0.5);

    setTimeout(() => {
      try {
        noise.stop();
        lfo.stop();
        ctx.close();
      } catch {
        // already stopped — safe to ignore
      }
    }, 600);

    ctxRef.current = null;
    nodesRef.current = null;
  };

  useEffect(() => () => stop(), []); // clean up on unmount

  return { start, stop };
}

function playBubble(ctx, destination) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  const startFreq = 260 + Math.random() * 340;
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(startFreq * 0.35, now + 0.22);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + 0.3);
}
