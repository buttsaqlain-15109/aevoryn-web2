"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ValuesSection } from "@/components/ValuesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { CtaSection } from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  AlertTriangle,
  FileCheck2,
  Users2,
  Compass,
} from "lucide-react";

export default function AboutClient() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? "About Aevoryn Services & Contracting Co." : "عن شركة إيفورين للخدمات والمقاولات"}
          subtitle={
            locale === "en"
              ? "A dedicated Saudi contracting and infrastructure support organization delivering operational reliability, certified expertise, and materials across the Kingdom."
              : "منظمة وطنية رائدة في دعم المقاولات والبنية التحتية، تقدم الموثوقية التشغيلية والكوادر المعتمدة وتوريد المواد لكبرى مشاريع المملكة."
          }
          badge={locale === "en" ? "CORPORATE HERITAGE & PROFILE" : "الملف المؤسسي والحوكمة"}
          breadcrumbs={[{ label: t("nav.about") }]}
          imageSrc="/images/content/about-hero.jpg"
        />

        {/* Corporate Profile Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "EXECUTIVE SUMMARY" : "الملخص التنفيذي"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Corporate Structure & Field Operations"
                    : "الهيكل المؤسسي والعمليات الميدانية"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Aevoryn Services & Contracting Co. (CR: 7054401679) was established to fulfill the expanding demand for high-reliability contracting support across Saudi Arabia. Our core mission centers on providing comprehensive infrastructure support solutions that meet the highest standards of quality and safety."
                      : "تأسست شركة إيفورين للخدمات والمقاولات (س.ت: 7054401679) لتلبية الطلب المتزايد على خدمات الدعم الإنشائي والصناعي الموثوق في المملكة العربية السعودية. وتتمحور مهمتنا حول تقديم حلول دعم شاملة للبنية التحتية تلبي أعلى معايير الجودة والسلامة."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Through our four specialized operating divisions: Infrastructure & Project Support, Manpower Supply, Construction Materials Supply, and Heavy Equipment Supply & Rental, we provide a synchronized delivery framework under single-source accountability. We combine deep local procurement relationships with international management standards certified under ISO 9001, ISO 14001, and ISO 45001."
                      : "من خلال قطاعاتنا التشغيلية الأربعة المتخصصة: دعم البنية التحتية، وتوريد القوى العاملة، وتوريد مواد البناء، وتأجير المعدات الثقيلة، نوفر نموذج توريد منسجم تحت مسؤولية موحدة، جامعاً بين سلاسل الإمداد المحلية الموثوقة وأنظمة الإدارة العالمية المعتمدة بشهادات الآيزو 9001 و14001 و45001."}
                  </p>
                </div>

                {/* Key Fact Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-hairline">
                  <div className="p-4 border border-hairline bg-page rounded-xl text-center shadow-sm">
                    <span className="block text-lg sm:text-xl font-bold text-brand-accent font-mono-tech">7054401679</span>
                    <span className="text-[10px] sm:text-xs font-mono-tech text-muted uppercase">CR REGISTRATION</span>
                  </div>
                  <div className="p-4 border border-hairline bg-page rounded-xl text-center shadow-sm">
                    <span className="block text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono-tech">10120422</span>
                    <span className="text-[10px] sm:text-xs font-mono-tech text-muted uppercase">ARAMCO VENDOR</span>
                  </div>
                  <div className="p-4 border border-hairline bg-page rounded-xl text-center col-span-2 sm:col-span-1 shadow-sm">
                    <span className="block text-lg sm:text-xl font-bold text-primary font-mono-tech">ISO TRIPLE</span>
                    <span className="text-[10px] sm:text-xs font-mono-tech text-muted uppercase">QMS / HSE AUDITED</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Image & Address Disclosure */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative h-96 border border-hairline bg-page rounded-2xl overflow-hidden shadow-subtle">
                  <Image
                    src="/images/content/about-hero.jpg"
                    alt="Aevoryn Corporate Infrastructure Operations in Saudi Arabia"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-neutral-700 bg-neutral-900/95 rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "REGISTERED FACILITY LOCATION" : "مقر المنشأة المسجلة"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      Building No. 7140, Zaid Ibn Al Khattab Street, An Nahdah Dist., Zipcode 87311, Baish, Jazan Region
                    </p>
                  </div>
                </div>

                {/* Registered Address Verification Box */}
                <div className="p-5 border border-hairline bg-surface rounded-xl text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-brand-cobalt font-mono-tech">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                    <span>{locale === "en" ? "REGISTERED FACILITY & MOBILIZATION" : "المنشأة المسجلة والجاهزية الميدانية"}</span>
                  </div>
                  <p className="leading-relaxed text-secondary font-body">
                    {locale === "en"
                      ? "Aevoryn Services & Contracting Co. operates from its registered facility in Baish, Jizan Region, supporting industrial and civil projects across project locations."
                      : "تعمل شركة ايفورين للخدمات والمقاولات انطلاقاً من منشأتها المسجلة في بيش بمنطقة جازان، وتدعم المشاريع الصناعية والإنشائية عبر مختلف مواقع العمل بالمملكة."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission & Values */}
        <ValuesSection />

        {/* 8 Strengths */}
        <WhyChooseSection />

        {/* CTA */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
