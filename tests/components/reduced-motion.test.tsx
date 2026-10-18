import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Reveal } from "@/components/ui/reveal";

describe("reduced motion", () => {
  it("renders reveal content immediately without spatial travel", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      addEventListener: vi.fn(),
      matches: true,
      removeEventListener: vi.fn(),
    });

    render(<Reveal>Always readable</Reveal>);

    const content = screen.getByText("Always readable");
    expect(content).toBeVisible();
    expect(content).toHaveAttribute("data-reduced-motion", "true");
    expect(content).not.toHaveStyle({ opacity: 0 });
  });
});
