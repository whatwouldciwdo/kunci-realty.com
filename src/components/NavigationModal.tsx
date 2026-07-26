"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTalkClick?: () => void;
  isScrolled?: boolean;
}

export default function NavigationModal({ isOpen, onClose, onTalkClick, isScrolled = false }: NavigationModalProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  const menuLinks = [
    { title: "Beranda", href: "#" },
    { title: "Apartemen", href: "#residences" },
    { title: "Ruang Kantor", href: "#residences" },
    { title: "Rumah", href: "#residences" },
    { title: "Resort", href: "#residences" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Clickable backdrop without blur or dimming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "transparent",
              zIndex: 99,
            }}
            onClick={onClose}
          />

          {/* Navigation Panel seamlessly unrolling and expanding from Navbar */}
          <motion.div
            initial={{ opacity: 0, x: "-50%", scaleY: 0.08, scaleX: isScrolled ? 0.58 : 0.92 }}
            animate={{ opacity: 1, x: "-50%", scaleY: 1, scaleX: 1 }}
            exit={{ opacity: 0, x: "-50%", scaleY: 0.08, scaleX: isScrolled ? 0.58 : 0.92 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: isScrolled ? "1.25rem" : "1.45rem",
              left: "50%",
              transformOrigin: "top center",
              width: "calc(100vw - 2rem)",
              maxWidth: "540px",
              maxHeight: "calc(100vh - 2.5rem)",
              overflowY: "auto",
              backgroundColor: "#0B3B8E",
              borderRadius: "10px",
              border: "none",
              zIndex: 100,
              padding: "1.25rem 2.25rem 2.25rem 2.25rem",
              color: "#ffffff",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              willChange: "transform, opacity",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Row: White Brand Logo & Custom Thin X Close Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <Image
                src="/logo/KUNCI REALTY LOGO ONLY.png"
                alt="Kunci Realty Logo"
                width={100}
                height={32}
                style={{
                  height: "28px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />

              {/* Thin X Close Button */}
              <button
                onClick={onClose}
                aria-label="Tutup menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: 0,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="4" y1="4" x2="20" y2="20" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
                  <line x1="20" y1="4" x2="4" y2="20" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Vertical Navigation Links List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {menuLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                    padding: "2.15rem 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => onClose()}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.45rem",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: "#ffffff",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: hoveredIndex === index ? "0.6rem" : "0px",
                      cursor: "pointer",
                      width: "100%",
                      transition: "gap 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* Small square bullet matching user image */}
                    <span
                      style={{
                        width: hoveredIndex === index ? "6px" : "0px",
                        height: "6px",
                        backgroundColor: "#ffffff",
                        borderRadius: "1px",
                        opacity: hoveredIndex === index ? 1 : 0,
                        transform: hoveredIndex === index ? "rotate(180deg) scale(1)" : "rotate(0deg) scale(0)",
                        transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        display: "inline-block",
                        flexShrink: 0,
                        willChange: "transform, opacity, width",
                      }}
                    />
                    <span
                      style={{
                        transform: hoveredIndex === index ? "translateX(12px)" : "translateX(0px)",
                        transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        willChange: "transform",
                        lineHeight: 1,
                      }}
                    >
                      {link.title}
                    </span>
                  </a>
                </motion.div>
              ))}

              {/* Single line for (rata kiri) About Us | Contact (rata kanan) */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 5 * 0.05 }}
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "2.15rem 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.45rem",
                  fontWeight: 500,
                  color: "#ffffff",
                }}
              >
                {/* About Us Link */}
                <a
                  href="#philosophy"
                  onClick={onClose}
                  onMouseEnter={() => setIsAboutHovered(true)}
                  onMouseLeave={() => setIsAboutHovered(false)}
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: isAboutHovered ? "0.6rem" : "0px",
                    cursor: "pointer",
                    transition: "gap 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span
                    style={{
                      width: isAboutHovered ? "6px" : "0px",
                      height: "6px",
                      backgroundColor: "#ffffff",
                      borderRadius: "1px",
                      opacity: isAboutHovered ? 1 : 0,
                      transform: isAboutHovered ? "rotate(180deg) scale(1)" : "rotate(0deg) scale(0)",
                      transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      transform: isAboutHovered ? "translateX(6px)" : "translateX(0px)",
                      transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    Tentang Kami
                  </span>
                </a>

                <span style={{ opacity: 0.4, fontWeight: 300 }}>|</span>

                {/* Contact Link - Hover Effect from the RIGHT */}
                <a
                  href="#talk"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    if (onTalkClick) onTalkClick();
                  }}
                  onMouseEnter={() => setIsContactHovered(true)}
                  onMouseLeave={() => setIsContactHovered(false)}
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: isContactHovered ? "0.6rem" : "0px",
                    cursor: "pointer",
                    transition: "gap 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span
                    style={{
                      transform: isContactHovered ? "translateX(-6px)" : "translateX(0px)",
                      transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    Kontak
                  </span>
                  {/* Square bullet indicator sliding in from the RIGHT */}
                  <span
                    style={{
                      width: isContactHovered ? "6px" : "0px",
                      height: "6px",
                      backgroundColor: "#ffffff",
                      borderRadius: "1px",
                      opacity: isContactHovered ? 1 : 0,
                      transform: isContactHovered ? "rotate(-180deg) scale(1)" : "rotate(0deg) scale(0)",
                      transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                </a>
              </motion.div>
            </div>

            {/* Bottom Metadata Section */}
            <div
              style={{
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              <a
                href="tel:0483987479"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                0483 987 479 <ArrowUpRight size={16} />
              </a>

              <a
                href="mailto:info@kunci-realty.com"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                info@kunci-realty.com <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
