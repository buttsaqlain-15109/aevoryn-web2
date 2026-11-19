"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  HardHat,
  Layers,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export function CapabilitiesSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const items = [
    {
      id: "infrastructure",
      title: t("capabilities.items.0.title"),
      subtitle: t("capabilities.items.0.subtitle"),
      desc: t("capabilities.items.0.desc"),
      features: [
        t("capabilities.items.0.features.0"),
        t("capabilities.items.0.features.1"),
        t("capabilities.items.0.features.2"),
        t("capabilities.items.0.features.3"),
      ],
      image: "/images/content/infrastructure.jpg",
      link: "/capabilities/infrastructure",
      icon: Building2,
      badge: "Division 01",
    },
    {
      id: "manpower",
      title: t("capabilities.items.1.title"),
      subtitle: t("capabilities.items.1.subtitle"),
      desc: t("capabilities.items.1.desc"),
      features: [
        t("capabilities.items.1.features.0"),
        t("capabilities.items.1.features.1"),
        t("capabilities.items.1.features.2"),
        t("capabilities.items.1.features.3"),
      ],
      image: "/images/content/manpower.jpg",
      link: "/capabilities/manpower",
      icon: HardHat,
      badge: "Division 02",
    },
    {
      id: "materials",
      title: t("capabilities.items.2.title"),
      subtitle: t("capabilities.items.2.subtitle"),
      desc: t("capabilities.items.2.desc"),
      features: [
        t("capabilities.items.2.features.0"),
        t("capabilities.items.2.features.1"),
        t("capabilities.items.2.features.2"),
        t("capabilities.items.2.features.3"),
      ],
      image: "/images/content/materials.jpg",
      link: "/capabilities/materials",
      icon: Layers,
      badge: "Division 03",
    },
    {
      id: "equipment",
      title: t("capabilities.items.3.title"),
      subtitle: t("capabilities.items.3.subtitle"),
      desc: t("capabilities.items.3.desc"),
      features: [
        t("capabilities.items.3.features.0"),
        t("capabilities.items.3.features.1"),
        t("capabilities.items.3.features.2"),
        t("capabilities.items.3.features.3"),
      ],
      image: "/images/content/equipment.jpg",
      link: "/capabilities/equipment",
      icon: Truck,
      badge: "Division 04",
    },
  ];

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
            <Layers className="w-3.5 h-3.5" />
            <span>{t("capabilities.badge")}</span>
          </div>
          <h2 className="text-h2 text-primary font-bold">
            {t("capabilities.headline")}
          </h2>
          <p className="body-large text-secondary mx-auto">
            {t("capabilities.subheadline")}
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative neu-raised skeuo-plate flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Image Banner */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                  {/* Division Badge & Icon */}
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-6 rtl:left-auto rtl:right-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface/90 backdrop-blur-md border border-subtle text-brand-primary flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted font-medium">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-sm text-secondary leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-2.5 pt-2 border-t border-subtle">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-muted">
                      {locale === "en" ? "Operational Scope:" : "النطاق التشغيلي:"}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-secondary">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="pt-4 border-t border-subtle flex items-center justify-between">
                    <Link
                      href={item.link}
                      className="btn-secondary flex items-center gap-2 group/btn"
                    >
                      <span>{t("capabilities.viewDetails")}</span>
                      <Arrow className="w-3.5 h-3.5 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                    </Link>

                    <span className="text-[11px] font-mono text-muted">
                      {locale === "en" ? "KSA Qualified" : "معتمد بالمملكة"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
