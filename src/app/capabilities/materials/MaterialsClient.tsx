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
  Boxes,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function MaterialsClient() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const division03 = divisionFacts.list[2];

  const packages = [
    {
      title: locale === "en" ? "Compliance with Specifications" : "الامتثال للمواصفات",
      desc:
        locale === "en"
          ? "Rigorous verification ensuring all supplied materials strictly adhere to client, architectural, and structural project specifications."
          : "تدقيق صارم يضمن تطابق كافة المواد الموردة مع المخططات الهندسية والمواصفات المعتمدة للمشروع.",
      specs: [
        locale === "en" ? "Verification against approved project submittals" : "مطابقة العينات مع اعتمادات المشروع المعتمدة",
        locale === "en" ? "Manufacturer quality documentation archived" : "توثيق وأرشفة شهادات الجودة الصادرة من المصنع",
        locale === "en" ? "Zero tolerance for non-compliant batch deliveries" : "رفض قاطع لأي توريدات غير مطابقة للاشتراطات",
      ],
    },
    {
      title: locale === "en" ? "Reliable Sourcing" : "مصادر توريد موثوقة",
      desc:
        locale === "en"
          ? "Established commercial relationships with primary domestic producers and certified suppliers across Saudi Arabia."
          : "علاقات تجارية وثيقة مع كبرى المصانع الوطنية والمنتجين المعتمدين في المملكة العربية السعودية.",
      specs: [
        locale === "en" ? "Direct supply partnerships with established producers" : "شراكات توريد مباشرة مع مصانع ومنتجين معتمدين",
        locale === "en" ? "Multi-vendor redundancy safeguarding supply continuity" : "تعدد مصادر التوريد لضمان تدفق المواد دون انقطاع",
        locale === "en" ? "Transparent traceability and commercial pricing" : "شفافية تجارية وإمكانية تتبع أصول التوريد",
      ],
    },
    {
      title: locale === "en" ? "Efficient Transportation" : "نقل فعال",
      desc:
        locale === "en"
          ? "Dedicated haulage logistics, heavy tipper fleets, and flatbed transport networks connecting supply sources directly to jobsites."
          : "إدارة لوجستية متطورة، وأساطيل شاحنات نقل ثقيل ومقطورات تربط مصادر المواد بمواقع المشاريع بكفاءة.",
      specs: [
        locale === "en" ? "Modern heavy tippers and flatbed transport trailers" : "أساطيل شاحنات قلاب ومقطورات نقل ثقيل مجهزة",
        locale === "en" ? "Route planning avoiding municipal transit restrictions" : "تخطيط مسارات النقل لتفادي أوقات الحظر المروري",
        locale === "en" ? "Safe load securement and transport hazard mitigation" : "تأمين الحمولات والامتثال لمعايير سلامة الطرق",
      ],
    },
    {
      title: locale === "en" ? "On-Time Delivery to Site" : "التسليم في الوقت المحدد للموقع",
      desc:
        locale === "en"
          ? "Coordinated delivery scheduling timed precisely to match contractor pouring schedules and daily site installation sequences."
          : "جدولة تسليم منضبطة تتزامن بدقة مع مراحل الصب وجداول التركيب اليومية لفرق العمل في الموقع.",
      specs: [
        locale === "en" ? "Direct synchronization with site pour calendars" : "تزامن مباشر مع جداول الصب والتركيب بالموقع",
        locale === "en" ? "Staged laydown drops minimizing jobsite congestion" : "تفريغ منظم في ساحات التشوين يمنع تكدس الآليات",
        locale === "en" ? "Expedited emergency top-up delivery capacity" : "جاهزية استثنائية للتوريدات العاجلة والتعويضية",
      ],
    },
    {
      title: locale === "en" ? "Project-Specific Material Requirements" : "متطلبات المواد المحددة للمشروع",
      desc:
        locale === "en"
          ? "Tailored material procurement catering to distinct infrastructure, industrial, commercial, and utility scope requirements."
          : "توفير حلول مواد مخصصة تلبي الاحتياجات المحددة لمشاريع البنية التحتية، والصناعة، والمرافق العامة.",
      specs: [
        locale === "en" ? "Specialized material packages per bill of quantities (BOQ)" : "حزم مواد متخصصة ومطابقة لجداول الكميات (BOQ)",
        locale === "en" ? "Custom dimensioning and batch sizing support" : "تجهيز الكميات والأبعاد طبقاً لمتطلبات المهندس المشرف",
        locale === "en" ? "Full material submittal and catalog archiving" : "أرشفة شاملة لملفات الاعتماد وكتالوجات المواد",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? division03.titleEn : division03.titleAr}
          subtitle={locale === "en" ? division03.scopeSummaryEn : division03.scopeSummaryAr}
          badge={locale === "en" ? "DIVISION 03 // CONSTRUCTION MATERIALS" : "القطاع 03 // توريد مواد البناء"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: locale === "en" ? division03.titleEn : division03.titleAr },
          ]}
          imageSrc="/images/content/materials.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "MATERIALS SUPPLY CHAIN" : "سلاسل إمداد مواد البناء"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Reliable Sourcing & Specification-Compliant Material Supply"
                    : "توريد موثوق ونقل فعال لمواد البناء المطابقة للمواصفات"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Aevoryn's Construction Materials Supply division supports contracting and infrastructure projects with dependable material delivery. We bridge the gap between primary producers and active jobsites by ensuring rigorous compliance with specifications, reliable sourcing, efficient transportation, and on-time delivery."
                      : "يدعم قطاع توريد مواد البناء في ايفورين مشاريع المقاولات والبنية التحتية بالتوريد الموثوق والمنضبط. نحن نربط بين كبرى المصانع ومواقع العمل الميدانية من خلال ضمان الامتثال التام للمواصفات، ومصادر التوريد الموثوقة، والنقل الفعال، والتسليم في المواعيد المحددة."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Governed by ISO 9001:2015 quality frameworks, our logistics operations safeguard project velocity by eliminating material-related site downtime and rejected shipments."
                      : "وفقاً لأنظمة إدارة الجودة المعتمدة بموجب ISO 9001:2015، تسهم عملياتنا اللوجستية في حماية المسار الزمني للمشاريع وتفادي أي توقفات أو شحنات غير مطابقة."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Request Materials Quotation" : "طلب عرض سعر توريد مواد"}
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
                    src="/images/content/materials.jpg"
                    alt="Construction Materials Logistics"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-neutral-700 bg-neutral-900/95 rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "QUALITY-MANAGED SUPPLY" : "توريد مُدار وفق معايير الجودة"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      ISO 9001:2015 certified material supply, specification compliance, and delivery logistics.
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
                {locale === "en" ? "Core Materials Capabilities" : "القدرات الرئيسية لتوريد مواد البناء"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Specification-compliant supply structured across the five verified capability points from our corporate profile."
                  : "خدمات توريد مواد مطابقة للمواصفات قائمة على النقاط الخمس المعتمدة رسمياً في ملف الشركة."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      {item.specs.map((sk, sIdx) => (
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
