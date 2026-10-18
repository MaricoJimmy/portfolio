"use client";

import Image from "next/image";

import type { ProjectEvidence } from "@/types/portfolio";

type ProjectArtworkProps = {
  abstractLabel: string;
  project: ProjectEvidence;
};

export function ProjectArtwork({ abstractLabel, project }: ProjectArtworkProps) {
  if (project.preview.kind === "real" && project.preview.src) {
    return (
      <figure className="project-artwork project-artwork-real">
        <Image
          alt={`${project.name.en} repository preview`}
          fill
          sizes="(max-width: 760px) 94vw, 45vw"
          src={project.preview.src}
        />
        <figcaption>{project.preview.source}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="project-artwork project-artwork-abstract" data-project={project.id}>
      <div aria-hidden="true" className="abstract-node" />
      <figcaption>{abstractLabel}</figcaption>
    </figure>
  );
}
