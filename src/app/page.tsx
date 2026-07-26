"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ScrollExpandImageSection from "@/components/ScrollExpandImageSection";
import ResidencesSection from "@/components/ResidencesSection";
import PhilosophySection from "@/components/PhilosophySection";
import FeaturedPropertySection from "@/components/FeaturedPropertySection";
import LatestPropertySection from "@/components/LatestPropertySection";
import JournalSection from "@/components/JournalSection";
import FooterSection from "@/components/FooterSection";
import TalkModal from "@/components/TalkModal";

export default function Home() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <Header onTalkClick={() => setIsTalkModalOpen(true)} />

      {/* Hero Section */}
      <HeroSection />

      {/* Full-width Muted Video Banner Section (Immediately Below Hero) */}
      <VideoSection />

      {/* Scroll-Driven Expanding Image Showcase */}
      <ScrollExpandImageSection />

      {/* Guiding values editorial section */}
      <PhilosophySection />

      {/* Featured property editorial section */}
      <FeaturedPropertySection />

      {/* Latest Property Showcase & Collaborators */}
      <LatestPropertySection />

      {/* Featured Residences Showcase */}
      <ResidencesSection onTalkClick={() => setIsTalkModalOpen(true)} />

      {/* Journal & Editorial */}
      <JournalSection />

      {/* Footer */}
      <FooterSection onTalkClick={() => setIsTalkModalOpen(true)} />

      {/* Interactive Consultation / Inquiry Modal */}
      <TalkModal isOpen={isTalkModalOpen} onClose={() => setIsTalkModalOpen(false)} />
    </main>
  );
}
