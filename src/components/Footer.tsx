"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { RFQModal } from "@/components/RFQModal";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  AlertTriangle,
  ArrowUpRight,
  Send,
} from "lucide-react";

export function Footer() {
  const { t, locale, isRTL } = useLanguage();
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#0B1728] text-neutral-300 border-t border-neutral-800 relative overflow-hidden">
        <div className="site-container pt-16 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
            {/* Column 1: Brand & Official Credentials (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3.5 group">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden p-1.5 bg-white border border-neutral-700 shadow-sm flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200">
                  <Image
                    src="/images/branding/aevoryn-logo.png"
                    alt="Aevoryn Services & Contracting Co."
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-display text-2xl text-white tracking-wide block leading-none">
                    AEVORYN
                  </span>
                  <span className="font-body text-[11px] font-semibold text-neutral-400 block pt-1 tracking-wider">
                    {locale === "en" ? "SERVICES & CONTRACTING CO." : "للخدمات والمقاولات"}
                  </span>
                  <span className="font-mono text-[11px] text-blue-400 font-bold block pt-0.5">
                    CR: 7054401679
                  </span>
                </div>
              </Link>

              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm font-body">
                {locale === "en"
                  ? "Aevoryn Services & Contracting Co. delivers integrated civil infrastructure support, certified technical workforce mobilization, testing-compliant construction materials, and heavy industrial machinery logistics across the Kingdom of Saudi Arabia."
                  : "تقدم شركة إيفورين للخدمات والمقاولات حلولاً هندسية متكاملة لدعم مشاريع البنية التحتية، وتوفير الكوادر الفنية المعتمدة، وسلاسل إمداد مواد البناء المفحوصة، والآليات الإنشائية الثقيلة في كافة أنحاء المملكة."}
              </p>

              {/* Strategic Accreditation Badges */}
              <div className="space-y-2.5 pt-1 font-mono-tech">
                <div className="p-3 rounded-xl border border-neutral-800 bg-[#111F36] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">
                      Saudi Aramco Registered Vendor
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono">
                      Vendor Code: 10120422 // E-Ref: 0019448
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-neutral-800 bg-[#111F36] flex items-center gap-3">
                  <Award className="w-5 h-5 text-cobalt-accent flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">
                      Triple ISO Certified Management Systems
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      ISO 9001 • ISO 14001 • ISO 45001
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Company Governance (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-body text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
                {locale === "en" ? "Company" : "الشركة"}
              </h4>
              <ul className="space-y-2.5 text-xs font-body text-neutral-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors block">
                    {locale === "en" ? "About Aevoryn" : "عن الشركة"}
                  </Link>
                </li>
                <li>
                  <Link href="/#capabilities" className="hover:text-white transition-colors block">
                    {locale === "en" ? "Capabilities Overview" : "نظرة عامة على القدرات"}
                  </Link>
                </li>
                <li>
                  <Link href="/certifications" className="hover:text-white transition-colors block">
                    {locale === "en" ? "ISO Certifications" : "شهادات الآيزو الدولية"}
                  </Link>
                </li>
                <li>
                  <Link href="/aramco-registration" className="hover:text-white transition-colors block">
                    {locale === "en" ? "Aramco Registration" : "اعتماد أرامكو السعودية"}
                  </Link>
                </li>
                <li>
                  <Link href="/clients" className="hover:text-white transition-colors block">
                    {locale === "en" ? "Clients & References" : "الشركاء والعملاء"}
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="hover:text-white transition-colors block">
                    {locale === "en" ? "Company Documents" : "وثائق الشركة القانونية"}
                  </Link>
                </li>
                <li>
                  <Link href="/supplier-registration" className="hover:text-white text-blue-400 font-semibold transition-colors block">
                    {locale === "en" ? "Supplier Portal" : "بوابة تأهيل الموردين"}
                  </Link>
                </li>
                <li>
                  <Link href="/admin/suppliers" className="hover:text-white text-neutral-400 text-[11px] font-mono transition-colors block">
                    {locale === "en" ? "Procurement Admin (Zero Trust)" : "إدارة المشتريات (وصول آمن)"}
                  </Link>
                </li>
                <li>
                  <Link href="/qhse" className="hover:text-white transition-colors block">
                    {locale === "en" ? "QHSE Standards" : "معايير الجودة والسلامة"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Services & Contracting (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-body text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
                {locale === "en" ? "Services & Divisions" : "القطاعات والخدمات"}
              </h4>
              <ul className="space-y-2.5 text-xs font-body text-neutral-400">
                <li>
                  <Link
                    href="/capabilities/infrastructure"
                    className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                  >
                    <span>{locale === "en" ? "Civil Infrastructure Support" : "دعم مشاريع البنية التحتية"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/capabilities/manpower"
                    className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                  >
                    <span>{locale === "en" ? "Technical Manpower Supply" : "توريد الكوادر المتخصصة"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/capabilities/materials"
                    className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                  >
                    <span>{locale === "en" ? "Construction Materials" : "توريد مواد البناء المعتمدة"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/capabilities/equipment"
                    className="hover:text-cobalt-accent transition-colors flex items-center justify-between group"
                  >
                    <span>{locale === "en" ? "Heavy Equipment Rental" : "تأجير المعدات الثقيلة"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li className="pt-2 border-t border-neutral-800">
                  <div className="p-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-[11px] space-y-1 text-neutral-300">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      <span>{locale === "en" ? "Operational Facility Note" : "إفصاح إداري"}</span>
                    </div>
                    <p className="leading-relaxed opacity-85 text-[10px]">
                      {locale === "en"
                        ? "ISO certificates audit facility located in Baish, Jizan Region. Corporate contracting is conducted via our Riyadh headquarters."
                        : "موقع التدقيق الميداني لشهادات الآيزو في بيش بمنطقة جازان، وتتم التعاقدات الرسمية عبر المقر الرئيسي بالرياض."}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Commercial Headquarters (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-body text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
                {locale === "en" ? "Commercial Headquarters" : "المقر التجاري"}
              </h4>
              <div className="space-y-3.5 text-xs text-neutral-300 font-body">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cobalt-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">
                      {locale === "en" ? "Riyadh Management Office" : "المقر الرئيسي للإدارة - الرياض"}
                    </p>
                    <p className="text-neutral-400 leading-relaxed text-[11px] pt-0.5">
                      Alahsa Street, Almalaz, Riyadh 11543, Kingdom of Saudi Arabia
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 font-mono">
                  <Phone className="w-4 h-4 text-cobalt-accent flex-shrink-0" />
                  <a href="tel:+966173229527" className="hover:text-white transition-colors text-white font-semibold">
                    +966 1732 29527
                  </a>
                </div>

                <div className="space-y-1.5 pt-1 font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cobalt-accent" />
                    <a href="mailto:info@aevoryn.net" className="hover:text-white transition-colors text-neutral-300">
                      info@aevoryn.net
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cobalt-accent" />
                    <a href="mailto:admin@aevoryn.net" className="hover:text-white transition-colors text-neutral-300">
                      admin@aevoryn.net
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cobalt-accent" />
                    <a href="mailto:ceo@aevoryn.net" className="hover:text-white transition-colors text-neutral-300">
                      ceo@aevoryn.net
                    </a>
                  </div>
                </div>

                {/* Consultation / RFQ Action */}
                <div className="pt-2">
                  <button
                    onClick={() => setRfqModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-cobalt-accent hover:bg-cobalt-accent-hover text-white font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{locale === "en" ? "REQUEST A CONSULTATION" : "طلب استشارة أو تسعير"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sub-footer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] text-neutral-500">
            <p>
              © 2026 AEVORYN SERVICES & CONTRACTING CO. ALL RIGHTS RESERVED.
            </p>
            <p className="font-mono">
              CR: <strong className="text-neutral-400">7054401679</strong> // RIYADH, KINGDOM OF SAUDI ARABIA
            </p>
          </div>
        </div>
      </footer>

      {/* RFQ Modal */}
      <RFQModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
      />
    </>
  );
}

