import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const IMAGE_ASPECT = 1024 / 1536; // width / height of the diving photo

/**
 * Your photo, rendered as a lit plane in real 3D space. `progressRef` is a
 * mutable ref so useFrame can read the latest scroll position and ease
 * the mesh toward the target pose.
 */
export default function DiverPlane({ progressRef }) {
  const meshRef = useRef(null);
  const { scene, viewport, size } = useThree();
  const texture = useTexture("/images/diving.png");

  const height = 4.6;
  const width = height * IMAGE_ASPECT;

  useFrame(() => {
    const p = progressRef.current;
    if (!meshRef.current) return;

    // Keep the diver beside the story on desktop and below it on mobile.
    // A shallow descent keeps the subject in view throughout the sequence.
    const mobile = size.width <= 760;
    const targetX = mobile ? viewport.width * 0.03 : viewport.width * 0.22;
    const targetY = mobile ? -p * 0.15 : 0.45 - p * 1.35;
    const targetZ = -p * (mobile ? 0.4 : 1.2);
    const targetRotX = p * 0.18;
    const targetRotZ = -0.08 + Math.sin(p * Math.PI * 2) * 0.04;
    const mobileScale = Math.min(
      viewport.height * 0.82 / height,
      viewport.width * 0.85 / width
    );
    const targetScale = mobile ? mobileScale * (1 - p * 0.08) : 1.08 - p * 0.1;

    meshRef.current.position.x +=
      (targetX - meshRef.current.position.x) * 0.08;

    meshRef.current.position.y +=
      (targetY - meshRef.current.position.y) * 0.08;
    meshRef.current.position.z +=
      (targetZ - meshRef.current.position.z) * 0.08;
    meshRef.current.rotation.x +=
      (targetRotX - meshRef.current.rotation.x) * 0.08;
    meshRef.current.rotation.z +=
      (targetRotZ - meshRef.current.rotation.z) * 0.08;
    meshRef.current.scale.x +=
      (targetScale - meshRef.current.scale.x) * 0.08;
    meshRef.current.scale.y +=
      (targetScale - meshRef.current.scale.y) * 0.08;

    // Fog thickens and darkens with depth, same idea as the rest of the site.
    if (scene.fog) {
      scene.fog.near = 7 - p;
      scene.fog.far = 18 - p * 3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.4, 0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        depthWrite={false}
        map={texture}
        transparent
        emissive="#0a2e4d"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}
