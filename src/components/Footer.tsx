"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

export function Footer() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <footer className="bg-[#0B1220] text-slate-300 border-t border-[#172438] relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="site-container pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1E2D42]">
          {/* Column 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden p-0.5 bg-white shadow-lg border border-slate-300">
                <Image
                  src="/images/aevoryn-logo-circle.png"
                  alt="Aevoryn Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-wider block">
                  AEVORYN
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                  {locale === "en" ? "Services & Contracting Co." : "للخدمات والمقاولات"}
                </span>
                <span className="text-[10px] text-blue-400 font-mono">
                  CR: 7054401679
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t("footer.aboutText")}
            </p>

            {/* Strategic Accreditation Badges */}
            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-[12px] bg-[#101A28] border border-[#28394E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-200 block">
                    {locale === "en" ? "Saudi Aramco Registered Supplier" : "مسجل في نظام إدارة الموردين لدى أرامكو"}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    Vendor Code: 10120422 • E-Ref: 0019448
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-[12px] bg-[#101A28] border border-[#28394E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-blue-500/15 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-200 block">
                    {locale === "en" ? "Certified Management Systems" : "أنظمة إدارة معتمدة دولياً"}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ISO 9001:2015 • ISO 14001:2015 • ISO 45001:2018
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-b border-[#1E2D42] pb-2">
              {t("footer.divisions")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/capabilities/infrastructure"
                  className="hover:text-blue-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t("capabilities.items.0.title")}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities/manpower"
                  className="hover:text-blue-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t("capabilities.items.1.title")}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities/materials"
                  className="hover:text-blue-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t("capabilities.items.2.title")}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities/equipment"
                  className="hover:text-blue-400 transition-colors flex items-center justify-between group"
                >
                  <span>{t("capabilities.items.3.title")}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/qhse"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  {t("nav.qhse")}
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  {t("nav.certifications")}
                </Link>
              </li>
              <li>
                <Link
                  href="/aramco-registration"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  {t("nav.aramco")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Info & Address (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-b border-[#1E2D42] pb-2">
              {t("footer.headquarters")}
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">
                    {locale === "en" ? "Riyadh Management Headquarters" : "المقر الرئيسي للإدارة - الرياض"}
                  </p>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Alahsa Street, Almalaz, Riyadh 11543, Kingdom of Saudi Arabia
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+966173229527" className="hover:text-white font-mono">
                  +966 1732 29527
                </a>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:admin@aevoryn.net" className="hover:text-white font-mono text-[11px]">
                    admin@aevoryn.net
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:ceo@aevoryn.net" className="hover:text-white font-mono text-[11px]">
                    ceo@aevoryn.net
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:chairman@aevoryn.net" className="hover:text-white font-mono text-[11px]">
                    chairman@aevoryn.net
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Administrative Flag & Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-b border-[#1E2D42] pb-2">
              {t("footer.governance")}
            </h4>
            <div className="p-3 rounded-[12px] bg-[#101A28] border border-amber-500/20 text-[10px] space-y-1 text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{locale === "en" ? "Address Disclosure" : "إفصاح إداري"}</span>
              </div>
              <p className="leading-relaxed opacity-80">
                {t("brand.baishNote")}
              </p>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <p>Domain: aevoryn.net</p>
              <p>Classification: Infrastructure Services</p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 {t("brand.name")}. {t("footer.rights")}
          </p>

          <p className="text-[11px] text-slate-500">
            {t("footer.crNotice")}
          </p>
        </div>
      </div>
    </footer>
  );
}
