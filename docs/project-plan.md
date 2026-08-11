# Personal Portfolio — Architecture Blueprint

Status: Draft
Owner: [PLACEHOLDER: architect / repo owner name]
Stack: React 18 + Vite, plain CSS with custom-property design tokens, no CSS-in-JS, no UI library, npm.

This document is the single source of truth for how the site is structured: the
component tree and data flow, the custom hooks and their responsibilities, the
design-token system, the colocated-CSS convention, responsive breakpoints, and
the six build phases that take the project from empty repo to shipped, reviewed
site.

---

## 1. Component Tree & Data Flow

The site is a single-page app. There is no router — navigation is anchor-link
scrolling to `id`-tagged sections within one page. Data flow is intentionally
shallow: almost every component is presentational and owns its own local
placeholder content (no prop-drilling of content through `App`). The only
values threaded down from hooks are UI/behavior state (scroll position,
visibility, active section), not content.

```
main.jsx
 └─ App.jsx
     ├─ ScrollProgress.jsx        (reads useScrollProgress)
     ├─ Nav.jsx                   (reads useScrollSpy)
     ├─ Hero.jsx                  (reads useParallax)
     ├─ About.jsx           #about        section 01  (reads useScrollReveal)
     ├─ Skills.jsx          #skills       section 02  (reads useScrollReveal)
     ├─ Experience.jsx      #experience   section 03  (reads useScrollReveal)
     ├─ Projects.jsx        #projects     section 04  (reads useScrollReveal, useTilt per card)
     ├─ Testimonials.jsx    #testimonials section 05  (reads useScrollReveal)
     ├─ Education.jsx       #education    section 06  (reads useScrollReveal)
     ├─ Contact.jsx         #contact      section 07  (reads useScrollReveal)
     └─ Footer.jsx
```

### 1.1 Rendering contract

- `App.jsx` renders `ScrollProgress`, then `Nav`, then the seven numbered
  sections in the fixed order above, then `Footer`. This order is both the
  visual order and the nav's anchor order — they must never drift apart.
- Every component other than `Hero`, `Nav`, `ScrollProgress`, and `Footer` is
  wrapped in a `<section>` with:
  - a numeric-prefixed heading/comment identifying it (01–07),
  - an `id` matching the anchor used by `Nav` and `useScrollSpy`
    (`about`, `skills`, `experience`, `projects`, `testimonials`,
    `education`, `contact`),
  - `aria-labelledby` pointing at that section's own heading `id` so the
    section has an accessible name independent of visual styling.
- All content in the tree (name, title, bio, employers, dates, project
  descriptions, testimonials, schools) is local, hardcoded placeholder text in
  the shape `[PLACEHOLDER: description of what goes here]`. Nothing is fetched
  or passed in from `App` — this keeps content edits scoped to a single file
  per section when the real owner fills the site in.
- Content that *is* naturally a list (skills, experience entries, project
  cards, testimonials, education entries) is defined as a local array
  constant at the top of its component file (e.g. `const PROJECTS = [...]`
  inside `Projects.jsx`) and mapped over with `key`. This keeps `App.jsx`
  free of content and keeps each section self-contained and independently
  editable/deletable.

### 1.2 Props actually passed

Because content lives locally in each section, the only real prop/data flow
in the tree is behavioral:

| From | To | Data | Purpose |
|---|---|---|---|
| `useScrollProgress()` | `ScrollProgress` | `progress: number (0–100)` | width/transform of the progress bar |
| `useScrollSpy()` | `Nav` | `activeId: string` | highlight the current section's nav link |
| `useParallax()` | `Hero` | `{ x, y }` transform offsets | mousemove parallax on hero art/heading |
| `useScrollReveal()` (called once per section component, or once per revealed element) | that section | `{ ref, visible: boolean }` | toggles a `.is-visible` class for fade/slide-in |
| `useTilt()` (called once per `<ProjectCard>`) | each card in `Projects` | `{ ref, style }` (3D transform) | per-card tilt-on-hover effect |

`Nav` does not receive the list of sections as a prop from `App`; it owns a
local constant array of `{ id, label }` nav entries that must be kept in sync
with the section order in `App.jsx` (see Phase 2 checklist below — this is a
deliberate manual sync point, not automatic, to keep both files simple and
dependency-free).

---

## 2. Custom Hooks

All hooks live in `src/hooks/`, are plain functions (no external state
libraries), and are consumed via named imports. Every hook that drives a
CSS transform or animation must check `window.matchMedia('(prefers-reduced-motion: reduce)')`
and short-circuit to a no-op/neutral value when the user has requested
reduced motion.

### `useScrollSpy.js`
- **Responsibility:** track which section is currently in view and expose its
  `id` so `Nav` can highlight the matching link.
- **Mechanism:** one `IntersectionObserver` watching all section elements
  (queried by the anchor ids list), tuned with a `rootMargin` that biases
  toward the section crossing the upper third of the viewport. Updates a
  single `activeId` state value on intersection changes.
- **Returns:** `activeId: string`.
- **Cleanup:** disconnects the observer on unmount.

### `useScrollProgress.js`
- **Responsibility:** report how far the user has scrolled through the whole
  document as a percentage, for the top progress bar.
- **Mechanism:** a passive `scroll` listener (plus a `resize` listener, since
  document height can change) computing
  `scrollTop / (scrollHeight - clientHeight) * 100`, clamped to `[0, 100]`.
- **Returns:** `progress: number` (0–100).
- **Perf note:** listener is passive and the handler is trivial arithmetic;
  no throttling library is introduced — a `requestAnimationFrame` guard is
  used to coalesce rapid scroll events instead of adding a dependency.

### `useScrollReveal.js`
- **Responsibility:** give any section/element a fade/slide-in-on-scroll
  effect without hiding content pre-hydration.
- **Mechanism:** returns a `ref` to attach to the target element and a
  `visible` boolean, backed by an `IntersectionObserver` that flips `visible`
  to `true` the first time the element crosses a threshold, then unobserves
  (reveal happens once, not on every scroll in/out).
- **Reduced motion:** if `prefers-reduced-motion: reduce` is set, `visible`
  is `true` immediately on mount (element renders in its final state, no
  observer is even created) — this also guarantees content is never
  JS-dependent for *visibility*, only for the *animation*. The element's base
  CSS state (no JS) must already be fully visible/readable; the hook only
  adds a transform/opacity transition class on top.
- **Returns:** `{ ref, visible: boolean }`.

### `useParallax.js`
- **Responsibility:** compute small `x`/`y` translation values from mouse
  position for the hero's parallax effect.
- **Mechanism:** a `mousemove` listener scoped to the hero element (or
  window, clamped to the hero's bounding box) mapping cursor offset from
  center into a small pixel/degree range.
- **Reduced motion:** returns a static `{ x: 0, y: 0 }` and does not attach
  the listener at all when `prefers-reduced-motion: reduce` is set.
- **Returns:** `{ x: number, y: number }`.

### `useTilt.js`
- **Responsibility:** 3D tilt-on-hover transform for project cards.
- **Mechanism:** returns a `ref` plus an inline `style` (perspective/rotateX/
  rotateY) recomputed from `mousemove` position relative to the card's
  bounding rect; resets on `mouseleave`.
- **Skips entirely (no listeners attached, static style) when:**
  - `prefers-reduced-motion: reduce` is set, or
  - the device is touch-only, detected via
    `window.matchMedia('(pointer: coarse)')` (checked once on mount, not
    re-derived per event).
- **Returns:** `{ ref, style }`.

All five hooks are dependency-free (no third-party observer/animation
libraries), unmount-safe (observers/listeners are removed in cleanup
functions), and SSR-agnostic-safe in that they guard `window`/`document`
access inside `useEffect` so importing them never breaks a non-browser
build step.

---

## 3. CSS Design-Token System

Tokens live in `src/styles/variables.css`, declared once on `:root`, and are
the only place raw color/size values are allowed to originate — every other
stylesheet consumes them via `var(--token-name)`. This is what keeps the
plain-CSS approach maintainable without a preprocessor or CSS-in-JS.

### 3.1 Color tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#14161a` | page background |
| `--color-surface` | `#1c1f26` | cards, nav bar, elevated panels |
| `--color-surface-alt` | `#22262f` | secondary surface / hover state on cards |
| `--color-border` | `#2b2f3a` | hairline borders/dividers on dark surfaces |
| `--color-accent` | `#3fa9f5` | links, active nav state, buttons, focus highlights, icons |
| `--color-accent-hover` | `#63bdf7` | hover/active shade of accent |
| `--color-accent-muted` | `rgba(63, 169, 245, 0.15)` | accent-tinted backgrounds/badges |
| `--color-text` | `#f5f6f8` | primary text on dark backgrounds |
| `--color-text-secondary` | `#b6bcc7` | secondary/body text, muted labels |
| `--color-text-tertiary` | `#7d8494` | captions, meta text, placeholders |
| `--color-success` | `#3fd68a` | form success state |
| `--color-error` | `#f5576c` | form error/validation state |
| `--color-focus-ring` | `#3fa9f5` | `:focus-visible` outline color (same as accent for consistency) |

### 3.2 Typography tokens

| Token | Value |
|---|---|
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` |
| `--font-size-xs` | `0.75rem` |
| `--font-size-sm` | `0.875rem` |
| `--font-size-base` | `1rem` |
| `--font-size-md` | `1.125rem` |
| `--font-size-lg` | `1.5rem` |
| `--font-size-xl` | `2rem` |
| `--font-size-2xl` | `2.75rem` |
| `--font-size-3xl` | `3.5rem` |
| `--line-height-tight` | `1.15` |
| `--line-height-base` | `1.6` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-bold` | `700` |

`'Inter'` is named first as a progressive enhancement only — it is **not**
loaded from Google Fonts or any external source (no `@import`/`<link>` to a
font CDN). If `Inter` is not present as a local/system font it silently falls
through to the system stack, so the site stays fully self-contained.

### 3.3 Spacing tokens

| Token | Value |
|---|---|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.5rem` |
| `--space-6` | `2rem` |
| `--space-8` | `3rem` |
| `--space-10` | `4rem` |
| `--space-12` | `6rem` |
| `--space-16` | `8rem` |

### 3.4 Layout / sizing tokens

| Token | Value |
|---|---|
| `--container-max-width` | `1200px` |
| `--container-padding-inline` | `1.5rem` |
| `--nav-height` | `4rem` |
| `--radius-sm` | `6px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `20px` |
| `--radius-pill` | `999px` |

### 3.5 Effects / motion tokens

| Token | Value |
|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0, 0, 0, 0.25)` |
| `--shadow-md` | `0 8px 24px rgba(0, 0, 0, 0.35)` |
| `--shadow-lg` | `0 16px 48px rgba(0, 0, 0, 0.45)` |
| `--shadow-accent-glow` | `0 0 32px rgba(63, 169, 245, 0.25)` |
| `--transition-fast` | `150ms ease` |
| `--transition-base` | `250ms ease` |
| `--transition-slow` | `450ms cubic-bezier(0.16, 1, 0.3, 1)` |
| `--z-nav` | `100` |
| `--z-scroll-progress` | `101` |
| `--z-overlay` | `200` |

### 3.6 Conventions

- No component or section stylesheet declares a raw hex/rgb color, px
  spacing value, or font-family — everything routes through a token. This is
  the enforceable rule that keeps the dark theme (and any future retheme)
  changeable from one file.
- Tokens are additive: `reset.css`, `typography.css`, `layout.css`, and every
  per-section stylesheet only ever *read* `variables.css`; they never
  redefine tokens at a narrower scope. If a section needs a one-off value
  that isn't a real reusable token, it's still expressed as
  `calc(var(--space-4) * 1.5)` etc. rather than a hardcoded literal.
- `animations.css` centralizes shared `@keyframes` (fade-in, slide-up, etc.)
  used by `useScrollReveal`-driven classes; section stylesheets reference the
  keyframe by name rather than redefining it.

---

## 4. Colocated-CSS-Per-Component Convention

- Every file in `src/components/` that represents a section or major UI
  piece imports exactly one matching stylesheet from `src/styles/`, by
  direct relative import at the top of the component file, e.g.:

  ```jsx
  // src/components/Hero.jsx
  import '../styles/hero.css';
  ```

- Naming is 1:1 and lowercase: `Hero.jsx` ↔ `hero.css`, `About.jsx` ↔
  `about.css`, `Projects.jsx` ↔ `projects.css`, etc. `Nav.jsx` ↔ `nav.css`,
  `ScrollProgress.jsx` has no dedicated file of its own listed in the spec
  and instead its minimal styling lives in `layout.css` alongside other
  chrome, since it is a single thin bar with no section-specific concerns.
  `Footer.jsx` ↔ `footer.css`.
- Global/shared stylesheets (`variables.css`, `reset.css`, `typography.css`,
  `layout.css`, `nav.css`, `animations.css`, `responsive.css`) are imported
  exactly once, in `src/main.jsx`, as a single entry aggregator (e.g. a
  `src/styles/index.css` that `@import`s each in a fixed cascade order —
  variables → reset → typography → layout → nav → animations — or, if the
  project prefers no `@import` chain, each is imported directly in
  `main.jsx` in that same order). Section stylesheets are **not** re-imported
  globally; each is only pulled in by its own component, so Vite's per-module
  CSS handling means a section's styles only ship when that section is part
  of the bundle.
- Ordering rule: because Vite concatenates CSS in import order and specificity
  is otherwise flat (no CSS Modules, no scoping), global styles must always be
  imported before any component-level CSS so that section stylesheets can
  safely override layout/typography defaults without needing `!important` or
  inflated selector specificity.
- Section stylesheets scope all selectors under that section's root class or
  id (e.g. `#projects .card { … }` / `.projects__card { … }`) to avoid
  bleeding into other sections, since there is no build-time CSS scoping.

---

## 5. Responsive Breakpoints

Defined and consumed centrally in `src/styles/responsive.css`, mobile-first
(base styles target the smallest viewport; `min-width` media queries layer
on enhancements). Section stylesheets may add their own `min-width` queries
using these same breakpoint values for section-specific layout shifts (e.g.
Experience timeline going from stacked to side-by-side).

| Breakpoint name | `min-width` | Target |
|---|---|---|
| `--bp-xs` (base, no query) | `320px` (design floor) | small phones |
| `--bp-sm` | `480px` | large phones |
| `--bp-md` | `768px` | tablets / nav switches from hamburger to inline links |
| `--bp-lg` | `1024px` | small laptops, multi-column grids activate (Skills, Projects, Testimonials) |
| `--bp-xl` | `1280px` | standard desktop |
| `--bp-2xl` | `1440px` | large desktop, layout hits `--container-max-width` and stops growing, extra space becomes margin |

CSS custom properties can't be used inside `@media` feature queries directly,
so these breakpoint values are also kept as a documented constant list (this
table) that both the CSS media queries and any JS (e.g. `useTilt`'s pointer
check, if ever extended to width-based logic) treat as the single source of
truth — changing a breakpoint means updating it in both this table and every
`@media (min-width: …)` occurrence, since there's no CSS preprocessor to
centralize the number itself.

Layout behavior across breakpoints:
- **320–767px:** single column throughout; `Nav` collapses to a hamburger
  button (`aria-expanded`, `aria-controls` pointing at the menu panel id);
  Hero stacks text over/under visual; Projects/Testimonials/Skills render as
  a vertical stack or horizontal scroll-snap row, not a grid.
- **768–1023px:** `Nav` shows inline links (hamburger hidden); two-column
  layouts start appearing where it aids scanability (e.g. About text + a
  stat/side panel).
- **1024–1439px:** full multi-column grids for Skills/Projects/Testimonials;
  Experience timeline goes side-by-side (rail + content).
- **1440px+:** content width caps at `--container-max-width` (1200px) and is
  centered; no further column growth, only breathing-room margins increase.

---

## 6. Build Phases

Six phases, executed roughly in order though Polish/SEO work can start once
Integration is functionally complete for a given section. Review docs for
each completed pass are written under `docs/reviews/` and
`docs/security-reviews/`; feature/scope tracking lives under `docs/backlog/`.

### Phase 1 — Foundation
Scaffold the project so `npm install && npm run dev` produces a running,
empty-but-styled shell.
- `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `.env.example`.
- `src/main.jsx` mounting an empty `<App />` into `#root`, importing the
  global stylesheet entry point.
- `src/styles/variables.css`, `reset.css`, `typography.css`, `layout.css`,
  `nav.css`, `animations.css`, `responsive.css` — full token set from
  Section 3 above, even before components consume all of it.
- `public/favicon.svg`, `public/404.html` (static, dark-theme-styled, links
  back to `/`).
- `App.jsx` renders `ScrollProgress`, `Nav`, and empty/skeleton section
  placeholders in final order, then `Footer` — structure before content.
- All five hooks in `src/hooks/` implemented and unit-testable in isolation
  (can be exercised with placeholder/no-op components before real sections
  exist).
- Exit criteria: clean install, dev server boots, no console errors, nav
  scaffolding + scroll progress bar visibly work against empty sections.

### Phase 2 — Content
Fill every section component with real structure and bracketed placeholder
content.
- Build out `Hero.jsx`, `About.jsx`, `Skills.jsx`, `Experience.jsx`,
  `Projects.jsx`, `Testimonials.jsx`, `Education.jsx`, `Contact.jsx`,
  `Footer.jsx` with semantic markup and their colocated CSS files.
- Every piece of personal content wrapped as
  `[PLACEHOLDER: description]` — name, title, bio, employers, dates,
  project names/descriptions/links, testimonial quotes/names/roles, schools,
  degrees, contact email/social links.
- Wire the manual sync point: `Nav`'s local link list must match the section
  `id`s and order exactly as defined in `App.jsx`.
- Confirm content renders with JS disabled / before hydration (view page
  source or throttle JS) — no section may depend on a hook to become visible,
  only to animate.
- Exit criteria: full one-page scroll narrative reads correctly top to
  bottom with obviously-placeholder content, all anchor ids present.

### Phase 3 — Integration
Wire the interactive/behavioral layer on top of the now-complete content.
- Connect `useScrollSpy` output to `Nav`'s active-link styling.
- Connect `useScrollProgress` to the `ScrollProgress` bar width/transform.
- Connect `useScrollReveal` to each section (and/or sub-elements within
  sections) for entrance animation.
- Connect `useParallax` to `Hero`.
- Connect `useTilt` to each project card in `Projects`.
- Hamburger menu open/close state and `aria-expanded` wiring in `Nav` for
  the mobile breakpoint.
- Contact form (if present) gets client-side validation state only — no
  backend call is invented; submission target is itself a
  `[PLACEHOLDER: form endpoint / mailto / service integration]`.
- Exit criteria: every hook is actually consumed by a component (none
  orphaned), all interactions work with mouse and keyboard, reduced-motion
  toggle in OS settings visibly disables every transform-based effect while
  content remains fully visible.

### Phase 4 — Polish & SEO
- Responsive pass across all breakpoints in Section 5, at minimum tested at
  320px, 480px, 768px, 1024px, 1280px, 1440px.
- Meta tags in `index.html`: title, description, viewport, theme-color
  (`--color-bg`), Open Graph / Twitter card placeholders
  (`[PLACEHOLDER: OG image URL]`, etc.), canonical URL placeholder.
- `public/404.html` finalized: plain static HTML (no framework), inline
  styles matching the dark theme tokens by value (it can't import
  `variables.css` since it's served standalone), link back to `/`.
- Favicon finalized (`public/favicon.svg`).
- Accessibility pass: color contrast check of text tokens against
  `--color-bg`/`--color-surface`, focus-visible states using
  `--color-focus-ring` on every interactive element, alt text placeholders
  on every image (`[PLACEHOLDER: alt text describing X]`), landmark roles,
  heading hierarchy (one `h1` in Hero, `h2` per section).
- Performance pass: confirm no unused CSS import bloat, images sized
  appropriately, no layout shift from web-font swapping (system stack has
  none by construction).
- Exit criteria: Lighthouse-style manual pass on accessibility/SEO/best
  practices categories with no obvious regressions; site usable and legible
  at every breakpoint and with reduced motion on.

### Phase 5 — Code Review
- Full read-through against this blueprint: component tree matches Section
  1, hooks match their single responsibility in Section 2, no raw color/size
  values outside `variables.css` (Section 3.6 rule), colocated-CSS convention
  respected (Section 4), no class components, no CSS-in-JS/Tailwind/UI
  library introduced.
- Verify prop/data flow described in Section 1.2 hasn't drifted (e.g. no
  content prop-drilled through `App` that should be local to a section).
- Verify `Nav` link list / `App.jsx` section order / anchor `id`s are all
  still in sync (the manual sync point called out in Phase 2).
- Record findings and resolutions in `docs/reviews/`.
- Exit criteria: review doc written, all findings triaged (fixed or
  explicitly deferred to backlog), no open blocking issues.

### Phase 6 — Security Review
- Confirm no hardcoded secrets, API keys, or environment-specific URLs
  anywhere in the repo; anything env-shaped goes through `.env.example`
  documentation only, never a committed real value.
- Review any form/contact integration points for safe defaults (no
  credentials collected/stored client-side, no inline `eval`/unsanitized
  `dangerouslySetInnerHTML` usage anywhere in the codebase).
- Verify `public/404.html` and `index.html` don't leak internal paths,
  comments, or non-public information.
- Verify third-party dependency versions in `package.json` are the pinned,
  mainstream ranges (react ^18.3.0, react-dom ^18.3.0, vite ^5.4.0,
  @vitejs/plugin-react ^4.3.0) with no unnecessary/unaudited extra packages
  added along the way.
- Record findings and resolutions in `docs/security-reviews/`.
- Exit criteria: security review doc written, no open blocking findings,
  repo is safe to make public / hand off to the site owner for content
  fill-in.

---

## 7. Open Items / Backlog Pointer

Anything discovered during a phase that isn't a blocker for that phase's
exit criteria gets filed as its own file under `docs/backlog/` rather than
expanding this document — this file stays the stable architectural
reference; the backlog tracks in-flight scope changes and nice-to-haves
(e.g. `[PLACEHOLDER: analytics integration]`, `[PLACEHOLDER: blog/CMS
integration]`, dark/light theme toggle as a future enhancement beyond the
fixed dark theme specified here).
