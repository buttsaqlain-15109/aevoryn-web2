"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { CinematicHero } from "@/components/CinematicHero";
import { IntroSection } from "@/components/IntroSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ProjectSupportSection } from "@/components/ProjectSupportSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { AramcoSection } from "@/components/AramcoSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ValuesSection } from "@/components/ValuesSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { RFQModal } from "@/components/RFQModal";

export default function HomePage() {
  const [rfqOpen, setRfqOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <CinematicHero onOpenConsultation={() => setRfqOpen(true)} />
        <IntroSection />
        <CapabilitiesSection />
        <ProjectSupportSection />
        <WhyChooseSection />
        <CertificationsSection />
        <AramcoSection />
        <ClientsSection />
        <ValuesSection />
        <CtaSection />
      </main>
      <Footer />
      <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </div>
  );
}
