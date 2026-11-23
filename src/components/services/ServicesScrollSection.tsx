"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  HardHat,
  Boxes,
  Truck,
  Compass,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function ServicesScrollSection() {
  const { t, locale, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const services = [
    {
      id: "01",
      code: "CARD 01 // INFRASTRUCTURE",
      title: locale === "en" ? "INFRASTRUCTURE" : "البنية التحتية",
      subtitle: locale === "en" ? "Civil & Site Logistics" : "الأعمال المدنية واللوجستيات الميدانية",
      desc:
        locale === "en"
          ? "Infrastructure and project support solutions for large-scale development and industrial requirements: bulk grading, excavation, trenching, and foundational site preparation."
          : "حلول دعم البنية التحتية والمشاريع الكبرى: التسوية الشاملة، الحفريات العميقة، تمديد خطوط المرافق، وتجهيز طبقات التأسيس الإنشائية.",
      features: [
        "Bulk Earthmoving & Laser Grading",
        "Utility Trenching & Duct Banks",
        "Subbase Density & Proctor Testing",
      ],
      image: "/images/content/infrastructure.jpg",
      link: "/capabilities/infrastructure",
      icon: Building2,
    },
    {
      id: "02",
      code: "CARD 02 // MANPOWER",
      title: locale === "en" ? "MANPOWER" : "القوى العاملة",
      subtitle: locale === "en" ? "Certified Technical Workforce" : "الكوادر الفنية والمهنية المعتمدة",
      desc:
        locale === "en"
          ? "Scalable workforce solutions supporting operational and project requirements: certified QA/QC inspectors, safety officers, heavy equipment operators, and trade craftsmen."
          : "حلول حشد القوى العاملة المعتمدة: مسؤولو سلامة معتمدون من أرامكو، مراقبو جودة، مشغلو رافعات وآليات ثقيلة، وفنيو لحام وحدادة.",
      features: [
        "Saudi Aramco Approved Safety Officers",
        "Certified Heavy Plant Riggers & Drivers",
        "Full Qiwa & Labor Law Compliance",
      ],
      image: "/images/content/manpower.jpg",
      link: "/capabilities/manpower",
      icon: HardHat,
    },
    {
      id: "03",
      code: "CARD 03 // MATERIALS",
      title: locale === "en" ? "MATERIALS" : "توريد المواد",
      subtitle: locale === "en" ? "Certified Supply Chain" : "سلاسل إمداد مواد البناء المفحوصة",
      desc:
        locale === "en"
          ? "Construction and industrial materials sourcing and supply support: ASTM & SASO verified aggregates, base courses, structural fill, and bulk civil supply."
          : "توريد مواد البناء والإنشاءات الصناعية: توريد الركام والدفان الإنشائي المفحوص وفق معايير ASTM وهيئة المواصفات والمقاييس (SASO).",
      features: [
        "Mill Test Certificates (MTC) Archived",
        "Sieve Analysis & Lab Test Verification",
        "Immediate Jobsite Pour Logistics",
      ],
      image: "/images/content/materials.jpg",
      link: "/capabilities/materials",
      icon: Boxes,
    },
    {
      id: "04",
      code: "CARD 04 // EQUIPMENT",
      title: locale === "en" ? "EQUIPMENT" : "المعدات والآليات",
      subtitle: locale === "en" ? "Heavy Machinery & Plant" : "أسطول الآليات الثقيلة والمعدات",
      desc:
        locale === "en"
          ? "Equipment supply and rental support for project and operational needs: modern fleet of earthmovers, hydraulic excavators, mobile cranes, and site power generation."
          : "توريد وتأجير الآليات والمعدات الثقيلة: حفارات هيدروليكية، جرافات، رافعات تلسكوبية، ومولدات طاقة مؤقتة جاهزة للحشد الميداني.",
      features: [
        "Dry or Wet Lease with Certified Operators",
        "24/7 Mobile Maintenance & Telematics",
        "TUV / Third-Party Inspection Validated",
      ],
      image: "/images/content/equipment.jpg",
      link: "/capabilities/equipment",
      icon: Truck,
    },
    {
      id: "05",
      code: "CARD 05 // PROJECT SUPPORT",
      title: locale === "en" ? "PROJECT SUPPORT" : "دعم المشاريع",
      subtitle: locale === "en" ? "Turnkey Execution Alignment" : "المساندة التشغيلية الميدانية",
      desc:
        locale === "en"
          ? "Operational coordination, quality, safety, and turnkey subcontracting support designed to ensure schedule adherence under strict client specifications."
          : "التنسيق التشغيلي، وضبط الجودة والسلامة، والمساندة الميدانية للمقاولين لضمان الالتزام الدقيق بالجداول الزمنية والمواصفات المعتمدة.",
      features: [
        "Zero-Harm Safety Management",
        "Daily Progress & Milestone Audits",
        "Single-Source Accountability",
      ],
      image: "/images/content/about-hero.jpg",
      link: "/capabilities/infrastructure",
      icon: Compass,
    },
  ];

  // Track scroll position across pinned container
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

  // Compute horizontal translation percentage across the 5 cards
  const translateXPercent = scrollProgress * 68;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B1728] text-white selection:bg-cobalt-accent selection:text-white"
      style={{ minHeight: "280vh" }}
      aria-label="Aevoryn Core Capabilities Showcase"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-6 lg:py-10">
        {/* Massive Background Ghost Typography */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-start pointer-events-none select-none opacity-[0.04] whitespace-nowrap overflow-hidden"
          style={{
            transform: `translate3d(${isRTL ? translateXPercent * 0.4 : -translateXPercent * 0.4}%, 0, 0)`,
          }}
        >
          <span className="font-display text-[24vw] leading-none uppercase tracking-tighter">
            AEVORYN CAPABILITIES // INFRASTRUCTURE // LOGISTICS
          </span>
        </div>

        {/* Section Top Header Strip */}
        <div className="site-container relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
            <div className="space-y-3 max-w-[800px]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-cobalt-accent" />
                <span className="label-tech text-blue-400 text-[11px]">
                  {locale === "en" ? "SECTION 04 // SERVICES SCROLL EXPERIENCE" : "القسم 04 // استعراض مجالات الاختصاص"}
                </span>
              </div>
              <h2 className="text-h2 font-display tracking-tight text-white leading-none">
                {locale === "en" ? (
                  <>
                    EVERYTHING<br />
                    YOUR PROJECT NEEDS.<br />
                    UNDER ONE PARTNER.
                  </>
                ) : (
                  <>
                    كل ما يحتاجه<br />
                    مشروعك الهندسي.<br />
                    تحت مظلة شريك واحد.
                  </>
                )}
              </h2>
            </div>

            <p className="body-regular text-neutral-400 max-w-[420px] text-sm leading-relaxed">
              {locale === "en"
                ? "Integrated infrastructure support, manpower, materials and equipment solutions designed to support demanding industrial and development environments."
                : "حلول متكاملة للبنية التحتية، والكوادر البشرية، وتوريد المواد، والمعدات مصممة لمساندة بيئات المشاريع الصناعية والتنموية الكبرى."}
            </p>
          </div>
        </div>

        {/* Horizontal Moving Cards Track */}
        <div className="relative z-10 w-full my-auto overflow-hidden py-4">
          <div
            className="flex items-stretch gap-6 px-6 lg:px-12 transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(${isRTL ? translateXPercent : -translateXPercent}%, 0, 0)`,
            }}
          >
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[85vw] sm:w-[440px] lg:w-[460px] flex-shrink-0 bg-[#111F36] border border-neutral-800 hover:border-cobalt-accent rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-card hover:shadow-card-hover"
                >
                  {/* Card Media Preview (Consistent 16:9 ratio) */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-900 border-b border-neutral-800">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="460px"
                      className="object-cover filter contrast-[1.08] brightness-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111F36] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2.5 bg-[#0B1728]/90 backdrop-blur-md border border-neutral-700 rounded-lg">
                      <Icon className="w-5 h-5 text-cobalt-accent" />
                    </div>
                    <span className="absolute top-4 right-4 rtl:right-auto rtl:left-4 label-tech text-xs text-white/90 font-mono bg-[#0B1728]/85 px-3 py-1 rounded-full border border-neutral-800">
                      {item.id} / 05
                    </span>
                  </div>

                  {/* Card Editorial Content */}
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

                    <div className="pt-4 border-t border-neutral-800/80 space-y-2.5">
                      <span className="label-tech text-[10px] text-neutral-400 tracking-wider block">
                        {locale === "en" ? "CAPABILITY SPECIFICATIONS:" : "المواصفات والمعايير:"}
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

        {/* Bottom Scroll Progress Bar */}
        <div className="site-container relative z-10 w-full pt-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 font-mono">
            <span className="label-tech text-[10px]">SCROLL PROGRESS</span>
            <span className="label-tech font-mono text-white text-[10px]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cobalt-accent transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
