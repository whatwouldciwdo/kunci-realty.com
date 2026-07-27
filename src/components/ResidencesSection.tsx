"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Filter, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import ResidenceDetailModal, { Residence } from "./ResidenceDetailModal";
import SearchableSelect from "./SearchableSelect";

type TransactionType = "sale" | "rent";
type Listing = Residence & { priceValue: number; area: string; status: string; transaction: TransactionType; featured?: boolean };

const RESIDENCES: Listing[] = [
  {
    id: "kunci-01",
    slug: "the-langham-residences-penthouse",
    title: "The Langham Residences Penthouse",
    category: "For Sale",
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
    description: "Penthouse langit dengan pemandangan kota 360 derajat di jantung SCBD, dilengkapi akses lift privat dan layanan hospitality bintang lima.",
    features: ["Akses lift pribadi langsung", "Balkon langit melingkar", "Kolam renang infinity privat", "Smart home Bang & Olufsen", "3 slot parkir basement", "Concierge 24/7"],
    architect: "Hadiprana Architects",
    status: "Eksklusif",
    transaction: "sale",
    featured: true,
  },
  {
    id: "kunci-02",
    slug: "alamanda-tower-residence",
    title: "Alamanda Tower Residence",
    category: "For Rent",
    location: "Kuningan, Jakarta Selatan",
    area: "Jakarta Selatan",
    price: "Rp 55.000.000 / bulan",
    priceValue: 55,
    beds: 3,
    baths: 3,
    sqft: "218 sqm",
    landSqft: "350 sqm",
    yearBuilt: "2024",
    image: "/images/haven_seq_1.jpg",
    description: "Hunian urban berkelas dengan layout luas, cahaya alami melimpah, dan akses langsung menuju kawasan bisnis Kuningan.",
    features: ["Jendela floor-to-ceiling", "Private residents lounge", "Kolam renang & gym", "Concierge 24/7", "2 slot parkir", "Akses langsung ke retail"],
    architect: "M.A. Design",
    status: "Siap Huni",
    transaction: "rent",
  },
  {
    id: "kunci-03",
    slug: "senopati-garden-residence",
    title: "Senopati Garden Residence",
    category: "For Sale",
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
    description: "Apartemen butik bernuansa tropis modern di kawasan Senopati, dirancang untuk privasi dan kenyamanan.",
    features: ["Private residents lounge", "Taman zen tropis", "Kolam renang & wellness studio", "2 slot parkir basement", "Smart home system", "Keamanan perimeter tinggi"],
    architect: "Andra Matin",
    status: "Baru",
    transaction: "sale",
  },
  {
    id: "kunci-04",
    slug: "the-residences-at-mega-kuningan",
    title: "The Residences at Mega Kuningan",
    category: "For Rent",
    location: "Mega Kuningan, Jakarta Selatan",
    area: "Jakarta Selatan",
    price: "Rp 85.000.000 / bulan",
    priceValue: 85,
    beds: 2,
    baths: 3,
    sqft: "650 sqm",
    landSqft: "750 sqm",
    yearBuilt: "2025",
    image: "/images/haven_bespoke.jpg",
    description: "Hunian premium di pusat Mega Kuningan dengan pemandangan cakrawala kota dan konektivitas terbaik.",
    features: ["Gedung Hijau Grade A", "Residents lounge eksklusif", "Kaca ganda peredam suara", "Internet fiber optik", "Akses lift VIP", "2 slot parkir indoor"],
    architect: "Denton Corker Marshall",
    status: "Furnished",
    transaction: "rent",
  },
  {
    id: "kunci-05",
    slug: "bali-oceanview-cliff-villa",
    title: "Bali Oceanview Residence",
    category: "For Sale",
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
    description: "Residence tepi tebing dengan pemandangan samudra tanpa batas dan fasilitas resort lengkap.",
    features: ["Kolam renang infinity 20m", "Paviliun spa & wellness", "Panorama sunset ke laut", "Private beach access", "Furnitur turnkey", "Pengelolaan sewa profesional"],
    architect: "Ridwan Kamil & Associates",
    status: "Eksklusif",
    transaction: "sale",
  },
];

interface ResidencesSectionProps { onTalkClick?: () => void }

export default function ResidencesSection({ onTalkClick }: ResidencesSectionProps) {
  const [transaction, setTransaction] = useState<TransactionType>("sale");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Semua lokasi");
  const [priceRange, setPriceRange] = useState("Semua harga");
  const [beds, setBeds] = useState("Semua kamar");
  const [sort, setSort] = useState("Rekomendasi");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);

  const filteredResidences = useMemo(() => {
    const result = RESIDENCES.filter((residence) => {
      const matchesTransaction = residence.transaction === transaction;
      const matchesQuery = `${residence.title} ${residence.location}`.toLowerCase().includes(query.toLowerCase().trim());
      const matchesLocation = location === "Semua lokasi" || residence.area === location;
      const matchesPrice = priceRange === "Semua harga" || (transaction === "sale" ? (priceRange === "Di bawah Rp20 M" ? residence.priceValue < 20 : priceRange === "Rp20–30 M" ? residence.priceValue >= 20 && residence.priceValue <= 30 : residence.priceValue > 30) : (priceRange === "Di bawah Rp50 Jt" ? residence.priceValue < 50 : priceRange === "Rp50–100 Jt" ? residence.priceValue >= 50 && residence.priceValue <= 100 : residence.priceValue > 100));
      const matchesBeds = beds === "Semua kamar" || residence.beds >= Number(beds);
      return matchesTransaction && matchesQuery && matchesLocation && matchesPrice && matchesBeds;
    });
    return [...result].sort((a, b) => sort === "Harga terendah" ? a.priceValue - b.priceValue : sort === "Harga tertinggi" ? b.priceValue - a.priceValue : sort === "Terbaru" ? Number(b.yearBuilt) - Number(a.yearBuilt) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [transaction, query, location, priceRange, beds, sort]);

  const changeTransaction = (value: TransactionType) => { setTransaction(value); setPriceRange("Semua harga"); };

  const resetFilters = () => { setQuery(""); setLocation("Semua lokasi"); setPriceRange("Semua harga"); setBeds("Semua kamar"); };

  return (
    <section id="residences" className="property-listing-page">
      <style jsx>{`
        .property-listing-page{padding:2rem 4% 8rem;background:#f7f8fa;color:#172033;position:relative;z-index:2}
        .listing-hero{min-height:390px;border-radius:24px;padding:clamp(2rem,6vw,5rem);display:flex;align-items:flex-end;position:relative;overflow:hidden;background:linear-gradient(90deg,rgba(8,20,40,.88),rgba(8,20,40,.2)),url('/images/haven_penthouse_1.jpg') center/cover}
        .listing-hero h1{max-width:660px;margin:0;color:#fff;font-family:var(--font-heading);font-size:clamp(2.5rem,5.4vw,5rem);line-height:.98;letter-spacing:-.06em;font-weight:500}
        .listing-hero p{max-width:500px;color:rgba(255,255,255,.82);line-height:1.55;margin:1rem 0 0}
        .transaction-tabs{max-width:1060px;margin:-48px auto 0;position:relative;z-index:15;display:flex;gap:.3rem;width:max-content;background:#fff;padding:.35rem;border:1px solid #e3e7ed;border-radius:12px;box-shadow:0 8px 24px rgba(16,31,55,.1)}
        .transaction-tab{min-width:130px;padding:.75rem 1.4rem;border:0;border-radius:8px;background:transparent;color:#647086;font-weight:750;cursor:pointer;transition:.2s}
        .transaction-tab.active{background:#0b3b8e;color:#fff}
        .search-panel{max-width:1060px;margin:.7rem auto 0;position:relative;z-index:10;background:#fff;border:1px solid #e3e7ed;border-radius:16px;padding:.75rem;box-shadow:0 16px 40px rgba(16,31,55,.12);display:grid;grid-template-columns:1.6fr repeat(3,1fr) auto;gap:.5rem}
        .search-field{min-width:0;padding:.65rem .8rem;border-right:1px solid #e8ebef;display:flex;flex-direction:column;gap:.2rem}
        .search-field label{font-size:.68rem;color:#768196;text-transform:uppercase;letter-spacing:.07em;font-weight:700}
        .search-field input{width:100%;border:0;outline:0;background:transparent;color:#172033;font:inherit;font-size:.88rem}
        .search-submit{border:0;border-radius:11px;background:#0b3b8e;color:#fff;padding:0 1.25rem;display:flex;align-items:center;gap:.45rem;cursor:pointer;font-weight:700}
        .quick-filters{display:flex;gap:.55rem;flex-wrap:wrap;margin:1.4rem 0 2.5rem}
        .quick-filters button,.reset-button{background:#fff;border:1px solid #dce2ea;border-radius:999px;padding:.55rem .9rem;color:#364052;cursor:pointer;font-size:.82rem}
        .results-toolbar{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.25rem}
        .results-toolbar h2{margin:0;font:500 clamp(1.8rem,3vw,2.5rem)/1 var(--font-heading);letter-spacing:-.04em}
        .listing-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:1fr;gap:1.5rem;margin-bottom:3rem}
        .property-card{background:#fff;border:1px solid #e2e6ec;border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column;height:100%}
        .property-card:hover{transform:translateY(-5px);box-shadow:0 16px 30px rgba(16,31,55,.1)}
        .card-image{height:235px;position:relative;overflow:hidden;flex-shrink:0}
        .card-image img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
        .property-card:hover .card-image img{transform:scale(1.05)}
        .badge{position:absolute;left:.9rem;top:.9rem;border-radius:999px;padding:.35rem .65rem;background:#fff;color:#0b3b8e;font-size:.7rem;font-weight:800}
        .card-arrow{position:absolute;right:.9rem;bottom:.9rem;width:38px;height:38px;border-radius:50%;background:#0b3b8e;color:#fff;display:grid;place-items:center}
        .card-body{padding:1.25rem;display:flex;flex-direction:column;flex:1;justify-content:space-between}
        .card-location{color:#718096;font-size:.78rem;display:flex;align-items:center;gap:.3rem;margin-bottom:.3rem}
        .card-body h3{margin:.2rem 0 .9rem;font:600 1.25rem/1.25 var(--font-heading);letter-spacing:-.025em;color:#0f172a}

        /* Formatted specs table according to user screenshot */
        .specs-table{margin-top:1.25rem;padding-top:.4rem;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0}
        .spec-row{display:flex;justify-content:space-between;align-items:center;padding:.65rem 0;border-bottom:1px solid #e2e8f0}
        .spec-row:last-child{border-bottom:none}
        .spec-label{font-size:.9rem;color:#334155;font-weight:400}
        .spec-value{font-size:.92rem;color:#0f172a;font-weight:600;text-align:right}

        .empty-state{text-align:center;background:#fff;border:1px dashed #ccd4df;border-radius:16px;padding:4rem 1rem}
        .mobile-filter-button{display:none}
        @media(max-width:900px){.listing-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.search-panel{grid-template-columns:1fr 1fr}.search-field{border-right:0}.search-submit{min-height:48px;justify-content:center}}
        @media(max-width:640px){.property-listing-page{padding:1rem 5% 4rem}.listing-hero{min-height:410px;border-radius:17px}.transaction-tabs{margin-top:-40px;width:calc(100% - 2rem)}.transaction-tab{flex:1;min-width:0}.search-panel{display:block;padding:.7rem}.search-field{border-bottom:1px solid #edf0f3;padding:.7rem .5rem}.search-submit{width:100%;min-height:48px;margin-top:.55rem;justify-content:center}.quick-filters{margin-bottom:2rem}.quick-filters button:nth-child(4){display:none}.results-toolbar{align-items:flex-start;flex-direction:column}.mobile-filter-button{display:inline-flex!important;align-items:center;gap:.4rem}.listing-grid{grid-template-columns:1fr}.card-image{height:245px}}
      `}</style>

      <div className="listing-hero">
        <div>
          <div style={{color:"#b9d2ff",fontSize:".75rem",fontWeight:800,textTransform:"uppercase",letterSpacing:".15em",marginBottom:"1rem"}}>Koleksi Apartemen Pilihan</div>
          <h1>Temukan ruang hidup yang tepat untuk Anda.</h1>
          <p>Jelajahi apartemen premium di lokasi paling strategis, dipilih dengan standar Kunci Realty.</p>
        </div>
      </div>

      <div className="transaction-tabs" role="tablist" aria-label="Kategori transaksi properti">
        <button className={`transaction-tab ${transaction === "sale" ? "active" : ""}`} onClick={()=>changeTransaction("sale")} role="tab" aria-selected={transaction === "sale"}>For Sale</button>
        <button className={`transaction-tab ${transaction === "rent" ? "active" : ""}`} onClick={()=>changeTransaction("rent")} role="tab" aria-selected={transaction === "rent"}>For Rent</button>
      </div>

      <div className="search-panel">
        <div className="search-field">
          <label>Cari properti</label>
          <div style={{display:"flex",alignItems:"center",gap:".4rem"}}>
            <Search size={16} color="#768196"/>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Nama atau area"/>
          </div>
        </div>

        <div className="search-field">
          <label>Lokasi</label>
          <SearchableSelect
            options={["Semua lokasi", "Jakarta Selatan", "Bali"]}
            value={location}
            onChange={setLocation}
            searchPlaceholder="Search"
          />
        </div>

        <div className="search-field">
          <label>Kisaran harga</label>
          <SearchableSelect
            options={
              transaction === "sale"
                ? ["Semua harga", "Di bawah Rp20 M", "Rp20–30 M", "Di atas Rp30 M"]
                : ["Semua harga", "Di bawah Rp50 Jt", "Rp50–100 Jt", "Di atas Rp100 Jt"]
            }
            value={priceRange}
            onChange={setPriceRange}
            searchPlaceholder="Search"
          />
        </div>

        <div className="search-field">
          <label>Kamar tidur</label>
          <SearchableSelect
            options={[
              { label: "Semua kamar", value: "Semua kamar" },
              { label: "2+ kamar", value: "2" },
              { label: "3+ kamar", value: "3" },
              { label: "4+ kamar", value: "4" },
            ]}
            value={beds}
            onChange={setBeds}
            searchPlaceholder="Search"
          />
        </div>

        <button className="search-submit" onClick={()=>document.getElementById("listing-results")?.scrollIntoView({behavior:"smooth"})}>
          <Search size={17}/> Cari
        </button>
      </div>

      <div className="quick-filters">
        <button onClick={resetFilters}>Semua Properti</button>
        <button onClick={()=>setLocation("Jakarta Selatan")}>Jakarta Selatan</button>
        <button onClick={()=>setBeds("3")}>3+ Kamar</button>
        <button onClick={()=>setPriceRange(transaction === "sale" ? "Di bawah Rp20 M" : "Di bawah Rp50 Jt")}>
          {transaction === "sale" ? "Di bawah Rp20 M" : "Di bawah Rp50 Jt"}
        </button>
        <Link
          href="/search"
          style={{
            background: "#0b3b8e",
            color: "#fff",
            borderRadius: "999px",
            padding: ".55rem .95rem",
            fontSize: ".82rem",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: ".35rem",
          }}
        >
          <SlidersHorizontal size={14} /> Pencarian Lanjutan
        </Link>
        <button className="mobile-filter-button" onClick={()=>setFiltersOpen(!filtersOpen)}>
          <Filter size={15}/> Filter
        </button>
      </div>

      {filtersOpen && (
        <div style={{background:"#fff",border:"1px solid #dce2ea",borderRadius:12,padding:"1rem",marginBottom:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <strong>Filter aktif</strong>
          <button className="reset-button" onClick={()=>{resetFilters();setFiltersOpen(false)}}>Reset <X size={13}/></button>
        </div>
      )}

      <div id="listing-results" className="results-toolbar">
        <h2>{filteredResidences.length} Apartemen {transaction === "sale" ? "dijual" : "disewakan"}</h2>
        <div style={{ minWidth: "180px" }}>
          <SearchableSelect
            options={["Rekomendasi", "Harga terendah", "Harga tertinggi", "Terbaru"]}
            value={sort}
            onChange={setSort}
            fullWidth={false}
            align="right"
            searchPlaceholder="Search"
            buttonStyle={{
              border: "1px solid #dce2ea",
              borderRadius: "9px",
              background: "#fff",
              padding: "0.55rem 0.8rem",
            }}
          />
        </div>
      </div>

      {filteredResidences.length === 0 ? (
        <div className="empty-state">
          <h3>Belum ada properti yang sesuai</h3>
          <p>Coba ubah kata kunci atau filter pencarian Anda.</p>
          <button className="reset-button" onClick={resetFilters}>Reset Filter</button>
        </div>
      ) : (
        <div className="listing-grid">
          {filteredResidences.map((residence, index) => (
            <Link key={residence.id} href={`/property/${residence.slug || residence.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <motion.article
                className="property-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="card-image">
                  <img src={residence.image} alt={residence.title} />
                  <span className="badge">{residence.status}</span>
                  <span className="card-arrow"><ArrowUpRight size={18} /></span>
                </div>
                <div className="card-body">
                  <div className="card-location"><MapPin size={14} />{residence.location}</div>
                  <h3>{residence.title}</h3>

                  {/* Formatted property specs list matching user's image */}
                  <div className="specs-table">
                    <div className="spec-row">
                      <span className="spec-label">Luas Bangunan</span>
                      <span className="spec-value">{residence.sqft}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Kamar Tidur</span>
                      <span className="spec-value">{residence.beds} Beds, {residence.baths} Baths</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Luas Tanah</span>
                      <span className="spec-value">{residence.landSqft || "500 sqm"}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Harga</span>
                      <span className="spec-value">{residence.price}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      )}

      <ResidenceDetailModal
        residence={selectedResidence}
        onClose={() => setSelectedResidence(null)}
        onInquire={() => {
          setSelectedResidence(null);
          onTalkClick?.();
        }}
      />
    </section>
  );
}