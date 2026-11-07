import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PHRASES = [
  "\u2014 deliberate, detail-obsessed, and comfortable going deep.",
  "\u2014 a full-stack engineer specializing in real-time, responsive apps.",
  "\u2014 someone who turns complex problems into fast, reliable products.",
];

/**
 * Crossfades through a few short continuations of the subtitle's lead-in
 * sentence. Pauses entirely for prefers-reduced-motion — shows the first
 * phrase only.
 */
export default function RotatingPhrase({ staticText = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (staticText || prefersReducedMotion) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, 3200);
    return () => clearInterval(id);
  }, [staticText]);

  if (staticText) return <span className="hero__rotating-phrase">{PHRASES[0]}</span>;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        className="hero__rotating-phrase"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {PHRASES[index]}
      </motion.span>
    </AnimatePresence>
  );
}
