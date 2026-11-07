import { Canvas } from "@react-three/fiber";
import { Plankton } from "./OceanScene";
import DiverPlane from "./DiverPlane";
import useWebGLFallback from "../../hooks/useWebGLFallback";

export default function DescentScene({ inView, progressRef }) {
  const { unavailable, onCreated } = useWebGLFallback();
  const fallback = <img className="diver-descent__still" src="/images/diving.png" alt="" />;
  if (unavailable) return fallback;

  return (
    <Canvas
      className="diver-descent__canvas"
      onCreated={onCreated}
      fallback={fallback}
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={inView ? "always" : "never"}
    >
      {/* Give the renderer its own ocean background rather than relying on
          transparent canvas compositing over the CSS water layer. */}
      <color attach="background" args={["#071f38"]} />
      <fog attach="fog" args={["#0a2e4d", 7, 18]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} />
      <Plankton count={140} />
      <DiverPlane progressRef={progressRef} />
    </Canvas>
  );
}
