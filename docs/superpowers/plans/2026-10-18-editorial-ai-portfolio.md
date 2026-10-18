# Editorial AI Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready bilingual Editorial AI Lab portfolio for Vu Van Tung, featuring verified AI/CV projects, an accessible interactive hero, and a responsive single-page experience.

**Architecture:** Use Next.js App Router with server-rendered page structure and narrowly scoped client islands for language state, navigation state, motion, project dialogs, clipboard feedback, and WebGL. Keep bilingual content in one typed data module, render one lazy-loaded React Three Fiber canvas around a normal optimized portrait image, and preserve a complete non-WebGL experience.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, React Three Fiber, Drei, Motion for React, Lucide React, Vitest, React Testing Library, Playwright CLI

**Spec:** `docs/superpowers/specs/2026-10-18-ai-portfolio-design.md`

## Global Constraints

- English is the default language; Vietnamese is available through a floating `EN / VI` control and the selection persists in `localStorage`.
- Public content must come from the approved spec and verified GitHub repositories; do not invent metrics, screenshots, proficiency levels, testimonials, or achievements.
- Use `public/images/vu-van-tung-profile.png`; do not copy the original selfie into the repository.
- Render one WebGL canvas only, lazy-load it without SSR, cap DPR, reduce mobile effects, pause offscreen/hidden work, and provide a complete static fallback.
- Server Components are the default. Add `"use client"` only to components that require browser state, motion, clipboard, observers, or WebGL.
- Do not add GSAP unless Motion and native scroll progress demonstrably cannot express the approved transition.
- Keep normal text contrast at or above 4.5:1, controls at least 44×44 CSS pixels, keyboard focus visible, and all core content usable without hover or motion.
- The contact section uses email, copy-email, GitHub, and LinkedIn only; no non-functional contact form.
- Keep generated Playwright artifacts under `output/playwright/`.

## Review Focus

- Missing or blocked WebGL must show the portrait and hero content without a blank panel; Task 4 owns the fallback test.
- Missing/corrupt stored language values must resolve to English without hydration mismatch; Task 2 owns the persistence tests.
- Clipboard denial or unavailable Clipboard API must show honest failure feedback and retain the visible email link; Task 6 owns the tests.
- Keyboard-only users must open, traverse, and close project details with focus restored to the trigger; Task 5 owns the dialog tests.
- Reduced-motion and narrow/low-power layouts must remove nonessential animation without hiding final content; Tasks 4 and 7 own the tests and browser checks.

---

## Planned file structure

```text
src/
  app/
    globals.css                 # design tokens, global layout, focus and reduced-motion rules
    layout.tsx                  # fonts, metadata, providers, document shell
    opengraph-image.tsx         # generated social image with verified identity copy
    page.tsx                    # semantic single-page section composition
  components/
    layout/
      navigation.tsx           # fixed navigation, mobile menu, active section
      site-shell.tsx            # background and main frame composition
    sections/
      hero.tsx                  # editorial hero, portrait, CTAs, 3D mount
      about.tsx                 # biography and philosophy
      skills.tsx                # verified grouped capabilities
      projects.tsx              # filters and project grid
      project-dialog.tsx        # accessible project case-study dialog
      journey.tsx               # education and UDATA timeline
      contact.tsx               # CTA, social links, clipboard feedback
    three/
      ai-core-canvas.tsx        # dynamic canvas boundary and fallback
      ai-core-scene.tsx         # scene, rings, particles, lights and adaptive motion
    ui/
      language-switcher.tsx     # floating EN/VI control
      section-heading.tsx       # consistent editorial headings
      reveal.tsx                # reduced-motion-aware reveal wrapper
      project-artwork.tsx       # labeled abstract previews
  data/
    portfolio.ts                # approved bilingual content and project evidence
  hooks/
    use-active-section.ts       # IntersectionObserver navigation state
    use-page-visibility.ts      # pause signal for animation
    use-reduced-motion.ts       # stable client motion preference
  lib/
    language-storage.ts         # safe parse/read/write helpers
  providers/
    language-provider.tsx       # language context and document lang synchronization
  types/
    portfolio.ts                # bilingual and content types
tests/
  setup.ts
  data/portfolio.test.ts
  lib/language-storage.test.ts
  components/language-switcher.test.tsx
  components/navigation.test.tsx
  components/hero.test.tsx
  components/ai-core-canvas.test.tsx
  components/projects.test.tsx
  components/project-dialog.test.tsx
  components/contact.test.tsx
  components/reduced-motion.test.tsx
public/images/
  vu-van-tung-profile.png
  projects/                    # selected real repository assets copied with provenance
```

### Task 1: Scaffold the application and verification foundation

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `.gitignore`

**Interfaces:**
- Consumes: approved spec and existing portrait asset.
- Produces: `npm run dev`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`; `RootLayout` and the `HomePage` composition point used by later tasks.

- [ ] **Step 1: Scaffold Next.js without overwriting approved files**

From PowerShell in the project root, use the current stable `create-next-app` to generate App Router, TypeScript, Tailwind, ESLint, `src/`, and npm files inside `tmp/portfolio-scaffold`. Copy only the generated application/configuration files into the project root, merge its empty `public/` with the existing portrait directory, and preserve `docs/`, `.git/`, and `public/images/vu-van-tung-profile.png`. Resolve and verify the temporary directory to be inside `C:\Users\PC\Downloads\phofolio\tmp` before removing it.

- [ ] **Step 2: Install runtime and test dependencies**

Install `three`, `@react-three/fiber`, `@react-three/drei`, `motion`, `lucide-react`, plus development dependencies `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, and `@types/three`. Commit the resulting lockfile.

- [ ] **Step 3: Configure test and typecheck scripts**

Add scripts `typecheck: tsc --noEmit` and `test: vitest run`; configure `vitest.config.ts` for `jsdom`, path alias `@`, and `tests/setup.ts`.

- [ ] **Step 4: Write the initial smoke test**

Create `tests/components/hero.test.tsx` with a temporary assertion that the home page exposes one `main` landmark and a level-one heading.

- [ ] **Step 5: Run the smoke test and verify it fails**

Run: `npm test -- tests/components/hero.test.tsx`

Expected: FAIL because the semantic portfolio page has not been implemented.

- [ ] **Step 6: Implement the minimal semantic shell**

Export metadata from `src/app/layout.tsx`; implement `src/app/page.tsx` with one `main`, one temporary level-one identity heading, and imports from `globals.css`.

- [ ] **Step 7: Run the foundation checks**

Run: `npm test -- tests/components/hero.test.tsx && npm run typecheck && npm run lint && npm run build`

Expected: all commands exit 0.

- [ ] **Step 8: Commit**

```powershell
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts tests src/app .gitignore
git commit -m "chore: scaffold portfolio application"
```

### Task 2: Add typed bilingual content and language persistence

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolio.ts`
- Create: `src/lib/language-storage.ts`
- Create: `src/providers/language-provider.tsx`
- Create: `src/components/ui/language-switcher.tsx`
- Create: `tests/data/portfolio.test.ts`
- Create: `tests/lib/language-storage.test.ts`
- Create: `tests/components/language-switcher.test.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: verified facts and copy constraints from the spec.
- Produces: `Language = "en" | "vi"`; `LocalizedText = Record<Language, string>`; `portfolioData: PortfolioData`; `readStoredLanguage(storage): Language`; `writeStoredLanguage(storage, language): boolean`; `useLanguage(): { language, setLanguage, t }`.

- [ ] **Step 1: Write failing content integrity tests**

In `tests/data/portfolio.test.ts`, assert five unique projects, exact verified metrics for Fall Detection and Street Sign Recognition, valid GitHub URLs, no numeric skill percentages, no empty English/Vietnamese strings, and no private-CV filenames.

- [ ] **Step 2: Write failing language-storage tests**

Assert missing, unavailable, and corrupt storage resolve to `"en"`; valid `"vi"` persists; failed writes return `false` without throwing.

- [ ] **Step 3: Define content types and approved bilingual data**

Implement focused types for profile, social link, skill group, project evidence, timeline entry, and navigation item. Encode only content approved in the spec.

- [ ] **Step 4: Implement safe storage helpers**

Use storage key `portfolio-language`; accept only `en` or `vi`; catch storage access errors.

- [ ] **Step 5: Run data and storage tests**

Run: `npm test -- tests/data/portfolio.test.ts tests/lib/language-storage.test.ts`

Expected: PASS.

- [ ] **Step 6: Write the failing language-switcher test**

Assert English is initially selected, selecting Vietnamese updates visible translated copy and `document.documentElement.lang`, selection is keyboard-operable, and remounting uses the stored choice without hiding initial English content.

- [ ] **Step 7: Implement the provider and floating switcher**

Keep initial render English for hydration stability, read storage after mount, expose a typed translation selector, update `document.documentElement.lang`, and render a two-button segmented control with an accessible group label.

- [ ] **Step 8: Run focused and global checks**

Run: `npm test -- tests/data/portfolio.test.ts tests/lib/language-storage.test.ts tests/components/language-switcher.test.tsx && npm run typecheck`

Expected: PASS.

- [ ] **Step 9: Commit**

```powershell
git add src/types src/data src/lib src/providers src/components/ui/language-switcher.tsx tests/data tests/lib tests/components/language-switcher.test.tsx src/app/layout.tsx
git commit -m "feat: add bilingual portfolio content"
```

### Task 3: Build the editorial shell, navigation, and portrait hero

**Files:**
- Create: `src/components/layout/site-shell.tsx`
- Create: `src/components/layout/navigation.tsx`
- Create: `src/components/sections/hero.tsx`
- Create: `src/components/ui/section-heading.tsx`
- Create: `src/hooks/use-active-section.ts`
- Create: `tests/components/navigation.test.tsx`
- Modify: `tests/components/hero.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `portfolioData`, `useLanguage()`, portrait path `/images/vu-van-tung-profile.png`.
- Produces: section IDs `home`, `about`, `skills`, `projects`, `experience`, `contact`; `useActiveSection(ids): string`; stable `<div id="ai-core-mount">` for Task 4.

- [ ] **Step 1: Write failing navigation tests**

Assert all six section links target valid IDs, mobile menu exposes a labeled toggle and closes after selection, active links expose `aria-current="location"`, and the skip link targets `#main-content`.

- [ ] **Step 2: Extend the failing hero test**

Assert localized name/role, optimized portrait alt text, Explore Projects and Contact Me anchors, GitHub/LinkedIn/email links, and exactly one level-one heading.

- [ ] **Step 3: Implement the active-section hook and navigation**

Use `IntersectionObserver` with deterministic cleanup; provide a safe `home` fallback when the API is unavailable. Keep desktop and mobile navigation content identical.

- [ ] **Step 4: Implement the site shell and editorial hero**

Create the large rounded near-black frame, asymmetric violet portrait field, oversized responsive typography, social rail, CTAs, scroll cue, and empty 3D mount. Use Next Image with reserved dimensions and priority only for the hero portrait.

- [ ] **Step 5: Define visual tokens and responsive rules**

In `globals.css`, define semantic colors, spacing, radius, grain overlay, focus ring, selection color, fluid type scales, and breakpoints that avoid overflow at 375 px.

- [ ] **Step 6: Run focused tests and static checks**

Run: `npm test -- tests/components/navigation.test.tsx tests/components/hero.test.tsx && npm run typecheck && npm run lint`

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/components/layout src/components/sections/hero.tsx src/components/ui/section-heading.tsx src/hooks/use-active-section.ts src/app tests/components/navigation.test.tsx tests/components/hero.test.tsx
git commit -m "feat: build editorial portfolio hero"
```

### Task 4: Add the adaptive AI Core scene and fallback

**Files:**
- Create: `src/components/three/ai-core-canvas.tsx`
- Create: `src/components/three/ai-core-scene.tsx`
- Create: `src/hooks/use-page-visibility.ts`
- Create: `src/hooks/use-reduced-motion.ts`
- Create: `tests/components/ai-core-canvas.test.tsx`
- Modify: `src/components/sections/hero.tsx`

**Interfaces:**
- Consumes: `reducedMotion: boolean`, `pageVisible: boolean`, and container dimensions.
- Produces: `AiCoreCanvas` with lazy client rendering, accessible canvas label, and `data-testid="ai-core-fallback"`; `AiCoreScene({ reducedMotion, active, compact })`.

- [ ] **Step 1: Write failing fallback and lifecycle tests**

Assert the fallback preserves portrait/hero visibility before Canvas loads, failed dynamic import keeps the fallback, reduced motion passes a static flag, and page visibility changes set animation activity without removing content.

- [ ] **Step 2: Implement visibility and reduced-motion hooks**

Use `visibilitychange` and `matchMedia`; clean up listeners with the same callback references; return stable defaults for SSR and tests.

- [ ] **Step 3: Implement the lazy canvas boundary**

Load the Canvas client-only, cap DPR to `[1, 1.5]`, choose antialiasing at renderer creation, set an accessible description, and keep a CSS orbital fallback behind the portrait.

- [ ] **Step 4: Implement the scene**

Create reusable central geometry, three orbital rings, restrained instanced particles, violet/blue lighting, pointer parallax, and scroll-linked separation. Allocate no geometry/materials inside `useFrame`; skip continuous changes when inactive or reduced motion is set.

- [ ] **Step 5: Add compact mobile quality rules**

Use container width and coarse-pointer media state to reduce particle count, DPR, light count, and pointer response; never derive renderer size solely from `window.innerWidth`.

- [ ] **Step 6: Run focused tests and build**

Run: `npm test -- tests/components/ai-core-canvas.test.tsx && npm run typecheck && npm run build`

Expected: PASS; production build completes without server-side WebGL access.

- [ ] **Step 7: Commit**

```powershell
git add src/components/three src/hooks/use-page-visibility.ts src/hooks/use-reduced-motion.ts src/components/sections/hero.tsx tests/components/ai-core-canvas.test.tsx
git commit -m "feat: add adaptive AI core scene"
```

### Task 5: Implement About, Skills, and accessible project case studies

**Files:**
- Create: `src/components/sections/about.tsx`
- Create: `src/components/sections/skills.tsx`
- Create: `src/components/sections/projects.tsx`
- Create: `src/components/sections/project-dialog.tsx`
- Create: `src/components/ui/project-artwork.tsx`
- Create: `tests/components/projects.test.tsx`
- Create: `tests/components/project-dialog.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Create/Modify: `public/images/projects/*`

**Interfaces:**
- Consumes: typed localized project and skill data.
- Produces: `Projects` filter values `all | ai-cv | nlp | interaction`; `ProjectDialog({ project, open, onOpenChange, triggerRef })`; artwork labels that distinguish real previews from abstract previews.

- [ ] **Step 1: Select and copy project assets with provenance**

Use only repository-owned evaluation/pipeline/preview images from the reviewed public repositories. Record each source repository/path in a short comment beside the asset entry in `portfolio.ts`; generate CSS artwork instead of inventing screenshots when no valid preview exists.

- [ ] **Step 2: Write failing project-grid tests**

Assert all five projects render in `all`, filters expose counts and keyboard-operable buttons, the two verified metrics appear exactly, and abstract assets display `Abstract preview` in both languages.

- [ ] **Step 3: Write failing dialog tests**

Assert Enter opens the selected project, the dialog has a localized accessible name, Tab remains within its controls, Escape closes it, focus returns to the originating card, and repository links use safe external-link attributes.

- [ ] **Step 4: Implement About and Skills**

Render localized evidence-led copy, grouped skill chips without percentages, and reusable section headings. Avoid client components unless an interaction requires one.

- [ ] **Step 5: Implement Projects and ProjectDialog**

Render semantic articles, category filters, real/abstract previews, metrics, limitations, and repository links. Implement dialog focus handling with the native dialog semantics or a small internal focus trap; do not add a UI framework solely for the dialog.

- [ ] **Step 6: Add responsive editorial project styling**

Use large varied card spans on desktop, one-column cards on mobile, bounded pointer tilt on fine pointers, and equivalent focus styling/content without hover.

- [ ] **Step 7: Run focused tests and accessibility-oriented assertions**

Run: `npm test -- tests/components/projects.test.tsx tests/components/project-dialog.test.tsx && npm run typecheck && npm run lint`

Expected: PASS.

- [ ] **Step 8: Commit**

```powershell
git add src/components/sections/about.tsx src/components/sections/skills.tsx src/components/sections/projects.tsx src/components/sections/project-dialog.tsx src/components/ui/project-artwork.tsx src/app public/images/projects tests/components/projects.test.tsx tests/components/project-dialog.test.tsx src/data/portfolio.ts
git commit -m "feat: add AI project case studies"
```

### Task 6: Add the journey and honest contact interaction

**Files:**
- Create: `src/components/sections/journey.tsx`
- Create: `src/components/sections/contact.tsx`
- Create: `tests/components/contact.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: localized timeline, email, GitHub, and LinkedIn data.
- Produces: `copyEmail(email, clipboard): Promise<"copied" | "failed">`; visible localized status in an `aria-live="polite"` region.

- [ ] **Step 1: Write failing clipboard tests**

Assert successful copy shows an honest localized confirmation; rejected/unavailable Clipboard API shows failure text; the `mailto:` link stays available in all states; status is announced politely and resets on a later attempt.

- [ ] **Step 2: Implement the USTH/UDATA journey**

Render chronological entries for USTH 2022–2026, UDATA internship April–July 2026, UDATA Fresher Software Engineer July 2026–present, and AI Engineer goal. Avoid invented duties or achievements.

- [ ] **Step 3: Implement contact and clipboard states**

Expose email as a normal link, copy as a separate labeled button, and render GitHub/LinkedIn with safe external-link behavior.

- [ ] **Step 4: Run focused tests and checks**

Run: `npm test -- tests/components/contact.test.tsx && npm run typecheck && npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/components/sections/journey.tsx src/components/sections/contact.tsx src/app tests/components/contact.test.tsx
git commit -m "feat: add career journey and contact"
```

### Task 7: Add restrained motion, metadata, and accessibility hardening

**Files:**
- Create: `src/components/ui/reveal.tsx`
- Create: `tests/components/reduced-motion.test.tsx`
- Modify: `src/components/layout/navigation.tsx`
- Modify: `src/components/sections/*.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/app/opengraph-image.tsx`

**Interfaces:**
- Consumes: `useReducedMotion()` and stable section content.
- Produces: `Reveal({ children, delay?, className? })`; final metadata title, description, Open Graph data, and validated `NEXT_PUBLIC_SITE_URL` handling with a local-build fallback.

- [ ] **Step 1: Write failing reduced-motion tests**

Assert reveal content is immediately visible when reduced motion is true, navigation scrolling uses non-animated behavior, hover-only transforms are disabled, and no component leaves content at opacity zero.

- [ ] **Step 2: Implement the reveal primitive**

Use Motion for transform/opacity entrances with 150–500 ms context-appropriate durations; under reduced motion render the completed state without spatial travel.

- [ ] **Step 3: Apply motion to narrative transitions**

Add staggered hero copy, section reveals, restrained card feedback, and active-navigation transitions. Keep layout-affecting dimensions static and avoid continuous DOM animation.

- [ ] **Step 4: Finalize metadata and social image**

Set English human-readable metadata defaults, GitHub/LinkedIn profile references, theme color, and an App Router `ImageResponse` Open Graph image without unverified claims. Read the origin from `NEXT_PUBLIC_SITE_URL`, validate it as an absolute `http:` or `https:` URL, and fall back to `http://localhost:3000` only for local builds.

- [ ] **Step 5: Run the complete automated suite**

Run: `npm test && npm run typecheck && npm run lint && npm run build`

Expected: all commands exit 0 with no skipped failure-path tests.

- [ ] **Step 6: Commit**

```powershell
git add src tests/components/reduced-motion.test.tsx
git commit -m "feat: polish motion metadata and accessibility"
```

### Task 8: Validate the production experience with Playwright CLI

**Files:**
- Create: `output/playwright/desktop-home.png`
- Create: `output/playwright/tablet-projects.png`
- Create: `output/playwright/mobile-menu.png`
- Create: `output/playwright/reduced-motion.png`
- Modify: implementation files only when verification reveals a defect.

**Interfaces:**
- Consumes: a successful production build and production server URL.
- Produces: visual QA evidence and a clean final verification report; no Playwright test-spec files unless the user later requests them.

- [ ] **Step 1: Verify Playwright CLI prerequisites**

Run in PowerShell from the project root: `Get-Command npx`

Expected: the command resolves to the installed Node/npm toolchain.

- [ ] **Step 2: Run the final static checks**

Run: `npm test && npm run typecheck && npm run lint && npm run build`

Expected: all commands exit 0.

- [ ] **Step 3: Start the production server**

Run in a persistent project-root PowerShell session: `npm run start`

Expected: Next.js reports a local URL and accepts HTTP requests.

- [ ] **Step 4: Open and snapshot the desktop experience**

Use `C:\Users\PC\.codex\skills\playwright\scripts\playwright_cli.sh` through Git Bash/WSL if available, or the equivalent `npx --package @playwright/cli playwright-cli` invocation from PowerShell. Open the local URL headed, set a 1440×1000 viewport, then snapshot before using element refs.

- [ ] **Step 5: Exercise core flows**

Using fresh snapshots after each major change, verify section navigation, active state, EN→VI translation, persisted VI after reload, project filtering, opening/closing a case study, focus restoration, copy-email success/failure feedback, and GitHub/LinkedIn targets.

- [ ] **Step 6: Check console and failure modes**

Confirm no uncaught console errors or hydration warnings. Emulate reduced motion and verify final content remains visible; block or disable WebGL where supported and verify the static hero fallback remains complete.

- [ ] **Step 7: Check tablet and mobile layouts**

Repeat snapshots at 768×1024 and 375×812. Verify the mobile menu, 44 px controls, no horizontal overflow, readable hero copy, reduced 3D load, project dialog containment, and floating language control placement.

- [ ] **Step 8: Capture visual artifacts**

Save the four named screenshots under `output/playwright/`. Inspect each for clipping, illegible contrast, overlapping layers, broken portrait crop, and inconsistent spacing.

- [ ] **Step 9: Fix and re-run affected checks**

For every defect, identify the responsible component, make the smallest change, rerun its focused test, then repeat the affected Playwright flow and screenshot.

- [ ] **Step 10: Commit the verified result**

```powershell
git add src public output/playwright
git commit -m "test: verify responsive portfolio experience"
```
