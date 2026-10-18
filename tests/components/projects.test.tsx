import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Projects } from "@/components/sections/projects";
import { LanguageProvider } from "@/providers/language-provider";

function renderProjects() {
  return render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  );
}

describe("Projects", () => {
  it("renders five evidence-led case studies and verified metrics", () => {
    renderProjects();

    expect(screen.getAllByRole("article")).toHaveLength(5);
    expect(screen.getByText("93.23%")).toBeInTheDocument();
    expect(screen.getByText("0.894")).toBeInTheDocument();
    expect(screen.getAllByText("Abstract preview")).toHaveLength(3);
  });

  it("filters projects with keyboard-operable count buttons", async () => {
    const user = userEvent.setup();
    renderProjects();

    const nlpFilter = screen.getByRole("button", { name: /NLP · 1/i });
    await user.click(nlpFilter);

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByText("Smart CV Matching")).toBeInTheDocument();
    expect(nlpFilter).toHaveAttribute("aria-pressed", "true");
  });
});
