"use client";

import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";
import type { Language } from "@/types/portfolio";

const languages: Language[] = ["en", "vi"];

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      aria-label={t(portfolioData.ui.languageLabel)}
      className="language-switcher"
      role="group"
    >
      {languages.map((option) => (
        <button
          aria-pressed={language === option}
          key={option}
          onClick={() => setLanguage(option)}
          type="button"
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
