import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./ProjectCard.css";

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  // Once true, the iframe is mounted and stays mounted for good — hovering
  // off and back on just toggles opacity instead of tearing it down, so
  // the embedded site never has to reload (full-page flicker fixed
  // earlier). The iframe itself still only loads on hover-intent, not on
  // scroll-into-view — eagerly loading every project's full external site
  // (one of which is itself a Three.js app) for every visitor who merely
  // scrolls past would work against the "reduce overall weight" goal. The
  // actual latency fix is the preconnect hint below: the browser opens
  // the connection (DNS + TLS) as soon as the card is in view, so by the
  // time someone hovers, only the page content itself has to load.
  const [primed, setPrimed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const primeTimeout = useRef(null);

  useEffect(() => () => clearTimeout(primeTimeout.current), []);

  const preconnect = () => {
    if (!project.url || document.querySelector(`link[href="${project.url}"]`))
      return;
    try {
      const origin = new URL(project.url).origin;
      if (document.querySelector(`link[data-preconnect="${origin}"]`)) return;
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = origin;
      link.crossOrigin = "anonymous";
      link.dataset.preconnect = origin;
      document.head.appendChild(link);
    } catch {
      // malformed URL — skip the hint, hover still works normally
    }
  };

  const startHover = () => {
    setHovered(true);
    // Small hover-intent delay: a quick mouse pass over the card (e.g.
    // while scrolling) shouldn't kick off a network request for an
    // iframe the person never meant to look at.
    if (!primed) {
      primeTimeout.current = setTimeout(() => setPrimed(true), 80);
    }
  };

  const stopHover = () => {
    setHovered(false);
    clearTimeout(primeTimeout.current);
  };

  return (
    <motion.article
      className="project-card"
      style={{ "--accent": index % 2 === 0 ? "#3FE8D3" : "#5EC9F0" }}
      aria-labelledby={`project-${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={preconnect}
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      onFocus={startHover}
      onBlur={stopHover}
      tabIndex={0}
    >
      <div className="project-card__showcase">
        <div className="project-card__frame">
          {imageFailed || !project.image ? (
            // Graceful fallback so a missing/broken thumbnail never shows
            // the browser's native broken-image icon — just the project's
            // initial, styled to match the rest of the card.
            <div className="project-card__thumb-fallback" aria-hidden="true">
              <div className="project-card__thumb-fallback-mark">
                <span>{project.title.charAt(0)}</span>
              </div>
              <span className="project-card__thumb-fallback-label">
                Preview on hover
              </span>
            </div>
          ) : (
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              className="project-card__thumb"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          )}

          {primed && project.url && (
            <div
              className={`project-card__preview ${hovered ? "is-visible" : ""}`}
            >
              {/* The preview never captures scrolling or pointer input. */}
              <iframe
                title={`${project.title} live preview`}
                src={project.url}
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
                className="project-card__iframe"
                sandbox="allow-scripts allow-same-origin"
              />
              {!iframeLoaded && (
                <div className="project-card__preview-loading">
                  surfacing preview…
                </div>
              )}
            </div>
          )}

        </div>

        <div className="project-card__links">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="project-card__visit"
            >
              Visit live site ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="project-card__code"
            >
              View Code ↗
            </a>
          )}
        </div>
      </div>

      <div className="project-card__meta">
        <span className="project-card__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-card__node" aria-hidden="true" />
        <span className="project-card__label">Selected work / {String(index + 1).padStart(2, "0")}</span>
        <h3 className="project-card__title" id={`project-${project.id}`}>{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <ul className="project-card__stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
