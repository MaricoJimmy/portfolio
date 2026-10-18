"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";

export function Journey() {
  const { language, t } = useLanguage();

  return (
    <section className="content-section journey-section" id="experience">
      <SectionHeading
        eyebrow="05 / Journey"
        title={language === "en" ? "Learning. Shipping. Growing." : "Học hỏi. Triển khai. Phát triển."}
      />
      <ol className="journey-list">
        {portfolioData.journey.map((entry, index) => (
          <li key={entry.id}>
            <span className="journey-index">0{index + 1}</span>
            <time>{t(entry.period)}</time>
            <div>
              <h3>{t(entry.role)}</h3>
              <p className="journey-organization">{t(entry.organization)}</p>
              <p>{t(entry.description)}</p>
            </div>
          </li>
        ))}
        <li className="journey-goal">
          <span className="journey-index">04</span>
          <time>{language === "en" ? "Next" : "Tiếp theo"}</time>
          <div>
            <h3>AI Engineer</h3>
            <p>{t(portfolioData.profile.goal)}</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
