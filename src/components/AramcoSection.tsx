"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DocumentModal, DocumentData } from "./DocumentModal";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Building,
  Calendar,
  Hash,
  Eye,
  ExternalLink,
} from "lucide-react";

export function AramcoSection() {
  const { t, locale, isRTL } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const aramcoDoc: DocumentData = {
    id: "aramco-reg",
    type: "aramco",
    title: "Saudi Aramco Supplier Management System Registration",
    body: "Saudi Arabian Oil Company (Saudi Aramco)",
    vendorCode: "10120422",
    eRef: "0019448",
    issueDate: "28 July 2026",
    expiryDate: "Active Registration",
    scope: "Registered as Service Provider Only in the Saudi Aramco Supplier Management System.",
    locationNote: "Corporate CR No. 7054401679. Service provider prequalification status verified in supplier management portal.",
  };

  return (
    <>
      <section className="section-padding bg-[#0B1220] text-white relative overflow-hidden">
        {/* Subtle background industrial plant image */}
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="/images/content/aramco-industrial.jpg"
            alt="Industrial Energy Facility"
            fill
            className="object-cover filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/80 to-[#0B1220]" />
        </div>

        <div className="site-container relative z-10">
          <div className="max-w-[1100px] mx-auto space-y-12">
            {/* Header / Official Statement */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 label-text">
                <ShieldCheck className="w-4 h-4" />
                <span>{t("aramco.badge")}</span>
              </div>

              <h2 className="text-h2 text-white">
                {t("aramco.headline")}
              </h2>

              {/* Mandatory Official Wording Container */}
              <div className="inline-block p-4 sm:p-5 rounded-[16px] bg-[#101A28] border-2 border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] my-2">
                <p className="text-lg sm:text-2xl font-bold text-emerald-400 tracking-tight flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>&ldquo;{t("aramco.officialStatement")}&rdquo;</span>
                </p>
              </div>

              <p className="body-large text-slate-300 mx-auto">
                {t("aramco.desc")}
              </p>
            </div>

            {/* Registration Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Vendor Code */}
              <div className="p-5 rounded-[12px] bg-[#101A28] border border-[#28394E] space-y-2">
                <span className="caption-text uppercase tracking-wider font-semibold text-slate-400 block">
                  {t("aramco.details.vendorCodeLabel")}
                </span>
                <p className="text-2xl font-mono font-bold text-emerald-400">
                  {t("aramco.details.vendorCode")}
                </p>
                <p className="caption-text text-slate-400">
                  {locale === "en" ? "Official Supplier ID" : "الرمز المعتمد في نظام الموردين"}
                </p>
              </div>

              {/* E-Reference Number */}
              <div className="p-5 rounded-[12px] bg-[#101A28] border border-[#28394E] space-y-2">
                <span className="caption-text uppercase tracking-wider font-semibold text-slate-400 block">
                  {t("aramco.details.eRefLabel")}
                </span>
                <p className="text-2xl font-mono font-bold text-blue-400">
                  {t("aramco.details.eRef")}
                </p>
                <p className="caption-text text-slate-400">
                  {locale === "en" ? "Electronic Tracking Reference" : "المرجع الإلكتروني للطلب والاعتماد"}
                </p>
              </div>

              {/* Commercial Registration (CR) */}
              <div className="p-5 rounded-[12px] bg-[#101A28] border border-[#28394E] space-y-2">
                <span className="caption-text uppercase tracking-wider font-semibold text-slate-400 block">
                  {t("aramco.details.crLabel")}
                </span>
                <p className="text-2xl font-mono font-bold text-slate-200">
                  {t("aramco.details.cr")}
                </p>
                <p className="caption-text text-slate-400">
                  {locale === "en" ? "Ministry of Commerce KSA" : "وزارة التجارة - المملكة العربية السعودية"}
                </p>
              </div>

              {/* Letter Date */}
              <div className="p-5 rounded-[12px] bg-[#101A28] border border-[#28394E] space-y-2">
                <span className="caption-text uppercase tracking-wider font-semibold text-slate-400 block">
                  {t("aramco.details.dateLabel")}
                </span>
                <p className="text-xl font-bold text-slate-200">
                  {t("aramco.details.date")}
                </p>
                <p className="caption-text text-slate-400">
                  {locale === "en" ? "Official Registration Letter Date" : "تاريخ إصدار خطاب التسجيل الرسمي"}
                </p>
              </div>

              {/* Supplier Classification */}
              <div className="p-5 rounded-[12px] bg-[#101A28] border border-[#28394E] space-y-2 sm:col-span-2">
                <span className="caption-text uppercase tracking-wider font-semibold text-slate-400 block">
                  {t("aramco.details.supplierTypeLabel")}
                </span>
                <p className="text-xl font-bold text-amber-400">
                  {t("aramco.details.supplierType")}
                </p>
                <p className="caption-text text-slate-400">
                  {locale === "en"
                    ? "Classified for infrastructure, manpower, and contracting services support."
                    : "مصنف لتقديم خدمات دعم البنية التحتية والمقاولات والكوادر الفنية."}
                </p>
              </div>
            </div>

            {/* Interactive Preview Button */}
            <div className="text-center pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>{t("aramco.cta")}</span>
              </button>
            </div>

            {/* Mandatory Disclaimer Box */}
            <div className="p-5 rounded-2xl bg-[#101A28]/80 border border-slate-700 text-xs text-slate-300 flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-slate-200">
                  {locale === "en"
                    ? "Mandatory Procurement & Supplier Disclaimer"
                    : "إخلاء مسؤولية تنظيمي إلزامي"}
                </p>
                <p className="leading-relaxed text-slate-400">
                  {t("aramco.disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal View for Aramco Credentials */}
      <DocumentModal
        document={modalOpen ? aramcoDoc : null}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
