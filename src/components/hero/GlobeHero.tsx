"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, ShieldCheck, Award, MapPin } from "lucide-react";

interface GlobeHeroProps {
  onOpenConsultation?: () => void;
  scrollProgress?: number;
}

export function GlobeHero({ onOpenConsultation, scrollProgress = 0 }: GlobeHeroProps) {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      aria-label="Aevoryn Hero Section"
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-page transition-colors duration-200"
    >
      <div className="site-container py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Direct Engineering Positioning (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Technical Verification Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-wash border border-hairline">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="label-tech text-primary text-[11px]">
                {locale === "en" ? "COMMERCIAL REGISTRATION: 7054401679" : "سجل تجاري رقم: 7054401679"}
              </span>
            </div>

            {/* Direct Engineering Headline with Balanced Typography (No Orphaned Ampersands) */}
            <div className="space-y-1">
              <h1 className="text-hero-display text-primary font-display tracking-tight leading-[0.98]">
                {locale === "en" ? (
                  <>
                    <span className="block">CIVIL INFRASTRUCTURE</span>
                    <span className="block text-secondary">&amp;&nbsp;CONTRACTING SUPPORT.</span>
                  </>
                ) : (
                  <>
                    <span className="block">دعم البنية التحتية</span>
                    <span className="block text-secondary">والمقاولات المدنية.</span>
                  </>
                )}
              </h1>
            </div>

            {/* Direct, Concrete Engineering Copy: What we do, for whom, proof */}
            <p className="body-large text-secondary leading-relaxed max-w-[620px]">
              {locale === "en"
                ? "Aevoryn Services & Contracting Co. provides project development support, manpower supply, construction materials supply, and equipment supply to commercial contractors and industrial developers across Saudi Arabia. Aramco Vendor Code 10120422. Triple ISO certified (9001, 14001, 45001)."
                : "توفر شركة إيفورين للخدمات والمقاولات دعم وتطوير المشاريع، والكوادر الفنية، وتوريد مواد البناء، ومعدات المشاريع للمقاولين والمطورين بالمملكة. مسجلة لدى أرامكو برمز مورد 10120422 وحاصلة على اعتمادات الآيزو 9001 و14001 و45001."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/capabilities/infrastructure"
                className="btn-cobalt group"
              >
                <span>{locale === "en" ? "EXPLORE CAPABILITIES" : "استعراض القدرات"}</span>
                <Arrow className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="btn-outline"
              >
                <span>{locale === "en" ? "CONTACT COMMERCIAL INQUIRIES" : "التواصل للاستفسارات التجارية"}</span>
              </Link>
            </div>

            {/* Verified Accreditation Strip */}
            <div className="pt-6 border-t border-hairline flex flex-wrap items-center gap-6 text-xs text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="label-tech text-muted text-[11px]">
                  Aramco Vendor: <strong className="text-primary font-mono">10120422</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span className="label-tech text-muted text-[11px]">
                  ISO <strong className="text-primary font-mono">9001 • 14001 • 45001</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span className="label-tech text-muted text-[11px]">
                  {locale === "en" ? (
                    <>FACILITY: <strong className="text-primary">BAISH, SAUDI ARABIA</strong></>
                  ) : (
                    <>المقر المسجل: <strong className="text-primary">بيش، المملكة العربية السعودية</strong></>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Industrial Site Image Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="border border-hairline bg-surface rounded-xl overflow-hidden shadow-card">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900">
                <Image
                  src="/images/content/hero-industrial.jpg"
                  alt="Aevoryn Industrial Contracting and Jobsite Equipment in Saudi Arabia"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
                  <div className="flex items-center gap-2 font-mono-tech text-[11px] text-emerald-400 font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{locale === "en" ? "Active Jobsite Fleet Operations" : "عمليات الأسطول الميداني"}</span>
                  </div>
                  <p className="text-neutral-200 text-xs font-body">
                    {locale === "en"
                      ? "Operational coordination, technical support, and equipment mobilization across regional project zones."
                      : "التنسيق التشغيلي، والدعم الفني، وحشد المعدات في مناطق المشاريع بالمملكة."}
                  </p>
                </div>
              </div>

              {/* Scope Quick Ledger */}
              <div className="p-4 grid grid-cols-2 gap-3 bg-subtle border-t border-hairline text-xs font-mono-tech">
                <div className="p-2.5 bg-page border border-hairline rounded-md">
                  <span className="text-[10px] text-muted block uppercase">{locale === "en" ? "Division 01" : "القطاع 01"}</span>
                  <span className="font-bold text-primary text-xs">{locale === "en" ? "Project Development" : "دعم المشاريع"}</span>
                </div>
                <div className="p-2.5 bg-page border border-hairline rounded-md">
                  <span className="text-[10px] text-muted block uppercase">{locale === "en" ? "Division 02" : "القطاع 02"}</span>
                  <span className="font-bold text-primary text-xs">{locale === "en" ? "Technical Manpower" : "الكوادر الفنية"}</span>
                </div>
                <div className="p-2.5 bg-page border border-hairline rounded-md">
                  <span className="text-[10px] text-muted block uppercase">{locale === "en" ? "Division 03" : "القطاع 03"}</span>
                  <span className="font-bold text-primary text-xs">{locale === "en" ? "Construction Materials" : "مواد البناء"}</span>
                </div>
                <div className="p-2.5 bg-page border border-hairline rounded-md">
                  <span className="text-[10px] text-muted block uppercase">{locale === "en" ? "Division 04" : "القطاع 04"}</span>
                  <span className="font-bold text-primary text-xs">{locale === "en" ? "Heavy Equipment" : "الآليات الثقيلة"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
