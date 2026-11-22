"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldAlert,
  Layers,
  Users,
  CheckCircle,
  Wrench,
  Award,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";

export function WhyChooseSection() {
  const { t, locale, isRTL } = useLanguage();

  const icons = [
    Layers,
    TrendingUp,
    ShieldAlert,
    Users,
    CheckCircle,
    Wrench,
    Award,
    HeartHandshake,
  ];

  const items = [
    t("whyChoose.items.0"),
    t("whyChoose.items.1"),
    t("whyChoose.items.2"),
    t("whyChoose.items.3"),
    t("whyChoose.items.4"),
    t("whyChoose.items.5"),
    t("whyChoose.items.6"),
    t("whyChoose.items.7"),
  ];

  return (
    <section className="section-padding bg-surface border-t border-hairline relative overflow-hidden">
      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-[900px] mx-auto space-y-4 mb-14">
          <span className="badge-tech inline-block">
            {t("whyChoose.badge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-primary uppercase">
            {t("whyChoose.headline")}
          </h2>
          <p className="text-base sm:text-lg text-secondary mx-auto max-w-2xl leading-relaxed">
            {t("whyChoose.subheadline")}
          </p>
        </div>

        {/* 8 Strengths Grid with Editorial Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item: any, idx: number) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="p-6 border border-hairline bg-page flex flex-col justify-between space-y-4 hover:border-brand-cobalt transition-colors duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 border border-hairline bg-surface text-brand-cobalt flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono-tech text-muted">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-display text-primary tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-hairline flex items-center justify-between text-[11px] font-mono-tech text-muted">
                  <span>ADVANTAGE {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cobalt" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
