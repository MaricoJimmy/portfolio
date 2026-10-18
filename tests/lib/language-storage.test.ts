import { beforeEach, describe, expect, it } from "vitest";

import {
  readStoredLanguage,
  writeStoredLanguage,
} from "@/lib/language-storage";

describe("language storage", () => {
  beforeEach(() => window.localStorage.clear());

  it("defaults missing, invalid, and unavailable storage to English", () => {
    expect(readStoredLanguage(window.localStorage)).toBe("en");

    window.localStorage.setItem("portfolio-language", "fr");
    expect(readStoredLanguage(window.localStorage)).toBe("en");

    expect(readStoredLanguage(undefined)).toBe("en");
    expect(
      readStoredLanguage({
        getItem: () => {
          throw new DOMException("blocked");
        },
        setItem: () => undefined,
      }),
    ).toBe("en");
  });

  it("persists a supported language and reports blocked writes", () => {
    expect(writeStoredLanguage(window.localStorage, "vi")).toBe(true);
    expect(readStoredLanguage(window.localStorage)).toBe("vi");

    expect(
      writeStoredLanguage(
        {
          getItem: () => null,
          setItem: () => {
            throw new DOMException("blocked");
          },
        },
        "en",
      ),
    ).toBe(false);
  });
});
