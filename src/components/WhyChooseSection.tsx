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
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
            <Award className="w-3.5 h-3.5" />
            <span>{t("whyChoose.badge")}</span>
          </div>
          <h2 className="text-h2 text-primary font-bold">
            {t("whyChoose.headline")}
          </h2>
          <p className="body-large text-secondary mx-auto">
            {t("whyChoose.subheadline")}
          </p>
        </div>

        {/* 8 Strengths Grid with Neumorphic Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item: any, idx: number) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="p-6 rounded-[16px] neu-raised skeuo-plate flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-brand-primary/15 to-brand-accent/10 border border-brand-accent/20 text-brand-primary flex items-center justify-center shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-primary tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-subtle flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>Advantage {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
