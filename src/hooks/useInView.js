import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is within (or near) the viewport. Used to pause
 * expensive, continuously-animating WebGL canvases once they've scrolled
 * well out of view instead of letting every 3D scene on the page keep
 * rendering forever in the background — a real, measurable performance
 * cost on a site with several Three.js canvases.
 *
 * `rootMargin` extends the detection area so the scene resumes a little
 * before it's actually visible, avoiding a visible "pop-in" on re-entry.
 */
export default function useInView(rootMargin = "200px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(true); // assume visible on first paint

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
