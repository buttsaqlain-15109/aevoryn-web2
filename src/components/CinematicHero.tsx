"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Award,
  HardHat,
  PhoneCall,
  FastForward,
  Layers,
  ChevronRight,
} from "lucide-react";

interface CinematicHeroProps {
  onOpenConsultation?: () => void;
}

export function CinematicHero({ onOpenConsultation }: CinematicHeroProps) {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const containerRef = useRef<HTMLElement>(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check reduced-motion and timer
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
      setIsSkipped(true);
      setIntroFinished(true);
      return;
    }

    // Auto-finish after 7.4 seconds
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 7400);

    // Keyboard listener for Escape key to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSkipped(true);
        setIntroFinished(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Subtle interactive parallax after intro settles
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply clamped movement (max +/- 8px) directly to CSS variables
    const moveX = Math.max(-10, Math.min(10, x * 16));
    const moveY = Math.max(-10, Math.min(10, y * 16));

    containerRef.current.style.setProperty("--mouse-x", `${moveX}px`);
    containerRef.current.style.setProperty("--mouse-y", `${moveY}px`);
  }, []);

  const handleSkipIntro = () => {
    setIsSkipped(true);
    setIntroFinished(true);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Aevoryn Infrastructure Hero"
      className={`relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#0B1220] ${
        isSkipped || reducedMotion ? "hero-skipped" : ""
      }`}
      style={{
        ["--mouse-x" as any]: "0px",
        ["--mouse-y" as any]: "0px",
      }}
    >
      {/* =========================================================================
          SCENE 1: ARCHITECTURAL SLIDING SHUTTER PANELS (0 - 1.3s)
          ========================================================================= */}
      {!isSkipped && !reducedMotion && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {/* Left Shutter Panel */}
          <div
            className="cinematic-shutter anim-shutter-left absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-[#060B14] via-[#0A1220] to-[#0E1A2C] border-r border-[#28394E] shadow-[inset_-2px_0_10px_rgba(40,118,189,0.3)] z-30"
            style={{ willChange: "transform" }}
          >
            {/* Subtle Brushed Metal Texture & Vertical Accent Line */}
            <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b from-[#123D70] via-[#2876BD] to-[#123D70] opacity-80" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#438DD0_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>

          {/* Right Shutter Panel */}
          <div
            className="cinematic-shutter anim-shutter-right absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-[#060B14] via-[#0A1220] to-[#0E1A2C] border-l border-[#28394E] shadow-[inset_2px_0_10px_rgba(40,118,189,0.3)] z-30"
            style={{ willChange: "transform" }}
          >
            {/* Matching Vertical Accent Line */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#123D70] via-[#2876BD] to-[#123D70] opacity-80" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#438DD0_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>

          {/* Center Emblem Lock that parts during opening */}
          <div
            className="cinematic-emblem anim-shutter-emblem absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-32 h-32 rounded-full p-1 bg-gradient-to-br from-white via-slate-200 to-slate-400 shadow-[0_0_40px_rgba(40,118,189,0.6)] border-2 border-[#2876BD]"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src="/images/aevoryn-logo-circle.png"
                alt="Aevoryn Emblem"
                fill
                priority
                className="object-contain p-1"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SKIP INTRO CONTROL (Top-right pill)
          ========================================================================= */}
      {!introFinished && !reducedMotion && !isSkipped && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-6 right-6 rtl:right-auto rtl:left-6 z-40 px-3.5 py-1.5 rounded-full bg-[#101A28]/80 hover:bg-[#172438] border border-[#28394E] text-slate-300 hover:text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-2 shadow-lg"
          aria-label={locale === "en" ? "Skip introductory animation" : "تخطي الرسوم المتحركة"}
        >
          <span>{locale === "en" ? "Skip Intro" : "تخطي المقدمة"}</span>
          <FastForward className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">(Esc)</span>
        </button>
      )}

      {/* =========================================================================
          SCENE 2 & 3: MULTI-LAYER PARALLAX STAGE (4 Visual Layers)
          ========================================================================= */}

      {/* Layer 1: Atmospheric Background (Sky, horizon & twilight atmosphere) */}
      <div
        className="anim-camera-zoom absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: `translate3d(calc(var(--mouse-x) * 0.3), calc(var(--mouse-y) * 0.3), 0)`,
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      >
        <Image
          src="/images/content/hero-industrial.jpg"
          alt="Saudi Arabia Industrial Infrastructure"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.42] contrast-[1.12]"
        />

        {/* Cinematic Gradient Overlays for High Text Contrast in Both Themes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/95 via-[#0B1220]/80 to-[#0B1220]/60 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-[#0B1220]/70" />
      </div>

      {/* Layer 2: Mid-background (Industrial structures & facilities) */}
      <div
        className="anim-layer-mid absolute inset-0 z-1 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          transform: `translate3d(calc(var(--mouse-x) * 0.6), calc(var(--mouse-y) * 0.6), 0)`,
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      >
        <Image
          src="/images/content/aramco-industrial.jpg"
          alt="Industrial Facilities Silhouette"
          fill
          sizes="100vw"
          className="object-cover object-bottom filter contrast-125 opacity-25"
        />
      </div>

      {/* Layer 3: Foreground (Heavy equipment & construction framework) */}
      <div
        className="anim-layer-fore absolute inset-0 z-2 pointer-events-none"
        style={{
          transform: `translate3d(calc(var(--mouse-x) * 0.9), calc(var(--mouse-y) * 0.9), 0)`,
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      >
        {/* Subtle Silhouette Gradients representing ground engineering layers */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/60 to-transparent" />
      </div>

      {/* Layer 4: Front Layer (Subtle Technical HUD Grid & Light Scan) */}
      <div className="absolute inset-0 z-3 pointer-events-none opacity-15 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#438DD0_1px,transparent_1px)] [background-size:28px_28px]" />
        <div
          className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 pointer-events-none"
          style={{
            animation: "ambientSweep 12s infinite ease-in-out",
          }}
        />
      </div>

      {/* =========================================================================
          SCENE 4 & 5: BRAND HEADLINE, CTAS & LIVE STATS
          ========================================================================= */}
      <div className="site-container py-12 sm:py-18 lg:py-24 relative z-10 w-full">
        <div className="max-w-[1100px] space-y-7">
          {/* Supporting Kicker: Scene 4 */}
          <div className="anim-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101A28]/85 border border-[#438DD0]/35 shadow-[0_4px_16px_rgba(0,0,0,0.5)] text-blue-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="label-text uppercase tracking-widest text-blue-300">
              {locale === "en" ? "AEVORYN SERVICES & CONTRACTING CO." : "شركة إيفورين للخدمات والمقاولات"}
            </span>
          </div>

          {/* Master Headline: Scene 4 (Section 2 Scale: clamp(44px, 7vw, 96px)) */}
          <h1 className="anim-headline hero-headline text-white drop-shadow-md">
            {t("hero.headline")}
          </h1>

          {/* Supporting Text: Scene 4/5 (Section 2 Scale: Body Large, max 760px) */}
          <p className="anim-subheadline body-large text-slate-200 drop-shadow">
            {t("hero.subheadline")}
          </p>

          {/* Scene 5: CTAs (Section 8 Button Standard: 48px height, 24px px, 8px radius, 15px font) */}
          <div className="anim-ctas flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/capabilities/infrastructure"
              className="btn-primary flex items-center gap-2 group transition-all"
            >
              <span>{t("hero.exploreBtn")}</span>
              <Arrow className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="btn-secondary flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>{t("hero.consultationBtn")}</span>
            </button>
          </div>

          {/* Scene 5: Live Industrial Stats Bar (Section 7 Radii: 12px) */}
          <div className="anim-stats pt-8 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Stat 1: Saudi Aramco */}
            <div className="p-4 rounded-[12px] bg-[#101A28]/75 border border-[#28394E] backdrop-blur-md neu-subtle">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{t("hero.stats.aramco")}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono font-medium">
                {t("hero.stats.aramcoSub")}
              </p>
            </div>

            {/* Stat 2: Core Divisions */}
            <div className="p-4 rounded-[12px] bg-[#101A28]/75 border border-[#28394E] backdrop-blur-md neu-subtle">
              <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold mb-1">
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span>{t("hero.stats.divisions")}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                {t("hero.stats.divisionsSub")}
              </p>
            </div>

            {/* Stat 3: Triple ISO */}
            <div className="p-4 rounded-[12px] bg-[#101A28]/75 border border-[#28394E] backdrop-blur-md neu-subtle">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span>{t("hero.stats.iso")}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                {t("hero.stats.isoSub")}
              </p>
            </div>

            {/* Stat 4: QHSE */}
            <div className="p-4 rounded-[12px] bg-[#101A28]/75 border border-[#28394E] backdrop-blur-md neu-subtle">
              <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold mb-1">
                <HardHat className="w-4 h-4 flex-shrink-0" />
                <span>{t("hero.stats.qhse")}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                {t("hero.stats.qhseSub")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
