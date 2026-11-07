import { useCallback, useEffect, useRef, useState } from "react";

// A lost GPU context can leave an opaque canvas over the CSS background.
// Remove that canvas and keep the section usable with its static artwork.
export default function useWebGLFallback() {
  const [unavailable, setUnavailable] = useState(false);
  const cleanupRef = useRef(null);

  useEffect(() => () => cleanupRef.current?.(), []);

  const onCreated = useCallback(({ gl }) => {
    cleanupRef.current?.();
    const canvas = gl.domElement;
    const onContextLost = () => setUnavailable(true);
    canvas.addEventListener("webglcontextlost", onContextLost);
    cleanupRef.current = () => canvas.removeEventListener("webglcontextlost", onContextLost);
    // Also catch a context that was lost before this listener was attached.
    if (gl.getContext().isContextLost()) setUnavailable(true);
  }, []);

  return { unavailable, onCreated };
}
