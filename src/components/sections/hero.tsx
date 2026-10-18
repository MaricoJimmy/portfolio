"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";

export function Hero() {
  const { language, t } = useLanguage();
  const { profile, socialLinks, ui } = portfolioData;
  const portraitAlt =
    language === "en" ? "Portrait of Vu Van Tung" : "Chân dung Vũ Văn Tùng";

  return (
    <section aria-labelledby="hero-title" className="hero-section" id="home">
      <div className="hero-visual">
        <div aria-hidden="true" className="hero-index">
          <span>01</span>
          <span>10</span>
        </div>
        <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
        <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
        <div id="ai-core-mount" />
        <Image
          alt={portraitAlt}
          className="hero-portrait"
          height={1536}
          priority
          sizes="(max-width: 768px) 82vw, 48vw"
          src={profile.portrait}
          width={1152}
        />
      </div>

      <div className="hero-copy">
        <p className="hero-eyebrow">{t(profile.eyebrow)}</p>
        <h1 id="hero-title">{t(profile.name)}</h1>
        <p className="hero-role">{t(profile.role)}</p>
        <p className="hero-tagline">{t(profile.tagline)}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            {t(ui.exploreProjects)}
            <ArrowDown aria-hidden="true" size={18} />
          </a>
          <a className="button button-secondary" href="#contact">
            {t(ui.contactMe)}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>

      <div className="hero-rail">
        <div className="hero-socials">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              key={link.id}
              rel={link.id === "email" ? undefined : "noreferrer"}
              target={link.id === "email" ? undefined : "_blank"}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p>
          <span />
          {language === "en" ? "Explore the scroll" : "Khám phá khi cuộn"}
          <span />
        </p>
        <small>AI SYSTEMS · COMPUTER VISION · 2026</small>
      </div>
    </section>
  );
}
