"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import { AiCoreScene } from "@/components/three/ai-core-scene";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AiCoreFallback() {
  return <div aria-hidden="true" className="ai-core-fallback" data-testid="ai-core-fallback" />;
}

export function AiCoreCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(true);
  const pageVisible = usePageVisibility();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const coarsePointer = window.matchMedia?.("(pointer: coarse)");
    const updateQuality = () => {
      setCompact(container.clientWidth < 560 || Boolean(coarsePointer?.matches));
    };
    const observer = new ResizeObserver(updateQuality);
    observer.observe(container);
    coarsePointer?.addEventListener("change", updateQuality);
    updateQuality();

    return () => {
      observer.disconnect();
      coarsePointer?.removeEventListener("change", updateQuality);
    };
  }, []);

  return (
    <div className="ai-core" ref={containerRef}>
      <AiCoreFallback />
      <Canvas
        aria-label="Interactive AI Core visualization"
        camera={{ fov: 42, position: [0, 0, compact ? 7.2 : 6.4] }}
        dpr={compact ? 1 : [1, 1.5]}
        frameloop={pageVisible && !reducedMotion ? "always" : "demand"}
        gl={{ alpha: true, antialias: !compact, powerPreference: "high-performance" }}
      >
        <AiCoreScene active={pageVisible} compact={compact} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
