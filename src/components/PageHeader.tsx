"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  breadcrumbs: { label: string; href?: string }[];
  imageSrc?: string;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumbs,
  imageSrc = "/images/content/hero-industrial.jpg",
}: PageHeaderProps) {
  const { locale, isRTL } = useLanguage();
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="relative py-20 lg:py-24 bg-[#0B1220] text-white overflow-hidden border-b border-subtle">
      {/* Background Image with Dark Gradient Wash */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover object-center filter brightness-[0.35] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/95 via-[#0B1220]/85 to-[#0B1220]/70" />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#438DD0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{locale === "en" ? "Home" : "الرئيسية"}</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <Chevron className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-blue-400 font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101A28]/80 border border-brand-accent/40 text-blue-300 label-text backdrop-blur-md">
            <span>{badge}</span>
          </div>
        )}

        {/* Title (Section 2 Scale: H1 clamp(36px, 5vw, 64px)) */}
        <h1 className="text-h1 text-white">
          {title}
        </h1>

        {/* Subtitle (Section 2 Scale: Body Large) */}
        <p className="body-large text-slate-300">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
