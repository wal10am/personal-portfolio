# Phase 1 — Foundation

Source: `docs/project-plan.md`, Section 6 ("Phase 1 — Foundation") plus the
supporting detail in Sections 2 (Custom Hooks) and 3 (CSS Design-Token
System).

Goal: `npm install && npm run dev` produces a running, empty-but-styled
shell — full project scaffold, full design-token set, all five hooks
implemented and exercisable in isolation, App renders skeleton sections in
final order. No section content yet (that's Phase 2).

Status legend: all items below start as `Not Started`.

---

## FOUND-01 — Project scaffold files

**Description:** Create the root project files that make the repo a valid,
installable Vite + React 18 project: `package.json`, `vite.config.js`,
`index.html`, `.gitignore`, `.env.example`.

**Files:** `package.json`, `vite.config.js`, `index.html`, `.gitignore`,
`.env.example`

**Acceptance Criteria:**
- Given a clean checkout of the repo, when `npm install` is run, then it
  completes with no errors using `react ^18.3.0`, `react-dom ^18.3.0`,
  `vite ^5.4.0`, and `@vitejs/plugin-react ^4.3.0` as declared dependencies
  (real, resolvable, mainstream version ranges — not invented).
- Given `package.json`, when inspected, then it declares `"type": "module"`
  (or is otherwise consistent with Vite's ESM defaults), a `dev`/`build`/
  `preview` npm script trio, and no unrelated/unaudited extra dependencies.
- Given `index.html`, when inspected, then it is the Vite entry point
  containing `<div id="root"></div>` and
  `<script type="module" src="/src/main.jsx"></script>`.
- Given `vite.config.js`, when inspected, then it registers
  `@vitejs/plugin-react` and contains no hardcoded secrets or
  environment-specific values (ports, API URLs, tokens).
- Given `.gitignore`, when inspected, then it excludes `node_modules/`,
  build output (`dist/`), local env files (`.env`, `.env.local`), and OS/
  editor cruft (`.DS_Store`, editor dirs).
- Given `.env.example`, when inspected, then it documents any
  environment-shaped values as placeholder keys only (no real values, no
  secrets) — acceptable to be empty/minimal if no env vars are needed yet.
- Given the scaffold is complete, when `npm run dev` is run, then a local
  dev server boots without console errors.

**Dependencies:** none (first item).

---

## FOUND-02 — `src/main.jsx` entry point

**Description:** Create the React entry point that mounts `<App />` into
`#root` and imports the single global stylesheet aggregator.

**Files:** `src/main.jsx`

**Acceptance Criteria:**
- Given `src/main.jsx`, when inspected, then it uses `ReactDOM.createRoot`
  (React 18 API, not the legacy `ReactDOM.render`) to mount `<App />` into
  the `#root` element from `index.html`.
- Given `src/main.jsx`, when inspected, then it imports the global styles
  entry point once (either a `src/styles/index.css` aggregator or the seven
  global stylesheets imported directly in cascade order: variables → reset →
  typography → layout → nav → animations → responsive).
- Given `main.jsx` renders `<App />` wrapped in `<React.StrictMode>`, when
  the dev server runs, then no StrictMode-related warnings appear in the
  console.
- Given `App.jsx` does not exist yet at the time this item starts, when this
  item is worked, then a minimal placeholder `App.jsx` (empty `<div>` or
  fragment) is acceptable as a stub — FOUND-15 owns the real skeleton.

**Dependencies:** FOUND-01.

---

## FOUND-03 — `variables.css` design tokens

**Description:** Implement the full design-token set from project-plan
Section 3 (color, typography, spacing, layout/sizing, effects/motion) on
`:root` in `src/styles/variables.css`. This is the single origin point for
every raw value used anywhere in the CSS.

**Files:** `src/styles/variables.css`

**Acceptance Criteria:**
- Given `variables.css`, when inspected, then it declares all color tokens
  from Section 3.1 with exact values: `--color-bg: #14161a`,
  `--color-surface: #1c1f26`, `--color-surface-alt: #22262f`,
  `--color-border: #2b2f3a`, `--color-accent: #3fa9f5`,
  `--color-accent-hover: #63bdf7`,
  `--color-accent-muted: rgba(63, 169, 245, 0.15)`,
  `--color-text: #f5f6f8`, `--color-text-secondary: #b6bcc7`,
  `--color-text-tertiary: #7d8494`, `--color-success: #3fd68a`,
  `--color-error: #f5576c`, `--color-focus-ring: #3fa9f5`.
- Given `variables.css`, when inspected, then it declares all typography
  tokens from Section 3.2, including `--font-sans` as the system stack
  (`'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Helvetica, Arial, sans-serif`) with **no** `@import` or `<link>` to
  Google Fonts or any external font CDN anywhere in the project.
- Given `variables.css`, when inspected, then it declares all spacing
  tokens (`--space-1` through `--space-16`) from Section 3.3, all
  layout/sizing tokens (`--container-max-width`, `--container-padding-inline`,
  `--nav-height`, `--radius-*`) from Section 3.4, and all effects/motion
  tokens (`--shadow-*`, `--transition-*`, `--z-*`) from Section 3.5, with
  exact values as specified.
- Given the accent color is used anywhere in the design, when compared to
  Brett Hardiman's portfolio palette, then it is the neutral blue
  `#3fa9f5` — Spotify green `#1DB954` (or any other green) does not appear
  anywhere in `variables.css` or any other stylesheet.
- Given this file is complete, when any other stylesheet is authored, then
  it can express every color/spacing/radius/shadow/font value it needs via
  `var(--token-name)` without needing a new raw literal.

**Dependencies:** FOUND-01.

---

## FOUND-04 — `reset.css`

**Description:** A minimal, modern CSS reset (box-sizing, margin/padding
normalization, media defaults) consuming design tokens where applicable
(e.g. body background/text color).

**Files:** `src/styles/reset.css`

**Acceptance Criteria:**
- Given `reset.css`, when inspected, then `*, *::before, *::after` are set
  to `box-sizing: border-box`, and default browser margins on headings,
  paragraphs, lists, and form elements are zeroed or normalized.
- Given `reset.css` sets a base `body` background and text color, when
  inspected, then it uses `var(--color-bg)` and `var(--color-text)` rather
  than raw hex values.
- Given `img`, `picture`, `video`, `canvas`, `svg` elements, when inspected
  in `reset.css`, then they have `max-width: 100%` / `display: block` (or
  equivalent) to prevent overflow on narrow viewports.
- Given `reset.css` is loaded before any other stylesheet (variables
  excepted), when the page renders, then no un-styled/unreset native
  browser chrome (default list bullets, default link underline/color) is
  visible.

**Dependencies:** FOUND-03.

---

## FOUND-05 — `typography.css`

**Description:** Base type scale, heading hierarchy defaults, and body text
styling, entirely token-driven.

**Files:** `src/styles/typography.css`

**Acceptance Criteria:**
- Given `typography.css`, when inspected, then `body`/base text uses
  `var(--font-sans)`, `var(--font-size-base)`, `var(--line-height-base)`,
  and `var(--color-text)`.
- Given heading elements (`h1`–`h3` at minimum), when inspected, then their
  `font-size` values map to the type scale tokens (`--font-size-xl`
  through `--font-size-3xl`) and `line-height` uses
  `var(--line-height-tight)`.
- Given links (`a`), when inspected, then their default and `:hover` color
  use `var(--color-accent)` / `var(--color-accent-hover)` and there is a
  visible `:focus-visible` style using `var(--color-focus-ring)`.
- Given the file, when scanned for raw values, then it contains zero raw
  hex colors, zero raw px font-sizes, and zero hardcoded font-family
  strings outside of `var(--token-name)` usage (per Section 3.6's
  no-raw-values rule).

**Dependencies:** FOUND-03.

---

## FOUND-06 — `layout.css`

**Description:** Shared layout primitives — page container, section
spacing rhythm, and the minimal chrome styling for `ScrollProgress` (which
has no dedicated stylesheet per Section 4).

**Files:** `src/styles/layout.css`

**Acceptance Criteria:**
- Given `layout.css`, when inspected, then it defines a `.container` (or
  equivalent) utility using `var(--container-max-width)` and
  `var(--container-padding-inline)`, centered via auto inline margins.
- Given `layout.css`, when inspected, then it defines the base
  `<section>` vertical rhythm (padding-block) using spacing tokens (e.g.
  `var(--space-12)` / `var(--space-16)`), applied consistently so every
  numbered section (01–07) gets uniform breathing room without per-section
  overrides.
- Given `ScrollProgress` has no dedicated `scrollprogress.css` per the
  colocated-CSS convention, when inspected, then its minimal bar styling
  (fixed position, height, background using `var(--color-accent)`,
  `var(--z-scroll-progress)`) lives in `layout.css`.
- Given the file, when scanned for raw values, then it contains zero raw
  px/hex values outside of `var(--token-name)` usage or `calc()`
  expressions built from tokens.

**Dependencies:** FOUND-03.

---

## FOUND-07 — `nav.css`

**Description:** Styling for the fixed/sticky nav bar, its link list, the
active-link state, and the hamburger button/menu panel for mobile.

**Files:** `src/styles/nav.css`

**Acceptance Criteria:**
- Given `nav.css`, when inspected, then the nav bar uses
  `var(--color-surface)` background, `var(--nav-height)` height, and
  `var(--z-nav)` stacking, and is positioned fixed/sticky to the viewport
  top.
- Given the active nav link state (driven later by `useScrollSpy` in
  Phase 3), when inspected, then a `.is-active` (or equivalent) selector
  exists using `var(--color-accent)` for text/underline treatment.
- Given the hamburger button/menu panel styling for the sub-768px
  breakpoint, when inspected, then rules exist for both the closed and
  open (`.is-open`/`[aria-expanded="true"]`-driven) states, ready to be
  wired to interactive state in Phase 3.
- Given every interactive nav element (links, hamburger button), when
  inspected, then each has a visible `:focus-visible` style using
  `var(--color-focus-ring)`.
- Given the file, when scanned for raw values, then it contains zero raw
  hex/px values outside of `var(--token-name)` usage.

**Dependencies:** FOUND-03.

---

## FOUND-08 — `animations.css`

**Description:** Centralized `@keyframes` definitions (fade-in, slide-up,
etc.) referenced by name from section stylesheets and the
`useScrollReveal`-driven reveal classes.

**Files:** `src/styles/animations.css`

**Acceptance Criteria:**
- Given `animations.css`, when inspected, then it defines at minimum a
  fade-in keyframe and a slide-up (or slide-in) keyframe using
  `var(--transition-slow)`-scale timing values where duration is expressed
  in the stylesheet applying the animation, not hardcoded inside the
  keyframe itself.
- Given a `.is-visible` (or equivalent) reveal class is defined here, when
  inspected, then it is the shared class every section's `useScrollReveal`
  consumer toggles, so section stylesheets only need to set the *base*
  (hidden/offset) state and reference this shared reveal transition.
- Given `@media (prefers-reduced-motion: reduce)`, when inspected in this
  file, then transform/opacity-based animation durations are neutralized
  (set to `0s`/`none`) as a CSS-level safety net in addition to the JS-level
  guard in the hooks.
- Given the file, when scanned, then no keyframe or transition is
  redefined a second time in any per-section stylesheet (single source of
  truth per Section 3.6).

**Dependencies:** FOUND-03.

---

## FOUND-09 — `responsive.css`

**Description:** Centralized breakpoint media queries per project-plan
Section 5, mobile-first, covering the documented layout shifts (nav
hamburger→inline, container width cap, etc.) at the global/shared level.

**Files:** `src/styles/responsive.css`

**Acceptance Criteria:**
- Given `responsive.css`, when inspected, then it contains `min-width`
  media queries at `480px`, `768px`, `1024px`, `1280px`, and `1440px`,
  matching the `--bp-sm` through `--bp-2xl` breakpoint table in Section 5
  (documented as a comment since CSS custom properties can't be used
  inside `@media` feature queries).
- Given the base (no-query) styles, when inspected, then they target the
  320px design floor as a mobile-first single-column layout.
- Given the `768px` query, when inspected, then it is the point where
  `nav.css`'s hamburger is hidden and inline links are shown (coordinating
  selector hooks, even if the interactive JS wiring lands in Phase 3).
- Given the `1440px` query, when inspected, then content width is capped
  at `var(--container-max-width)` with no further column growth, only
  margin growth.
- Given this file, when a section stylesheet (Phase 2/3) needs a
  section-specific responsive tweak, then it adds its own `min-width`
  query using the *same* breakpoint values documented here, per the
  single-source-of-truth convention in Section 5.

**Dependencies:** FOUND-03.

---

## FOUND-10 — `public/favicon.svg`

**Description:** A simple SVG favicon consistent with the dark theme /
accent color, self-contained (no external references).

**Files:** `public/favicon.svg`

**Acceptance Criteria:**
- Given `public/favicon.svg`, when inspected, then it is a valid,
  self-contained SVG (no external image/font references) using the
  `--color-accent` value (`#3fa9f5`) or `--color-bg`/`--color-text` as its
  literal fill/stroke colors (SVG can't consume CSS custom properties from
  a separate stylesheet when referenced via `<link rel="icon">`, so values
  are hardcoded to match the token values by number).
- Given `index.html`, when inspected, then it links this favicon via
  `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
- Given the favicon is rendered at 16×16/32×32 browser-tab size, when
  visually checked, then it remains legible/recognizable at that size.

**Dependencies:** FOUND-01.

---

## FOUND-11 — `public/404.html`

**Description:** A plain static HTML 404 page (not a React component,
not part of the SPA bundle), styled inline to match the dark theme, linking
back to `/`.

**Files:** `public/404.html`

**Acceptance Criteria:**
- Given `public/404.html`, when inspected, then it is plain static HTML
  with `<style>` inline in the `<head>` (no dependency on
  `src/styles/variables.css`, since it must render standalone if served
  directly by a static host) — color values are hardcoded to match the
  token values by number (`#14161a` background, `#f5f6f8` text,
  `#3fa9f5` accent link).
- Given the page, when inspected, then it contains a clear "page not
  found" message and a link back to `/` using the accent color, with a
  visible focus state.
- Given the page, when loaded directly (not through the SPA router, since
  there is no router), then it renders correctly standalone with no
  JavaScript dependency.
- Given the page, when inspected, then it uses the same system font stack
  as the rest of the site (no external font loading).

**Dependencies:** FOUND-01.

---

## FOUND-12 — `useScrollProgress.js` hook

**Description:** Implement the hook returning `progress: number (0–100)`
tracking overall document scroll position, per Section 2.

**Files:** `src/hooks/useScrollProgress.js`

**Acceptance Criteria:**
- Given the hook is called in a component, when the page is scrolled from
  top to bottom, then the returned `progress` value increases
  monotonically from `0` to `100`, clamped to that range at both ends.
- Given the hook attaches a `scroll` listener, when inspected, then the
  listener is registered with `{ passive: true }` and a `resize` listener
  is also registered to recompute on document-height changes.
- Given rapid scroll events fire, when inspected, then updates are
  coalesced via a `requestAnimationFrame` guard rather than firing a state
  update per raw scroll event.
- Given the component using this hook unmounts, when inspected, then both
  the `scroll` and `resize` listeners (and any pending `rAF`) are removed/
  cancelled in a `useEffect` cleanup function.
- Given the hook accesses `window`/`document`, when inspected, then all
  such access happens inside `useEffect` (not at module/render top-level),
  so importing the hook is safe in a non-browser build/lint context.
- Given the hook is exercised with a placeholder/no-op consumer component
  in Phase 1 (before `ScrollProgress.jsx` is wired in Phase 3), when
  manually tested by scrolling, then the returned value changes as
  expected.

**Dependencies:** FOUND-02.

---

## FOUND-13 — `useScrollSpy.js` hook

**Description:** Implement the hook returning `activeId: string`
identifying which section is currently in view, via a single
`IntersectionObserver` watching all section elements, per Section 2.

**Files:** `src/hooks/useScrollSpy.js`

**Acceptance Criteria:**
- Given an array of section ids passed to the hook (or read from the DOM),
  when each section scrolls into the viewport's upper third (per the
  `rootMargin` tuning), then `activeId` updates to that section's id.
- Given the hook uses a single `IntersectionObserver` instance, when
  inspected, then it observes all section elements at once rather than
  creating one observer per section.
- Given the component using this hook unmounts, when inspected, then the
  observer is disconnected in a `useEffect` cleanup function.
- Given no section is intersecting (e.g. above the hero, before any
  section starts), when inspected, then `activeId` has a sensible default
  (e.g. `null`/empty string/first-section id) rather than being `undefined`.
- Given the hook accesses `window`/`document`, when inspected, then all
  such access happens inside `useEffect`.
- Given the hook is exercised with placeholder elements bearing the
  section ids (`about`, `skills`, `experience`, `projects`,
  `testimonials`, `education`, `contact`) in Phase 1, when manually
  scrolled, then `activeId` changes as each placeholder crosses the
  threshold.

**Dependencies:** FOUND-02.

---

## FOUND-14 — `useScrollReveal.js`, `useParallax.js`, `useTilt.js` hooks

**Description:** Implement the remaining three motion-related hooks, each
respecting `prefers-reduced-motion` per Section 2's shared contract.

**Files:** `src/hooks/useScrollReveal.js`, `src/hooks/useParallax.js`,
`src/hooks/useTilt.js`

**Acceptance Criteria — `useScrollReveal`:**
- Given the hook is attached to an element via its returned `ref`, when
  that element crosses the configured `IntersectionObserver` threshold for
  the first time, then `visible` flips from `false` to `true` and the
  observer unobserves that element (reveal fires once, not on every
  scroll in/out).
- Given `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is
  `true`, when the hook mounts, then `visible` is `true` immediately and
  no `IntersectionObserver` is created at all.
- Given the hook's consumer renders its base markup, when JavaScript has
  not yet hydrated, then the element's content is already visible in the
  DOM (the hook only ever adds a transform/opacity *transition* class on
  top of an already-visible base state — content visibility is never
  JS-gated).

**Acceptance Criteria — `useParallax`:**
- Given the hook is scoped to a hero element, when the mouse moves within
  (or relative to) that element, then it returns `{ x, y }` offset values
  proportional to cursor position relative to center, within a small
  clamped range.
- Given `prefers-reduced-motion: reduce` is set, when the hook mounts,
  then it returns a static `{ x: 0, y: 0 }` and never attaches a
  `mousemove` listener.
- Given the consuming component unmounts, when inspected, then the
  `mousemove` listener is removed in cleanup.

**Acceptance Criteria — `useTilt`:**
- Given the hook is attached to a card element via its returned `ref`,
  when the mouse moves over the card, then the returned `style` contains
  a `perspective`/`rotateX`/`rotateY` transform proportional to cursor
  position relative to the card's bounding rect, and resets to neutral on
  `mouseleave`.
- Given `prefers-reduced-motion: reduce` is set OR
  `window.matchMedia('(pointer: coarse)').matches` is `true` (checked once
  on mount, not re-derived per event), when the hook mounts, then no
  listeners are attached and `style` is a static/neutral value.
- Given the consuming component unmounts, when inspected, then all
  attached listeners are removed in cleanup.

**Common criteria (all three hooks):**
- Given each hook, when inspected, then all `window`/`document` access is
  inside `useEffect`, and none of the three hooks import a third-party
  animation/observer library.
- Given each hook is exercised against a placeholder/no-op element in
  Phase 1, when manually tested (mouse move, reduced-motion OS toggle),
  then the returned values behave per the criteria above even before any
  real section component consumes them.

**Dependencies:** FOUND-02.

---

## FOUND-15 — `App.jsx` skeleton layout

**Description:** Implement the top-level layout rendering
`ScrollProgress`, `Nav`, then empty/skeleton placeholders for the seven
numbered sections in final order, then `Footer` — structure before
content, per Section 6 Phase 1.

**Files:** `src/App.jsx`, plus skeleton stub versions of every component in
`src/components/` (`Nav.jsx`, `ScrollProgress.jsx`, `Hero.jsx`, `About.jsx`,
`Skills.jsx`, `Experience.jsx`, `Projects.jsx`, `Testimonials.jsx`,
`Education.jsx`, `Contact.jsx`, `Footer.jsx`)

**Acceptance Criteria:**
- Given `App.jsx`, when inspected, then it renders, in exact order:
  `ScrollProgress`, `Nav`, `Hero`, `About`, `Skills`, `Experience`,
  `Projects`, `Testimonials`, `Education`, `Contact`, `Footer` — matching
  the component tree in project-plan Section 1 exactly.
- Given each of `About`, `Skills`, `Experience`, `Projects`,
  `Testimonials`, `Education`, `Contact`, when inspected, then it is
  wrapped in a `<section>` with an `id` matching its anchor
  (`about`, `skills`, `experience`, `projects`, `testimonials`,
  `education`, `contact` respectively) and a numeric-prefixed
  heading/comment (01–07) identifying it, even in skeleton/stub form.
- Given every section wrapper, when inspected, then it has
  `aria-labelledby` pointing at that section's own heading element `id`.
- Given `Hero`, `Nav`, `ScrollProgress`, and `Footer`, when inspected, then
  none of them is wrapped in a numbered `<section>` (they are exempt per
  Section 1.1).
- Given the app is rendered with `npm run dev`, when viewed in a browser,
  then no console errors appear and all seven section ids are present in
  the DOM (confirmable via anchor-link scroll or dev-tools inspection),
  even though sections have no real content yet.
- Given `Nav.jsx` in its skeleton form, when inspected, then it already
  owns a local constant array of `{ id, label }` entries matching the
  seven section ids in the same order as `App.jsx` — the manual sync point
  from Section 1.2 is established here (even if labels are placeholder)
  so Phase 2 doesn't introduce drift.

**Dependencies:** FOUND-02, FOUND-06, FOUND-07.

---

## FOUND-16 — Phase 1 exit verification

**Description:** Confirm the Phase 1 exit criteria from project-plan
Section 6 are met before Phase 2 content work begins.

**Files:** none (verification-only item; may produce a short note if any
gap is found, filed under `docs/backlog/` as a new item rather than
blocking this checklist).

**Acceptance Criteria:**
- Given a clean checkout, when `npm install && npm run dev` is run, then
  the app boots with zero console errors or warnings.
- Given the running dev server, when the browser DevTools console is
  checked, then there are no React key warnings, no missing-import errors,
  and no accessibility-tree errors from the skeleton markup.
- Given the nav scaffolding and scroll progress bar, when the page is
  scrolled, then both visibly respond (progress bar width changes; nav
  active-state wiring may still be a no-op until Phase 3, but the bar
  chrome itself renders) against the empty skeleton sections.
- Given all five hooks (`useScrollSpy`, `useScrollProgress`,
  `useScrollReveal`, `useParallax`, `useTilt`), when checked against their
  respective item's acceptance criteria (FOUND-12, FOUND-13, FOUND-14),
  then each is confirmed implemented, unmount-safe, and
  reduced-motion-aware in isolation, even though none is yet consumed by a
  real content component (that wiring is Phase 3 / `phase-3-animations.md`).
- Given this checklist passes, when Phase 2 begins, then no Foundation
  item remains open/blocking.

**Dependencies:** FOUND-01 through FOUND-15 (all prior items in this
phase).
