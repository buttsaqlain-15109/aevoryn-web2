"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RFQModal } from "@/components/RFQModal";
import { ArrowRight, ArrowLeft, Phone, Mail, MapPin, AlertTriangle } from "lucide-react";

export function ContactFooterSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [rfqOpen, setRfqOpen] = useState(false);

  return (
    <>
      <section className="section-padding bg-page hairline-t relative">
        <div className="site-container">
          {/* Section Overline */}
          <div className="flex items-center justify-between pb-6 hairline-b mb-12 lg:mb-16">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-cobalt-accent" />
              <span className="label-tech text-secondary text-[11px]">
                {locale === "en" ? "SECTION 08 // ENGAGE AEVORYN" : "القسم 08 // التواصل وبدء التعاقد"}
              </span>
            </div>
            <span className="label-tech text-muted text-[11px] hidden sm:inline">
              RIYADH COMMERCIAL HEADQUARTERS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Oversized Master Callout */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-hero-display text-primary font-display leading-[0.98] tracking-tight">
                {locale === "en" ? (
                  <>
                    LET&apos;S BUILD<br />
                    WHAT&apos;S NEXT.
                  </>
                ) : (
                  <>
                    لنبني معاً<br />
                    مستقبل الإنجاز.
                  </>
                )}
              </h2>

              <p className="body-large text-secondary leading-relaxed max-w-[620px]">
                {locale === "en"
                  ? "Connect with Aevoryn to discuss your infrastructure, manpower, materials and equipment requirements across Saudi Arabia."
                  : "تواصل مع إيفورين لمناقشة متطلبات مشاريعكم في البنية التحتية، القوى العاملة، المواد، والآليات في كافة أنحاء المملكة."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setRfqOpen(true)}
                  className="btn-cobalt flex items-center gap-2 group !h-12 !px-7 !rounded-xl"
                >
                  <span>{locale === "en" ? "REQUEST A CONSULTATION" : "طلب استشارة ومقايسة"}</span>
                  <Arrow className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>

                <Link
                  href="/contact"
                  className="btn-outline !h-12 !px-7 !rounded-xl"
                >
                  <span>{locale === "en" ? "VIEW CONTACT DIRECTORY" : "قنوات التواصل المباشرة"}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Verified Contact Directory */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl border border-hairline bg-surface space-y-6 shadow-card">
                <div>
                  <span className="label-tech text-cobalt-accent block mb-1 text-[11px]">
                    {locale === "en" ? "CONFIRMED PUBLIC LOCATION" : "المقر الرئيسي للإدارة"}
                  </span>
                  <h3 className="text-xl font-bold text-primary">
                    {locale === "en" ? "Riyadh Corporate Headquarters" : "المقر التنفيذي - الرياض"}
                  </h3>
                  <p className="text-xs text-secondary mt-1.5 flex items-start gap-2 leading-relaxed">
                    <MapPin className="w-4 h-4 text-cobalt-accent flex-shrink-0 mt-0.5" />
                    <span>Alahsa Street, Almalaz, Riyadh 11543, Saudi Arabia</span>
                  </p>
                </div>

                <div className="hairline-t pt-4 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Telephone:</span>
                    <a href="tel:+966173229527" className="font-mono text-primary hover:text-cobalt-accent font-semibold transition-colors">
                      +966 1732 29527
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">General Inquiries:</span>
                    <a href="mailto:info@aevoryn.net" className="font-mono text-primary hover:text-cobalt-accent font-medium transition-colors">
                      info@aevoryn.net
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Administration:</span>
                    <a href="mailto:admin@aevoryn.net" className="font-mono text-primary hover:text-cobalt-accent font-medium transition-colors">
                      admin@aevoryn.net
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Executive (CEO):</span>
                    <a href="mailto:ceo@aevoryn.net" className="font-mono text-primary hover:text-cobalt-accent font-medium transition-colors">
                      ceo@aevoryn.net
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Commercial Register:</span>
                    <span className="font-mono text-primary font-bold">7054401679</span>
                  </div>
                </div>

                {/* Baish Administrative Facility Flag */}
                <div className="p-4 rounded-xl border border-hairline bg-subtle text-[11px] text-secondary space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{locale === "en" ? "Administrative Note" : "إفصاح إداري"}</span>
                  </div>
                  <p className="leading-relaxed opacity-90">
                    {locale === "en"
                      ? "ISO documentation references an operational facility in Baish, Jizan Region. Riyadh serves as the confirmed corporate management headquarters."
                      : "تشير وثائق الآيزو إلى منشأة تشغيلية في بيش بمنطقة جازان. والرياض هي المقر التنفيذي المعتمد لإدارة المشاريع والتعاقدات."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </>
  );
}
