"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";

import { ScrollText } from "@/components/ui/scroll-text";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start -70%"],
  });

  return (
    <div className="scroll-heading-stage" data-reduced-motion={String(reducedMotion)} ref={ref}>
      <header className="section-heading">
        <span className="tech-label" data-text={eyebrow}>{eyebrow}</span>
        <h2><ScrollText progress={scrollYProgress} text={title} /></h2>
      </header>
    </div>
  );
}
