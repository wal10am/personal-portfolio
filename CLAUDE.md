# Conventions

This is a React 18 + Vite personal-portfolio scaffold. Follow these conventions when extending it.

## Stack rules

- **Functional components only.** No class components, anywhere.
- **Custom hooks for behavior.** Any non-trivial DOM/browser interaction (observers, scroll, mousemove, media queries) belongs in a hook under `src/hooks/`, not inlined in a component.
- **Plain CSS with design tokens.** No CSS-in-JS (styled-components, emotion, etc.), no Tailwind, no UI component library. All colors, spacing, type sizes, radii, durations, and easings come from custom properties defined in `src/styles/variables.css` — never hardcode a hex color, raw `px`/`rem` spacing value, or magic transition duration in a component stylesheet. If you need a new value, add a token to `variables.css` first, then reference it.
- npm is the package manager. Don't introduce yarn/pnpm lockfiles.

## Design tokens

- Background `#14161a`, surface `#1c1f26`, accent `#3fa9f5` — these live in `variables.css` as `--color-bg`, `--color-surface`, `--color-accent` (check the actual token names in that file before using them). Extend the existing token names/scale rather than inventing a parallel one (e.g. the spacing scale is `--space-0`…`--space-12` — don't add `--space-md`/`--space-lg` alongside it).
- Every stylesheet has a `@media (prefers-reduced-motion: reduce)` backstop for any animation/transition it defines, in addition to the JS-level checks in the relevant hooks.

## One hook per concern

`src/hooks/` currently has:
- `useScrollSpy.js` — active nav section (IntersectionObserver)
- `useScrollProgress.js` — 0–100 scroll percentage
- `useScrollReveal.js` — ref + `visible` boolean for fade/slide-in reveals
- `useParallax.js` — mousemove transform values for the Hero
- `useTilt.js` — mousemove 3D tilt for project cards

Each hook does one thing. If you need new scroll/observer/pointer behavior, add a new hook rather than growing an existing one or duplicating the logic inline in a component. Any hook that attaches a listener or observer must return a cleanup function from its `useEffect`. Any hook that drives a visual animation/transform must check `window.matchMedia('(prefers-reduced-motion: reduce)')` before doing animated work; hooks that also apply to touch input (like `useTilt`) should skip coarse-pointer/touch devices too.

## Colocated CSS

Every component imports its own CSS file directly and nothing else imports it:

```jsx
// Hero.jsx
import '../styles/hero.css';
```

Global/shared styles (`variables.css`, `reset.css`, `typography.css`, `layout.css`, `nav.css`, `animations.css`, `responsive.css`) are pulled in once via `src/styles/index.css`, imported only from `main.jsx`. Don't import global stylesheets from individual components, and don't put component-specific rules in the global files.

## Section components

Every component other than `Hero`, `Nav`, `ScrollProgress`, and `Footer` is a numbered section: `<section id="...">` wrapped with the shared `.section__header` / `.section__title` / `.section__number` / `.section__description` markup from `layout.css` (see any existing section component for the exact pattern). The `id` must match the corresponding entry in `Nav.jsx` and the target list read by `useScrollSpy`:

| Component | id |
|---|---|
| About | `about` |
| Skills | `skills` |
| Experience | `experience` |
| Projects | `projects` |
| Testimonials | `testimonials` |
| Education | `education` |
| Contact | `contact` |

If you add, remove, or reorder a section, update `App.jsx`'s render order, `Nav.jsx`'s link list, and `useScrollSpy`'s target ids together — they have to stay in sync.

## Accessibility & rendering

- Use semantic HTML (`nav`, `main`, `section`, `header`, `footer`) — don't reach for a generic `div` where a semantic element fits.
- Any image needs real (or `[PLACEHOLDER: ...]`) `alt` text — never an empty string unless the image is genuinely decorative.
- The nav's hamburger/toggle needs `aria-label`, `aria-expanded`, and `aria-controls`; active nav links use `aria-current`.
- Content must render in JSX unconditionally — don't gate real content behind a post-mount `useEffect`/state flag that would leave the page blank before hydration.
- Every animation or transform (CSS or JS-driven) must respect `prefers-reduced-motion`, both in the hook (via `matchMedia`) and as a CSS fallback.

## Placeholder content

Personal content (name, bio, employers, project details, testimonials, education, contact info, images) must stay wrapped as `[PLACEHOLDER: description]` until the real site owner fills it in. Don't invent specific biographical details when adding new content-bearing components — use the same bracketed convention.

## No secrets, no environment-specific values

Never hardcode API keys, tokens, or environment-specific URLs/ports in source. If new code needs a runtime value, read it from `import.meta.env.VITE_*` and document the variable name (not its value) in `.env.example`. `.gitignore` already excludes `.env`/`.env.*` while keeping `.env.example` tracked — keep it that way.
