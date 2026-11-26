"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface GalleryCanProps {
  texturePath: string;
  isSelected: boolean;
  accentColor: string;
}

export default function GalleryCan({
  texturePath,
  isSelected,
  accentColor,
}: GalleryCanProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Load and configure crystal-clear texture filtering
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(texturePath);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 16;
    return tex;
  }, [texturePath]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.1;
    const targetY = state.pointer.x * 0.18;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.08
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.08
    );
  });

  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d8dce0",
        metalness: 0.94,
        roughness: 0.2,
      }),
    []
  );

  const blackWrapMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#050505",
        metalness: 0.25,
        roughness: 0.32,
        clearcoat: 0.5,
      }),
    []
  );

  return (
    <Float
      speed={isSelected ? 2.2 : 1.4}
      rotationIntensity={0.08}
      floatIntensity={isSelected ? 0.25 : 0.12}
    >
      <group
        ref={groupRef}
        rotation={[0.06, 0, 0]}
        scale={isSelected ? 1.05 : 0.88}
      >
        {/* Main 3D Cylinder Body (Optimized height 2.2 to prevent cut-off) */}
        <mesh rotation={[0, Math.PI, 0]} position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.58, 0.58, 2.2, 64, 1, true]} />
          <meshPhysicalMaterial
            map={texture}
            metalness={0.25}
            roughness={0.28}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Matte Black Tapered Top Shoulder */}
        <mesh position={[0, 1.18, 0]} material={blackWrapMaterial}>
          <cylinderGeometry args={[0.48, 0.58, 0.16, 64]} />
        </mesh>

        {/* Thin Silver Top Rim Lip */}
        <mesh position={[0, 1.27, 0]} material={aluminumMaterial}>
          <cylinderGeometry args={[0.495, 0.495, 0.03, 64]} />
        </mesh>

        {/* Top Lid Cap */}
        <mesh
          position={[0, 1.29, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={aluminumMaterial}
        >
          <circleGeometry args={[0.49, 64]} />
        </mesh>

        {/* Matte Black Tapered Bottom Base */}
        <mesh position={[0, -1.18, 0]} material={blackWrapMaterial}>
          <cylinderGeometry args={[0.58, 0.48, 0.16, 64]} />
        </mesh>

        {/* Thin Silver Bottom Rim */}
        <mesh position={[0, -1.27, 0]} material={aluminumMaterial}>
          <cylinderGeometry args={[0.48, 0.48, 0.025, 64]} />
        </mesh>

        {/* Floor Shadow Ellipse (Matches provided reference image) */}
        <mesh position={[0, -1.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 0.75, 32]} />
          <meshBasicMaterial
            color="#2a2a2a"
            transparent
            opacity={isSelected ? 0.85 : 0.5}
          />
        </mesh>
        <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.75, 32]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={isSelected ? 0.35 : 0.12}
          />
        </mesh>
      </group>
    </Float>
  );
}