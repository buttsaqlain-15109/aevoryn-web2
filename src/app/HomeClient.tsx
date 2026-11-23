"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { GlobeHero } from "@/components/hero/GlobeHero";
import { EditorialIntroSection } from "@/components/statistics/EditorialIntroSection";
import { ServicesScrollSection } from "@/components/services/ServicesScrollSection";
import { QhseCertificationsSection } from "@/components/certifications/QhseCertificationsSection";
import { AramcoSection } from "@/components/aramco/AramcoSection";
import { ClientsSection } from "@/components/clients/ClientsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { ContactFooterSection } from "@/components/contact/ContactFooterSection";
import { Footer } from "@/components/Footer";
import { RFQModal } from "@/components/RFQModal";

export function HomeClient() {
  const [rfqOpen, setRfqOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        {/* SECTION 01: INDUSTRIAL POSITIONING HERO */}
        <GlobeHero onOpenConsultation={() => setRfqOpen(true)} />

        {/* SECTION 02: COMPANY INTRODUCTION & VERIFIED CAPABILITY HIGHLIGHTS */}
        <EditorialIntroSection />

        {/* SECTION 03: SERVICES SCROLL EXPERIENCE */}
        <div id="capabilities">
          <ServicesScrollSection />
        </div>

        {/* SECTION 04: QHSE & TRIPLE ISO CERTIFICATIONS */}
        <div id="certifications">
          <QhseCertificationsSection />
        </div>

        {/* SECTION 05: SAUDI ARAMCO SUPPLIER REGISTRATION */}
        <div id="aramco">
          <AramcoSection />
        </div>

        {/* SECTION 06: CLIENTS & COLLABORATIONS */}
        <div id="clients">
          <ClientsSection />
        </div>

        {/* SECTION 07: VERIFIED TESTIMONIALS (Hidden when empty) */}
        <TestimonialsSection />

        {/* SECTION 08: CONTACT & DIRECT ESTIMATION */}
        <div id="contact">
          <ContactFooterSection />
        </div>
      </main>

      <Footer />
      <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </div>
  );
}
