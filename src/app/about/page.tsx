"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ValuesSection } from "@/components/ValuesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { CtaSection } from "@/components/CtaSection";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  AlertTriangle,
  FileCheck2,
  Users2,
  Compass,
} from "lucide-react";

export default function AboutPage() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PageHeader
          title={locale === "en" ? "About Aevoryn Services & Contracting Co." : "عن شركة إيفورين للخدمات والمقاولات"}
          subtitle={
            locale === "en"
              ? "A dedicated Saudi contracting and infrastructure support organization delivering operational reliability, certified expertise, and materials across the Kingdom."
              : "منظمة وطنية رائدة في دعم المقاولات والبنية التحتية، تقدم الموثوقية التشغيلية والكوادر المعتمدة وتوريد المواد لكبرى مشاريع المملكة."
          }
          badge={locale === "en" ? "Corporate Heritage & Profile" : "الملف المؤسسي والحوكمة"}
          breadcrumbs={[{ label: t("nav.about") }]}
          imageSrc="/images/content/about-hero.jpg"
        />

        {/* Corporate Profile Section */}
        <section className="section-padding bg-surface">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{locale === "en" ? "Executive Summary" : "الملخص التنفيذي"}</span>
                </div>
                <h2 className="text-h2 text-primary font-bold">
                  {locale === "en"
                    ? "Empowering Saudi Arabia's Industrial Growth"
                    : "تمكين النمو الصناعي والإنشائي في المملكة"}
                </h2>
                <div className="space-y-4 body-regular text-secondary">
                  <p>
                    {locale === "en"
                      ? "Aevoryn Services & Contracting Co. (CR: 7054401679) was established to fulfill the expanding demand for high-reliability contracting support across the Kingdom of Saudi Arabia. Operating in direct alignment with Saudi Vision 2030, our core mission centers on solving the operational bottlenecks that general contractors and developers encounter on massive civil and industrial jobsites."
                      : "تأسست شركة إيفورين للخدمات والمقاولات (س.ت: 7054401679) لتلبية الطلب المتزايد على خدمات الدعم الإنشائي والصناعي الموثوق في المملكة العربية السعودية. وتماشياً مع رؤية السعودية 2030، تتمحور غايتنا التشغيلية حول إزالة العقبات الميدانية التي تواجه المقاولين الرئيسيين والمطورين في مشاريع البنية التحتية الضخمة."}
                  </p>
                  <p>
                    {locale === "en"
                      ? "Through our four specialized operating divisions—Infrastructure & Project Support, Manpower Supply, Construction Materials Supply, and Heavy Equipment Supply & Rental—we provide a synchronized delivery framework under single-source accountability. We combine deep local procurement relationships with international management standards certified under ISO 9001, ISO 14001, and ISO 45001."
                      : "من خلال قطاعاتنا التشغيلية الأربعة المتخصصة—دعم البنية التحتية، وتوريد القوى العاملة، وتوريد مواد البناء، وتأجير المعدات الثقيلة—نوفر نموذج توريد منسجم تحت مسؤولية موحدة، جامعاً بين سلاسل الإمداد المحلية الموثوقة وأنظمة الإدارة العالمية المعتمدة بشهادات الآيزو 9001 و14001 و45001."}
                  </p>
                </div>

                {/* Key Fact Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-subtle">
                  <div className="p-3.5 rounded-[12px] neu-subtle text-center">
                    <span className="block text-xl font-bold text-brand-primary font-mono">7054401679</span>
                    <span className="caption-text text-muted uppercase font-semibold">Commercial Reg. (CR)</span>
                  </div>
                  <div className="p-3.5 rounded-[12px] neu-subtle text-center">
                    <span className="block text-xl font-bold text-emerald-600 font-mono">10120422</span>
                    <span className="caption-text text-muted uppercase font-semibold">Aramco Vendor Code</span>
                  </div>
                  <div className="p-3.5 rounded-[12px] neu-subtle text-center col-span-2 sm:col-span-1">
                    <span className="block text-xl font-bold text-amber-600 font-mono">ISO Triple</span>
                    <span className="caption-text text-muted uppercase font-semibold">Certified QMS/HSE</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Image & Address Disclosure */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative h-96 rounded-[16px] overflow-hidden neu-raised p-2">
                  <div className="relative w-full h-full rounded-[12px] overflow-hidden">
                    <Image
                      src="/images/content/riyadh-skyline.jpg"
                      alt="Riyadh Development & Skyline"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[12px] bg-surface/90 backdrop-blur-md border border-subtle shadow-lg">
                      <p className="text-xs font-bold text-primary mb-1">
                        {locale === "en" ? "Headquarters Location" : "المقر الرئيسي للإدارة"}
                      </p>
                      <p className="caption-text text-muted leading-relaxed">
                        Alahsa Street, Almalaz, Riyadh 11543, Kingdom of Saudi Arabia
                      </p>
                    </div>
                  </div>
                </div>

                {/* Administrative Address Verification Box */}
                <div className="p-5 rounded-[16px] bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{locale === "en" ? "Corporate Address & Facilities Disclosure" : "إفصاح إداري حول مقار ومنشآت الشركة"}</span>
                  </div>
                  <p className="leading-relaxed opacity-90">
                    {locale === "en"
                      ? "Aevoryn Services & Contracting Co. operates corporate management and commercial negotiations from Alahsa Street, Almalaz, Riyadh. Note: The company's ISO certificates reference an operational facility located in Baish, Jizan Region. Public-facing operations and general contracts are executed under our confirmed Riyadh commercial registration."
                      : "تدير شركة إيفورين للخدمات والمقاولات عملياتها الإدارية والمفاوضات التجارية من شارع الأحساء، حي الملز، الرياض. ملاحظة: تشير شهادات الآيزو الخاصة بالشركة إلى منشأة تشغيلية في بيش بمنطقة جازان. وتتم كافة التعاقدات والعمليات العامة تحت مظلة سجلنا التجاري المعتمد بالرياض."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission & Values */}
        <ValuesSection />

        {/* 8 Strengths */}
        <WhyChooseSection />

        {/* CTA */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
