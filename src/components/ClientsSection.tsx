"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Building2, Handshake, CheckCircle2 } from "lucide-react";

export function ClientsSection() {
  const { t, locale, isRTL } = useLanguage();

  const partners = [
    t("clients.partners.0"),
    t("clients.partners.1"),
    t("clients.partners.2"),
    t("clients.partners.3"),
    t("clients.partners.4"),
  ];

  return (
    <section className="section-padding bg-surface relative border-y border-subtle">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-[1100px] mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary label-text">
            <Handshake className="w-3.5 h-3.5" />
            <span>{t("clients.badge")}</span>
          </div>
          <h2 className="text-h2 text-primary font-bold">
            {t("clients.headline")}
          </h2>
          <p className="body-large text-secondary mx-auto">
            {t("clients.subheadline")}
          </p>
        </div>

        {/* Client Collaboration Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {partners.map((partner: any, idx: number) => (
            <div
              key={idx}
              className="p-6 rounded-[16px] neu-raised skeuo-plate flex flex-col justify-between text-center space-y-4 hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-[12px] bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-primary tracking-tight">
                  {partner.name}
                </h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-semibold">
                  {partner.category}
                </span>
              </div>

              <div className="pt-3 border-t border-subtle">
                <p className="text-[11px] text-muted leading-relaxed">
                  {partner.scope}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="text-center mt-10">
          <p className="text-xs text-muted max-w-2xl mx-auto">
            {t("clients.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
