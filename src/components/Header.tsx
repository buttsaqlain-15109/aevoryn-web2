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
  Layers,
  Award,
  ShieldCheck,
  CheckCircle,
  PhoneCall,
  FileText,
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCapabilitiesDropdown(false);
  }, [pathname]);

  const capabilities = [
    {
      title: t("capabilities.items.0.title"),
      desc: t("capabilities.items.0.subtitle"),
      href: "/capabilities/infrastructure",
      icon: Building2,
    },
    {
      title: t("capabilities.items.1.title"),
      desc: t("capabilities.items.1.subtitle"),
      href: "/capabilities/manpower",
      icon: HardHat,
    },
    {
      title: t("capabilities.items.2.title"),
      desc: t("capabilities.items.2.subtitle"),
      href: "/capabilities/materials",
      icon: Layers,
    },
    {
      title: t("capabilities.items.3.title"),
      desc: t("capabilities.items.3.subtitle"),
      href: "/capabilities/equipment",
      icon: Truck,
    },
  ];

  return (
    <>
      {/* Top Credentials Announcement Ticker */}
      <div className="bg-[#0B2545] text-white text-[11px] sm:text-xs py-1.5 border-b border-[#123D70] relative z-40">
        <div className="site-container flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {locale === "en" ? "Saudi Aramco Registered Vendor:" : "مورد معتمد لدى أرامكو السعودية:"}
            </span>
            <span className="font-mono text-slate-200">10120422</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">
              {locale === "en" ? "Triple ISO Certified 9001 / 14001 / 45001" : "معتمد بشهادات آيزو 9001 / 14001 / 45001"}
            </span>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">
              CR: 7054401679
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-brand-accent" />
              <a href="tel:+966173229527" className="hover:text-white transition-colors">
                +966 1732 29527
              </a>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              {locale === "en" ? "Riyadh, Kingdom of Saudi Arabia" : "الرياض، المملكة العربية السعودية"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-header shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md border-b border-subtle"
            : "bg-surface/90 backdrop-blur-sm border-b border-subtle"
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-white to-slate-200 shadow-md border border-slate-300/80 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/aevoryn-logo-circle.png"
                  alt="Aevoryn Official Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-wider text-primary leading-tight">
                  AEVORYN
                </span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-muted">
                  {locale === "en" ? "Services & Contracting Co." : "للخدمات والمقاولات"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 nav-text font-medium text-secondary">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                  pathname === "/" ? "text-brand-primary font-bold bg-brand-primary/5" : ""
                }`}
              >
                {t("nav.home")}
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                  pathname === "/about" ? "text-brand-primary font-bold bg-brand-primary/5" : ""
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
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                    pathname.startsWith("/capabilities") ? "text-brand-primary font-bold bg-brand-primary/5" : ""
                  }`}
                  aria-expanded={capabilitiesDropdown}
                >
                  <span>{t("nav.capabilities")}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {/* Dropdown Menu */}
                {capabilitiesDropdown && (
                  <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-surface border border-subtle rounded-[12px] shadow-xl p-2 neu-raised space-y-1">
                      {capabilities.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-[8px] hover:bg-elevated transition-colors text-start"
                          >
                            <div className="w-8 h-8 rounded-[8px] bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary">{item.title}</p>
                              <p className="text-[11px] text-muted line-clamp-1">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/qhse"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                  pathname === "/qhse" ? "text-brand-primary font-bold bg-brand-primary/5" : ""
                }`}
              >
                {t("nav.qhse")}
              </Link>

              <Link
                href="/certifications"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                  pathname === "/certifications" ? "text-brand-primary font-bold bg-brand-primary/5" : ""
                }`}
              >
                {t("nav.certifications")}
              </Link>

              <Link
                href="/aramco-registration"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                  pathname === "/aramco-registration" ? "text-brand-primary font-bold bg-brand-primary/5" : ""
                }`}
              >
                {t("nav.aramco")}
              </Link>

              <Link
                href="/clients"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                  pathname === "/clients" ? "text-brand-primary font-bold bg-brand-primary/5" : ""
                }`}
              >
                {t("nav.clients")}
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 rounded-lg transition-colors hover:text-brand-primary ${
                  pathname === "/contact" ? "text-brand-primary font-bold bg-brand-primary/5" : ""
                }`}
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Right Controls: Language, Theme Toggle, RFQ CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageToggle />
              <ThemeToggle />

              {/* Consultation / RFQ CTA */}
              <button
                onClick={() => setRfqModalOpen(true)}
                className="hidden md:inline-flex btn-primary !h-[42px] !min-h-[42px] !px-4 text-[13px]"
              >
                {t("nav.requestConsultation")}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-[8px] neu-button xl:hidden text-primary"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface border-b border-subtle px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-1 text-sm font-medium">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg hover:bg-elevated text-primary"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-lg hover:bg-elevated text-primary"
              >
                {t("nav.about")}
              </Link>

              {/* Mobile Capabilities Sublist */}
              <div className="py-1">
                <span className="px-3 text-xs font-bold uppercase tracking-wider text-muted">
                  {t("nav.capabilities")}
                </span>
                <div className="mt-1 pl-3 rtl:pl-0 rtl:pr-3 space-y-1">
                  {capabilities.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block px-3 py-1.5 text-xs text-secondary hover:text-primary rounded-lg hover:bg-elevated"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/qhse"
                className="px-3 py-2 rounded-lg hover:bg-elevated text-primary"
              >
                {t("nav.qhse")}
              </Link>
              <Link
                href="/certifications"
                className="px-3 py-2 rounded-lg hover:bg-elevated text-primary"
              >
                {t("nav.certifications")}
              </Link>
              <Link
                href="/aramco-registration"
                className="px-3 py-2 rounded-lg hover:bg-elevated text-primary"
              >
                {t("nav.aramco")}
              </Link>
              <Link
                href="/clients"
                className="px-3 py-2 rounded-lg hover:bg-elevated text-primary"
              >
                {t("nav.clients")}
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-lg hover:bg-elevated text-primary"
              >
                {t("nav.contact")}
              </Link>
            </nav>

            <div className="pt-3 border-t border-subtle flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRfqModalOpen(true);
                }}
                className="w-full btn-primary text-center justify-center"
              >
                {t("nav.requestConsultation")}
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
