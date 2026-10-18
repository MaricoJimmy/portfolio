# Vu Van Tung — Editorial AI Portfolio Design

**Date:** 2026-10-18

**Status:** Approved in conversation; awaiting written-spec review

**Owner:** Vu Van Tung

## 1. Product intent

Build a production-ready, bilingual developer portfolio that presents Vu Van Tung as a software engineer progressing toward an AI Engineer role, with particular strength in computer vision and applied AI systems. The primary audience is recruiters and engineering teams. The experience must feel distinctive and premium while keeping technical evidence readable and credible.

Success means that a visitor can quickly understand the candidate's direction, inspect verified project work and metrics, follow links to source repositories, and make contact. The portfolio must not invent employment details, project performance, screenshots, or skill levels.

## 2. Verified profile information

- Name: Vu Van Tung / Vũ Văn Tùng
- Current role: Fresher Software Engineer at Công ty Cổ phần UDATA, July 2026–present
- Previous role: Software Engineer Intern at Công ty Cổ phần UDATA, April–July 2026
- Education: University of Science and Technology of Hanoi (USTH), 2022–2026
- Career goal: AI Engineer, focused on computer vision and applied AI
- GitHub: <https://github.com/MaricoJimmy>
- LinkedIn: <https://www.linkedin.com/in/t%C3%B9ng-v%C5%A9-v%C4%83n-7b85493b7/>
- Email: `vuvantung204@gmail.com`

## 3. Experience concept

The selected direction is **Editorial AI Lab**. It combines the asymmetric editorial composition of the supplied visual reference with a restrained AI engineering interface language. A realistic studio portrait, derived from the owner's supplied photograph with permission, adds a personal focal point without replacing the technical AI Core motif.

The visual system uses:

- A light-gray, subtly grained page background framing large black editorial surfaces.
- Near-black and midnight surfaces with off-white typography.
- Violet as the primary identity color, supported by blue and limited cyan for technical data and metrics.
- Large geometric typography, visible grid logic, thin technical labels, and generous negative space.
- Selective glass effects and soft shadows; no excessive neon or generic dashboard styling.
- One visually dominant 3D object rather than multiple competing WebGL scenes.

The implementation may take inspiration from the reference composition, but must not reproduce its branding, copy, or exact artwork.

## 4. Information architecture

The site is a single-page narrative:

1. **Hero** — identity, role, career direction, primary CTAs, social links, and interactive AI Core.
2. **About** — concise biography, engineering philosophy, technical interests, and goals.
3. **Skills** — verified capabilities grouped by AI/Computer Vision, Software Engineering, and Tools.
4. **Featured Projects** — five evidence-led AI/CV case studies.
5. **Experience & Education** — USTH and UDATA timeline.
6. **Contact** — direct email, copy-email action, GitHub, and LinkedIn.

A fixed navigation provides section links and an active-section indicator. A floating `EN / VI` control switches the entire interface language without reloading the page. English is the default and the last selection is stored locally.

## 5. Hero design

The desktop hero appears as a large rounded black editorial frame over the textured light-gray background.

- Left/center: an asymmetric violet geometric field containing the approved studio portrait, framed by a custom interactive AI Core and orbital elements.
- Right: oversized introduction copy, including “Hey — I'm Vu Van Tung” and “Software Engineer / Aspiring AI Engineer.”
- Supporting copy: a short, credible positioning statement centered on computer vision and production-oriented AI.
- Primary CTA: Explore Projects.
- Secondary CTA: Contact Me.
- Footer rail: GitHub, LinkedIn, email, scroll cue, and small technical labels.

The AI Core consists of a central faceted form, layered rings/orbits, restrained particles, and dynamic violet/blue lighting positioned around the portrait. The portrait remains a crisp, accessible image layer rather than being distorted as a WebGL texture. Pointer input causes controlled parallax and rotation in the surrounding core. Scroll input shifts the camera and decomposes the orbital layers slightly. The motion remains subtle enough to preserve the portrait and text readability.

The approved portrait asset is stored at `public/images/vu-van-tung-profile.png`. It uses a clean, light-gray ID-photo-style studio background while preserving the owner's real appearance. The original photograph remains outside the project and is not copied into the repository.

On mobile, content becomes a vertical composition. The 3D field remains visible but uses fewer particles, lower pixel density, reduced pointer effects, and shorter motion sequences.

## 6. Featured projects

### 6.1 Multi-Person Fall Detection — primary case study

- Repository: <https://github.com/MaricoJimmy/Fall_detection>
- Pipeline: RGB video → YOLOv8-Pose → BoT-SORT IDs → two-second pose sequence → TCN → per-person alert.
- Verified evaluation: 6,908 usable sequences from 6,988 audited videos; accuracy 93.23%, precision 92.98%, recall 91.77%, F1 92.37%, ROC-AUC 97.81% on 1,034 test videos.
- Important caveat: clip-level weak supervision and no clinical validation.

### 6.2 Street Sign Recognition

- Repository: <https://github.com/MaricoJimmy/streetsignrecognitionproject>
- Stack: YOLOv8s, SAHI, PyTorch, OpenCV, Ultralytics.
- Verified comparison: baseline mAP50 0.853 and mAP50–95 0.602; SAHI mAP50 0.894 and mAP50–95 0.642.
- Narrative: improving small-object traffic-sign detection with sliced inference.

### 6.3 Smart CV Matching

- Repository: <https://github.com/MaricoJimmy/Smart-CV-Matching-using-AI-NLP>
- Stack: Flask, Sentence Transformers, FAISS HNSW, OCR, NLP/NER, pandas, PyTorch.
- Narrative: extracting resume content and ranking job matches with semantic embeddings and vector search.
- No performance metric is shown because the repository does not document a reliable evaluation result. Uploaded personal CV files are never copied into the portfolio.

### 6.4 Gesture-Controlled Interface

- Repository: <https://github.com/MaricoJimmy/Count-finger-and-control-mouse-with-mediapipe>
- Stack: MediaPipe Tasks, OpenCV, NumPy, PyAutoGUI.
- Features: hand landmark tracking, finger counting, cursor smoothing, pinch-to-click, gesture drawing, and CPU fallback when the Windows MediaPipe build lacks GPU support.

### 6.5 AI Drawing Recognition

- Repository: <https://github.com/MaricoJimmy/Guess-object-with-Mediapipe->
- Stack: MediaPipe, OpenCV, Gemini Vision, Pillow.
- Features: draw with an index-finger gesture, capture the canvas, and request a concise Vietnamese object classification from Gemini.

Project cards use repository assets only when they genuinely represent the project. A missing preview is replaced with a branded geometric artwork explicitly labeled “Abstract preview.” Each expanded case study shows the challenge, pipeline, stack, verified evidence, limitations, and repository link.

## 7. Skills presentation

Skills are included only when supported by the reviewed repositories or supplied history. No proficiency percentages are used.

- AI and computer vision: Python, PyTorch, OpenCV, YOLO/Ultralytics, MediaPipe, SAHI, temporal convolutional networks, pose estimation, object detection, tracking, NLP embeddings, FAISS, OCR.
- Software engineering: TypeScript, JavaScript, React, REST APIs, Flask, data validation, testing, Git.
- Tools and infrastructure: Docker only if corroborated during implementation review; GitHub, Windows/PowerShell workflows, model evaluation and reporting.

Unverified suggestions are kept out of public content rather than presented as confirmed abilities.

## 8. Motion and interaction

- Motion for React handles section reveals, staggered text, navigation, panel transitions, and project-card micro-interactions.
- GSAP ScrollTrigger is added only if the final hero-to-content transition cannot be expressed cleanly with Motion and native scroll progress.
- Project cards use modest perspective tilt and an edge highlight; all information remains accessible without hover.
- Smooth section navigation respects reduced-motion preferences.
- The 3D scene becomes static or near-static under `prefers-reduced-motion` and exposes a meaningful accessible label.
- Pointer targets are at least 44×44 CSS pixels and keyboard focus remains visible.

## 9. Technical architecture

Use Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber, Drei, Motion for React, and Lucide React. Avoid adding libraries that duplicate existing platform or framework capabilities.

Suggested structure:

```text
src/
  app/
  components/
    layout/
    sections/
    three/
    ui/
  data/
  hooks/
  lib/
  styles/
  types/
```

- Server Components are the default.
- Client boundaries are limited to navigation state, language state, animated interactions, and WebGL.
- `src/data/portfolio.ts` contains typed English and Vietnamese content.
- A small language provider manages `EN / VI` and browser persistence without a heavy internationalization dependency.
- The Three.js scene is loaded dynamically without server rendering.
- SEO uses the App Router metadata API, canonical metadata, Open Graph values, and meaningful page copy.

## 10. Performance and resilience

- Use a single WebGL canvas.
- Cap device pixel ratio and reduce geometry/particles for smaller or low-power devices.
- Reuse geometry and materials, dispose resources correctly, and avoid allocations inside render loops.
- Pause unnecessary animation while the scene is offscreen or the page is hidden.
- Size the renderer from its canvas container, not global window dimensions.
- Lazy-load the 3D client bundle and reserve layout space to avoid cumulative layout shift.
- Provide an editorial CSS fallback when WebGL initialization fails.
- Optimize repository images through Next.js and avoid shipping training artifacts or model weights.
- External-link failures do not break the page; copy-email provides clear success/failure feedback.

## 11. Accessibility

- Semantic landmarks and heading order.
- Text contrast of at least 4.5:1 for normal copy.
- Visible keyboard focus and skip-to-content support.
- Accessible names for icon buttons and the WebGL canvas.
- No critical information conveyed only by color, motion, hover, or the 3D scene.
- Touch-friendly controls and no forced horizontal scrolling at 375 px.
- User zoom remains enabled.

## 12. Verification

Before delivery:

1. Run ESLint and TypeScript checks.
2. Produce a successful Next.js production build.
3. Serve the production output locally.
4. Use Playwright CLI against the real browser at 1440 px, 768 px, and 375 px widths.
5. Verify navigation, active section state, language switching and persistence, project panels, copy-email behavior, external links, keyboard navigation, reduced motion, and WebGL fallback.
6. Inspect browser console errors and capture screenshots in `output/playwright/` for visual review.
7. Correct failures introduced by the implementation and rerun affected checks.

## 13. Scope boundaries

- No backend contact form without a configured delivery service.
- No fabricated metrics, clients, testimonials, work achievements, or project screenshots.
- No private repository source or personal CV data is exposed.
- No additional application features such as accounts, a CMS, or analytics dashboard.
- Deployment is outside the initial implementation unless the owner requests it after local verification.

