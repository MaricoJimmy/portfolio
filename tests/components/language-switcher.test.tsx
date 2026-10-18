import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
  LanguageProvider,
  useLanguage,
} from "@/providers/language-provider";

function LanguageProbe() {
  const { t } = useLanguage();
  return <p>{t({ en: "English copy", vi: "Nội dung Việt" })}</p>;
}

function renderLanguageControls() {
  return render(
    <LanguageProvider>
      <LanguageSwitcher />
      <LanguageProbe />
    </LanguageProvider>,
  );
}

describe("language switcher", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("starts in English and switches the complete language state from the keyboard", async () => {
    const user = userEvent.setup();
    renderLanguageControls();

    expect(screen.getByText("English copy")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");

    const vietnameseButton = screen.getByRole("button", { name: "VI" });
    vietnameseButton.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByText("Nội dung Việt")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("vi");
    expect(vietnameseButton).toHaveAttribute("aria-pressed", "true");
  });

  it("restores a persisted Vietnamese selection after remount", async () => {
    window.localStorage.setItem("portfolio-language", "vi");
    const firstRender = renderLanguageControls();

    await waitFor(() =>
      expect(screen.getByText("Nội dung Việt")).toBeInTheDocument(),
    );
    firstRender.unmount();
    renderLanguageControls();

    await waitFor(() => {
      expect(screen.getByText("Nội dung Việt")).toBeInTheDocument();
      expect(document.documentElement.lang).toBe("vi");
    });
  });
});
