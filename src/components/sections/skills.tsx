"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";

export function Skills() {
  const { language, t } = useLanguage();

  return (
    <section className="content-section skills-section" id="skills">
      <SectionHeading
        eyebrow="03 / Toolkit"
        title={language === "en" ? "A practical AI stack." : "Bộ công cụ AI thực tiễn."}
      />
      <div className="skill-grid">
        {portfolioData.skillGroups.map((group, index) => (
          <article className="skill-card" key={group.id}>
            <span className="skill-index">0{index + 1}</span>
            <h3>{t(group.title)}</h3>
            <p>{t(group.description)}</p>
            <ul aria-label={t(group.title)}>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
