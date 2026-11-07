import { useEffect, useRef, useState } from "react";

/**
 * Tracks 0 -> 1 progress through a tall wrapper element as the user scrolls
 * past it — used for scroll-pinned sequences (like DiverDescent) where a
 * sticky inner stage animates based on how far through the *wrapper* you've
 * scrolled, independent of the whole-page depth gauge.
 *
 * The wrapper should be taller than 100vh (e.g. 250vh) with a sticky child
 * pinned to the viewport; progress reaches 1 right as the wrapper's bottom
 * edge reaches the bottom of the viewport.
 */
export default function useSectionScrollProgress(enabled = true) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let rafId;
    let ticking = false;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Use the actual sticky stage height: mobile browser chrome can make
      // 100svh differ from innerHeight and otherwise shift the chapter timing.
      const viewportH = el.firstElementChild?.getBoundingClientRect().height ?? window.innerHeight;
      const total = rect.height - viewportH;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      setProgress(p);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(measure);
        ticking = true;
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return { ref, progress };
}
