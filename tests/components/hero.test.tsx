import { render, screen, within } from "@testing-library/react";
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
    const heading = screen.getByRole("heading", { level: 1, name: /vu van tung/i });
    const hero = heading.closest("section");
    expect(hero).not.toBeNull();
    expect(hero).toHaveAttribute("data-visual-stage", "gravity");
    const heroQueries = within(hero as HTMLElement);
    expect(heroQueries.getByTestId("gravity-mark")).toBeInTheDocument();
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
    expect(heroQueries.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/MaricoJimmy",
    );
    expect(heroQueries.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(heroQueries.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:vuvantung204@gmail.com",
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
