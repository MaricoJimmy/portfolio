"use client";

import { ArrowDownRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { portfolioData } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollMotionVariables } from "@/hooks/use-scroll-motion-variables";
import { useLanguage } from "@/providers/language-provider";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const rippleId = useRef(0);
  const rippleTimeouts = useRef<number[]>([]);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const reducedMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const { profile } = portfolioData;
  useScrollMotionVariables(sectionRef, "about");

  useEffect(
    () => () => rippleTimeouts.current.forEach((timeout) => window.clearTimeout(timeout)),
    [],
  );

  const getPointerPosition = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const { x, y } = getPointerPosition(event);
    event.currentTarget.style.setProperty("--water-x", `${x}px`);
    event.currentTarget.style.setProperty("--water-y", `${y}px`);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const { x, y } = getPointerPosition(event);
    rippleId.current += 1;
    const id = rippleId.current;
    setRipples((current) => [...current, { id, x, y }]);
    rippleTimeouts.current.push(
      window.setTimeout(
        () => setRipples((current) => current.filter((ripple) => ripple.id !== id)),
        1200,
      ),
    );
  };

  return (
    <section
      className="content-section about-section"
      data-scroll-scene="about"
      id="about"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="about-motion-surface"
        data-testid="about-motion-surface"
      >
        {ripples.map((ripple) => (
          <span
            className="about-water-ripple"
            data-testid="water-ripple"
            key={ripple.id}
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </div>
      <div className="about-heading-motion">
        <SectionHeading
          eyebrow="02 / Profile"
          title={language === "en" ? "Engineering with evidence." : "Kỹ thuật dựa trên bằng chứng."}
        />
      </div>
      <div className="about-content-motion">
        <Reveal className="about-grid">
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
        </Reveal>
      </div>
    </section>
  );
}
