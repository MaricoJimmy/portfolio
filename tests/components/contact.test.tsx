import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Contact, copyEmail } from "@/components/sections/contact";
import { LanguageProvider } from "@/providers/language-provider";

describe("copyEmail", () => {
  it("reports copied only after the clipboard write resolves", async () => {
    const clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    await expect(copyEmail("vuvantung204@gmail.com", clipboard)).resolves.toBe("copied");
    expect(clipboard.writeText).toHaveBeenCalledWith("vuvantung204@gmail.com");
  });

  it("reports failure for rejected or unavailable clipboard access", async () => {
    await expect(copyEmail("email@example.com", undefined)).resolves.toBe("failed");
    await expect(
      copyEmail("email@example.com", { writeText: vi.fn().mockRejectedValue(new Error("denied")) }),
    ).resolves.toBe("failed");
  });
});

describe("Contact", () => {
  it("keeps mailto available and announces copy status politely", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(
      <LanguageProvider>
        <Contact />
      </LanguageProvider>,
    );

    expect(screen.getByRole("link", { name: /vuvantung204@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:vuvantung204@gmail.com",
    );
    await user.click(screen.getByRole("button", { name: /copy email/i }));

    expect(screen.getByRole("status")).toHaveTextContent("Email copied");
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });
});
