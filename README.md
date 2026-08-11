# Portfolio Site

A single-page personal portfolio built with **React 18 + Vite**. It was produced by a multi-agent Claude Code pipeline: an Architect agent, a Requirements agent, three Foundation agents, four Content agents, an Integration agent, a Polish/SEO agent, a Code Review agent, a Security Review agent, and this Summary agent. Every piece of personal content (name, bio, work history, projects, testimonials, education, contact links, images) is a bracketed `[PLACEHOLDER: ...]` string — this repo is a **scaffold**, not a finished site. See [Before you publish](#before-you-publish) below.

Dark themed, no UI framework, no CSS-in-JS: plain CSS driven entirely by custom-property design tokens.

## Tech stack

- **React 18** — functional components only, no class components
- **Vite 5** — dev server + build
- Plain **CSS** with custom-property design tokens (background `#14161a`, surface `#1c1f26`, accent `#3fa9f5`) — no Tailwind, no styled-components/emotion, no component library
- System font stack (`-apple-system`, `'Inter'`, etc.) — no external Google Fonts request, fully self-contained
- npm for package management

## Getting started

```bash
npm install
npm run dev       # start the Vite dev server
npm run build      # production build to dist/
npm run preview    # locally preview the production build
```

## Project structure

```
index.html                 Vite entry point (#root + src/main.jsx)
public/
  favicon.svg               theme-colored favicon
  404.html                  static (non-React) 404 page, styled to match the site, links back to "/"
src/
  main.jsx                  mounts <App /> into #root, imports styles/index.css (the one global stylesheet)
  App.jsx                   top-level layout: ScrollProgress, Nav, all sections in order, Footer
  styles/
    variables.css            design tokens (colors, spacing, type scale, radii, durations/easings, z-index)
    reset.css, typography.css, layout.css, nav.css, animations.css, responsive.css   shared/global styles
    hero.css, about.css, skills.css, experience.css, projects.css,
    testimonials.css, education.css, contact.css, footer.css                         colocated, one per component
  hooks/
    useScrollSpy.js          tracks which section is active via IntersectionObserver (drives Nav highlighting)
    useScrollProgress.js     returns 0–100 scroll percentage (drives ScrollProgress bar)
    useScrollReveal.js       ref + boolean "visible" for fade/slide-in via IntersectionObserver
    useParallax.js           mousemove-based transform values for the Hero
    useTilt.js                mousemove-based 3D tilt transform for project cards
    (useScrollReveal, useParallax, and useTilt all check prefers-reduced-motion before doing
    any animated work; useTilt also skips touch/coarse-pointer devices)
  components/
    Nav.jsx, ScrollProgress.jsx, Hero.jsx, Footer.jsx        chrome (not numbered sections)
    About.jsx (01), Skills.jsx (02), Experience.jsx (03), Projects.jsx (04),
    Testimonials.jsx (05), Education.jsx (06), Contact.jsx (07)
    — each is wrapped in a numbered <section id="..."> matching Nav's anchor links
      and useScrollSpy's targets, and each imports its own CSS file directly
      (e.g. Hero.jsx does `import '../styles/hero.css'`)
docs/
  project-plan.md, backlog/, reviews/, security-reviews/     process artifacts from the build pipeline
```

All content renders unconditionally in JSX (nothing is gated behind post-hydration state), so the page has meaningful content even before React hydrates. The site is responsive from 320px through 1440px+ and targets basic accessibility out of the box: semantic HTML, alt-text placeholders, `aria-label`/`aria-expanded`/`aria-controls` on the nav and hamburger button, and `prefers-reduced-motion` support everywhere an animation or transform hook is used.

## Review history

Findings from the build pipeline's Code Review and Security Review agents, including follow-up passes as the project evolves, live in `docs/reviews/` and `docs/security-reviews/` — treat those as the up-to-date record of what's implemented versus what's still a placeholder.

## Before you publish

This scaffold is not ready to deploy as-is. Do this first:

1. **Find every placeholder.** From the project root:
   ```bash
   grep -rn "PLACEHOLDER" src public index.html
   ```
   Replace each `[PLACEHOLDER: ...]` with real content. That includes, at minimum:
   - Your name, title, and bio (Hero, About)
   - Work history and employers (Experience)
   - Project details, links, and screenshots (Projects)
   - Testimonials (Testimonials)
   - Education (Education)
   - Contact links — email, GitHub, LinkedIn, etc. (Contact)
   - Headshot and project images (replace placeholder `<img>` sources and alt text)
   - `<title>`, meta description, and Open Graph/Twitter tags in `index.html`
   - The favicon in `public/favicon.svg` if you want a custom mark

2. **Verify the build locally**, since the automated pipeline couldn't confirm `npm run build` end-to-end:
   ```bash
   npm install
   npm run build
   npm run preview
   ```
   Check the console/network tab for missing image assets once you've swapped in real placeholder images.

3. **Deploy.** A couple of straightforward options:
   - **GitHub Pages**: run `npm run build`, then publish the contents of `dist/` (e.g. via the `gh-pages` package, or a GitHub Actions workflow that builds and pushes `dist/` to the `gh-pages` branch). If the site isn't served from the domain root, set Vite's `base` option in `vite.config.js` to match your repo path.
   - **Netlify / Vercel**: connect the repo and set build command `npm run build`, publish directory `dist`. Both platforms auto-detect Vite.

4. **Double-check `.env`** — copy `.env.example` to `.env` only if you actually wire up something that needs a variable (e.g. a contact-form endpoint or analytics key). Never commit the real `.env` file; `.gitignore` already excludes it.
