# Security Review

**Project:** portfolio-site (React 18 + Vite)
**Date:** 2026-08-11 (updated — re-reviewed after real content was filled in and the Skills chip-overflow CSS fix)
**Scope:** Full repo audit — hardcoded secrets/API keys/tokens, `dangerouslySetInnerHTML` usage, environment-specific hardcoded values, `.gitignore` coverage, `.env.example` contents. This pass additionally diffed every uncommitted change (`About`, `Contact`, `Education`, `Experience`, `Footer`, `Hero`, `Nav`, `Projects`, `Skills`, `Testimonials`, `index.html`, `src/styles/skills.css`, `package-lock.json`) against `origin/main`.

## Result: PASS — no issues found, no code changes required

Every item in scope was checked against the full source tree (`src/`, `public/`, `index.html`, `vite.config.js`, `package.json`, `.gitignore`, `.env.example`) and came back clean. Nothing needed to be fixed.

**What changed since the last review:** the site's placeholder content (`[PLACEHOLDER: ...]`) has been replaced throughout with the real site owner's bio, employer history, testimonials, and contact info (email + LinkedIn URL), and `src/styles/skills.css` was fixed to stop long skill-chip labels from overflowing their card (`white-space: nowrap` removed, `max-width: 100%` added — layout-only, no security surface). All of it is plain static JSX text/attributes; none of it introduces new dynamic behavior. `package-lock.json`'s churn is a routine `npm install` refresh — every `resolved` entry still points at `registry.npmjs.org`, no third-party or non-registry sources were introduced.

## Checks performed

### 1. Hardcoded secrets, API keys, or tokens
Searched all source, config, and markup files for key/secret/token/password/bearer/authorization patterns and common provider key formats (AWS `AKIA...`, OpenAI-style `sk-...`, GitHub `ghp_...`, etc.).

- **No matches.** The only hits were incidental substring matches (`variables.css` doc comment referencing "design tokens", `reset.css` comment about "long tokens (urls, emails)") — not credentials.
- No `process.env` or `import.meta.env` reads anywhere in `src/`, so there's no code path that could leak a build-time secret into the client bundle even if one were later added carelessly.

### 2. `dangerouslySetInnerHTML`
Searched every `.jsx`/`.js`/`.html` file.

- **No occurrences.** All dynamic content (project names, testimonial quotes, nav labels, experience bullets, etc.) is rendered as plain JSX text/children, which React escapes by default. No `innerHTML`, `document.write`, `eval`, or `new Function` usage either.

### 3. Environment-specific hardcoded values
Checked for hardcoded URLs, ports, localhost references, emails, phone numbers, or deployment-specific values.

- **None found that shouldn't be there.** `Contact.jsx`'s email (`wal10.aaron@gmail.com`) and LinkedIn URL are the site owner's real, intentionally-public contact details — expected content for a portfolio's Contact section, not an environment-specific value or leak. The project's image `src`, OG/Twitter meta image/URL, and the Education certification entry remain `[PLACEHOLDER: ...]` pending real values.
- `vite.config.js` is a bare `defineConfig({ plugins: [react()] })` — no hardcoded host/port/proxy target.
- `Projects.jsx`'s "Ask me about this" links now point to the in-page `#contact` anchor (previously external placeholder repo/live URLs), so `target="_blank"`/`rel="noopener noreferrer"` were correctly dropped along with them — no tabnabbing surface since there's no longer an external link there. `Contact.jsx`'s LinkedIn link is external and still carries `target="_blank" rel="noopener noreferrer"`; the `mailto:` link correctly omits both since they don't apply.
- No `fetch`, `XMLHttpRequest`, or `axios` calls exist anywhere, so there's no hardcoded API endpoint to flag.
- No `localStorage`/`sessionStorage` usage.

### 4. `.gitignore` coverage
```
node_modules
dist
dist-ssr
*.local
.env
.env.*
!.env.example
.DS_Store
*.log
npm-debug.log*
```
- `node_modules/` — covered.
- `dist/` — covered.
- `.DS_Store` — covered.
- `.env` — covered.
- `.env.local` — covered by the `.env.*` glob (matches `.env.local`, `.env.production`, etc.), with `.env.example` correctly re-included via the negation pattern so the template itself stays tracked.
- No changes needed.

### 5. `.env.example` contents
File exists at project root and contains only a comment block explaining that no environment variables are currently required, plus one commented-out illustrative line using the project's `[PLACEHOLDER: ...]` convention (`# VITE_EXAMPLE_KEY=[PLACEHOLDER: description of what this value is]`). No real values, no live keys, nothing to redact.

## Fixes applied
None — no findings triggered a code change. The `skills.css` overflow fix reviewed alongside this content update is layout-only (`white-space`/`max-width`), no security implication.

## Recommendations (non-blocking)
- When the remaining placeholders (portrait photo, OG/Twitter share image, Education certification entry) get real values, keep following the existing `[PLACEHOLDER: ...]` → real-value swap pattern used everywhere else.
- If a contact form or analytics integration is added later, wire its endpoint/key through `import.meta.env.VITE_*` and document the variable name (not a real value) in `.env.example`, consistent with the existing placeholder pattern.
- Any future external link (`target="_blank"`) should keep pairing it with `rel="noopener noreferrer"`, as `Contact.jsx`'s LinkedIn link already does.
