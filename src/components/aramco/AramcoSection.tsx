"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DocumentModal, DocumentData } from "@/components/DocumentModal";
import { ShieldCheck, CheckCircle2, AlertTriangle, Eye, FileText, ArrowRight, ArrowLeft } from "lucide-react";

export function AramcoSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [modalOpen, setModalOpen] = useState(false);

  const aramcoDoc: DocumentData = {
    id: "aramco-registration",
    type: "aramco",
    title: "Saudi Aramco Supplier Management System Registration",
    body: "Saudi Arabian Oil Company (Saudi Aramco)",
    vendorCode: "10120422",
    eRef: "0019448",
    issueDate: "28 July 2026",
    expiryDate: "Active Supplier Registration",
    scope: "Registered as Service Provider Only in the Saudi Aramco Supplier Management System.",
    locationNote: "Corporate Commercial Registration: 7054401679. Prequalified commercial contracting service provider.",
  };

  return (
    <>
      <section className="section-padding bg-[#0B1728] text-white relative overflow-hidden">
        {/* Subtle Background Industrial Infrastructure Graphic */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <Image
            src="/images/content/aramco-industrial.jpg"
            alt="Energy & Industrial Facility"
            fill
            className="object-cover filter contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1728] via-[#0B1728]/85 to-[#0B1728]" />
        </div>

        <div className="site-container relative z-10">
          {/* Section Overline */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-12 lg:mb-16">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
              <span className="label-tech text-neutral-400 text-[11px]">
                {locale === "en" ? "SECTION 06 // PREQUALIFIED SUPPLIER ACCREDITATION" : "القسم 06 // الاعتماد والتأهيل المعتمد"}
              </span>
            </div>
            <span className="label-tech text-emerald-400 font-mono text-[11px] hidden sm:inline">
              VENDOR CODE: 10120422
            </span>
          </div>

          <div className="max-w-[1100px] mx-auto space-y-12">
            {/* Header & Exact Approved Statement */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 label-tech text-[11px] shadow-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{locale === "en" ? "SAUDI ARAMCO SUPPLIER REGISTRATION" : "التسجيل في نظام موردي أرامكو السعودية"}</span>
              </div>

              <h2 className="text-h2 font-display text-white leading-tight">
                {locale === "en" ? "OFFICIAL PROCUREMENT STATUS" : "بيانات التأهيل والاعتماد الرسمي"}
              </h2>

              {/* Exact Approved Statement Banner */}
              <div className="inline-block p-5 sm:p-6 rounded-2xl border border-emerald-500/40 bg-[#111F36] shadow-sm">
                <p className="text-xl sm:text-2xl font-display text-emerald-400 tracking-wide flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>&ldquo;Registered in the Saudi Aramco Supplier Management System.&rdquo;</span>
                </p>
              </div>

              <p className="body-large text-neutral-300 mx-auto max-w-[760px] leading-relaxed">
                {locale === "en"
                  ? "Aevoryn Services & Contracting Co. is officially registered in Saudi Aramco's Supplier Management System under Vendor Code 10120422 and E-Reference 0019448, qualifying our organization as a commercial Service Provider."
                  : "شركة إيفورين للخدمات والمقاولات مسجلة رسمياً في نظام إدارة الموردين لدى أرامكو السعودية برمز المورد 10120422 ورقم المرجع 0019448 كمزود خدمات معتمد."}
              </p>
            </div>

            {/* Registration Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-xl border border-neutral-800 bg-[#111F36] space-y-2 hover:border-emerald-500/40 transition-colors shadow-subtle">
                <span className="label-tech text-neutral-400 block text-[11px]">VENDOR CODE</span>
                <p className="text-2xl font-mono font-bold text-emerald-400">10120422</p>
                <p className="text-[11px] text-neutral-400">Official Supplier ID</p>
              </div>

              <div className="p-6 rounded-xl border border-neutral-800 bg-[#111F36] space-y-2 hover:border-blue-500/40 transition-colors shadow-subtle">
                <span className="label-tech text-neutral-400 block text-[11px]">E-REFERENCE</span>
                <p className="text-2xl font-mono font-bold text-blue-400">0019448</p>
                <p className="text-[11px] text-neutral-400">Electronic Portal Reference</p>
              </div>

              <div className="p-6 rounded-xl border border-neutral-800 bg-[#111F36] space-y-2 hover:border-neutral-700 transition-colors shadow-subtle">
                <span className="label-tech text-neutral-400 block text-[11px]">SUPPLIER TYPE</span>
                <p className="text-lg font-bold text-white uppercase">Service Provider Only</p>
                <p className="text-[11px] text-neutral-400">Classified Scope</p>
              </div>

              <div className="p-6 rounded-xl border border-neutral-800 bg-[#111F36] space-y-2 hover:border-emerald-500/40 transition-colors shadow-subtle">
                <span className="label-tech text-neutral-400 block text-[11px]">REGISTRATION DATE</span>
                <p className="text-lg font-mono font-bold text-white">28 July 2026</p>
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active & Verified
                </p>
              </div>
            </div>

            {/* Action and Legal Transparency Notice */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-cobalt flex items-center gap-2.5 !h-12 !px-7 !rounded-xl"
              >
                <Eye className="w-4 h-4" />
                <span>{locale === "en" ? "INSPECT ARAMCO REGISTRATION DETAILS" : "معاينة بيانات التسجيل"}</span>
              </button>
            </div>

            {/* Mandatory Regulatory Disclaimer Box */}
            <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="label-tech text-amber-400 block font-bold text-[11px]">
                  {locale === "en" ? "MANDATORY REGULATORY DISCLAIMER" : "إخلاء مسؤولية تنظيمي إلزامي"}
                </span>
                <p className="leading-relaxed opacity-90">
                  {locale === "en"
                    ? "Saudi Aramco vendor registration qualifies Aevoryn Services & Contracting Co. as a commercial Service Provider in the supplier management system. It does not constitute a guaranteed procurement award, contract commitment, or endorsement, nor does it imply qualification as an approved material supplier until separate material documentation is verified."
                    : "يؤهل التسجيل شركة إيفورين كمزود خدمات في نظام إدارة الموردين لدى أرامكو السعودية. ولا يمثل هذا التسجيل ترشيحاً تعاقدياً إلزامياً أو اعتماداً لتوريد المواد حتى يتم تدقيق الوثائق التخصصية المستقلة."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Modal */}
      <DocumentModal
        document={modalOpen ? aramcoDoc : null}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
