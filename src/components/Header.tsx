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
} from "lucide-react";

export function Header() {
  const { t, locale, isRTL } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [capabilitiesDropdown, setCapabilitiesDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

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
      title: locale === "en" ? "Infrastructure & Site Support" : "دعم البنية التحتية",
      desc: locale === "en" ? "Bulk grading & civil groundwork" : "الأعمال الترابية والمدنية",
      href: "/capabilities/infrastructure",
      icon: Building2,
    },
    {
      title: locale === "en" ? "Manpower Supply" : "القوى العاملة المتخصصة",
      desc: locale === "en" ? "Certified technical field workforce" : "كوادر فنية ومهنية معتمدة",
      href: "/capabilities/manpower",
      icon: HardHat,
    },
    {
      title: locale === "en" ? "Construction Materials" : "توريد مواد البناء",
      desc: locale === "en" ? "Aggregates & certified civil supply" : "سلاسل إمداد مواد مفحوصة",
      href: "/capabilities/materials",
      icon: Boxes,
    },
    {
      title: locale === "en" ? "Equipment Supply & Rental" : "تأجير الآليات والمعدات",
      desc: locale === "en" ? "Earthmovers & heavy plant machinery" : "آليات ثقيلة مع مشغلين",
      href: "/capabilities/equipment",
      icon: Truck,
    },
  ];

  return (
    <>
      {/* Top Credentials Micro-bar */}
      <div className="bg-[#0B1728] text-white text-[11px] py-2 border-b border-neutral-800/80 relative z-40">
        <div className="site-container flex items-center justify-between gap-4 font-mono-tech">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {locale === "en" ? "ARAMCO VENDOR:" : "مورد أرامكو:"}
            </span>
            <span className="text-white font-mono">10120422</span>
            <span className="text-neutral-600 hidden sm:inline">//</span>
            <span className="text-neutral-300 hidden sm:inline">
              ISO 9001 • 14001 • 45001
            </span>
            <span className="text-neutral-600 hidden md:inline">//</span>
            <span className="text-neutral-400 hidden md:inline">
              CR: 7054401679
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-neutral-300">
            <span className="text-neutral-400">RIYADH, SAUDI ARABIA</span>
            <span className="text-neutral-700">|</span>
            <a
              href="tel:+966173229527"
              className="hover:text-white transition-colors text-white font-mono flex items-center gap-1"
            >
              +966 1732 29527
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? "bg-page/95 backdrop-blur-md hairline-b shadow-sm"
            : "bg-page hairline-b"
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden p-1 bg-white border border-hairline shadow-sm transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <Image
                  src="/images/branding/aevoryn-logo.png"
                  alt="Aevoryn Services & Contracting Co."
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-[26px] tracking-tight text-primary leading-none">
                  AEVORYN
                </span>
                <span className="label-tech text-[10px] text-secondary tracking-widest pt-1 block">
                  {locale === "en" ? "SERVICES & CONTRACTING CO." : "للخدمات والمقاولات"}
                </span>
              </div>
            </Link>

            {/* Desktop Minimalist Navigation (13–15px) */}
            <nav className="hidden xl:flex items-center gap-7 nav-tech text-secondary">
              <Link
                href="/about"
                className={`transition-colors hover:text-cobalt-accent text-[14px] ${
                  pathname === "/about" ? "text-cobalt-accent font-bold" : ""
                }`}
              >
                {t("nav.about")}
              </Link>

              {/* Capabilities Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCapabilitiesDropdown(true)}
                onMouseLeave={() => setCapabilitiesDropdown(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 transition-colors hover:text-cobalt-accent nav-tech text-[14px] ${
                    pathname.startsWith("/capabilities") ? "text-cobalt-accent font-bold" : ""
                  }`}
                  aria-expanded={capabilitiesDropdown}
                >
                  <span>{t("nav.capabilities")}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {/* Dropdown Menu */}
                {capabilitiesDropdown && (
                  <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-80 pt-2 animate-editorial-fade-up">
                    <div className="bg-surface border border-hairline rounded-xl shadow-xl p-2 space-y-1">
                      {capabilities.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-subtle transition-colors text-start group/item"
                          >
                            <div className="w-8 h-8 rounded-md bg-wash text-cobalt-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary group-hover/item:text-cobalt-accent transition-colors">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-secondary line-clamp-1">{item.desc}</p>
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
                className={`transition-colors hover:text-cobalt-accent text-[14px] ${
                  pathname === "/certifications" ? "text-cobalt-accent font-bold" : ""
                }`}
              >
                {locale === "en" ? "QHSE & CERTIFICATIONS" : "الجودة والاعتمادات"}
              </Link>

              <Link
                href="/aramco-registration"
                className={`transition-colors hover:text-cobalt-accent text-[14px] ${
                  pathname === "/aramco-registration" ? "text-cobalt-accent font-bold" : ""
                }`}
              >
                {locale === "en" ? "ARAMCO REGISTRATION" : "تأهيل أرامكو"}
              </Link>

              <Link
                href="/clients"
                className={`transition-colors hover:text-cobalt-accent text-[14px] ${
                  pathname === "/clients" ? "text-cobalt-accent font-bold" : ""
                }`}
              >
                {t("nav.clients")}
              </Link>

              <Link
                href="/contact"
                className={`transition-colors hover:text-cobalt-accent text-[14px] ${
                  pathname === "/contact" ? "text-cobalt-accent font-bold" : ""
                }`}
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Right Controls: Language, Theme Toggle, Consultation CTA */}
            <div className="flex items-center gap-3">
              <LanguageToggle className="!h-10 !rounded-lg" />
              <ThemeToggle className="!h-10 !rounded-lg" />

              {/* Consultation CTA */}
              <button
                onClick={() => setRfqModalOpen(true)}
                className="hidden md:inline-flex btn-cobalt !h-10 !px-5 !rounded-lg text-xs"
              >
                {locale === "en" ? "CONSULTATION" : "طلب مقايسة"}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg border border-hairline bg-surface xl:hidden text-primary hover:border-cobalt-accent transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface hairline-b px-5 pt-4 pb-6 space-y-4 shadow-xl border-t border-hairline animate-editorial-fade-up">
            <nav className="flex flex-col space-y-1 text-sm font-mono-tech">
              <Link
                href="/"
                className="px-3 py-2.5 rounded-md hover:bg-subtle text-primary label-tech"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/about"
                className="px-3 py-2.5 rounded-md hover:bg-subtle text-primary label-tech"
              >
                {t("nav.about")}
              </Link>
              <div className="px-3 py-2 text-xs text-muted uppercase font-bold hairline-t pt-3">
                {t("nav.capabilities")}
              </div>
              {capabilities.map((c, idx) => (
                <Link
                  key={idx}
                  href={c.href}
                  className="px-6 py-2 rounded-md hover:bg-subtle text-sm text-secondary"
                >
                  {c.title}
                </Link>
              ))}
              <Link
                href="/certifications"
                className="px-3 py-2.5 rounded-md hover:bg-subtle text-primary label-tech hairline-t pt-3"
              >
                {locale === "en" ? "QHSE & CERTIFICATIONS" : "الجودة والاعتمادات"}
              </Link>
              <Link
                href="/aramco-registration"
                className="px-3 py-2.5 rounded-md hover:bg-subtle text-primary label-tech"
              >
                {locale === "en" ? "ARAMCO REGISTRATION" : "تأهيل أرامكو"}
              </Link>
              <Link
                href="/clients"
                className="px-3 py-2.5 rounded-md hover:bg-subtle text-primary label-tech"
              >
                {t("nav.clients")}
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2.5 rounded-md hover:bg-subtle text-primary label-tech"
              >
                {t("nav.contact")}
              </Link>
            </nav>

            <div className="pt-3 hairline-t">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRfqModalOpen(true);
                }}
                className="w-full btn-cobalt justify-center !rounded-lg"
              >
                {locale === "en" ? "REQUEST A CONSULTATION" : "طلب استشارة ومقايسة"}
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
