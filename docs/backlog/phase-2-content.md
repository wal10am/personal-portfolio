# Phase 2 — Content

Source: `docs/project-plan.md`, Section 6 ("Phase 2 — Content") plus the
content-ownership rules in Section 1 (Component Tree & Data Flow) and the
colocated-CSS convention in Section 4.

Goal: every section component has real semantic structure and its own
colocated CSS file, all personal content is bracketed placeholder text
(`[PLACEHOLDER: description]`), content renders correctly with JS disabled
(no content hidden purely behind a hook), and the `Nav` link list /
`App.jsx` section order / anchor ids are all in sync. No interactive/motion
wiring yet (that's Phase 3).

Depends on: `phase-1-foundation.md` fully complete (App skeleton, all
global stylesheets, all hooks implemented and unit-testable in isolation).

---

## CONTENT-01 — `Hero.jsx` + `hero.css`

**Description:** Build the hero section: name/headline placeholder, short
tagline placeholder, primary CTA(s), no numbered `<section>` wrapper (per
Section 1.1, Hero is exempt).

**Files:** `src/components/Hero.jsx`, `src/styles/hero.css`

**Acceptance Criteria:**
- Given `Hero.jsx`, when inspected, then it contains exactly one `<h1>`
  element in the entire page (Hero owns the page's sole `h1`, per the
  heading-hierarchy rule in Section 6 Phase 4, established here since it's
  authored in this phase) wrapping placeholder text in the form
  `[PLACEHOLDER: full name or headline]`.
- Given the hero's supporting copy (tagline/role/bio snippet), when
  inspected, then every piece of personal text is wrapped as
  `[PLACEHOLDER: description of what goes here]` — no invented specific
  name, employer, or biography appears anywhere.
- Given any CTA buttons/links in the hero (e.g. "view work", "contact"),
  when inspected, then they are real anchor links (`href="#projects"`,
  `href="#contact"`, etc.) pointing at real section ids already
  established in `App.jsx`, not placeholder `href="#"` dead links.
- Given `Hero.jsx`, when inspected, then it imports its own stylesheet
  directly: `import '../styles/hero.css'`.
- Given `hero.css`, when inspected, then every color/spacing/radius/font
  value routes through a `var(--token-name)` from `variables.css` — no raw
  hex/px/font-family literals.
- Given the hero contains any image/graphic placeholder, when inspected,
  then it has `alt="[PLACEHOLDER: alt text describing X]"` (or is marked
  `role="presentation"`/`alt=""` if purely decorative, explicitly noted as
  such).
- Given JavaScript is disabled (or the page is viewed via "view source" /
  throttled JS), when the hero is inspected, then the `<h1>` and
  supporting copy are present and readable in the static markup — no
  content depends on `useParallax` to become visible (parallax is a
  transform-only enhancement wired in Phase 3).

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-02 — `About.jsx` + `about.css` (section 01)

**Description:** Build the About section with bio placeholder content,
wrapped per the numbered-section contract.

**Files:** `src/components/About.jsx`, `src/styles/about.css`

**Acceptance Criteria:**
- Given `About.jsx`, when inspected, then it renders a `<section
  id="about" aria-labelledby="about-heading">` wrapping an `<h2
  id="about-heading">` with a numeric-prefixed comment/label identifying
  it as section 01.
- Given the section body, when inspected, then bio/summary text is
  wrapped as `[PLACEHOLDER: bio paragraph describing background,
  interests, approach]` (or equivalent descriptive placeholder) — no
  fabricated specific biography.
- Given any stat/side-panel content mentioned for the 768px+ two-column
  layout (Section 5), when inspected, then it exists in the markup already
  (even if visually stacked at mobile widths) so the responsive pass in
  Phase 4 has real content to lay out.
- Given `About.jsx` imports `'../styles/about.css'`, when inspected, then
  all selectors in `about.css` are scoped under `#about` (e.g. `#about
  .stat { … }`) to avoid bleeding into other sections, per Section 4.
- Given `about.css`, when scanned, then it contains zero raw hex/px
  literals outside `var(--token-name)` usage.
- Given JS is disabled, when the section is inspected, then the bio
  content is fully present/readable (no `useScrollReveal`-gated
  visibility — reveal is an animation enhancement wired in Phase 3, not a
  visibility gate, per Section 2's `useScrollReveal` contract).

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-03 — `Skills.jsx` + `skills.css` (section 02)

**Description:** Build the Skills section as a local array of skill/skill-
group entries mapped to markup, wrapped per the numbered-section contract.

**Files:** `src/components/Skills.jsx`, `src/styles/skills.css`

**Acceptance Criteria:**
- Given `Skills.jsx`, when inspected, then it renders `<section
  id="skills" aria-labelledby="skills-heading">` with `<h2
  id="skills-heading">` and a section-02 comment/label.
- Given the skill list, when inspected, then it is defined as a local
  array constant at the top of the file (e.g. `const SKILLS = [...]`) and
  mapped over with a stable `key` (not array index where entries could
  reorder) — no content is passed in as a prop from `App`.
- Given each skill entry, when inspected, then its label is either a
  reasonable generic category placeholder (e.g. `"[PLACEHOLDER: skill/tech
  name]"`) or, if the plan intends real technology names (React, CSS,
  etc.) as neutral category labels rather than personal claims, that
  distinction is documented in the component — no fabricated
  proficiency/years-of-experience claims attributed to a specific person.
- Given `skills.css`, when inspected, then the grid/list layout is defined
  mobile-first (single column/stack at the 320px floor) with the 1024px+
  multi-column grid activation noted as a `min-width` hook for Phase 4's
  responsive pass (Section 5: "small laptops, multi-column grids activate
  (Skills, Projects, Testimonials)").
- Given `skills.css` selectors, when inspected, then they are scoped under
  `#skills` and reference only `var(--token-name)` values.
- Given JS is disabled, when the section is inspected, then every skill
  entry is present/readable in static markup.

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-04 — `Experience.jsx` + `experience.css` (section 03)

**Description:** Build the Experience section as a local array of
work-history entries (employer, title, dates, description) rendered as a
timeline, wrapped per the numbered-section contract.

**Files:** `src/components/Experience.jsx`, `src/styles/experience.css`

**Acceptance Criteria:**
- Given `Experience.jsx`, when inspected, then it renders `<section
  id="experience" aria-labelledby="experience-heading">` with `<h2
  id="experience-heading">` and a section-03 comment/label.
- Given the experience list, when inspected, then it is a local array
  constant (e.g. `const EXPERIENCE = [...]`) mapped with a stable `key`,
  and every entry's `employer`, `title`, `dates`, and `description` fields
  are wrapped as `[PLACEHOLDER: employer name]`, `[PLACEHOLDER: job
  title]`, `[PLACEHOLDER: start–end dates]`, `[PLACEHOLDER: role
  description / achievements]` respectively — no invented real company
  names or dates.
- Given the markup structure, when inspected, then it uses a
  semantically-ordered list (`<ol>`/`<ul>` or equivalent) rather than
  bare `<div>`s, since work history is inherently ordered/chronological
  content.
- Given `experience.css`, when inspected, then it defines the
  stacked-at-mobile / side-by-side-rail-at-1024px+ timeline layout
  described in Section 5 ("Experience timeline goes side-by-side (rail +
  content)"), with the 1024px shift expressed as a `min-width` query using
  the shared breakpoint value, scoped under `#experience`.
- Given `experience.css`, when scanned, then it contains zero raw hex/px
  literals outside `var(--token-name)`/`calc()`-of-tokens usage.
- Given JS is disabled, when the section is inspected, then every
  experience entry (employer/title/dates/description) is present and
  readable in static markup.

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-05 — `Projects.jsx` + `projects.css` (section 04)

**Description:** Build the Projects section as a local array of project
cards (name, description, tech tags, link), each card ready to receive a
`useTilt` ref in Phase 3, wrapped per the numbered-section contract.

**Files:** `src/components/Projects.jsx`, `src/styles/projects.css`

**Acceptance Criteria:**
- Given `Projects.jsx`, when inspected, then it renders `<section
  id="projects" aria-labelledby="projects-heading">` with `<h2
  id="projects-heading">` and a section-04 comment/label.
- Given the project list, when inspected, then it is a local array
  constant (e.g. `const PROJECTS = [...]`) mapped with a stable `key`
  (project slug/id, not index), and every entry's `name`, `description`,
  and `link` are wrapped as `[PLACEHOLDER: project name]`, `[PLACEHOLDER:
  project description]`, `[PLACEHOLDER: project URL / repo link]` — no
  fabricated specific project claims.
- Given each project card in the markup, when inspected, then it is
  structured so a per-card `<ProjectCard>`-shaped element (or equivalent
  mapped `<article>`) exists as a natural attach point for `useTilt`'s
  returned `ref`/`style` in Phase 3 — i.e. one clear wrapping element per
  card, not a flat list of loose siblings.
- Given any project thumbnail/screenshot placeholder, when inspected, then
  it has `alt="[PLACEHOLDER: alt text describing project screenshot]"`.
- Given `projects.css`, when inspected, then it defines the
  mobile stack/scroll-snap layout at the 320–767px range and the
  multi-column grid at 1024px+ (Section 5), scoped under `#projects`, all
  values token-driven.
- Given JS is disabled, when the section is inspected, then every project
  card's name/description/link is present and the link is a real,
  clickable anchor (even if its `href` is itself a placeholder value) —
  card content is never hidden pending `useTilt`, which is a pure
  hover-transform enhancement.

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-06 — `Testimonials.jsx` + `testimonials.css` (section 05)

**Description:** Build the Testimonials section as a local array of
quote/name/role entries, wrapped per the numbered-section contract.

**Files:** `src/components/Testimonials.jsx`, `src/styles/testimonials.css`

**Acceptance Criteria:**
- Given `Testimonials.jsx`, when inspected, then it renders `<section
  id="testimonials" aria-labelledby="testimonials-heading">` with `<h2
  id="testimonials-heading">` and a section-05 comment/label.
- Given the testimonial list, when inspected, then it is a local array
  constant (e.g. `const TESTIMONIALS = [...]`) mapped with a stable `key`,
  and every entry's `quote`, `name`, and `role` are wrapped as
  `[PLACEHOLDER: testimonial quote]`, `[PLACEHOLDER: person's name]`,
  `[PLACEHOLDER: person's role/company]` — no invented named individuals
  or fabricated quotes attributed to real-sounding people.
- Given the markup, when inspected, then each testimonial uses a
  semantic `<blockquote>` with a `<cite>` (or equivalent) for
  attribution, not bare `<div>`/`<p>` soup.
- Given `testimonials.css`, when inspected, then it defines the mobile
  stack and 1024px+ multi-column grid activation (Section 5), scoped
  under `#testimonials`, token-driven.
- Given JS is disabled, when the section is inspected, then every
  testimonial's quote/name/role is present/readable in static markup.

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-07 — `Education.jsx` + `education.css` (section 06)

**Description:** Build the Education section as a local array of
school/degree entries, wrapped per the numbered-section contract.

**Files:** `src/components/Education.jsx`, `src/styles/education.css`

**Acceptance Criteria:**
- Given `Education.jsx`, when inspected, then it renders `<section
  id="education" aria-labelledby="education-heading">` with `<h2
  id="education-heading">` and a section-06 comment/label.
- Given the education list, when inspected, then it is a local array
  constant (e.g. `const EDUCATION = [...]`) mapped with a stable `key`,
  and every entry's `school`, `degree`, and `dates` are wrapped as
  `[PLACEHOLDER: school/institution name]`, `[PLACEHOLDER: degree /
  field of study]`, `[PLACEHOLDER: start–end dates]` — no invented real
  institution names.
- Given `education.css`, when inspected, then it follows the same
  stacked-at-mobile layout convention as `experience.css` (education
  entries are also inherently chronological), scoped under `#education`,
  token-driven.
- Given JS is disabled, when the section is inspected, then every
  education entry is present/readable in static markup.

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-08 — `Contact.jsx` + `contact.css` (section 07)

**Description:** Build the Contact section's static structure and
placeholder contact details/form markup. Client-side validation *behavior*
is Phase 3 — this item only establishes semantic form markup and
placeholder values.

**Files:** `src/components/Contact.jsx`, `src/styles/contact.css`

**Acceptance Criteria:**
- Given `Contact.jsx`, when inspected, then it renders `<section
  id="contact" aria-labelledby="contact-heading">` with `<h2
  id="contact-heading">` and a section-07 comment/label.
- Given direct contact details, when inspected, then email/social links
  are wrapped as `[PLACEHOLDER: contact email address]`,
  `[PLACEHOLDER: LinkedIn/GitHub/social URL]`, etc. — no real or invented
  personal contact info.
- Given a contact form is present, when inspected, then every `<input>`/
  `<textarea>` has an associated `<label>` (via `htmlFor`/`id` pairing,
  not placeholder-attribute-only labeling), appropriate `type`/
  `autocomplete` attributes, and the form's `action`/submission target is
  itself `[PLACEHOLDER: form endpoint / mailto / service integration]` —
  no invented real backend endpoint.
- Given the form exists in this phase, when inspected, then it has no
  client-side validation *logic* wired yet (that's Phase 3 /
  `phase-3-animations.md`) — static required/type attributes are
  acceptable, but interactive error-state UI is out of scope here.
- Given `contact.css`, when inspected, then form field styling
  (borders, focus states, spacing) is entirely token-driven, scoped under
  `#contact`.
- Given JS is disabled, when the section is inspected, then contact
  details and the form's fields/labels are present and the form is
  submittable via native HTML behavior (even though its target is a
  placeholder).

**Dependencies:** `phase-1-foundation.md` (FOUND-15).

---

## CONTENT-09 — `Nav.jsx` real content + `Footer.jsx` + `footer.css`

**Description:** Fill in `Nav`'s real link list (label text) and build
`Footer.jsx` with placeholder copyright/social content.

**Files:** `src/components/Nav.jsx`, `src/components/Footer.jsx`,
`src/styles/footer.css`

**Acceptance Criteria:**
- Given `Nav.jsx`'s local link-list constant (established as a skeleton in
  Phase 1), when inspected now, then it contains exactly seven entries —
  one per section, in the exact order `about, skills, experience,
  projects, testimonials, education, contact` — each with a human-readable
  `label` (e.g. "About", "Skills") and an `href`/`id` matching the
  section's real `id` attribute.
- Given `App.jsx`'s section render order, when compared against `Nav.jsx`'s
  link-list order, then the two are identical — this is the manual sync
  point called out in project-plan Section 1.2 and Section 6 Phase 2, and
  it must be verified by direct side-by-side comparison, not assumed.
- Given the nav's hamburger button (mobile), when inspected, then it has
  `aria-label="[PLACEHOLDER or literal: Open menu]"` (a real accessible
  label, not a placeholder-bracket string, since this is UI chrome text
  rather than personal content) plus `aria-expanded="false"` and
  `aria-controls` pointing at the menu panel's `id` — the *state* wiring
  (toggling `aria-expanded` on click) is Phase 3, but the attributes exist
  now.
- Given `Footer.jsx`, when inspected, then it contains a copyright line
  with `[PLACEHOLDER: name/site owner]` and `[PLACEHOLDER: year]` (or a
  live `new Date().getFullYear()` for the year, which is not personal
  content and does not need bracketing), and any social/contact links
  reuse the same placeholder convention as `Contact.jsx`.
- Given `footer.css`, when inspected, then all values are token-driven.
- Given JS is disabled, when the nav and footer are inspected, then all
  seven nav links and the footer content are present and the nav links
  are real anchor `href="#id"` links that work via native browser
  anchor-scrolling with no JS required.

**Dependencies:** CONTENT-01 through CONTENT-08 (all section ids/content
must exist for the nav link list and anchor hrefs to have real targets to
point at).

---

## CONTENT-10 — No-JS content visibility audit

**Description:** Explicit verification pass confirming the "meaningful
content before hydration" requirement holds across every section built in
this phase.

**Files:** none (verification-only item).

**Acceptance Criteria:**
- Given the production build (`npm run build && npm run preview`, or dev
  server with JS throttled/disabled via browser DevTools), when the page
  is loaded, then every section's heading and body content (Hero through
  Footer) is present in the rendered HTML / visible without requiring any
  hook to run.
- Given "View Page Source" (or the initial server-rendered/static markup
  Vite produces before hydration), when checked, then no section is an
  empty shell waiting on `useScrollReveal`/`useParallax`/`useTilt` to
  populate content — those hooks may only be pending for *animation*
  application, never for content presence (this restates and verifies the
  Section 6 Phase 2 exit criterion).
- Given this audit finds a violation, when discovered, then it is fixed in
  the owning component directly (not deferred) since it's a Phase 2 exit
  blocker, not a nice-to-have.

**Dependencies:** CONTENT-01 through CONTENT-09.

---

## CONTENT-11 — Phase 2 exit verification

**Description:** Confirm the Phase 2 exit criteria from project-plan
Section 6 are met before Phase 3 (`phase-3-animations.md`) begins.

**Files:** none (verification-only item).

**Acceptance Criteria:**
- Given the full page, when scrolled top to bottom, then it reads as a
  coherent one-page narrative (Hero → About → Skills → Experience →
  Projects → Testimonials → Education → Contact → Footer) with obviously-
  bracketed placeholder content throughout — no fabricated specific
  personal details anywhere in the DOM.
- Given every section, when its `id` is checked against
  `about, skills, experience, projects, testimonials, education, contact`,
  then all seven are present exactly once each, matching `Nav`'s link list
  and `App.jsx`'s render order (CONTENT-09's sync check re-confirmed).
- Given CONTENT-10's no-JS audit, when re-checked, then it still passes
  with no regressions introduced by later items in this phase.
- Given this checklist passes, when Phase 3 begins, then no Content item
  remains open/blocking.

**Dependencies:** CONTENT-01 through CONTENT-10 (all prior items in this
phase).
