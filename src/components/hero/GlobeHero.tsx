"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { GlobeCanvas } from "@/components/globe/GlobeCanvas";
import { ArrowRight, ArrowLeft, ShieldCheck, Award, Building2 } from "lucide-react";

interface GlobeHeroProps {
  onOpenConsultation?: () => void;
  scrollProgress?: number;
}

export function GlobeHero({ onOpenConsultation, scrollProgress = 0 }: GlobeHeroProps) {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // Gentle, controlled opacity fade only when deep into the next section
  const heroOpacity = Math.max(0, Math.min(1, 1 - scrollProgress * 1.2));
  const heroTranslateY = scrollProgress * -30;

  return (
    <section
      aria-label="Aevoryn Master Hero"
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-page transition-colors duration-300"
      style={{
        opacity: heroOpacity,
        transform: `translate3d(0, ${heroTranslateY}px, 0)`,
        pointerEvents: heroOpacity < 0.1 ? "none" : "auto",
      }}
    >
      {/* Background Architectural Grid (Refined Minimalist hairline) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#2F63FF_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="site-container relative z-10 py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-7">
            {/* Overline Technical Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-wash border border-hairline shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cobalt-accent animate-pulse" />
              <span className="label-tech text-cobalt-accent text-[11px]">
                {locale === "en" ? "ENGINEERING PROGRESS // SAUDI ARABIA" : "هندسة التقدم والتطوير // المملكة العربية السعودية"}
              </span>
            </div>

            {/* Oversized Condensed Headline (Anton English / IBM Plex Arabic) */}
            <div className="space-y-1">
              <h1 className="text-hero-display text-primary font-display tracking-tight">
                {locale === "en" ? (
                  <>
                    BUILDING<br />
                    BEYOND<br />
                    BOUNDARIES.
                  </>
                ) : (
                  <>
                    نبني<br />
                    ما وراء<br />
                    الحدود.
                  </>
                )}
              </h1>
            </div>

            {/* Supporting Brand Copy */}
            <p className="body-large text-secondary leading-relaxed max-w-[620px]">
              {locale === "en"
                ? "Aevoryn Services & Contracting Co. brings together infrastructure support, manpower, materials and equipment to support industrial and development projects across Saudi Arabia."
                : "تجمع شركة إيفورين للخدمات والمقاولات بين دعم البنية التحتية، والكوادر البشرية، وتوريد المواد، والآليات الثقيلة لتمكين المشاريع الصناعية والتنموية الكبرى في المملكة العربية السعودية."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/capabilities/infrastructure"
                className="btn-cobalt group"
              >
                <span>{locale === "en" ? "EXPLORE OUR CAPABILITIES" : "استكشف قدراتنا"}</span>
                <Arrow className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="btn-outline"
              >
                <span>{locale === "en" ? "CONTACT OUR TEAM" : "تواصل مع فريقنا"}</span>
              </Link>
            </div>

            {/* Bottom Technical Accreditations Ticker */}
            <div className="pt-8 hairline-t flex flex-wrap items-center gap-6 text-xs text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="label-tech text-muted text-[11px]">
                  Aramco Vendor: <strong className="text-primary font-mono">10120422</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cobalt-accent flex-shrink-0" />
                <span className="label-tech text-muted text-[11px]">
                  ISO <strong className="text-primary font-mono">9001 • 14001 • 45001</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cobalt-accent flex-shrink-0" />
                <span className="label-tech text-muted text-[11px]">
                  CR: <strong className="text-primary font-mono">7054401679</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Dotted Rotating Earth Globe (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <GlobeCanvas size={500} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
