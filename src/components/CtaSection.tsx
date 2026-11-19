"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RFQModal } from "./RFQModal";
import { ArrowRight, ArrowLeft, PhoneCall, FileText, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  return (
    <>
      <section className="section-padding bg-surface relative border-t border-subtle overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center space-y-8">
          <div className="space-y-4 max-w-[1100px] mx-auto">
            <h2 className="text-h2 text-primary font-bold">
              {t("ctaSection.headline")}
            </h2>
            <p className="body-large text-secondary mx-auto">
              {t("ctaSection.subheadline")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setRfqOpen(true)}
              className="btn-primary flex items-center gap-2 group"
            >
              <span>{t("ctaSection.rfqBtn")}</span>
              <Arrow className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

            <Link
              href="/contact"
              className="btn-secondary flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-brand-accent" />
              <span>{t("ctaSection.contactBtn")}</span>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Saudi Aramco Vendor 10120422</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Triple ISO Certified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Immediate Kingdom-Wide Mobilization</span>
            </span>
          </div>
        </div>
      </section>

      <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </>
  );
}
