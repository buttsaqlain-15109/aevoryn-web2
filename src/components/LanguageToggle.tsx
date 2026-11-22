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
      className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-sm border border-hairline bg-surface hover:border-cobalt-accent text-primary transition-colors duration-200 label-tech text-[11px] ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-cobalt-accent" />
      <span>{locale === "en" ? "العربية" : "EN"}</span>
    </button>
  );
}
