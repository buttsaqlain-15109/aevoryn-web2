"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, ShieldCheck, Award, AlertTriangle, ArrowUpRight } from "lucide-react";

export function Footer() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <footer className="bg-[#111111] text-neutral-300 border-t border-neutral-800 relative overflow-hidden">
      <div className="site-container pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Column 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden p-0.5 bg-white border border-neutral-700">
                <Image
                  src="/images/aevoryn-logo-circle.png"
                  alt="Aevoryn Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display text-2xl text-white tracking-tight block leading-none">
                  AEVORYN
                </span>
                <span className="label-tech text-[10px] text-neutral-400 block pt-1">
                  {locale === "en" ? "SERVICES & CONTRACTING CO." : "للخدمات والمقاولات"}
                </span>
                <span className="label-tech text-[10px] text-blue-400 font-mono block">
                  CR: 7054401679
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {locale === "en"
                ? "Aevoryn Services & Contracting Co. delivers integrated civil infrastructure, certified manpower, construction materials, and heavy equipment logistics across Saudi Arabia."
                : "تقدم شركة إيفورين للخدمات والمقاولات حلولاً متكاملة لدعم البنية التحتية، والكوادر البشرية المعتمدة، ومواد البناء، والآليات الثقيلة في كافة أنحاء المملكة."}
            </p>

            {/* Strategic Accreditation Badges */}
            <div className="space-y-2 pt-1 font-mono-tech">
              <div className="p-3 border border-neutral-800 bg-[#161C26] flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-white block">
                    Saudi Aramco Registered Vendor
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    Vendor Code: 10120422 // E-Ref: 0019448
                  </span>
                </div>
              </div>

              <div className="p-3 border border-neutral-800 bg-[#161C26] flex items-center gap-3">
                <Award className="w-4 h-4 text-cobalt-accent flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-white block">
                    Triple ISO Management Standards
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    ISO 9001 • ISO 14001 • ISO 45001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="label-tech text-white border-b border-neutral-800 pb-2">
              {locale === "en" ? "DIVISIONS & CAPABILITIES" : "قطاعات الأعمال"}
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech">
              <li>
                <Link
                  href="/capabilities/infrastructure"
                  className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                >
                  <span>{locale === "en" ? "01 // Infrastructure Support" : "01 // البنية التحتية"}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities/manpower"
                  className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                >
                  <span>{locale === "en" ? "02 // Manpower Supply" : "02 // القوى العاملة"}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities/materials"
                  className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                >
                  <span>{locale === "en" ? "03 // Construction Materials" : "03 // توريد المواد"}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities/equipment"
                  className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                >
                  <span>{locale === "en" ? "04 // Heavy Equipment Rental" : "04 // المعدات والآليات"}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li className="pt-2 border-t border-neutral-800">
                <Link
                  href="/certifications"
                  className="text-neutral-400 hover:text-white transition-colors block"
                >
                  {locale === "en" ? "QHSE & ISO Certifications" : "الجودة والسلامة والآيزو"}
                </Link>
              </li>
              <li>
                <Link
                  href="/aramco-registration"
                  className="text-neutral-400 hover:text-white transition-colors block"
                >
                  {locale === "en" ? "Saudi Aramco Supplier Profile" : "ملف التأهيل لدى أرامكو"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="label-tech text-white border-b border-neutral-800 pb-2">
              {locale === "en" ? "COMMERCIAL HEADQUARTERS" : "المقر التنفيذي"}
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cobalt-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {locale === "en" ? "Riyadh Management Office" : "المقر الرئيسي للإدارة - الرياض"}
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-[11px] pt-0.5">
                    Alahsa Street, Almalaz, Riyadh 11543, Kingdom of Saudi Arabia
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-cobalt-accent flex-shrink-0" />
                <a href="tel:+966173229527" className="hover:text-white transition-colors">
                  +966 1732 29527
                </a>
              </div>

              <div className="space-y-1.5 pt-1 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cobalt-accent" />
                  <a href="mailto:admin@aevoryn.net" className="hover:text-white transition-colors">
                    admin@aevoryn.net
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cobalt-accent" />
                  <a href="mailto:ceo@aevoryn.net" className="hover:text-white transition-colors">
                    ceo@aevoryn.net
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cobalt-accent" />
                  <a href="mailto:chairman@aevoryn.net" className="hover:text-white transition-colors">
                    chairman@aevoryn.net
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Administrative Governance & Flag (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="label-tech text-white border-b border-neutral-800 pb-2">
              {locale === "en" ? "GOVERNANCE" : "الحوكمة والإفصاح"}
            </h4>
            <div className="p-3 border border-amber-500/30 bg-amber-500/10 text-[10px] space-y-1 text-neutral-300">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{locale === "en" ? "Facility Note" : "إفصاح إداري"}</span>
              </div>
              <p className="leading-relaxed opacity-85">
                {locale === "en"
                  ? "ISO certificates reference an operational facility in Baish, Jizan Region. Corporate contracting is executed under our confirmed Riyadh commercial registration."
                  : "تشير شهادات الآيزو إلى منشأة تشغيلية في بيش بمنطقة جازان. وتتم التعاقدات الرسمية عبر السجل التجاري المعتمد بالرياض."}
              </p>
            </div>

            <div className="label-tech text-[10px] text-neutral-400 space-y-1 pt-1">
              <p>DOMAIN: AEVORYN.NET</p>
              <p>CLASSIFICATION: CIVIL SERVICES</p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 label-tech text-[11px] text-neutral-500">
          <p>
            © 2026 AEVORYN SERVICES & CONTRACTING CO. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono">
            CR NUMBER: 7054401679 // KINGDOM OF SAUDI ARABIA
          </p>
        </div>
      </div>
    </footer>
  );
}
