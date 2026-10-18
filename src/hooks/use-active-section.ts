"use client";

import { useEffect, useState } from "react";

import type { SectionId } from "@/types/portfolio";

export function findSectionAtFocusLine(
  elements: HTMLElement[],
  focusLine: number,
): SectionId {
  const crossingElement = elements.find((element) => {
    const { bottom, top } = element.getBoundingClientRect();
    return top <= focusLine && bottom > focusLine;
  });

  if (crossingElement) return crossingElement.id as SectionId;

  const nearestElement = elements.reduce((nearest, element) => {
    const nearestDistance = Math.abs(
      nearest.getBoundingClientRect().top - focusLine,
    );
    const distance = Math.abs(element.getBoundingClientRect().top - focusLine);
    return distance < nearestDistance ? element : nearest;
  });

  return nearestElement.id as SectionId;
}

export function useActiveSection(ids: SectionId[]): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    let animationFrame = 0;
    const updateActiveSection = () => {
      animationFrame = 0;
      setActiveSection(
        findSectionAtFocusLine(elements, window.innerHeight * 0.36),
      );
    };
    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };
    const updateFromHash = () => {
      const hashId = window.location.hash.slice(1) as SectionId;
      if (ids.includes(hashId)) {
        setActiveSection(hashId);
        return true;
      }

      return false;
    };

    if (!updateFromHash()) scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", updateFromHash);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [ids]);

  return activeSection;
}
