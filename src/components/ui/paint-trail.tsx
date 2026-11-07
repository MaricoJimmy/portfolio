"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Point = { x: number; y: number; t: number };
type Stroke = Point[];
type Bristle = { offset: number; width: number; alpha: number; dry: number };

const BRUSH_WIDTH = 54;
const BRISTLES = 18;
const CHUNK = 6; // points per drawn chunk: chunks fade independently, joints stay rare
const LIFE = 1900; // ms until a chunk has fully faded
// Flat brush held at a fixed angle, like a real one: strokes get thick or thin by direction.
const BRUSH_ANGLE = (-35 * Math.PI) / 180;
const NX = Math.cos(BRUSH_ANGLE);
const NY = Math.sin(BRUSH_ANGLE);
const PAINT = "245, 244, 239";

function createBristles(): Bristle[] {
  let seed = 11;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: BRISTLES }, (_, i) => ({
    offset: ((i + 0.5) / BRISTLES - 0.5) * BRUSH_WIDTH + (random() - 0.5) * 2.5,
    width: 2 + random() * 4,
    alpha: 0.55 + random() * 0.45,
    dry: random() * 0.3, // chance this bristle leaves a dry gap in a chunk
  }));
}

/**
 * Viewport-sized canvas that paints dry-brush strokes behind the mouse while it is over a
 * `[data-paint]` section. Points are stored in page coordinates (strokes scroll with the
 * page) and fade out by age; the loop only runs while paint is visible.
 */
export function PaintTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || reducedMotion || typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const bristles = createBristles();
    const strokes: Stroke[] = [];
    let current: Stroke | null = null;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "butt";
      ctx.lineJoin = "round";
    };

    const drawChunk = (points: Point[], fade: number, seed: number, sx: number, sy: number) => {
      const half = BRUSH_WIDTH / 2;
      // Paint body: the area swept by the flat brush edge.
      ctx.fillStyle = `rgba(${PAINT}, ${0.42 * fade})`;
      ctx.beginPath();
      points.forEach((p, i) => {
        const x = p.x - sx + NX * half;
        const y = p.y - sy + NY * half;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      for (let i = points.length - 1; i >= 0; i -= 1) {
        ctx.lineTo(points[i].x - sx - NX * half, points[i].y - sy - NY * half);
      }
      ctx.closePath();
      ctx.fill();

      // Bristle texture on top.
      bristles.forEach((bristle, b) => {
        if (((seed * (b + 7)) % 101) / 101 < bristle.dry) return;
        ctx.strokeStyle = `rgba(${PAINT}, ${bristle.alpha * fade})`;
        ctx.lineWidth = bristle.width;
        ctx.beginPath();
        points.forEach((p, i) => {
          const x = p.x - sx + NX * bristle.offset;
          const y = p.y - sy + NY * bristle.offset;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      });
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const sx = window.scrollX;
      const sy = window.scrollY;

      for (let s = strokes.length - 1; s >= 0; s -= 1) {
        const stroke = strokes[s];
        // Drop whole expired chunks from the tail, keeping the shared joint point.
        while (stroke.length > CHUNK && now - stroke[CHUNK].t > LIFE) stroke.splice(0, CHUNK);
        if (stroke !== current && (stroke.length < 2 || now - stroke[stroke.length - 1].t > LIFE)) {
          strokes.splice(s, 1);
          continue;
        }
        for (let start = 0; start < stroke.length - 1; start += CHUNK) {
          const points = stroke.slice(start, start + CHUNK + 1);
          const fade = 1 - (now - points[points.length - 1].t) / LIFE;
          if (fade > 0) drawChunk(points, fade, start + s * 31 + 1, sx, sy);
        }
      }

      frame = strokes.length ? requestAnimationFrame(draw) : 0;
    };

    const handleMove = (event: PointerEvent) => {
      const point = { x: event.clientX + window.scrollX, y: event.clientY + window.scrollY, t: performance.now() };
      const overPaint = (event.target as Element | null)?.closest("[data-paint]");
      const previous = current?.[current.length - 1];

      if (!overPaint || (previous && Math.hypot(point.x - previous.x, point.y - previous.y) > 160)) {
        current = null; // left the section or jumped: next move starts a fresh stroke
        if (!overPaint) return;
      }
      if (!current) {
        current = [point];
        strokes.push(current);
        return;
      }
      if (previous && Math.hypot(point.x - previous.x, point.y - previous.y) < 3) return;
      current.push(point);
      if (!frame) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [reducedMotion]);

  return <canvas aria-hidden="true" className="paint-trail" ref={ref} />;
}
