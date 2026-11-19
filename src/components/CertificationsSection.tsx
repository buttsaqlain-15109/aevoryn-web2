"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DocumentModal, DocumentData } from "./DocumentModal";
import {
  Award,
  ShieldCheck,
  ShieldAlert,
  Leaf,
  FileText,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export function CertificationsSection() {
  const { t, locale, isRTL } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  const certificates: DocumentData[] = [
    {
      id: "iso-45001",
      type: "iso",
      title: t("certifications.items.0.title"),
      code: "ISO 45001:2018",
      certNo: "VC23032689",
      body: "Vatsin Certification Private Limited",
      issueDate: "04 August 2026",
      expiryDate: "03 August 2029",
      scope: t("certifications.items.0.scope"),
      locationNote: t("certifications.disclaimer"),
    },
    {
      id: "iso-9001",
      type: "iso",
      title: t("certifications.items.1.title"),
      code: "ISO 9001:2015",
      certNo: "VC23018822",
      body: "Vatsin Certification Private Limited",
      issueDate: "04 August 2026",
      expiryDate: "03 August 2029",
      scope: t("certifications.items.1.scope"),
      locationNote: t("certifications.disclaimer"),
    },
    {
      id: "iso-14001",
      type: "iso",
      title: t("certifications.items.2.title"),
      code: "ISO 14001:2015",
      certNo: "VC23022982",
      body: "Vatsin Certification Private Limited",
      issueDate: "04 August 2026",
      expiryDate: "03 August 2029",
      scope: t("certifications.items.2.scope"),
      locationNote: t("certifications.disclaimer"),
    },
  ];

  return (
    <>
      <section className="section-padding bg-surface relative overflow-hidden border-t border-subtle">
        <div className="site-container relative z-10">
          {/* Header */}
          <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
              <Award className="w-3.5 h-3.5" />
              <span>{t("certifications.badge")}</span>
            </div>
            <h2 className="text-h2 text-primary font-bold">
              {t("certifications.headline")}
            </h2>
            <p className="body-large text-secondary mx-auto">
              {t("certifications.subheadline")}
            </p>
          </div>

          {/* 3 Neumorphic Document Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificates.map((cert) => {
              const isOHS = cert.id === "iso-45001";
              const isEnv = cert.id === "iso-14001";
              const Icon = isOHS ? ShieldAlert : isEnv ? Leaf : Award;
              const badgeColor = isOHS
                ? "text-rose-500 bg-rose-500/10 border-rose-500/20"
                : isEnv
                ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                : "text-blue-500 bg-blue-500/10 border-blue-500/20";

              return (
                <div
                  key={cert.id}
                  className="card-standard panel-large p-7 flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Top Row: Code Badge & Seal */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-[6px] text-xs font-bold border ${badgeColor}`}>
                        {cert.code}
                      </span>
                      <div className="w-10 h-10 rounded-full gold-seal flex items-center justify-center font-bold text-[8px] tracking-tighter uppercase shadow-inner">
                        ISO
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-primary tracking-tight">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-brand-primary">
                        Certificate No: {cert.certNo}
                      </p>
                    </div>

                    <p className="body-small text-secondary leading-relaxed">
                      {cert.scope}
                    </p>

                    {/* Metadata Table Inset */}
                    <div className="p-3.5 rounded-[8px] neu-recessed space-y-2 text-[11px]">
                      <div className="flex justify-between items-center text-muted">
                        <span>{locale === "en" ? "Registration Date:" : "تاريخ التسجيل:"}</span>
                        <span className="font-semibold text-primary">{cert.issueDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-muted">
                        <span>{locale === "en" ? "Validity Period:" : "صلاحية الشهادة:"}</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {cert.expiryDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-muted border-t border-subtle/40 pt-1.5">
                        <span>{locale === "en" ? "Audit Body:" : "جهة الاعتماد:"}</span>
                        <span className="font-semibold text-primary truncate max-w-[140px]">
                          Vatsin Certification
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Document Modal & Download */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedDoc(cert)}
                      className="flex-1 btn-primary !h-[42px] !min-h-[42px] text-[13px] flex items-center justify-center gap-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t("certifications.viewDoc")}</span>
                    </button>
                    <button
                      onClick={() => setSelectedDoc(cert)}
                      className="p-2.5 rounded-[8px] btn-secondary !h-[42px] !min-h-[42px] !px-3 text-muted hover:text-primary"
                      title={t("certifications.downloadPdf")}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Location Verification & Accuracy Disclosure */}
          <div className="mt-12 p-4 rounded-[12px] bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 max-w-4xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {locale === "en"
                  ? "Operational Address Verification Notice"
                  : "إفصاح إداري حول عنوان المنشأة التشغيلية"}
              </p>
              <p className="leading-relaxed opacity-90">
                {t("certifications.disclaimer")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      <DocumentModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </>
  );
}
