"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

export default function JournalSection() {
  const articles = [
    {
      id: 1,
      category: "Teori Arsitektur",
      title: "Mengolah Cahaya Alami di Hunian Pesisir Modernis",
      date: "Juli 2026",
      readTime: "5 mnt baca",
      excerpt:
        "Bagaimana potongan langit-langit volumetrik dan fasad kaca rendah besi mengubah dinamika cahaya interior sepanjang musim.",
      image: "/images/haven_coastal_1.jpg",
    },
    {
      id: 2,
      category: "Material",
      title: "Kembalinya Beton Taktil dan Kayu Gosong dalam Desain Mewah",
      date: "Juni 2026",
      readTime: "7 mnt baca",
      excerpt:
        "Menjelajahi integrasi kayu Shou Sugi Ban dengan beton cetak untuk massa termal dan keanggunan taktil abadi.",
      image: "/images/haven_villa_1.jpg",
    },
    {
      id: 3,
      category: "Masa Depan Hunian",
      title: "Jaringan Mikro Off-Grid: Standar Baru Hunian Mewah",
      date: "Mei 2026",
      readTime: "4 mnt baca",
      excerpt:
        "Mengintegrasikan panel surya tersembunyi, loop geotermal, dan sistem daur ulang air hujan ke dalam arsitektur kelas atas.",
      image: "/images/haven_penthouse_1.jpg",
    },
  ];

  return (
    <section id="journal" className="journal-editorial-section">
      <style jsx>{`
        .journal-editorial-section {
          padding: 7rem 3.1vw 7.5rem;
          background: #ffffff;
          color: #292929;
        }
        .journal-title-row {
          border-bottom: 1px solid #d6d6d6;
          padding-bottom: 2.2rem;
        }
        .journal-title {
          margin: 0;
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.0;
          color: #292929;
        }
        .journal-grid {
          display: grid;
          grid-template-columns: 42% 1fr;
          column-gap: 2.5vw;
          padding-top: 2.2rem;
        }
        .journal-label {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.35;
          color: #292929;
        }
        .journal-label::before {
          content: "";
          width: 8px;
          height: 8px;
          margin-top: 0.35rem;
          background: #292929;
          flex: 0 0 auto;
        }
        .journal-content {
          width: 100%;
        }
        @media (max-width: 768px) {
          .journal-editorial-section {
            padding: 4.5rem 5% 4.5rem;
          }
          .journal-title-row {
            padding-bottom: 1.25rem;
          }
          .journal-title {
            font-size: clamp(2.2rem, 9.5vw, 3.2rem);
          }
          .journal-grid {
            display: block;
            padding-top: 1.5rem;
          }
          .journal-label {
            margin-bottom: 2rem;
            font-size: 0.95rem;
          }
        }
      `}</style>

      {/* Header Row matching PhilosophySection EXACTLY */}
      <div className="journal-title-row">
        <motion.h2
          className="journal-title"
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
          Kunci.Realty Journal
        </motion.h2>
      </div>

      {/* Content Grid matching PhilosophySection */}
      <div className="journal-grid">
        <div className="journal-label">Editorial & Wawasan</div>

        <div className="journal-content">
          <p
            style={{
              fontSize: "clamp(1rem, 1.32vw, 1.28rem)",
              lineHeight: 1.48,
              letterSpacing: "-0.02em",
              color: "#292929",
              marginTop: 0,
              marginBottom: "3.5rem",
              maxWidth: "660px",
            }}
          >
            Refleksi tentang arsitektur modernis, materialitas taktil, dan desain hunian mewah berkelanjutan.
          </p>

          {/* Article Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2.5rem",
              width: "100%",
            }}
          >
            {articles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e5e5e5",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                whileHover={{ y: -6, boxShadow: "0 16px 36px rgba(0,0,0,0.08)" }}
              >
                <div style={{ position: "relative", width: "100%", height: "230px", overflow: "hidden" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
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
                    {article.category}
                  </span>
                </div>

                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.82rem", color: "#666666", marginBottom: "0.75rem" }}>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Clock size={13} color="#222222" /> {article.readTime}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        color: "#111111",
                        lineHeight: 1.3,
                        marginBottom: "0.75rem",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {article.title}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "#555555", lineHeight: 1.55 }}>{article.excerpt}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      color: "#111111",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      marginTop: "1.75rem",
                      borderTop: "1px solid #f0f0f0",
                      paddingTop: "1rem",
                    }}
                  >
                    Baca Selengkapnya <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
