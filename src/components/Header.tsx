"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavigationModal from "./NavigationModal";

interface HeaderProps {
  onTalkClick?: () => void;
}

export default function Header({ onTalkClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);
  const [isHeaderReady, setIsHeaderReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    // The first sync should reflect the browser's restored scroll position
    // without animating the navbar from its SSR position.
    setIsHeaderReady(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const footerEl = document.getElementById("footer-section");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @media (max-width: 640px) {
          .header-container {
            padding: 1.25rem 5% !important;
          }
          .header-logo-img {
            height: 42px !important;
          }
          .header-navbar-btn {
            left: auto !important;
            right: 5% !important;
            /* Match the vertical center of the 42px mobile logo. The menu
               button is shorter because its label is hidden, so its top
               offset must sit a little lower than the header padding. */
            top: 1.7rem !important;
            transform: none !important;
            min-width: unset !important;
            width: auto !important;
            padding: 0.5rem 0.25rem !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .header-navbar-label {
            display: none !important;
          }
          .header-talk-btn {
            display: none !important;
          }
        }
      `}</style>

      <header
        className="header-container"
        style={{
          width: "100%",
          padding: "1.75rem 4%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Brand Logo - Single Official Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
          aria-label="Kunci Realty Logo"
        >
          <Image
            src="/logo/KUNCI REALTY.png"
            alt="Kunci Realty Logo"
            width={260}
            height={70}
            className="header-logo-img"
            style={{
              height: "65px",
              width: "auto",
              objectFit: "contain",
            }}
            priority
          />
        </Link>

        {/* Center Menu Pill with Fixed Top Center Positioning Floating over Content */}
        <button
          onClick={() => setIsMenuOpen(true)}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
          className="header-navbar-btn"
          style={{
            position: "fixed",
            top: isScrolled ? "1.25rem" : "1.45rem",
            left: "50%",
            transform: isMenuHovered ? "translateX(-50%) translateY(-1px)" : "translateX(-50%)",
            opacity: isMenuOpen || isFooterInView ? 0 : 1,
            pointerEvents: isMenuOpen || isFooterInView ? "none" : "auto",
            zIndex: 90,
            backgroundColor: isMenuHovered || isMenuOpen ? "#0B3B8E" : "#f2f2f4",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            borderRadius: "10px",
            padding: isScrolled
              ? isMenuHovered ? "0.7rem 2.5rem" : "0.7rem 2rem"
              : isMenuHovered ? "0.8rem 3.25rem" : "0.8rem 2.5rem",
            minWidth: isScrolled
              ? isMenuHovered ? "310px" : "280px"
              : isMenuHovered ? "540px" : "500px",
            maxWidth: "calc(100vw - 2rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            willChange: "transform, min-width, padding",
            transition: isHeaderReady ? "all 1.1s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <span
            className="header-navbar-label"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: isMenuHovered || isMenuOpen ? "#ffffff" : "#111827",
              transition: "color 0.2s ease",
            }}
          >
            Menu
          </span>
          {/* Hamburger 2 Horizontal Parallel Lines */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "28px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "1.5px",
                backgroundColor: isMenuHovered || isMenuOpen ? "#ffffff" : "#333333",
                borderRadius: "1px",
                transition: "background-color 0.2s ease",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1.5px",
                backgroundColor: isMenuHovered || isMenuOpen ? "#ffffff" : "#333333",
                borderRadius: "1px",
                transition: "background-color 0.2s ease",
              }}
            />
          </div>
        </button>

        {/* Right Action Link */}
        <button
          onClick={onTalkClick}
          className="header-talk-btn"
          style={{
            background: "none",
            border: "none",
            fontFamily: "var(--font-heading)",
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#111827",
            cursor: "pointer",
            position: "relative",
            padding: "0.4rem 0",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0B3B8E")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
        >
          Let&apos;s Talk
        </button>
      </header>

      {/* Navigation Modal */}
      <NavigationModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onTalkClick={onTalkClick}
        isScrolled={isScrolled}
      />
    </>
  );
}
