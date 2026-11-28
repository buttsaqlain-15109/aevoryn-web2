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
  HardHat,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function ManpowerClient() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const division02 = divisionFacts.list[1];

  const packages = [
    {
      title: locale === "en" ? "Skilled & General Labor" : "العمالة الماهرة والعامة",
      desc:
        locale === "en"
          ? "Deployment of tested skilled tradesmen and disciplined general workforce to support civil, electrical, mechanical, and site operations."
          : "توفير العمالة المهنية والحرفية المؤهلة والعمالة العامة لمساندة مختلف الأعمال المدنية والميكانيكية والتشغيلية في المواقع.",
      specs: [
        locale === "en" ? "Trade competency verification prior to deployment" : "التحقق من الكفاءة والمهارة المهنية قبل الحشد",
        locale === "en" ? "Civil, mechanical, electrical, and general field personnel" : "كوادر مهنية للأعمال المدنية والميكانيكية والكهربائية",
        locale === "en" ? "Disciplined on-site coordination and task execution" : "انضباط مهني والتزام تام بتنفيذ المهام الميدانية",
      ],
    },
    {
      title: locale === "en" ? "Flexible Staffing" : "توظيف مرن",
      desc:
        locale === "en"
          ? "Tailored staffing arrangements adaptable to seasonal surges, critical-path project milestones, and fluctuating site demands."
          : "حلول تعاقدية وتوظيفية مرنة تتكيف مع متطلبات ضغط العمل، والمراحل الحرجة للمشاريع، والاحتياجات المتغيرة.",
      specs: [
        locale === "en" ? "Short-term milestone and long-term project allocations" : "تخصيص كوادر للمراحل القصيرة أو العقود طويلة الأجل",
        locale === "en" ? "Seamless contract alignment and administrative support" : "إجراءات إدارية ميسرة وتوافق تعاقدي منتظم",
        locale === "en" ? "Rapid workforce replacement and roster adjustments" : "مرونة في استبدال الكوادر وتعديل جداول العمل",
      ],
    },
    {
      title: locale === "en" ? "Scalable Deployment" : "انتشار وتوزيع قابل للتوسع",
      desc:
        locale === "en"
          ? "Dynamic recruitment and mobilization capabilities capable of mobilizing workforce groups to project sites across Saudi Arabia."
          : "قدرة عالية على استقطاب وحشد وتوزيع مجموعات العمل لمواقع المشاريع في مختلف مناطق المملكة العربية السعودية.",
      specs: [
        locale === "en" ? "Mobilization to central, eastern, and southern regions" : "جاهزية حشد للمنطقة الوسطى والشرقية والجنوبية",
        locale === "en" ? "End-to-end transportation and site welfare coordination" : "تنسيق متكامل لنقل وإعاشة وإسكان الكوادر",
        locale === "en" ? "Structured deployment frameworks preventing site delays" : "أطر حشد منظمة تمنع أي تأخير في بدء العمليات",
      ],
    },
    {
      title: locale === "en" ? "Compliance with Project Standards" : "الامتثال لمعايير المشروع",
      desc:
        locale === "en"
          ? "Strict adherence to Saudi Labor Law and project-specific engineering and governance specifications."
          : "الالتزام التام بنظام العمل السعودي وكافة المواصفات والمعايير الهندسية والتنظيمية المحددة للمشروع.",
      specs: [
        locale === "en" ? "100% legal compliance under Saudi Ministry regulations" : "امتثال قانوني كامل لأنظمة وزارة الموارد البشرية",
        locale === "en" ? "Valid medical insurance, Iqama, and documentation" : "سريان التأمين الطبي والإقامات والوثائق الرسمية",
        locale === "en" ? "Adherence to contractor-specific quality benchmarks" : "الالتزام بمعايير الجودة المحددة لكل مشروع",
      ],
    },
    {
      title: locale === "en" ? "Workforce Safety & Supervision" : "سلامة وإشراف القوى العاملة",
      desc:
        locale === "en"
          ? "Field supervision and safety inductions aligned with ISO 45001:2018 standards to maintain a proactive Zero-Harm safety culture."
          : "إشراف ميداني وتدريبات سلامة متوافقة مع معايير ISO 45001:2018 لترسيخ بيئة عمل آمنة وثقافة الوقاية من الحوادث.",
      specs: [
        locale === "en" ? "Experienced site supervisors ensuring safe execution" : "مشرفون ميدانيون لضمان أداء الأعمال بأمان تام",
        locale === "en" ? "Daily toolbox talks and hazard awareness protocols" : "اجتماعات سلامة يومية وتوعية استباقية بالمخاطر",
        locale === "en" ? "Complete personal protective equipment (PPE) compliance" : "التزام كامل بمعدات الوقاية والسلامة الشخصية",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? division02.titleEn : division02.titleAr}
          subtitle={locale === "en" ? division02.scopeSummaryEn : division02.scopeSummaryAr}
          badge={locale === "en" ? "DIVISION 02 // MANPOWER SUPPLY" : "القطاع 02 // توريد القوى العاملة"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: locale === "en" ? division02.titleEn : division02.titleAr },
          ]}
          imageSrc="/images/content/manpower.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "WORKFORCE SOLUTIONS" : "حلول القوى العاملة"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Compliant, Skilled & General Labor Deployment in Saudi Arabia"
                    : "حشد الكوادر المهنية والعمالة المتوافقة في كافة أنحاء المملكة"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Aevoryn's Manpower Supply division delivers reliable workforce solutions for contracting, industrial, and infrastructure operations. We deploy skilled and general labor with a strong emphasis on compliance with project standards, workforce safety, and operational discipline."
                      : "يقدم قطاع توريد القوى العاملة في ايفورين حلول عمالة موثوقة لعمليات المقاولات والمشاريع الصناعية والتنموية. نحن نقوم بحشد الكوادر المهنية والعمالة العامة مع التركيز التام على الامتثال لمعايير المشروع، وسلامة العمال، والانضباط التشغيلي."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Operating under audited management frameworks certified under ISO 9001 and ISO 45001, we ensure full alignment with Saudi labor regulations, transparent onboarding, and proactive on-site supervision."
                      : "وفقاً لأنظمة إدارة الجودة والسلامة المعتمدة (ISO 9001 وISO 45001)، نضمن التوافق التام مع أنظمة العمل السعودية، وسلاسة الإجراءات الإدارية، والإشراف الميداني الفعال."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Mobilize Manpower Now" : "طلب حشد كوادر للمشروع"}
                  </button>
                  <Link
                    href="/contact"
                    className="btn-outline"
                  >
                    {t("hero.contactBtn")}
                  </Link>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-5">
                <div className="relative h-96 border border-hairline bg-page rounded-2xl overflow-hidden shadow-subtle">
                  <Image
                    src="/images/content/manpower.jpg"
                    alt="Manpower Supply Workforce"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-neutral-700 bg-neutral-900/95 rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "REGULATORY & SAFETY COMPLIANT" : "التزام تنظيمي ومعايير سلامة"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      Full adherence to Saudi labor regulations and ISO 45001:2018 safety standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Five Profile Facets Grid */}
        <section className="section-padding bg-page border-t border-hairline">
          <div className="site-container">
            <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
              <span className="badge-tech inline-block">
                {locale === "en" ? "VERIFIED DIVISION SCOPE" : "نطاق عمل القطاع المعتمد"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Core Workforce Capabilities" : "القدرات الرئيسية لتوريد القوى العاملة"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Disciplined workforce supply structured across the five verified capability points from our corporate profile."
                  : "خدمات توريد قوى عاملة منضبطة قائمة على النقاط الخمس المعتمدة رسمياً في ملف الشركة."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((cat, idx) => (
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
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hairline space-y-2">
                    <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-muted block">
                      {locale === "en" ? "OPERATIONAL MEASURES:" : "التدابير التشغيلية:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-secondary font-body">
                      {cat.specs.map((sk, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{sk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
      </main>
      <Footer />
    </div>
  );
}
