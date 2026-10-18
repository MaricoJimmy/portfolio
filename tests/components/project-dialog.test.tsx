import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Projects } from "@/components/sections/projects";
import { LanguageProvider } from "@/providers/language-provider";

describe("ProjectDialog", () => {
  it("opens by keyboard, traps focus, closes with Escape, and restores focus", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Projects />
      </LanguageProvider>,
    );
    const trigger = screen.getAllByRole("button", { name: /view case study/i })[0];
    trigger.focus();
    await user.keyboard("{Enter}");

    const dialog = screen.getByRole("dialog", { name: /multi-person fall detection/i });
    const repository = screen.getByRole("link", { name: /view repository/i });
    expect(dialog).toBeInTheDocument();
    expect(repository).toHaveAttribute("target", "_blank");
    expect(repository).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
