import { useEffect, useRef } from "react";
import "./CursorRipples.css";

/**
 * A fixed, full-viewport canvas that draws soft expanding rings at the
 * cursor position as it moves — like disturbing the surface of the water.
 * Pure canvas 2D (no WebGL) so it stays cheap; pointer-events are disabled
 * so it never blocks clicks on the real UI underneath.
 *
 * Ripples only spawn once the cursor has moved a few pixels since the last
 * one, so a fast swipe leaves a trail without flooding the canvas on every
 * mousemove event.
 */
export default function CursorRipples() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ripples = [];
    let lastSpawn = { x: null, y: null, at: 0 };
    let rafId;
    let pixelRatio = 1;
    const maxRipples = 8;
    const minSpawnInterval = 40;
    const minSpawnDistance = 38;

    const resize = () => {
      // A full-resolution viewport canvas can allocate and clear tens of
      // millions of pixels on high-DPI displays for a subtle cursor effect.
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let running = false;

    const spawnRipple = (x, y) => {
      if (ripples.length >= maxRipples) ripples.shift();
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: 34 + Math.random() * 20,
        alpha: 0.5,
      });
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (e) => {
      if (e.pointerType !== "mouse") return;
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();
      const dx = lastSpawn.x === null ? minSpawnDistance : x - lastSpawn.x;
      const dy = lastSpawn.y === null ? 0 : y - lastSpawn.y;
      if (now - lastSpawn.at < minSpawnInterval || dx * dx + dy * dy < minSpawnDistance ** 2) {
        return;
      }
      spawnRipple(x, y);
      lastSpawn = { x, y, at: now };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ripples = ripples.filter((r) => r.alpha > 0.01);
      for (const r of ripples) {
        r.radius += (r.maxRadius - r.radius) * 0.08 + 0.4;
        r.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(63, 232, 211, ${r.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(216, 236, 250, ${r.alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (ripples.length > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        running = false; // idle — spawnRipple() will restart the loop
      }
    };

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-ripples" aria-hidden="true" />;
}
