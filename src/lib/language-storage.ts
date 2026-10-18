import type { Language } from "@/types/portfolio";

export const LANGUAGE_STORAGE_KEY = "portfolio-language";

type StorageAdapter = Pick<Storage, "getItem" | "setItem">;

export function readStoredLanguage(storage?: StorageAdapter): Language {
  if (!storage) return "en";

  try {
    return storage.getItem(LANGUAGE_STORAGE_KEY) === "vi" ? "vi" : "en";
  } catch {
    return "en";
  }
}

export function writeStoredLanguage(
  storage: StorageAdapter | undefined,
  language: Language,
): boolean {
  if (!storage) return false;

  try {
    storage.setItem(LANGUAGE_STORAGE_KEY, language);
    return true;
  } catch {
    return false;
  }
}
