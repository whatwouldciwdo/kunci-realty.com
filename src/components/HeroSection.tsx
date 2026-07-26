"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="hero-container"
      style={{
        width: "100%",
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0 4% 1.5rem 4%",
        position: "relative",
      }}
    >
      <style jsx>{`
        @media (max-width: 640px) {
          .hero-container {
            min-height: 85vh !important;
            height: auto !important;
            padding: 32vh 5% 4rem 5% !important;
            justify-content: center !important;
          }
          .hero-subtext-container {
            display: none !important;
          }
          .hero-title {
            font-size: clamp(3rem, 14.8vw, 4.6rem) !important;
            line-height: 0.88 !important;
            padding: 0 0.25em 0 0 !important;
          }
          .hero-metadata-bar {
            padding-top: 0.75rem !important;
            margin-top: 0 !important;
          }
        }
      `}</style>

      {/* Top Right Subtext Block */}
      <div className="hero-subtext-container" style={{ display: "flex", justifyContent: "flex-end", paddingTop: "clamp(1rem, 3.5vh, 4rem)", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ maxWidth: "340px", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
        >
          {/* Blue Filled Square Bullet */}
          <span
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#0B3B8E",
              display: "inline-block",
              marginTop: "6px",
              flexShrink: 0,
            }}
          />
          {/* Paragraph Text */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1.125rem)",
              lineHeight: 1.45,
              color: "#1c1917",
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Properti Kunci Realty lebih dari sekadar bangunan.
            <br />
            Dirancang personal, disesuaikan untuk Anda.
          </p>
        </motion.div>
      </div>

      {/* Main Giant Brand Typography */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          padding: "0",
          userSelect: "none",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="hero-title"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(3.8rem, 15.2vw, 24rem)",
            fontWeight: 800,
            color: "#0B3B8E",
            letterSpacing: "-0.04em",
            margin: 0,
            padding: "0 0.4em 0 0",
            width: "auto",
            display: "inline-block",
            textAlign: "left",
            lineHeight: 0.92,
            whiteSpace: "nowrap",
          }}
        >
          Kunci.Realty
        </motion.h1>
      </div>

      {/* Bottom Metadata Footer Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hero-metadata-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingTop: "0.75rem",
          fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
          fontWeight: 500,
          color: "#333333",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <span>EST. 1990</span>
        <span>JAKARTA</span>
      </motion.div>
    </section>
  );
}
