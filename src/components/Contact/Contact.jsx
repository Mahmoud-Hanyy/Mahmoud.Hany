import { motion } from "framer-motion";
import Bubbles from "../Particles/Bubbles";
import SeaLife from "../Hero/SeaLife";
import Shark from "./Shark";
import "../../styles/fieldLog.css";
import "./Contact.css";

const CHANNELS = [
  { label: "Email", value: "mahmoud.hany.mahmoud@outlook.com", href: "mailto:mahmoud.hany.mahmoud@outlook.com", caption: "Start a conversation" },
  { label: "GitHub", value: "Mahmoud-Hanyy", href: "https://github.com/Mahmoud-Hanyy", caption: "Explore the code", external: true },
  { label: "LinkedIn", value: "Mahmoud Hany", href: "https://linkedin.com/in/mahmoud-hanyy", caption: "Let's connect", external: true },
];

export default function Contact({ depthLabel }) {
  return (
    <section className="contact field-section" id="contact" aria-labelledby="contact-heading">
      <Bubbles count={9} />
      <SeaLife variant="ambient" school={5} />
      <Shark />
      <div className="field-section__inner">
        <div className="field-section__header">
          <div className="field-section__intro">
            <motion.span className="field-section__marker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }}>
              {depthLabel} / Open channel
            </motion.span>
            <motion.h2 className="field-section__heading" id="contact-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              Nothing left but us.<br /><span>Let's talk.</span>
            </motion.h2>
            <motion.p className="field-section__body" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, delay: 0.1 }}>
              Have an idea to explore, a system to build, or a team I could be part of? I'd love to hear what you're working on.
            </motion.p>
          </div>
          <motion.div className="field-section__note" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span>Based in</span>
            <strong>Alexandria</strong>
            <span className="field-section__note-caption">Egypt / 31°12′N 29°55′E</span>
          </motion.div>
        </div>

        <div className="contact__channels" aria-label="Contact channels">
          {CHANNELS.map((channel, index) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noreferrer" : undefined}
              className="contact__channel"
              style={{ "--accent": index === 1 ? "#5EC9F0" : "#3FE8D3" }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="contact__channel-label">
                <span className="contact__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="contact__node" aria-hidden="true" />
                {channel.label}
              </span>
              <span className="contact__channel-content">
                <span className="contact__channel-value">{channel.value}</span>
                <span className="contact__channel-caption">{channel.caption}</span>
              </span>
              <span className="contact__arrow" aria-hidden="true">↗</span>
            </motion.a>
          ))}
        </div>

        <footer className="contact__footer">
          <span>Built in React. Made with depth.</span>
          <a href="#surface">Back to the surface <span aria-hidden="true">↑</span></a>
        </footer>
      </div>
    </section>
  );
}
