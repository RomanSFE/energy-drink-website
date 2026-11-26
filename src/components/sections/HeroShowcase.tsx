"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/layout/Navbar";
import FooterBar from "@/components/layout/FooterBar";
import { HeroScreenConfig } from "@/types/screen";

interface HeroShowcaseProps {
  screens: HeroScreenConfig[];
  activeIndex: number;
  onSelectScreen: (index: number) => void;
}

export default function HeroShowcase({
  screens,
  activeIndex,
  onSelectScreen,
}: HeroShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isFirstMount = useRef(true);
  const activeScreen = screens[activeIndex];

  // 1. Initial entrance animation (fromTo guarantees opacity always lands at 1)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-nav",
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75 }
      )
        .fromTo(
          ".hero-wordmark",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.95 },
          "-=0.45"
        )
        .fromTo(
          ".hero-footer-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 },
          "-=0.55"
        );
    },
    { scope: containerRef }
  );

  // 2. Smooth 0.65s pulse when switching between screens (same as before)
  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-wordmark",
        { scale: 0.96, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 0.65, ease: "power3.out" }
      );
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        padding: "24px 32px",
        background: activeScreen.bgGradient,
        boxSizing: "border-box",
        transition: "background 0.6s ease",
      }}
    >
      <Navbar accentColor={activeScreen.accentColor} />

      {/* Center Giant Display Typography */}
      <div
        style={{
          position: "relative",
          margin: "auto 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h1
          aria-label={activeScreen.brandTitle}
          className="hero-wordmark font-nitro-display"
          style={{
            userSelect: "none",
            textAlign: "center",
            fontFamily:
              "var(--font-sakana), var(--font-display), Impact, sans-serif",
            fontWeight: 800,
            fontStyle: "italic",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            fontSize: "clamp(6rem, 28.5vw, 35.5rem)",
            paddingInline: "0.1em",
            margin: 0,
            backgroundImage: activeScreen.textGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {activeScreen.brandTitle}
        </h1>
      </div>

      <FooterBar
        screens={screens}
        activeIndex={activeIndex}
        onSelectScreen={onSelectScreen}
      />
    </section>
  );
}