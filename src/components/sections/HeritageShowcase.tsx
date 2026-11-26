"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/layout/Navbar";
import FooterBar from "@/components/layout/FooterBar";
import { HeroScreenConfig } from "@/types/screen";

interface HeritageShowcaseProps {
  screens: HeroScreenConfig[];
  activeIndex: number;
  onSelectScreen: (index: number) => void;
}

export default function HeritageShowcase({
  screens,
  activeIndex,
  onSelectScreen,
}: HeritageShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const activeScreen = screens[activeIndex];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".heritage-nav",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo(
          ".heritage-card",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".heritage-title-line",
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          "-=0.6"
        );
    },
    { scope: containerRef, dependencies: [activeIndex] }
  );

  return (
    <section
      ref={containerRef}
      className="heritage-section"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100dvh",
        width: "100%",
        overflowX: "hidden",
        padding: "clamp(16px, 3vw, 24px) clamp(16px, 4vw, 32px)",
        background: activeScreen.bgGradient,
        boxSizing: "border-box",
      }}
    >
      <div
        className="heritage-nav"
        style={{ width: "100%", position: "relative", zIndex: 40 }}
      >
        <Navbar accentColor={activeScreen.accentColor} />
      </div>

      {/* Main Responsive Split Body */}
      <div
        className="heritage-body"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1400px",
          margin: "auto",
          gap: "clamp(20px, 4vw, 32px)",
          pointerEvents: "none",
        }}
      >
        {/* Left Action Sports Photo Card (sits behind 3D Can layer) */}
        <div
          className="heritage-card"
          style={{
            width: "clamp(260px, 34vw, 460px)",
            height: "clamp(185px, 37vw, 470px)",
            borderRadius: "clamp(18px, 2.5vw, 28px)",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
            position: "relative",
            zIndex: 1,
            pointerEvents: "auto",
            backgroundColor: "#111",
            flexShrink: 0,
          }}
        >
          <img
            src="/textures/action-sports.jpg"
            alt="Action Sports Soccer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Stacked Display Typography */}
        <div
          className="heritage-typography"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
            zIndex: 30,
            pointerEvents: "auto",
          }}
        >
          <h1
            className="font-nitro-display heritage-title-line"
            style={{
              fontFamily:
                "var(--font-sakana), var(--font-display), Impact, sans-serif",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              fontSize: "clamp(3.2rem, 11vw, 13.5rem)",
              margin: 0,
              backgroundImage: activeScreen.textGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SINCE
          </h1>
          <h1
            className="font-nitro-display heritage-title-line"
            style={{
              fontFamily:
                "var(--font-sakana), var(--font-display), Impact, sans-serif",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              fontSize: "clamp(3.2rem, 11vw, 13.5rem)",
              margin: 0,
              backgroundImage: activeScreen.textGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            2002
          </h1>
          <h1
            className="font-nitro-display heritage-title-line"
            style={{
              fontFamily:
                "var(--font-sakana), var(--font-display), Impact, sans-serif",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              fontSize: "clamp(2.7rem, 9.5vw, 11.5rem)",
              margin: 0,
              backgroundImage: activeScreen.textGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PRODUCING
          </h1>
        </div>
      </div>

      <div style={{ width: "100%", position: "relative", zIndex: 40 }}>
        <FooterBar
          screens={screens}
          activeIndex={activeIndex}
          onSelectScreen={onSelectScreen}
        />
      </div>

      {/* Responsive Breakpoints for Tablet & Mobile */}
      <style jsx>{`
        @media (max-width: 900px) {
          .heritage-body {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 16px 0;
          }
          .heritage-card {
            width: 85vw !important;
            max-width: 420px !important;
            height: 230px !important;
          }
          .heritage-typography {
            align-items: center !important;
            text-align: center !important;
            margin-top: 12px;
          }
        }

        @media (max-width: 480px) {
          .heritage-card {
            width: 90vw !important;
            height: 190px !important;
          }
        }
      `}</style>
    </section>
  );
}