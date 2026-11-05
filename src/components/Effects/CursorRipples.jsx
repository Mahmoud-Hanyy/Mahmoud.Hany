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
    let lastSpawn = { x: null, y: null };
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let running = false;

    const spawnRipple = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: 34 + Math.random() * 20,
        alpha: 0.5,
      });
      if (ripples.length > 40) ripples.shift(); // keep the trail bounded
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastSpawn.x === null) {
        spawnRipple(x, y);
      } else {
        const dx = x - lastSpawn.x;
        const dy = y - lastSpawn.y;
        if (dx * dx + dy * dy > 26 * 26) {
          spawnRipple(x, y);
        } else {
          return;
        }
      }
      lastSpawn = { x, y };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
