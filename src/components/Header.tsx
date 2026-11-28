"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { RFQModal } from "./RFQModal";
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  HardHat,
  Truck,
  Boxes,
  ShieldCheck,
  Award,
  FileText,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function Header() {
  const { t, locale, isRTL } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [capabilitiesDropdown, setCapabilitiesDropdown] = useState(false);
  const [complianceDropdown, setComplianceDropdown] = useState(false);
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false);
  const [mobileComplianceOpen, setMobileComplianceOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCapabilitiesDropdown(false);
    setComplianceDropdown(false);
  }, [pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (capabilitiesRef.current && !capabilitiesRef.current.contains(e.target as Node)) {
        setCapabilitiesDropdown(false);
      }
      if (complianceRef.current && !complianceRef.current.contains(e.target as Node)) {
        setComplianceDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const capabilities = [
    {
      title: locale === "en" ? "Project Development Support" : "دعم وتطوير المشاريع",
      desc: locale === "en" ? "Operational coordination & field support" : "التنسيق التشغيلي والدعم الفني الميداني",
      href: "/capabilities/infrastructure",
      icon: Building2,
    },
    {
      title: locale === "en" ? "Manpower Supply" : "توريد القوى العاملة",
      desc: locale === "en" ? "Skilled & general compliant labor" : "كوادر مهنية وعمالة عامة متوافقة",
      href: "/capabilities/manpower",
      icon: HardHat,
    },
    {
      title: locale === "en" ? "Construction Materials" : "توريد مواد البناء",
      desc: locale === "en" ? "Reliable sourcing & on-time delivery" : "توريد موثوق ونقل فعال للموقع",
      href: "/capabilities/materials",
      icon: Boxes,
    },
    {
      title: locale === "en" ? "Equipment Supply" : "توريد المعدات",
      desc: locale === "en" ? "Cranes & plant construction machinery" : "رافعات وآليات ومعدات للأعمال المدنية",
      href: "/capabilities/equipment",
      icon: Truck,
    },
  ];

  const complianceItems = [
    {
      title: locale === "en" ? "Triple ISO Certifications" : "شهادات الآيزو الثلاثية",
      desc: locale === "en" ? "ISO 9001, ISO 14001 & ISO 45001" : "نظم إدارة الجودة والبيئة والسلامة المهنية",
      href: "/certifications",
      icon: Award,
    },
    {
      title: locale === "en" ? "Saudi Aramco Registration" : "اعتماد أرامكو السعودية",
      desc: locale === "en" ? "Vendor Code 10120422 (Service Provider)" : "مزود خدمات معتمد برمز مورد 10120422",
      href: "/aramco-registration",
      icon: ShieldCheck,
    },
    {
      title: locale === "en" ? "Company Documents" : "وثائق الشركة الرسمية",
      desc: locale === "en" ? "CR, National Address proof & certifications" : "السجل التجاري والشهادات الرسمية المعتمدة",
      href: "/documents",
      icon: FileText,
    },
    {
      title: locale === "en" ? "QHSE Standards" : "معايير الجودة والسلامة",
      desc: locale === "en" ? "Quality, Health, Safety & Environment policies" : "سياسات وإجراءات الصحة والسلامة والبيئة",
      href: "/qhse",
      icon: FileCheck2,
    },
  ];

  return (
    <>
      {/* Top Credentials Micro-bar */}
      <div className="bg-[#0B1728] text-white text-[11px] py-2 border-b border-neutral-800 relative z-40">
        <div className="site-container flex items-center justify-between gap-3 font-mono-tech">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {locale === "en" ? "ARAMCO VENDOR:" : "مورد أرامكو:"}
            </span>
            <span className="text-white font-mono font-bold flex-shrink-0">10120422</span>
            <span className="text-neutral-600 hidden sm:inline">//</span>
            <span className="text-neutral-300 hidden sm:inline font-mono flex-shrink-0">
              ISO 9001 • 14001 • 45001
            </span>
            <span className="text-neutral-600 hidden md:inline">//</span>
            <span className="text-neutral-400 hidden md:inline flex-shrink-0">
              CR: <strong className="text-neutral-200 font-mono">7054401679</strong>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-neutral-300 text-[11px] flex-shrink-0">
            <span className="text-neutral-400 font-medium">
              {locale === "en" ? "BAISH REGISTERED FACILITY" : "المقر المسجل نظاماً - بيش"}
            </span>
            <span className="text-neutral-700">|</span>
            <a
              href="mailto:admin@aevoryn.net"
              className="hover:text-cobalt-accent transition-colors text-neutral-300 hover:text-white font-mono"
            >
              admin@aevoryn.net
            </a>
          </div>
        </div>
      </div>

      {/* Main Corporate Header (Height 80px-88px, 3 Structured Zones) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? "bg-page/95 backdrop-blur-md border-b border-hairline shadow-sm"
            : "bg-page border-b border-hairline"
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-[80px] lg:h-[88px] gap-3">
            {/* ZONE 1: LEFT: Official Brand Identity and Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              aria-label="Aevoryn Services & Contracting Co."
            >
              <div className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-xl overflow-hidden p-1 bg-white border border-hairline shadow-sm transition-transform duration-300 group-hover:scale-105 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/branding/aevoryn-logo.png"
                  alt="Aevoryn Emblem"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-display text-2xl lg:text-[26px] tracking-tight text-primary leading-none">
                  AEVORYN
                </span>
                <span className="font-body text-[10px] lg:text-[10.5px] font-semibold text-secondary tracking-[0.14em] uppercase pt-1 block leading-none">
                  {locale === "en" ? "SERVICES & CONTRACTING CO." : "للخدمات والمقاولات"}
                </span>
              </div>
            </Link>

            {/* ZONE 2: CENTER: Clean Grouped Desktop Navigation */}
            <nav className="hidden xl:flex items-center justify-center gap-5 2xl:gap-6 font-body text-[13.5px] font-medium text-secondary">
              <Link
                href="/about"
                className={`py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                  pathname === "/about" ? "text-cobalt-accent font-semibold" : ""
                }`}
              >
                {locale === "en" ? "About" : "من نحن"}
              </Link>

              {/* Capabilities Dropdown */}
              <div
                ref={capabilitiesRef}
                className="relative"
                onMouseEnter={() => setCapabilitiesDropdown(true)}
                onMouseLeave={() => setCapabilitiesDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setCapabilitiesDropdown(!capabilitiesDropdown)}
                  className={`flex items-center gap-1.5 py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent cursor-pointer ${
                    pathname.startsWith("/capabilities") ? "text-cobalt-accent font-semibold" : ""
                  }`}
                  aria-expanded={capabilitiesDropdown}
                >
                  <span>{locale === "en" ? "Capabilities" : "القدرات والخدمات"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${capabilitiesDropdown ? "rotate-180" : ""}`} />
                </button>

                {capabilitiesDropdown && (
                  <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-80 pt-2 animate-editorial-fade-up z-50">
                    <div className="bg-surface border border-hairline rounded-2xl shadow-xl p-2 space-y-1">
                      {capabilities.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-subtle transition-colors text-start group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-wash text-cobalt-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary group-hover/item:text-cobalt-accent transition-colors">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-secondary line-clamp-1 mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Compliance & QHSE Dropdown */}
              <div
                ref={complianceRef}
                className="relative"
                onMouseEnter={() => setComplianceDropdown(true)}
                onMouseLeave={() => setComplianceDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setComplianceDropdown(!complianceDropdown)}
                  className={`flex items-center gap-1.5 py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent cursor-pointer ${
                    ["/certifications", "/aramco-registration", "/documents", "/qhse"].includes(pathname)
                      ? "text-cobalt-accent font-semibold"
                      : ""
                  }`}
                  aria-expanded={complianceDropdown}
                >
                  <span>{locale === "en" ? "Compliance & QHSE" : "الاعتمادات والجودة"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${complianceDropdown ? "rotate-180" : ""}`} />
                </button>

                {complianceDropdown && (
                  <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-80 pt-2 animate-editorial-fade-up z-50">
                    <div className="bg-surface border border-hairline rounded-2xl shadow-xl p-2 space-y-1">
                      {complianceItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-subtle transition-colors text-start group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-wash text-cobalt-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary group-hover/item:text-cobalt-accent transition-colors">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-secondary line-clamp-1 mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/clients"
                className={`py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                  pathname === "/clients" ? "text-cobalt-accent font-semibold" : ""
                }`}
              >
                {locale === "en" ? "Clients & Partners" : "العملاء والشركاء"}
              </Link>

              <Link
                href="/supplier-registration"
                className={`py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                  pathname === "/supplier-registration" ? "text-cobalt-accent font-semibold" : ""
                }`}
              >
                {locale === "en" ? "Supplier Portal" : "بوابة الموردين"}
              </Link>

              <Link
                href="/contact"
                className={`py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                  pathname === "/contact" ? "text-cobalt-accent font-semibold" : ""
                }`}
              >
                {locale === "en" ? "Contact Us" : "اتصل بنا"}
              </Link>
            </nav>

            {/* ZONE 3: RIGHT: Utility Controls & Consultation CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              <LanguageToggle />
              <ThemeToggle />

              {/* Consultation CTA Button */}
              <button
                onClick={() => setRfqModalOpen(true)}
                className="hidden lg:inline-flex items-center justify-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-lg bg-cobalt-accent hover:bg-cobalt-hover text-white font-body text-xs font-bold tracking-wider uppercase shadow-sm transition-all duration-200 cursor-pointer flex-shrink-0"
              >
                <span>{locale === "en" ? "CONSULTATION" : "طلب مقايسة"}</span>
                <Arrow className="w-3.5 h-3.5" />
              </button>

              {/* Mobile / Tablet Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-lg border border-hairline bg-surface xl:hidden text-primary flex items-center justify-center hover:border-cobalt-accent transition-colors shadow-sm cursor-pointer flex-shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface border-b border-hairline px-4 sm:px-6 pt-3 pb-6 space-y-3 shadow-xl animate-editorial-fade-up max-h-[calc(100vh-120px)] overflow-y-auto">
            <nav className="flex flex-col space-y-1 font-body text-[14px] font-medium">
              <Link
                href="/"
                className="px-3.5 py-2.5 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "Home" : "الرئيسية"}
              </Link>

              <Link
                href="/about"
                className="px-3.5 py-2.5 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "About Us" : "من نحن"}
              </Link>

              {/* Mobile Capabilities Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileCapabilitiesOpen(!mobileCapabilitiesOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-subtle text-primary transition-colors text-start cursor-pointer"
                >
                  <span className="font-semibold">{locale === "en" ? "Capabilities & Divisions" : "القدرات والقطاعات التشغيلية"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCapabilitiesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileCapabilitiesOpen && (
                  <div className="mt-1 space-y-1 ltr:pl-4 rtl:pr-4 border-l rtl:border-l-0 rtl:border-r border-hairline my-1">
                    {capabilities.map((c, idx) => (
                      <Link
                        key={idx}
                        href={c.href}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-subtle text-[13px] text-secondary transition-colors"
                      >
                        <c.icon className="w-3.5 h-3.5 text-cobalt-accent flex-shrink-0" />
                        <span>{c.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Compliance Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileComplianceOpen(!mobileComplianceOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-subtle text-primary transition-colors text-start cursor-pointer"
                >
                  <span className="font-semibold">{locale === "en" ? "Compliance & Certifications" : "الاعتمادات والجودة والوثائق"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileComplianceOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileComplianceOpen && (
                  <div className="mt-1 space-y-1 ltr:pl-4 rtl:pr-4 border-l rtl:border-l-0 rtl:border-r border-hairline my-1">
                    {complianceItems.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-subtle text-[13px] text-secondary transition-colors"
                      >
                        <item.icon className="w-3.5 h-3.5 text-cobalt-accent flex-shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/clients"
                className="px-3.5 py-2.5 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "Clients & Partners" : "العملاء والشركاء"}
              </Link>

              <Link
                href="/supplier-registration"
                className="px-3.5 py-2.5 rounded-xl hover:bg-subtle text-cobalt-accent font-semibold transition-colors"
              >
                {locale === "en" ? "Supplier Portal" : "بوابة الموردين"}
              </Link>

              <Link
                href="/contact"
                className="px-3.5 py-2.5 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "Contact Us" : "اتصل بنا"}
              </Link>
            </nav>

            <div className="pt-3 border-t border-hairline">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRfqModalOpen(true);
                }}
                className="w-full h-11 rounded-xl bg-cobalt-accent hover:bg-cobalt-hover text-white font-body text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>{locale === "en" ? "REQUEST A CONSULTATION" : "طلب استشارة ومقايسة"}</span>
                <Arrow className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global RFQ / Consultation Modal */}
      <RFQModal isOpen={rfqModalOpen} onClose={() => setRfqModalOpen(false)} />
    </>
  );
}
