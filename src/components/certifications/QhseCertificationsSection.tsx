"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DocumentModal, DocumentData } from "@/components/DocumentModal";
import { Award, ShieldAlert, Leaf, ShieldCheck, FileCheck2, AlertTriangle, Eye, ArrowRight, ArrowLeft } from "lucide-react";

export function QhseCertificationsSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  const certificates: (DocumentData & { icon: any; standard: string; color: string; badgeBg: string })[] = [
    {
      id: "iso-45001",
      type: "iso",
      title: "ISO 45001:2018",
      standard: "Occupational Health & Safety",
      body: "Vatsin Certification Private Limited",
      certNo: "VC23032689",
      issueDate: "04 August 2026",
      expiryDate: "03 August 2029",
      scope:
        "Provision of general contracting, infrastructure development, manpower supply, construction materials, and heavy equipment leasing.",
      locationNote:
        "Certified Operational Site: Baish, Jizan Region, Saudi Arabia. Corporate Headquarters: Riyadh.",
      icon: ShieldAlert,
      color: "text-rose-500",
      badgeBg: "bg-rose-500/10",
    },
    {
      id: "iso-9001",
      type: "iso",
      title: "ISO 9001:2015",
      standard: "Quality Management System",
      body: "Vatsin Certification Private Limited",
      certNo: "VC23018822",
      issueDate: "04 August 2026",
      expiryDate: "03 August 2029",
      scope:
        "Quality assurance management for civil engineering, industrial contracting, equipment rental, and materials logistics.",
      locationNote:
        "Certified Operational Site: Baish, Jizan Region, Saudi Arabia. Corporate Headquarters: Riyadh.",
      icon: Award,
      color: "text-blue-500",
      badgeBg: "bg-blue-500/10",
    },
    {
      id: "iso-14001",
      type: "iso",
      title: "ISO 14001:2015",
      standard: "Environmental Management",
      body: "Vatsin Certification Private Limited",
      certNo: "VC23022982",
      issueDate: "04 August 2026",
      expiryDate: "03 August 2029",
      scope:
        "Environmental compliance protocols, sustainable site waste management, and industrial spill prevention controls.",
      locationNote:
        "Certified Operational Site: Baish, Jizan Region, Saudi Arabia. Corporate Headquarters: Riyadh.",
      icon: Leaf,
      color: "text-emerald-500",
      badgeBg: "bg-emerald-500/10",
    },
  ];

  return (
    <>
      <section className="section-padding bg-page hairline-y relative">
        <div className="site-container">
          {/* Section Overline */}
          <div className="flex items-center justify-between pb-6 hairline-b mb-12 lg:mb-16">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-cobalt-accent" />
              <span className="label-tech text-secondary text-[11px]">
                {locale === "en" ? "SECTION 05 // QHSE & CERTIFICATIONS" : "القسم 05 // الجودة والسلامة والاعتمادات"}
              </span>
            </div>
            <span className="label-tech text-muted text-[11px] hidden sm:inline">
              VATSIN CERTIFICATION AUDITED
            </span>
          </div>

          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-h2 font-display text-primary leading-tight">
                {locale === "en" ? (
                  <>
                    GOVERNED BY RIGOROUS<br />
                    INTERNATIONAL STANDARDS.
                  </>
                ) : (
                  <>
                    حوكمة مؤسسية وفق<br />
                    أعلى المعايير الدولية.
                  </>
                )}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="body-regular text-secondary text-sm leading-relaxed">
                {locale === "en"
                  ? "Independently audited management systems certified through 2029. We embed Zero-Harm safety culture across all contracting operations."
                  : "أنظمة إدارة مدققة وموثقة حتى عام 2029 من جهات اعتماد مستقلة، مع ترسيخ ثقافة 'صفر حوادث' في كافة العمليات."}
              </p>
            </div>
          </div>

          {/* 3 Matching Editorial Certificate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.id}
                  className="p-8 rounded-2xl border border-hairline bg-surface hover:border-cobalt-accent shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border border-hairline ${cert.badgeBg}`}>
                        <Icon className={`w-5 h-5 ${cert.color}`} />
                      </div>
                      <span className="label-tech text-xs text-cobalt-accent font-mono bg-wash px-2.5 py-1 rounded-md">
                        {cert.certNo}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-h3 font-display text-primary leading-tight">
                        {cert.title}
                      </h3>
                      <p className="label-tech text-cobalt-accent text-xs pt-1">
                        {cert.standard}
                      </p>
                    </div>

                    <div className="pt-3 hairline-t space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Registrar:</span>
                        <span className="font-medium text-primary">Vatsin Certification</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Valid Through:</span>
                        <span className="font-mono text-primary">{cert.expiryDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Audit Registry:</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active & Valid
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 hairline-t">
                    <button
                      onClick={() => setSelectedDoc(cert)}
                      className="w-full btn-outline text-xs !h-11 !rounded-lg flex items-center justify-center gap-2 group"
                    >
                      <Eye className="w-3.5 h-3.5 text-cobalt-accent group-hover:scale-110 transition-transform" />
                      <span>{locale === "en" ? "VERIFY CERTIFICATE" : "معاينة وثيقة الاعتماد"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Administrative Transparency Notice */}
          <div className="mt-8 p-5 rounded-xl border border-hairline bg-subtle flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="label-tech text-amber-600 dark:text-amber-400 block font-bold text-[11px]">
                {locale === "en" ? "ADMINISTRATIVE FACILITY DISCLOSURE" : "إفصاح إداري حول مقار ومنشآت الشركة"}
              </span>
              <p className="text-xs text-secondary leading-relaxed">
                {locale === "en"
                  ? "All displayed certificate numbers (VC23032689, VC23018822, VC23022982) are officially registered by Vatsin Certification Private Limited (valid 04 August 2026 – 03 August 2029). The certified site facility is situated in Baish, Jizan Region, while corporate contracting and executive operations are executed from our Riyadh headquarters."
                  : "تتوافق كافة أرقام الشهادات المعروضة مع سجلات التدقيق الرسمية لهيئة Vatsin Certification (صالحة من 04 أغسطس 2026 إلى 03 أغسطس 2029). تقع المنشأة التشغيلية المعتمدة في بيش بمنطقة جازان، وتتم التعاقدات والعمليات التنفيذية عبر المقر الرئيسي بالرياض."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Inspection Modal */}
      <DocumentModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </>
  );
}
