"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Handshake, Building2, CheckCircle2 } from "lucide-react";

export function ClientsSection() {
  const { t, locale, isRTL } = useLanguage();

  const clients = [
    {
      name: "Alfanar",
      category: locale === "en" ? "Industrial EPC & Energy" : "المقاولات الصناعية والطاقة",
      scope: locale === "en" ? "Civil Infrastructure & Workforce Support" : "أعمال البنية التحتية والكوادر الفنية",
    },
    {
      name: "Masco",
      category: locale === "en" ? "Civil Infrastructure" : "الهندسة المدنية والإنشاءات",
      scope: locale === "en" ? "Heavy Equipment Rental & Site Preparation" : "تأجير الآليات وتجهيز المواقع",
    },
    {
      name: "Aldsfey",
      category: locale === "en" ? "General Contracting" : "المقاولات العامة",
      scope: locale === "en" ? "Materials Logistics & Specialized Trades" : "توريد المواد والمهن التخصصية",
    },
    {
      name: "Tamimi",
      category: locale === "en" ? "Commercial & Industrial Development" : "التطوير التجاري والصناعي",
      scope: locale === "en" ? "Project Groundworks & Subbase Preparation" : "الأعمال الترابية وطبقات التأسيس",
    },
    {
      name: "China Harbour",
      category: locale === "en" ? "Marine & Heavy Infrastructure" : "الإنشاءات البحرية والبنية التحتية",
      scope: locale === "en" ? "Earthmoving Machinery & Civil Operations" : "آليات الحفر والدعم الميداني",
    },
  ];

  return (
    <section className="section-padding bg-page hairline-y relative">
      <div className="site-container">
        {/* Section Overline */}
        <div className="flex items-center justify-between pb-6 hairline-b mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-cobalt-accent" />
            <span className="label-tech text-secondary text-[11px]">
              {locale === "en" ? "SECTION 07 // CLIENTS & COLLABORATIONS" : "القسم 07 // الشركاء والتعاون المؤسسي"}
            </span>
          </div>
          <span className="label-tech text-muted text-[11px] hidden sm:inline">
            KINGDOM-WIDE EPC ENGAGEMENT
          </span>
        </div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="text-h2 font-display text-primary leading-tight">
              {locale === "en" ? (
                <>
                  TRUSTED BY INDUSTRY<br />
                  LEADERS ACROSS THE KINGDOM.
                </>
              ) : (
                <>
                  شراكات موثوقة مع كبرى<br />
                  شركات المقاولات بالمملكة.
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="body-regular text-secondary text-sm leading-relaxed">
              {locale === "en"
                ? "Durable subcontracting partnerships supporting critical path milestones across Saudi industrial and giga-project developments."
                : "شراكات مقاولات مساندة وثيقة تدعم إنجاز المراحل الحرجة في كبرى المشاريع الصناعية والتنموية بالمملكة."}
            </p>
          </div>
        </div>

        {/* 5 Minimalist Editorial Client Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl border border-hairline bg-surface hover:border-cobalt-accent shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between text-start space-y-5 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <span className="label-tech text-cobalt-accent text-xs font-mono bg-wash px-2.5 py-1 rounded-md inline-block">
                  0{idx + 1}
                </span>
                <h3 className="text-2xl font-display text-primary tracking-wide group-hover:text-cobalt-accent transition-colors">
                  {client.name}
                </h3>
                <span className="label-tech text-[10px] text-muted block">
                  {client.category}
                </span>
              </div>

              <div className="pt-3 hairline-t">
                <p className="text-xs text-secondary leading-relaxed">
                  {client.scope}
                </p>
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
