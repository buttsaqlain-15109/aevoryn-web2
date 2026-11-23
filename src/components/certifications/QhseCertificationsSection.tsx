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

          {/* Official Document Register Docket */}
          <div className="border border-hairline rounded-xl bg-surface overflow-hidden shadow-card">
            {/* Register Top Data Bar */}
            <div className="p-4 bg-wash border-b border-hairline flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-brand-accent" />
                <span className="font-bold text-primary">AUDIT REGISTRY: VATSIN CERTIFICATION PRIVATE LIMITED</span>
              </div>
              <div className="flex items-center gap-4 text-muted text-[11px]">
                <span>VALIDITY CYCLE: 04 AUG 2026 TO 03 AUG 2029</span>
                <span>STATUS: ACTIVE &amp; VERIFIED</span>
              </div>
            </div>

            {/* Document Register Rows */}
            <div className="divide-y divide-hairline">
              {certificates.map((cert) => {
                const Icon = cert.icon;
                return (
                  <div
                    key={cert.id}
                    className="p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-subtle transition-colors"
                  >
                    <div className="flex items-start gap-4 max-w-2xl">
                      <div className="w-12 h-12 rounded-lg border border-hairline bg-page text-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="w-6 h-6 text-brand-accent" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl font-bold font-display text-primary uppercase">
                            {cert.title}
                          </h3>
                          <span className="label-tech text-xs font-mono bg-page border border-hairline px-2 py-0.5 rounded text-primary">
                            CERT NO: {cert.certNo}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-primary font-mono-tech">
                          {cert.standard}
                        </p>
                        <p className="text-xs text-secondary leading-relaxed font-body">
                          {cert.scope}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 flex-shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-hairline">
                      <div className="text-xs font-mono-tech space-y-0.5 text-start lg:text-end">
                        <span className="text-muted text-[10px] block uppercase">Valid Until</span>
                        <span className="font-bold text-primary text-xs">{cert.expiryDate}</span>
                      </div>
                      <button
                        onClick={() => setSelectedDoc(cert)}
                        className="btn-outline !h-10 !px-4 !text-xs !rounded-md flex items-center gap-2"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{locale === "en" ? "INSPECT CERTIFICATE" : "معاينة الوثيقة"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Administrative Transparency Notice */}
          <div className="mt-6 p-5 rounded-lg border border-hairline bg-subtle flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="label-tech text-primary block font-bold text-[11px]">
                {locale === "en" ? "ADMINISTRATIVE FACILITY DISCLOSURE" : "إفصاح إداري حول مقار ومنشآت الشركة"}
              </span>
              <p className="text-xs text-secondary leading-relaxed font-body">
                {locale === "en"
                  ? "All displayed certificate numbers (VC23032689, VC23018822, VC23022982) are officially registered by Vatsin Certification Private Limited (valid 04 August 2026 to 03 August 2029). The certified site facility is situated in Baish, Jizan Region, while corporate contracting and executive operations are executed from our Riyadh headquarters."
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
