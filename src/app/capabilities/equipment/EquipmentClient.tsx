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
  Truck,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Gauge,
  Clock,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "lucide-react";

export default function EquipmentClient() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const fleet = [
    {
      type: locale === "en" ? "Earthmoving & Bulk Excavation Fleet" : "أسطول تحريك التربة والحفريات الكبرى",
      desc:
        locale === "en"
          ? "Crawler excavators (20T-50T), wheel loaders (CAT 950-966), articulated dump trucks, motor graders with GPS grading, and track dozers (D8R/D9R)."
          : "حفارات جنزير (20-50 طن)، وشيولات كوماتسو وكاتربيلر (CAT 950-966)، وجليدرات تسوية موجهة، وجرافات دوسر (D8R/D9R).",
      specs: ["Pre-mobilization certified inspection", "TUV / Saudi driving licensed operators", "Telemetry machine health tracking"],
    },
    {
      type: locale === "en" ? "Heavy Lifting & Crane Fleets" : "أسطول الرافعات المتنقلة ومعدات الرفع الثقيل",
      desc:
        locale === "en"
          ? "All-terrain mobile telescopic cranes (50T to 250T capacity), rough terrain cranes, boom trucks (10T-15T), and telehandlers."
          : "رافعات تلسكوبية متنقلة لكافة التضاريس (حمولة 50 إلى 250 طن)، وشاحنات بوم ترك (10-15 طن)، ومناولات تلسكوبية.",
      specs: ["Valid 3rd-party load test certification", "Certified Aramco riggers available", "Detailed lift planning & wind limit controls"],
    },
    {
      type: locale === "en" ? "Compaction & Road Construction Equipment" : "معدات دمك التربة وإنشاء الطرق والأسفلت",
      desc:
        locale === "en"
          ? "Single drum vibratory soil compactors (10T-16T), padfoot rollers, tandem asphalt rollers, and pneumatic multi-wheel rollers."
          : "مداحل اهتزازية أحادية الأسطوانة للتربة (10-16 طن)، ومداحل شيبس فوت، ومداحل أسفلت ترادفية ومطاطية لدمك الطبقات.",
      specs: ["Compaction meter & vibration audits", "Full lighting for night shift works", "Regular hydraulic fluid analysis"],
    },
    {
      type: locale === "en" ? "Site Utilities, Power & Lighting" : "مولدات الطاقة المؤقتة وأبراج الإنارة والضواغط",
      desc:
        locale === "en"
          ? "Heavy-duty silent diesel generators (50 kVA to 1000 kVA), mobile LED lighting towers, industrial screw air compressors, and water tankers."
          : "مولدات ديزل عازلة للصوت (من 50 إلى 1000 ك.ف.أ)، وأبراج إنارة هيدروليكية LED، وضواغط هواء صناعية، وصهاريج مياه.",
      specs: ["Synchronized multi-generator packages", "Fuel delivery & maintenance contracts", "Rapid replacement on-site guarantee"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("capabilities.items.3.title")}
          subtitle={t("capabilities.items.3.subtitle")}
          badge={locale === "en" ? "DIVISION 04 // HEAVY PLANT & MACHINERY" : "القطاع 04 // الآليات والمعدات الثقيلة"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: t("capabilities.items.3.title") },
          ]}
          imageSrc="/images/content/equipment.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "HEAVY EQUIPMENT FLEET" : "حلول أساطيل المعدات الثقيلة"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Modern Plant Fleets with Uptime Guarantee & Certified Operators"
                    : "أسطول معدات حديث مع ضمان الجاهزية التشغيلية ومشغلين معتمدين"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Aevoryn's Equipment Supply & Rental division delivers heavy machinery solutions engineered for maximum site productivity. We understand that equipment breakdowns halt entire critical path timelines, which is why our plant fleet is maintained under strict preventive service regimens and monitored with telematics."
                      : "يقدم قطاع توريد وتأجير المعدات في إيفورين حلول آليات ثقيلة مصممة لتحقيق أقصى درجات الإنتاجية الميدانية. نحن ندرك تماماً أن تعطل أي معدة قد يوقف مسار المشروع الحرج بأكمله؛ لذا يخضع أسطولنا لبرامج صيانة وقائية صارمة وأنظمة تتبع حديثة."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Available on dry or wet lease (with certified operators and third-party inspection certificates), our earthmovers, telescopic cranes, rollers, and power generators are ready for deployment across all regions of Saudi Arabia on flexible short-term and multi-year project contracts."
                      : "تتوفر معداتنا بنظامي التأجير الجاف أو الشامل (مع مشغلين معتمدين وشهادات فحص سارية من جهات ثالثة)، وتشمل معدات الحفر، والرافعات التلسكوبية، والمداحل، ومولدات الطاقة، مع جاهزية كاملة للحشد لكافة مناطق المملكة بعقود مرنة."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Request Equipment Rental Rates" : "طلب أسعار استئجار المعدات"}
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
                    alt="Modern Heavy Earthmoving Excavator"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-neutral-700 bg-neutral-900/95 rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "PREVENTIVE MAINTENANCE & RAPID RESPONSE" : "صيانة وقائية صارمة وضمان الجاهزية"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      Mobile maintenance service trucks and certified mechanics on call 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Breakdown */}
        <section className="section-padding bg-page border-t border-hairline">
          <div className="site-container">
            <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
              <span className="badge-tech inline-block">
                {locale === "en" ? "MACHINERY ROSTER" : "أصناف الأسطول"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Equipment Fleet Classifications" : "تصنيفات وفئات أسطول المعدات"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Explore our heavy machinery, lifting equipment, road building, and temporary site power assets."
                  : "استكشف أسطولنا من آليات الحفر ومعدات الرفع وإنشاء الطرق ومولدات الطاقة المؤقتة."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fleet.map((fl, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-hairline bg-surface rounded-2xl flex flex-col justify-between space-y-6 hover:border-brand-cobalt transition-all duration-200 shadow-subtle hover:shadow-card-hover"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-brand-cobalt font-bold">
                        FLEET // 0{idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-cobalt" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-primary">
                      {fl.type}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                      {fl.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hairline space-y-2">
                    <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-muted block">
                      {locale === "en" ? "FLEET QUALITY STANDARDS:" : "معايير جاهزية الأسطول:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-secondary font-body">
                      {fl.specs.map((sp, sIdx) => (
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

        <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
      </main>
      <Footer />
    </div>
  );
}
