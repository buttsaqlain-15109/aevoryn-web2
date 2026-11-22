"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldAlert,
  Award,
  Leaf,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  HardHat,
  ThermometerSun,
  HeartPulse,
} from "lucide-react";

export default function QHSEPage() {
  const { t, locale, isRTL } = useLanguage();

  const safetyProtocols = [
    {
      title: locale === "en" ? "Daily Toolbox Talks & JSA" : "اجتماعات السلامة اليومية وتحليل مخاطر العمل (JSA)",
      desc:
        locale === "en"
          ? "Mandatory pre-shift safety briefings assessing specific site hazards, lifting restrictions, and synchronized task controls."
          : "إحاطات سلامة إلزامية يومية قبل بدء العمل لتقييم المخاطر الميدانية، وضوابط الرفع، وتنسيق العمليات المشتركة.",
    },
    {
      title: locale === "en" ? "Heat Stress Management (Saudi Climate)" : "إدارة الإجهاد الحراري وفق اللوائح السعودية",
      desc:
        locale === "en"
          ? "Strict compliance with Ministry of Human Resources summer midday work regulations, shaded hydration stations, and electrolyte replenishment."
          : "التزام تام بقرارات وزارة الموارد البشرية بحظر العمل وقت الظهيرة في الصيف، وتوفير محطات ترطيب مظللة ومشروبات كهرلية.",
    },
    {
      title: locale === "en" ? "100% Certified PPE Enforcement" : "إلزام تام بمعدات الحماية الشخصية المعتمدة",
      desc:
        locale === "en"
          ? "Zero-tolerance enforcement of impact-resistant hardhats, high-visibility reflective apparel, steel-toed boots, and task-specific eye/ear protection."
          : "تطبيق صارم وغير قابل للمساومة لارتداء الخوذ المعتمدة، والسترات العاكسة، وأحذية السلامة الفولاذية، وواقيات العين والسمع.",
    },
    {
      title: locale === "en" ? "Environmental Protection & Waste Segregation" : "الحماية البيئية وفرز المخلفات الصناعية",
      desc:
        locale === "en"
          ? "ISO 14001 compliant containment of hazardous materials, secondary fuel containment, water-spray dust suppression, and licensed scrap recycling."
          : "تطبيق معايير ISO 14001 لاحتواء الوقود والمواد الخطرة، وكبح الغبار برش المياه، والتعاقد مع جهات مرخصة لتدوير المخلفات.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? "QHSE: Quality, Health, Safety & Environment" : "الجودة والسلامة والصحة المهنية والبيئة (QHSE)"}
          subtitle={
            locale === "en"
              ? "Our uncompromising commitment to zero harm, environmental sustainability, and rigorous quality assurance across all Saudi contracting operations."
              : "التزام مؤسسي غير قابل للمساومة بثقافة صفر حوادث، والاستدامة البيئية، وضمان الجودة الشامل في كافة مشاريعنا بالمملكة."
          }
          badge={locale === "en" ? "ZERO HARM PHILOSOPHY" : "ثقافة صفر حوادث"}
          breadcrumbs={[{ label: t("nav.qhse") }]}
          imageSrc="/images/content/qhse.jpg"
        />

        {/* Executive Policy Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="badge-tech inline-block">
                  {locale === "en" ? "INSTITUTIONAL QHSE POLICY" : "سياسة السلامة المؤسسية"}
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en"
                    ? "Protecting People, Assets, and the Environment"
                    : "حماية الكوادر البشرية والأصول والبيئة المحيطة"}
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-secondary font-body leading-relaxed">
                  <p>
                    {locale === "en"
                      ? "At Aevoryn Services & Contracting Co., we believe that every worker has the fundamental right to return home safely at the end of every shift. Our Zero-Harm culture is not a regulatory slogan—it is the governing operational discipline embedded in every material delivered, every machine inspected, and every tradesperson deployed."
                      : "في شركة إيفورين للخدمات والمقاولات، نؤمن بأن لكل عامل حقاً أساسياً في العودة إلى أسرته سالماً بعد انتهاء كل وردية عمل. إن ثقافة 'صفر حوادث' لدينا ليست مجرد شعار، بل هي الانضباط التشغيلي الحاكم لكل شحنة مواد نوردها، ولكل آلية نفحصها، ولكل مهني نحشده للميدان."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Our integrated management systems are independently audited and certified under ISO 45001:2018 (Occupational Health & Safety), ISO 9001:2015 (Quality Management), and ISO 14001:2015 (Environmental Management) by Vatsin Certification Private Limited."
                      : "تخضع أنظمة الإدارة المتكاملة لدينا للتدقيق المستقل والاعتماد الدوري وفق معايير ISO 45001:2018 للسلامة والصحة المهنية، وISO 9001:2015 للجودة، وISO 14001:2015 للإدارة البيئية من قبل هيئة Vatsin Certification Private Limited."}
                  </p>
                </div>

                {/* ISO Seal Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-hairline">
                  <div className="p-4 border border-hairline bg-page flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 text-rose-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-primary font-mono-tech">ISO 45001:2018</p>
                      <p className="text-[11px] text-muted font-body">Occupational Safety</p>
                    </div>
                  </div>

                  <div className="p-4 border border-hairline bg-page flex items-center gap-3">
                    <Award className="w-6 h-6 text-brand-cobalt flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-primary font-mono-tech">ISO 9001:2015</p>
                      <p className="text-[11px] text-muted font-body">Quality Management</p>
                    </div>
                  </div>

                  <div className="p-4 border border-hairline bg-page flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-primary font-mono-tech">ISO 14001:2015</p>
                      <p className="text-[11px] text-muted font-body">Environmental System</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-5">
                <div className="relative h-96 border border-hairline bg-page overflow-hidden">
                  <Image
                    src="/images/content/qhse.jpg"
                    alt="Rigorous QHSE Site Safety Inspection"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 border border-white/20 bg-black/75 backdrop-blur-md">
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tech">
                      {locale === "en" ? "PROACTIVE RISK MITIGATION" : "الوقاية الاستباقية من المخاطر"}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed font-body">
                      Zero tolerance for safety shortcuts across all active project zones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Protocols Grid */}
        <section className="section-padding bg-page border-t border-hairline">
          <div className="site-container">
            <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
              <span className="badge-tech inline-block">
                {locale === "en" ? "SAFETY MANAGEMENT" : "إجراءات السلامة الميدانية"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en" ? "Core Safety Protocols & Field Controls" : "بروتوكولات السلامة والضوابط الميدانية الأساسية"}
              </h2>
              <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Four essential field pillars that guarantee safe operations on complex contracting environments."
                  : "أربعة مسارات ميدانية حاسمة تضمن السلامة التامة في بيئات المقاولات الإنشائية المعقدة."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {safetyProtocols.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-hairline bg-surface flex flex-col justify-between space-y-4 hover:border-brand-cobalt transition-colors duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-brand-cobalt font-bold">
                        PROTOCOL // 0{idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-cobalt" />
                    </div>
                    <h3 className="text-xl font-bold font-display uppercase tracking-tight text-primary">
                      {sp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                      {sp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
