"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { HeroScreenConfig } from "@/types/screen";
import { generateCanLabelTexture } from "@/utils/generateCanTexture";

interface NitroCanProps {
  activeScreen: HeroScreenConfig;
}

export default function NitroCan({ activeScreen }: NitroCanProps) {
  const outerGroupRef = useRef<THREE.Group>(null);
  const interactiveGroupRef = useRef<THREE.Group>(null);
  const dropletsRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const responsiveScale = useMemo(() => {
    const base = Math.min(viewport.width / 4.75, 1.06);
    return Math.max(base, 0.46);
  }, [viewport.width]);

  const labelTexture = useMemo(() => {
    return generateCanLabelTexture(
      activeScreen.accentColor,
      `${activeScreen.accentColor}77`
    );
  }, [activeScreen.accentColor]);

  useEffect(() => {
    return () => {
      labelTexture.dispose();
    };
  }, [labelTexture]);

  useEffect(() => {
    if (!outerGroupRef.current) return;
    const [rx, ry, rz] = activeScreen.canRotation;

    gsap.to(outerGroupRef.current.rotation, {
      x: rx,
      y: ry,
      z: rz,
      duration: 1.15,
      ease: "power3.out",
    });
  }, [activeScreen]);

  // Subtle clear 3D condensation droplets along the front surface
  const dropletCount = 95;
  useEffect(() => {
    if (!dropletsRef.current) return;
    const dummy = new THREE.Object3D();
    const radius = 0.661;

    for (let i = 0; i < dropletCount; i++) {
      const angle = ((i * 137.508) % 360) * (Math.PI / 180);
      const y = (((i * 73) % 100) / 100 - 0.5) * 2.25;

      dummy.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      dummy.lookAt(0, y, 0);

      const size = 0.007 + (i % 4) * 0.003;
      dummy.scale.set(size, size * 1.2, size * 0.45);
      dummy.updateMatrix();
      dropletsRef.current.setMatrixAt(i, dummy.matrix);
    }
    dropletsRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (!interactiveGroupRef.current) return;
    const targetX = state.pointer.y * 0.22;
    const targetY = state.pointer.x * 0.32;

    interactiveGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      interactiveGroupRef.current.rotation.x,
      targetX,
      0.065
    );
    interactiveGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      interactiveGroupRef.current.rotation.y,
      targetY,
      0.065
    );
  });

  // Black shrink-wrap sleeve material for tapered shoulders (matches original)
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

  // Brushed aluminum material ONLY for the thin top rim & bottom lip
  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cfd4da",
        metalness: 0.92,
        roughness: 0.22,
      }),
    []
  );

  return (
    <Float speed={2.1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={interactiveGroupRef} scale={responsiveScale}>
        <group ref={outerGroupRef} rotation={activeScreen.canRotation}>
          {/* Main Can Body: -Math.PI / 2 aligns texture center (cx) directly toward camera */}
          <mesh rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.66, 0.66, 2.58, 64, 1, true]} />
            <meshPhysicalMaterial
              map={labelTexture}
              metalness={0.28}
              roughness={0.28}
              clearcoat={0.55}
              clearcoatRoughness={0.2}
            />
          </mesh>

          {/* 3D Clear Condensation Water Droplets */}
          <instancedMesh
            ref={dropletsRef}
            args={[undefined, undefined, dropletCount]}
          >
            <sphereGeometry args={[1, 10, 10]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0.05}
              roughness={0.02}
              transmission={0.92}
              ior={1.33}
              clearcoat={1}
              transparent
              opacity={0.45}
            />
          </instancedMesh>

          {/* Matte Black Tapered Top Shoulder */}
          <mesh position={[0, 1.385, 0]} material={blackWrapMaterial}>
            <cylinderGeometry args={[0.56, 0.66, 0.19, 64]} />
          </mesh>

          {/* Thin Silver Top Rim Lip (matches original) */}
          <mesh position={[0, 1.5, 0]} material={aluminumMaterial}>
            <cylinderGeometry args={[0.575, 0.575, 0.045, 64]} />
          </mesh>

          {/* Top Lid Cap */}
          <mesh
            position={[0, 1.515, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={aluminumMaterial}
          >
            <circleGeometry args={[0.565, 64]} />
          </mesh>

          {/* Matte Black Tapered Bottom Base */}
          <mesh position={[0, -1.375, 0]} material={blackWrapMaterial}>
            <cylinderGeometry args={[0.66, 0.55, 0.17, 64]} />
          </mesh>

          {/* Thin Silver Bottom Rim */}
          <mesh position={[0, -1.47, 0]} material={aluminumMaterial}>
            <cylinderGeometry args={[0.55, 0.55, 0.025, 64]} />
          </mesh>
        </group>
      </group>

      {/* Focused Key Light to make the neon lightning & NITRO logo pop */}
      <pointLight
        position={[0, 1.4, 2.8]}
        intensity={14}
        color={activeScreen.accentColor}
      />
    </Float>
  );
}