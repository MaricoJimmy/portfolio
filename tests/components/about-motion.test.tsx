import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { About } from "@/components/sections/about";
import { LanguageProvider } from "@/providers/language-provider";

describe("about water surface", () => {
  afterEach(() => vi.useRealTimers());

  it("tracks the pointer and creates a removable ripple on contact", () => {
    vi.useFakeTimers();
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>,
    );

    const section = document.getElementById("about")!;
    fireEvent.pointerMove(section, { clientX: 180, clientY: 240 });
    expect(section.style.getPropertyValue("--water-x")).toBe("180px");
    expect(section.style.getPropertyValue("--water-y")).toBe("240px");

    fireEvent.pointerDown(section, { clientX: 180, clientY: 240 });
    const ripple = screen.getByTestId("water-ripple");
    expect(ripple).toHaveStyle({ left: "180px", top: "240px" });

    act(() => vi.advanceTimersByTime(1200));
    expect(screen.queryByTestId("water-ripple")).not.toBeInTheDocument();
  });
});
