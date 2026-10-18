# Gravity-Inspired AI Portfolio Redesign Plan

> **Execution:** Native inline implementation using Superpowers, UI/UX Pro Max, TDD, and Playwright CLI.

**Goal:** Transform the completed editorial portfolio into a dark, scroll-led, 3D-first experience while preserving verified content and tested behavior.

**Spec:** `docs/superpowers/specs/2026-10-19-gravity-ai-redesign.md`

### Task 1: Recompose the identity stage

- [ ] Extend hero tests with stable stage/3D contracts.
- [ ] Rework navigation into a minimal fixed dark system without changing destinations.
- [ ] Recompose the hero as a full-height black stage with monochrome right portrait, large AI Core, compact identity lockup, and social/contact rails.
- [ ] Run hero/navigation tests, typecheck, and lint.

### Task 2: Build the gravity scroll language

- [ ] Convert the page canvas to near-black.
- [ ] Shape About as a curved violet manifest transition.
- [ ] Restyle Skills, Projects, Journey, and Contact as one continuous cinematic narrative.
- [ ] Keep project filters/dialog and contact behavior unchanged.
- [ ] Run all component tests.

### Task 3: Upgrade the AI Core

- [ ] Increase desktop fidelity without increasing the number of canvases.
- [ ] Strengthen faceted/wireframe contrast, orbital depth, lighting, and bounded scroll/pointer response.
- [ ] Keep compact and reduced-motion behavior adaptive.
- [ ] Run AI Core tests, typecheck, lint, and production build.

### Task 4: Browser verification and delivery

- [ ] Start the production server and validate at 1440×1000 with Playwright CLI.
- [ ] Verify EN/VI persistence, navigation, filters, dialog focus restoration, contact feedback, reduced motion, no horizontal overflow, and fallback presence.
- [ ] Capture `output/playwright/gravity-desktop.png`, `gravity-projects.png`, and `gravity-reduced-motion.png`.
- [ ] Inspect screenshots, fix visual defects, rerun affected checks, and commit the verified result.
