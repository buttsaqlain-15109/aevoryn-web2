"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { GlobeHero } from "@/components/hero/GlobeHero";
import { EditorialIntroSection } from "@/components/statistics/EditorialIntroSection";
import { ServicesScrollSection } from "@/components/services/ServicesScrollSection";
import { QhseCertificationsSection } from "@/components/certifications/QhseCertificationsSection";
import { AramcoSection } from "@/components/aramco/AramcoSection";
import { ClientsSection } from "@/components/clients/ClientsSection";
import { SupplierCtaSection } from "@/components/portal/SupplierCtaSection";
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
        {/* Industrial Positioning Hero */}
        <GlobeHero onOpenConsultation={() => setRfqOpen(true)} />

        {/* Company Introduction & Capability Highlights */}
        <EditorialIntroSection />

        {/* Core Divisions & Capabilities */}
        <div id="capabilities">
          <ServicesScrollSection />
        </div>

        {/* QHSE & Triple ISO Certifications */}
        <div id="certifications">
          <QhseCertificationsSection />
        </div>

        {/* Saudi Aramco Supplier Registration */}
        <div id="aramco">
          <AramcoSection />
        </div>

        {/* Clients & Collaborations */}
        <div id="clients">
          <ClientsSection />
        </div>

        {/* Supplier Intake & Documents Portal */}
        <SupplierCtaSection />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* Contact & Direct Estimation */}
        <div id="contact">
          <ContactFooterSection />
        </div>
      </main>

      <Footer />
      <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </div>
  );
}
