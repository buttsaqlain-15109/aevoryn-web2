"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Compass,
  Cpu,
  ShieldCheck,
  Clock,
  Coins,
  Leaf,
  AlertCircle,
  CheckCircle,
  FileCheck2,
} from "lucide-react";

export function ProjectSupportSection() {
  const { t, locale, isRTL } = useLanguage();

  const icons = [Compass, Cpu, FileCheck2, ShieldCheck, Clock, Coins, Leaf];

  const pillars = [
    t("projectSupport.pillars.0"),
    t("projectSupport.pillars.1"),
    t("projectSupport.pillars.2"),
    t("projectSupport.pillars.3"),
    t("projectSupport.pillars.4"),
    t("projectSupport.pillars.5"),
    t("projectSupport.pillars.6"),
  ];

  return (
    <section className="section-padding bg-surface relative border-y border-subtle">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
            <Compass className="w-3.5 h-3.5" />
            <span>{t("projectSupport.badge")}</span>
          </div>
          <h2 className="text-h2 text-primary font-bold">
            {t("projectSupport.headline")}
          </h2>
          <p className="body-large text-secondary mx-auto">
            {t("projectSupport.subheadline")}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pillars.map((pillar: any, idx: number) => {
            const Icon = icons[idx] || CheckCircle;
            return (
              <div
                key={idx}
                className="p-6 rounded-[16px] neu-subtle space-y-3 hover:neu-raised transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-[12px] bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-primary">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}

          {/* 8th Card: Governance & Partnership Framework */}
          <div className="p-6 rounded-[16px] neu-raised bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 border border-brand-accent/30 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-accent block mb-1">
                {locale === "en" ? "Contractor Support Model" : "نموذج مساندة المقاولين"}
              </span>
              <h3 className="text-sm font-bold text-primary mb-2">
                {locale === "en" ? "Turnkey Subcontracting Alignment" : "تناغم تام مع المقاول الرئيسي"}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                {locale === "en"
                  ? "Seamless mobilization under principal contractor supervision with complete administrative compliance."
                  : "حشد تشغيلي متكامل تحت إشراف المقاول الرئيسي مع التزام إداري وقانوني تام."}
              </p>
            </div>
            <div className="text-[11px] font-semibold text-brand-primary">
              {locale === "en" ? "Saudi Labor & SASO Aligned" : "متوافق مع أنظمة العمل وهيئة المواصفات"}
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Note / Disclaimer */}
        <div className="mt-12 p-4 rounded-[12px] bg-primary/50 border border-subtle flex items-start gap-3 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-secondary leading-relaxed">
            {t("projectSupport.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}
