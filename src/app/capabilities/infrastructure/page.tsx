"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { RFQModal } from "@/components/RFQModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  HardHat,
} from "lucide-react";

export default function InfrastructurePage() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const services = [
    {
      title: locale === "en" ? "Bulk Earthworks & Site Grading" : "الأعمال الترابية وتسوية المواقع الكبرى",
      desc:
        locale === "en"
          ? "Large-scale cut, fill, deep excavation, rock breaking, and laser-guided rough and fine grading tailored for industrial and commercial plots."
          : "أعمال القطع والردم والحفريات العميقة وتكسير الصخور والتسوية الدقيقة الموجهة بالليزر للمخططات الصناعية والتجارية.",
      specs: ["High-volume daily cut/fill capacity", "Laser & GPS survey control", "Compaction testing to 95-98% proctor"],
    },
    {
      title: locale === "en" ? "Underground Utilities & Trenching" : "حفر وتمديد شبكات المرافق والخدمات",
      desc:
        locale === "en"
          ? "Deep trenching, pipe bedding, duct banks, storm water drainage, sewer main installation, and utility protection corridors."
          : "حفريات عميقة، تجهيز فرشة الأنابيب، بنوك الكابلات، تصريف مياه الأمطار، شبكات الصرف الصحي، وحماية مسارات المرافق القائمة.",
      specs: ["Trench shoring & dewatering systems", "SASO / Aramco compliant piping support", "Hydrostatic test assistance"],
    },
    {
      title: locale === "en" ? "Foundation & Substructure Support" : "تجهيز الأساسات والأعمال الإنشائية التحتية",
      desc:
        locale === "en"
          ? "Foundation pit preparation, soil replacement, blinding concrete support, rebar cage placement, and structural backfilling."
          : "تجهيز حفر الأساسات، استبدال التربة، صب الخرسانة العادية (Blinding)، تركيب أقفاص حديد التسليح، والردم الإنشائي الهندسي.",
      specs: ["Structural backfill in 20cm lifts", "Subgrade density verification", "Precast footing placement logistics"],
    },
    {
      title: locale === "en" ? "Logistics & Access Road Construction" : "تمهيد الطرق المؤقتة والمساندة اللوجستية",
      desc:
        locale === "en"
          ? "Heavy-haul temporary access road building, gravel stabilization, detour management, laydown yard surfacing, and site security fencing."
          : "إنشاء وتثبيت طرق الوصول المؤقتة للشاحنات الثقيلة، تثبيت التربة بالبحص، تجهيز ساحات التشوين (Laydown Yards)، والتسييج الأمني.",
      specs: ["Subbase compaction & CBR testing", "Traffic diversion plan implementation", "Industrial yard fencing & gates"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("capabilities.items.0.title")}
          subtitle={t("capabilities.items.0.subtitle")}
          badge={locale === "en" ? "Division 01 • Heavy Civil Support" : "القطاع 01 • دعم الهندسة المدنية"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: t("capabilities.items.0.title") },
          ]}
          imageSrc="/images/content/infrastructure.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{locale === "en" ? "Infrastructure Capability Overview" : "نظرة عامة على قدرات البنية التحتية"}</span>
                </div>
                <h2 className="text-h2 text-primary font-bold">
                  {locale === "en"
                    ? "Precision Site Preparation & Civil Logistics Across Saudi Arabia"
                    : "تجهيز المواقع واللوجستيات المدنية الدقيقة في كافة أنحاء المملكة"}
                </h2>
                <div className="space-y-4 body-regular text-secondary">
                  <p>
                    {locale === "en"
                      ? "Aevoryn's Infrastructure & Project Support division provides the vital groundwork that enables large-scale civil, energy, and commercial developments to proceed without schedule disruption. We act as a trusted operational extension to principal contractors, undertaking heavy earthmoving, site access development, utility corridor trenching, and structural subbase preparation."
                      : "يوفر قطاع دعم البنية التحتية والمشاريع في إيفورين الأساس الميداني الحيوي الذي يتيح تنفيذ مشاريع الهندسة المدنية والطاقة والتطوير العمراني الكبرى دون أي تأخير في الجداول الزمنية. نحن نعمل كذراع تشغيلي مساند للمقاولين الرئيسيين، متولين أعمال تحريك التربة، وتطوير طرق الوصول، وحفريات مسارات المرافق، وتجهيز طبقات التأسيس."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Operating under strict ISO 9001 and ISO 45001 standards, our field teams coordinate equipment deployment, surveyor benchmarks, density testing, and safety zoning to guarantee that handed-over subgrades meet rigorous municipal and client engineering specifications."
                      : "وفقاً لمعايير ISO 9001 وISO 45001 الصارمة، تنسق فرقنا الميدانية حشد الآليات، ونقاط المسح الطبوغرافي، واختبارات الكثافة، ومناطق الأمان لضمان تسليم طبقات التأسيس وفق أعلى المواصفات الهندسية المعتمدة."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-primary"
                  >
                    {locale === "en" ? "Request Civil Support Quotation" : "طلب عرض سعر للأعمال المدنية"}
                  </button>
                  <Link
                    href="/contact"
                    className="btn-secondary"
                  >
                    {t("hero.contactBtn")}
                  </Link>
                </div>
              </div>

              {/* Right Media Box */}
              <div className="lg:col-span-5">
                <div className="relative h-96 rounded-[16px] overflow-hidden neu-raised p-2">
                  <div className="relative w-full h-full rounded-[12px] overflow-hidden">
                    <Image
                      src="/images/content/infrastructure.jpg"
                      alt="Civil Infrastructure Project"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[12px] bg-surface/90 backdrop-blur-md border border-subtle shadow-lg">
                      <p className="text-xs font-bold text-primary mb-1">
                        {locale === "en" ? "Full Field Quality Control" : "مراقبة جودة ميدانية شاملة"}
                      </p>
                      <p className="caption-text text-muted">
                        ISO 9001:2015 certified compaction and site preparation inspection regime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Scope Breakdown */}
        <section className="section-padding bg-primary">
          <div className="site-container">
            <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-16">
              <h2 className="text-h2 text-primary font-bold">
                {locale === "en" ? "Specialized Civil Execution Scope" : "نطاق تنفيذ الأعمال المدنية التخصصية"}
              </h2>
              <p className="body-large text-secondary mx-auto">
                {locale === "en"
                  ? "Explore the critical civil and earthworks services executed by Aevoryn field teams."
                  : "استكشف حزمة خدمات الأعمال المدنية والترابية التي تنفذها فرق إيفورين الميدانية."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl neu-raised skeuo-plate space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm font-mono">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-primary tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-subtle space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                      {locale === "en" ? "Technical Compliance Standards:" : "معايير الامتثال الفني:"}
                    </span>
                    <ul className="space-y-1 text-xs text-secondary">
                      {item.specs.map((sp, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RFQ Modal */}
        <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
      </main>
      <Footer />
    </div>
  );
}
