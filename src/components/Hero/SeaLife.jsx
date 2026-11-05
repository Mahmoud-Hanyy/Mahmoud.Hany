import { useMemo } from "react";
import useInView from "../../hooks/useInView";
import "./SeaLife.css";

const FISH = [
  { x: 12, y: 36, size: 30 },
  { x: 55, y: 12, size: 23 },
  { x: 62, y: 61, size: 34 },
  { x: 111, y: 30, size: 26 },
  { x: 136, y: 76, size: 21 },
  { x: 173, y: 48, size: 28 },
  { x: 95, y: 91, size: 19 },
  { x: 197, y: 15, size: 22 },
];

/** A small, distant school and a passing ray, kept clear of the story. */
export default function SeaLife({ variant = "dive", school = 0 }) {
  const [ref, inView] = useInView("100px");
  const ambient = variant === "ambient";
  const quieterSection = ambient && school > 0;
  // Each group keeps its route for this mount, even while scroll state updates.
  const groups = useMemo(() => Array.from({ length: quieterSection ? 1 : 2 }, (_, groupIndex) => {
    const duration = 48 + Math.random() * 28;
    const count = quieterSection ? 4 : ambient ? 3 + Math.floor(Math.random() * 3) : 5;
    return {
      top: (ambient ? 16 : 48) + groupIndex * (ambient ? 40 : 20) + Math.random() * (ambient ? 20 : 8),
      duration,
      // Opposite halves of the cycle give us both directions straight away.
      delay: -duration * (groupIndex === 0 ? 0.1 + Math.random() * 0.25 : 0.6 + Math.random() * 0.25),
      bob: 10 + Math.random() * 18,
      fish: FISH.slice(0, count).map((fish) => ({
        ...fish,
        x: fish.x + Math.random() * 14,
        y: fish.y + Math.random() * 14,
        size: fish.size * (0.7 + Math.random() * 0.3),
      })),
    };
  }), [ambient, quieterSection]);

  return (
    <div ref={ref} className={`sea-life sea-life--${variant}${inView ? " is-active" : ""}`} aria-hidden="true">
      {groups.map((group, groupIndex) => (
        <div className="sea-life__route" key={groupIndex} style={{
          "--school-top": `${group.top}%`,
          "--swim-duration": `${group.duration}s`,
          "--swim-delay": `${group.delay}s`,
          "--swim-bob": `${group.bob}px`,
          "--rest-left": `${12 + groupIndex * 48}%`,
        }}>
          <div className="sea-life__school">
            {group.fish.map((fish, index) => (
              <svg key={index} className="sea-life__fish" viewBox="0 0 64 32" style={{ left: fish.x, top: fish.y, "--fish-size": `${fish.size}px`, "--fish-delay": `${index * -0.37 - school}s` }}>
                <path d="M8 16C17 3 34 5 46 15L58 7L55 16L58 25L46 18C30 28 18 29 8 16Z" />
                <path d="M25 8L35 2L39 11M28 25L37 30L39 22" opacity="0.6" />
                <path className="sea-life__fish-highlight" d="M14 14Q28 6 42 15" />
                <circle cx="16" cy="14" r="1" className="sea-life__eye" />
              </svg>
            ))}
          </div>
        </div>
      ))}
      {!ambient && (
      <div className="sea-life__ray">
        <svg viewBox="0 0 220 160" fill="none">
          <g className="sea-life__ray-wings">
            <path d="M107 54C80 66 41 43 10 19C20 64 45 98 100 89Z" />
            <path d="M113 54C140 66 179 43 210 19C200 64 175 98 120 89Z" />
          </g>
          <path d="M110 42C93 54 91 79 104 96L110 101L116 96C129 79 127 54 110 42Z" />
          <path className="sea-life__ray-tail" d="M110 93C112 118 99 135 116 153" />
          <path className="sea-life__ray-highlight" d="M103 54Q110 48 117 54" />
        </svg>
      </div>
      )}
    </div>
  );
}
