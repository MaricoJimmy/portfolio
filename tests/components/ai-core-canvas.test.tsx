import { act, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AiCoreCanvas } from "@/components/three/ai-core-canvas";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

vi.stubGlobal(
  "ResizeObserver",
  class {
    disconnect() {}
    observe() {}
  },
);

vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="mock-canvas" {...props}>
      {children}
    </div>
  ),
  useFrame: vi.fn(),
  useThree: () => ({ pointer: { x: 0, y: 0 } }),
}));

vi.mock("@/components/three/ai-core-scene", () => ({
  AiCoreScene: ({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) => (
    <div
      data-active={String(active)}
      data-testid="mock-scene"
      data-reduced-motion={String(reducedMotion)}
    />
  ),
}));

describe("AiCoreCanvas", () => {
  it("keeps a visual fallback and exposes an accessible canvas", () => {
    render(<AiCoreCanvas />);

    expect(screen.getByTestId("ai-core-fallback")).toBeInTheDocument();
    expect(screen.getByLabelText(/interactive ai core/i)).toBeInTheDocument();
  });

  it("passes reduced-motion and visibility state to the scene", () => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    window.matchMedia = vi.fn().mockReturnValue({
      addEventListener: vi.fn(),
      matches: true,
      removeEventListener: vi.fn(),
    });

    render(<AiCoreCanvas />);

    expect(screen.getByTestId("mock-scene")).toHaveAttribute("data-reduced-motion", "true");
    expect(screen.getByTestId("mock-scene")).toHaveAttribute("data-active", "false");
  });
});

describe("AI Core lifecycle hooks", () => {
  it("updates when the page visibility changes", () => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    const { result } = renderHook(() => usePageVisibility());

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    act(() => document.dispatchEvent(new Event("visibilitychange")));

    expect(result.current).toBe(false);
  });

  it("tracks the reduced-motion media query", () => {
    let listener: ((event: MediaQueryListEvent) => void) | undefined;
    let matches = false;
    const mediaQuery = {
      addEventListener: (_: string, callback: (event: MediaQueryListEvent) => void) => {
        listener = callback;
      },
      get matches() {
        return matches;
      },
      removeEventListener: vi.fn(),
    };
    window.matchMedia = vi.fn().mockReturnValue(mediaQuery);
    const { result } = renderHook(() => useReducedMotion());

    act(() => {
      matches = true;
      listener?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
