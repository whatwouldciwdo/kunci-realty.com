export interface Property {
  id: string;
  slug: string;
  title: string;
  category: "For Sale" | "For Rent";
  propertyType: string;
  location: string;
  area: string;
  address: string;
  price: string;
  priceValue: number;
  beds: number;
  baths: number;
  sqft: string;
  landSqft: string;
  yearBuilt: string;
  architect: string;
  status: string;
  transaction: "sale" | "rent";
  featured?: boolean;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  overview: {
    title: string;
    text: string;
    highlights: string[];
  };
  facilities: { icon: string; name: string; desc: string }[];
  locationDetails: {
    mapTitle: string;
    nearbyPlaces: { name: string; time: string }[];
  };
}

export const PROPERTIES: Property[] = [
  {
    id: "kunci-01",
    slug: "the-langham-residences-penthouse",
    title: "The Langham Residences Penthouse",
    category: "For Sale",
    propertyType: "Penthouse",
    location: "SCBD, Jakarta Selatan",
    area: "Jakarta Selatan",
    address: "Kawasan Niaga Terpadu Sudirman (SCBD) Lot 28, Jakarta Selatan",
    price: "Rp 42.500.000.000",
    priceValue: 42.5,
    beds: 4,
    baths: 4,
    sqft: "490 sqm",
    landSqft: "600 sqm",
    yearBuilt: "2025",
    architect: "Hadiprana Architects & SCDA",
    status: "Eksklusif",
    transaction: "sale",
    featured: true,
    image: "/images/haven_penthouse_1.jpg",
    gallery: [
      "/images/haven_penthouse_1.jpg",
      "/images/haven_seq_1.jpg",
      "/images/haven_seq_2.jpg",
      "/images/haven_seq_3.jpg",
      "/images/haven_villa_1.jpg",
    ],
    description:
      "Penthouse langit dengan pemandangan kota 360 derajat di jantung SCBD, dilengkapi akses lift privat dan layanan hospitality bintang lima.",
    features: [
      "Private Lift Direct Access",
      "Balkon Langit Melingkar 360°",
      "Infinity Pool Privat",
      "Smart Home Bang & Olufsen",
      "3 Slot Parkir Basement",
      "Concierge Hospitality 24/7",
    ],
    overview: {
      title: "Kemewahan Puncak di Pusat Bisnis Jakarta",
      text: "The Langham Residences menawarkan standar hunian teratas dengan estetika arsitektur neoklasik modern. Penthouse ini dirancang khusus dengan tinggi ceiling 4.2 meter, pencahayaan alami panorama kota, dan material marble impor Italia pilihan.",
      highlights: [
        "Floor-to-ceiling double glazed glass",
        "Master suite dengan walk-in closet privat",
        "Dapur gourmet Gaggenau & Miele",
        "Akses langsung ke hotel bintang 5 The Langham",
      ],
    },
    facilities: [
      { icon: "Shield", name: "Keamanan Lapapis 24/7", desc: "Sistem pengawasan biometrik dan keamanan perimeter tinggi." },
      { icon: "Waves", name: "Infinity Pool Sky", desc: "Kolam renang dipanaskan dengan pemandangan cakrawala kota." },
      { icon: "Wine", name: "Private Lounge & Cigar Bar", desc: "Ruang sosialisasi privat khusus pemilik residence." },
      { icon: "Dumbbell", name: "Wellness & Spa Studio", desc: "Pusat kebugaran privat dan fasilitas sauna spa kelas dunia." },
      { icon: "Car", name: "VIP Valet & Parking", desc: "3 slot parkir khusus dengan pengisi daya kendaraan listrik." },
      { icon: "Sparkles", name: "Butler & Room Service", desc: "Layanan kamar bintang lima 24 jam dari The Langham." },
    ],
    locationDetails: {
      mapTitle: "SCBD Lot 28, Jakarta Selatan",
      nearbyPlaces: [
        { name: "Pacific Place Mall", time: "2 Menit Jalan Kaki" },
        { name: "Stasiun MRT Istora Mandiri", time: "5 Menit Jalan Kaki" },
        { name: "Bursa Efek Indonesia (BEI)", time: "3 Menit" },
        { name: "Plaza Senayan & Senayan City", time: "7 Menit Berkendara" },
      ],
    },
  },
  {
    id: "kunci-02",
    slug: "alamanda-tower-residence",
    title: "Alamanda Tower Residence",
    category: "For Rent",
    propertyType: "Apartemen Butik",
    location: "Kuningan, Jakarta Selatan",
    area: "Jakarta Selatan",
    address: "Jl. HR Rasuna Said Blok X-5, Kuningan, Jakarta Selatan",
    price: "Rp 55.000.000 / bulan",
    priceValue: 55,
    beds: 3,
    baths: 3,
    sqft: "218 sqm",
    landSqft: "350 sqm",
    yearBuilt: "2024",
    architect: "M.A. Design",
    status: "Siap Huni",
    transaction: "rent",
    image: "/images/haven_seq_1.jpg",
    gallery: [
      "/images/haven_seq_1.jpg",
      "/images/haven_seq_2.jpg",
      "/images/haven_seq_3.jpg",
      "/images/haven_bespoke.jpg",
      "/images/haven_penthouse_1.jpg",
    ],
    description:
      "Hunian urban berkelas dengan layout luas, cahaya alami melimpah, dan akses langsung menuju kawasan bisnis Kuningan.",
    features: [
      "Jendela Floor-to-Ceiling",
      "Private Residents Lounge",
      "Kolam Renang & Gym",
      "Concierge 24/7",
      "2 Slot Parkir Dedicated",
      "Akses Langsung ke Retail",
    ],
    overview: {
      title: "Kenyamanan Urban Modern di Kawasan Bisnis Kuningan",
      text: "Alamanda Tower Residence memberikan keseimbangan antara efisiensi ruang kerja urban dan kenyamanan hunian santai. Dilengkapi perabotan turnkey kelas premium dan tata ruang lapang.",
      highlights: [
        "Perabotan kayu jati custom",
        "Balkon pribadi dengan pemandangan taman",
        "Sistem penjernih udara terpadu",
        "Akses transportasi LRT dan jalan bebas hambatan",
      ],
    },
    facilities: [
      { icon: "Waves", name: "Olympic Swimming Pool", desc: "Kolam renang semi-outdoor dengan dek berjemur." },
      { icon: "Dumbbell", name: "Fitness Center", desc: "Peralatan cardio dan beban Technogym terbaru." },
      { icon: "Shield", name: "Keamanan 24 Jam", desc: "Akses kartu pintar dan CCTV seluruh area." },
      { icon: "Sparkles", name: "Executive Meeting Lounge", desc: "Ruang rapat privat siap pakai untuk penghuni." },
    ],
    locationDetails: {
      mapTitle: "Kuningan Central Business District",
      nearbyPlaces: [
        { name: "Epicentrum Walk & Plaza Festival", time: "3 Menit" },
        { name: "Stasiun LRT Rasuna Said", time: "4 Menit Jalan Kaki" },
        { name: "RS MMC Kuningan", time: "5 Menit" },
      ],
    },
  },
  {
    id: "kunci-03",
    slug: "senopati-garden-residence",
    title: "Senopati Garden Residence",
    category: "For Sale",
    propertyType: "Apartemen Butik",
    location: "Senopati, Jakarta Selatan",
    area: "Jakarta Selatan",
    address: "Jl. Senopati Raya No. 45, Jakarta Selatan",
    price: "Rp 21.500.000.000",
    priceValue: 21.5,
    beds: 5,
    baths: 6,
    sqft: "750 sqm",
    landSqft: "900 sqm",
    yearBuilt: "2026",
    architect: "Andra Matin",
    status: "Baru",
    transaction: "sale",
    image: "/images/haven_villa_1.jpg",
    gallery: [
      "/images/haven_villa_1.jpg",
      "/images/haven_penthouse_1.jpg",
      "/images/haven_seq_2.jpg",
      "/images/haven_coastal_1.jpg",
      "/images/haven_seq_3.jpg",
    ],
    description:
      "Apartemen butik bernuansa tropis modern di kawasan Senopati, dirancang untuk privasi dan kenyamanan berkumpul keluarga.",
    features: [
      "Private Residents Lounge",
      "Taman Zen Tropis",
      "Kolam Renang & Wellness Studio",
      "2 Slot Parkir Basement",
      "Smart Home System",
      "Keamanan Perimeter Tinggi",
    ],
    overview: {
      title: "Oasis Tropis Modern di Kawasan Kuliner & Lifestyle Senopati",
      text: "Dirancang oleh arsitek terkemuka Andra Matin, Senopati Garden Residence memadukan material kayu hangat, batu alam, dan vegetasi hijau rimbun untuk menciptakan lingkungan tinggal yang tenang di tengah dinamika kota.",
      highlights: [
        "Desain sirkulasi udara alami cross-ventilation",
        "Kamar tidur utama dengan teras privat",
        "Koleksi tanaman tropis terkurasi",
        "Dekat dengan kafe & restoran gourmet Senopati",
      ],
    },
    facilities: [
      { icon: "Sparkles", name: "Zen Botanical Garden", desc: "Taman terbuka dengan tempat meditasi dan kolam ikan." },
      { icon: "Waves", name: "Pool & Jacuzzi", desc: "Kolam renang nuansa resort dengan fasilitas jacuzzi." },
      { icon: "Shield", name: "Keamanan 24/7", desc: "Pengawasan keamanan penuh 24 jam." },
    ],
    locationDetails: {
      mapTitle: "Kawasan Senopati, Jakarta Selatan",
      nearbyPlaces: [
        { name: "Restoran & Kafe Senopati", time: "1 Menit Jalan Kaki" },
        { name: "Ashta District 8", time: "4 Menit Berkendara" },
        { name: "Kawasan SCBD", time: "5 Menit Berkendara" },
      ],
    },
  },
  {
    id: "kunci-04",
    slug: "the-residences-at-mega-kuningan",
    title: "The Residences at Mega Kuningan",
    category: "For Rent",
    propertyType: "Apartemen Butik",
    location: "Mega Kuningan, Jakarta Selatan",
    area: "Jakarta Selatan",
    address: "Kawasan Mega Kuningan Lingkar 3, Jakarta Selatan",
    price: "Rp 85.000.000 / bulan",
    priceValue: 85,
    beds: 2,
    baths: 3,
    sqft: "650 sqm",
    landSqft: "750 sqm",
    yearBuilt: "2025",
    architect: "Denton Corker Marshall",
    status: "Furnished",
    transaction: "rent",
    image: "/images/haven_bespoke.jpg",
    gallery: [
      "/images/haven_bespoke.jpg",
      "/images/haven_seq_1.jpg",
      "/images/haven_seq_3.jpg",
      "/images/haven_penthouse_1.jpg",
      "/images/haven_coastal_1.jpg",
    ],
    description:
      "Hunian premium di pusat Mega Kuningan dengan pemandangan cakrawala kota dan konektivitas terbaik ke pusat bisnis.",
    features: [
      "Gedung Hijau Grade A",
      "Residents Lounge Eksklusif",
      "Kaca Ganda Peredam Suara",
      "Internet Fiber Optik High Speed",
      "Akses Lift VIP Direct",
      "2 Slot Parkir Indoor",
    ],
    overview: {
      title: "Prestise Internasional di Kawasan Diplomatik Mega Kuningan",
      text: "Berada di kawasan paling aman dan teratur di Jakarta, residence ini menawarkan interior bergaya kontemporer Eropa dengan pemandangan lanskap kota dari ketinggian.",
      highlights: [
        "Kaca anti UV dan peredam kedap suara",
        "Sistem filtrasi air minum terpadu",
        "Interior marmer Carrara Italia",
      ],
    },
    facilities: [
      { icon: "Shield", name: "Pengawasan Keamanan VIP", desc: "Standar keamanan internasional untuk diplomat dan eksekutif." },
      { icon: "Waves", name: "Sky Pool", desc: "Kolam renang rooftop dengan pemandangan malam hari." },
    ],
    locationDetails: {
      mapTitle: "Mega Kuningan, Jakarta Selatan",
      nearbyPlaces: [
        { name: "Lotte Shopping Avenue", time: "5 Menit" },
        { name: "Ritz-Carlton Mega Kuningan", time: "2 Menit Jalan Kaki" },
        { name: "Kedutaan Besar Australia & Singapura", time: "3 Menit" },
      ],
    },
  },
  {
    id: "kunci-05",
    slug: "bali-oceanview-cliff-villa",
    title: "Bali Oceanview Cliff Villa",
    category: "For Sale",
    propertyType: "Villa Mewah",
    location: "Uluwatu, Bali",
    area: "Bali",
    address: "Jl. Pantai Suluban, Uluwatu, Bali",
    price: "Rp 28.000.000.000",
    priceValue: 28,
    beds: 3,
    baths: 3,
    sqft: "285 sqm",
    landSqft: "500 sqm",
    yearBuilt: "2025",
    architect: "Ridwan Kamil & Associates",
    status: "Eksklusif",
    transaction: "sale",
    image: "/images/haven_coastal_1.jpg",
    gallery: [
      "/images/haven_coastal_1.jpg",
      "/images/haven_villa_1.jpg",
      "/images/haven_penthouse_1.jpg",
      "/images/haven_seq_1.jpg",
      "/images/haven_bespoke.jpg",
    ],
    description:
      "Residence tepi tebing dengan pemandangan samudra tanpa batas, akses pantai privat, dan fasilitas resort berbintang.",
    features: [
      "Infinity Pool 20 meter",
      "Paviliun Spa & Yoga Wellness",
      "Panorama Sunset Samudra",
      "Private Beach Access Pathway",
      "Furnitur Turnkey Premium",
      "Pengelolaan Sewa Profesional",
    ],
    overview: {
      title: "Surga Tepi Tebing Samudra Uluwatu",
      text: "Villa mewah di atas tebing Uluwatu yang dirancang dengan perpaduan arsitektur vernakular Bali dan kemewahan kontemporer. Membawa pemandangan sunset Samudra Hindia langsung ke dalam ruang keluarga Anda.",
      highlights: [
        "Kolam renang infinity melayang di tebing",
        "Batu paras jogja & kayu ulin tahan cuaca pantai",
        "Potensi return sewa investasi tinggi",
      ],
    },
    facilities: [
      { icon: "Waves", name: "Cliffside Infinity Pool", desc: "Kolam renang 20m yang menyatu dengan horison samudera." },
      { icon: "Sparkles", name: "Open-air Sunset Lounge", desc: "Lounge terbuka untuk menikmati matahari terbenam." },
    ],
    locationDetails: {
      mapTitle: "Tebing Uluwatu, Bali",
      nearbyPlaces: [
        { name: "Single Fin Uluwatu", time: "3 Menit" },
        { name: "Pantai Padang Padang", time: "6 Menit" },
        { name: "Bandara Internasional I Gusti Ngurah Rai", time: "35 Menit" },
      ],
    },
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProperties(currentId: string, limit = 3): Property[] {
  return PROPERTIES.filter((p) => p.id !== currentId).slice(0, limit);
}
