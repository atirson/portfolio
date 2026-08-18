---
name: audit-performance
description: Frontend performance audit for the portfolio repo — images, fonts, third-party scripts, bundle boundaries. Use when asked to review or improve performance. Prioritizes high-impact issues, no premature optimization.
allowed-tools: Read, Grep, Glob, Bash
---

# Skill: Audit Performance

## Description

Repeatable performance checklist scoped to this repo's actual patterns. Prioritize high-impact improvements; do not chase micro-optimizations.

## When to Use

- User asks for a performance review.
- `portfolio-reviewer` needs the performance section of a broader review.
- After adding images, fonts, or third-party scripts.

## Procedure

Check, in priority order:

1. **Images**: `next/image` is used in `homeClient.tsx` and `app/linktree/page.tsx` (automatic optimization, sizing) — but `app/ravyla-atirson/page.tsx` uses raw `<img>` tags for the logo and couple-photo carousel, with no `next/image` optimization, explicit sizing, or `loading` control. Flag this as the highest-impact fix on that page.
2. **Fonts**: `app/ravyla-atirson/page.tsx` loads Google Fonts via a CSS `@import` inside `<style jsx global>` in a client component — this is render-blocking and bypasses Next's font optimization. Recommend `next/font` instead.
3. **Third-party stylesheets in the wrong place**: the FontAwesome CDN `<link rel="stylesheet">` in `app/ravyla-atirson/page.tsx` is emitted at the very end of the JSX body, not in `<head>` — this delays icon rendering and is technically invalid placement. Flag it.
4. **Third-party scripts**: GA4 is bootstrapped independently in both `app/[locale]/layout.tsx` and `app/linktree/layout.tsx` via `next/script strategy="afterInteractive"` — confirm the strategy is still appropriate and that there's no duplicate double-loading if a user could ever traverse from one layout to the other.
5. **Iframe loading**: the Google Maps embed already uses `loading="lazy"` — confirm this remains true after edits.
6. **Bundle boundaries**: dependencies like `feature-flow-js`, `react-qr-code`, `graphql`/`graphql-request` should only ship on the routes that need them (`linktree` for feature flags, `ravyla-atirson` for QR codes, `[locale]` for GraphQL). Spot-check imports aren't leaking a heavy dependency into a route that doesn't use it.
7. **Autoplay audio**: the wedding page's background-music autoplay is a UX/perf/battery consideration on mobile — note it, but this is a product decision, not automatically a bug.

## Validation

Every finding should name the specific mechanism (unoptimized image, render-blocking font, misplaced stylesheet, etc.), not a generic "could be faster."

## Output Format

Findings ordered by impact (Images → Fonts → Blocking resources → Third-party scripts → Bundle → other), each with file/line and a concrete fix direction.

## Definition of Done

- All seven checklist items above were checked against current code.
- No speculative performance claims (e.g. specific Lighthouse/Core Web Vitals numbers) without actually measuring them.
