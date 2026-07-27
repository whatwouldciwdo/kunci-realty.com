"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface FooterSectionProps {
  onTalkClick?: () => void;
}

export default function FooterSection({ onTalkClick }: FooterSectionProps) {
  return (
    <motion.footer
      id="footer-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="footer-container"
      style={{
        backgroundColor: "#0B3B8E",
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "4rem 4% 1.75rem 4%",
        position: "relative",
      }}
    >
      <style jsx>{`
        .footer-nav-link {
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 500;
          position: relative;
          padding-bottom: 2px;
          display: inline-block;
          transition: opacity 0.2s ease;
        }
        .footer-nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background-color: #ffffff;
          transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-nav-link:hover::after {
          width: 100%;
        }

        .footer-social-link {
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          transition: opacity 0.2s ease;
        }
        .footer-social-link:hover {
          opacity: 0.75;
        }

        .desktop-only {
          display: flex;
        }
        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .footer-container {
            padding: 2.5rem 5% 1.5rem 5% !important;
            min-height: auto !important;
          }
          .footer-mobile-nav-item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.85rem 0;
          }
          .footer-mobile-title {
            font-family: var(--font-heading);
            font-size: clamp(2.8rem, 14.5vw, 4.8rem) !important;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.04em;
            margin: 1.5rem 0 2rem 0;
            line-height: 0.9 !important;
            white-space: nowrap;
          }
        }
      `}</style>

      {/* DESKTOP LAYOUT (> 768px) */}
      <div
        className="desktop-only"
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "calc(100vh - 5.75rem)",
          width: "100%",
        }}
      >
        {/* Top Layout Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* Left Column: White Brand Logo & Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {/* White Logo Icon */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logo/KUNCI REALTY.png"
                alt="Kunci Realty Logo"
                style={{
                  height: "54px",
                  width: "auto",
                  objectFit: "contain",
                  mixBlendMode: "screen",
                  display: "block",
                }}
              />
            </div>

            {/* Vertical Links */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              <li>
                <Link href="/" className="footer-nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="footer-nav-link">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/search" className="footer-nav-link">
                  Office Space
                </Link>
              </li>
              <li>
                <Link href="/search" className="footer-nav-link">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/search" className="footer-nav-link">
                  Resorts
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-nav-link">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#talk"
                  className="footer-nav-link"
                  onClick={(e) => {
                    if (onTalkClick) {
                      e.preventDefault();
                      onTalkClick();
                    }
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Right Column: Social Links & Recently Completed Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "2.5rem",
            }}
          >
            {/* Top Right Social Links */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                Instagram <ArrowUpRight size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                Facebook <ArrowUpRight size={14} />
              </a>
            </div>

            {/* "■ Recently completed" Block */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.85rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#ffffff",
                    display: "inline-block",
                    borderRadius: "1px",
                  }}
                />
                Properti Terbaru
              </div>

              {/* Project Image Card */}
              <div
                style={{
                  width: "360px",
                  height: "210px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Image
                  src="/images/haven_bespoke.jpg"
                  alt="Proyek Terbaru - Calibre"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "1rem 1.25rem",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  <span>Calibre</span>
                  <span style={{ fontWeight: 400, opacity: 0.9 }}>2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Giant White Brand Typography: Kunci.Realty */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            padding: "2rem 0 0 0",
            userSelect: "none",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3.8rem, 15.2vw, 24rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              margin: 0,
              padding: "0 0.5em 0 0",
              width: "auto",
              display: "inline-block",
              textAlign: "left",
              lineHeight: 0.92,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            Kunci.Realty
          </motion.h2>
        </div>

        {/* Bottom Metadata Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: "0.75rem",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.8)",
            letterSpacing: "0.04em",
            marginTop: "0.5rem",
          }}
        >
          <span>©1990—2026</span>
        </motion.div>
      </div>

      {/* MOBILE LAYOUT (<= 768px) - MATCHING USER SCREENSHOT */}
      <div
        className="mobile-only"
        style={{
          flexDirection: "column",
          gap: "1.75rem",
          width: "100%",
        }}
      >
        {/* Top Mobile Header Row: Logo on Left, "■ Bespoke Luxury" on Right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src="/logo/KUNCI REALTY.png"
            alt="Kunci Realty Logo"
            style={{
              height: "36px",
              width: "auto",
              objectFit: "contain",
              mixBlendMode: "screen",
              display: "block",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "#ffffff",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                backgroundColor: "#ffffff",
                display: "inline-block",
                borderRadius: "1px",
              }}
            />
            Hunian Eksklusif
          </div>
        </div>

        {/* Vertical Links List with Thin Lines */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
          <div className="footer-mobile-nav-item">
            <Link href="/" className="footer-nav-link">Home</Link>
          </div>
          <div className="footer-mobile-nav-item">
            <Link href="/search" className="footer-nav-link">Apartments</Link>
          </div>
          <div className="footer-mobile-nav-item">
            <Link href="/search" className="footer-nav-link">Office Space</Link>
          </div>
          <div className="footer-mobile-nav-item">
            <Link href="/search" className="footer-nav-link">Houses</Link>
          </div>
          <div className="footer-mobile-nav-item">
            <Link href="/search" className="footer-nav-link">Resorts</Link>
          </div>
          <div className="footer-mobile-nav-item">
            <Link href="/about" className="footer-nav-link">About Us</Link>
          </div>
          <div className="footer-mobile-nav-item">
            <a
              href="#talk"
              className="footer-nav-link"
              onClick={(e) => {
                if (onTalkClick) {
                  e.preventDefault();
                  onTalkClick();
                }
              }}
            >
              Kontak
            </a>
          </div>
        </div>

        {/* Social Links Aligned Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            Instagram <ArrowUpRight size={14} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            Facebook <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Giant Title: Kunci.Realty */}
        <h2 className="footer-mobile-title">Kunci.Realty</h2>

        {/* "■ Recently completed" Block */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.85rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#ffffff",
                display: "inline-block",
                borderRadius: "1px",
              }}
            />
            <span>Properti Terbaru</span>
          </div>

          {/* Full Width Mobile Card */}
          <div
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Image
              src="/images/haven_bespoke.jpg"
              alt="Proyek Terbaru - Calibre"
              fill
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "1rem 1.25rem",
                color: "#ffffff",
                fontSize: "0.95rem",
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
              }}
            >
              <span>Calibre</span>
              <span style={{ fontWeight: 400, opacity: 0.9 }}>2026</span>
            </div>
          </div>
        </div>

        {/* Mobile Copyright Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.8)",
            letterSpacing: "0.04em",
            marginTop: "1rem",
          }}
        >
          <span>©1990—2026</span>
        </div>
      </div>
    </motion.footer>
  );
}
