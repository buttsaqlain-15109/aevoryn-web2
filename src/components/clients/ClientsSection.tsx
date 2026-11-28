"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { clientFacts } from "@/data/company.facts";

export function ClientsSection() {
  const { t, locale, isRTL } = useLanguage();

  const clients = clientFacts.verifiedList.map((c) => ({
    name: locale === "en" ? c.nameEn : c.nameAr,
  }));

  return (
    <section className="section-padding bg-page hairline-y relative">
      <div className="site-container">
        {/* Section Overline */}
        <div className="flex items-center justify-between pb-6 hairline-b mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-cobalt-accent" />
            <span className="label-tech text-secondary text-[11px]">
              {locale === "en" ? "CLIENT REGISTER // STRATEGIC COLLABORATIONS" : "سجل العملاء // التعاون المؤسسي"}
            </span>
          </div>
          <span className="label-tech text-muted text-[11px] hidden sm:inline">
            KINGDOM-WIDE ENGAGEMENT
          </span>
        </div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="text-h2 font-display text-primary leading-tight">
              {locale === "en" ? (
                <>
                  CONTRACTING PARTNERS &amp;<br />
                  INDUSTRY COLLABORATIONS.
                </>
              ) : (
                <>
                  شركاء المقاولات<br />
                  والتعاون الميداني بالمملكة.
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="body-regular text-secondary text-sm leading-relaxed">
              {locale === "en"
                ? "Subcontracting and support partnerships across industrial and infrastructure project developments in Saudi Arabia."
                : "شراكات مقاولات مساندة وثيقة تدعم إنجاز المشاريع الصناعية والتنموية بالمملكة."}
            </p>
          </div>
        </div>

        {/* 5 Minimalist Editorial Client Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl border border-hairline bg-surface hover:border-cobalt-accent shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between text-start space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <span className="label-tech text-cobalt-accent text-xs font-mono bg-wash px-2.5 py-1 rounded-md inline-block">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-display text-primary tracking-wide group-hover:text-cobalt-accent transition-colors">
                  {client.name}
                </h3>
              </div>

              <div className="pt-2 hairline-t">
                <span className="label-tech text-[10px] text-muted block uppercase">
                  {locale === "en" ? "Verified Partner" : "شريك معتمد"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Transparency Note */}
        <div className="mt-8 text-center">
          <p className="label-tech text-muted text-[11px]">
            {locale === "en"
              ? "All client references denote commercial contracting collaboration and subcontracting support."
              : "تشير كافة الإشارات أعلاه إلى التعاون في مجالات المقاولات المساندة والدعم التشغيلي الميداني."}
          </p>
        </div>
      </div>
    </section>
  );
}
