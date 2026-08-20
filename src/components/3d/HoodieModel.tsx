import { useMemo } from 'react';
import * as THREE from 'three';
import { useProductStore } from '../../store/useProductStore';

/**
 * Procedural black hoodie.
 *
 * NOTE: the requested `hoodie_black.glb` asset was not provided in this
 * sandbox, so the hoodie is built from primitives. To swap in a real GLB,
 * replace the body of <HoodieGeometry> with:
 *
 *   import { useGLTF } from '@react-three/drei';
 *   const { scene } = useGLTF('/models/hoodie_black.glb');
 *   return <primitive object={scene} />;
 *
 * and keep <HoodieModel> as the wrapper that applies the selected color
 * material across all child meshes.
 */
export function HoodieGeometry() {
  const color = useProductStore((s) => s.color);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color.hex,
        roughness: 0.92,
        metalness: 0.04,
      }),
    [color.hex],
  );

  const ribMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color.hex,
        roughness: 0.9,
        metalness: 0.02,
      }),
    [color.hex],
  );

  return (
    <group>
      {/* Torso */}
      <mesh material={mat} position={[0, 1.1, 0]} castShadow>
        <capsuleGeometry args={[0.72, 1.1, 8, 24]} />
      </mesh>

      {/* Hood */}
      <mesh material={mat} position={[0, 2.15, 0.02]} castShadow>
        <sphereGeometry args={[0.42, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
      </mesh>

      {/* Left sleeve */}
      <group position={[-0.78, 1.55, 0]} rotation={[0, 0, -0.35]} castShadow>
        <mesh material={mat}>
          <capsuleGeometry args={[0.24, 0.85, 6, 16]} />
        </mesh>
      </group>
      {/* Right sleeve */}
      <group position={[0.78, 1.55, 0]} rotation={[0, 0, 0.35]} castShadow>
        <mesh material={mat}>
          <capsuleGeometry args={[0.24, 0.85, 6, 16]} />
        </mesh>
      </group>

      {/* Left cuff */}
      <mesh material={ribMat} position={[-1.5, 1.1, 0]} rotation={[0, 0, -0.35]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.34, 16]} />
      </mesh>
      {/* Right cuff */}
      <mesh material={ribMat} position={[1.5, 1.1, 0]} rotation={[0, 0, 0.35]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.34, 16]} />
      </mesh>

      {/* Ribbed waistband */}
      <mesh material={ribMat} position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.66, 0.72, 0.34, 24]} />
      </mesh>

      {/* Kangaroo pocket */}
      <mesh material={mat} position={[0, 1.02, 0.74]} castShadow>
        <boxGeometry args={[0.9, 0.42, 0.18]} />
      </mesh>

      {/* Drawstrings */}
      <mesh material={ribMat} position={[-0.12, 1.95, 0.32]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />
      </mesh>
      <mesh material={ribMat} position={[0.12, 1.95, 0.32]} rotation={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />
      </mesh>

      {/* Subtle seam lines to suggest stitching (dark) */}
      <mesh position={[0, 1.1, 0.76]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.56, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HoodieModel() {
  return (
    <group rotation={[0, 0.4, 0]}>
      <HoodieGeometry />
    </group>
  );
}
