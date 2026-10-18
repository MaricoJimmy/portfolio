"use client";

import { useEffect, useState } from "react";

import type { SectionId } from "@/types/portfolio";

export function useActiveSection(ids: SectionId[]): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id as SectionId);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.1, 0.35, 0.6] },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
}
