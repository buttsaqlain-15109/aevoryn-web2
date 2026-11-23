"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import rawDocuments from "@/data/documents.json";
import {
  FileText,
  Download,
  ShieldCheck,
  Building2,
  Calendar,
  AlertTriangle,
  ExternalLink,
  Filter,
} from "lucide-react";

export default function DocumentsClient() {
  const { locale, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Only display entries marked public
  const publicDocs = rawDocuments.filter((doc) => doc.isPublic);

  const categories = [
    { id: "ALL", labelEn: "All Official Records", labelAr: "جميع الوثائق الرسمية" },
    { id: "Corporate Registration", labelEn: "Corporate Registration", labelAr: "السجلات الرسمية" },
    { id: "Energy & Procurement Registration", labelEn: "Energy & Procurement", labelAr: "سجلات الطاقة والمشتريات" },
    { id: "QHSE Certifications", labelEn: "QHSE Certifications", labelAr: "شهادات الجودة والسلامة" },
  ];

  const filteredDocs = activeCategory === "ALL"
    ? publicDocs
    : publicDocs.filter((doc) => doc.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? "Company Documents & Legal Library" : "وثائق الشركة والمكتبة القانونية"}
          subtitle={
            locale === "en"
              ? "Official commercial registration, ISO accreditations, Saudi Aramco vendor credentials, and national address documentation for EPC audit compliance."
              : "السجلات التجارية الرسمية، اعتمادات الأيزو العالمية، بيانات التأهيل لدى أرامكو السعودية، وإثباتات العنوان الوطني المعتمدة."
          }
          badge={locale === "en" ? "VERIFIED DOCUMENT REGISTER" : "سجل الوثائق المعتمد"}
          breadcrumbs={[{ label: locale === "en" ? "Documents" : "الوثائق" }]}
        />

        <section className="section-padding bg-surface">
          <div className="site-container">
            {/* Top Regulatory Notice Banner */}
            <div className="p-6 mb-10 rounded-lg border border-border bg-page">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display uppercase tracking-wider text-primary">
                      {locale === "en" ? "Procurement Audit Verification Repository" : "مستودع التحقق لفرق المشتريات والتدقيق"}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-body mt-1">
                      {locale === "en"
                        ? "All documents listed below represent authenticated corporate filings for Aevoryn Services & Contracting Co. (CR: 7054401679). Only publicly disclosable compliance records are published."
                        : "كافة الوثائق المدرجة أدناه تمثل سجلات رسمية معتمدة لشركة إيفورين للخدمات والمقاولات (س.ت: 7054401679). يتم نشر الوثائق العامة المصرح بها فقط."}
                    </p>
                  </div>
                </div>
                <Link
                  href="/supplier-registration"
                  className="px-5 py-2.5 text-xs uppercase font-mono font-bold tracking-wider bg-accent text-white rounded hover:bg-accent-hover transition-colors whitespace-nowrap"
                >
                  {locale === "en" ? "Supplier Portal →" : "بوابة الموردين ←"}
                </Link>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border transition-all duration-150 ${
                    activeCategory === cat.id
                      ? "bg-accent text-white border-accent font-bold"
                      : "bg-surface text-secondary border-border hover:border-accent hover:text-primary"
                  }`}
                >
                  {locale === "en" ? cat.labelEn : cat.labelAr}
                </button>
              ))}
            </div>

            {/* Document Register Table / Grid */}
            <div className="space-y-4">
              {filteredDocs.map((doc, idx) => (
                <div
                  key={doc.id}
                  className="p-6 rounded-lg border border-border bg-page hover:border-accent transition-colors duration-150"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center shrink-0 text-accent">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                            {doc.number}
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-secondary">
                            {locale === "en" ? doc.category : doc.categoryAr}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold font-display uppercase tracking-tight text-primary">
                          {locale === "en" ? doc.title : doc.titleAr}
                        </h4>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-6 text-xs text-secondary font-body">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            {locale === "en" ? doc.issuer : doc.issuerAr}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {locale === "en"
                              ? `Issue: ${doc.issueDate} | Validity: ${doc.expiryDate}`
                              : `الإصدار: ${doc.issueDateAr} | الصلاحية: ${doc.expiryDateAr}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border">
                      <a
                        href={doc.filePath}
                        download
                        className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-mono uppercase font-bold tracking-wider bg-surface border border-border text-primary rounded hover:border-accent hover:text-accent transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        {locale === "en" ? "Download PDF" : "تحميل الوثيقة"}
                      </a>
                      <a
                        href={doc.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 text-secondary hover:text-accent rounded border border-border bg-surface transition-colors"
                        title={locale === "en" ? "View in new tab" : "عرض في تبويب جديد"}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mandatory Regulatory Disclaimer */}
            <div className="mt-12 p-6 rounded-lg border border-amber-600/40 bg-amber-950/20 text-amber-200">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-amber-400">
                    {locale === "en"
                      ? "Mandatory Regulatory Disclaimer Regarding Saudi Aramco Registration"
                      : "إخلاء مسؤولية تنظيمي إلزامي بشأن التسجيل لدى أرامكو السعودية"}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                    {locale === "en"
                      ? "Registration with Saudi Aramco e-Marketplace as a vendor under Vendor Code 10120422 (approved 28 July 2026 for Service Provider Only scope) establishes eligibility to receive requests for quotation and participate in commercial bidding. It does not constitute pre-qualification, endorsement, technical approval, or a guarantee of contract award by Saudi Aramco or its affiliates. All commercial arrangements remain subject to formal bid evaluation and project-specific requirements."
                      : "إن التسجيل في السوق الإلكتروني لأرامكو السعودية كمورد برمز 10120422 (المعتمد في 28 يوليو 2026 لنطاق مزود خدمات فقط) يؤهل الشركة لاستلام طلبات عروض الأسعار والمشاركة في المنافسات، ولا يعد تأهيلاً مسبقاً أو اعتماداً فنياً أو ضماناً للترسية من قبل أرامكو السعودية. وتخضع كافة التعاملات للتقييم الفني والتجاري لكل مشروع على حدة."}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification & Audit Note */}
            <div className="mt-8 p-6 rounded-lg border border-border bg-page text-xs text-secondary font-mono space-y-2">
              <p className="font-bold uppercase tracking-wider text-primary">
                {locale === "en" ? "Notice for EPC Procurement & Compliance Officers:" : "ملاحظة لمديري المشتريات ومسؤولي الامتثال:"}
              </p>
              <p className="leading-relaxed">
                {locale === "en"
                  ? "Certified hard copies, audited financial statements, and original stamped bank letters are available upon execution of formal pre-qualification tenders. Contact our Riyadh commercial headquarters at estimation@aevoryn.net or call +966 53 439 7780."
                  : "النسخ الأصلية المعتمدة، القوائم المالية المدققة، والخطابات البنكية المصدقة متاحة عند إجراءات التأهيل المسبق للمشاريع. يرجى التواصل مع إدارة التقدير بالرياض عبر estimation@aevoryn.net أو الاتصال بالرقم +966 53 439 7780."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
