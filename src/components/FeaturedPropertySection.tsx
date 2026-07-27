"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface InteractiveMediaCardProps {
  leftText: string;
  rightText: string;
  maxWidth: string;
  height: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function InteractiveMediaCard({
  leftText,
  rightText,
  maxWidth,
  height,
  style = {},
  children,
}: InteractiveMediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [relY, setRelY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    const clampedY = Math.max(30, Math.min(rect.height - 30, y));
    setRelY(clampedY);
  };

  return (
    <div
      className="interactive-media-card"
      style={{
        position: "relative",
        width: "100%",
        maxWidth,
        height,
        overflow: "hidden",
        cursor: "none",
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* Subtle Dark Touch Overlay on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.32 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Left Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, y: relY }}
        transition={{ type: "spring", stiffness: 450, damping: 35, opacity: { duration: 0.25 } }}
        style={{
          position: "absolute",
          left: "2.5rem",
          top: 0,
          translateY: "-50%",
          color: "#ffffff",
          fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {leftText}
      </motion.div>

      {/* Right Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, y: relY }}
        transition={{ type: "spring", stiffness: 450, damping: 35, opacity: { duration: 0.25 } }}
        style={{
          position: "absolute",
          right: "2.5rem",
          top: 0,
          translateY: "-50%",
          color: "#ffffff",
          fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {rightText}
      </motion.div>

      {/* Custom Follow Arrow Cursor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8, x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 700, damping: 45, opacity: { duration: 0.2 } }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 15,
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.4))" }}
        >
          <path d="M22 78 L68 32 V68 H82 V18 H32 V32 H68 L22 78 Z" fill="#ffffff" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function FeaturedPropertySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <section className="featured-property-section">
      <style jsx>{`
        .featured-property-section {
          padding: 7rem 3.1vw 7.5rem;
          background: #fff;
          color: #292929;
        }
        .property-title-row {
          border-bottom: 1px solid #d6d6d6;
          padding-bottom: 2.2rem;
        }
        .property-title {
          margin: 0;
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.0;
        }
        .property-grid {
          display: grid;
          grid-template-columns: 42% 1fr;
          column-gap: 2.5vw;
          padding-top: 2.2rem;
        }
        .property-label {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.35;
          color: #292929;
        }
        .property-label::before {
          content: "";
          width: 8px;
          height: 8px;
          margin-top: 0.35rem;
          background: #292929;
          flex: 0 0 auto;
        }
        .property-copy {
          max-width: 660px;
          font-size: clamp(1rem, 1.32vw, 1.28rem);
          line-height: 1.48;
          letter-spacing: -0.02em;
          color: #292929;
        }
        .property-copy p { margin: 0; }
        .property-link {
          display: inline-block;
          margin-top: 2rem;
          margin-bottom: 2.5rem;
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          padding-bottom: 0.2rem;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
          transition: opacity 0.2s;
        }
        .property-link:hover {
          opacity: 0.7;
        }
        .property-media-wrapper {
          margin-top: 6.5rem;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .dual-media-grid {
          display: grid;
          grid-template-columns: 48% 48%;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          margin-top: 8.5rem;
        }
        .media-media-item {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .left-media-col {
          width: 100%;
          display: flex;
          justify-content: flex-start;
        }
        .right-media-col {
          width: 100%;
          display: flex;
          justify-content: flex-start;
        }
        .interactive-media-card:hover .media-media-item {
          transform: scale(1.02);
        }
        @media (max-width: 768px) {
          .featured-property-section {
            padding: 3.5rem 5% 4rem;
          }
          .property-title-row {
            padding-bottom: 1.25rem;
          }
          .property-title {
            font-size: clamp(2rem, 9vw, 2.8rem) !important;
          }
          .property-grid {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding-top: 1.5rem;
          }
          .property-label {
            font-size: 0.9rem;
          }
          .property-copy {
            font-size: 0.95rem;
            line-height: 1.55;
            max-width: 100%;
          }
          .property-link {
            margin-top: 1.25rem;
            margin-bottom: 0;
          }
          .property-media-wrapper {
            margin-top: 2.5rem;
          }
          .dual-media-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            margin: 2.5rem 0 0 !important;
            gap: 1.5rem !important;
          }
          .left-media-col {
            width: 100% !important;
            max-width: 100% !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .right-media-col {
            width: 100% !important;
            max-width: 100% !important;
            margin-top: 0 !important;
          }
          .interactive-media-card {
            max-width: 100% !important;
            height: 300px !important;
            cursor: pointer !important;
          }
        }
      `}</style>

      <div className="property-title-row">
        <motion.h2
          className="property-title"
          style={{
            fontSize: "clamp(2.6rem, 3.8vw, 4rem)",
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 1.0,
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          Properti Unggulan
        </motion.h2>
      </div>

      <div className="property-grid">
        <div className="property-label">Lebih dari sekadar properti</div>
        <motion.div
          className="property-copy"
          style={{
            maxWidth: "660px",
            fontSize: "clamp(1rem, 1.32vw, 1.28rem)",
            lineHeight: 1.48,
            letterSpacing: "-0.02em",
            color: "#292929",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <p style={{ marginBottom: "1.85rem" }}>
            Proyek-proyek kami merupakan hasil kepercayaan, kolaborasi yang erat, dan komitmen tanpa kompromi terhadap kualitas. Kami menangani properti dalam jumlah terbatas setiap saat, memastikan setiap hunian mendapatkan waktu, fokus, dan perhatian yang layak.
          </p>
          <p>
            Sebagai agen properti terpercaya dengan pengalaman lebih dari 35 tahun di Indonesia, kami menghadirkan kontinuitas, akuntabilitas, dan kemampuan terbukti untuk setiap proyek. Hasilnya adalah portofolio hunian yang dirancang dengan cermat — proyek-proyek yang didefinisikan oleh presisi, kepedulian, dan keunggulan yang tenang.
          </p>
          <a className="property-link" href="/search">
            Lihat semua properti
          </a>
        </motion.div>
      </div>

      {/* Top Centered Image Showcase (552px x 660px) */}
      <motion.div
        className="property-media-wrapper"
        style={{
          marginTop: isMobile ? "2.5rem" : "6.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <InteractiveMediaCard leftText="Calibre" rightText="2025" maxWidth={isMobile ? "100%" : "552px"} height={isMobile ? "300px" : "660px"}>
          <img
            className="media-media-item"
            src="/images/haven_penthouse_1.jpg"
            alt="Properti unggulan Kunci Realty"
          />
        </InteractiveMediaCard>
      </motion.div>

      {/* Dual Showcase Row: Auto-play Video (Left) & Senopati Image (Right) */}
      <motion.div
        className="dual-media-grid"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "flex-start" : "space-between",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "100%",
          margin: isMobile ? "2rem 0 0" : "8.5rem 0 0",
          gap: isMobile ? "1.5rem" : "4.5rem",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Left Column: Auto-play Muted Video & 2nd Image directly below it */}
        <div
          className="left-media-col"
          style={{
            width: isMobile ? "100%" : "48%",
            maxWidth: isMobile ? "100%" : "720px",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.5rem" : "6.5rem",
          }}
        >
          {/* 1. Auto-play Muted Video (750px x 820px) */}
          <InteractiveMediaCard leftText="Kebayoran" rightText="2025" maxWidth="100%" height={isMobile ? "280px" : "820px"}>
            <video
              ref={(el) => {
                if (el) {
                  el.muted = true;
                  el.play().catch(() => {});
                }
              }}
              src="/video/Kebayoranbaru-kunci.realty.mp4"
              poster="/images/haven_penthouse_1.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                zIndex: 1,
              }}
            >
              <source src="/video/Kebayoranbaru-kunci.realty.mp4" type="video/mp4" />
            </video>
          </InteractiveMediaCard>

          {/* 2. Second Image directly below video with identical width & height (750px x 820px) */}
          <InteractiveMediaCard leftText="Coastal" rightText="2026" maxWidth="100%" height={isMobile ? "280px" : "820px"}>
            <img
              className="media-media-item"
              src="/images/haven_coastal_1.jpg"
              alt="Hunian Coastal Kunci Realty"
            />
          </InteractiveMediaCard>
        </div>

        {/* Right Column: Architectural Image "Senopati" (Expanded width to the right & shifted lower down) */}
        <div className="right-media-col" style={{ width: isMobile ? "100%" : "48%", maxWidth: isMobile ? "100%" : "680px", marginTop: isMobile ? "0" : "6.5rem" }}>
          <InteractiveMediaCard leftText="Senopati" rightText="2026" maxWidth="100%" height={isMobile ? "280px" : "855.02px"}>
            <img
              className="media-media-item"
              src="/images/haven_villa_1.jpg"
              alt="Hunian Senopati Kunci Realty"
            />
          </InteractiveMediaCard>
        </div>
      </motion.div>
    </section>
  );
}