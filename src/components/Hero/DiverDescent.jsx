import { lazy, Suspense, useEffect, useRef, useState } from "react";
import useLiteExperience from "../../hooks/useLiteExperience";
import useSectionScrollProgress from "../../hooks/useSectionScrollProgress";
import SeaLife from "./SeaLife";
import Bubbles from "../Particles/Bubbles";
import "./DiverDescent.css";

const DescentScene = lazy(() => import("./DescentScene"));

const CHAPTERS = [
  { label: "Leave the surface", title: "There's more", emphasis: "below the surface.", body: "The best part of the ocean is what you can't see from above. The same goes for the work." },
  { label: "Follow the light", title: "Less noise.", emphasis: "More perspective.", body: "As the daylight fades, the details come into focus. Stay curious. Keep looking closer." },
  { label: "Go a little deeper", title: "Beyond the pixels,", emphasis: "there's a purpose.", body: "Thoughtful systems. Useful experiences. Let's get into what makes them work." },
];

function Jellyfish({ className }) {
  return (
    <div className={`descent-jelly ${className}`}>
      <svg viewBox="0 0 120 240" fill="none" aria-hidden="true">
        <path className="descent-jelly__bell" d="M18 66C18 5 102 5 102 66Q90 83 78 69Q66 84 54 70Q42 83 30 69Q22 75 18 66Z" />
        <path d="M18 66Q60 44 102 66M36 60Q35 25 60 20Q85 25 84 60M60 20V57" />
        <g className="descent-jelly__tendrils">
          <path d="M32 73C10 110 65 120 36 156S42 198 28 220" />
          <path d="M49 75C76 108 20 128 53 164S40 201 52 235" />
          <path d="M65 75C44 111 95 120 66 156S80 199 65 220" />
          <path d="M83 73C107 110 56 122 87 159S78 188 91 205" />
        </g>
      </svg>
    </div>
  );
}

export default function DiverDescent({ meters }) {
  const lite = useLiteExperience();
  const { ref, progress } = useSectionScrollProgress(!lite);
  const progressRef = useRef(0);
  const [inView, setInView] = useState(false);
  const chapterIndex = Math.min(Math.floor(progress * CHAPTERS.length), CHAPTERS.length - 1);
  const chapter = CHAPTERS[chapterIndex];

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const node = ref.current;
    if (lite || !node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, lite]);

  if (lite) {
    return (
      <section className="descent-log" id="descent" aria-labelledby="descent-heading">
        <div className="descent-log__header">
          <span>02 / The descent</span>
          <span>Twilight zone / 200–1,000 m</span>
        </div>
        <div className="descent-log__layout">
          <figure className="descent-log__illustration">
            <div className="descent-log__orbit" aria-hidden="true" />
            <img src="/images/diving.png" alt="" loading="lazy" decoding="async" width="1024" height="1536" />
            <figcaption>Below the surface / A different perspective</figcaption>
          </figure>
          <ol className="descent-log__chapters">
            {CHAPTERS.map((item, index) => (
              <li key={item.label}>
                <p className="descent-log__label">{String(index + 1).padStart(2, "0")} / {item.label}</p>
                <h2 id={index === 0 ? "descent-heading" : undefined}>{item.title} <em>{item.emphasis}</em></h2>
                <p className="descent-log__body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <a className="descent-log__link" href="#about">Explore the field notes <span aria-hidden="true">↘</span></a>
      </section>
    );
  }

  return (
    <section className={`diver-descent${inView ? " is-active" : ""}`} id="descent" ref={ref} aria-labelledby="descent-heading">
      <div className="diver-descent__stage" style={{ "--dive-progress": progress }}>
        <div className="diver-descent__water" aria-hidden="true" />
        <div className="diver-descent__rays" aria-hidden="true"><i /><i /><i /></div>
        <div className="diver-descent__rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="diver-descent__life" aria-hidden="true">
          <Jellyfish className="descent-jelly--near" />
          <Jellyfish className="descent-jelly--far" />
          <Jellyfish className="descent-jelly--small" />
          <SeaLife />
          <Bubbles count={40} variant="dive" />
        </div>

        <div className="diver-descent__visual" aria-hidden="true">
          <Suspense fallback={<img className="diver-descent__still" src="/images/diving.png" alt="" />}>
            <DescentScene inView={inView} progressRef={progressRef} />
          </Suspense>
        </div>

        <div className="diver-descent__topline">
          <span className="diver-descent__eyebrow">02 / The descent</span>
          <span className="diver-descent__zone">Twilight zone <span aria-hidden="true">/</span> 200–1,000 m</span>
        </div>

        <div className="diver-descent__story">
          <p className="diver-descent__chapter">{String(chapterIndex + 1).padStart(2, "0")} / {chapter.label}</p>
          <div className="diver-descent__copy" key={chapterIndex}>
            <h2 id="descent-heading">{chapter.title}<br /><em>{chapter.emphasis}</em></h2>
            <p>{chapter.body}</p>
          </div>
          <a className="diver-descent__skip" href="#about">Explore the field notes <span aria-hidden="true">↘</span></a>
        </div>

        <div className="diver-descent__bottomline">
          <div className="diver-descent__readout">
            <span>Portfolio depth</span>
            <strong>{meters}<small> m</small></strong>
          </div>
          <div className="diver-descent__journey" aria-label={`Descent ${Math.round(progress * 100)}% complete`}>
            <div className="diver-descent__track"><span /></div>
            <ol>
              {CHAPTERS.map((item, index) => (
                <li key={item.label} className={index === chapterIndex ? "is-current" : ""} aria-current={index === chapterIndex ? "step" : undefined}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="diver-descent__step-label">{item.label}</span>
                </li>
              ))}
            </ol>
          </div>
          <span className="diver-descent__scroll">Scroll to descend <span aria-hidden="true">↓</span></span>
        </div>
      </div>
    </section>
  );
}
