"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building2,
  Calendar,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
  X,
  Waves,
  Activity,
  Trees,
  ShoppingBag,
  Landmark,
  Flame,
  Footprints,
  Dumbbell,
  Utensils,
  Smile,
} from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import TalkModal from "@/components/TalkModal";
import { getPropertyBySlug, getRelatedProperties } from "@/data/properties";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const property = getPropertyBySlug(resolvedParams.slug) || getPropertyBySlug("kunci-01");

  const [activeTab, setActiveTab] = useState<"overview" | "facilities" | "location">("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  const gallery = property?.gallery && property.gallery.length > 0 ? property.gallery : property ? [property.image] : [];
  const relatedUnits = property ? getRelatedProperties(property.id, 3) : [];
  const otherCategories = property ? getRelatedProperties(property.id, 3).reverse() : [];

  // Auto scroll effect for the main large Bento image (cycles every 3.5 seconds)
  useEffect(() => {
    if (isAutoScrollPaused || gallery.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [gallery.length, isAutoScrollPaused]);

  if (!property) return null;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Header */}
      <Header onTalkClick={() => setIsTalkModalOpen(true)} />

      {/* Main Content Container */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 4% 5rem" }}>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            color: "#64748b",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "#475569", textDecoration: "none" }}>
            Beranda
          </Link>
          <span>/</span>
          <Link href="/search" style={{ color: "#475569", textDecoration: "none" }}>
            Properties
          </Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>{property.title}</span>
        </nav>

        {/* Bento Grid Gallery Section - Clean layout with mobile responsiveness */}
        <section style={{ marginBottom: "2.5rem" }}>
          <div className="detail-bento-grid">
            {/* Left Main Large Image (Auto Scrolling Carousel) - 7 Cols */}
            <div
              className="detail-bento-main"
              onMouseEnter={() => setIsAutoScrollPaused(true)}
              onMouseLeave={() => setIsAutoScrollPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={gallery[activeImageIndex]}
                  alt={`${property.title} - Main View`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setLightboxImage(gallery[activeImageIndex])}
                />
              </AnimatePresence>

              {/* Auto Scroll Indicators & Controls */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Dots indicator */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    backgroundColor: "rgba(15, 23, 42, 0.5)",
                    backdropFilter: "blur(6px)",
                    padding: "0.4rem 0.7rem",
                    borderRadius: "9999px",
                  }}
                >
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: idx === activeImageIndex ? "20px" : "8px",
                        height: "8px",
                        borderRadius: "9999px",
                        backgroundColor: idx === activeImageIndex ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        padding: 0,
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Left/Right Arrows */}
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(15, 23, 42, 0.6)",
                      color: "#ffffff",
                      border: "none",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(15, 23, 42, 0.6)",
                      color: "#ffffff",
                      border: "none",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side 4 Smaller Bento Photos (2x2 Grid) - 5 Cols */}
            <div className="detail-bento-thumbs">
              {[1, 2, 3, 4].map((i) => {
                const imgUrl = gallery[i % gallery.length];
                return (
                  <div
                    key={i}
                    className="detail-bento-thumb-item"
                    onClick={() => {
                      setActiveImageIndex(i % gallery.length);
                      setLightboxImage(imgUrl);
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${property.title} gallery thumbnail ${i}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Property Header & Title Details */}
        <section
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "1.75rem 2rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div
                style={{
                  color: "#0b3b8e",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "0.4rem",
                }}
              >
                <MapPin size={16} /> {property.location}
              </div>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                {property.title}
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748b", margin: "0.4rem 0 0" }}>
                {property.address}
              </p>
            </div>
          </div>

          {/* Modern Specs Icons Bar */}
          <div className="detail-specs-grid">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "grid",
                  placeItems: "center",
                  color: "#0b3b8e",
                  flexShrink: 0,
                }}
              >
                <Bed size={20} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Kamar Tidur
                </span>
                <strong style={{ fontSize: "0.95rem", color: "#0f172a" }}>{property.beds} Bedrooms</strong>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "grid",
                  placeItems: "center",
                  color: "#0b3b8e",
                  flexShrink: 0,
                }}
              >
                <Bath size={20} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Kamar Mandi
                </span>
                <strong style={{ fontSize: "0.95rem", color: "#0f172a" }}>{property.baths} Bathrooms</strong>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "grid",
                  placeItems: "center",
                  color: "#0b3b8e",
                  flexShrink: 0,
                }}
              >
                <Maximize2 size={20} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Luas Bangunan
                </span>
                <strong style={{ fontSize: "0.95rem", color: "#0f172a" }}>{property.sqft}</strong>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "grid",
                  placeItems: "center",
                  color: "#0b3b8e",
                  flexShrink: 0,
                }}
              >
                <Building2 size={20} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Luas Tanah
                </span>
                <strong style={{ fontSize: "0.95rem", color: "#0f172a" }}>{property.landSqft}</strong>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "grid",
                  placeItems: "center",
                  color: "#0b3b8e",
                  flexShrink: 0,
                }}
              >
                <Calendar size={20} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Tahun Selesai
                </span>
                <strong style={{ fontSize: "0.95rem", color: "#0f172a" }}>{property.yearBuilt}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tabs Layout Grid (Content + Sidebar) */}
        <div className="detail-main-layout">
          {/* Main Left Content Area */}
          <div>
            {/* Tab Navigation Header: Overview | Facilities | Location */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                borderBottom: "2px solid #e2e8f0",
                marginBottom: "1.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                style={{
                  padding: "0.75rem 0.25rem",
                  fontSize: "1.05rem",
                  fontWeight: activeTab === "overview" ? 700 : 500,
                  color: activeTab === "overview" ? "#0b3b8e" : "#64748b",
                  border: "none",
                  backgroundColor: "transparent",
                  borderBottom: activeTab === "overview" ? "3px solid #0b3b8e" : "3px solid transparent",
                  cursor: "pointer",
                  marginBottom: "-2px",
                  transition: "all 0.2s ease",
                }}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("facilities")}
                style={{
                  padding: "0.75rem 0.25rem",
                  fontSize: "1.05rem",
                  fontWeight: activeTab === "facilities" ? 700 : 500,
                  color: activeTab === "facilities" ? "#0b3b8e" : "#64748b",
                  border: "none",
                  backgroundColor: "transparent",
                  borderBottom: activeTab === "facilities" ? "3px solid #0b3b8e" : "3px solid transparent",
                  cursor: "pointer",
                  marginBottom: "-2px",
                  transition: "all 0.2s ease",
                }}
              >
                Facilities
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("location")}
                style={{
                  padding: "0.75rem 0.25rem",
                  fontSize: "1.05rem",
                  fontWeight: activeTab === "location" ? 700 : 500,
                  color: activeTab === "location" ? "#0b3b8e" : "#64748b",
                  border: "none",
                  backgroundColor: "transparent",
                  borderBottom: activeTab === "location" ? "3px solid #0b3b8e" : "3px solid transparent",
                  cursor: "pointer",
                  marginBottom: "-2px",
                  transition: "all 0.2s ease",
                }}
              >
                Location
              </button>
            </div>

            {/* TAB CONTENT PANELS */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ padding: "0.5rem 0" }}
              >
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 1rem", color: "#0f172a" }}>
                  {property.overview.title}
                </h2>
                <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {property.overview.text}
                </p>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "1.5rem 0 0.8rem", color: "#0f172a" }}>
                  Keunggulan Utama Properti
                </h3>
                <ul style={{ paddingLeft: "1.25rem", color: "#475569", lineHeight: 1.8, margin: "0 0 2rem" }}>
                  {property.overview.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                {/* Formatted Specs Table according to user screenshot */}
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "1.5rem 0 0.8rem", color: "#0f172a" }}>
                  Tabel Ringkasan Spesifikasi
                </h3>
                <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #e2e8f0" }}>
                    <span style={{ color: "#475569", fontSize: "0.95rem" }}>Luas Bangunan</span>
                    <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{property.sqft}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #e2e8f0" }}>
                    <span style={{ color: "#475569", fontSize: "0.95rem" }}>Kamar Tidur</span>
                    <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{property.beds} Beds, {property.baths} Baths</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #e2e8f0" }}>
                    <span style={{ color: "#475569", fontSize: "0.95rem" }}>Luas Tanah</span>
                    <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{property.landSqft}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #e2e8f0" }}>
                    <span style={{ color: "#475569", fontSize: "0.95rem" }}>Harga</span>
                    <strong style={{ color: "#0b3b8e", fontSize: "1.05rem" }}>{property.price}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0" }}>
                    <span style={{ color: "#475569", fontSize: "0.95rem" }}>Arsitek / Konsultan</span>
                    <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{property.architect}</strong>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Facilities Tab: 2-Column Clean Minimalist List Matching User Image */}
            {activeTab === "facilities" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ padding: "0.5rem 0" }}
              >
                <div className="detail-facilities-grid">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Waves size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Pool</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Footprints size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Jogging Track</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Activity size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Tennis Court</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Dumbbell size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Gym</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Trees size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Garden</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Utensils size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Restaurant</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <ShoppingBag size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Supermarket</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Smile size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Playground</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Landmark size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>ATM</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Building2 size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Indoor Function Room</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <Flame size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Barbeque Area</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <ShieldCheck size={22} color="#2563eb" />
                    <span style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 500 }}>Security</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Location Tab: Direct Layout + Embedded Google Map Location */}
            {activeTab === "location" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 0.25rem", color: "#0f172a" }}>
                  Aksesibilitas & Lokasi Strategis
                </h2>
                <p style={{ fontSize: "0.95rem", color: "#64748b", margin: "0 0 1.5rem" }}>
                  {property.address || property.locationDetails.mapTitle}
                </p>

                {/* Interactive Embedded Google Map showing exact location */}
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                    border: "1px solid #e2e8f0",
                    marginBottom: "2rem",
                    height: "360px",
                    position: "relative",
                  }}
                >
                  <iframe
                    title={`Map location of ${property.title}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address || property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Nearby Places List without redundant outer card */}
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
                  Destinasi & Akses Utama Terdekat
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {property.locationDetails.nearbyPlaces.map((place, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem 1.25rem",
                        borderRadius: "14px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <MapPin size={18} color="#0b3b8e" />
                        <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.95rem" }}>{place.name}</span>
                      </div>
                      <span style={{ color: "#0b3b8e", fontSize: "0.9rem", fontWeight: 600 }}>
                        {place.time}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sticky Sidebar Contact & Action Card - Clean WhatsApp button */}
          <div>
            <div
              style={{
                position: "sticky",
                top: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "1.75rem",
                border: "1px solid #e2e8f0",
                boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
              }}
            >
              {/* Harga Penawaran moved directly above Tertarik dengan Unit Ini */}
              <div style={{ marginBottom: "1.1rem", paddingBottom: "1.1rem", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "0.25rem" }}>
                  Harga Penawaran
                </span>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0b3b8e", lineHeight: 1.2 }}>
                  {property.price}
                </div>
              </div>

              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.5rem" }}>
                Tertarik dengan Unit Ini?
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "0 0 1.5rem", lineHeight: 1.5 }}>
                Hubungi penasihat properti Kunci Realty secara langsung via WhatsApp untuk konsultasi privat atau jadwal kunjungan.
              </p>

              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Kunci Realty, saya tertarik dengan unit ${property.title}. Mohon informasi spesifikasi & jadwal kunjungan.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "12px",
                  backgroundColor: "#25D366",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={18} /> Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Section 1: Recommendations - Rekomendasi Other Units */}
        <section style={{ marginTop: "4.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0b3b8e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Unit Pilihan Serupa
              </span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0f172a", margin: "0.2rem 0 0" }}>
                Rekomendasi Other Units
              </h2>
            </div>
            <Link
              href="/search"
              style={{
                color: "#0b3b8e",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Lihat Semua Unit <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="detail-recommendations-grid">
            {relatedUnits.map((item) => (
              <Link key={item.id} href={`/property/${item.slug}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div>
                      <div style={{ color: "#64748b", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.3rem" }}>
                        <MapPin size={14} /> {item.location}
                      </div>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0f172a", margin: "0 0 0.8rem" }}>{item.title}</h3>
                    </div>

                    {/* Specification Table */}
                    <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", marginTop: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Luas Bangunan</span>
                        <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600 }}>{item.sqft}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Kamar Tidur</span>
                        <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600 }}>{item.beds} Beds, {item.baths} Baths</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Luas Tanah</span>
                        <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600 }}>{item.landSqft}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Harga</span>
                        <span style={{ fontSize: "0.95rem", color: "#0b3b8e", fontWeight: 750 }}>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Recommendations - Rekomendasi Kategori Lain */}
        <section style={{ marginTop: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0b3b8e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Jelajahi Koleksi Lainnya
              </span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0f172a", margin: "0.2rem 0 0" }}>
                Rekomendasi Kategori Lain
              </h2>
            </div>
            <Link
              href="/search"
              style={{
                color: "#0b3b8e",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Lihat Kategori Lain <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="detail-recommendations-grid">
            {otherCategories.map((item) => (
              <Link key={item.id} href={`/property/${item.slug}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div>
                      <div style={{ color: "#64748b", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.3rem" }}>
                        <MapPin size={14} /> {item.location}
                      </div>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0f172a", margin: "0 0 0.8rem" }}>{item.title}</h3>
                    </div>

                    {/* Specification Table */}
                    <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", marginTop: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Luas Bangunan</span>
                        <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600 }}>{item.sqft}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Kamar Tidur</span>
                        <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600 }}>{item.beds} Beds, {item.baths} Baths</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Luas Tanah</span>
                        <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600 }}>{item.landSqft}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0" }}>
                        <span style={{ fontSize: "0.88rem", color: "#334155" }}>Harga</span>
                        <span style={{ fontSize: "0.95rem", color: "#0b3b8e", fontWeight: 750 }}>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              <X size={32} />
            </button>
            <img
              src={lightboxImage}
              alt="Fullscreen Preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                borderRadius: "16px",
                objectFit: "contain",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <TalkModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        prefilledProperty={property.title}
      />

      {/* Footer */}
      <FooterSection onTalkClick={() => setIsTalkModalOpen(true)} />
    </main>
  );
}
