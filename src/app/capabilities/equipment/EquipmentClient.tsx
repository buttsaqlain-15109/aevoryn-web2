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
  Truck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function EquipmentClient() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const division04 = divisionFacts.list[3];

  const packages = [
    {
      type: locale === "en" ? "Cranes for Lifting & Heavy-Duty Operations" : "رافعات لعمليات الرفع والمهام الشاقة",
      desc:
        locale === "en"
          ? "Mobile telescopic cranes, rough terrain units, and boom trucks deployed for precision lifting, structural erection, and equipment staging."
          : "رافعات تلسكوبية متنقلة، وشاحنات بوم ترك مجهزة ومخصصة لعمليات الرفع الدقيقة، وتركيب الهياكل، ومناولة المعدات في المواقع.",
      specs: [
        locale === "en" ? "Precision lifting planning and safety rigging" : "تخطيط دقيق لعمليات الرفع وتدابير سلامة التوجيه",
        locale === "en" ? "Regular load testing and maintenance records" : "فحوصات أحمال وسجلات صيانة دورية موثقة",
        locale === "en" ? "Safe radius and ground stability protocols" : "بروتوكولات أمان لنصف قطر الرفع وثبات الأرضية",
      ],
    },
    {
      type: locale === "en" ? "Construction Machinery for Civil Works" : "آليات ومعدات إنشائية للأعمال المدنية",
      desc:
        locale === "en"
          ? "Modern fleet of excavators, wheel loaders, track dozers, and compactors supporting primary civil contractors across jobsite developments."
          : "أسطول حديث من الحفارات، والشيولات، والبلدوزرات، والمداحل لمساندة مقاولي الأعمال المدنية والإنشائية في مختلف المواقع.",
      specs: [
        locale === "en" ? "Hydraulic crawler excavators and wheel loaders" : "حفارات هيدروليكية وشيولات بمختلف الأحجام",
        locale === "en" ? "Vibratory compaction rollers and dozers" : "مداحل اهتزازية وجرافات للأعمال المدنية",
        locale === "en" ? "Preventive maintenance regimes minimizing downtime" : "برامج صيانة وقائية تحد من توقف العمليات",
      ],
    },
    {
      type: locale === "en" ? "Additional Project-Specific Support Equipment" : "معدات دعم إضافية متخصصة للمشاريع",
      desc:
        locale === "en"
          ? "Auxiliary plant machinery including site power generators, mobile lighting towers, air compressors, and logistical transport units."
          : "معدات ومحطات دعم مساندة تشمل مولدات الطاقة للمواقع، وأبراج الإنارة المتنقلة، وضواغط الهواء، ووحدات النقل المساندة.",
      specs: [
        locale === "en" ? "Heavy-duty diesel power generation packages" : "مولدات ديزل صناعية لتغذية المواقع بالطاقة المؤقتة",
        locale === "en" ? "Mobile LED site illumination towers" : "أبراج إنارة هيدروليكية للعمليات الليلية",
        locale === "en" ? "Industrial air compressors and water distribution" : "ضواغط هواء صناعية ومعدات توزيع مياه للرش والدمك",
      ],
    },
    {
      type: locale === "en" ? "Maintained to High Safety & Performance Standards" : "صيانة وفق أعلى معايير السلامة والأداء",
      desc:
        locale === "en"
          ? "Rigorous technical inspection and preventive servicing frameworks adhering to ISO 9001 and ISO 45001 management systems."
          : "فحوصات فنية صارمة وأطر صيانة وقائية منتظمة متوافقة مع أنظمة إدارة الجودة والسلامة بموجب ISO 9001 وISO 45001.",
      specs: [
        locale === "en" ? "Daily pre-use technical inspection checklists" : "قوائم فحص يومية قبل بدء تشغيل الآليات",
        locale === "en" ? "Certified mechanical maintenance teams" : "فرق صيانة ميكانيكية متخصصة لمعالجة الأعطال",
        locale === "en" ? "Emergency field servicing and rapid support" : "دعم فني ميداني سريع لضمان جاهزية الأسطول",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? division04.titleEn : division04.titleAr}
          subtitle={locale === "en" ? division04.scopeSummaryEn : division04.scopeSummaryAr}
          badge={locale === "en" ? "DIVISION 04 // EQUIPMENT SUPPLY" : "القطاع 04 // توريد المعدات"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: locale === "en" ? division04.titleEn : division04.titleAr },
          ]}
          imageSrc="/images/content/equipment.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "PLANT & MACHINERY" : "الآليات والمعدات"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Cranes & Heavy Plant Maintained to High Operational Standards"
                    : "رافعات وآليات ثقيلة مدارة ومصانة وفق أعلى المعايير التشغيلية"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Aevoryn's Equipment Supply division supports civil, commercial, and industrial contracting projects across Saudi Arabia with dependable plant machinery. We deploy heavy lifting cranes, earthmoving machines, and auxiliary support equipment maintained to strict safety and performance specifications."
                      : "يدعم قطاع توريد المعدات في ايفورين مشاريع المقاولات المدنية والصناعية في مختلف مناطق المملكة بالآليات والمعدات الموثوقة. نحن نوفر رافعات الرفع الثقيل، وآليات تحريك التربة، ومعدات الدعم المساندة المدارة وفق أعلى معايير السلامة والأداء."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Governed by audited ISO 9001 and ISO 45001 management systems, our maintenance regimes ensure equipment reliability and minimize operational interruptions on site."
                      : "وفقاً لأنظمة الإدارة المعتمدة (ISO 9001 وISO 45001)، تضمن برامج الصيانة الدورية لدينا موثوقية المعدات وتحد من أي توقفات تشغيلية في المواقع."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Request Equipment Quotation" : "طلب عرض سعر معدات"}
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
                    src="/images/content/equipment.jpg"
                    alt="Equipment Fleet & Heavy Machinery"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-neutral-700 bg-neutral-900/95 rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "SAFETY & PERFORMANCE GOVERNED" : "معايير سلامة وأداء صارمة"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      Equipment fleet maintained under ISO 9001:2015 and ISO 45001:2018 certified management standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Four Profile Facets Grid */}
        <section className="section-padding bg-page border-t border-hairline">
          <div className="site-container">
            <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
              <span className="badge-tech inline-block">
                {locale === "en" ? "VERIFIED DIVISION SCOPE" : "نطاق عمل القطاع المعتمد"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Core Equipment Capabilities" : "القدرات الرئيسية لأسطول المعدات"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Plant machinery and lifting operations structured across the four verified capability points from our corporate profile."
                  : "خدمات توريد وتشغيل الآليات والرافعات المنظمة وفق النقاط الأربع المعتمدة رسمياً في ملف الشركة."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {item.type}
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
