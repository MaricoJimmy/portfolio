"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

function ScrollWord({
  word,
  index,
  count,
  progress,
  reducedMotion,
}: {
  word: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = (index / Math.max(count - 1, 1)) * 0.35;
  const y = useTransform(progress, [start, start + 0.65], ["110%", "0%"]);
  const opacity = useTransform(progress, [start, start + 0.55], [0, 1]);

  return (
    <span aria-hidden="true" className="scroll-word-mask">
      <motion.span
        className="scroll-word"
        style={reducedMotion ? { opacity: 1, y: 0 } : { opacity, y }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function ScrollText({ text, progress }: { text: string; progress?: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 65%"],
  });
  const words = text.trim().split(/\s+/);

  return (
    <span className="scroll-text" ref={ref}>
      <span className="scroll-text-accessible">{text}</span>
      {words.map((word, index) => (
        <span aria-hidden="true" key={`${index}-${word}`}>
          <ScrollWord
            count={words.length}
            index={index}
            progress={progress ?? scrollYProgress}
            reducedMotion={reducedMotion}
            word={word}
          />
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
