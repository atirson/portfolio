---
name: verify-documentation
description: Check that README.md and other docs match actual repo state (stack, scripts, structure). Use after structural changes, or when asked to review/update documentation. Never document nonexistent functionality.
allowed-tools: Read, Grep, Glob, Bash
---

# Skill: Verify Documentation

## Description

Compares documented claims against the actual repository. This repo's `README.md` is currently known to have some drift — this skill exists to catch that class of issue repeatably, not to fix it silently.

## When to Use

- After adding/removing a route, script, or dependency.
- When asked to review or refresh the README.
- As part of a broader architecture or release review.

## Procedure

1. **Tech stack table** in `README.md` vs `package.json` `dependencies`/`devDependencies` — confirm every listed technology is actually present, and flag any major dependency in `package.json` that's missing from the README (e.g. `feature-flow-js`, `react-qr-code`, `next-i18next` alongside `next-intl`).
2. **Scripts table** in `README.md` vs `package.json` `scripts` — must match exactly.
3. **"Project Structure (Simplified)" tree** in `README.md` vs the actual `app/` tree (`find app -type f`). As of this skill's authoring, the README tree omits `app/linktree`, `app/ravyla-atirson`, `app/lib/flag.config.ts`, `app/lib/site.ts`, `app/robots.ts`, and `app/sitemap.ts` — re-check on each run rather than assuming this is still the exact gap.
4. **Package manager guidance**: README shows pnpm/yarn/npm as interchangeable, but both `package-lock.json` and `yarn.lock` are committed — flag this ambiguity rather than picking one silently.
5. **Deployment section** vs actual deployment reality (env vars required, any platform-specific config).

## Validation

Every claim in the README must be traceable to a real file, script, or dependency. A documented feature with no corresponding code is a finding, not something to leave alone.

## Output Format

```
Documentation Check: [IN SYNC / DRIFTED]

Drift found:
- README claims X, repo actually has Y (file:line)

Recommendation:
- ...
```

## Definition of Done

- README's stack table, scripts table, structure tree, and deployment section have each been cross-checked against the live repo.
- No nonexistent functionality is left documented as if it existed.
