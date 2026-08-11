# Phase 3 — Animations & Interaction (Integration)

Source: `docs/project-plan.md`, Section 6 ("Phase 3 — Integration") plus
the hook contracts in Section 2 and the responsive/hamburger behavior in
Section 5.

Goal: wire the five already-implemented hooks (`useScrollSpy`,
`useScrollProgress`, `useScrollReveal`, `useParallax`, `useTilt`) into the
already-built content components from Phase 2, add hamburger menu
open/close state, and add contact-form client-side validation state (no
backend). Every hook must end this phase actually consumed by a component
— none orphaned — and `prefers-reduced-motion` must visibly disable every
transform-based effect while content stays fully visible.

Depends on: `phase-1-foundation.md` (hooks implemented) and
`phase-2-content.md` (all section components and their content) fully
complete.

---

## ANIM-01 — Wire `useScrollSpy` into `Nav`

**Description:** Connect the hook's `activeId` output to `Nav`'s
active-link visual state.

**Files:** `src/components/Nav.jsx`

**Acceptance Criteria:**
- Given `Nav.jsx` calls `useScrollSpy()`, when the user scrolls the page,
  then the nav link matching the currently-in-view section receives the
  `.is-active` (or equivalent) class/state defined in `nav.css`, and no
  other link does.
- Given the user clicks a nav link to jump to a section, when the browser
  completes the scroll, then `activeId` updates to match and the visual
  active state follows without a page reload (native anchor scroll, not
  JS-driven scrolling).
- Given `activeId` is `null`/unset at initial load (e.g. before any
  section has crossed the observer threshold), when the nav renders, then
  no link is incorrectly marked active, or the first section (`about`) is
  active by sensible default — whichever the implementation chooses, it
  is consistent and not visually broken (e.g. two links simultaneously
  active).
- Given keyboard-only navigation (Tab through nav links, or Enter on a
  focused link), when a section is reached, then the active-state
  highlight updates the same as with mouse-driven scroll.

**Dependencies:** `phase-1-foundation.md` (FOUND-13), `phase-2-content.md`
(CONTENT-09).

---

## ANIM-02 — Wire `useScrollProgress` into `ScrollProgress`

**Description:** Connect the hook's `progress` output to the progress
bar's width/transform.

**Files:** `src/components/ScrollProgress.jsx`

**Acceptance Criteria:**
- Given `ScrollProgress.jsx` calls `useScrollProgress()`, when the page is
  scrolled from top to bottom, then the bar's width (or `scaleX`
  transform) animates from `0%`/`0` to `100%`/`1` proportionally and
  smoothly, with no visible jank/stutter under normal scroll speed.
- Given the page is at the very top, when loaded, then the bar renders at
  `0` width — not hidden/undefined, not full-width.
- Given the bar is styled via `layout.css` (per Section 4, `ScrollProgress`
  has no dedicated stylesheet), when inspected, then the component only
  sets the dynamic inline `width`/`transform` style and leaves static
  chrome (color, height, position, z-index) to `layout.css`.
- Given `prefers-reduced-motion: reduce` is set, when the page scrolls,
  then the bar still updates its width accurately (this is a scroll
  *indicator*, not a decorative animation, so it is not disabled by
  reduced motion — only its CSS transition easing, if any, should shorten/
  remove per the `animations.css` reduced-motion safety net from Phase 1).

**Dependencies:** `phase-1-foundation.md` (FOUND-12).

---

## ANIM-03 — Wire `useScrollReveal` into each section

**Description:** Apply the reveal ref/visible pattern to About, Skills,
Experience, Projects, Testimonials, Education, Contact (and optionally
sub-elements within them), toggling the shared `.is-visible` class from
`animations.css`.

**Files:** `src/components/About.jsx`, `Skills.jsx`, `Experience.jsx`,
`Projects.jsx`, `Testimonials.jsx`, `Education.jsx`, `Contact.jsx`

**Acceptance Criteria:**
- Given each of the seven section components, when it mounts and calls
  `useScrollReveal()`, then its returned `ref` is attached to the
  section's root element (or to individual child elements for staggered
  reveal, at the implementer's discretion) and the returned `visible`
  boolean is used to toggle the `.is-visible` class defined in
  `animations.css`.
- Given a section scrolls into view for the first time, when the reveal
  threshold is crossed, then the fade/slide-in transition plays exactly
  once — scrolling back up and down again does not replay it (per the
  hook's unobserve-after-first-reveal contract from Phase 1).
- Given `prefers-reduced-motion: reduce` is set, when any section is
  scrolled to, then it is already in its final visible state with no
  transform/opacity animation played (the hook returns `visible: true`
  immediately per Phase 1's `useScrollReveal` contract) — content is
  identical either way, only the transition is skipped.
- Given JavaScript fails to load entirely, when a section is inspected,
  then its content is still fully visible (the base CSS state for
  `.is-visible`-less elements must not be `opacity: 0`/`display: none` by
  default — only the *pre-reveal* transform offset is allowed, and it must
  be a subtle, content-legible offset, not a hard hide). This re-verifies
  the Phase 2 no-JS content rule now that reveal classes exist.

**Dependencies:** `phase-1-foundation.md` (FOUND-08, FOUND-14),
`phase-2-content.md` (CONTENT-02 through CONTENT-08).

---

## ANIM-04 — Wire `useParallax` into `Hero`

**Description:** Connect the hook's `{ x, y }` output to a transform on
the hero's heading/art layer.

**Files:** `src/components/Hero.jsx`

**Acceptance Criteria:**
- Given `Hero.jsx` calls `useParallax()`, when the mouse moves within the
  hero area, then the target element's inline `transform:
  translate(x, y)` (or similar) updates smoothly to track cursor position
  within the small clamped range the hook defines.
- Given the mouse leaves the hero area, when checked, then the transform
  returns to (or stays near) its neutral/centered position rather than
  freezing at the last offset indefinitely.
- Given `prefers-reduced-motion: reduce` is set, when the mouse moves over
  the hero, then no transform is applied at all (the hook returns static
  `{ x: 0, y: 0 }` and never attaches the listener, per its Phase 1
  contract) — the hero's `<h1>` and copy remain exactly as legible as with
  motion enabled.
- Given a touch/no-mouse device, when the hero is viewed, then the
  parallax effect simply never triggers (no `mousemove` events fire) and
  no layout shift or broken transform state results.

**Dependencies:** `phase-1-foundation.md` (FOUND-14), `phase-2-content.md`
(CONTENT-01).

---

## ANIM-05 — Wire `useTilt` into project cards

**Description:** Connect the hook's `{ ref, style }` output to each
mapped card in `Projects.jsx`, one hook call per card.

**Files:** `src/components/Projects.jsx` (and a `ProjectCard`
sub-component if the implementer chooses to extract one)

**Acceptance Criteria:**
- Given each project card in the `PROJECTS` array render, when the mouse
  moves over that specific card, then only that card tilts (the effect is
  scoped per-card, not to the whole grid/section) — this requires calling
  `useTilt()` once per card instance, which in turn requires either
  extracting a `ProjectCard` component (hooks can't be called inside a
  `.map()` callback directly) or an equivalent per-item component
  boundary.
- Given the mouse leaves a tilted card, when checked, then its transform
  resets to neutral (flat) smoothly, matching the hook's `mouseleave`
  contract from Phase 1.
- Given `prefers-reduced-motion: reduce` is set, when any card is
  hovered, then no tilt transform is applied (static neutral style, per
  the hook's Phase 1 contract).
- Given a touch device (`pointer: coarse`), when a card is tapped, then no
  tilt transform is attempted and tapping still activates the card's link
  normally (no dead-zone introduced by the hook's touch guard).
- Given all project cards, when inspected as a set, then every card
  independently tracks its own hover state with no cross-card interference
  (hovering card A never tilts card B).

**Dependencies:** `phase-1-foundation.md` (FOUND-14), `phase-2-content.md`
(CONTENT-05).

---

## ANIM-06 — Hamburger menu open/close state in `Nav`

**Description:** Add the interactive open/close state for the mobile
hamburger menu, wiring the `aria-expanded`/`aria-controls` attributes
established structurally in Phase 2 to real toggle behavior.

**Files:** `src/components/Nav.jsx`, `src/styles/nav.css` (state-class
additions only, no new tokens)

**Acceptance Criteria:**
- Given the hamburger button below the 768px breakpoint, when clicked/
  tapped, then the menu panel opens (becomes visible) and the button's
  `aria-expanded` attribute flips from `"false"` to `"true"`; a second
  click closes it and flips `aria-expanded` back to `"false"`.
- Given the menu panel is open, when a nav link inside it is clicked, then
  the menu closes (state resets to `aria-expanded="false"`) in addition to
  the browser's native anchor-scroll to the target section.
- Given the menu is open, when the `Escape` key is pressed, then the menu
  closes and focus returns to the hamburger button.
- Given the hamburger button, when reached via keyboard `Tab`, then it is
  focusable and operable via `Enter`/`Space`, and when open, focus is
  trappable/reachable within the menu panel's links (not lost to the
  page background).
- Given the viewport is resized/rotated from mobile to ≥768px while the
  menu is open, when the breakpoint crosses, then the mobile menu state
  resets/closes so it doesn't persist as an orphaned open panel once the
  layout switches to inline links.
- Given `prefers-reduced-motion: reduce` is set, when the menu opens/
  closes, then any open/close transition (slide/fade) is instant or
  minimal rather than an animated slide, while the open/closed *state
  itself* still functions identically.

**Dependencies:** `phase-2-content.md` (CONTENT-09).

---

## ANIM-07 — Contact form client-side validation state

**Description:** Add interactive validation state to the Contact form
built in Phase 2 — required-field/format checks, inline error/success
styling using the `--color-error`/`--color-success` tokens — with no
backend call invented.

**Files:** `src/components/Contact.jsx`, `src/styles/contact.css` (state-
class additions)

**Acceptance Criteria:**
- Given the contact form's required fields (e.g. name, email, message),
  when the form is submitted with any of them empty, then an inline error
  message appears near the offending field using `var(--color-error)`,
  and the field itself gets a visible error-state border/outline; the
  native `<form>` submission does not proceed to its placeholder target
  until resolved.
- Given an email-type field, when a syntactically invalid value is
  entered and the field loses focus (`blur`) or the form is submitted,
  then a format-error message appears (e.g. "[PLACEHOLDER-adjacent] please
  enter a valid email" — this message is real UI copy, not personal
  content, so it does not need bracket-placeholder wrapping).
- Given all required fields are valid, when the form is submitted, then a
  success-state indicator using `var(--color-success)` is shown (e.g. "message
  ready to send" or similar), and the actual submission target remains
  `[PLACEHOLDER: form endpoint / mailto / service integration]` — no real
  network call, API key, or backend endpoint is introduced anywhere in
  this item.
- Given every error/success message, when inspected for accessibility,
  then it is associated with its field via `aria-describedby` and the
  field itself sets `aria-invalid="true"` while in an error state.
- Given a screen reader user, when validation state changes on submit,
  then an `aria-live` region (polite) announces the summary result so the
  error/success state isn't purely visual.
- Given `prefers-reduced-motion: reduce` is set, when error/success states
  appear, then any shake/slide entrance animation on the message is
  skipped in favor of an instant appearance, per the reduced-motion rule
  applying to every transform-based effect in the app.

**Dependencies:** `phase-2-content.md` (CONTENT-08).

---

## ANIM-08 — Reduced-motion audit across all wired effects

**Description:** Cross-cutting verification pass: with the OS-level
`prefers-reduced-motion: reduce` setting enabled, confirm every
transform/animation-based effect wired in this phase is disabled while
content remains fully visible and functional.

**Files:** none (verification-only item; fixes land in the owning
component/hook file if a gap is found).

**Acceptance Criteria:**
- Given the OS/browser reduced-motion setting is enabled, when the full
  page is scrolled top to bottom, then: the scroll-reveal transition does
  not play on any section (content is immediately in final state), the
  hero parallax never applies a transform, project card tilt never
  applies a transform, and the hamburger menu's open/close transition (if
  any) is instant.
- Given reduced motion is enabled, when the scroll-progress bar and
  active-nav-link highlighting are checked, then both continue to update
  normally (they are functional indicators, not decorative motion, so
  they are correctly exempt from being disabled).
- Given reduced motion is enabled, when every section's content is
  compared against the motion-enabled state, then the *content* (text,
  links, images, form fields) is byte-for-byte identical — only
  transforms/transitions differ.
- Given this audit finds any effect that still animates under reduced
  motion, when discovered, then it is fixed in the owning hook (Phase 1
  files) or component (this phase's files) before Phase 3 is considered
  closed.

**Dependencies:** ANIM-01 through ANIM-07.

---

## ANIM-09 — Keyboard and mouse interaction parity audit

**Description:** Cross-cutting verification that every interaction wired
in this phase works with both mouse and keyboard, per the Phase 3 exit
criteria.

**Files:** none (verification-only item).

**Acceptance Criteria:**
- Given every nav link (desktop inline and mobile menu), when operated via
  keyboard (`Tab` + `Enter`) instead of mouse, then it scrolls to and
  activates the same section as a mouse click would.
- Given the hamburger button and menu panel, when operated entirely via
  keyboard (per ANIM-06's criteria), then open/close/escape/focus-return
  all function without a mouse.
- Given the contact form, when filled and submitted entirely via keyboard,
  then validation states (error/success) trigger identically to mouse-
  driven interaction.
- Given project cards, when reached via keyboard `Tab` (no hover/mouse
  tilt possible), then the card's link is still fully operable via
  `Enter`, and no keyboard-only user is blocked from any functionality
  that a mouse user has (tilt itself is a pure visual enhancement with no
  keyboard equivalent needed, but the underlying link/content must not
  require hover to reach).

**Dependencies:** ANIM-01 through ANIM-07.

---

## ANIM-10 — Phase 3 exit verification

**Description:** Confirm the Phase 3 exit criteria from project-plan
Section 6 are met before Phase 4 (`phase-4-polish.md`) begins.

**Files:** none (verification-only item).

**Acceptance Criteria:**
- Given all five hooks (`useScrollSpy`, `useScrollProgress`,
  `useScrollReveal`, `useParallax`, `useTilt`), when the codebase is
  searched for their usage, then each is imported and called by at least
  one component — none is orphaned/unused.
- Given ANIM-08 (reduced-motion audit) and ANIM-09 (keyboard/mouse parity
  audit), when re-checked, then both pass with no open findings.
- Given the hamburger menu and contact form validation, when manually
  exercised end-to-end, then both function correctly per ANIM-06 and
  ANIM-07's criteria.
- Given this checklist passes, when Phase 4 begins, then no
  Animations/Integration item remains open/blocking.

**Dependencies:** ANIM-01 through ANIM-09 (all prior items in this phase).
