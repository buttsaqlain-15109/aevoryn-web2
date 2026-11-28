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
                {locale === "en" ? "CONTACT & ESTIMATION // COMMERCIAL INQUIRIES" : "التواصل وبدء التعاقد // الاستفسارات التجارية"}
              </span>
            </div>
            <span className="label-tech text-muted text-[11px] hidden sm:inline">
              BAISH REGISTERED OFFICE // PROJECT MOBILIZATION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Commercial Callout */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-hero-display text-primary font-display leading-[0.98] tracking-tight">
                {locale === "en" ? (
                  <>
                    COMMERCIAL INQUIRIES &amp;<br />
                    PROJECT ESTIMATION.
                  </>
                ) : (
                  <>
                    الاستفسارات التجارية<br />
                    وعروض أسعار المشاريع.
                  </>
                )}
              </h2>

              <p className="body-large text-secondary leading-relaxed max-w-[620px]">
                {locale === "en"
                  ? "Contact our commercial estimation and operations team in Riyadh to submit project specifications, inspect equipment availability, or schedule workforce deployment across the Kingdom."
                  : "تواصل مع فريق التقدير التجاري والعمليات الميدانية بالرياض لتقديم مواصفات المشاريع، أو الاستفسار عن جاهزية المعدات، أو جدولة حشد الكوادر الفنية بالمملكة."}
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
                    {locale === "en" ? "REGISTERED LEGAL LOCATION" : "المقر القانوني المسجل"}
                  </span>
                  <h3 className="text-xl font-bold text-primary">
                    {locale === "en" ? "Baish Registered Facility" : "المقر المسجل - بيش"}
                  </h3>
                  <p className="text-xs text-secondary mt-1.5 flex items-start gap-2 leading-relaxed">
                    <MapPin className="w-4 h-4 text-cobalt-accent flex-shrink-0 mt-0.5" />
                    <span>
                      {locale === "en"
                        ? "Building No. 7140, Zaid Ibn Al Khattab Street, An Nahdah Dist., Zipcode 87311, Baish, Jazan Region, Saudi Arabia"
                        : "مبنى رقم 7140، شارع زيد بن الخطاب، حي النهضة، الرمز البريدي 87311، بيش، منطقة جازان، المملكة العربية السعودية"}
                    </span>
                  </p>
                </div>

                <div className="hairline-t pt-4 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Official Administration:</span>
                    <a href="mailto:admin@aevoryn.net" className="font-mono text-primary hover:text-cobalt-accent font-medium transition-colors">
                      admin@aevoryn.net
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Commercial Register:</span>
                    <span className="font-mono text-primary font-bold">7054401679</span>
                  </div>
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
