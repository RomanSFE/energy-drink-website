"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/layout/Navbar";
import { GALLERY_FLAVORS } from "@/config/screens";
import { HeroScreenConfig } from "@/types/screen";

interface GalleryShowcaseProps {
  screens: HeroScreenConfig[];
  activeIndex: number;
  onSelectScreen: (index: number) => void;
}

export default function GalleryShowcase({
  screens,
  activeIndex,
  onSelectScreen,
}: GalleryShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedFlavor, setSelectedFlavor] = useState(2); // NITRO GREEN center
  const activeScreen = screens[activeIndex];

  useGSAP(
    () => {
      gsap.fromTo(
        ".gallery-card",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out" }
      );
    },
    { scope: containerRef }
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
        padding: "clamp(16px, 3vw, 24px) clamp(16px, 4vw, 32px)",
        background: activeScreen.bgGradient,
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Navbar accentColor={activeScreen.accentColor} />

      {/* Responsive Lineup Container */}
      <div className="gallery-scroll-container">
        <div className="gallery-grid">
          {GALLERY_FLAVORS.map((flavor, index) => {
            const isCenter = index === selectedFlavor;
            return (
              <div
                key={flavor.id}
                className="gallery-card"
                onClick={() => setSelectedFlavor(index)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: isCenter ? 1 : 0.65,
                  transform: isCenter ? "scale(1.06) translateY(-6px)" : "scale(0.9)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  flexShrink: 0,
                }}
              >
                {/* Can Image Container */}
                <div
                  className="gallery-can-wrapper"
                  style={{
                    width: isCenter ? "clamp(130px, 15vw, 170px)" : "clamp(100px, 11vw, 120px)",
                    height: isCenter ? "clamp(240px, 28vw, 320px)" : "clamp(180px, 20vw, 230px)",
                    position: "relative",
                    marginBottom: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    filter: isCenter
                      ? `drop-shadow(0 0 25px ${flavor.accent}66)`
                      : `drop-shadow(0 0 8px rgba(0,0,0,0.5))`,
                    transition: "all 0.4s ease",
                  }}
                >
                  <img
                    src={flavor.texture}
                    alt={flavor.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Ellipse Floor Shadow */}
                <div
                  style={{
                    width: isCenter ? "110px" : "80px",
                    height: "12px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${flavor.accent}55 0%, rgba(42,42,42,0.8) 60%, transparent 100%)`,
                    marginBottom: "10px",
                    filter: "blur(3px)",
                    transform: "scaleY(0.4)",
                    transition: "all 0.4s ease",
                  }}
                />

                {/* Label Info */}
                <h3
                  className="font-nitro-display"
                  style={{
                    fontSize: isCenter ? "clamp(1rem, 1.8vw, 1.15rem)" : "0.9rem",
                    fontStyle: "italic",
                    fontWeight: 900,
                    color: "#ffffff",
                    margin: "0 0 2px 0",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {flavor.name}
                </h3>
                <p
                  style={{
                    fontSize: "8.5px",
                    color: "rgba(255,255,255,0.65)",
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {flavor.intensity}
                </p>
                <span
                  style={{
                    fontSize: isCenter ? "1rem" : "0.85rem",
                    fontWeight: 700,
                    color: flavor.accent,
                  }}
                >
                  {flavor.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen Switcher Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          paddingBottom: "8px",
        }}
      >
        {screens.map((screen, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={screen.id}
              type="button"
              onClick={() => onSelectScreen(idx)}
              aria-label={`Switch to screen ${screen.id}`}
              style={{
                height: "7px",
                width: isActive ? "22px" : "7px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                backgroundColor: isActive
                  ? screen.accentColor
                  : "rgba(255,255,255,0.3)",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </div>

      {/* Responsive Styles: Horizontal Scroll on Mobile */}
      <style jsx>{`
        .gallery-scroll-container {
          width: 100%;
          margin: auto 0;
          display: flex;
          justify-content: center;
        }

        .gallery-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(12px, 2.5vw, 40px);
          width: 100%;
          max-width: 1300px;
        }

        @media (max-width: 960px) {
          .gallery-scroll-container {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 10px 4px;
            scrollbar-width: none; /* Firefox */
          }
          .gallery-scroll-container::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
          }
          .gallery-grid {
            justify-content: flex-start;
            gap: 20px;
            padding: 0 16px;
          }
        }
      `}</style>
    </section>
  );
}