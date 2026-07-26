"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Bed, Bath, Maximize2 } from "lucide-react";
import ResidenceDetailModal, { Residence } from "./ResidenceDetailModal";

const RESIDENCES: Residence[] = [
  {
    id: "kunci-01",
    title: "SCBD Executive Penthouse Suite",
    category: "Apartemen",
    location: "Sudirman Central Business District, Jakarta",
    price: "Rp 18.500.000.000",
    beds: 4,
    baths: 4,
    sqft: "420 sqm",
    yearBuilt: "2025",
    image: "/images/haven_penthouse_1.jpg",
    description:
      "Hunian sky penthouse mewah di jantung pusat finansial SCBD Jakarta. Dilengkapi akses lift pribadi, pemandangan lanskap kota Jakarta 360 derajat, island kitchen marmer Calacatta, dan kolam renang privat di lantai teratas.",
    features: [
      "Akses lift pribadi langsung",
      "Balkon langit melingkar di sekeliling",
      "Kolam renang rooftop infinity privat",
      "Sistem smart home akustik Bang & Olufsen",
      "3 slot parkir basement khusus",
      "Concierge 24/7 & keamanan biometrik",
    ],
    architect: "Hadiprana Architects",
  },
  {
    id: "kunci-02",
    title: "Senopati Heritage Residence",
    category: "Rumah",
    location: "Kebayoran Baru, Jakarta Selatan",
    price: "Rp 38.000.000.000",
    beds: 5,
    baths: 6,
    sqft: "750 sqm",
    yearBuilt: "2026",
    image: "/images/haven_villa_1.jpg",
    description:
      "Rumah tropis modern eksklusif di kawasan bergengsi Senopati. Menggabungkan arsitektur kayu jati kualitas tinggi, halaman dalam tropis dengan kolam renang air garam, garasi privat 4 mobil, dan tata cahaya lanskap alami.",
    features: [
      "Kolam renang air garam privat",
      "Taman zen tropis internal",
      "Joinery kayu jati Indonesia custom",
      "Garasi bawah tanah privat 4 mobil",
      "Sistem panel surya",
      "Keamanan perimeter tinggi & CCTV",
    ],
    architect: "Andra Matin",
  },
  {
    id: "kunci-03",
    title: "Mega Kuningan Premium Office Suite",
    category: "Ruang Kantor",
    location: "Mega Kuningan, Jakarta Selatan",
    price: "Rp 24.000.000.000",
    beds: 0,
    baths: 3,
    sqft: "650 sqm",
    yearBuilt: "2025",
    image: "/images/haven_bespoke.jpg",
    description:
      "Ruang kantor Grade A premium di CBD Mega Kuningan Jakarta. Dirancang untuk efisiensi ruang kerja modern, dilengkapi boardroom eksekutif, kaca peredam suara double-glazed, serta ruang lounge VIP dengan pemandangan cakrawala kota.",
    features: [
      "Sertifikasi Gedung Hijau Grade A",
      "Ruang rapat eksekutif privat",
      "Kaca ganda peredam suara",
      "Instalasi internet fiber optik kecepatan tinggi",
      "Akses lift VIP eksklusif",
      "5 slot parkir indoor khusus",
    ],
    architect: "Denton Corker Marshall",
  },
  {
    id: "kunci-04",
    title: "Uluwatu Cliffside Villa Resort",
    category: "Resort",
    location: "Uluwatu, Bali - Indonesia",
    price: "Rp 45.000.000.000",
    beds: 6,
    baths: 7,
    sqft: "1,100 sqm",
    yearBuilt: "2025",
    image: "/images/haven_coastal_1.jpg",
    description:
      "Resort villa mewah di atas tebing laut Uluwatu dengan pandangan samudra tak terhalang. Menawarkan pavilion spa pribadi, infinity lap pool 20 meter, helipad privat, dan manajemen persewaan kelas dunia.",
    features: [
      "Kolam renang infinity 20m di tebing",
      "Paviliun spa & wellness privat",
      "Pemandangan panoramik sunset ke laut",
      "Akses helipad",
      "Furnitur mewah turnkey lengkap tersedia",
      "Hasil sewa mewah dikelola profesional",
    ],
    architect: "Ridwan Kamil & Associates",
  },
];

interface ResidencesSectionProps {
  onTalkClick?: () => void;
}

export default function ResidencesSection({ onTalkClick }: ResidencesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);

  const categories = ["Semua", "Apartemen", "Ruang Kantor", "Rumah", "Resort"];

  const filteredResidences =
    activeCategory === "Semua"
      ? RESIDENCES
      : RESIDENCES.filter((r) => r.category === activeCategory);

  return (
    <section id="residences" className="residences-editorial-section">
      <style jsx>{`
        .residences-editorial-section {
          padding: 7rem 3.1vw 7.5rem;
          background: #ffffff;
          color: #292929;
        }
        .residences-title-row {
          border-bottom: 1px solid #d6d6d6;
          padding-bottom: 2.2rem;
        }
        .residences-title {
          margin: 0;
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.0;
          color: #292929;
        }
        .residences-grid {
          display: grid;
          grid-template-columns: 42% 1fr;
          column-gap: 2.5vw;
          padding-top: 2.2rem;
        }
        .residences-label {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.35;
          color: #292929;
        }
        .residences-label::before {
          content: "";
          width: 8px;
          height: 8px;
          margin-top: 0.35rem;
          background: #292929;
          flex: 0 0 auto;
        }
        .residences-content {
          width: 100%;
        }
        @media (max-width: 768px) {
          .residences-editorial-section {
            padding: 4.5rem 5% 4.5rem;
          }
          .residences-title-row {
            padding-bottom: 1.25rem;
          }
          .residences-title {
            font-size: clamp(2.2rem, 9.5vw, 3.2rem);
          }
          .residences-grid {
            display: block;
            padding-top: 1.5rem;
          }
          .residences-label {
            margin-bottom: 2rem;
            font-size: 0.95rem;
          }
        }
      `}</style>

      {/* Header Row matching PhilosophySection ("Our guiding values") EXACTLY */}
      <div className="residences-title-row">
        <motion.h2
          className="residences-title"
          style={{
            fontSize: "clamp(2.6rem, 3.8vw, 4rem)",
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 1.0,
            color: "#292929",
            margin: 0,
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          Koleksi Properti Eksklusif
        </motion.h2>
      </div>

      {/* Content Grid matching PhilosophySection */}
      <div className="residences-grid">
        <div className="residences-label">Properti yang tersedia</div>

        <div className="residences-content">
          <p
            style={{
              fontSize: "clamp(1rem, 1.32vw, 1.28rem)",
              lineHeight: 1.48,
              letterSpacing: "-0.02em",
              color: "#292929",
              marginTop: 0,
              marginBottom: "2.5rem",
              maxWidth: "660px",
            }}
          >
            Temukan hunian mewah modern, villa tropis, dan ruang komersial pilihan terbaik di lokasi paling strategis Indonesia.
          </p>

          {/* Sleek Minimal Category Filter Pills */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "999px",
                  border: activeCategory === cat ? "1px solid #111111" : "1px solid #d6d6d6",
                  backgroundColor: activeCategory === cat ? "#111111" : "#ffffff",
                  color: activeCategory === cat ? "#ffffff" : "#222222",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Residence Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "2.5rem",
              width: "100%",
            }}
          >
            {filteredResidences.map((residence, idx) => (
              <motion.div
                key={residence.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                whileHover={{ y: -6, boxShadow: "0 16px 36px rgba(0, 0, 0, 0.08)" }}
                onClick={() => setSelectedResidence(residence)}
              >
                {/* Image Container */}
                <div style={{ position: "relative", width: "100%", height: "260px", overflow: "hidden" }}>
                  <img
                    src={residence.image}
                    alt={residence.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(6px)",
                      color: "#111111",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {residence.category}
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1rem",
                      backgroundColor: "#111111",
                      color: "#ffffff",
                      borderRadius: "50%",
                      width: "42px",
                      height: "42px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Residence Details */}
                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "#666666", fontWeight: 500, letterSpacing: "-0.01em" }}>{residence.location}</div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        color: "#111111",
                        marginTop: "0.35rem",
                        marginBottom: "0.75rem",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {residence.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "#555555",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {residence.description}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #f0f0f0",
                      paddingTop: "1.25rem",
                      marginTop: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                    }}
                  >
                    {/* Row 1: Bed, Bath, Sqm Specs */}
                    <div style={{ display: "flex", gap: "0.85rem", fontSize: "0.85rem", color: "#333333", fontWeight: 500, flexWrap: "wrap" }}>
                      {residence.beds > 0 && (
                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <Bed size={16} color="#222222" /> {residence.beds} KT
                        </span>
                      )}
                      <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <Bath size={16} color="#222222" /> {residence.baths} KM
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <Maximize2 size={16} color="#222222" /> {residence.sqft}
                      </span>
                    </div>

                    {/* Row 2: Price on its own clean line */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px dashed #e2e8f0", paddingTop: "0.65rem", marginTop: "0.15rem" }}>
                      <span style={{ fontSize: "0.78rem", color: "#666666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Harga Penawaran</span>
                      <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111111", letterSpacing: "-0.02em" }}>{residence.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal detail */}
      <ResidenceDetailModal
        residence={selectedResidence}
        onClose={() => setSelectedResidence(null)}
        onInquire={() => {
          setSelectedResidence(null);
          if (onTalkClick) onTalkClick();
        }}
      />
    </section>
  );
}
