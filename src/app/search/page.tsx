"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  MapPin,
  ArrowUpRight,
  X,
  Check,
  Building,
} from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import TalkModal from "@/components/TalkModal";
import SearchableSelect from "@/components/SearchableSelect";
import ResidenceDetailModal, { Residence } from "@/components/ResidenceDetailModal";
import Link from "next/link";

type TransactionType = "all" | "sale" | "rent";

type AdvancedListing = Residence & {
  priceValue: number; // in billions or millions for sorting
  area: string;
  propertyType: string;
  landSqft: string;
  status: string;
  transaction: "sale" | "rent";
  featured?: boolean;
  baths: number;
};

const ALL_PROPERTIES: AdvancedListing[] = [
  {
    id: "kunci-01",
    title: "The Langham Residences Penthouse",
    category: "For Sale",
    propertyType: "Penthouse",
    location: "SCBD, Jakarta Selatan",
    area: "Jakarta Selatan",
    price: "Rp 42.500.000.000",
    priceValue: 42.5,
    beds: 4,
    baths: 4,
    sqft: "490 sqm",
    landSqft: "600 sqm",
    yearBuilt: "2025",
    image: "/images/haven_penthouse_1.jpg",
    description:
      "Penthouse langit dengan pemandangan kota 360 derajat di jantung SCBD, dilengkapi akses lift privat dan layanan hospitality bintang lima.",
    features: [
      "Private Lift",
      "Balkon Langit",
      "Infinity Pool",
      "Smart Home",
      "Concierge 24/7",
    ],
    architect: "Hadiprana Architects",
    status: "Eksklusif",
    transaction: "sale",
    featured: true,
  },
  {
    id: "kunci-02",
    title: "Alamanda Tower Residence",
    category: "For Rent",
    propertyType: "Apartemen Butik",
    location: "Kuningan, Jakarta Selatan",
    area: "Jakarta Selatan",
    price: "Rp 55.000.000 / bulan",
    priceValue: 0.055,
    beds: 3,
    baths: 3,
    sqft: "218 sqm",
    landSqft: "350 sqm",
    yearBuilt: "2024",
    image: "/images/haven_seq_1.jpg",
    description:
      "Hunian urban berkelas dengan layout luas, cahaya alami melimpah, dan akses langsung menuju kawasan bisnis Kuningan.",
    features: ["Smart Home", "Infinity Pool", "Concierge 24/7", "Fully Furnished"],
    architect: "M.A. Design",
    status: "Siap Huni",
    transaction: "rent",
  },
  {
    id: "kunci-03",
    title: "Senopati Garden Residence",
    category: "For Sale",
    propertyType: "Apartemen Butik",
    location: "Senopati, Jakarta Selatan",
    area: "Jakarta Selatan",
    price: "Rp 21.500.000.000",
    priceValue: 21.5,
    beds: 5,
    baths: 6,
    sqft: "750 sqm",
    landSqft: "900 sqm",
    yearBuilt: "2026",
    image: "/images/haven_villa_1.jpg",
    description:
      "Apartemen butik bernuansa tropis modern di kawasan Senopati, dirancang untuk privasi dan kenyamanan berkumpul keluarga.",
    features: ["Private Lift", "Smart Home", "Taman Zen", "Concierge 24/7"],
    architect: "Andra Matin",
    status: "Baru",
    transaction: "sale",
  },
  {
    id: "kunci-04",
    title: "The Residences at Mega Kuningan",
    category: "For Rent",
    propertyType: "Apartemen Butik",
    location: "Mega Kuningan, Jakarta Selatan",
    area: "Jakarta Selatan",
    price: "Rp 85.000.000 / bulan",
    priceValue: 0.085,
    beds: 2,
    baths: 3,
    sqft: "650 sqm",
    landSqft: "750 sqm",
    yearBuilt: "2025",
    image: "/images/haven_bespoke.jpg",
    description:
      "Hunian premium di pusat Mega Kuningan dengan pemandangan cakrawala kota dan konektivitas terbaik ke pusat bisnis.",
    features: ["Private Lift", "Infinity Pool", "Fully Furnished", "Concierge 24/7"],
    architect: "Denton Corker Marshall",
    status: "Furnished",
    transaction: "rent",
  },
  {
    id: "kunci-05",
    title: "Bali Oceanview Cliff Villa",
    category: "For Sale",
    propertyType: "Villa Mewah",
    location: "Uluwatu, Bali",
    area: "Bali",
    price: "Rp 28.000.000.000",
    priceValue: 28,
    beds: 3,
    baths: 3,
    sqft: "285 sqm",
    landSqft: "500 sqm",
    yearBuilt: "2025",
    image: "/images/haven_coastal_1.jpg",
    description:
      "Residence tepi tebing dengan pemandangan samudra tanpa batas, akses pantai privat, dan fasilitas resort berbintang.",
    features: ["Beach Access", "Infinity Pool", "Balkon Langit", "Fully Furnished"],
    architect: "Ridwan Kamil & Associates",
    status: "Eksklusif",
    transaction: "sale",
  },
  {
    id: "kunci-06",
    title: "Menteng Heritage Townhouse",
    category: "For Sale",
    propertyType: "Townhouse",
    location: "Menteng, Jakarta Pusat",
    area: "Jakarta Pusat",
    price: "Rp 38.000.000.000",
    priceValue: 38,
    beds: 4,
    baths: 5,
    sqft: "520 sqm",
    landSqft: "650 sqm",
    yearBuilt: "2024",
    image: "/images/haven_penthouse_1.jpg",
    description:
      "Hunian eksklusif bergaya neoklasik modern di kawasan prestigious Menteng dengan halaman hijau luas.",
    features: ["Private Lift", "Smart Home", "Taman Zen", "Concierge 24/7"],
    architect: "Hadiprana Architects",
    status: "Eksklusif",
    transaction: "sale",
  },
  {
    id: "kunci-07",
    title: "SCBD Financial Tower Sky Office",
    category: "For Rent",
    propertyType: "Commercial Office",
    location: "SCBD, Jakarta Selatan",
    area: "Jakarta Selatan",
    price: "Rp 120.000.000 / bulan",
    priceValue: 0.12,
    beds: 0,
    baths: 2,
    sqft: "850 sqm",
    landSqft: "850 sqm",
    yearBuilt: "2025",
    image: "/images/haven_seq_1.jpg",
    description:
      "Ruang kantor grade A dengan standar sertifikasi hijau internasional dan pemandangan ikonik SCBD.",
    features: ["Private Lift", "Smart Home", "Concierge 24/7"],
    architect: "M.A. Design",
    status: "Siap Huni",
    transaction: "rent",
  },
];

const FEATURE_OPTIONS = [
  "Private Lift",
  "Infinity Pool",
  "Smart Home",
  "Beach Access",
  "Concierge 24/7",
  "Balkon Langit",
  "Fully Furnished",
];

export default function AdvancedSearchPage() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [selectedPropertyForInquire, setSelectedPropertyForInquire] = useState<string | undefined>(undefined);
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);

  // Filters State
  const [transaction, setTransaction] = useState<TransactionType>("all");
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("Semua Tipe");
  const [location, setLocation] = useState("Semua Lokasi");
  const [priceRange, setPriceRange] = useState("Semua Harga");
  const [beds, setBeds] = useState("Semua Kamar");
  const [baths, setBaths] = useState("Semua");
  const [status, setStatus] = useState("Semua Status");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Layout & Sorting
  const [sort, setSort] = useState("Rekomendasi Utama");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const resetFilters = () => {
    setTransaction("all");
    setQuery("");
    setPropertyType("Semua Tipe");
    setLocation("Semua Lokasi");
    setPriceRange("Semua Harga");
    setBeds("Semua Kamar");
    setBaths("Semua");
    setStatus("Semua Status");
    setSelectedFeatures([]);
  };

  const filteredProperties = useMemo(() => {
    return ALL_PROPERTIES.filter((item) => {
      // Transaction Filter
      if (transaction !== "all" && item.transaction !== transaction) return false;

      // Search Query
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesName = item.title.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesDesc) return false;
      }

      // Property Type
      if (propertyType !== "Semua Tipe" && item.propertyType !== propertyType) return false;

      // Location
      if (location !== "Semua Lokasi" && !item.location.toLowerCase().includes(location.toLowerCase()))
        return false;

      // Price Range Filter
      if (priceRange !== "Semua Harga") {
        if (item.transaction === "sale") {
          if (priceRange === "Di bawah Rp20 M" && item.priceValue >= 20) return false;
          if (priceRange === "Rp20–30 M" && (item.priceValue < 20 || item.priceValue > 30)) return false;
          if (priceRange === "Di atas Rp30 M" && item.priceValue <= 30) return false;
        } else {
          // rent
          if (priceRange === "Di bawah Rp50 Jt" && item.priceValue >= 0.05) return false;
          if (priceRange === "Rp50–100 Jt" && (item.priceValue < 0.05 || item.priceValue > 0.1)) return false;
          if (priceRange === "Di atas Rp100 Jt" && item.priceValue <= 0.1) return false;
        }
      }

      // Beds
      if (beds !== "Semua Kamar" && item.beds < Number(beds)) return false;

      // Baths
      if (baths !== "Semua" && item.baths < Number(baths)) return false;

      // Status
      if (status !== "Semua Status" && item.status !== status) return false;

      // Features
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every((feat) => item.features.includes(feat));
        if (!hasAllFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sort === "Harga Terendah") return a.priceValue - b.priceValue;
      if (sort === "Harga Tertinggi") return b.priceValue - a.priceValue;
      if (sort === "Terbaru") return Number(b.yearBuilt) - Number(a.yearBuilt);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [transaction, query, propertyType, location, priceRange, beds, baths, status, selectedFeatures, sort]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (transaction !== "all") count++;
    if (query.trim()) count++;
    if (propertyType !== "Semua Tipe") count++;
    if (location !== "Semua Lokasi") count++;
    if (priceRange !== "Semua Harga") count++;
    if (beds !== "Semua Kamar") count++;
    if (baths !== "Semua") count++;
    if (status !== "Semua Status") count++;
    count += selectedFeatures.length;
    return count;
  }, [transaction, query, propertyType, location, priceRange, beds, baths, status, selectedFeatures]);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Header */}
      <Header onTalkClick={() => setIsTalkModalOpen(true)} />

      {/* Page Banner / Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0b2545 0%, #134074 100%)",
          color: "#ffffff",
          padding: "3.5rem 4% 4.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "#94a3b8",
              marginBottom: "1.25rem",
            }}
          >
            <Link href="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>
              Beranda
            </Link>
            <span>/</span>
            <span style={{ color: "#ffffff", fontWeight: 600 }}>Pencarian Lanjutan</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                margin: 0,
                color: "#ffffff",
              }}
            >
              Pencarian Properti Lanjutan
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#94a3b8",
                maxWidth: "640px",
                marginTop: "0.8rem",
                lineHeight: 1.6,
              }}
            >
              Temukan unit hunian & investasi luxury pilihan sesuai kriteria spesifik Anda dari lokasi, kisaran harga, hingga fasilitas privat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Search & Filter Interface Container */}
      <section style={{ maxWidth: "1140px", margin: "-36px auto 5rem", padding: "0 4%", position: "relative", zIndex: 20 }}>
        {/* Category Tabs: All, For Sale, For Rent */}
        <div
          style={{
            display: "inline-flex",
            gap: "0.3rem",
            backgroundColor: "#ffffff",
            padding: "0.35rem",
            borderRadius: "14px",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
            border: "1px solid #e2e8f0",
            marginBottom: "0.8rem",
          }}
        >
          <button
            type="button"
            onClick={() => setTransaction("all")}
            style={{
              padding: "0.65rem 1.3rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: transaction === "all" ? "#0b3b8e" : "transparent",
              color: transaction === "all" ? "#ffffff" : "#64748b",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Semua Transaction
          </button>
          <button
            type="button"
            onClick={() => setTransaction("sale")}
            style={{
              padding: "0.65rem 1.3rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: transaction === "sale" ? "#0b3b8e" : "transparent",
              color: transaction === "sale" ? "#ffffff" : "#64748b",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            For Sale
          </button>
          <button
            type="button"
            onClick={() => setTransaction("rent")}
            style={{
              padding: "0.65rem 1.3rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: transaction === "rent" ? "#0b3b8e" : "transparent",
              color: transaction === "rent" ? "#ffffff" : "#64748b",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            For Rent
          </button>
        </div>

        {/* Filter Card Body */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Primary Filter Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              alignItems: "flex-end",
            }}
          >
            {/* Search Query Input */}
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  color: "#64748b",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "0.35rem",
                }}
              >
                Kata Kunci / Nama Properti
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <Search size={17} color="#64748b" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari lokasi, apartemen, villa..."
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    fontSize: "0.9rem",
                    color: "#0f172a",
                  }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <X size={15} color="#94a3b8" />
                  </button>
                )}
              </div>
            </div>

            {/* Tipe Properti Dropdown */}
            <div>
              <SearchableSelect
                label="Tipe Properti"
                options={["Semua Tipe", "Penthouse", "Apartemen Butik", "Villa Mewah", "Commercial Office", "Townhouse"]}
                value={propertyType}
                onChange={setPropertyType}
                searchPlaceholder="Search"
                buttonStyle={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            {/* Lokasi / Area Dropdown */}
            <div>
              <SearchableSelect
                label="Lokasi / Area"
                options={["Semua Lokasi", "Jakarta Selatan", "SCBD", "Kuningan", "Senopati", "Bali", "Menteng"]}
                value={location}
                onChange={setLocation}
                searchPlaceholder="Search"
                buttonStyle={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            {/* Kisaran Harga Dropdown */}
            <div>
              <SearchableSelect
                label="Kisaran Harga"
                options={
                  transaction === "rent"
                    ? ["Semua Harga", "Di bawah Rp50 Jt", "Rp50–100 Jt", "Di atas Rp100 Jt"]
                    : ["Semua Harga", "Di bawah Rp20 M", "Rp20–30 M", "Di atas Rp30 M"]
                }
                value={priceRange}
                onChange={setPriceRange}
                searchPlaceholder="Search"
                buttonStyle={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>

          {/* Secondary Filter Grid & More Filter Toggle */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginTop: "1rem",
              alignItems: "flex-end",
            }}
          >
            <div>
              <SearchableSelect
                label="Kamar Tidur"
                options={[
                  { label: "Semua Kamar", value: "Semua Kamar" },
                  { label: "1+ Kamar", value: "1" },
                  { label: "2+ Kamar", value: "2" },
                  { label: "3+ Kamar", value: "3" },
                  { label: "4+ Kamar", value: "4" },
                  { label: "5+ Kamar", value: "5" },
                ]}
                value={beds}
                onChange={setBeds}
                searchPlaceholder="Search"
                buttonStyle={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <SearchableSelect
                label="Kamar Mandi"
                options={[
                  { label: "Semua", value: "Semua" },
                  { label: "1+", value: "1" },
                  { label: "2+", value: "2" },
                  { label: "3+", value: "3" },
                  { label: "4+", value: "4" },
                ]}
                value={baths}
                onChange={setBaths}
                searchPlaceholder="Search"
                buttonStyle={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <SearchableSelect
                label="Status Properti"
                options={["Semua Status", "Eksklusif", "Siap Huni", "Baru", "Furnished"]}
                value={status}
                onChange={setStatus}
                searchPlaceholder="Search"
                buttonStyle={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            {/* Toggle Additional Features */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: showMoreFilters ? "#f1f5f9" : "#ffffff",
                  color: "#334155",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  cursor: "pointer",
                }}
              >
                <SlidersHorizontal size={15} />
                {showMoreFilters ? "Sembunyikan Opsi" : "Opsi Fasilitas"}
              </button>
            </div>
          </div>

          {/* Collapsible Features Checkbox Grid */}
          <AnimatePresence>
            {showMoreFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    marginTop: "1.25rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px dashed #e2e8f0",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Fasilitas & Layanan Eksklusif
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    {FEATURE_OPTIONS.map((feat) => {
                      const active = selectedFeatures.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => toggleFeature(feat)}
                          style={{
                            padding: "0.45rem 0.85rem",
                            borderRadius: "9999px",
                            border: active ? "1px solid #0b3b8e" : "1px solid #cbd5e1",
                            backgroundColor: active ? "#eff6ff" : "#ffffff",
                            color: active ? "#0b3b8e" : "#475569",
                            fontWeight: active ? 600 : 400,
                            fontSize: "0.84rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            transition: "all 0.15s ease",
                          }}
                        >
                          {active && <Check size={14} color="#0b3b8e" />}
                          {feat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Chips & Clear All */}
          {activeFiltersCount > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginTop: "1.25rem",
                paddingTop: "1rem",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Filter Aktif:</span>

                {transaction !== "all" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {transaction === "sale" ? "For Sale" : "For Rent"}
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setTransaction("all")} />
                  </span>
                )}

                {propertyType !== "Semua Tipe" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {propertyType}
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setPropertyType("Semua Tipe")} />
                  </span>
                )}

                {location !== "Semua Lokasi" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {location}
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setLocation("Semua Lokasi")} />
                  </span>
                )}

                {priceRange !== "Semua Harga" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {priceRange}
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setPriceRange("Semua Harga")} />
                  </span>
                )}

                {beds !== "Semua Kamar" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {beds}+ KT
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => setBeds("Semua Kamar")} />
                  </span>
                )}

                {selectedFeatures.map((f) => (
                  <span
                    key={f}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      backgroundColor: "#eff6ff",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      color: "#0b3b8e",
                      fontWeight: 600,
                    }}
                  >
                    {f}
                    <X size={13} style={{ cursor: "pointer" }} onClick={() => toggleFeature(f)} />
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={resetFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "#dc2626",
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={13} /> Reset Semua Filter
              </button>
            </div>
          )}
        </div>

        {/* Controls Bar & Result Counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            margin: "2rem 0 1.25rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "#0f172a" }}>
              Menampilkan {filteredProperties.length} Properti Pilihan
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            {/* View Mode Switches */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "0.2rem",
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                style={{
                  padding: "0.45rem 0.6rem",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: viewMode === "grid" ? "#f1f5f9" : "transparent",
                  color: viewMode === "grid" ? "#0b3b8e" : "#64748b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                style={{
                  padding: "0.45rem 0.6rem",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: viewMode === "list" ? "#f1f5f9" : "transparent",
                  color: viewMode === "list" ? "#0b3b8e" : "#64748b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Row List View"
              >
                <List size={18} />
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div style={{ minWidth: "190px" }}>
              <SearchableSelect
                options={[
                  "Rekomendasi Utama",
                  "Harga Terendah",
                  "Harga Tertinggi",
                  "Terbaru",
                ]}
                value={sort}
                onChange={setSort}
                align="right"
                searchPlaceholder="Search"
                buttonStyle={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  padding: "0.55rem 0.85rem",
                  fontSize: "0.88rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Property Grid / List Display */}
        {filteredProperties.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px dashed #cbd5e1",
              borderRadius: "20px",
              padding: "4rem 2rem",
              textAlign: "center",
            }}
          >
            <Building size={48} color="#94a3b8" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.5rem" }}>
              Tidak ada properti yang cocok
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#64748b", margin: 0 }}>
              Coba sesuaikan kata kunci atau tingkatkan kriteria pencarian Anda.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              style={{
                marginTop: "1.25rem",
                backgroundColor: "#0b3b8e",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "0.65rem 1.25rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                viewMode === "grid" ? "repeat(auto-fill, minmax(320px, 1fr))" : "1fr",
              gap: "1.5rem",
            }}
          >
            {filteredProperties.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedResidence(item)}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: viewMode === "list" ? "row" : "column",
                  boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 32px rgba(15, 23, 42, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(15, 23, 42, 0.04)";
                }}
              >
                {/* Property Image */}
                <div
                  style={{
                    position: "relative",
                    width: viewMode === "list" ? "320px" : "100%",
                    height: viewMode === "list" ? "auto" : "230px",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      left: "0.85rem",
                      backgroundColor: "#ffffff",
                      color: "#0b3b8e",
                      fontWeight: 800,
                      fontSize: "0.72rem",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "9999px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  >
                    {item.status}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0.85rem",
                      right: "0.85rem",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "#0b3b8e",
                      color: "#ffffff",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                {/* Property Card Body */}
                <div
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "0.78rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <MapPin size={14} /> {item.location}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "#0f172a",
                        margin: "0 0 0.8rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Specification Table - Exactly formatted with lines & clean spacing */}
                  <div
                    style={{
                      marginTop: "auto",
                      borderTop: "1px solid #e2e8f0",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.6rem 0",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: 400 }}>
                        Luas Bangunan
                      </span>
                      <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600, textAlign: "right" }}>
                        {item.sqft}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.6rem 0",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: 400 }}>
                        Kamar Tidur
                      </span>
                      <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600, textAlign: "right" }}>
                        {item.beds > 0 ? `${item.beds} Beds, ${item.baths} Baths` : "Office Space"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.6rem 0",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: 400 }}>
                        Luas Tanah
                      </span>
                      <span style={{ fontSize: "0.92rem", color: "#0f172a", fontWeight: 600, textAlign: "right" }}>
                        {item.landSqft}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.6rem 0",
                      }}
                    >
                      <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: 400 }}>
                        Harga
                      </span>
                      <span style={{ fontSize: "0.95rem", color: "#0b3b8e", fontWeight: 750, textAlign: "right" }}>
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Detail Modal */}
      <ResidenceDetailModal
        residence={selectedResidence}
        onClose={() => setSelectedResidence(null)}
        onInquire={() => {
          setSelectedResidence(null);
          setIsTalkModalOpen(true);
        }}
      />

      {/* Inquiry Modal */}
      <TalkModal
        isOpen={isTalkModalOpen}
        onClose={() => {
          setIsTalkModalOpen(false);
          setSelectedPropertyForInquire(undefined);
        }}
        prefilledProperty={selectedPropertyForInquire}
      />

      {/* Footer */}
      <FooterSection onTalkClick={() => setIsTalkModalOpen(true)} />
    </main>
  );
}
