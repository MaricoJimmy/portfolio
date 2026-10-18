export type Language = "en" | "vi";

export type LocalizedText = Record<Language, string>;

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

export type ProjectCategory = "ai-cv" | "nlp" | "interaction";

export interface NavigationItem {
  id: SectionId;
  label: LocalizedText;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
}

export interface SkillGroup {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  skills: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectEvidence {
  id: string;
  name: LocalizedText;
  category: ProjectCategory;
  summary: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  limitation: LocalizedText;
  technologies: string[];
  repositoryUrl: string;
  metrics: ProjectMetric[];
  preview: {
    kind: "real" | "abstract";
    src?: string;
    source?: string;
  };
}

export interface JourneyEntry {
  id: string;
  period: LocalizedText;
  role: LocalizedText;
  organization: LocalizedText;
  description: LocalizedText;
}

export interface PortfolioData {
  profile: {
    name: LocalizedText;
    eyebrow: LocalizedText;
    role: LocalizedText;
    tagline: LocalizedText;
    biography: LocalizedText;
    philosophy: LocalizedText;
    goal: LocalizedText;
    email: string;
    portrait: string;
  };
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  skillGroups: SkillGroup[];
  projects: ProjectEvidence[];
  journey: JourneyEntry[];
  ui: {
    skipToContent: LocalizedText;
    languageLabel: LocalizedText;
    openMenu: LocalizedText;
    closeMenu: LocalizedText;
    exploreProjects: LocalizedText;
    contactMe: LocalizedText;
    viewCaseStudy: LocalizedText;
    repository: LocalizedText;
    close: LocalizedText;
    allProjects: LocalizedText;
    abstractPreview: LocalizedText;
    copied: LocalizedText;
    copyFailed: LocalizedText;
    copyEmail: LocalizedText;
  };
}
