"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, Sparkles } from "lucide-react";

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TalkModal({ isOpen, onClose }: TalkModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Arsitektur Custom",
    budget: "Rp 5M - Rp 15M",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "Arsitektur Custom",
      budget: "Rp 5M - Rp 15M",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(17, 24, 39, 0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "640px",
              padding: "2.5rem",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              color: "#111827",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <X size={20} color="#4b5563" />
            </button>

            {!submitted ? (
              <>
                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.4rem 1rem",
                      borderRadius: "999px",
                      backgroundColor: "rgba(11, 59, 142, 0.08)",
                      color: "#0B3B8E",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Sparkles size={14} /> Konsultasi Privat
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Wujudkan Hunian Impian Anda
                  </h2>
                  <p style={{ color: "#6b7280", marginTop: "0.5rem", fontSize: "0.95rem" }}>
                    Ceritakan kebutuhan properti Anda. Tim kami akan menghubungi Anda dalam 24 jam.
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Budi Santoso"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid #e5e7eb",
                          backgroundColor: "#f9fafb",
                          fontSize: "0.95rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="budi@contoh.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid #e5e7eb",
                          backgroundColor: "#f9fafb",
                          fontSize: "0.95rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>
                        Minat Utama
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid #e5e7eb",
                          backgroundColor: "#f9fafb",
                          fontSize: "0.95rem",
                          outline: "none",
                        }}
                      >
                        <option>Arsitektur Custom</option>
                        <option>Pembelian Hunian Mewah</option>
                        <option>Desain Interior</option>
                        <option>Pengembangan Lahan & Properti</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>
                        Kisaran Anggaran
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "12px",
                          border: "1px solid #e5e7eb",
                          backgroundColor: "#f9fafb",
                          fontSize: "0.95rem",
                          outline: "none",
                        }}
                      >
                        <option>Rp 1M - Rp 5M</option>
                        <option>Rp 5M - Rp 15M</option>
                        <option>Rp 15M - Rp 50M</option>
                        <option>Rp 50M+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "#374151" }}>
                      Visi Proyek / Catatan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Bagikan lokasi yang diinginkan, preferensi estetika, atau timeline Anda..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        backgroundColor: "#f9fafb",
                        fontSize: "0.95rem",
                        outline: "none",
                        resize: "none",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      borderRadius: "14px",
                      backgroundColor: "#0B3B8E",
                      color: "#ffffff",
                      border: "none",
                      fontWeight: 600,
                      fontSize: "1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "all 0.2s ease",
                      boxShadow: "0 10px 20px -5px rgba(11, 59, 142, 0.3)",
                      marginTop: "0.5rem",
                    }}
                  >
                    Kirim Pertanyaan <Send size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  style={{
                    width: "72px",
                    height: "72px",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem auto",
                    color: "#10b981",
                  }}
                >
                  <CheckCircle size={40} />
                </motion.div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 700, color: "#111827" }}>
                  Pertanyaan Diterima
                </h3>
                <p style={{ color: "#6b7280", marginTop: "0.5rem", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Terima kasih, <strong>{formData.name}</strong>. Tim senior kami akan meninjau preferensi Anda dan menghubungi Anda melalui email di <strong>{formData.email}</strong> segera.
                </p>
                <button
                  onClick={handleReset}
                  style={{
                    marginTop: "2rem",
                    padding: "0.8rem 2rem",
                    borderRadius: "12px",
                    backgroundColor: "#111827",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Tutup
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
