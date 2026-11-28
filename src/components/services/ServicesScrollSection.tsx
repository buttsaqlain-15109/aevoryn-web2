"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { divisionFacts } from "@/data/company.facts";
import {
  Building2,
  HardHat,
  Boxes,
  Truck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function ServicesScrollSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const divisionIcons = [Building2, HardHat, Boxes, Truck];
  const divisionImages = [
    "/images/content/infrastructure.jpg",
    "/images/content/manpower.jpg",
    "/images/content/materials.jpg",
    "/images/content/equipment.jpg",
  ];

  const services = divisionFacts.list.map((div, idx) => ({
    id: div.divisionNumber,
    code: `DIVISION ${div.divisionNumber}`,
    title: locale === "en" ? div.titleEn : div.titleAr,
    subtitle:
      locale === "en"
        ? idx === 0
          ? "Operational Coordination & Support"
          : idx === 1
          ? "Compliant Workforce Solutions"
          : idx === 2
          ? "Reliable Sourcing & Delivery"
          : "Heavy Plant & Machinery"
        : idx === 0
        ? "التنسيق التشغيلي والدعم الميداني"
        : idx === 1
        ? "حلول القوى العاملة المتوافقة"
        : idx === 2
        ? "توريد موثوق وتسليم للموقع"
        : "آليات ومعدات ثقيلة",
    desc: locale === "en" ? div.scopeSummaryEn : div.scopeSummaryAr,
    features: locale === "en" ? div.verbatimBulletsEn : div.verbatimBulletsAr,
    image: divisionImages[idx],
    link: div.route,
    icon: divisionIcons[idx],
  }));

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const progress = Math.max(0, Math.min(1, current / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateXPercent = scrollProgress * 55;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B1728] text-white selection:bg-cobalt-accent selection:text-white py-14 lg:py-0"
      style={{ minHeight: isDesktop ? "220vh" : "auto" }}
      aria-label="Aevoryn Core Capabilities Showcase"
    >
      <div className={isDesktop ? "sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8" : "w-full space-y-10"}>
        {isDesktop && (
          <div
            className="absolute inset-0 z-0 flex items-center justify-start pointer-events-none select-none opacity-[0.03] whitespace-nowrap overflow-hidden"
            style={{
              transform: `translate3d(${isRTL ? translateXPercent * 0.4 : -translateXPercent * 0.4}%, 0, 0)`,
            }}
          >
            <span className="font-display text-[24vw] leading-none uppercase tracking-tighter">
              AEVORYN CAPABILITIES • INFRASTRUCTURE • LOGISTICS
            </span>
          </div>
        )}

        <div className="site-container relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
            <div className="space-y-3 max-w-[800px]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-cobalt-accent" />
                <span className="label-tech text-blue-400 text-[11px]">
                  {locale === "en" ? "CORE CAPABILITIES • FOUR DIVISIONS" : "القطاعات الرئيسية • أربعة قطاعات متكاملة"}
                </span>
              </div>
              <h2 className="text-h2 font-display tracking-tight text-white leading-none">
                {locale === "en" ? (
                  <>
                    FOUR INTEGRATED<br />
                    CORE DIVISIONS.
                  </>
                ) : (
                  <>
                    أربعة قطاعات<br />
                    رئيسية متكاملة.
                  </>
                )}
              </h2>
            </div>

            <p className="body-regular text-neutral-400 max-w-[420px] text-sm leading-relaxed">
              {locale === "en"
                ? "Integrated contracting support, manpower, materials and equipment solutions designed to support demanding industrial environments."
                : "حلول متكاملة لدعم المقاولات، والكوادر البشرية، وتوريد المواد، والمعدات لمساندة بيئات المشاريع الصناعية."}
            </p>
          </div>
        </div>

        <div className={isDesktop ? "relative z-10 w-full my-auto overflow-hidden py-4" : "site-container relative z-10 w-full"}>
          <div
            className={
              isDesktop
                ? "flex items-stretch gap-6 px-6 lg:px-12 transition-transform duration-75 ease-out"
                : "grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            }
            style={
              isDesktop
                ? {
                    transform: `translate3d(${isRTL ? translateXPercent : -translateXPercent}%, 0, 0)`,
                  }
                : undefined
            }
          >
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-division-card="true"
                  className={
                    isDesktop
                      ? "w-[460px] flex-shrink-0 bg-[#111F36] border border-neutral-800 hover:border-cobalt-accent rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-card hover:shadow-card-hover"
                      : "w-full bg-[#111F36] border border-neutral-800 hover:border-cobalt-accent rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-card"
                  }
                >
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-900 border-b border-neutral-800">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 460px"
                      className="object-cover filter contrast-[1.08] brightness-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111F36] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2.5 bg-[#0B1728] border border-neutral-700 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="absolute top-4 right-4 rtl:right-auto rtl:left-4 label-tech text-xs text-white/90 font-mono bg-[#0B1728] px-3 py-1 rounded-full border border-neutral-700">
                      {item.id} / 04
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="label-tech text-blue-400 text-[11px]">{item.code}</span>
                        <span className="text-[11px] text-neutral-400 font-medium">{item.subtitle}</span>
                      </div>
                      <h3 className="text-h3 font-display tracking-tight text-white pt-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800/80 space-y-2">
                      <span className="label-tech text-[10px] text-neutral-400 tracking-wider block">
                        {locale === "en" ? "CORE SCOPE CAPABILITIES:" : "القدرات ونطاق العمل:"}
                      </span>
                      <ul className="space-y-1.5 text-xs text-neutral-300">
                        {item.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cobalt-accent flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-2 label-tech text-xs text-cobalt-accent hover:text-white transition-colors group/link"
                      >
                        <span>{locale === "en" ? "EXPLORE DIVISION SCOPE" : "تفاصيل القطاع"}</span>
                        <Arrow className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
