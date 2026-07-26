"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const carouselSlides = [
  {
    image: "/images/haven_penthouse_1.jpg",
    caption: "Calibre Penthouse",
    specs: [
      { label: "Luas Bangunan", value: "620 sqm" },
      { label: "Kamar Tidur", value: "4 Beds, 5 Baths" },
      { label: "Luas Tanah", value: "850 sqm" },
      { label: "Harga", value: "Rp 32.500.000.000" },
    ],
  },
  {
    image: "/images/haven_villa_1.jpg",
    caption: "Kebayoran Villa",
    specs: [
      { label: "Luas Bangunan", value: "780 sqm" },
      { label: "Kamar Tidur", value: "5 Beds, 6 Baths" },
      { label: "Luas Tanah", value: "1,100 sqm" },
      { label: "Harga", value: "Rp 48.000.000.000" },
    ],
  },
  {
    image: "/images/haven_coastal_1.jpg",
    caption: "Coastal Haven",
    specs: [
      { label: "Luas Bangunan", value: "540 sqm" },
      { label: "Kamar Tidur", value: "4 Beds, 4 Baths" },
      { label: "Luas Tanah", value: "720 sqm" },
      { label: "Harga", value: "Rp 24.500.000.000" },
    ],
  },
  {
    image: "/images/haven_seq_1.jpg",
    caption: "Bespoke Manor",
    specs: [
      { label: "Luas Bangunan", value: "910 sqm" },
      { label: "Kamar Tidur", value: "6 Beds, 7 Baths" },
      { label: "Luas Tanah", value: "1,450 sqm" },
      { label: "Harga", value: "Rp 65.000.000.000" },
    ],
  },
  {
    image: "/images/haven_bespoke.jpg",
    caption: "Senopati Residence",
    specs: [
      { label: "Luas Bangunan", value: "490 sqm" },
      { label: "Kamar Tidur", value: "3 Beds, 4 Baths" },
      { label: "Luas Tanah", value: "600 sqm" },
      { label: "Harga", value: "Rp 38.000.000.000" },
    ],
  },
];

export default function LatestPropertySection() {
  const [currentIndex, setCurrentIndex] = useState(4); // Default to 5/5 slide matching reference
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState<"Prev" | "Next">("Next");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Left half = Prev, Right half = Next
    if (x < rect.width / 2) {
      setCursorText("Prev");
    } else {
      setCursorText("Next");
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      // Prev slide
      setCurrentIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    } else {
      // Next slide
      setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
    }
  };

  return (
    <section className="latest-property-section">
      <style jsx>{`
        .latest-property-section {
          margin-top: 11rem;
          padding: 4rem 3.1vw 9rem;
          background: #ffffff;
          color: #292929;
        }

        .collaborators-grid {
          display: grid;
          grid-template-columns: 33% 1fr;
          column-gap: 2.2vw;
          align-items: stretch;
        }

        .left-col {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-right: 1.5vw;
        }

        .header-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #222222;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid #dcdcdc;
          letter-spacing: -0.01em;
        }

        .square-icon {
          width: 8px;
          height: 8px;
          background-color: #222222;
          display: inline-block;
          flex-shrink: 0;
        }

        .description-text {
          font-size: clamp(1.08rem, 1.3vw, 1.25rem);
          line-height: 1.5;
          letter-spacing: -0.015em;
          color: #222222;
          margin-top: 2.8rem;
          margin-bottom: 4.5rem;
          max-width: 100%;
        }

        .right-col {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .carousel-media-box {
          position: relative;
          width: 100%;
          height: 680px;
          overflow: hidden;
          background-color: #1a1a1a;
          cursor: none;
        }

        .carousel-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .carousel-footer-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-top: 1.2rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: #111111;
          letter-spacing: -0.01em;
          width: 100%;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .latest-property-section {
            margin-top: 5rem;
            padding: 2rem 5% 5rem;
          }
          .collaborators-grid {
            display: flex;
            flex-direction: column;
            gap: 3rem;
          }
          .left-col {
            padding-right: 0;
          }
          .carousel-media-box {
            height: 440px;
            cursor: pointer;
          }
        }
      `}</style>

      <div className="collaborators-grid">
        {/* Left Column: Details & Dynamic Property Specs Table */}
        <motion.div
          className="left-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="header-row">
            <span className="square-icon" />
            <span>Latest property</span>
          </div>

          <p className="description-text">
            Kunci Realty bermitra dengan arsitek dan desainer terkemuka untuk mewujudkan ide dengan integritas dan presisi. Hubungan kami dibangun di atas kepercayaan, perhatian pada detail, dan rasa hormat bersama terhadap desain.
          </p>

          <div className="collaborators-table" style={{ width: "100%", borderTop: "1px solid #b5b5b5" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {carouselSlides[currentIndex].specs.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1.15rem 0",
                      borderBottom: "1px solid #b5b5b5",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 400,
                        color: "#222222",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        color: "#111111",
                        textAlign: "right",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column: Interactive Image Carousel Showcase */}
        <motion.div
          className="right-col"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.15 }}
        >
          {/* Interactive Carousel Image Container with Prev/Next Cursor */}
          <div
            className="carousel-media-box"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={handleImageClick}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                className="carousel-image"
                src={carouselSlides[currentIndex].image}
                alt={carouselSlides[currentIndex].caption}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Subtle Dark Touch Overlay on Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.25 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#000000",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />

            {/* Custom Prev/Next Floating Text Cursor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{ type: "spring", stiffness: 650, damping: 42, opacity: { duration: 0.2 } }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                translateX: "-50%",
                translateY: "-50%",
                pointerEvents: "none",
                zIndex: 20,
                color: "#ffffff",
                fontSize: "clamp(2.2rem, 3.5vw, 3.8rem)",
                fontWeight: 400,
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.03em",
                textShadow: "0 4px 24px rgba(0,0,0,0.6)",
                userSelect: "none",
              }}
            >
              {cursorText}
            </motion.div>
          </div>

          {/* Bottom Bar: Slide Counter (5/5) & Caption (Neatly Inset & Fully Visible) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              boxSizing: "border-box",
              paddingTop: "1.2rem",
              paddingLeft: "0.2rem",
              paddingRight: "4vw",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#111111",
              letterSpacing: "-0.01em",
              gap: "1.5rem",
            }}
          >
            <span style={{ fontWeight: 700, color: "#111111", flexShrink: 0 }}>
              {`${currentIndex + 1}/${carouselSlides.length}`}
            </span>
            <span
              style={{
                fontWeight: 700,
                color: "#111111",
                textAlign: "right",
                whiteSpace: "nowrap",
                marginRight: "1rem",
              }}
            >
              {carouselSlides[currentIndex]?.caption || ""}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
