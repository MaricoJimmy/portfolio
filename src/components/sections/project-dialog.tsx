"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ProjectArtwork } from "@/components/ui/project-artwork";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/providers/language-provider";
import type { ProjectEvidence } from "@/types/portfolio";

type ProjectDialogProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  project: ProjectEvidence | null;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

export function ProjectDialog({ onOpenChange, open, project, triggerRef }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const controls = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"),
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open, triggerRef]);

  if (!open || !project) return null;

  const close = () => {
    onOpenChange(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div
        aria-labelledby="project-dialog-title"
        aria-modal="true"
        className="project-dialog"
        ref={dialogRef}
        role="dialog"
      >
        <button aria-label={t(portfolioData.ui.close)} className="dialog-close" onClick={close} ref={closeRef}>
          <X aria-hidden="true" />
        </button>
        <ProjectArtwork abstractLabel={t(portfolioData.ui.abstractPreview)} project={project} />
        <div className="dialog-copy">
          <p className="dialog-kicker">{project.category.replace("-", " / ")}</p>
          <h2 id="project-dialog-title">{t(project.name)}</h2>
          <p className="dialog-summary">{t(project.summary)}</p>
          <dl>
            <div>
              <dt>{language === "en" ? "Challenge" : "Thách thức"}</dt>
              <dd>{t(project.challenge)}</dd>
            </div>
            <div>
              <dt>{language === "en" ? "Solution" : "Giải pháp"}</dt>
              <dd>{t(project.solution)}</dd>
            </div>
            <div>
              <dt>{language === "en" ? "Limitation" : "Giới hạn"}</dt>
              <dd>{t(project.limitation)}</dd>
            </div>
          </dl>
          <a className="button dialog-repository" href={project.repositoryUrl} rel="noreferrer noopener" target="_blank">
            {t(portfolioData.ui.repository)} <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
