"use client";

import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  getAboutScrollMotion,
  getHeroScrollMotion,
} from "@/lib/scroll-motion";

type ScrollScene = "about" | "hero";

function setVariable(element: HTMLElement, name: string, value: number) {
  element.style.setProperty(name, String(value));
}

export function useScrollMotionVariables(
  ref: RefObject<HTMLElement | null>,
  scene: ScrollScene,
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      const bounds = element.getBoundingClientRect();

      if (scene === "hero") {
        const progress = reducedMotion
          ? 0
          : -bounds.top / Math.max(bounds.height * 0.85, 1);
        const motion = getHeroScrollMotion(
          progress,
          window.innerWidth,
          window.innerHeight,
        );

        setVariable(element, "--hero-copy-opacity", motion.copyOpacity);
        setVariable(element, "--hero-copy-y", motion.copyY);
        setVariable(element, "--hero-core-opacity", motion.coreOpacity);
        setVariable(element, "--hero-core-rotate", motion.coreRotate);
        setVariable(element, "--hero-core-scale", motion.coreScale);
        setVariable(element, "--hero-core-x", motion.coreX);
        setVariable(element, "--hero-core-y", motion.coreY);
        setVariable(element, "--hero-portrait-scale", motion.portraitScale);
        setVariable(element, "--hero-portrait-y", motion.portraitY);
        setVariable(element, "--hero-rail-opacity", motion.railOpacity);
        setVariable(element, "--hero-rail-y", motion.railY);
        return;
      }

      const progress = reducedMotion
        ? 1
        : (window.innerHeight - bounds.top) / (window.innerHeight * 0.78);
      const motion = getAboutScrollMotion(progress);

      setVariable(element, "--about-content-opacity", motion.contentOpacity);
      setVariable(element, "--about-content-y", motion.contentY);
      setVariable(element, "--about-heading-x", motion.headingX);
      setVariable(element, "--about-surface-scale", motion.surfaceScale);
      setVariable(element, "--about-surface-y", motion.surfaceY);
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion, ref, scene]);
}
