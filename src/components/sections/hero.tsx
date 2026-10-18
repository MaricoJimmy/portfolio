"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";

import { Reveal } from "@/components/ui/reveal";
import { portfolioData } from "@/data/portfolio";
import { useScrollMotionVariables } from "@/hooks/use-scroll-motion-variables";
import { useLanguage } from "@/providers/language-provider";

const AiCoreCanvas = dynamic(
  () => import("@/components/three/ai-core-canvas").then((module) => module.AiCoreCanvas),
  {
    loading: () => <div aria-hidden="true" className="ai-core-fallback" data-testid="ai-core-fallback" />,
    ssr: false,
  },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language, t } = useLanguage();
  const { profile, socialLinks, ui } = portfolioData;
  const portraitAlt =
    language === "en" ? "Portrait of Vu Van Tung" : "Chân dung Vũ Văn Tùng";
  const eyebrow = t(profile.eyebrow);
  const scrollLabel = language === "en" ? "Explore the scroll" : "Khám phá khi cuộn";
  useScrollMotionVariables(sectionRef, "hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="hero-section"
      data-scroll-scene="hero"
      data-visual-stage="gravity"
      id="home"
      ref={sectionRef}
    >
      <div aria-hidden="true" className="stage-coordinate">
        <span className="tech-label" data-text="21.0285° N">21.0285° N</span>
        <span className="tech-label" data-text="105.8542° E">105.8542° E</span>
      </div>
      <div className="hero-visual">
        <div aria-hidden="true" className="hero-index">
          <span className="tech-label" data-text="01">01</span>
          <span className="tech-label" data-text="10">10</span>
        </div>
        <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
        <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
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

      <div id="ai-core-mount">
        <AiCoreCanvas />
      </div>
      <div aria-hidden="true" className="gravity-mark" data-testid="gravity-mark">
        <span className="gravity-mark-dot" />
        <span className="gravity-mark-core" />
        <span className="gravity-mark-orbit" />
      </div>

      <div className="hero-copy-scroll">
        <Reveal className="hero-copy" delay={0.08}>
          <p className="hero-eyebrow tech-label" data-text={eyebrow}>{eyebrow}</p>
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
      </div>

      <p
        aria-hidden="true"
        className="stage-manifesto tech-label"
        data-text="HUMAN EXPERIENCE × ARTIFICIAL INTELLIGENCE"
      >
        HUMAN EXPERIENCE <span>×</span> ARTIFICIAL INTELLIGENCE
      </p>

      <div className="hero-rail">
        <div className="hero-socials">
          {socialLinks.map((link) => (
            <a
              className="tech-label"
              data-text={link.label}
              href={link.href}
              key={link.id}
              rel={link.id === "email" ? undefined : "noreferrer"}
              target={link.id === "email" ? undefined : "_blank"}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="tech-label" data-text={scrollLabel}>
          <span />
          {scrollLabel}
          <span />
        </p>
        <small
          className="tech-label"
          data-text="AI SYSTEMS · COMPUTER VISION · 2026"
        >
          AI SYSTEMS · COMPUTER VISION · 2026
        </small>
      </div>
    </section>
  );
}
