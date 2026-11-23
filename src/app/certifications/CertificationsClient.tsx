"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { QhseCertificationsSection } from "@/components/certifications/QhseCertificationsSection";
import { DocumentModal, DocumentData } from "@/components/DocumentModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  Award,
  ShieldCheck,
  ShieldAlert,
  Leaf,
  FileCheck2,
  AlertTriangle,
  Building2,
  Calendar,
  Eye,
  Download,
} from "lucide-react";

export default function CertificationsClient() {
  const { t, locale, isRTL } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("certifications.headline")}
          subtitle={t("certifications.subheadline")}
          badge={locale === "en" ? "ISO ACCREDITATIONS & AUDITS" : "اعتمادات وتراخيص الآيزو الدولية"}
          breadcrumbs={[{ label: t("nav.certifications") }]}
          imageSrc="/images/content/about-hero.jpg"
        />

        {/* Introduction & Audit Authority Information */}
        <section className="section-padding bg-surface border-b border-hairline">
          <div className="site-container">
            <div className="max-w-[900px] mx-auto text-center space-y-4">
              <span className="badge-tech inline-block">
                {locale === "en" ? "AUDITED MANAGEMENT FRAMEWORK" : "نظام الإدارة المعتمد والموثق"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en"
                  ? "Independently Audited International Compliance"
                  : "امتثال دولي مدقق من جهات اعتماد مستقلة"}
              </h2>
              <p className="text-base sm:text-lg text-secondary leading-relaxed mx-auto max-w-2xl font-body">
                {locale === "en"
                  ? "Aevoryn Services & Contracting Co. operates under three comprehensive management standards certified by Vatsin Certification Private Limited. These credentials confirm that our operational execution, hazard controls, and environmental policies satisfy rigorous international benchmarks."
                  : "تعمل شركة إيفورين للخدمات والمقاولات وفق ثلاثة معايير إدارة متكاملة معتمدة من هيئة Vatsin Certification Private Limited. وتؤكد هذه الشهادات أن عملياتنا الميدانية، وضوابط السلامة، والسياسات البيئية مطابقة تماماً للمستويات الدولية الرفيعة."}
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Interactive Grid (Editorial Master) */}
        <QhseCertificationsSection />

        {/* Document Experience & Transparency Notice */}
        <section className="section-padding bg-surface border-t border-hairline">
          <div className="site-container max-w-[820px]">
            <div className="p-8 border border-hairline bg-page rounded-2xl shadow-subtle space-y-4">
              <div className="flex items-center gap-2.5 text-brand-cobalt font-bold text-sm font-mono-tech uppercase">
                <FileCheck2 className="w-5 h-5" />
                <span>{locale === "en" ? "DOCUMENT VERIFICATION & AUDIT DISCLOSURE" : "سياسة التحقق من الوثائق والشفافية"}</span>
              </div>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                {locale === "en"
                  ? "All displayed certificate numbers (ISO 45001: VC23032689, ISO 9001: VC23018822, ISO 14001: VC23022982) correspond to official audit records registered on 04 August 2026 and valid through 03 August 2029. In compliance with corporate transparency guidelines, administrative verification notes that the certified operational site is situated in Baish, Jizan Region, while corporate governance and contracting reside at our Riyadh headquarters."
                  : "تتوافق كافة أرقام الشهادات المعروضة (ISO 45001: VC23032689، وISO 9001: VC23018822، وISO 14001: VC23022982) مع سجلات التدقيق الرسمية المسجلة بتاريخ 04 أغسطس 2026 والصالحة حتى 03 أغسطس 2029. والتزاماً بالشفافية المؤسسية، يُشار إلى أن المنشأة التشغيلية المعتمدة تقع في بيش بمنطقة جازان، في حين يتولى المقر الرئيسي بالرياض إدارة كافة العمليات التعاقدية."}
              </p>
            </div>
          </div>
        </section>

        {/* Modal */}
        <DocumentModal
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      </main>
      <Footer />
    </div>
  );
}
