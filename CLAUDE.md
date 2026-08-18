# Portfolio Development Guide

## Project Overview

Atirson Fabiano's personal site: a Next.js 16 (App Router) app that bundles **three independent surfaces** in one deployment:

1. `app/[locale]/*` — the professional portfolio (en/pt), the primary product. Static copy lives in `locales/en.json` / `locales/pt.json`; dynamic content (projects, skills, resume links) is fetched from a **Hygraph** GraphQL CMS via `app/lib/hygraph.ts` and `app/services/usePortfolioDetails.ts`.
2. `app/linktree/*` — a link-in-bio microsite with its own layout, GA bootstrap, and a `feature-flow-js` feature-flag integration: local flags in `app/lib/flag.config.ts`, "remote" flags served by `app/api/feature-flags/route.ts` (backed by `app/lib/remote-flags.ts`) — a real Next.js Route Handler that deploys with the rest of the app on Vercel, not a separate process.
3. `app/ravyla-atirson/*` — a personal wedding-invitation page. Real app code, deserving engineering scrutiny, but **not** professional-portfolio content.

Stack: Next.js 16, React 19, TypeScript 5 (strict), Tailwind CSS 4, GraphQL via `graphql-request`, GA4 analytics, Biome + ESLint 9. **No test suite. No CI/CD pipeline** (`.github/` only holds README screenshots).

## Architecture

- Routing: App Router, `app/[locale]` uses `generateStaticParams` for `en`/`pt`; root `app/page.tsx` redirects to `/pt`.
- Data: local JSON for static copy, Hygraph GraphQL for projects/skills/resume. `app/lib/hygraph.ts` throws at request time if `NEXT_PUBLIC_HYGRAPH_ENDPOINT` is unset.
- SEO: per-locale `generateMetadata` in `app/[locale]/layout.tsx`, `Person` JSON-LD in `app/[locale]/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, base URL nominally centralized in `app/lib/site.ts` (verify it's actually consistent — see `portfolio-seo`).
- Analytics: GA4 (`app/lib/gtag.ts`, `app/hooks/useAnalytics.ts`), bootstrapped independently per layout (portfolio and linktree each load their own GA script).
- Feature flags: `feature-flow-js`, used on the linktree route. Local flags live in `app/lib/flag.config.ts`; "remote" flags are served by `app/api/feature-flags/route.ts` (data in `app/lib/remote-flags.ts`), called directly from `app/linktree/layout.tsx` — no separate server process, works the same in dev and on Vercel.
- Deployment: `npm run build && npm run start` (Vercel/Netlify per README). No versioning scheme beyond `package.json`'s `version` field.

## Development Rules

- Preserve the existing stack, routing, styling approach (Tailwind utilities; the wedding page also uses an inline `CONFIG` object), and content sourcing (local JSON vs Hygraph) — don't introduce a new framework or data layer.
- Treat the three route groups as independent: don't let portfolio-only concerns (career narrative, SEO polish) bleed into the wedding page, and don't let wedding-page patterns bleed into the portfolio.
- Never invent career facts (employers, titles, metrics, clients, certifications) — flag missing info instead.
- Both `package-lock.json` and `yarn.lock` are committed; if you change dependencies, confirm with the user which is authoritative rather than silently picking one.
- `.env` is gitignored and must never be committed or echoed into chat.

## Agents

| Agent | Purpose | Read/Write |
|---|---|---|
| `portfolio-architect` | Structure, dependency, and technical-debt review | Read-only |
| `portfolio-developer` | Implements approved changes; runs lint/typecheck/build | Write |
| `portfolio-reviewer` | Strict review: bugs, regressions, links, a11y, perf, security, SEO, UX | Read-only |
| `portfolio-content` | Career-narrative copy (`locales/*.json`) and project case studies | Write (locales only) |
| `portfolio-seo` | Metadata/canonical/OG/structured-data audit for the portfolio surface | Read-only |
| `portfolio-release` | Pre-release checklist (secrets, feature flags, build) — no CI exists, this is the substitute | Read-only |

`portfolio-project` and dedicated `portfolio-performance`/`portfolio-accessibility` agents from the original brief were folded in rather than created as separate personas: project case studies are the same career-narrative concern as `portfolio-content`, and performance/accessibility are already review priorities of `portfolio-reviewer`, backed by dedicated skills below — a separate persona for each would duplicate the reviewer without adding distinct judgment.

## Skills

Repeatable procedures agents reference instead of re-deriving checklists inline:

- `validate-portfolio` — lint, typecheck, build, asset/env existence (no test suite, so "Tests: N/A" always).
- `verify-links` — internal routes, social links, project/demo links, wedding-page links, OG image references.
- `verify-documentation` — README claims vs actual stack/scripts/structure.
- `audit-accessibility` — WCAG-aligned checklist scoped to this repo's components.
- `audit-performance` — images, fonts, third-party scripts, bundle boundaries.
- `audit-seo` — canonical URL consistency, metadata source conflicts, structured data, sitemap/robots.
- `generate-project-case-study` — Problem → Solution → Approach → Impact draft for a project.
- `generate-changelog` — categorized summary of a commit range for release notes/announcements.
- `release-checklist` — secrets, feature-flag hygiene, build validation before deploy.

## Recommended Workflow

```
portfolio-architect (understand/plan)
        ↓
portfolio-developer (implement)
        ↓
portfolio-reviewer (review — uses audit-accessibility / audit-performance / verify-links skills)
        ↓
portfolio-seo (if metadata/SEO surface touched)
        ↓
portfolio-content (if copy/case-study touched)
        ↓
portfolio-release (release-checklist before shipping)
```

Not every change needs the full chain — a copy fix only needs `portfolio-content`; a metadata fix only needs `portfolio-seo` + `portfolio-reviewer`.

## Validation

Run `validate-portfolio` (lint + `tsc --noEmit` + build + asset/env checks) before considering any change complete. There is no test suite in this repo — don't claim tests passed.

## Git Rules

- Never commit `.env` or any credential.
- Create new commits rather than amending, unless explicitly asked.
- Don't push, deploy, or open PRs unless explicitly asked.
- If dependencies change, keep `package-lock.json` and `yarn.lock` in sync (or ask the user which to drop).

## Release Rules

- No CI/CD pipeline exists — `release-checklist` is the manual gate. Don't assume automated checks ran.
- Never deploy directly unless explicitly requested.
- A stray `.env`, an expired/malformed feature flag (`app/lib/flag.config.ts`), or a failing build/lint/typecheck is a release blocker.
