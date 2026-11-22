"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { GlobeHero } from "@/components/hero/GlobeHero";
import { HorizonTransition } from "@/components/transitions/HorizonTransition";
import { EditorialIntroSection } from "@/components/statistics/EditorialIntroSection";
import { ServicesScrollSection } from "@/components/services/ServicesScrollSection";
import { QhseCertificationsSection } from "@/components/certifications/QhseCertificationsSection";
import { AramcoSection } from "@/components/aramco/AramcoSection";
import { ClientsSection } from "@/components/clients/ClientsSection";
import { ContactFooterSection } from "@/components/contact/ContactFooterSection";
import { Footer } from "@/components/Footer";
import { RFQModal } from "@/components/RFQModal";

export default function HomePage() {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        {/* SECTION 01 — CINEMATIC GLOBE HERO */}
        <GlobeHero
          onOpenConsultation={() => setRfqOpen(true)}
          scrollProgress={heroScrollProgress}
        />

        {/* SECTION 02 — HORIZON GLOW TRANSITION */}
        <HorizonTransition onProgress={setHeroScrollProgress} />

        {/* SECTION 03 — COMPANY INTRODUCTION & VERIFIED CAPABILITY HIGHLIGHTS */}
        <EditorialIntroSection />

        {/* SECTION 04 — SERVICES SCROLL EXPERIENCE (Sticky Horizontal 5 Cards) */}
        <div id="capabilities">
          <ServicesScrollSection />
        </div>

        {/* SECTION 05 — QHSE & TRIPLE ISO CERTIFICATIONS */}
        <div id="certifications">
          <QhseCertificationsSection />
        </div>

        {/* SECTION 06 — SAUDI ARAMCO SUPPLIER REGISTRATION */}
        <div id="aramco">
          <AramcoSection />
        </div>

        {/* SECTION 07 — CLIENTS & COLLABORATIONS */}
        <div id="clients">
          <ClientsSection />
        </div>

        {/* SECTION 08 — CONTACT & CALL TO ACTION */}
        <div id="contact">
          <ContactFooterSection />
        </div>
      </main>

      <Footer />
      <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </div>
  );
}
