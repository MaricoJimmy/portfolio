"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SHUTTER_ROWS = 10;

/**
 * Page-wide scroll choreography:
 * - Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync.
 * - Shutter: `[data-shutter="<next section colour>"]` sections get rows that close
 *   from the bottom as the section leaves, handing over to the next section's colour.
 * - Parallax on project images.
 * - Footer reveal: `[data-footer-reveal]`'s `[data-footer-inner]` rises from -25% while its veil fades.
 */
export function ScrollEffects() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // jsdom (tests) has no matchMedia, which ScrollTrigger needs.
    if (reducedMotion || typeof window.matchMedia !== "function") return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ anchors: { offset: -96 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const panels: HTMLElement[] = [];

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-shutter]").forEach((section) => {
        const panel = document.createElement("div");
        panel.className = "shutter-panel";
        panel.setAttribute("aria-hidden", "true");
        panel.style.setProperty("--shutter-color", section.dataset.shutter ?? "#0d0d0e");
        for (let row = 0; row < SHUTTER_ROWS; row += 1) {
          panel.appendChild(document.createElement("span"));
        }
        section.appendChild(panel);
        panels.push(panel);

        gsap.fromTo(
          panel.children,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.1,
            ease: "none",
            stagger: { each: 0.01, from: "end" },
            scrollTrigger: {
              trigger: section,
              start: "bottom 60%",
              end: "bottom top",
              scrub: 2,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project-artwork-real").forEach((figure) => {
        const image = figure.querySelector("img");
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-footer-reveal]").forEach((footer) => {
        // One wrapper, one tween: animating each child separately let them drift apart.
        const content = footer.querySelector("[data-footer-inner]");
        const veil = footer.querySelector("[data-footer-veil]");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "clamp(top bottom)",
            end: "clamp(top top)",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        if (content) timeline.from(content, { y: () => -footer.offsetHeight * 0.25, ease: "none" });
        if (veil) timeline.from(veil, { opacity: 0.5, ease: "none" }, "<");
      });
    });

    return () => {
      ctx.revert();
      panels.forEach((panel) => panel.remove());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
