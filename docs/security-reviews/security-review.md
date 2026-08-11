# Security Review

**Project:** portfolio-site (React 18 + Vite)
**Date:** 2026-08-11
**Scope:** Full repo audit — hardcoded secrets/API keys/tokens, `dangerouslySetInnerHTML` usage, environment-specific hardcoded values, `.gitignore` coverage, `.env.example` contents.

## Result: PASS — no issues found, no code changes required

Every item in scope was checked against the full source tree (`src/`, `public/`, `index.html`, `vite.config.js`, `package.json`, `.gitignore`, `.env.example`) and came back clean. Nothing needed to be fixed.

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

- **None found.** Every piece of contact/social/project/image data (email, GitHub, LinkedIn, project links, image `src`, OG/Twitter meta URLs) is a literal `[PLACEHOLDER: ...]` string per the project's placeholder convention, not a real or environment-specific value.
- `vite.config.js` is a bare `defineConfig({ plugins: [react()] })` — no hardcoded host/port/proxy target.
- All external links that use `target="_blank"` (`Projects.jsx`, `Contact.jsx` for GitHub/LinkedIn) already carry `rel="noopener noreferrer"`, preventing reverse-tabnabbing; the `mailto:` link correctly omits `target`/`rel` since they don't apply.
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
None — no findings triggered a code change.

## Recommendations (non-blocking)
- When the real Contact/Projects data replaces the placeholders, keep using `rel="noopener noreferrer"` on any new `target="_blank"` links (the existing components already model this correctly).
- If a contact form or analytics integration is added later, wire its endpoint/key through `import.meta.env.VITE_*` and document the variable name (not a real value) in `.env.example`, consistent with the existing placeholder pattern.
