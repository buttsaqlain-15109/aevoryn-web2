"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { RFQModal } from "@/components/RFQModal";
import { useLanguage } from "@/context/LanguageContext";
import { divisionFacts } from "@/data/company.facts";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function InfrastructureClient() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const division01 = divisionFacts.list[0];

  const packages = [
    {
      title: locale === "en" ? "Operational Coordination" : "التنسيق التشغيلي",
      desc:
        locale === "en"
          ? "Synchronizing field logistics, resource allocation, and daily jobsite execution to keep multi-disciplinary operations aligned with critical schedules."
          : "تنسيق اللوجستيات الميدانية، وتوزيع الموارد، وتسيير العمليات اليومية بما يضمن التوافق التام مع الجداول الزمنية للمشاريع.",
      specs: [
        locale === "en" ? "Daily activity scheduling & interface management" : "جدولة الأنشطة اليومية وإدارة واجهات العمل",
        locale === "en" ? "Single-point site logistics synchronization" : "تزامن الخدمات اللوجستية الميدانية عبر نقطة اتصال موحدة",
        locale === "en" ? "Progress tracking & milestone preservation" : "تتبع الإنجاز وحماية المسار الحرج للمشروع",
      ],
    },
    {
      title: locale === "en" ? "Technical Field Support" : "الدعم الفني الميداني",
      desc:
        locale === "en"
          ? "On-site supervision, methodology reviews, and technical facilitation to resolve practical jobsite challenges swiftly and safely."
          : "الإشراف الميداني، ومراجعة أساليب التنفيذ، وتقديم الدعم الفني لحل التحديات الهندسية الميدانية بسرعة وأمان.",
      specs: [
        locale === "en" ? "Experienced site supervisors & foremen" : "مشرفون ميدانيون ذوو خبرة هندسية عريقة",
        locale === "en" ? "Quality check coordination per project standards" : "تنسيق فحوصات الجودة وفق معايير المشروع",
        locale === "en" ? "Active risk mitigation and hazard awareness" : "إدارة استباقية للمخاطر وتدابير السلامة الميدانية",
      ],
    },
    {
      title: locale === "en" ? "Project Facilitation" : "تسهيل أعمال المشاريع",
      desc:
        locale === "en"
          ? "Expediting access permits, material movement, laydown coordination, and contractor interfaces to maintain continuous project momentum."
          : "تيسير تصاريح العمل، وتسهيل حركة المواد، وتنسيق ساحات التشوين لضمان استمرارية تدفق الأعمال دون انقطاع.",
      specs: [
        locale === "en" ? "Laydown yard and access corridor facilitation" : "تنسيق ساحات التشوين ومسارات الوصول للمواقع",
        locale === "en" ? "Rapid problem resolution with project teams" : "معالجة فورية للمعوقات التشغيلية مع فرق العمل",
        locale === "en" ? "Seamless subcontractor workflow alignment" : "مواءمة دقيقة لمسارات عمل المقاولين والشركاء",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? division01.titleEn : division01.titleAr}
          subtitle={locale === "en" ? division01.scopeSummaryEn : division01.scopeSummaryAr}
          badge={locale === "en" ? "DIVISION 01 // PROJECT DEVELOPMENT SUPPORT" : "القطاع 01 // دعم وتطوير المشاريع"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: locale === "en" ? division01.titleEn : division01.titleAr },
          ]}
          imageSrc="/images/content/infrastructure.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "CORE CAPABILITY" : "قدرات القطاع"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Operational Coordination & Technical Support Across Saudi Arabia"
                    : "التنسيق التشغيلي والدعم الفني الميداني للمشاريع بالمملكة"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Aevoryn's Project Development Support division acts as an operational partner to primary contractors, industrial developers, and project managers. We provide essential field facilitation, operational coordination, and technical support that enable complex project developments to maintain momentum and reach completion safely."
                      : "يعمل قطاع دعم وتطوير المشاريع في ايفورين كشريك تشغيلي للمقاولين الرئيسيين والمطورين الصناعيين. نحن نقدم التنسيق الميداني الحيوي، والتسهيل التشغيلي، والدعم الفني الذي يمكّن المشاريع المعقدة من الحفاظ على وتيرة إنجازها والوصول إلى أهدافها بأمان."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Governed by certified management frameworks (ISO 9001, ISO 14001, and ISO 45001), our teams bridge critical interface gaps on site, ensuring compliance with specifications and strict adherence to project standards."
                      : "وفقاً لأنظمة الإدارة المعتمدة (ISO 9001 وISO 14001 وISO 45001)، تعمل فرقنا على ردم الفجوات التشغيلية في المواقع، بما يضمن الامتثال للمواصفات والالتزام الصارم بمعايير المشروع."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Request Project Support Consultation" : "طلب استشارة لدعم المشاريع"}
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
                    alt="Project Development Support"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-neutral-700 bg-neutral-900/95 rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "AUDITED MANAGEMENT GOVERNANCE" : "حوكمة وإدارة مدققة"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      ISO 9001:2015 certified project support and quality management framework.
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
                {locale === "en" ? "VERIFIED DIVISION SCOPE" : "نطاق عمل القطاع المعتمد"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Three Integrated Support Facets" : "ثلاثة محاور دعم متكاملة"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Operational coordination, technical field support, and project facilitation tailored to Saudi industrial standards."
                  : "التنسيق التشغيلي، والدعم الفني الميداني، وتسهيل أعمال المشاريع وفق المعايير المهنية المعتمدة."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-hairline bg-surface rounded-2xl flex flex-col justify-between space-y-6 hover:border-brand-cobalt transition-all duration-200 shadow-subtle hover:shadow-card-hover"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-brand-cobalt font-bold">
                        FACET // 0{idx + 1}
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
                      {locale === "en" ? "OPERATIONAL MEASURES:" : "التدابير التشغيلية:"}
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
