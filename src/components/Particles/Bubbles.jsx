import { useMemo } from "react";
import useInView from "../../hooks/useInView";
import "./Bubbles.css";

/** Layered air bubbles: upward buoyancy on the wrapper, local wobble on the shell. */
export default function Bubbles({ count = 18, variant = "ambient" }) {
  const [ref, inView] = useInView("100px");
  const bubbles = useMemo(
    () => Array.from({ length: count }, (_, index) => {
      const distance = index % 6 === 0 ? "near" : index % 3 === 0 ? "far" : "mid";
      const size = distance === "near" ? 22 + Math.random() * 18
        : distance === "far" ? 3 + Math.random() * 4 : 7 + Math.random() * 11;
      return {
        id: index,
        distance,
        size,
        left: 4 + Math.random() * 92,
        duration: (variant === "dive" ? 5 : 12) + Math.random() * 7 - size * 0.035,
        // Small clusters with gaps resemble successive breaths, not a uniform curtain.
        delay: -(Math.floor(index / 5) * 1.9 + (index % 5) * 0.18),
        drift: (Math.random() - 0.45) * (variant === "dive" ? 95 : 65),
        spread: (Math.random() - 0.5) * 44,
        sway: 5 + Math.random() * 12,
        wobble: 1.5 + Math.random() * 2,
      };
    }),
    [count, variant]
  );

  return (
    <div ref={ref} className={`bubbles bubbles--${variant}${inView ? " is-active" : ""}`} aria-hidden="true">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className={`bubbles__rise bubbles__rise--${bubble.distance}`}
          style={{
            "--bubble-left": `${bubble.left}%`,
            "--bubble-size": `${bubble.size}px`,
            "--bubble-duration": `${bubble.duration}s`,
            "--bubble-delay": `${bubble.delay}s`,
            "--bubble-drift": `${bubble.drift}px`,
            "--bubble-spread": `${bubble.spread}px`,
            "--bubble-sway": `${bubble.sway}px`,
            "--bubble-wobble": `${bubble.wobble}s`,
          }}
        >
          <span className="bubbles__item" />
        </span>
      ))}
    </div>
  );
}
