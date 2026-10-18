"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  readStoredLanguage,
  writeStoredLanguage,
} from "@/lib/language-storage";
import type { Language, LocalizedText } from "@/types/portfolio";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    let active = true;
    const storedLanguage = readStoredLanguage(window.localStorage);

    queueMicrotask(() => {
      if (active) setLanguageState(storedLanguage);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    writeStoredLanguage(window.localStorage, nextLanguage);
  }, []);

  const t = useCallback(
    (text: LocalizedText) => text[language],
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
