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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("capabilities.items.2.title")}
          subtitle={t("capabilities.items.2.subtitle")}
          badge={locale === "en" ? "Division 03 • Certified Supply Chain" : "القطاع 03 • سلاسل إمداد المواد المعتمدة"}
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
                  <Boxes className="w-3.5 h-3.5" />
                  <span>{locale === "en" ? "Direct Material Logistics" : "اللوجستيات المباشرة لمواد البناء"}</span>
                </div>
                <h2 className="text-h2 text-primary font-bold">
                  {locale === "en"
                    ? "Verified Raw & Finished Materials for Demanding Projects"
                    : "مواد بناء خام ومصنعة مفحوصة ومطابقة لأعلى المواصفات"}
                </h2>
                <div className="space-y-4 body-regular text-secondary">
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
                    className="btn-primary"
                  >
                    {locale === "en" ? "Request Materials Price Schedule" : "طلب جدول أسعار توريد المواد"}
                  </button>
                  <Link
                    href="/contact"
                    className="btn-secondary"
                  >
                    {t("hero.contactBtn")}
                  </Link>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-5">
                <div className="relative h-96 rounded-[16px] overflow-hidden neu-raised p-2">
                  <div className="relative w-full h-full rounded-[12px] overflow-hidden">
                    <Image
                      src="/images/content/materials.jpg"
                      alt="Construction Materials & Steel Fabrication"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[12px] bg-surface/90 backdrop-blur-md border border-subtle shadow-lg">
                      <p className="text-xs font-bold text-primary mb-1">
                        {locale === "en" ? "Batch Traceability Guaranteed" : "تتبع كامل لعينات ودفعات التوريد"}
                      </p>
                      <p className="caption-text text-muted">
                        Complete mill test certificates and lab compliance logs archived for every shipment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="section-padding bg-primary">
          <div className="site-container">
            <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-16">
              <h2 className="text-h2 text-primary font-bold">
                {locale === "en" ? "Primary Material Categories" : "أصناف ومجموعات المواد الرئيسية"}
              </h2>
              <p className="body-large text-secondary mx-auto">
                {locale === "en"
                  ? "Standardized and custom materials supplied directly to contractors across Riyadh and regional provinces."
                  : "مواد قياسية ومخصصة يتم توريدها مباشرة للمقاولين في الرياض وكافة المناطق."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {materials.map((mat, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-[16px] neu-raised skeuo-plate space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[12px] bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm font-mono">
                      0{idx + 1}
                    </div>
                    <h3 className="text-h4 font-bold text-primary tracking-tight">
                      {mat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {mat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-subtle space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                      {locale === "en" ? "Quality & Supply Assurance:" : "معايير الجودة والتوريد:"}
                    </span>
                    <ul className="space-y-1 text-xs text-secondary">
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
