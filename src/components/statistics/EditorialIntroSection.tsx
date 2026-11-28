"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Layers, ShieldCheck, Award, MapPin } from "lucide-react";

export function EditorialIntroSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const capabilityHighlights = [
    {
      num: "01",
      title: locale === "en" ? "Four Core Divisions" : "أربعة قطاعات رئيسية",
      desc:
        locale === "en"
          ? "Synchronized delivery across infrastructure, certified workforce, construction materials, and heavy equipment."
          : "تنفيذ متكامل يجمع بين البنية التحتية، والكوادر البشرية، وتوريد المواد، وتأجير الآليات الثقيلة.",
      icon: Layers,
    },
    {
      num: "02",
      title: locale === "en" ? "Triple ISO Certified" : "ثلاث شهادات آيزو معتمدة",
      desc:
        locale === "en"
          ? "Independently audited management systems for Quality (9001), Environment (14001), and Occupational Safety (45001)."
          : "أنظمة إدارة مدققة ومستوفية للمعايير الدولية للجودة (9001)، والبيئة (14001)، والسلامة المهنية (45001).",
      icon: Award,
    },
    {
      num: "03",
      title: locale === "en" ? "Saudi Aramco Registered" : "مسجل لدى أرامكو السعودية",
      desc:
        locale === "en"
          ? "Active qualification in the Saudi Aramco Supplier Management System under Vendor Code 10120422 as a verified Service Provider."
          : "تأهيل سارٍ في نظام إدارة الموردين لدى أرامكو السعودية برمز مورد 10120422 كمزود خدمات معتمد.",
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: locale === "en" ? "Saudi-Based Operations" : "عمليات وطنية بالمملكة",
      desc:
        locale === "en"
          ? "Operating under commercial registration CR 7054401679 with official facility in Baish and project deployment capabilities across project sites."
          : "نعمل بموجب سجل تجاري رقم 7054401679 مع منشأة رسمية مسجلة في بيش وجاهزية تشغيلية لتغطية المشاريع في مختلف مواقع العمل.",
      icon: MapPin,
    },
  ];

  return (
    <section className="section-padding bg-page hairline-y relative">
      <div className="site-container">
        {/* Section Overline */}
        <div className="flex items-center justify-between pb-6 hairline-b mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-cobalt-accent" />
            <span className="label-tech text-secondary text-[11px]">
              {locale === "en" ? "CORPORATE OVERVIEW // INSTITUTIONAL CAPABILITY" : "نبذة عامة // القدرات المؤسسية"}
            </span>
          </div>
          <span className="label-tech text-muted text-[11px] hidden sm:inline">
            KINGDOM OF SAUDI ARABIA
          </span>
        </div>

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Condensed Headline + Large Industrial Photo */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-h2 text-primary font-display leading-[1.02] tracking-tight">
              {locale === "en" ? (
                <>
                  WE BUILD<br />
                  WITH PURPOSE.<br />
                  WE DELIVER<br />
                  WITH PRECISION.
                </>
              ) : (
                <>
                  نبني<br />
                  بغايات راسخة.<br />
                  وننفذ<br />
                  بدقة متناهية.
                </>
              )}
            </h2>

            {/* Industrial Photograph with Refined Frame */}
            <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden rounded-xl border border-hairline bg-subtle group shadow-card">
              <Image
                src="/images/content/about-hero.jpg"
                alt="Aevoryn Civil and Industrial Infrastructure Operations in Saudi Arabia"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover filter contrast-[1.05] grayscale-[15%] group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              {/* Technical Photo Metadata Strip */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-surface border-t border-hairline flex items-center justify-between text-xs">
                <span className="label-tech text-primary text-[11px]">CIVIL & INDUSTRIAL CAPABILITY</span>
                <span className="label-tech text-primary font-bold text-[11px]">ISO 9001:2015 CERTIFIED</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy & Capability Highlights */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 body-large text-secondary">
              <p className="text-primary font-medium text-lg lg:text-xl leading-relaxed">
                {locale === "en"
                  ? "Aevoryn Services & Contracting Co. operates as a strategic execution and logistics partner for prime engineering, procurement, and construction leaders across Saudi Arabia."
                  : "تعمل شركة إيفورين للخدمات والمقاولات كشريك تنفيذي ولوجستي استراتيجي لكبرى شركات الهندسة والمقاولات والمشاريع الكبرى في المملكة العربية السعودية."}
              </p>
              <p>
                {locale === "en"
                  ? "We solve core operational bottlenecks on civil and energy jobsites by coordinating project support, mobilizing compliant workforce disciplines, supplying verified construction materials, and deploying maintained plant fleets."
                  : "نتولى إزالة العقبات الميدانية واللوجستية في مواقع المشاريع من خلال التنسيق التشغيلي، وتوفير الكوادر المهنية المؤهلة، وتوريد مواد البناء المعتمدة، وتشغيل أساطيل الآليات والمعدات."}
              </p>
            </div>

            {/* 4 Capability Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {capabilityHighlights.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-hairline bg-surface hover:border-cobalt-accent shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="label-tech text-cobalt-accent text-xs">{cap.num}</span>
                        <div className="w-8 h-8 rounded-lg bg-wash flex items-center justify-center text-cobalt-accent">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-primary tracking-tight">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-secondary leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Link to Corporate About Page */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 label-tech text-cobalt-accent hover:text-cobalt-hover transition-colors group"
              >
                <span>{locale === "en" ? "EXPLORE OUR CORPORATE PROFILE" : "استكشف ملف الشركة المؤسسي"}</span>
                <Arrow className="w-3.5 h-3.5 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
