"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, TranslationKey } from "@/data/translations";

export type Locale = "en" | "ar";

interface LanguageContextType {
  locale: Locale;
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (path: string, fallback?: string) => any;
  translations: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("aevoryn-lang") as Locale | null;
    if (saved === "en" || saved === "ar") {
      setLocaleState(saved);
      document.documentElement.setAttribute("lang", saved);
      document.documentElement.setAttribute("dir", saved === "ar" ? "rtl" : "ltr");
    } else {
      // Check browser language
      const browserLang = navigator.language.startsWith("ar") ? "ar" : "en";
      setLocaleState(browserLang);
      document.documentElement.setAttribute("lang", browserLang);
      document.documentElement.setAttribute("dir", browserLang === "ar" ? "rtl" : "ltr");
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("aevoryn-lang", newLocale);
    document.documentElement.setAttribute("lang", newLocale);
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  // Helper for deep key access, e.g. "hero.headline"
  const t = (path: string, fallback?: string): any => {
    const keys = path.split(".");
    let current: any = translations[locale];
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        isRTL: locale === "ar",
        setLocale,
        toggleLocale,
        t,
        translations: translations[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
