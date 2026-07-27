"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ResidencesSection from "@/components/ResidencesSection";
import FooterSection from "@/components/FooterSection";
import TalkModal from "@/components/TalkModal";

export default function Home() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [selectedPropertyForInquire, setSelectedPropertyForInquire] = useState<string | undefined>(undefined);

  const handleInquireProperty = (propertyTitle?: string) => {
    setSelectedPropertyForInquire(propertyTitle);
    setIsTalkModalOpen(true);
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <Header onTalkClick={() => handleInquireProperty()} />

      {/* Main Apartment Listing Section */}
      <ResidencesSection onTalkClick={() => handleInquireProperty()} />

      {/* Footer */}
      <FooterSection onTalkClick={() => handleInquireProperty()} />

      {/* Interactive Consultation / Inquiry Modal */}
      <TalkModal
        isOpen={isTalkModalOpen}
        onClose={() => {
          setIsTalkModalOpen(false);
          setSelectedPropertyForInquire(undefined);
        }}
        prefilledProperty={selectedPropertyForInquire}
      />
    </main>
  );
}
