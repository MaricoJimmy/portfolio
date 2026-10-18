"use client";

import { ArrowDownRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";

export function About() {
  const { language, t } = useLanguage();
  const { profile } = portfolioData;

  return (
    <section className="content-section about-section" id="about">
      <SectionHeading
        eyebrow="02 / Profile"
        title={language === "en" ? "Engineering with evidence." : "Kỹ thuật dựa trên bằng chứng."}
      />
      <div className="about-grid">
        <p className="about-lead">{t(profile.biography)}</p>
        <div className="about-notes">
          <article>
            <span>01</span>
            <h3>{language === "en" ? "Working principle" : "Nguyên tắc làm việc"}</h3>
            <p>{t(profile.philosophy)}</p>
          </article>
          <article>
            <span>02</span>
            <h3>{language === "en" ? "Direction" : "Định hướng"}</h3>
            <p>{t(profile.goal)}</p>
          </article>
        </div>
        <ArrowDownRight aria-hidden="true" className="about-arrow" size={56} />
      </div>
    </section>
  );
}
