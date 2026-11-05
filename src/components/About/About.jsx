import { motion } from "framer-motion";
import Bubbles from "../Particles/Bubbles";
import SeaLife from "../Hero/SeaLife";
import "./About.css";

const PRINCIPLES = [
  {
    number: "01",
    color: "#3FE8D3",
    title: "Systems, not just screens",
    body: "A good interface is only as reliable as what's running underneath it. I spend as much time on architecture, state, and data flow as I do on pixels.",
  },
  {
    number: "02",
    color: "#5EC9F0",
    title: "Experiences, not features",
    body: "I'm not just trying to ship a checklist. I want to build things people genuinely enjoy using — or things that quietly get out of their way entirely.",
  },
  {
    number: "03",
    color: "#F0D65E",
    title: "Ease, not friction",
    body: "The work I care most about is the kind that makes someone's actual life a little easier — one less thing to think about, one less step to take.",
  },
];

export default function About({ depthLabel }) {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <Bubbles count={12} />
      <SeaLife variant="ambient" school={1} />

      <div className="about__inner">
        <div className="about__header">
          <div className="about__intro">
            <motion.span
              className="about__marker"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
            >
              {depthLabel} / Field notes
            </motion.span>

            <motion.h2
              className="about__heading"
              id="about-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              I don't just ship apps.
              <br />
              <span>I build the systems people don't notice — because they just work.</span>
            </motion.h2>

            <motion.p
              className="about__body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              I love creating systems and apps that ease people's lives — the
              kind of software that disappears into someone's day instead of
              adding to it. And when I'm building something user-facing, I try
              not to think of it as "an app." I think of it as an experience:
              how it feels to open it, how confident someone feels using it,
              whether it still makes sense six months from now.
            </motion.p>
          </div>

          <motion.div
            className="about__note"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            aria-hidden="true"
          >
            <span className="about__note-index">MH / 01</span>
            <span className="about__note-rule" />
            <span className="about__note-caption">How I approach the work</span>
          </motion.div>
        </div>

        <div className="about__principles" aria-label="Engineering principles">
          {PRINCIPLES.map((principle, index) => (
            <motion.article
              key={principle.number}
              className="about__principle"
              style={{ "--accent": principle.color }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="about__principle-index">
                <span>{principle.number}</span>
                <span className="about__principle-node" aria-hidden="true" />
              </div>
              <div className="about__principle-content">
                <h3 className="about__principle-title">{principle.title}</h3>
                <p className="about__principle-body">{principle.body}</p>
              </div>
              <span className="about__principle-line" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
