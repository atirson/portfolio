---
name: audit-seo
description: Validate metadata, canonical URLs, Open Graph, structured data, sitemap, robots, and heading hierarchy for the portfolio surface. Use when asked to review or improve SEO. Backs the portfolio-seo agent.
allowed-tools: Read, Grep, Glob, WebFetch
---

# Skill: Audit SEO

## Description

Repeatable SEO checklist scoped to `app/[locale]/*`'s actual metadata sources. No keyword stuffing, no unverifiable ranking claims — this checks correctness and best-practice adherence, not search performance.

## When to Use

- User asks for an SEO review.
- `portfolio-reviewer` or `portfolio-seo` needs the repeatable procedure.
- After editing `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `app/sitemap.ts`, or `app/robots.ts`.

## Procedure

1. **Canonical/base-URL consistency**: `app/lib/site.ts` (`getSiteUrl()` → `https://www.atirson.com`) vs hardcoded base URLs in `app/sitemap.ts` and `app/[locale]/layout.tsx`'s `generateMetadata` (`https://atirson.com`, no `www`). These must agree on protocol, `www` vs bare domain, and trailing slash — a mismatch actively hurts canonicalization.
2. **Metadata source conflicts**: `app/[locale]/page.tsx` imports `next/head` and renders a `<Head>` block inside a Server Component — the App Router does not apply `next/head` metadata; determine whether this is dead code, or worse, whether it's masking a metadata gap that `generateMetadata` alone doesn't cover (canonical/og tags are already set in the layout's `generateMetadata`, so check for exact duplication vs actual divergence).
3. **OG/Twitter images**: metadata references `/og-image.png` and `/preview.jpg` — verify each resolves to a real file under `public/` or a Next.js special metadata file convention under `app/` (`ls public/ app/`). A referenced-but-missing OG image silently breaks social share previews.
4. **hreflang/alternates**: `alternates.languages` in `generateMetadata` covers `pt-BR`, `en-US`, `x-default` — confirm the URLs match the actual locale routes (`/pt`, `/en`).
5. **Structured data**: the `Person` JSON-LD block in `app/[locale]/page.tsx` — confirm required fields (`name`, `url`, `sameAs`) are present and `sameAs` URLs are valid/reachable.
6. **Sitemap/robots**: `app/sitemap.ts` entries vs actual indexable routes; `app/robots.ts` rules — confirm `linktree` and `ravyla-atirson` remain intentionally excluded unless the user wants otherwise.
7. **Heading hierarchy & semantic HTML**: spot-check rendered portfolio pages for a single `<h1>` and sequential heading levels.

## Validation

Every finding must be traceable to a specific mismatch or missing resource — not a generic "add more metadata."

## Output Format

```
SEO Audit: [PASSED / FAILED]

Critical:
High:
Medium:
Low:

Recommendation:
- ...
```

## Definition of Done

- Canonical URL consistency was explicitly checked across all three sources (`site.ts`, `sitemap.ts`, `layout.tsx`), not assumed correct.
- OG/preview image references were verified against actual files, not just read as strings.
