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
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
            <Compass className="w-3.5 h-3.5" />
            <span>{t("values.badge")}</span>
          </div>
          <h2 className="text-h2 text-primary font-bold">
            {t("values.headline")}
          </h2>
        </div>

        {/* Vision & Mission Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-[16px] neu-raised skeuo-plate space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[12px] bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="label-text text-muted uppercase">
                  {locale === "en" ? "Strategic Direction" : "التوجه الاستراتيجي"}
                </span>
                <h3 className="text-h3 font-bold text-primary">
                  {t("values.visionTitle")}
                </h3>
              </div>
            </div>
            <p className="body-regular text-secondary leading-relaxed pt-2">
              {t("values.visionText")}
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-[16px] neu-raised skeuo-plate space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[12px] bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="label-text text-muted uppercase">
                  {locale === "en" ? "Operational Mandate" : "الغاية التشغيلية"}
                </span>
                <h3 className="text-h3 font-bold text-primary">
                  {t("values.missionTitle")}
                </h3>
              </div>
            </div>
            <p className="body-regular text-secondary leading-relaxed pt-2">
              {t("values.missionText")}
            </p>
          </div>
        </div>

        {/* Six Core Values */}
        <div>
          <h3 className="text-h3 font-bold text-primary text-center mb-8">
            {t("values.valuesTitle")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val: any, idx: number) => {
              const Icon = valueIcons[idx];
              return (
                <div
                  key={idx}
                  className="p-6 rounded-[16px] neu-subtle space-y-3 hover:neu-raised transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-primary">
                    {val.title}
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed">
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
