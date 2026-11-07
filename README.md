# Vu Van Tung — Portfolio

Personal portfolio of **Vu Van Tung**, software engineer focused on computer vision and applied AI.
Bilingual (English / Tiếng Việt), built around an interactive 3D hero and scroll-driven motion.

## Highlights

- **3D hero** — a ringed gas giant with an orbiting moon (React Three Fiber). It follows the mouse
  and settles into the corner as you scroll.
- **Scroll choreography** — Lenis smooth scrolling with GSAP ScrollTrigger: shutter transitions
  between sections, project image parallax, and a footer reveal on Contact.
- **Interactions** — paint-brush cursor trail on the purple sections, water ripples on About,
  glitching tech labels.
- **AI chatbot** — uLeadGen chat widget, lazy-loaded so it doesn't slow the first paint.
- **Accessible by default** — every animation is disabled under `prefers-reduced-motion`, and
  pointer effects only run on mouse/trackpad devices.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Three.js / React Three Fiber ·
GSAP + ScrollTrigger · Lenis · Motion · Vitest + Testing Library

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server             |
| `npm run build`     | Production build                 |
| `npm start`         | Serve the production build       |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | TypeScript, no emit              |
| `npm test`          | Vitest test suite                |

### Environment

| Variable               | Purpose                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for metadata and Open Graph images. Defaults to `http://localhost:3000`. |

## Editing content

All copy — profile, skills, projects, experience, links — lives in
[`src/data/portfolio.ts`](src/data/portfolio.ts), with `en` / `vi` strings side by side.
Images go in `public/images/`.

## Project structure

```
src/
  app/               layout, page, global styles, favicon, OG image
  components/
    layout/          navigation, site shell, scroll effects (Lenis + GSAP)
    sections/        hero, about, skills, projects, journey, contact
    three/           3D hero planet
    ui/              reveal, scroll text, paint trail, language switcher, …
  data/              portfolio content
  hooks/ lib/        scroll motion, reduced motion, page visibility
tests/               Vitest specs
```

## Chatbot

The widget is embedded in [`src/app/layout.tsx`](src/app/layout.tsx). Its appearance, avatar and
allowed domains are managed in the uLeadGen dashboard — add your production domain to the
**Domain Whitelist** there, or the widget will not show. An animated launcher icon is available at
`public/images/chat-icon.gif`.
