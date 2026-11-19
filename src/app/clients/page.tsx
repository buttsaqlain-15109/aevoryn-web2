"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ClientsSection } from "@/components/ClientsSection";
import { CtaSection } from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import {
  Handshake,
  Building2,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

export default function ClientsPage() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("clients.headline")}
          subtitle={t("clients.subheadline")}
          badge={locale === "en" ? "Strategic Industrial Collaborations" : "شراكات وتعاونات صناعية استراتيجية"}
          breadcrumbs={[{ label: t("nav.clients") }]}
          imageSrc="/images/content/clients-hero.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container max-w-[1100px] text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
              <Handshake className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "Partnership Philosophy" : "فلسفة الشراكة والتعاون"}</span>
            </div>
            <h2 className="text-h2 text-primary font-bold">
              {locale === "en"
                ? "Trusted by Leading General Contractors & Industrial Groups"
                : "موثوقون من كبرى شركات المقاولات العامة والمجموعات الصناعية"}
            </h2>
            <p className="body-large text-secondary leading-relaxed max-w-[760px] mx-auto">
              {locale === "en"
                ? "Aevoryn builds durable, contractually transparent relationships with prime EPCs, general contractors, and developers across the Kingdom. By providing verified manpower, robust heavy machinery, and quality construction materials, we assist our partners in overcoming critical project milestones."
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
