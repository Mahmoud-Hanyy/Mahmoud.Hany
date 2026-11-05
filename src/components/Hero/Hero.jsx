import { motion } from "framer-motion";
import OceanScene from "./OceanScene";
import SeaLife from "./SeaLife";
import Bubbles from "../Particles/Bubbles";
import Portrait from "./Portrait";
import AmbientSound from "../Audio/AmbientSound";
import RotatingPhrase from "./RotatingPhrase";
import "./Hero.css";

const JOURNEY_STOPS = [
  { number: "01", label: "Surface", href: "#surface", current: true },
  { number: "02", label: "Descent", href: "#descent" },
  { number: "03", label: "Skill reef", href: "#skills" },
];

export default function Hero({ meters, depthZone }) {
  return (
    <section className="hero" id="surface">
      <div className="hero__scene" aria-hidden="true">
        <OceanScene />
      </div>

      <Bubbles count={10} />
      <SeaLife variant="ambient" school={0} />

      <div className="hero__content">
        <div className="hero__row">
          <motion.div
            className="hero__copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Portfolio / Field log 001
            </p>

            <h1 className="hero__name">
              Mahmoud
              <br />
              <span>Hany.</span>
            </h1>

            <p className="hero__role">Software Engineer</p>

            <p className="hero__subtitle">
              I build interfaces the way I <span className="hero__dive-word">dive</span>{" "}
              <RotatingPhrase />
            </p>

            <div className="hero__actions">
              <a href="#descent" className="hero__btn hero__btn--primary">
                <span>Begin the descent</span>
                <span className="hero__btn-icon" aria-hidden="true">
                  ↓
                </span>
              </a>
              <a href="#skills" className="hero__btn hero__btn--secondary">
                <span>Explore my skills</span>
                <span className="hero__btn-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <div className="hero__experience">
              <span className="hero__experience-mark" aria-hidden="true">
                02+
              </span>
              <span>
                <strong>Years below the surface</strong>
                <small>Learning by building, one layer at a time</small>
              </span>
            </div>
          </motion.div>

          <motion.div
            className="hero__figure"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__figure-wash" aria-hidden="true" />
            <span className="hero__figure-coordinate" aria-hidden="true">
              29°58&apos;N / 31°08&apos;E
            </span>
            <Portrait />
            <div
              className="hero__depth-readout"
              aria-label={`Current depth: ${meters} meters, ${depthZone}`}
            >
              <span>Current depth</span>
              <strong>
                {meters}<span>m</span>
              </strong>
              <small>{depthZone}</small>
            </div>
          </motion.div>
        </div>

        <nav className="hero__journey" aria-label="Dive journey">
          <span className="hero__journey-title">The journey</span>
          <div className="hero__journey-route">
            {JOURNEY_STOPS.map((stop, index) => (
              <a
                className={`hero__journey-stop${stop.current ? " is-current" : ""}`}
                href={stop.href}
                aria-current={stop.current ? "location" : undefined}
                key={stop.number}
              >
                <span className="hero__journey-node">{stop.number}</span>
                <span>{stop.label}</span>
                {index < JOURNEY_STOPS.length - 1 && (
                  <span className="hero__journey-line" aria-hidden="true" />
                )}
              </a>
            ))}
          </div>
          <a className="hero__scroll-cue" href="#descent">
            <span>Scroll to dive</span>
            <span className="hero__scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </nav>
      </div>

      <AmbientSound />
    </section>
  );
}
