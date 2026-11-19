"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      type="button"
      aria-label={locale === "en" ? "تبديل إلى العربية" : "Switch to English"}
      title={locale === "en" ? "تبديل إلى العربية" : "Switch to English"}
      className={`neu-button rounded-[8px] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-brand-accent" />
      <span>{locale === "en" ? "العربية" : "EN"}</span>
    </button>
  );
}
