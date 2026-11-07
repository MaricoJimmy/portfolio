"use client";

import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const noopSubscribe = () => () => undefined;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();
  // Server snapshot is `true` so the hydration render matches SSR; jsdom (no IO) then shows content.
  const canObserveViewport = useSyncExternalStore(
    noopSubscribe,
    () => typeof IntersectionObserver !== "undefined",
    () => true,
  );
  const showImmediately = reducedMotion || !canObserveViewport;

  return (
    <motion.div
      animate={showImmediately ? { opacity: 1, y: 0 } : undefined}
      className={className}
      data-reduced-motion={String(reducedMotion)}
      initial={showImmediately ? false : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.18, once: true }}
      whileInView={showImmediately ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
