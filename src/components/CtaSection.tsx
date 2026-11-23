"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RFQModal } from "./RFQModal";
import { ArrowRight, ArrowLeft, PhoneCall, ShieldCheck, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  return (
    <>
      <section className="section-padding bg-surface relative border-t border-hairline overflow-hidden">
        <div className="site-container relative z-10 text-center space-y-8">
          <div className="space-y-4 max-w-[900px] mx-auto">
            <span className="badge-tech inline-block">
              {locale === "en" ? "COMMERCIAL ENGAGEMENT" : "المشاركة التجارية"}
            </span>
            <h2 className="text-h2 font-bold font-display tracking-tight text-primary uppercase">
              {t("ctaSection.headline")}
            </h2>
            <p className="body-large text-secondary mx-auto max-w-2xl leading-relaxed">
              {t("ctaSection.subheadline")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setRfqOpen(true)}
              className="btn-cobalt flex items-center gap-2 group !h-12 !px-7 !rounded-xl"
            >
              <span>{t("ctaSection.rfqBtn")}</span>
              <Arrow className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

            <Link
              href="/contact"
              className="btn-outline flex items-center gap-2 !h-12 !px-7 !rounded-xl"
            >
              <PhoneCall className="w-4 h-4 text-cobalt-accent" />
              <span>{t("ctaSection.contactBtn")}</span>
            </Link>
          </div>

          <div className="pt-8 border-t border-hairline flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono-tech text-secondary">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>ARAMCO VENDOR 10120422</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt-accent" />
              <span>TRIPLE ISO ACCREDITED</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>CR: 7054401679</span>
            </span>
          </div>
        </div>
      </section>

      <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </>
  );
}
