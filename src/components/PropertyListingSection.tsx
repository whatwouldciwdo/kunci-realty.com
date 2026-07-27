"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Map as MapIcon,
  Heart,
  Info,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  MapPin,
  Share2
} from "lucide-react";

export interface PropertyDeal {
  id: string;
  title: string;
  categoryTag: "DATA CENTER" | "WAREHOUSE" | "HOUSE" | "VILLA" | "COMMERCIAL" | "APARTMENT";
  location: string;
  price: string;
  priceRaw: number;
  assetType: string;
  leedCertified: "Gold" | "Platinum" | "Silver" | "None";
  titleType: "Built-to-suit" | "Freehold / SHM" | "HGB Murni" | "Leasehold";
  totalEquityRaise: string;
  totalDebtRaise: string;
  leveredIRR: string;
  unleveredIRR: string;
  targetedEquityMultiple: string;
  totalDevelopmentCost: string;
  estimatedCompletionDate: string;
  status: "Actived" | "Tracked" | "Invested" | "Exited";
  dealType: "My Deals" | "Offers";
  images: string[];
  description: string;
}

const MOCK_PROPERTIES: PropertyDeal[] = [
  {
    id: "prop-1",
    title: "1363 Hancock Street",
    categoryTag: "DATA CENTER",
    location: "Brooklyn, NY 11237",
    price: "$334,000",
    priceRaw: 334000,
    assetType: "Controlled Environment Agriculture",
    leedCertified: "Gold",
    titleType: "Built-to-suit",
    totalEquityRaise: "$56,420",
    totalDebtRaise: "$10,320",
    leveredIRR: "7%",
    unleveredIRR: "15%",
    targetedEquityMultiple: "2.0x",
    totalDevelopmentCost: "$40,000,000.00",
    estimatedCompletionDate: "72 Months",
    status: "Actived",
    dealType: "My Deals",
    images: ["/images/haven_bespoke.jpg", "/images/haven_seq_1.jpg", "/images/haven_seq_2.jpg"],
    description: "High-spec data infrastructure & controlled environment facility located in central Brooklyn. Built to LEED Gold standard with long-term tenant commitment."
  },
  {
    id: "prop-2",
    title: "1363 Hancock Street Warehouse",
    categoryTag: "WAREHOUSE",
    location: "Brooklyn, NY 11237",
    price: "$334,000",
    priceRaw: 334000,
    assetType: "Controlled Environment Agriculture",
    leedCertified: "Gold",
    titleType: "Built-to-suit",
    totalEquityRaise: "$56,420",
    totalDebtRaise: "$10,320",
    leveredIRR: "7%",
    unleveredIRR: "15%",
    targetedEquityMultiple: "2.0x",
    totalDevelopmentCost: "$40,000,000.00",
    estimatedCompletionDate: "72 Months",
    status: "Actived",
    dealType: "My Deals",
    images: ["/images/haven_seq_1.jpg", "/images/haven_coastal_1.jpg", "/images/haven_bespoke.jpg"],
    description: "Modern logistics warehouse hub designed for rapid fulfillment with heavy power capacity and LEED sustainability certification."
  },
  {
    id: "prop-3",
    title: "Kunci Heights Commercial Tower",
    categoryTag: "COMMERCIAL",
    location: "Sudirman CBD, Jakarta Selatan",
    price: "Rp 45.000.000.000",
    priceRaw: 45000000000,
    assetType: "Grade A High-Rise Office",
    leedCertified: "Platinum",
    titleType: "HGB Murni",
    totalEquityRaise: "Rp 12.500.000.000",
    totalDebtRaise: "Rp 4.200.000.000",
    leveredIRR: "18.5%",
    unleveredIRR: "12.8%",
    targetedEquityMultiple: "2.4x",
    totalDevelopmentCost: "Rp 120.000.000.000",
    estimatedCompletionDate: "36 Months",
    status: "Tracked",
    dealType: "My Deals",
    images: ["/images/haven_penthouse_1.jpg", "/images/haven_seq_3.jpg", "/images/haven_bespoke.jpg"],
    description: "Iconic Grade A commercial tower located in Jakarta's prime business center. Features smart building management and high occupancy projection."
  },
  {
    id: "prop-4",
    title: "Canggu Eco Luxury Villa Hub",
    categoryTag: "VILLA",
    location: "Echo Beach, Canggu, Bali",
    price: "Rp 18.500.000.000",
    priceRaw: 18500000000,
    assetType: "Boutique Resort & Private Villas",
    leedCertified: "Gold",
    titleType: "Freehold / SHM",
    totalEquityRaise: "Rp 5.800.000.000",
    totalDebtRaise: "Rp 1.500.000.000",
    leveredIRR: "21.0%",
    unleveredIRR: "14.5%",
    targetedEquityMultiple: "2.8x",
    totalDevelopmentCost: "Rp 35.000.000.000",
    estimatedCompletionDate: "24 Months",
    status: "Invested",
    dealType: "My Deals",
    images: ["/images/haven_villa_1.jpg", "/images/haven_coastal_1.jpg", "/images/haven_seq_2.jpg"],
    description: "Exclusive luxury eco-villa community nestled in Canggu Bali with high daily rental yield and premium hospitality management."
  },
  {
    id: "prop-5",
    title: "Menteng Modern Sanctuary",
    categoryTag: "HOUSE",
    location: "Jl. Diponegoro, Menteng, Jakarta",
    price: "Rp 68.000.000.000",
    priceRaw: 68000000000,
    assetType: "Ultra-Luxury Family Estate",
    leedCertified: "Gold",
    titleType: "Freehold / SHM",
    totalEquityRaise: "Rp 15.000.000.000",
    totalDebtRaise: "Rp 3.000.000.000",
    leveredIRR: "16.0%",
    unleveredIRR: "12.0%",
    targetedEquityMultiple: "2.2x",
    totalDevelopmentCost: "Rp 80.000.000.000",
    estimatedCompletionDate: "12 Months",
    status: "Exited",
    dealType: "Offers",
    images: ["/images/haven_coastal_1.jpg", "/images/haven_bespoke.jpg", "/images/haven_penthouse_1.jpg"],
    description: "Prestigious diplomatic residential compound in Menteng. Architectural elegance paired with top-tier security and privacy."
  },
  {
    id: "prop-6",
    title: "BSD HyperScale Data Center 2",
    categoryTag: "DATA CENTER",
    location: "BSD City, Tangerang Selatan",
    price: "$4,500,000",
    priceRaw: 4500000,
    assetType: "Tier-4 Data Infrastructure",
    leedCertified: "Platinum",
    titleType: "HGB Murni",
    totalEquityRaise: "$950,000",
    totalDebtRaise: "$210,000",
    leveredIRR: "24.5%",
    unleveredIRR: "17.2%",
    targetedEquityMultiple: "3.1x",
    totalDevelopmentCost: "$65,000,000.00",
    estimatedCompletionDate: "48 Months",
    status: "Actived",
    dealType: "Offers",
    images: ["/images/haven_seq_2.jpg", "/images/haven_seq_3.jpg", "/images/haven_seq_1.jpg"],
    description: "State-of-the-art hyperscale data center facility supporting AI cloud workloads with green energy sourcing."
  }
];

interface PropertyListingSectionProps {
  onInquireClick: (propertyTitle?: string) => void;
}

export default function PropertyListingSection({ onInquireClick }: PropertyListingSectionProps) {
  // Filter States
  const [activeStatusTab, setActiveStatusTab] = useState<string>("All");
  const [activeDealTab, setActiveDealTab] = useState<"My Deals" | "Offers">("My Deals");
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  
  // Modals & Sliders State
  const [activePropertyModal, setActivePropertyModal] = useState<PropertyDeal | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [imageIndexMap, setImageIndexMap] = useState<Record<string, number>>({});



  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Cycle image slider inside card
  const handleNextImage = (propId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndexMap((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) + 1) % total,
    }));
  };

  const handlePrevImage = (propId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndexMap((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) - 1 + total) % total,
    }));
  };

  // Filter properties
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((item) => {
      // Deal Tab filter
      if (item.dealType !== activeDealTab) return false;

      // Status tab filter
      if (activeStatusTab === "Tracked" && !favorites[item.id] && item.status !== "Tracked") {
        return false;
      } else if (activeStatusTab !== "All" && activeStatusTab !== "Tracked" && item.status !== activeStatusTab) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && item.categoryTag !== selectedCategory.toUpperCase()) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchLoc = item.location.toLowerCase().includes(query);
        const matchTag = item.categoryTag.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchTag) return false;
      }

      return true;
    });
  }, [activeStatusTab, activeDealTab, selectedCategory, searchQuery, favorites]);

  return (
    <section
      style={{
        width: "100%",
        minHeight: "85vh",
        backgroundColor: "#fafafa",
        padding: "2.5rem 4% 6rem 4%",
        color: "#111827",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Top Header & Search Bar Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Headline & Search bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.25rem",
                }}
              >
                Property Listings & Deals
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Explore Kunci Realty&apos;s exclusive portfolio of prime properties, data centers, and commercial assets.
              </p>
            </div>

            {/* Global Search Input */}
            <div
              style={{
                position: "relative",
                minWidth: "280px",
                flex: "1",
                maxWidth: "420px",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location, property title, asset type..."
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem 0.65rem 2.75rem",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  fontSize: "0.9rem",
                  color: "#1e293b",
                  outline: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0B3B8E")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* MAIN FILTER & NAVIGATION CONTROL BAR (Directly inspired by screenshot) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              backgroundColor: "#ffffff",
              padding: "0.75rem 1.25rem",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            {/* Left Controls: Filter Button + Status Pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              {/* Filters Button */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#334155",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0B3B8E";
                  e.currentTarget.style.color = "#0B3B8E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.color = "#334155";
                }}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              {/* Status Filter Pills (All, Tracked, Invested, Actived, Exited) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "#f1f5f9",
                  padding: "0.25rem",
                  borderRadius: "10px",
                }}
              >
                {["All", "Tracked", "Invested", "Actived", "Exited"].map((tab) => {
                  const isActive = activeStatusTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveStatusTab(tab)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: "7px",
                        border: "none",
                        backgroundColor: isActive ? "#ffffff" : "transparent",
                        fontSize: "0.85rem",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#0f172a" : "#64748b",
                        cursor: "pointer",
                        boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Category Dropdown/Pills */}
              <div style={{ display: "flex", gap: "0.35rem", overflowX: "auto" }}>
                {["All", "Data Center", "Warehouse", "House", "Villa", "Commercial"].map((cat) => {
                  const isCatActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "6px",
                        border: isCatActive ? "1px solid #0B3B8E" : "1px solid #e2e8f0",
                        backgroundColor: isCatActive ? "rgba(11, 59, 142, 0.06)" : "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: isCatActive ? 600 : 500,
                        color: isCatActive ? "#0B3B8E" : "#475569",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Controls: My Deals / Offers + View Modes */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* My Deals vs Offers pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#e2e8f0",
                  padding: "0.25rem",
                  borderRadius: "8px",
                }}
              >
                {(["My Deals", "Offers"] as const).map((dealType) => {
                  const isActive = activeDealTab === dealType;
                  return (
                    <button
                      key={dealType}
                      onClick={() => setActiveDealTab(dealType)}
                      style={{
                        padding: "0.35rem 0.85rem",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: isActive ? "#ffffff" : "transparent",
                        fontSize: "0.85rem",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#0B3B8E" : "#64748b",
                        cursor: "pointer",
                        boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {dealType}
                    </button>
                  );
                })}
              </div>

              {/* View Switchers: Grid, Row List, Map */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", backgroundColor: "#f1f5f9", padding: "0.2rem", borderRadius: "8px" }}>
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  style={{
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: viewMode === "grid" ? "#ffffff" : "transparent",
                    color: viewMode === "grid" ? "#0B3B8E" : "#64748b",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: viewMode === "grid" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  <LayoutGrid size={17} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="Detailed Row List View"
                  style={{
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: viewMode === "list" ? "#ffffff" : "transparent",
                    color: viewMode === "list" ? "#0B3B8E" : "#64748b",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: viewMode === "list" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  <List size={17} />
                </button>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  title="Map View"
                  style={{
                    padding: "0.4rem 0.5rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#64748b",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MapIcon size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS COUNT & FILTER APPLIED INDICATOR */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", padding: "0 0.25rem" }}>
          <p style={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}>
            Showing <strong style={{ color: "#0f172a" }}>{filteredProperties.length}</strong> property listings
          </p>
          {(activeStatusTab !== "All" || selectedCategory !== "All" || searchQuery !== "") && (
            <button
              onClick={() => {
                setActiveStatusTab("All");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "#0B3B8E",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* PROPERTY LISTINGS DISPLAY AREA */}
        {filteredProperties.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "4rem 2rem",
              borderRadius: "16px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <Building2 size={48} style={{ color: "#cbd5e1", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#334155", marginBottom: "0.5rem" }}>
              No Matching Property Listings
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", maxWidth: "400px", margin: "0 auto 1.5rem auto" }}>
              Try adjusting your search query or resetting active filters to view all available assets.
            </p>
            <button
              onClick={() => {
                setActiveStatusTab("All");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              style={{
                backgroundColor: "#0B3B8E",
                color: "#ffffff",
                padding: "0.6rem 1.25rem",
                borderRadius: "8px",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Show All Properties
            </button>
          </div>
        ) : viewMode === "list" ? (
          /* DETAILED ROW LIST VIEW (DIRECTLY MATCHING SCREENSHOT DESIGN) */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filteredProperties.map((prop) => {
              const currentImgIdx = imageIndexMap[prop.id] || 0;
              const isFav = favorites[prop.id];

              return (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActivePropertyModal(prop)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  {/* Left Column: Image Slider / Thumbnail (Responsive width) */}
                  <div
                    style={{
                      width: "280px",
                      minWidth: "280px",
                      position: "relative",
                      backgroundColor: "#0f172a",
                    }}
                  >
                    <Image
                      src={prop.images[currentImgIdx] || prop.images[0]}
                      alt={prop.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 280px"
                    />

                    {/* Favorite Heart Toggle */}
                    <button
                      onClick={(e) => toggleFavorite(prop.id, e)}
                      aria-label="Track deal"
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(4px)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 2,
                        transition: "transform 0.15s ease",
                      }}
                    >
                      <Heart
                        size={16}
                        fill={isFav ? "#ef4444" : "none"}
                        color={isFav ? "#ef4444" : "#1e293b"}
                      />
                    </button>

                    {/* Image Nav Arrows & Pagination Dots */}
                    {prop.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(prop.id, prop.images.length, e)}
                          style={{
                            position: "absolute",
                            left: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(prop.id, prop.images.length, e)}
                          style={{
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          <ChevronRight size={14} />
                        </button>

                        <div
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: "4px",
                            zIndex: 2,
                          }}
                        >
                          {prop.images.map((_, idx) => (
                            <span
                              key={idx}
                              style={{
                                width: idx === currentImgIdx ? "6px" : "4px",
                                height: idx === currentImgIdx ? "6px" : "4px",
                                borderRadius: "50%",
                                backgroundColor: idx === currentImgIdx ? "#ffffff" : "rgba(255,255,255,0.5)",
                                transition: "all 0.2s ease",
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right Column: Detailed Financial & Spec Content (Screenshot Exact Reproduction) */}
                  <div
                    style={{
                      flex: 1,
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Header Row: Title, Tag, Price */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem" }}>
                          <h2
                            style={{
                              fontSize: "1.35rem",
                              fontWeight: 700,
                              color: "#0f172a",
                              margin: 0,
                            }}
                          >
                            {prop.title}
                          </h2>
                          <span
                            style={{
                              backgroundColor: "#475569",
                              color: "#ffffff",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "0.2rem 0.5rem",
                              borderRadius: "4px",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {prop.categoryTag}
                          </span>
                        </div>
                        <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
                          {prop.location}
                        </p>
                      </div>

                      {/* Bold Price */}
                      <div
                        style={{
                          fontSize: "1.45rem",
                          fontWeight: 800,
                          color: "#0f172a",
                          textAlign: "right",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {prop.price}
                      </div>
                    </div>

                    {/* Spec Badges Row (Asset Type, LEED Certified, Title) */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.6rem",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#f1f5f9",
                          borderRadius: "8px",
                          padding: "0.4rem 0.75rem",
                          fontSize: "0.75rem",
                          lineHeight: 1.2,
                        }}
                      >
                        <span style={{ color: "#64748b", display: "block", fontSize: "0.7rem" }}>Asset Type:</span>
                        <strong style={{ color: "#1e293b", fontWeight: 600 }}>{prop.assetType}</strong>
                      </div>

                      <div
                        style={{
                          backgroundColor: "#f1f5f9",
                          borderRadius: "8px",
                          padding: "0.4rem 0.75rem",
                          fontSize: "0.75rem",
                          lineHeight: 1.2,
                        }}
                      >
                        <span style={{ color: "#64748b", display: "block", fontSize: "0.7rem" }}>LEED Certified:</span>
                        <strong style={{ color: "#1e293b", fontWeight: 600 }}>{prop.leedCertified}</strong>
                      </div>

                      <div
                        style={{
                          backgroundColor: "#f1f5f9",
                          borderRadius: "8px",
                          padding: "0.4rem 0.75rem",
                          fontSize: "0.75rem",
                          lineHeight: 1.2,
                        }}
                      >
                        <span style={{ color: "#64748b", display: "block", fontSize: "0.7rem" }}>Title:</span>
                        <strong style={{ color: "#1e293b", fontWeight: 600 }}>{prop.titleType}</strong>
                      </div>
                    </div>

                    {/* Equity & Debt Raise Progress Bar Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: "0.75rem",
                        marginBottom: "0.75rem",
                        borderBottom: "1px solid #f1f5f9",
                        fontSize: "0.8rem",
                      }}
                    >
                      <div style={{ flex: 1, paddingRight: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                          <span style={{ color: "#64748b", fontSize: "0.75rem" }}>Total Equity Raise</span>
                          <strong style={{ color: "#0f172a", fontWeight: 700 }}>{prop.totalEquityRaise}</strong>
                        </div>
                        <div style={{ width: "100%", height: "3px", backgroundColor: "#e2e8f0", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: "65%", height: "100%", backgroundColor: "#0f172a" }} />
                        </div>
                      </div>

                      <div style={{ flex: 1, paddingLeft: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                          <span style={{ color: "#64748b", fontSize: "0.75rem" }}>Total Debt Raise</span>
                          <strong style={{ color: "#0f172a", fontWeight: 700 }}>{prop.totalDebtRaise}</strong>
                        </div>
                        <div style={{ width: "100%", height: "3px", backgroundColor: "#e2e8f0", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: "30%", height: "100%", backgroundColor: "#334155" }} />
                        </div>
                      </div>
                    </div>

                    {/* Financial Metrics Row (Levered IRR, Unlevered IRR, Targeted Equity Multiple, Total Development Cost, Completion) */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                        gap: "0.75rem",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <strong style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{prop.leveredIRR}</strong>
                          <Info size={12} style={{ color: "#94a3b8" }} />
                        </div>
                        <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Levered IRR</span>
                      </div>

                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <strong style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{prop.unleveredIRR}</strong>
                          <Info size={12} style={{ color: "#94a3b8" }} />
                        </div>
                        <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Unlevered IRR</span>
                      </div>

                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <strong style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{prop.targetedEquityMultiple}</strong>
                          <Info size={12} style={{ color: "#94a3b8" }} />
                        </div>
                        <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Targeted Equity Multiple</span>
                      </div>

                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <strong style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{prop.totalDevelopmentCost}</strong>
                          <Info size={12} style={{ color: "#94a3b8" }} />
                        </div>
                        <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Total Development Cost</span>
                      </div>

                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <strong style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{prop.estimatedCompletionDate}</strong>
                          <Info size={12} style={{ color: "#94a3b8" }} />
                        </div>
                        <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Estimated Completion Date</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* GRID CARD VIEW MODE */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filteredProperties.map((prop) => {
              const currentImgIdx = imageIndexMap[prop.id] || 0;
              const isFav = favorites[prop.id];

              return (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActivePropertyModal(prop)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  {/* Top Image */}
                  <div style={{ width: "100%", height: "220px", position: "relative" }}>
                    <Image
                      src={prop.images[currentImgIdx] || prop.images[0]}
                      alt={prop.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      onClick={(e) => toggleFavorite(prop.id, e)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Heart size={16} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "#1e293b"} />
                    </button>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "12px",
                        backgroundColor: "rgba(15, 23, 42, 0.75)",
                        backdropFilter: "blur(4px)",
                        color: "#ffffff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      {prop.categoryTag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                          {prop.title}
                        </h3>
                        <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0B3B8E" }}>
                          {prop.price}
                        </span>
                      </div>
                      <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.25rem", marginBottom: "1rem" }}>
                        {prop.location}
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.78rem", backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "8px", marginBottom: "1rem" }}>
                        <div>
                          <span style={{ color: "#64748b", display: "block" }}>Levered IRR</span>
                          <strong style={{ color: "#0f172a" }}>{prop.leveredIRR}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block" }}>Target Multiple</span>
                          <strong style={{ color: "#0f172a" }}>{prop.targetedEquityMultiple}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block" }}>Dev Cost</span>
                          <strong style={{ color: "#0f172a" }}>{prop.totalDevelopmentCost}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b", display: "block" }}>Est. Time</span>
                          <strong style={{ color: "#0f172a" }}>{prop.estimatedCompletionDate}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInquireClick(prop.title);
                      }}
                      style={{
                        width: "100%",
                        padding: "0.6rem",
                        borderRadius: "8px",
                        backgroundColor: "#0B3B8E",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Inquire About Deal
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* PROPERTY DETAIL MODAL */}
      <AnimatePresence>
        {activePropertyModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
            onClick={() => setActivePropertyModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                maxWidth: "840px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                padding: "2rem",
                position: "relative",
              }}
            >
              <button
                onClick={() => setActivePropertyModal(null)}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#f1f5f9",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} color="#475569" />
              </button>

              {/* Main Modal Image */}
              <div style={{ width: "100%", height: "320px", position: "relative", borderRadius: "12px", overflow: "hidden", marginBottom: "1.5rem" }}>
                <Image
                  src={activePropertyModal.images[0]}
                  alt={activePropertyModal.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "#0B3B8E",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "6px",
                  }}
                >
                  {activePropertyModal.categoryTag}
                </span>
              </div>

              {/* Detail Info */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                      {activePropertyModal.title}
                    </h2>
                    <p style={{ color: "#64748b", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.25rem" }}>
                      <MapPin size={16} /> {activePropertyModal.location}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0B3B8E" }}>
                      {activePropertyModal.price}
                    </span>
                    <span style={{ display: "block", color: "#64748b", fontSize: "0.8rem" }}>Est. Asset Valuation</span>
                  </div>
                </div>

                <p style={{ color: "#334155", fontSize: "0.95rem", lineHeight: 1.6, margin: "1.25rem 0" }}>
                  {activePropertyModal.description}
                </p>

                {/* Specs Grid */}
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.75rem" }}>
                  Financial & Investment Projections
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "1rem",
                    backgroundColor: "#f8fafc",
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Levered IRR</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a" }}>{activePropertyModal.leveredIRR}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Unlevered IRR</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a" }}>{activePropertyModal.unleveredIRR}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Target Multiple</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a" }}>{activePropertyModal.targetedEquityMultiple}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Total Dev Cost</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a" }}>{activePropertyModal.totalDevelopmentCost}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>LEED Certification</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a" }}>{activePropertyModal.leedCertified}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Legal Title</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a" }}>{activePropertyModal.titleType}</strong>
                  </div>
                </div>

                {/* Call to action */}
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    onClick={() => {
                      setActivePropertyModal(null);
                      onInquireClick(activePropertyModal.title);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: "#0B3B8E",
                      color: "#ffffff",
                      padding: "0.85rem",
                      borderRadius: "10px",
                      border: "none",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                    }}
                  >
                    Inquire About This Property
                  </button>
                  <button
                    onClick={() => {
                      alert(`Deal link for ${activePropertyModal.title} copied to clipboard.`);
                    }}
                    style={{
                      padding: "0.85rem 1.25rem",
                      borderRadius: "10px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: "#ffffff",
                      color: "#334155",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FILTER DRAWER MODAL */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              backdropFilter: "blur(2px)",
              zIndex: 999,
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={() => setIsFilterDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "420px",
                height: "100%",
                backgroundColor: "#ffffff",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                    Filter Property Listings
                  </h3>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <X size={20} color="#64748b" />
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {/* Asset Category */}
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "0.5rem" }}>
                      Asset Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.9rem",
                      }}
                    >
                      <option value="All">All Categories</option>
                      <option value="Data Center">Data Center</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial Office</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "0.5rem" }}>
                      Deal Status
                    </label>
                    <select
                      value={activeStatusTab}
                      onChange={(e) => setActiveStatusTab(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.9rem",
                      }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Actived">Active Deals</option>
                      <option value="Tracked">Tracked / Favorites</option>
                      <option value="Invested">Invested</option>
                      <option value="Exited">Exited Deals</option>
                    </select>
                  </div>

                  {/* Certifications */}
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: "0.5rem" }}>
                      Certification Standards
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ padding: "0.4rem 0.8rem", backgroundColor: "#f1f5f9", borderRadius: "6px", fontSize: "0.8rem" }}>LEED Gold</span>
                      <span style={{ padding: "0.4rem 0.8rem", backgroundColor: "#f1f5f9", borderRadius: "6px", fontSize: "0.8rem" }}>LEED Platinum</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => {
                    setActiveStatusTab("All");
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setIsFilterDrawerOpen(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  style={{
                    flex: 2,
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0B3B8E",
                    color: "#ffffff",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAP VIEW MODAL */}
      <AnimatePresence>
        {isMapModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
            onClick={() => setIsMapModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "900px",
                height: "600px",
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.5rem",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <MapIcon size={18} /> Kunci Realty Asset & Property Deals Location Map
                </h3>
                <button
                  onClick={() => setIsMapModalOpen(false)}
                  style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer" }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Map Canvas Visual Simulation */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#e2e8f0",
                  backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center", color: "#475569" }}>
                  <MapPin size={48} style={{ color: "#0B3B8E", marginBottom: "0.5rem" }} />
                  <p style={{ fontWeight: 600, fontSize: "1.1rem" }}>Interactive Property Map</p>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    6 Active Asset Locations across Jakarta, Bali, & New York
                  </p>
                </div>

                {/* Simulated Pins */}
                {MOCK_PROPERTIES.map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsMapModalOpen(false);
                      setActivePropertyModal(p);
                    }}
                    style={{
                      position: "absolute",
                      top: `${25 + (idx * 12) % 55}%`,
                      left: `${15 + (idx * 18) % 70}%`,
                      backgroundColor: "#0B3B8E",
                      color: "#ffffff",
                      padding: "0.4rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      border: "2px solid #ffffff",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <MapPin size={12} /> {p.title.split(" ")[0]} ({p.price})
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
