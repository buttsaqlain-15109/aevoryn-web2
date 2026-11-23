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
      className={`inline-flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-hairline bg-surface hover:border-cobalt-accent text-primary transition-all duration-200 font-body text-[13px] font-medium shadow-sm hover:shadow-subtle ${className}`}
    >
      <Globe className="w-4 h-4 text-cobalt-accent flex-shrink-0" />
      <span className="font-semibold">{locale === "en" ? "العربية" : "EN"}</span>
    </button>
  );
}
