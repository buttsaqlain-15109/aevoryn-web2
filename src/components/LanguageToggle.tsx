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
      className={`inline-flex items-center justify-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-lg border border-hairline bg-surface hover:border-cobalt-accent text-primary transition-all duration-200 font-body text-xs font-semibold shadow-1 hover:shadow-2 flex-shrink-0 cursor-pointer ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-cobalt-accent flex-shrink-0" />
      <span className="text-[11px] font-bold">{locale === "en" ? "العربية" : "EN"}</span>
    </button>
  );
}
