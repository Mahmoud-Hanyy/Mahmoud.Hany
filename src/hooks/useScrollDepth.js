import { useEffect, useState } from "react";

/**
 * Tracks scroll progress through the whole page (0 -> 1) and converts
 * it into a "meters below surface" figure used by the DepthGauge,
 * the background gradient, and the fog density in the 3D scenes.
 *
 * maxDepth: the meters value at the very bottom of the page (abyss).
 */
export default function useScrollDepth(maxDepth = 4000) {
  const [progress, setProgress] = useState(0);
  const [meters, setMeters] = useState(0);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(p);
      setMeters(Math.round(p * maxDepth));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [maxDepth]);

  return { progress, meters };
}
