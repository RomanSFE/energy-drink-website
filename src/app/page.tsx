"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HERO_SCREENS } from "@/config/screens";
import HeroShowcase from "@/components/sections/HeroShowcase";
import HeritageShowcase from "@/components/sections/HeritageShowcase";
import GalleryShowcase from "@/components/sections/GalleryShowcase";

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = HERO_SCREENS[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % HERO_SCREENS.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActiveIndex((prev) =>
          prev === 0 ? HERO_SCREENS.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      {/* Persistent 3D WebGL Can Layer active for Screens 1 & 2 */}
      {activeIndex < 2 && <SceneCanvas activeScreen={activeScreen} />}

      {/* Screen Orchestrator */}
      {activeIndex === 0 && (
        <HeroShowcase
          screens={HERO_SCREENS}
          activeIndex={activeIndex}
          onSelectScreen={setActiveIndex}
        />
      )}
      {activeIndex === 1 && (
        <HeritageShowcase
          screens={HERO_SCREENS}
          activeIndex={activeIndex}
          onSelectScreen={setActiveIndex}
        />
      )}
      {activeIndex === 2 && (
        <GalleryShowcase
          screens={HERO_SCREENS}
          activeIndex={activeIndex}
          onSelectScreen={setActiveIndex}
        />
      )}
    </main>
  );
}