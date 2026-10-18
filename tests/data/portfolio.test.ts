import { describe, expect, it } from "vitest";

import { portfolioData } from "@/data/portfolio";

function expectLocalizedContent(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(expectLocalizedContent);
    return;
  }

  if (!value || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  if ("en" in record || "vi" in record) {
    expect(String(record.en ?? "").trim()).not.toBe("");
    expect(String(record.vi ?? "").trim()).not.toBe("");
  }

  Object.values(record).forEach(expectLocalizedContent);
}

describe("portfolio data", () => {
  it("contains five unique verified project records", () => {
    expect(portfolioData.projects).toHaveLength(5);
    expect(new Set(portfolioData.projects.map((project) => project.id)).size).toBe(5);

    for (const project of portfolioData.projects) {
      const repositoryUrl = new URL(project.repositoryUrl);
      expect(repositoryUrl.protocol).toBe("https:");
      expect(repositoryUrl.hostname).toBe("github.com");
    }
  });

  it("preserves the verified fall-detection and traffic-sign metrics", () => {
    const fallDetection = portfolioData.projects.find(
      (project) => project.id === "fall-detection",
    );
    const trafficSigns = portfolioData.projects.find(
      (project) => project.id === "traffic-sign-recognition",
    );

    expect(fallDetection?.metrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "F1", value: "92.37%" }),
        expect.objectContaining({ label: "ROC-AUC", value: "97.81%" }),
      ]),
    );
    expect(trafficSigns?.metrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "mAP50", value: "0.894" }),
        expect.objectContaining({ label: "mAP50-95", value: "0.642" }),
      ]),
    );
  });

  it("keeps skills evidence-based without proficiency percentages", () => {
    for (const group of portfolioData.skillGroups) {
      expect(group.skills.length).toBeGreaterThan(0);
      expect(group.skills.every((skill) => typeof skill === "string")).toBe(true);
      expect(group.skills.join(" ")).not.toMatch(/\b\d{1,3}%\b/);
    }
  });

  it("contains complete English and Vietnamese copy without private CV filenames", () => {
    expectLocalizedContent(portfolioData);
    expect(JSON.stringify(portfolioData)).not.toMatch(
      /CVthuctap|Tu-Do-TopCV|nguyen-hoang-minh|uploads\//i,
    );
  });
});
