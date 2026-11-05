import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./SoundPrompt.css";

/**
 * A one-time modal shown on first load, asking the visitor to opt into
 * ambient sound. Browsers block autoplaying audio anyway, so this turns
 * that limitation into a deliberate moment instead of a button most
 * people would never notice in the corner — meaning most visitors who
 * want the full experience actually get it.
 */
export default function SoundPrompt({ onAccept, onDecline }) {
  const acceptRef = useRef(null);

  useEffect(() => {
    acceptRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onDecline();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onDecline]);

  return (
    <div className="sound-prompt-overlay" onClick={onDecline}>
      <motion.div
        className="sound-prompt"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sound-prompt-heading"
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="sound-prompt__eyebrow">Before you dive</span>
        <h2 id="sound-prompt-heading" className="sound-prompt__heading">
          This site is built for sound.
        </h2>
        <p className="sound-prompt__body">
          Turn on the underwater ambience for the full experience — or
          continue in silence, it works either way.
        </p>
        <div className="sound-prompt__actions">
          <button
            ref={acceptRef}
            type="button"
            className="sound-prompt__btn sound-prompt__btn--primary"
            onClick={onAccept}
          >
            Enable Sound
          </button>
          <button
            type="button"
            className="sound-prompt__btn sound-prompt__btn--secondary"
            onClick={onDecline}
          >
            Continue Muted
          </button>
        </div>
      </motion.div>
    </div>
  );
}
