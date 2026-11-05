import { useId } from "react";
import useInView from "../../hooks/useInView";
import "./Shark.css";

export default function Shark() {
  const [ref, inView] = useInView("100px");
  const gradientId = useId();

  return (
    <div ref={ref} className={`shark${inView ? " is-active" : ""}`} aria-hidden="true">
      <div className="shark__route">
        <div className="shark__direction">
          <svg className="shark__body" viewBox="0 0 460 200" fill="none">
            <defs>
              <linearGradient id={gradientId} x1="230" y1="35" x2="230" y2="165" gradientUnits="userSpaceOnUse">
                <stop stopColor="#477084" />
                <stop offset="0.5" stopColor="#254657" />
                <stop offset="1" stopColor="#102736" />
              </linearGradient>
            </defs>
            <g fill={`url(#${gradientId})`}>
              <path className="shark__tail" d="M92 101L62 94L15 49L36 101L25 151L68 119L94 117Z" />
              <path d="M76 102C119 78 163 62 211 67L239 18Q244 49 258 76C310 82 366 97 410 109L437 121L411 131C370 148 326 151 288 144L246 179L253 141C182 146 122 129 78 117Z" />
            </g>
            <path d="M273 104Q283 121 276 135M285 106Q295 123 288 137M297 108Q306 124 300 138" stroke="#081d2a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <path d="M317 138Q365 142 405 128M118 87Q162 72 204 74" stroke="#7aa5b6" strokeWidth="1" opacity="0.25" />
            <path d="M405 126L425 124" stroke="#081d2a" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="397" cy="115" r="2.2" fill="#071825" />
          </svg>
        </div>
      </div>
    </div>
  );
}
