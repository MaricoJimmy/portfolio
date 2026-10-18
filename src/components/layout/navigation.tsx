"use client";

import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import { portfolioData } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLanguage } from "@/providers/language-provider";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const sectionIds = useMemo(
    () => portfolioData.navigation.map((item) => item.id),
    [],
  );
  const activeSection = useActiveSection(sectionIds);
  const toggleLabel = t(
    menuOpen ? portfolioData.ui.closeMenu : portfolioData.ui.openMenu,
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t(portfolioData.ui.skipToContent)}
      </a>
      <header className="site-header">
        <a aria-label="Vu Van Tung — Home" className="brand-mark" href="#home">
          <span>VT</span>
          <small>AI / SE</small>
        </a>

        <button
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={toggleLabel}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          aria-label="Primary navigation"
          className="primary-navigation"
          data-open={menuOpen}
          id="primary-navigation"
        >
          {portfolioData.navigation.map((item, index) => (
            <a
              aria-current={activeSection === item.id ? "location" : undefined}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {t(item.label)}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
