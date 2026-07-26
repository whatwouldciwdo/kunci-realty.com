"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bed, Bath, Maximize2, MapPin, Calendar, ArrowRight, ShieldCheck, Check } from "lucide-react";

export interface Residence {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  yearBuilt: string;
  image: string;
  description: string;
  features: string[];
  architect: string;
}

interface ResidenceDetailModalProps {
  residence: Residence | null;
  onClose: () => void;
  onInquire: () => void;
}

export default function ResidenceDetailModal({ residence, onClose, onInquire }: ResidenceDetailModalProps) {
  if (!residence) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(11, 20, 38, 0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "28px",
            width: "100%",
            maxWidth: "960px",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            color: "#111827",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <X size={20} color="#111827" />
          </button>

          {/* Hero Banner Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "360px",
              backgroundImage: `url(${residence.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "28px",
              borderTopRightRadius: "28px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                display: "flex",
                alignItems: "flex-end",
                padding: "2rem",
              }}
            >
              <div>
                <span
                  style={{
                    backgroundColor: "#0B3B8E",
                    color: "#ffffff",
                    padding: "0.35rem 0.85rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {residence.category}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.25rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginTop: "0.5rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {residence.title}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.9)", fontSize: "0.95rem" }}>
                  <MapPin size={16} /> {residence.location}
                </div>
              </div>
            </div>
          </div>

          {/* Main Body Content */}
          <div style={{ padding: "2.5rem" }}>
            {/* Quick Specs Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
                backgroundColor: "#f8fafc",
                borderRadius: "16px",
                padding: "1.25rem",
                marginBottom: "2rem",
                border: "1px solid #f1f5f9",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Harga</span>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0B3B8E" }}>{residence.price}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Kamar Tidur</span>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "2px" }}>
                  <Bed size={18} color="#0B3B8E" /> {residence.beds} KT
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Kamar Mandi</span>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "2px" }}>
                  <Bath size={18} color="#0B3B8E" /> {residence.baths} KM
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Luas Bangunan</span>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "2px" }}>
                  <Maximize2 size={18} color="#0B3B8E" /> {residence.sqft}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Selesai Dibangun</span>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "2px" }}>
                  <Calendar size={18} color="#0B3B8E" /> {residence.yearBuilt}
                </div>
              </div>
            </div>

            {/* Description & Details */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2.5rem" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Deskripsi Properti
                </h3>
                <p style={{ lineHeight: 1.7, color: "#475569", fontSize: "0.98rem" }}>{residence.description}</p>

                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, marginTop: "1.75rem", marginBottom: "1rem" }}>
                  Keunggulan & Fasilitas
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {residence.features.map((feature, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#334155" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "rgba(11, 59, 142, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={12} color="#0B3B8E" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Action Box */}
              <div
                style={{
                  backgroundColor: "#0B3B8E",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.85, fontSize: "0.85rem", marginBottom: "1rem" }}>
                    <ShieldCheck size={18} /> Properti Terverifikasi Kunci Realty
                  </div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.3 }}>
                    Tertarik dengan Properti Ini?
                  </h4>
                  <p style={{ fontSize: "0.88rem", opacity: 0.8, marginTop: "0.5rem", lineHeight: 1.5 }}>
                    Jadwalkan kunjungan privat atau minta detail lengkap properti bersama agen kami, {residence.architect}.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onInquire();
                  }}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#0B3B8E",
                    border: "none",
                    borderRadius: "12px",
                    padding: "0.9rem 1.25rem",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginTop: "1.5rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  Jadwalkan Kunjungan <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
