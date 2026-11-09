import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import useInView from "../../hooks/useInView";
import useWebGLFallback from "../../hooks/useWebGLFallback";

/** A field of soft, glowing plankton/bubble points drifting upward. */
export function Plankton({ count = 400 }) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1;
      posAttr.array[idx] += delta * 0.25;
      if (posAttr.array[idx] > 6) posAttr.array[idx] = -6;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#3FE8D3"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Slanted volumetric-looking light shafts, like sun piercing the surface. */
function LightRays() {
  const groupRef = useRef(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
  });

  const rays = useMemo(() => [-3, -1, 1.5, 3.5], []);

  return (
    <group ref={groupRef} rotation={[0, 0, -0.25]}>
      {rays.map((x, i) => (
        <mesh key={i} position={[x, 2, -4]}>
          <planeGeometry args={[0.9, 14]} />
          <meshBasicMaterial
            color="#9fe8ff"
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function OceanScene() {
  // Avoid running the Hero and Descent WebGL loops at the same time when
  // they meet near the fold. Start and stop each scene at its viewport edge.
  const [containerRef, inView] = useInView("0px");
  const { unavailable, onCreated } = useWebGLFallback();

  if (unavailable) return null;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        className="ocean-scene__canvas"
        onCreated={onCreated}
        fallback={null}
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={inView ? "always" : "never"}
      >
        <fog attach="fog" args={["#0a2e4d", 6, 16]} />
        <ambientLight intensity={0.6} />
        <LightRays />
      </Canvas>
    </div>
  );
}
