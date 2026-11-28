"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  CheckCircle2,
  FileCheck2,
  Clock,
  ShieldCheck,
  Mail,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Copy,
} from "lucide-react";

function ThankYouContent() {
  const { locale, isRTL } = useLanguage();
  const searchParams = useSearchParams();
  const refNumber = searchParams.get("ref") || `AEV-SUP-${new Date().getFullYear()}-0001`;

  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(refNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nextSteps = [
    {
      step: "01",
      titleEn: "Compliance & Document Audit",
      titleAr: "التدقيق النظامي والمطابقة",
      descEn: "Our procurement and compliance team cross-checks your Commercial Registration (CR), VAT certificate, and Chamber records with official Saudi government databases within 3-5 business days.",
      descAr: "تقوم إدارة المشتريات والالتزام بالتحقق من السجل التجاري، والشهادة الضريبية، واشتراك الغرفة التجارية عبر المنصات الحكومية الرسمية خلال 3 إلى 5 أيام عمل.",
    },
    {
      step: "02",
      titleEn: "Technical Category Verification",
      titleAr: "التصنيف الفني ومطابقة الأسعار",
      descEn: "The relevant divisional head (Materials, Fleet, or Manpower) contacts your representative to align rate cards, specification sheets, and regional mobilization readiness.",
      descAr: "يتواصل مدير القطاع المعني (المواد، أسطول المعدات، أو الكوادر الفنية) مع ممثلكم لمطابقة قوائم الأسعار وجاهزية التوريد في مختلف مناطق المملكة.",
    },
    {
      step: "03",
      titleEn: "Approved Vendor Directory & Direct RFPs",
      titleAr: "الاعتماد النهائي واستلام طلبات التسعير",
      descEn: "Upon compliance approval, your organization is enrolled into Aevoryn's master approved supplier registry to receive direct bidding packages and supply orders.",
      descAr: "عند استكمال متطلبات التأهيل، تدرج منشأتكم في السجل المعتمد لموردي إيفورين لتلقي طلبات عروض الأسعار والمنافسات المباشرة لمشاريعنا الجارية.",
    },
  ];

  return (
    <div className="site-container max-w-4xl py-16 sm:py-24">
      <div className="p-8 sm:p-14 rounded-xl border border-border bg-page text-center space-y-8">
        {/* Status Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="space-y-3">
          <span className="badge-tech inline-block">
            {locale === "en" ? "SUBMISSION CONFIRMED" : "تم استلام الطلب بنجاح"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-primary">
            {locale === "en" ? "Supplier Registration Received" : "تم تسجيل طلب تأهيل المورد"}
          </h1>
          <p className="text-sm sm:text-base text-secondary font-body max-w-2xl mx-auto leading-relaxed">
            {locale === "en"
              ? "Thank you for registering with Aevoryn Services & Contracting Co. Your application and compliance files have been logged into our procurement intake database."
              : "شكراً لتسجيلكم لدى شركة إيفورين للخدمات والمقاولات. تم إيداع ملف المنشأة والمستندات المرفقة في قاعدة بيانات إدارة المشتريات والتعاقدات."}
          </p>
        </div>

        {/* Reference Docket Box */}
        <div className="p-6 rounded-lg border border-accent/40 bg-surface max-w-md mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-secondary block">
            {locale === "en" ? "Official Registration Reference Number" : "الرقم المرجعي الرسمي لطلب التسجيل"}
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-accent tracking-wider">
              {refNumber}
            </span>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded border border-border bg-page hover:border-accent text-secondary hover:text-accent transition-colors"
              title={locale === "en" ? "Copy Reference" : "نسخ الرقم المرجعي"}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && (
            <span className="text-[10px] font-mono text-emerald-500 font-bold block">
              {locale === "en" ? "Copied to clipboard" : "تم النسخ للحافظة"}
            </span>
          )}
        </div>

        {/* Next Steps Timeline */}
        <div className="text-left space-y-6 pt-8 border-t border-border">
          <h2 className="text-lg font-bold font-display uppercase tracking-wider text-primary text-center">
            {locale === "en" ? "Subsequent Procurement Process" : "المراحل التالية لإجراءات التأهيل"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((st) => (
              <div key={st.step} className="p-6 rounded-lg border border-border bg-surface space-y-3">
                <span className="text-2xl font-mono font-bold text-accent block">
                  {st.step}
                </span>
                <h3 className="text-sm font-bold font-display uppercase tracking-tight text-primary">
                  {locale === "en" ? st.titleEn : st.titleAr}
                </h3>
                <p className="text-xs text-secondary font-body leading-relaxed">
                  {locale === "en" ? st.descEn : st.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="p-6 rounded-lg border border-border bg-surface text-xs font-mono text-secondary flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>{locale === "en" ? "Procurement Inquiries: admin@aevoryn.net" : "استفسارات المشتريات: admin@aevoryn.net"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{locale === "en" ? "Registered Facility: Baish, Saudi Arabia" : "المنشأة المسجلة: بيش، المملكة العربية السعودية"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded bg-accent text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-accent-hover transition-colors shadow-sm"
          >
            {locale === "en" ? "Return to Homepage" : "العودة للرئيسية"}
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>

          <Link
            href="/documents"
            className="inline-flex items-center gap-2 px-8 py-3 rounded border border-border bg-surface text-primary font-mono text-xs uppercase font-bold tracking-wider hover:border-accent hover:text-accent transition-colors"
          >
            {locale === "en" ? "View Company Documents" : "استعراض وثائق الشركة"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouClient() {
  return (
    <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-16 text-center text-xs font-mono text-secondary">Loading registration confirmation...</div>}>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
