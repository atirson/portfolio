---
name: validate-portfolio
description: Run the full build/lint/typecheck/asset validation pass for this Next.js portfolio repo. Use before considering any change done, before a release, or when asked to "validate" or "make sure everything still works." There is no test suite — this skill does not pretend one exists.
allowed-tools: Read, Grep, Glob, Bash
---

# Skill: Validate Portfolio

## Description

Repeatable procedure to confirm the app builds, lints, typechecks, and that referenced assets/env vars actually exist. This repo (Next.js 16, React 19, TypeScript strict, Tailwind 4, Biome + ESLint) has **no test suite**, so "Tests" is always reported as N/A here rather than skipped silently.

## When to Use

- Before reporting any implementation task as complete.
- Before a release (paired with `release-checklist`).
- When the user asks "does this still work" / "validate the portfolio."

## Procedure

1. **Lint**: `npm run lint`
2. **Typecheck**: `npx tsc --noEmit`
3. **Build**: `npm run build` — this exercises all three route groups (`app/[locale]` with `generateStaticParams` for en/pt, `app/linktree`, `app/ravyla-atirson`), `app/api/contact/route.ts`, `app/sitemap.ts`, and `app/robots.ts` in one pass.
4. **Routes**: confirm the build output includes `/`, `/en`, `/pt`, `/linktree`, `/ravyla-atirson`, `/api/contact`, `/sitemap.xml`, `/robots.txt`.
5. **Assets**: grep the codebase for `/`-rooted string literals pointing at `public/` (e.g. `"/atirson.jpg"`, `"/casamento.mp3"`, `"/logo.png"`) and cross-check each against `ls public/`. Flag any reference with no matching file.
6. **Env vars**: `app/lib/hygraph.ts` throws at request time via `getRequiredEnv()` if `NEXT_PUBLIC_HYGRAPH_ENDPOINT` is unset. Confirm `.env.example` still documents every variable actually read via `process.env` across `app/`.
7. **Deployment config**: confirm `next.config.ts`'s `transpilePackages: ['feature-flow-js']` still matches an actual dependency in `package.json`.

## Validation

Each step above either passes or fails with a concrete error message — don't summarize a failure as "mostly fine." A missing asset or undocumented env var is a real finding, not noise.

## Output Format

```
Portfolio Validation: [PASSED / FAILED]

Build:
Tests: N/A (no test suite present in this repo)
Lint:
Typecheck:
Routes:
Assets:
Deployment:

Issues:
- ...

Recommendation:
- ...
```

## Definition of Done

- All six checks above were actually run (or explicitly explained why one couldn't be, e.g. missing env var blocking build) — not assumed.
- Any asset/env drift is named with the specific file and missing reference.
