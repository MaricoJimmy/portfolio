import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  findSectionAtFocusLine,
  useActiveSection,
} from "@/hooks/use-active-section";

describe("useActiveSection", () => {
  beforeEach(() => {
    document.body.innerHTML = '<section id="home"></section><section id="projects"></section>';
  });

  it("selects a very tall section that crosses the viewport focus line", () => {
    const home = document.getElementById("home")!;
    const projects = document.getElementById("projects")!;

    vi.spyOn(home, "getBoundingClientRect").mockReturnValue({
      bottom: -1000,
      top: -2000,
    } as DOMRect);
    vi.spyOn(projects, "getBoundingClientRect").mockReturnValue({
      bottom: 2300,
      top: 190,
    } as DOMRect);

    expect(findSectionAtFocusLine([home, projects], 360)).toBe("projects");
  });

  it("updates the active section on scroll", () => {
    const home = document.getElementById("home")!;
    const projects = document.getElementById("projects")!;

    vi.spyOn(home, "getBoundingClientRect").mockReturnValue({
      bottom: -1000,
      top: -2000,
    } as DOMRect);
    vi.spyOn(projects, "getBoundingClientRect").mockReturnValue({
      bottom: 2300,
      top: 190,
    } as DOMRect);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());

    const { result } = renderHook(() =>
      useActiveSection(["home", "projects"]),
    );

    expect(result.current).toBe("projects");
    vi.unstubAllGlobals();
  });

  it("uses a valid URL hash during anchor navigation", () => {
    const home = document.getElementById("home")!;
    const projects = document.getElementById("projects")!;

    vi.spyOn(home, "getBoundingClientRect").mockReturnValue({
      bottom: 1000,
      top: 0,
    } as DOMRect);
    vi.spyOn(projects, "getBoundingClientRect").mockReturnValue({
      bottom: 3000,
      top: 1000,
    } as DOMRect);
    window.history.replaceState(null, "", "#projects");

    const { result } = renderHook(() =>
      useActiveSection(["home", "projects"]),
    );

    expect(result.current).toBe("projects");
    window.history.replaceState(null, "", window.location.pathname);
  });
});
