import { motion } from "framer-motion";
import Bubbles from "../Particles/Bubbles";
import SeaLife from "../Hero/SeaLife";
import skillCategories from "../../data/skillCategories";
import "./Skills.css";

const skillCount = skillCategories.reduce(
  (total, category) => total + category.items.length,
  0
);

export default function Skills({ depthLabel }) {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-heading">
      <Bubbles count={14} />
      <SeaLife variant="ambient" school={2} />

      <div className="skills__inner">
        <div className="skills__header">
          <div className="skills__intro">
            <motion.span
              className="skills__marker"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
            >
              {depthLabel} / Technical log
            </motion.span>
            <motion.h2
              className="skills__heading"
              id="skills-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              My toolkit,
              <br />
              <span>layer by layer.</span>
            </motion.h2>
            <motion.p
              className="skills__body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              A field log of the languages, technologies, fundamentals, and
              tools I use to bring ideas to the surface.
            </motion.p>
          </div>

          <motion.div
            className="skills__specimen"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            aria-label={`${skillCategories.length} skill groups, ${skillCount} skills`}
          >
            <span className="skills__specimen-label">Dive inventory</span>
            <strong>{String(skillCategories.length).padStart(2, "0")}</strong>
            <span className="skills__specimen-divider" />
            <strong>{String(skillCount).padStart(2, "0")}</strong>
            <span className="skills__specimen-caption">
              groups <span aria-hidden="true">/</span> skills
            </span>
          </motion.div>
        </div>

        <div className="skills__log" aria-label="Technical skills by category">
          {skillCategories.map((category, index) => (
            <motion.article
              key={category.label}
              className="skills__layer"
              style={{ "--accent": category.color }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="skills__layer-heading">
                <span className="skills__layer-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="skills__layer-node" aria-hidden="true" />
                <h3 className="skills__layer-title">{category.label}</h3>
                <span className="skills__layer-count">
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="skills__items">
                {category.items.map((item) => (
                  <li className="skills__item" key={item}>
                    <span className="skills__item-mark" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
