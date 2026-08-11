# Phase 4 — Polish & SEO

Source: `docs/project-plan.md`, Section 6 ("Phase 4 — Polish & SEO") plus
the responsive breakpoint table in Section 5 and the finalization notes for
`public/404.html` / `public/favicon.svg` from Phase 1 (Section 6 Phase 1
and Phase 4 both touch these files — Phase 1 scaffolds them, this phase
finalizes them).

Goal: full responsive pass at all six documented breakpoints, complete
`index.html` meta tags (including SEO/social placeholders), finalized
`404.html` and favicon, a full accessibility pass (contrast, focus-visible,
alt text, landmarks, heading hierarchy), and a performance sanity pass.
This is the last content/UI-facing phase before Phase 5 (Code Review) and
Phase 6 (Security Review), which are tracked separately under
`docs/reviews/` and `docs/security-reviews/` rather than as backlog work
items.

Depends on: `phase-1-foundation.md`, `phase-2-content.md`, and
`phase-3-animations.md` fully complete — this phase polishes and audits
existing structure/content/behavior rather than adding new features.

---

## POLISH-01 — Responsive breakpoint pass (320px–1440px+)

**Description:** Manually verify and fix layout at every breakpoint listed
in project-plan Section 5, across every section.

**Files:** any `src/styles/*.css` file requiring a fix (global or
per-section); `src/styles/responsive.css` for shared breakpoint logic.

**Acceptance Criteria:**
- Given the viewport set to `320px` width, when every section is scrolled
  through, then all content is single-column, no horizontal scrollbar
  appears, no text is clipped/overlapping, and the nav shows the
  hamburger (not inline links).
- Given the viewport set to `480px` width, when checked, then layout
  remains single-column but spacing/type-scale adjustments (if any
  `--bp-sm` rules exist) render correctly with no regressions from the
  320px baseline.
- Given the viewport set to `768px` width, when checked, then the nav
  switches from hamburger to inline links (hamburger fully hidden, not
  just visually collapsed-but-present in the DOM in a confusing way), and
  any two-column layouts (e.g. About text + side panel) activate per
  Section 5.
- Given the viewport set to `1024px` width, when checked, then Skills,
  Projects, and Testimonials render as multi-column grids, and the
  Experience timeline switches to the side-by-side rail + content layout.
- Given the viewport set to `1280px` width, when checked, then the
  standard desktop layout holds with no newly-introduced overflow or
  cramped spacing versus 1024px.
- Given the viewport set to `1440px` width (and wider, e.g. `1920px`),
  when checked, then content width caps at `var(--container-max-width)`
  (1200px), stays centered, and additional viewport width becomes margin
  only — no further column growth or stretched content.
- Given every breakpoint above, when the hamburger menu (at ≤767px) and
  desktop nav (at ≥768px) are both re-tested, then the interactive
  behavior wired in Phase 3 (ANIM-06) still functions correctly at each
  size, including immediately around the 768px transition point.
- Given any layout bug is found at any breakpoint, when fixed, then the
  fix is made in the appropriate section stylesheet or
  `responsive.css` using the shared breakpoint values from Section 5 (no
  new one-off breakpoint numbers introduced).

**Dependencies:** `phase-1-foundation.md` (FOUND-09), `phase-2-content.md`
(all CONTENT items), `phase-3-animations.md` (ANIM-06).

---

## POLISH-02 — `index.html` meta tags and SEO placeholders

**Description:** Complete `index.html`'s `<head>` with title, description,
viewport, theme-color, Open Graph / Twitter card tags, and canonical URL —
all site-specific values as bracketed placeholders.

**Files:** `index.html`

**Acceptance Criteria:**
- Given `index.html`'s `<head>`, when inspected, then it contains
  `<title>[PLACEHOLDER: site title / person's name — role]</title>` and
  `<meta name="description" content="[PLACEHOLDER: one-sentence site
  description]">`.
- Given the viewport meta tag, when inspected, then it is present as
  `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  (a real, non-placeholder value — this is technical boilerplate, not
  personal content).
- Given the theme-color meta tag, when inspected, then it is
  `<meta name="theme-color" content="#14161a">`, matching
  `--color-bg`'s literal value exactly (meta tags can't consume CSS custom
  properties, so the raw hex is intentionally duplicated here — this is
  the one sanctioned exception to the "tokens only" rule since it's
  outside the CSS cascade entirely).
- Given Open Graph tags, when inspected, then `og:title`, `og:description`,
  `og:type`, `og:url`, and `og:image` are present with placeholder content
  (`[PLACEHOLDER: OG image URL]`, `[PLACEHOLDER: canonical site URL]`,
  etc.) — no real/invented URLs.
- Given Twitter card tags, when inspected, then `twitter:card`,
  `twitter:title`, `twitter:description`, and `twitter:image` are present,
  mirroring the Open Graph placeholders.
- Given a canonical link tag, when inspected, then
  `<link rel="canonical" href="[PLACEHOLDER: canonical site URL]">` is
  present.
- Given the favicon link tag (from Phase 1), when re-checked, then it is
  still correctly present and unaffected by this item's additions.
- Given the full `<head>`, when scanned, then no hardcoded secret,
  analytics ID, or environment-specific real value (real domain, real
  API key) has been introduced — every site-identity value is either a
  bracketed placeholder or genuinely non-sensitive technical boilerplate
  (viewport, charset, theme-color hex).

**Dependencies:** `phase-1-foundation.md` (FOUND-01).

---

## POLISH-03 — Finalize `public/404.html`

**Description:** Confirm/finalize the 404 page built in Phase 1 against
the Phase 4 polish bar — inline dark-theme styling matching token values
by number, link back to `/`.

**Files:** `public/404.html`

**Acceptance Criteria:**
- Given `public/404.html`, when compared value-by-value against
  `variables.css`, then every inline color used (`background`, text
  colors, link/accent color) matches the corresponding token's literal
  value exactly (`#14161a`, `#f5f6f8`, `#3fa9f5`, etc.) — no drift between
  the two now that both exist.
- Given the page, when loaded standalone (simulating a static host serving
  it directly for any unmatched route), then it renders correctly with
  zero dependency on the built SPA bundle, `variables.css`, or any JS
  file.
- Given the "back to home" link, when clicked, then it navigates to `/`
  (the SPA's root) correctly.
- Given the page's typography, when inspected, then it uses the same
  system font stack as the rest of the site (no external font request).
- Given the page is checked for accessibility, when inspected, then it has
  a proper heading (e.g. `<h1>404</h1>` or similar), readable body text,
  and the link has a visible focus state matching `--color-focus-ring`'s
  value.

**Dependencies:** `phase-1-foundation.md` (FOUND-11).

---

## POLISH-04 — Finalize `public/favicon.svg`

**Description:** Confirm/finalize the favicon built in Phase 1.

**Files:** `public/favicon.svg`

**Acceptance Criteria:**
- Given `public/favicon.svg`, when rendered at actual browser-tab size
  (16×16 and 32×32), then it remains legible and visually consistent with
  the site's accent/dark-theme palette (no leftover placeholder/default
  Vite logo).
- Given the file, when inspected, then it is valid, minimal SVG with no
  external references, and its colors match token values by number.
- Given `index.html`'s favicon `<link>` (from Phase 1), when re-checked
  alongside the POLISH-02 meta-tag work, then it is unaffected/still
  correctly wired.

**Dependencies:** `phase-1-foundation.md` (FOUND-10).

---

## POLISH-05 — Accessibility pass

**Description:** Full accessibility audit: color contrast, focus-visible
states, alt text, landmark roles, and heading hierarchy across the entire
built site.

**Files:** any component/stylesheet requiring a fix.

**Acceptance Criteria:**
- Given `--color-text` (`#f5f6f8`) on `--color-bg` (`#14161a`) and
  `--color-text` on `--color-surface` (`#1c1f26`), when contrast ratio is
  calculated, then both meet WCAG AA for normal text (≥4.5:1); given
  `--color-text-secondary` (`#b6bcc7`) and `--color-text-tertiary`
  (`#7d8494`) on the same backgrounds, when calculated, then secondary
  text meets AA (≥4.5:1) and tertiary/caption text at minimum meets AA
  for large text (≥3:1) — any token combination that fails is flagged and
  either its usage is restricted to large/bold text or the token value is
  proposed for adjustment via a new backlog item (not silently shipped
  failing).
- Given `--color-accent` (`#3fa9f5`) used as link/button text on
  `--color-bg`/`--color-surface`, when calculated, then it meets AA
  (≥4.5:1) for the text sizes it's actually used at in the built site.
- Given every interactive element in the final built site (nav links,
  hamburger button, project card links, form fields, footer/social
  links, CTA buttons), when reached via keyboard focus, then each shows a
  visible `:focus-visible` outline using `var(--color-focus-ring)` with
  sufficient contrast against its background.
- Given every `<img>` (and every SVG treated as meaningful content) across
  Hero, Projects, and any other section using imagery, when inspected,
  then each has real alt text in the placeholder form
  `[PLACEHOLDER: alt text describing X]`, or `alt=""`/`role="presentation"`
  for confirmed-decorative images only.
- Given the page's landmark structure, when inspected with a screen
  reader or the accessibility tree, then `<nav>`, `<main>` (wrapping the
  section content between Nav and Footer, if not already present from
  earlier phases — added here if missing), and `<footer>` landmarks are
  present and uniquely identifiable.
- Given the page's heading hierarchy, when inspected top to bottom, then
  there is exactly one `<h1>` (in Hero) and exactly one `<h2>` per
  numbered section (01–07), with no heading level skipped (e.g. no `<h2>`
  followed directly by `<h4>`).
- Given the hamburger button and mobile menu (from Phase 3), when
  re-audited here, then `aria-expanded`/`aria-controls`/`aria-label`
  attributes are all still correct and now cross-checked against a
  real screen-reader pass (not just DOM inspection).
- Given the contact form's validation states (from Phase 3), when
  re-audited here, then `aria-live`, `aria-invalid`, and
  `aria-describedby` wiring is confirmed still correct under a real
  screen-reader pass.

**Dependencies:** `phase-2-content.md` (all CONTENT items),
`phase-3-animations.md` (ANIM-06, ANIM-07).

---

## POLISH-06 — Performance sanity pass

**Description:** Confirm no unused CSS bloat, appropriately-sized image
placeholders, and no layout shift from font loading.

**Files:** any stylesheet/component requiring cleanup.

**Acceptance Criteria:**
- Given a production build (`npm run build`), when the output bundle is
  inspected, then no per-section CSS file is being imported/shipped for a
  section that isn't actually rendered (the colocated-CSS convention from
  Section 4 means each stylesheet ships only when its component is part
  of the bundle — this is verified here, not assumed).
- Given any placeholder image/graphic assets referenced in the markup,
  when inspected, then they specify explicit `width`/`height` attributes
  (or `aspect-ratio` in CSS) so no cumulative layout shift occurs while
  they load.
- Given the font stack, when inspected, then it confirms zero external
  font requests (re-verifying Phase 1's `variables.css` rule at the fully
  built-out site level) — meaning there is no font-swap layout shift by
  construction, and this is confirmed by checking the Network panel shows
  no font file requests.
- Given the production build, when run through a Lighthouse-style manual
  check (or the actual Lighthouse tool if available), then Performance,
  Accessibility, Best Practices, and SEO categories show no obvious
  regressions/red flags attributable to this project's own code (as
  opposed to generic dev-server-only warnings that don't apply to
  production builds).

**Dependencies:** `phase-2-content.md`, `phase-3-animations.md`.

---

## POLISH-07 — Phase 4 exit verification

**Description:** Confirm the Phase 4 exit criteria from project-plan
Section 6 are met. This is the last checklist before the project moves to
Phase 5 (Code Review, tracked in `docs/reviews/`) and Phase 6 (Security
Review, tracked in `docs/security-reviews/`), which are not backlog items
in this file set.

**Files:** none (verification-only item).

**Acceptance Criteria:**
- Given POLISH-01 through POLISH-06, when each is re-checked, then all
  pass with no open findings.
- Given the site at every breakpoint (320, 480, 768, 1024, 1280, 1440px),
  when `prefers-reduced-motion: reduce` is also toggled on, then the site
  remains fully usable and legible at every combination (this restates
  the Section 6 Phase 4 exit criterion combining both responsive and
  reduced-motion checks).
- Given this checklist passes, when work continues, then the next steps
  are Phase 5 (Code Review) and Phase 6 (Security Review) as described in
  project-plan Section 6 — both are review passes against the finished
  build, not additional feature backlog, and are recorded under
  `docs/reviews/` and `docs/security-reviews/` respectively rather than as
  new entries in `docs/backlog/`.
- Given any residual nice-to-have or out-of-scope idea surfaces during
  this phase (e.g. analytics integration, blog/CMS integration, light-
  theme toggle — per project-plan Section 7), when identified, then it is
  filed as its own new file under `docs/backlog/` rather than expanding
  this phase's scope.

**Dependencies:** POLISH-01 through POLISH-06 (all prior items in this
phase).
