import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useUnderwaterAmbience from "./useUnderwaterAmbience";
import SoundPrompt from "./SoundPrompt";
import "./AmbientSound.css";

/**
 * Underwater ambience, synthesized in-browser (see useUnderwaterAmbience.js
 * — no audio file needed). On first load this asks via a modal rather than
 * relying on a small corner button most visitors would never notice —
 * browsers block autoplay regardless, so the moment has to be deliberate
 * either way; a modal just makes sure people actually see it. Once a
 * decision is made, a small persistent toggle stays available to change
 * their mind without reloading.
 */
export default function AmbientSound() {
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [decided, setDecided] = useState(false);
  const { start, stop } = useUnderwaterAmbience();

  useEffect(() => {
    const id = setTimeout(() => setShowPrompt(true), 500);
    return () => clearTimeout(id);
  }, []);

  const accept = () => {
    start();
    setPlaying(true);
    setDecided(true);
    setShowPrompt(false);
  };

  const decline = () => {
    setDecided(true);
    setShowPrompt(false);
  };

  const toggle = () => {
    if (playing) {
      stop();
    } else {
      start();
    }
    setPlaying((p) => !p);
  };

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <SoundPrompt onAccept={accept} onDecline={decline} />
        )}
      </AnimatePresence>

      {decided && (
        <button
          type="button"
          className="ambient-sound"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={
            playing ? "Mute underwater ambience" : "Play underwater ambience"
          }
        >
          <span className={`ambient-sound__icon ${playing ? "is-on" : ""}`} />
          {playing ? "Sound on" : "Sound off"}
        </button>
      )}
    </>
  );
}
