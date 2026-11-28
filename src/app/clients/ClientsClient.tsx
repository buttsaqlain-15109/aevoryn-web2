"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ClientsSection } from "@/components/clients/ClientsSection";
import { CtaSection } from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import {
  Handshake,
  Building2,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

export default function ClientsClient() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("clients.headline")}
          subtitle={t("clients.subheadline")}
          badge={locale === "en" ? "STRATEGIC INDUSTRIAL COLLABORATIONS" : "شراكات وتعاونات صناعية استراتيجية"}
          breadcrumbs={[{ label: t("nav.clients") }]}
          imageSrc="/images/content/clients-hero.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface border-b border-hairline">
          <div className="site-container max-w-[900px] text-center space-y-4">
            <span className="badge-tech inline-block">
              {locale === "en" ? "PARTNERSHIP PHILOSOPHY" : "فلسفة الشراكة والتعاون"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
              {locale === "en"
                ? "General Contractors & Industrial Partners"
                : "شركاؤنا من شركات المقاولات العامة والمجموعات الصناعية"}
            </h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-2xl mx-auto font-body">
              {locale === "en"
                ? "Aevoryn builds durable, contractually transparent relationships with prime contractors, general contractors, and developers across the Kingdom. By providing verified manpower, robust heavy machinery, and quality construction materials, we assist our partners in overcoming critical project milestones."
                : "تبني إيفورين علاقات وثيقة وشفافة مع المقاولين الرئيسيين والمطورين الإنشائيين في كافة مناطق المملكة. ومن خلال توفير الكوادر المؤهلة والآليات الثقيلة ومواد البناء المعتمدة، نساعد شركاءنا على إنجاز مراحل المشاريع الحرجة بكفاءة تامة."}
            </p>
          </div>
        </section>

        {/* Clients Cards Showcase */}
        <ClientsSection />

        {/* CTA */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
