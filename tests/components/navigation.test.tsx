import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Navigation } from "@/components/layout/navigation";
import { portfolioData } from "@/data/portfolio";
import { LanguageProvider } from "@/providers/language-provider";

describe("navigation", () => {
  it("links every navigation item to a real page section and exposes the skip link", () => {
    render(
      <LanguageProvider>
        <Navigation />
        <main id="main-content">
          {portfolioData.navigation.map((item) => (
            <section id={item.id} key={item.id} />
          ))}
        </main>
      </LanguageProvider>,
    );

    expect(screen.getByText("Skip to content")).toHaveAttribute(
      "href",
      "#main-content",
    );

    for (const item of portfolioData.navigation) {
      const link = screen.getByRole("link", { name: item.label.en });
      expect(link).toHaveAttribute("href", `#${item.id}`);
      expect(document.getElementById(item.id)).not.toBeNull();
    }

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("opens the mobile menu and closes it after a section is selected", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>,
    );

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.click(screen.getByRole("link", { name: "Projects" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
