"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Compass,
  Target,
  Sparkles,
  ShieldAlert,
  Leaf,
  HeartHandshake,
  Award,
  Lock,
} from "lucide-react";

export function ValuesSection() {
  const { t, locale, isRTL } = useLanguage();

  const valueIcons = [
    Award, // Quality
    Lock, // Integrity
    Sparkles, // Innovation
    ShieldAlert, // Safety
    Leaf, // Sustainability
    HeartHandshake, // Client Satisfaction
  ];

  const values = [
    t("values.items.0"),
    t("values.items.1"),
    t("values.items.2"),
    t("values.items.3"),
    t("values.items.4"),
    t("values.items.5"),
  ];

  return (
    <section className="section-padding bg-page border-t border-hairline relative overflow-hidden">
      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
          <span className="badge-tech inline-block">
            {t("values.badge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-primary uppercase">
            {t("values.headline")}
          </h2>
        </div>

        {/* Vision & Mission Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Vision */}
          <div className="p-8 sm:p-10 border border-hairline bg-surface hover:border-brand-cobalt transition-colors duration-200 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-hairline bg-page text-brand-cobalt flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-muted block">
                  {locale === "en" ? "STRATEGIC DIRECTION" : "التوجه الاستراتيجي"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-primary uppercase">
                  {t("values.visionTitle")}
                </h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-secondary leading-relaxed font-body">
              {t("values.visionText")}
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 border border-hairline bg-surface hover:border-brand-cobalt transition-colors duration-200 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-hairline bg-page text-brand-cobalt flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-muted block">
                  {locale === "en" ? "OPERATIONAL MANDATE" : "الغاية التشغيلية"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-primary uppercase">
                  {t("values.missionTitle")}
                </h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-secondary leading-relaxed font-body">
              {t("values.missionText")}
            </p>
          </div>
        </div>

        {/* Six Core Values */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-hairline">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-primary uppercase">
              {t("values.valuesTitle")}
            </h3>
            <span className="text-xs font-mono-tech text-muted">
              PILLARS // 01 - 06
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val: any, idx: number) => {
              const Icon = valueIcons[idx];
              return (
                <div
                  key={idx}
                  className="p-6 border border-hairline bg-surface hover:border-brand-cobalt transition-colors duration-200 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 border border-hairline bg-page text-brand-cobalt flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono-tech text-muted">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-display text-primary uppercase tracking-tight">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
