"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Compass,
  Target,
  ShieldCheck,
  ShieldAlert,
  Leaf,
  HeartHandshake,
  Award,
  Lock,
  CheckCircle2,
} from "lucide-react";

export function ValuesSection() {
  const { t, locale, isRTL } = useLanguage();

  const valueIcons = [
    Award, // Quality
    Lock, // Integrity
    CheckCircle2, // Execution Precision
    ShieldAlert, // Safety
    Leaf, // Sustainability
    HeartHandshake, // Client Delivery
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
        <div className="text-center max-w-[840px] mx-auto space-y-3 mb-12">
          <span className="badge-tech inline-block">
            {t("values.badge")}
          </span>
          <h2 className="text-h2 font-bold font-display tracking-tight text-primary uppercase">
            {t("values.headline")}
          </h2>
        </div>

        {/* Vision & Mission Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Vision */}
          <div className="p-8 rounded-xl border border-hairline bg-surface shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md border border-hairline bg-wash text-primary flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="label-tech text-[10px] text-muted block">
                  {locale === "en" ? "STRATEGIC DIRECTION" : "التوجه الاستراتيجي"}
                </span>
                <h3 className="text-xl font-bold font-display text-primary uppercase">
                  {t("values.visionTitle")}
                </h3>
              </div>
            </div>
            <p className="body-regular text-secondary leading-relaxed font-body text-sm">
              {t("values.visionText")}
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-xl border border-hairline bg-surface shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md border border-hairline bg-wash text-primary flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="label-tech text-[10px] text-muted block">
                  {locale === "en" ? "OPERATIONAL MANDATE" : "الغاية التشغيلية"}
                </span>
                <h3 className="text-xl font-bold font-display text-primary uppercase">
                  {t("values.missionTitle")}
                </h3>
              </div>
            </div>
            <p className="body-regular text-secondary leading-relaxed font-body text-sm">
              {t("values.missionText")}
            </p>
          </div>
        </div>

        {/* Six Operating Standards: Asymmetric 2-Column Ledger (Varying layout from generic 3-card trio) */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-hairline">
            <h3 className="text-lg font-bold font-display text-primary uppercase">
              {t("values.valuesTitle")}
            </h3>
            <span className="label-tech text-muted text-[11px]">
              GOVERNANCE STANDARDS • 01 - 06
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((val: any, idx: number) => {
              const Icon = valueIcons[idx];
              return (
                <div
                  key={idx}
                  className="p-5 rounded-lg border border-hairline bg-surface flex items-start gap-4 hover:border-brand-accent transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-wash text-primary flex items-center justify-center flex-shrink-0 mt-0.5 border border-hairline">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-muted">0{idx + 1}.</span>
                      <h4 className="text-sm font-bold font-display text-primary uppercase tracking-tight">
                        {val.title}
                      </h4>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed font-body">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
