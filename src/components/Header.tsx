"use client";

import React, { useState, useEffect } from "react";
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
  Compass,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function Header() {
  const { t, locale, isRTL } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [capabilitiesDropdown, setCapabilitiesDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

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
  }, [pathname]);

  const capabilities = [
    {
      title: locale === "en" ? "Infrastructure & Site Support" : "دعم البنية التحتية والمشاريع",
      desc: locale === "en" ? "Bulk grading & civil groundwork" : "الأعمال الترابية والمدنية وتجهيز المواقع",
      href: "/capabilities/infrastructure",
      icon: Building2,
    },
    {
      title: locale === "en" ? "Manpower Supply" : "القوى العاملة المتخصصة",
      desc: locale === "en" ? "Certified technical field workforce" : "كوادر فنية ومهنية معتمدة لنظام قوى",
      href: "/capabilities/manpower",
      icon: HardHat,
    },
    {
      title: locale === "en" ? "Construction Materials" : "توريد مواد البناء",
      desc: locale === "en" ? "Aggregates & certified civil supply" : "سلاسل إمداد مواد مفحوصة ومعتمدة",
      href: "/capabilities/materials",
      icon: Boxes,
    },
    {
      title: locale === "en" ? "Equipment Supply & Rental" : "تأجير الآليات والمعدات الثقيلة",
      desc: locale === "en" ? "Earthmovers & heavy plant machinery" : "آليات ثقيلة مع مشغلين معتمدين",
      href: "/capabilities/equipment",
      icon: Truck,
    },
  ];

  return (
    <>
      {/* Top Credentials Micro-bar */}
      <div className="bg-[#0B1728] text-white text-[11px] py-2.5 border-b border-neutral-800 relative z-40">
        <div className="site-container flex items-center justify-between gap-4 font-mono-tech">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {locale === "en" ? "ARAMCO VENDOR:" : "مورد أرامكو:"}
            </span>
            <span className="text-white font-mono font-bold">10120422</span>
            <span className="text-neutral-600 hidden sm:inline">//</span>
            <span className="text-neutral-300 hidden sm:inline font-mono">
              ISO 9001 • 14001 • 45001
            </span>
            <span className="text-neutral-600 hidden md:inline">//</span>
            <span className="text-neutral-400 hidden md:inline">
              CR: <strong className="text-neutral-200 font-mono">7054401679</strong>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-neutral-300">
            <span className="text-neutral-400">RIYADH, SAUDI ARABIA</span>
            <span className="text-neutral-700">|</span>
            <a
              href="tel:+966173229527"
              className="hover:text-cobalt-accent transition-colors text-white font-mono flex items-center gap-1"
            >
              +966 1732 29527
            </a>
            <span className="text-neutral-700">|</span>
            <a
              href="mailto:info@aevoryn.net"
              className="hover:text-cobalt-accent transition-colors text-neutral-300 hover:text-white font-mono"
            >
              info@aevoryn.net
            </a>
          </div>
        </div>
      </div>

      {/* Main Corporate Header (Height 92px, 3 Structured Zones) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? "bg-page/95 backdrop-blur-md border-b border-hairline shadow-card"
            : "bg-page border-b border-hairline"
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-[92px] gap-4">
            {/* ZONE 1: LEFT — Official Brand Identity & Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group flex-shrink-0"
              aria-label="Aevoryn Services & Contracting Co."
            >
              <div className="relative w-[56px] h-[56px] rounded-xl overflow-hidden p-1 bg-white border border-hairline shadow-sm transition-transform duration-300 group-hover:scale-105 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/branding/aevoryn-logo.png"
                  alt="Aevoryn Emblem"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-display text-[26px] sm:text-[28px] tracking-tight text-primary leading-none">
                  AEVORYN
                </span>
                <span className="font-body text-[10.5px] sm:text-[11px] font-medium text-secondary tracking-[0.14em] uppercase pt-1 block leading-none">
                  {locale === "en" ? "SERVICES & CONTRACTING CO." : "للخدمات والمقاولات"}
                </span>
              </div>
            </Link>

            {/* ZONE 2: CENTER — Desktop Navigation (Archivo Medium, 14px, No Awkward Wrapping) */}
            <nav className="hidden xl:flex items-center justify-center gap-5 2xl:gap-7 font-body text-[14px] font-medium text-secondary">
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
                className="relative"
                onMouseEnter={() => setCapabilitiesDropdown(true)}
                onMouseLeave={() => setCapabilitiesDropdown(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                    pathname.startsWith("/capabilities") ? "text-cobalt-accent font-semibold" : ""
                  }`}
                  aria-expanded={capabilitiesDropdown}
                >
                  <span>{locale === "en" ? "Capabilities" : "القدرات والخدمات"}</span>
                  <ChevronDown className="w-4 h-4 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                {capabilitiesDropdown && (
                  <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-84 pt-2 animate-editorial-fade-up z-50">
                    <div className="bg-surface border border-hairline rounded-2xl shadow-xl p-2.5 space-y-1">
                      {capabilities.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-subtle transition-colors text-start group/item"
                          >
                            <div className="w-9 h-9 rounded-lg bg-wash text-cobalt-accent flex items-center justify-center flex-shrink-0 mt-0.5">
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
                href="/certifications"
                className={`py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                  pathname === "/certifications" ? "text-cobalt-accent font-semibold" : ""
                }`}
              >
                {locale === "en" ? "QHSE & Certifications" : "الجودة والاعتمادات"}
              </Link>

              <Link
                href="/aramco-registration"
                className={`py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                  pathname === "/aramco-registration" ? "text-cobalt-accent font-semibold" : ""
                }`}
              >
                {locale === "en" ? "Aramco Registration" : "تأهيل أرامكو"}
              </Link>

              <Link
                href="/clients"
                className={`py-2 whitespace-nowrap transition-colors hover:text-cobalt-accent ${
                  pathname === "/clients" ? "text-cobalt-accent font-semibold" : ""
                }`}
              >
                {locale === "en" ? "Clients & Partners" : "العملاء والشركاء"}
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

            {/* ZONE 3: RIGHT — Utility Controls & Consultation CTA (Height 48px) */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              <LanguageToggle />
              <ThemeToggle />

              {/* Consultation CTA Button (Height 48px) */}
              <button
                onClick={() => setRfqModalOpen(true)}
                className="hidden lg:inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-cobalt-accent hover:bg-cobalt-hover text-white font-body text-[13px] font-bold tracking-wider uppercase shadow-sm hover:shadow-card transition-all duration-200"
              >
                <span>{locale === "en" ? "CONSULTATION" : "طلب مقايسة"}</span>
                <Arrow className="w-3.5 h-3.5" />
              </button>

              {/* Mobile / Tablet Menu Hamburger (Height 48px) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-12 h-12 rounded-xl border border-hairline bg-surface xl:hidden text-primary flex items-center justify-center hover:border-cobalt-accent transition-colors shadow-sm"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface border-b border-hairline px-6 pt-4 pb-8 space-y-4 shadow-xl animate-editorial-fade-up">
            <nav className="flex flex-col space-y-1 font-body text-[15px] font-medium">
              <Link
                href="/"
                className="px-4 py-3 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "Home" : "الرئيسية"}
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "About Us" : "من نحن"}
              </Link>

              {/* Mobile Capabilities Submenu */}
              <div className="pt-2 pb-1">
                <span className="px-4 text-xs font-mono-tech text-muted uppercase tracking-wider block mb-2">
                  {locale === "en" ? "DIVISIONS & CAPABILITIES" : "القطاعات والقدرات التشغيلية"}
                </span>
                <div className="space-y-1 pl-2 rtl:pl-0 rtl:pr-2">
                  {capabilities.map((c, idx) => (
                    <Link
                      key={idx}
                      href={c.href}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-subtle text-[14px] text-secondary transition-colors"
                    >
                      <c.icon className="w-4 h-4 text-cobalt-accent" />
                      <span>{c.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/certifications"
                className="px-4 py-3 rounded-xl hover:bg-subtle text-primary transition-colors border-t border-hairline pt-3"
              >
                {locale === "en" ? "QHSE & Certifications" : "الجودة والاعتمادات"}
              </Link>
              <Link
                href="/aramco-registration"
                className="px-4 py-3 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "Saudi Aramco Registration" : "تأهيل أرامكو السعودية"}
              </Link>
              <Link
                href="/clients"
                className="px-4 py-3 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "Clients & Partners" : "العملاء والشركاء"}
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-xl hover:bg-subtle text-primary transition-colors"
              >
                {locale === "en" ? "Contact Us" : "اتصل بنا"}
              </Link>
            </nav>

            <div className="pt-4 border-t border-hairline">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRfqModalOpen(true);
                }}
                className="w-full h-12 rounded-xl bg-cobalt-accent hover:bg-cobalt-hover text-white font-body text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>{locale === "en" ? "REQUEST A CONSULTATION" : "طلب استشارة ومقايسة"}</span>
                <Arrow className="w-4 h-4" />
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
