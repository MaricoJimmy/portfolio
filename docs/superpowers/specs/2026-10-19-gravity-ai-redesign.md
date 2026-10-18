# Gravity-Inspired AI Portfolio Redesign

**Date:** 2026-10-19

**Status:** Approved by owner

## Intent

Reframe the existing verified bilingual AI portfolio as an immersive, scroll-led visual system inspired by the spatial confidence of gravity-design.de. Preserve Vu Van Tung's identity, portrait, project evidence, accessibility, and all working interactions. Do not copy the reference site's logo, text, nomination badge, composition measurements, or artwork.

## Visual direction

- Use a near-black full-page canvas instead of a light page surrounding isolated black cards.
- Make the opening screen a full-height stage with a monochrome portrait anchored to the right edge.
- Place one high-contrast interactive AI Core in the central visual field, large enough to be unmistakable.
- Use violet orbital forms and broad curved violet section transitions to create the feeling of gravity and spatial depth.
- Keep typography sparse and assertive: compact technical labels, oversized identity copy, and deliberate negative space.
- Replace the pill-shaped desktop navigation with a minimal fixed top system; preserve all section destinations and mobile accessibility.

## Narrative flow

1. **Identity stage:** portrait, AI Core, name, role, contact and compact navigation.
2. **Manifest:** a violet curved surface introduces biography, philosophy, and direction.
3. **Capabilities:** dark editorial skill bands with restrained borders.
4. **Selected systems:** evidence-led AI projects on a cinematic dark grid.
5. **Journey:** sparse chronological rows.
6. **Contact:** oversized final statement and direct links.

## Motion and 3D

- The AI Core is visually dominant on desktop and remains the only WebGL scene.
- Use a faceted shell, cyan wireframe inner core, three bright orbital rings, instanced particles, and violet/cyan lighting.
- Pointer movement supplies bounded parallax. Scroll subtly changes rotation and orbital separation.
- Hero portrait stays a normal optimized image and never becomes a WebGL texture.
- Reduced motion renders the completed composition immediately and stops continuous scene changes.
- The CSS fallback preserves the core silhouette if WebGL is unavailable.

## Preservation constraints

- Keep all verified content, metrics, repository assets, language behavior, filters, dialog focus management, copy-email feedback, metadata, and external links.
- Do not add unverified professional claims.
- Maintain keyboard access, visible focus, readable contrast, and graceful small-screen behavior, while prioritizing the desktop 3D presentation requested by the owner.

## Verification

Run the existing unit suite, TypeScript, ESLint, and production build. Then use Playwright at 1440×1000 to verify the new hero, scroll transition, project flow, EN/VI persistence, console state, reduced motion, and WebGL fallback. Save updated visual evidence under `output/playwright/`.
