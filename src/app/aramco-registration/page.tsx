"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { AramcoSection } from "@/components/AramcoSection";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building,
  Award,
} from "lucide-react";

export default function AramcoRegistrationPage() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={t("aramco.headline")}
          subtitle={
            locale === "en"
              ? "Official prequalification details and verified vendor credentials in the Saudi Aramco Supplier Management System."
              : "بيانات التأهيل والاعتماد المعتمدة في نظام إدارة الموردين لدى أرامكو السعودية."
          }
          badge={locale === "en" ? "Aramco Vendor Code: 10120422" : "رمز المورد لدى أرامكو: 10120422"}
          breadcrumbs={[{ label: t("nav.aramco") }]}
          imageSrc="/images/content/aramco-industrial.jpg"
        />

        {/* Aramco Interactive Showcase Section */}
        <AramcoSection />

        {/* Detailed Compliance & Scope Explanation */}
        <section className="section-padding bg-surface">
          <div className="site-container max-w-[820px] space-y-8">
            <div className="p-8 rounded-[16px] neu-raised space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                <span>{locale === "en" ? "Registration Verification & Governance" : "حوكمة وإجراءات التسجيل والتحقق"}</span>
              </div>
              <p className="body-regular text-secondary leading-relaxed">
                {locale === "en"
                  ? "Aevoryn Services & Contracting Co. holds active registration under Saudi Aramco Vendor Code 10120422 with E-Reference 0019448, issued on 28 July 2026. This registration qualifies Aevoryn as a Service Provider within Aramco's procurement ecosystem, authorizing participation in contracting services, specialized manpower mobilization, and civil support tenders."
                  : "تحمل شركة إيفورين للخدمات والمقاولات تسجيلاً سارياً برمز المورد 10120422 ورقم مرجعي إلكتروني 0019448 صادر بتاريخ 28 يوليو 2026. يؤهل هذا الاعتماد الشركة كمزود خدمات ضمن منظومة المشتريات والتوريد لدى أرامكو السعودية، بما يتيح المشاركة في مناقصات المقاولات ودعم البنية التحتية والكوادر الفنية."}
              </p>
            </div>

            {/* Mandatory Disclaimer Box */}
            <div className="p-6 rounded-[16px] bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{locale === "en" ? "Mandatory Regulatory Disclaimer" : "إخلاء مسؤولية تنظيمي إلزامي"}</span>
              </div>
              <p className="leading-relaxed opacity-95">
                {t("aramco.disclaimer")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
