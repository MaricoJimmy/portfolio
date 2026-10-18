import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("portfolio home page", () => {
  it("presents Vu Van Tung as the primary page identity", () => {
    render(<HomePage />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /vu van tung/i }),
    ).toBeInTheDocument();
  });
});
