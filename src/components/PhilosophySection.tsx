"use client";

import { motion } from "framer-motion";

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="guiding-values-section">
      <style jsx>{`
        .guiding-values-section {
          padding: 7rem 3.1vw 7.5rem;
          background: #fff;
          color: #292929;
        }
        .values-title-row {
          border-bottom: 1px solid #d6d6d6;
          padding-bottom: 2.2rem;
        }
        .values-title {
          margin: 0;
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.0;
        }
        .values-grid {
          display: grid;
          grid-template-columns: 42% 1fr;
          column-gap: 2.5vw;
          padding-top: 2.2rem;
        }
        .values-label {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.35;
          color: #292929;
        }
        .values-label::before {
          content: "";
          width: 8px;
          height: 8px;
          margin-top: 0.35rem;
          background: #292929;
          flex: 0 0 auto;
        }
        .values-copy {
          max-width: 660px;
          font-size: clamp(1rem, 1.32vw, 1.28rem);
          line-height: 1.48;
          letter-spacing: -0.02em;
          color: #292929;
        }
        .values-copy p { margin: 0; }
        .values-copy p + p { margin-top: 1.75rem; }
        .values-image {
          display: block;
          width: 100%;
          height: auto;
          margin-top: 5.6rem;
          object-fit: cover;
        }
        @media (max-width: 640px) {
          .guiding-values-section { padding: 4.5rem 5% 4.5rem; }
          .values-title-row { padding-bottom: 1.25rem; }
          .values-title { font-size: clamp(2.2rem, 9.5vw, 3.2rem); }
          .values-grid { display: block; padding-top: 1.5rem; }
          .values-label { margin-bottom: 2rem; font-size: 0.95rem; }
          .values-copy { font-size: 1rem; line-height: 1.5; max-width: 100%; }
          .values-copy p + p { margin-top: 1.25rem; }
          .values-image { margin-top: 3rem; }
        }
      `}</style>

      <div className="values-title-row">
        <motion.h2
          className="values-title"
          style={{
            fontSize: "clamp(2.6rem, 3.8vw, 4rem)",
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 1.0,
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Nilai-nilai kami
        </motion.h2>
      </div>

      <div className="values-grid">
        <div className="values-label">Filosofi</div>
        <motion.div
          className="values-copy"
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
            Properti kami hadir melampaui sekadar konstruksi. Setiap hunian merupakan respons terukur terhadap cara klien kami hidup — nyaman, elegan, dan tak terbantahkan personal. Melalui kolaborasi yang tulus, kami memadukan presisi dan kepribadian, keahlian dan kepedulian. Kompleksitas menginspirasi kami. Setiap proyek adalah kesempatan untuk mengeksplorasi, menyempurnakan, dan membangun dengan penuh niat.
          </p>
          <p>
            Inilah hunian yang berbicara tanpa kata-kata. Seperti karya bespoke yang diciptakan untuk bertahan, hunian ini memancarkan kepercayaan diri yang tenang — ekspresif tanpa berlebihan, didefinisikan oleh kualitas yang abadi.
          </p>
          <img className="values-image" src="/images/haven_bespoke.jpg" alt="Keahlian di Kunci Realty" />
        </motion.div>
      </div>
    </section>
  );
}