import { motion } from "framer-motion";
import Bubbles from "../Particles/Bubbles";
import SeaLife from "../Hero/SeaLife";
import experience from "../../data/experience";
import "./Experience.css";

const ACCENTS = ["#3FE8D3", "#5EC9F0", "#F0D65E", "#A8B4F0"];

export default function Experience({ depthLabel }) {
  return (
    <section className="experience" id="experience" aria-labelledby="experience-heading">
      <Bubbles count={12} />
      <SeaLife variant="ambient" school={3} />

      <div className="experience__inner">
        <div className="experience__header">
          <div className="experience__intro">
            <motion.span
              className="experience__marker"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
            >
              {depthLabel} / Work experience
            </motion.span>
            <motion.h2
              className="experience__heading"
              id="experience-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              The work,
              <br />
              <span>beneath the surface.</span>
            </motion.h2>
            <motion.p
              className="experience__body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              From teaching the fundamentals to shipping production systems —
              a dive log of the teams, challenges, and experiences that shaped my work.
            </motion.p>
          </div>

          <motion.div
            className="experience__note"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            aria-label={`${experience.length} roles, 2024 to present`}
          >
            <span className="experience__note-label">Career log</span>
            <strong>{String(experience.length).padStart(2, "0")}</strong>
            <span className="experience__note-caption">roles / 2024 — present</span>
          </motion.div>
        </div>

        <ol className="experience__timeline" aria-label="Work experience, most recent first">
          {experience.map((entry, index) => (
            <motion.li
              key={`${entry.company}-${entry.dates}`}
              className="experience__entry"
              style={{ "--accent": ACCENTS[index % ACCENTS.length] }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="experience__identity">
                <span className="experience__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="experience__node" aria-hidden="true" />
                <div className="experience__details">
                  <span className="experience__dates">{entry.dates}</span>
                  <h3 className="experience__role">{entry.role}</h3>
                  <p className="experience__company">{entry.company}</p>
                  <p className="experience__meta">{entry.type} · {entry.location}</p>
                  {index === 0 && <span className="experience__current">Current role</span>}
                </div>
              </div>

              <ul className="experience__bullets">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <span className="experience__entry-line" aria-hidden="true" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
