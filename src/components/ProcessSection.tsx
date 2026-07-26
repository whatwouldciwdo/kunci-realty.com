"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Layers, Key } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Site Discovery & Sun Path Analysis",
      description:
        "We begin by evaluating soil geology, micro-climate vectors, sea winds, and light angles to position your home for optimal thermal efficiency.",
    },
    {
      num: "02",
      icon: PenTool,
      title: "Bespoke Structural Sculpting",
      description:
        "Our principal architects generate 3D volumetric models and physical material samples, ensuring spatial fluidity before construction begins.",
    },
    {
      num: "03",
      icon: Layers,
      title: "Tactile Material Curation",
      description:
        "Hand-selected off-form concrete, Japanese charred cedar, travertine marble, and custom bronze accents crafted by master artisans.",
    },
    {
      num: "04",
      icon: Key,
      title: "Handover & Sanctuary Activation",
      description:
        "Complete turn-key handover with integrated smart-home commissioning, acoustic tuning, and ongoing estate stewardship.",
    },
  ];

  return (
    <section
      id="architecture"
      style={{
        padding: "7rem 4%",
        backgroundColor: "#ffffff",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section Title */}
        <div style={{ textTransform: "uppercase", fontSize: "0.85rem", fontWeight: 600, color: "#0B3B8E", letterSpacing: "0.15em" }}>
          Craftsmanship Blueprint
        </div>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
            fontWeight: 800,
            marginTop: "0.5rem",
            marginBottom: "4rem",
            letterSpacing: "-0.03em",
          }}
        >
          Our Architectural Journey
        </h2>

        {/* Process Timeline Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            position: "relative",
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "20px",
                  padding: "2.25rem 1.75rem",
                  border: "1px solid #e2e8f0",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "2.25rem",
                        fontWeight: 800,
                        color: "#0B3B8E",
                        opacity: 0.8,
                      }}
                    >
                      {step.num}
                    </span>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(11, 59, 142, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color="#0B3B8E" />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "0.75rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "0.92rem", lineHeight: 1.6 }}>{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
