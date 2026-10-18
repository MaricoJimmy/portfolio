"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

import { ProjectDialog } from "@/components/sections/project-dialog";
import { ProjectArtwork } from "@/components/ui/project-artwork";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";
import type { ProjectCategory, ProjectEvidence } from "@/types/portfolio";

type ProjectFilter = "all" | ProjectCategory;

const filterLabels: Record<ProjectFilter, string> = {
  all: "All",
  "ai-cv": "AI / CV",
  nlp: "NLP",
  interaction: "Interaction",
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectEvidence | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { language, t } = useLanguage();
  const filters = Object.keys(filterLabels) as ProjectFilter[];
  const visibleProjects = portfolioData.projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  const count = (value: ProjectFilter) =>
    value === "all"
      ? portfolioData.projects.length
      : portfolioData.projects.filter((project) => project.category === value).length;

  return (
    <section className="content-section projects-section" id="projects">
      <div className="projects-heading-row">
        <SectionHeading
          eyebrow="04 / Selected work"
          title={language === "en" ? "AI built to be tested." : "AI được xây để kiểm chứng."}
        />
        <div aria-label="Project filters" className="project-filters" role="group">
          {filters.map((value) => (
            <button
              aria-pressed={filter === value}
              key={value}
              onClick={() => setFilter(value)}
              type="button"
            >
              {value === "all" ? t(portfolioData.ui.allProjects) : filterLabels[value]} · {count(value)}
            </button>
          ))}
        </div>
      </div>

      <Reveal className="project-grid">
        {visibleProjects.map((project, index) => (
          <article className="project-card" data-featured={index < 2} key={project.id}>
            <ProjectArtwork abstractLabel={t(portfolioData.ui.abstractPreview)} project={project} />
            <div className="project-card-copy">
              <p className="project-category">{project.category.replace("-", " / ")}</p>
              <h3>{t(project.name)}</h3>
              <p>{t(project.summary)}</p>
              {project.metrics.length > 0 && (
                <dl className="metric-list">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <ul className="technology-list" aria-label="Technologies">
                {project.technologies.slice(0, 4).map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <button
                className="case-study-trigger"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelectedProject(project);
                }}
                type="button"
              >
                {t(portfolioData.ui.viewCaseStudy)} <ArrowUpRight aria-hidden="true" size={18} />
              </button>
            </div>
          </article>
        ))}
      </Reveal>

      <ProjectDialog
        onOpenChange={(open) => !open && setSelectedProject(null)}
        open={selectedProject !== null}
        project={selectedProject}
        triggerRef={triggerRef}
      />
    </section>
  );
}
