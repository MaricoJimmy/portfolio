"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";

const AiCoreCanvas = dynamic(
  () => import("@/components/three/ai-core-canvas").then((module) => module.AiCoreCanvas),
  {
    loading: () => <div aria-hidden="true" className="ai-core-fallback" data-testid="ai-core-fallback" />,
    ssr: false,
  },
);

export function Hero() {
  const { language, t } = useLanguage();
  const { profile, socialLinks, ui } = portfolioData;
  const portraitAlt =
    language === "en" ? "Portrait of Vu Van Tung" : "Chân dung Vũ Văn Tùng";

  return (
    <section
      aria-labelledby="hero-title"
      className="hero-section"
      data-visual-stage="gravity"
      id="home"
    >
      <div aria-hidden="true" className="stage-coordinate">
        <span>21.0285° N</span>
        <span>105.8542° E</span>
      </div>
      <div className="hero-visual">
        <div aria-hidden="true" className="hero-index">
          <span>01</span>
          <span>10</span>
        </div>
        <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
        <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
        <div id="ai-core-mount">
          <AiCoreCanvas />
        </div>
        <div aria-hidden="true" className="gravity-mark" data-testid="gravity-mark">
          <span className="gravity-mark-dot" />
          <span className="gravity-mark-core" />
          <span className="gravity-mark-orbit" />
        </div>
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

      <Reveal className="hero-copy" delay={0.08}>
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
      </Reveal>

      <p aria-hidden="true" className="stage-manifesto">
        HUMAN EXPERIENCE <span>×</span> ARTIFICIAL INTELLIGENCE
      </p>

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
