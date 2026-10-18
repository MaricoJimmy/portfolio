import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { LanguageProvider } from "@/providers/language-provider";

describe("portfolio home page", () => {
  it("presents Vu Van Tung as the primary page identity", () => {
    render(
      <LanguageProvider>
        <HomePage />
      </LanguageProvider>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /vu van tung/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Software Engineer / Aspiring AI Engineer"),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Portrait of Vu Van Tung")).toHaveAttribute(
      "src",
      expect.stringContaining("vu-van-tung-profile.png"),
    );
    expect(screen.getByRole("link", { name: "Explore projects" })).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/MaricoJimmy",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:vuvantung204@gmail.com",
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
