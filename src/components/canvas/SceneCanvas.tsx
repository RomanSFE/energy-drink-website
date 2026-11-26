"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import NitroCan from "./NitroCan";
import { HeroScreenConfig } from "@/types/screen";

interface SceneCanvasProps {
  activeScreen: HeroScreenConfig;
}

export default function SceneCanvas({ activeScreen }: SceneCanvasProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 5]} intensity={2.4} />
        <directionalLight
          position={[-4, -3, 3]}
          intensity={1.1}
          color={activeScreen.accentColor}
        />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <NitroCan activeScreen={activeScreen} />
          <ContactShadows
            position={[0, -1.25, 0]}
            opacity={0.75}
            scale={10}
            blur={2.5}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}