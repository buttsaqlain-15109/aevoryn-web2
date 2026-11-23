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
  Layers,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Boxes,
} from "lucide-react";

export default function MaterialsPage() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  const materials = [
    {
      name: locale === "en" ? "Aggregates, Road Base & Structural Fill" : "الركام والبحص وطبقات التأسيس والردم الإنشائي",
      desc:
        locale === "en"
          ? "Certified limestone aggregates, crushed stone, subbase Class A & B, marl fill, and washed sand complying with MOT and SASO standards."
          : "ركام جيري معتمد، وحجر مكسر، وطبقات بيس كورس (Subbase) من الفئتين A وB، ومارل الردم، ورمل مغسول مطابق لمواصفات وزارة النقل وهيئة المواصفات.",
      specs: ["Quarry sieve analysis & Proctor testing", "Zero organic impurities", "Bulk tipper delivery fleets"],
    },
    {
      name: locale === "en" ? "Deformed Rebar & Structural Steel" : "حديد التسليح عالي المقاومة والهياكل الفولاذية",
      desc:
        locale === "en"
          ? "High-yield deformed steel rebar (Grade 60), structural steel beams, hollow sections, angles, and welded wire fabric with full mill certificates."
          : "حديد تسليح مشوه عالي الإجهاد (Grade 60)، قطاعات فولاذية إنشائية (Beams, Angles)، وشبك حديد ملحوم مع شهادات فحص المصنع الأصلية (MTC).",
      specs: ["ASTM A615 / SASO 2/1992 compliant", "Cut-and-bend schedule support", "Traceable heat batch certification"],
    },
    {
      name: locale === "en" ? "Industrial Piping, Valves & Fittings" : "الأنابيب الصناعية والصمامات ومستلزمات التمديدات",
      desc:
        locale === "en"
          ? "HDPE pressure pipes, UPVC drainage systems, ductile iron conduits, industrial gate/check valves, and electrofusion fittings."
          : "أنابيب بولي إيثيلين عالي الكثافة (HDPE)، وأنظمة UPVC للصرف، وأنابيب حديد دكتايل، وصمامات تحكم، ومستلزمات اللحام الحراري.",
      specs: ["Pressure rated PN10 to PN25", "Aramco-compliant pipe markings", "Complete hydrostatic test documentation"],
    },
    {
      name: locale === "en" ? "Geotextiles, Membranes & Site PPE" : "المنسوجات الأرضية وعوازل التسرب ومعدات السلامة",
      desc:
        locale === "en"
          ? "Non-woven geotextile separation fabrics, HDPE geomembranes, bitumen waterproofing sheets, safety barriers, and certified personal PPE."
          : "أقمشة جيوتكستايل غير منسوجة للفصل والترشيح، وأغشية جيوممبرين HDPE، ولفائف عزل مائي، وحواجز أمان، ومعدات حماية شخصية معتمدة.",
      specs: ["UV resistant formulations", "Tensile strength test verification", "Turnkey site logistics delivery"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("capabilities.items.2.title")}
          subtitle={t("capabilities.items.2.subtitle")}
          badge={locale === "en" ? "DIVISION 03 // CERTIFIED SUPPLY CHAIN" : "القطاع 03 // سلاسل إمداد المواد المعتمدة"}
          breadcrumbs={[
            { label: t("nav.capabilities"), href: "/#capabilities" },
            { label: t("capabilities.items.2.title") },
          ]}
          imageSrc="/images/content/materials.jpg"
        />

        {/* Overview Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "MATERIAL SUPPLY & LOGISTICS" : "اللوجستيات المباشرة لمواد البناء"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Verified Raw & Finished Materials for Demanding Projects"
                    : "مواد بناء خام ومصنعة مفحوصة ومطابقة لأعلى المواصفات"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "Aevoryn's Materials Supply division coordinates reliable procurement and bulk logistics of tested construction materials across the Kingdom. We bridge the gap between accredited manufacturers, quarries, and demanding jobsites by delivering materials verified against ASTM, SASO, and client-specific engineering requirements."
                      : "ينظم قطاع توريد مواد البناء في إيفورين سلاسل إمداد موثوقة وشحنات كبرى لمواد البناء المفحوصة عبر كافة أرجاء المملكة. نحن نسد الفجوة بين المصانع والمحاجر المعتمدة ومواقع العمل الدقيقة من خلال توريد مواد مفحوصة ومطابقة لمواصفات ASTM وهيئة المواصفات والمقاييس (SASO) ومتطلبات العملاء الهندسية."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Every consignment is accompanied by certified mill test certificates (MTC), sieve analysis, or third-party laboratory verification, ensuring that materials achieve immediate site approval with zero delay to your pouring and installation schedules."
                      : "ترفق كافة الإرساليات بشهادات فحص المنشأ الأصلية (MTC)، وتحليلات التدرج الحبيبي، وفحوصات المختبرات المستقلة المعتمدة، بما يضمن سرعة الاعتماد الميداني من استشاري المشروع دون أي تأخير في جداول الصب والتركيب."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="btn-cobalt"
                  >
                    {locale === "en" ? "Request Materials Price Schedule" : "طلب جدول أسعار توريد المواد"}
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
                    alt="Construction Materials & Steel Fabrication"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-white/20 bg-black/75 backdrop-blur-md rounded-xl">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "BATCH TRACEABILITY GUARANTEED" : "تتبع كامل لعينات ودفعات التوريد"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      Complete mill test certificates and lab compliance logs archived for every shipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="section-padding bg-page border-t border-hairline">
          <div className="site-container">
            <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
              <span className="badge-tech inline-block">
                {locale === "en" ? "SUPPLY PORTFOLIO" : "قائمة الأصناف"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Primary Material Categories" : "أصناف ومجموعات المواد الرئيسية"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Standardized and custom materials supplied directly to contractors across Riyadh and regional provinces."
                  : "مواد قياسية ومخصصة يتم توريدها مباشرة للمقاولين في الرياض وكافة المناطق."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {materials.map((mat, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-hairline bg-surface rounded-2xl flex flex-col justify-between space-y-6 hover:border-brand-cobalt transition-all duration-200 shadow-subtle hover:shadow-card-hover"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-brand-cobalt font-bold">
                        CATEGORY // 0{idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-cobalt" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-primary">
                      {mat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                      {mat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hairline space-y-2">
                    <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-muted block">
                      {locale === "en" ? "QUALITY & SUPPLY ASSURANCE:" : "معايير الجودة والتوريد:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-secondary font-body">
                      {mat.specs.map((sp, sIdx) => (
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
