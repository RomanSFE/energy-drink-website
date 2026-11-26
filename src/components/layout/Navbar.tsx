"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  accentColor: string;
}

const NAV_LINKS = [
  { label: "Home", href: "#home", active: true },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ accentColor }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="hero-nav"
      style={{
        position: "relative",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Brand */}
        <a
          href="#home"
          className="font-nitro-display"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
            fontStyle: "italic",
            fontWeight: 900,
            textDecoration: "none",
            color: accentColor,
            transition: "color 0.4s ease",
          }}
        >
          NITRO
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: "flex",
            gap: "clamp(1rem, 2.5vw, 2.5rem)",
            alignItems: "center",
            fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
            fontWeight: 500,
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: item.active ? "#ffffff" : "rgba(255,255,255,0.75)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            style={{
              cursor: "pointer",
              backgroundColor: accentColor,
              color: "#000000",
              padding: "7px 18px",
              fontSize: "0.75rem",
              fontWeight: 700,
              border: "none",
              transition: "all 0.3s",
            }}
          >
            Buy Now
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: accentColor,
              cursor: "pointer",
            }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "20px",
            marginTop: "12px",
            backgroundColor: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: item.active ? accentColor : "#ffffff",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive Inline CSS Helper */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}