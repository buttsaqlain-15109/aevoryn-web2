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
    <div className="relative py-20 lg:py-28 bg-[#111111] text-white overflow-hidden hairline-b">
      {/* Background Industrial Image with Contrast Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.32] contrast-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/95 via-[#111111]/85 to-[#111111]/70" />
      </div>

      {/* Decorative Technical Grid */}
      <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(#2F63FF_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 label-tech text-xs text-neutral-400">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{locale === "en" ? "HOME" : "الرئيسية"}</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <Chevron className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-cobalt-accent font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-hairline bg-surface/20 text-blue-300 label-tech backdrop-blur-md">
            <span className="w-2 h-2 bg-cobalt-accent" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title (Anton condensed display) */}
        <h1 className="text-h1 font-display tracking-tight text-white leading-none">
          {title}
        </h1>

        {/* Subtitle (Archivo Body Large) */}
        <p className="body-large text-neutral-300 leading-relaxed max-w-[760px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
