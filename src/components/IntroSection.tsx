"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, ArrowRight, ArrowLeft, Building2, MapPin, Shield } from "lucide-react";

export function IntroSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Image Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image with Neumorphic Raised Frame (Section 7 Radii: 16px) */}
              <div className="relative h-[420px] sm:h-[480px] rounded-[16px] overflow-hidden neu-raised p-2">
                <div className="relative w-full h-full rounded-[12px] overflow-hidden">
                  <Image
                    src="/images/content/about-hero.jpg"
                    alt="Aevoryn Corporate Architecture & Operations"
                    fill
                    className="object-cover object-center filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-transparent to-transparent" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[12px] bg-surface/90 backdrop-blur-md border border-subtle shadow-lg">
                    <p className="text-xs font-bold text-primary mb-1">
                      {locale === "en" ? "Headquartered in Riyadh" : "المقر الرئيسي في الرياض"}
                    </p>
                    <p className="caption-text text-muted leading-relaxed">
                      {t("brand.address")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Skeuomorphic Seal */}
              <div className="absolute -top-6 -right-6 rtl:-right-auto rtl:-left-6 w-24 h-24 rounded-full skeuo-plate p-2 flex flex-col items-center justify-center text-center shadow-xl border-2 border-brand-accent/30 hidden sm:flex">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">
                  Vision 2030
                </span>
                <span className="caption-text text-muted font-medium">Partner</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary label-text">
                <Building2 className="w-3.5 h-3.5" />
                <span>{t("intro.badge")}</span>
              </div>
              <h2 className="text-h2 text-primary font-bold">
                {t("intro.headline")}
              </h2>
            </div>

            <p className="body-large text-primary font-medium">
              {t("intro.leadText")}
            </p>

            <div className="space-y-4 body-regular text-secondary">
              <p>{t("intro.paragraph1")}</p>
              <p>{t("intro.paragraph2")}</p>
            </div>

            {/* Three Institutional Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-subtle">
              <div className="p-4 rounded-[12px] neu-subtle space-y-1.5">
                <div className="w-7 h-7 rounded-[6px] bg-blue-500/10 text-brand-accent flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-primary">
                  {t("intro.highlights.0.label")}
                </h4>
                <p className="caption-text text-muted leading-snug">
                  {t("intro.highlights.0.desc")}
                </p>
              </div>

              <div className="p-4 rounded-[12px] neu-subtle space-y-1.5">
                <div className="w-7 h-7 rounded-[6px] bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-primary">
                  {t("intro.highlights.1.label")}
                </h4>
                <p className="caption-text text-muted leading-snug">
                  {t("intro.highlights.1.desc")}
                </p>
              </div>

              <div className="p-4 rounded-[12px] neu-subtle space-y-1.5">
                <div className="w-7 h-7 rounded-[6px] bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-primary">
                  {t("intro.highlights.2.label")}
                </h4>
                <p className="caption-text text-muted leading-snug">
                  {t("intro.highlights.2.desc")}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="btn-text"
              >
                <span>{t("intro.readMore")}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
