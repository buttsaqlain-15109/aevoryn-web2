"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import testimonialsData from "@/data/testimonials.json";

interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  company: string;
  project?: string;
  quoteEn: string;
  quoteAr: string;
}

export function TestimonialsSection() {
  const { locale } = useLanguage();
  const testimonials = (testimonialsData as Testimonial[]) || [];

  // When 0 entries exist, the section is completely hidden from public view
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-surface border-t border-hairline" id="testimonials">
      <div className="site-container">
        <div className="text-center max-w-[840px] mx-auto space-y-3 mb-12">
          <span className="badge-tech inline-block">
            {locale === "en" ? "VERIFIED CONTRACTOR STATEMENTS" : "شهادات العملاء الموثقة"}
          </span>
          <h2 className="text-h2 font-display text-primary uppercase">
            {locale === "en" ? "Contractor Performance & Verification" : "تقييمات الأداء من الشركاء والمقاولين"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 border border-hairline bg-page rounded-xl space-y-4">
              <p className="text-sm font-body text-secondary leading-relaxed">
                &ldquo;{locale === "en" ? t.quoteEn : t.quoteAr}&rdquo;
              </p>
              <div className="pt-3 border-t border-hairline">
                <p className="font-bold text-xs text-primary">{t.clientName}</p>
                <p className="text-[11px] text-muted font-body">
                  {t.clientTitle} &bull; {t.company}
                </p>
                {t.project && (
                  <p className="text-[10px] text-muted font-mono-tech mt-0.5">
                    {locale === "en" ? "Project: " : "المشروع: "}{t.project}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
