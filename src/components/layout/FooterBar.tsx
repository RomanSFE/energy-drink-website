"use client";

import { HeroScreenConfig } from "@/types/screen";

interface FooterBarProps {
  screens: HeroScreenConfig[];
  activeIndex: number;
  onSelectScreen: (index: number) => void;
}

const SOCIALS = [
  { id: "facebook", label: "f", href: "#facebook" },
  { id: "instagram", label: "ig", href: "#instagram" },
  { id: "x", label: "x", href: "#x" },
  { id: "linkedin", label: "in", href: "#linkedin" },
];

export default function FooterBar({
  screens,
  activeIndex,
  onSelectScreen,
}: FooterBarProps) {
  const activeScreen = screens[activeIndex];

  return (
    <div
      className="hero-footer-item footer-container"
      style={{
        position: "relative",
        zIndex: 40,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: "16px",
      }}
    >
      {/* Left Micro Description */}
      <p
        style={{
          maxWidth: "240px",
          fontSize: "8.5px",
          lineHeight: 1.5,
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.65)",
          margin: 0,
          textTransform: "uppercase",
        }}
        className="footer-desc"
      >
        {activeScreen.description}
      </p>

      {/* Center Action Buttons + Switcher Dots */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              cursor: "pointer",
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "9px 22px",
              fontSize: "11px",
              fontWeight: 700,
              border: "none",
            }}
          >
            Buy Now
          </button>
          <button
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              color: "#ffffff",
              padding: "9px 22px",
              fontSize: "11px",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            More info
          </button>
        </div>

        {/* Screen Switcher Dots */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
      </div>

      {/* Right Socials */}
      <div style={{ display: "flex", gap: "8px" }}>
        {SOCIALS.map((soc) => (
          <a
            key={soc.id}
            href={soc.href}
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              border: `1px solid ${activeScreen.accentColor}`,
              color: activeScreen.accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            {soc.label}
          </a>
        ))}
      </div>

      {/* Responsive Style Adjustments for Mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
          }
          .footer-desc {
            max-width: 100% !important;
            font-size: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}