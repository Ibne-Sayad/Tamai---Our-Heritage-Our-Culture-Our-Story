"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "@/content/translations";

const LanguageContext = createContext({ locale: "en" as Locale, setLocale: (_locale: Locale) => {}, copy: translations.en });
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    try { const saved = localStorage.getItem("tamai-language"); if (saved === "en" || saved === "bn") setLocale(saved); } catch { /* Language switching also works without storage. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  function changeLanguage(value: Locale) { setLocale(value); try { localStorage.setItem("tamai-language", value); } catch {} }
  return <LanguageContext.Provider value={{ locale, setLocale: changeLanguage, copy: translations[locale] }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
