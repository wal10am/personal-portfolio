# Code Review — Portfolio Site

Date: 2026-08-11
Scope: full app (`package.json`, `vite.config.js`, `index.html`, `src/**`) against the project's stated conventions (file structure, design tokens, functional components, hook cleanup, `prefers-reduced-motion`, `App.jsx` render order, Nav ↔ section id parity).

## Summary

The project as found was **missing roughly half of its required files**, which meant it could not build at all (`App.jsx` imported five components that didn't exist, and six components/hooks imported five hook modules that didn't exist). Beyond the missing files, the existing files followed the project's conventions well, with two real bugs in `Projects.jsx`/`Testimonials.jsx` (section markup didn't match the shared CSS scaffolding) and scattered hardcoded "magic" values in `projects.css`/`testimonials.css` that bypassed the design-token system. All of the above were fixed directly. Everything below is either "checked, no issue" or "checked, fixed."

## What was checked

- File structure vs. spec (root config, `src/hooks`, `src/components`, `src/styles`, `docs/`).
- Every functional component for unused imports and correct default export.
- Every `useEffect` that touches `window`/DOM/observers for a cleanup return.
- `useScrollReveal`, `useParallax`, `useTilt` for correct `prefers-reduced-motion` handling.
- `App.jsx` render order against the spec (`ScrollProgress`, `Nav`, sections in order, `Footer`).
- `Nav.jsx`'s `SECTION_IDS` cross-checked against the actual `id` attribute rendered by every section component.
- `variables.css` token usage vs. hardcoded values in each component stylesheet.
- `npm install` (succeeded cleanly once `package.json` existed with valid dependency versions).

## Issues found and fixed

### 1. Build-breaking: entire files missing
`App.jsx` imported `Hero`, `About`, `Education`, `Contact`, `Footer` — none of these existed in `src/components/`. `Nav.jsx`, `ScrollProgress.jsx`, `Skills.jsx`, `Experience.jsx`, `Testimonials.jsx`, and `Projects.jsx` all imported hooks from `src/hooks/`, but that directory didn't exist at all. The project root was also missing `package.json`, `vite.config.js`, `.gitignore`, and `.env.example`, and `docs/` didn't exist. None of this would build or even satisfy `npm install`.

**Fixed** by creating, matching the existing project's conventions (functional components, direct CSS-file-per-component imports, numbered `section__number` badges, `useScrollReveal` for fade-ins, tokens-only CSS):
- `package.json` (react ^18.3.0, react-dom ^18.3.0, vite ^5.4.0, @vitejs/plugin-react ^4.3.0), `vite.config.js`, `.gitignore`, `.env.example`
- `src/hooks/useScrollSpy.js`, `useScrollProgress.js`, `useScrollReveal.js`, `useParallax.js`, `useTilt.js` — every one attaches its listener/observer in `useEffect` and returns a cleanup function; `useScrollReveal`/`useParallax`/`useTilt` all check `window.matchMedia('(prefers-reduced-motion: reduce)')` before doing any animated work (and `useTilt` additionally skips touch devices via `(pointer: coarse)`)
- `src/components/Hero.jsx`, `About.jsx`, `Education.jsx`, `Contact.jsx`, `Footer.jsx` + their matching `src/styles/hero.css`, `about.css`, `education.css`, `contact.css`, `footer.css`
- `docs/reviews/`, `docs/backlog/`, `docs/security-reviews/` directories

All personal content in the new files (name, title, bio, employer/school names, testimonials, project details, contact links) is wrapped as `[PLACEHOLDER: ...]` per the project's content convention.

Verified after the fix: every relative `import ... from '../hooks/...'` / `'../components/...'` / `'../styles/...'` in the whole `src/` tree resolves to a real file, and every named hook import matches an actual named export. `npm install` succeeds cleanly with the new `package.json`. (`npm run build` could not be executed in this sandbox — the available Node runtime is v10.24.1, and Vite 5 requires Node ^18/^20/>=22 — so the build itself is unverified end-to-end here, but static resolution of every import/export in the tree checks out.)

### 2. `Nav.jsx` section ids vs. rendered section ids
Cross-checked `NAV_LINKS`/`SECTION_IDS` in `Nav.jsx` (`about`, `skills`, `experience`, `projects`, `testimonials`, `education`, `contact`) against the `id` attribute on each section component. All seven now match exactly (the three that previously didn't exist — `about`, `education`, `contact` — were created with matching ids as part of fix #1; `skills`, `experience`, `projects`, `testimonials` already matched).

### 3. `Projects.jsx` / `Testimonials.jsx` used a different section-header markup than the rest of the site
Every other section (`Skills`, `Experience`, and the newly-added `About`/`Education`/`Contact`) wraps its heading in `<div className="container"><header className="section__header">...<h2 className="section__title"><span className="section__number">`, which is the only markup `layout.css` actually styles (numbered pill badge, eyebrow, max-width description). `Projects.jsx` and `Testimonials.jsx` instead used `section-inner` / `section-heading` / `section-number` — classes that don't exist anywhere in the stylesheet, so their headings silently rendered without the numbered badge, eyebrow, or header spacing that every other section has.

**Fixed**: rewired both components' section markup to the shared `container` / `section__header` / `section__title` / `section__number` / `section__description` pattern, matching the rest of the site.

### 4. `projects.css` / `testimonials.css` bypassed the design-token system
Both files used `var(--token, <hardcoded fallback>)` throughout with tokens that **don't exist** in `variables.css` (`--space-lg`, `--space-md`, `--space-sm` — the scale in `variables.css` is numbered `--space-0`…`--space-12`), meaning the fallback hardcoded value (`2rem`, `1.5rem`, `0.75rem`, etc.) was silently the *only* value ever applied, decoupling these two sections from the token scale every other section (`skills.css`, `experience.css`) correctly uses. They also had raw hex/rgba colors (`#1c1f26`, `#f5f5f5`, `#b3b8c2`, `rgba(255,255,255,0.08)`, `rgba(63,169,245,0.12)`, `rgba(255,255,255,0.04)`), raw pixel/`rem` values for font sizes/radii, and hardcoded transition durations/easings (`0.3s ease`, `0.2s ease`, `0.6s ease`) instead of the `--duration-*`/`--ease-*` tokens used everywhere else. Additionally, `.projects-section` had an explicit `background-color: var(--color-bg)` override that defeated `layout.css`'s `.section:nth-of-type(even)` alternating-background rule for that section (Projects is the 4th `<section>` in document order, i.e. even, so it should get the raised background like Skills does).

**Fixed**: replaced every ad-hoc fallback/hardcoded value with the matching real token (`--space-3/5/6`, `--fs-*`, `--fw-*`, `--radius-*`, `--color-*`, `--duration-*`/`--ease-*`, `--shadow-accent-glow`, `--border-width`), and removed the two `background-color` overrides so both sections inherit the same alternating-background rhythm as the rest of the page.

### 5. `ScrollProgress.jsx` inline styles duplicated token values as magic fallbacks
`var(--z-scroll-progress, 110)` and `var(--gradient-accent, var(--color-accent, #3fa9f5))` re-hardcoded values that are already guaranteed to exist in `variables.css` (which loads before any component renders). **Fixed** by removing the redundant fallbacks so the component relies on the token system like everything else.

## Checked, no issue found

- **Functional components / unused imports**: every component is a function component; no unused imports anywhere in `src/`.
- **Hook cleanup**: `Nav.jsx`'s two `useEffect`s (body-scroll-lock class, resize listener) both return proper cleanup; all five hooks created in fix #1 clean up their observers/listeners on unmount (`useTilt` has no listener to clean up — it only reads `matchMedia` once and exposes plain mouse-event handler props, so there's nothing to unsubscribe).
- **`prefers-reduced-motion`**: `useScrollReveal`, `useParallax`, `useTilt` all check it in JS before doing any animated work; every relevant stylesheet (`reset.css`, `animations.css`, `nav.css`, `skills.css`, `experience.css`, `projects.css`, `testimonials.css`, and the new `about.css`/`education.css`/`contact.css`) also has a `@media (prefers-reduced-motion: reduce)` backstop.
- **`App.jsx` render order**: `ScrollProgress` → `Nav` → `Hero, About, Skills, Experience, Projects, Testimonials, Education, Contact` (inside `<main id="top">`) → `Footer`, matching the spec exactly.
- **`skills.css` / `experience.css` / `nav.css` / `layout.css` / `typography.css` / `reset.css` / `animations.css` / `responsive.css`**: all use tokens from `variables.css` consistently, no stray hardcoded colors.
- **Accessibility**: `Nav.jsx`'s hamburger button has `aria-label`/`aria-expanded`/`aria-controls`; nav links use `aria-current`; all new placeholder `<img>` tags include bracketed alt-text placeholders; content (including all newly-added sections) renders unconditionally in JSX rather than being gated behind post-hydration state, so nothing is hidden purely behind JS.
- `public/404.html` is a plain static page (not a component) styled inline consistent with the dark theme and links back to `/`.
- `public/favicon.svg` uses the theme's accent/background colors, no unrelated branding.

## Minor, not changed

- `reset.css` keeps `var(--color-bg, #14161a)` / `var(--color-text, #f5f6f8)` fallbacks on `html`/`body`. Since `variables.css` is always `@import`ed first in `index.css`, these fallbacks are technically unreachable — but this is a defensive/bootstrap pattern on the very first stylesheet in the cascade (guards against a future reordering), not scattered "magic" duplication through component styles, so it was left as-is.
- `nav.css`'s translucent nav background (`rgba(20, 22, 26, 0.72)`) is an alpha variant of `--color-bg` that CSS custom properties can't express directly without `color-mix()`. Values match the token exactly (`#14161a` = `rgb(20,22,26)`), so this isn't inconsistent, just not expressible as a single token reference — left as-is.

## Verification

- `npm install` succeeds with the new `package.json`.
- Every relative import (`../hooks/*`, `../components/*`, `../styles/*`) across `src/` resolves to an existing file, and every named import matches an actual named export.
- `npm run build` could not be run to completion in this sandbox (Node v10.24.1 present; Vite 5 requires Node ^18/^20/>=22) — flagging this as an environment limitation for whoever picks this up next, not a code issue.
