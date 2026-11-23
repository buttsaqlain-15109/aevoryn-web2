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

export default function InfrastructureClient() {
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
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("capabilities.items.0.title")}
          subtitle={t("capabilities.items.0.subtitle")}
          badge={locale === "en" ? "DIVISION 01 // HEAVY CIVIL SUPPORT" : "القطاع 01 // دعم الهندسة المدنية"}
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
                <span className="badge-tech inline-block">
                  {locale === "en" ? "INFRASTRUCTURE CAPABILITY" : "قدرات البنية التحتية"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Precision Site Preparation & Civil Logistics Across Saudi Arabia"
                    : "تجهيز المواقع واللوجستيات المدنية الدقيقة في كافة أنحاء المملكة"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
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
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Request Civil Support Quotation" : "طلب عرض سعر للأعمال المدنية"}
                  </button>
                  <Link
                    href="/contact"
                    className="btn-outline"
                  >
                    {t("hero.contactBtn")}
                  </Link>
                </div>
              </div>

              {/* Right Media Box */}
              <div className="lg:col-span-5">
                <div className="relative h-96 border border-hairline bg-page rounded-2xl overflow-hidden shadow-subtle">
                  <Image
                    src="/images/content/infrastructure.jpg"
                    alt="Civil Infrastructure Project"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-neutral-700 bg-neutral-900/95 rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "FULL QUALITY CONTROL REGIME" : "مراقبة جودة ميدانية شاملة"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      ISO 9001:2015 certified compaction and site preparation inspection regime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Scope Breakdown */}
        <section className="section-padding bg-page border-t border-hairline">
          <div className="site-container">
            <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
              <span className="badge-tech inline-block">
                {locale === "en" ? "SPECIALIZED WORK PACKAGES" : "حزم الأعمال التخصصية"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Specialized Civil Execution Scope" : "نطاق تنفيذ الأعمال المدنية التخصصية"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Explore the critical civil and earthworks services executed by Aevoryn field teams."
                  : "استكشف حزمة خدمات الأعمال المدنية والترابية التي تنفذها فرق إيفورين الميدانية."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-hairline bg-surface rounded-2xl flex flex-col justify-between space-y-6 hover:border-brand-cobalt transition-all duration-200 shadow-subtle hover:shadow-card-hover"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-brand-cobalt font-bold">
                        SERVICE // 0{idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-cobalt" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hairline space-y-2">
                    <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-muted block">
                      {locale === "en" ? "TECHNICAL COMPLIANCE STANDARDS:" : "معايير الامتثال الفني:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-secondary font-body">
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
