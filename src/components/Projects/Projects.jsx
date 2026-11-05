import { motion } from "framer-motion";
import Bubbles from "../Particles/Bubbles";
import SeaLife from "../Hero/SeaLife";
import projects from "../../data/projects";
import ProjectCard from "./ProjectCard";
import "../../styles/fieldLog.css";
import "./Projects.css";

export default function Projects({ depthLabel }) {
  return (
    <section className="projects field-section" id="projects" aria-labelledby="projects-heading">
      <Bubbles count={10} />
      <SeaLife variant="ambient" school={4} />
      <div className="field-section__inner">
        <div className="field-section__header">
          <div className="field-section__intro">
            <motion.span className="field-section__marker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }}>
              {depthLabel} / Selected projects
            </motion.span>
            <motion.h2 className="field-section__heading" id="projects-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              Ideas brought<br /><span>to the surface.</span>
            </motion.h2>
            <motion.p className="field-section__body" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, delay: 0.1 }}>
              A selection of things I've built — from local stories to interactive experiences. Hover or focus a project to surface a live preview.
            </motion.p>
          </div>
          <motion.div className="field-section__note" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, delay: 0.1 }} aria-label={`${projects.length} selected projects`}>
            <span>Project archive</span>
            <strong>{String(projects.length).padStart(2, "0")}</strong>
            <span className="field-section__note-caption">Selected builds</span>
          </motion.div>
        </div>
        <div className="projects__log">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
