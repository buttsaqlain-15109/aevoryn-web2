"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  FileText,
  UploadCloud,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Truck,
  Boxes,
  Users2,
} from "lucide-react";

export function SupplierCtaSection() {
  const { locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="section-padding bg-surface border-t border-border">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="badge-tech inline-block">
              {locale === "en" ? "PROCUREMENT & SUPPLY CHAIN" : "سلاسل الإمداد والمشتريات"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
              {locale === "en"
                ? "Supplier Intake & Verification Portals"
                : "بوابات تأهيل الموردين والوثائق المعتمدة"}
            </h2>
            <p className="text-sm sm:text-base text-secondary font-body leading-relaxed">
              {locale === "en"
                ? "Aevoryn Services & Contracting Co. actively mobilizes certified material suppliers, heavy machinery fleets, and technical subcontractors across the Kingdom of Saudi Arabia."
                : "تستقطب شركة إيفورين للخدمات والمقاولات موردي المواد المعتمدة، وأساطيل المعدات الثقيلة، ومقاولي الباطن المؤهلين لدعم مشاريع البنية التحتية بالمملكة."}
            </p>
          </div>

          <div className="shrink-0 font-mono text-xs text-secondary hidden lg:block text-right rtl:text-left">
            <div>CR: 7054401679</div>
            <div>Aramco Vendor: 10120422</div>
          </div>
        </div>

        {/* 2-Column High-Impact Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CARD 1: Supplier Registration Portal */}
          <div className="p-8 sm:p-10 rounded-xl border border-border bg-page hover:border-accent transition-colors duration-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-accent/10 text-accent uppercase tracking-wider">
                  {locale === "en" ? "ACTIVE VENDOR ONBOARDING" : "تأهيل الموردين المعتمد"}
                </span>
                <UploadCloud className="w-6 h-6 text-accent" />
              </div>

              <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en"
                  ? "Supplier & Subcontractor Registration"
                  : "تسجيل الموردين ومقاولي الباطن"}
              </h3>

              <p className="text-sm text-secondary font-body leading-relaxed">
                {locale === "en"
                  ? "Submit commercial credentials, equipment fleet catalogs, construction material compliance documentation, or technical manpower capabilities to join our verified supply network."
                  : "سجل بيانات منشأتك، وقوائم المعدات، ومصادر المواد، والكوادر الفنية للانضمام إلى شبكة التوريد المعتمدة لدى إيفورين."}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-secondary">
                <div className="p-2.5 rounded bg-surface border border-border text-center">
                  <Boxes className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <span>{locale === "en" ? "Materials" : "المواد"}</span>
                </div>
                <div className="p-2.5 rounded bg-surface border border-border text-center">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <span>{locale === "en" ? "Equipment" : "المعدات"}</span>
                </div>
                <div className="p-2.5 rounded bg-surface border border-border text-center">
                  <Users2 className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <span>{locale === "en" ? "Manpower" : "الكوادر"}</span>
                </div>
              </div>
            </div>

            <Link
              href="/supplier-registration"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded bg-accent text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-accent-hover transition-colors shadow-sm"
            >
              <span>{locale === "en" ? "Start Supplier Registration" : "بدء تسجيل المورد"}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>

          {/* CARD 2: Corporate Documents Library */}
          <div className="p-8 sm:p-10 rounded-xl border border-border bg-page hover:border-accent transition-colors duration-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-surface border border-border text-secondary uppercase tracking-wider">
                  {locale === "en" ? "PUBLIC AUDIT REPOSITORY" : "مستودع التدقيق العام"}
                </span>
                <FileText className="w-6 h-6 text-accent" />
              </div>

              <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-primary">
                {locale === "en"
                  ? "Company Documents & Legal Library"
                  : "وثائق الشركة والمكتبة القانونية"}
              </h3>

              <p className="text-sm text-secondary font-body leading-relaxed">
                {locale === "en"
                  ? "Access and download authenticated Commercial Registration (CR 7054401679), Saudi Aramco vendor verification (10120422), ISO 9001/14001/45001 certificates, and national address filings."
                  : "استعرض وحمّل شهادات السجل التجاري، وسجل المورد المعتمد لدى أرامكو السعودية، وشهادات الأيزو الدولية، وإثباتات العنوان الوطني."}
              </p>

              <div className="p-3.5 rounded bg-surface border border-border text-xs font-mono text-secondary space-y-1">
                <div className="flex items-center justify-between">
                  <span>CR: 7054401679</span>
                  <span className="text-emerald-500 font-bold">VERIFIED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Aramco Code: 10120422</span>
                  <span className="text-emerald-500 font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ISO 9001 • 14001 • 45001</span>
                  <span className="text-emerald-500 font-bold">ACCREDITED</span>
                </div>
              </div>
            </div>

            <Link
              href="/documents"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded border border-border bg-surface text-primary font-mono text-xs uppercase font-bold tracking-wider hover:border-accent hover:text-accent transition-colors"
            >
              <span>{locale === "en" ? "Inspect Company Documents" : "استعراض وثائق الشركة"}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
