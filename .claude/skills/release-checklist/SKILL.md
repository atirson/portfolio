---
name: release-checklist
description: Manual pre-release checklist for the portfolio repo — secrets, feature flags, build validation. This repo has no CI/CD, so this is the substitute. Backs the portfolio-release agent. Use before deploying.
allowed-tools: Read, Grep, Glob, Bash
---

# Skill: Release Checklist

## Description

This repo has no GitHub Actions workflow (`.github/` only holds README screenshots) and no formal versioning process. This checklist is the manual equivalent of a release gate, run by `portfolio-release` (or ad hoc) before shipping.

## When to Use

- Before deploying/publishing changes.
- When asked "is this ready to release."

## Procedure

Validate this flow, top to bottom:

```
Code
  ↓
Lint / Typecheck / Build
  ↓
Review (portfolio-reviewer)
  ↓
Release readiness (this checklist)
  ↓
Deployment (manual — build + start, per README)
```

1. **Secrets**: `git status` and `git ls-files | grep -i env` — confirm no `.env*` file is staged or tracked (`.gitignore` already excludes `.env*`; verify nothing overrides that).
2. **Env var completeness**: `.env.example` (`NEXT_PUBLIC_HYGRAPH_ENDPOINT`, `NEXT_HYGRAPH_TOKEN`) vs every `process.env` read in `app/` (primarily `app/lib/hygraph.ts`'s `getRequiredEnv()`).
3. **Feature-flag hygiene**: read `app/lib/flag.config.ts`. Flag any entry where `expiredAt` is before today, or where `expiredAt` is before its own `createdAt` (a real bug class already present in this file). Flag any `rolloutRule` that gates on `role === 'admin'` or similar — confirm that's intentional for the current release.
4. **Feature-flag data source**: `app/api/feature-flags/route.ts` / `app/lib/remote-flags.ts` deploy with the rest of the app on Vercel — no separate process required. Confirm `app/linktree/layout.tsx`'s call to `getRemoteFeatureFlags()` still fails closed (catches and returns `null`) if it ever throws.
5. **Build validation**: `npm run lint`, `npx tsc --noEmit`, `npm run build` — all must pass.
6. **No assumed CI**: don't report "CI passed" — there is none. This checklist is the substitute until the user explicitly asks to add one.

## Validation

Every step must be actually run/checked, not assumed. A "READY" verdict requires all six steps to have passed.

## Output Format

```
Release Readiness: [READY / NOT READY]

Secrets: PASS/FAIL
Env vars: PASS/FAIL
Feature flags: PASS/FAIL — details
Dev-only infra: PASS/FAIL
Lint/Typecheck/Build: PASS/FAIL

Blockers:
- ...
```

## Definition of Done

- All six checklist steps were run against the current working tree.
- No deployment action was taken — this skill reports readiness only.
