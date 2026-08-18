---
name: verify-links
description: Check internal routes, external social/profile links, project/demo links, and OG/preview image references across the portfolio, linktree, and wedding pages for reachability and consistency. Use when asked to check for broken links or before a release.
allowed-tools: Read, Grep, Glob, WebFetch, Bash
---

# Skill: Verify Links

## Description

Enumerates and checks every link surface in this repo. Never silently remove a link because it's unreachable — flag it and let the user decide (a link can be intentionally temporary, e.g. a seasonal gift-list URL).

## When to Use

- User asks to check for broken links.
- Before a release, as part of `release-checklist`.
- After editing `app/linktree/page.tsx`, `app/ravyla-atirson/page.tsx`, or any metadata file.

## Procedure

Check these concrete sources in this repo:

- **Internal routes**: `/`, `/pt`, `/en`, `/linktree`, `/ravyla-atirson`, `/sitemap.xml`, `/robots.txt`.
- **Social/profile links** (`app/linktree/page.tsx` `LINKTREE_CONFIG`, and the JSON-LD `sameAs` array in `app/[locale]/page.tsx`): GitHub, LinkedIn, YouTube, X/Twitter, `mailto:` address — confirm both lists agree with each other.
- **Project/demo links**: sourced live from Hygraph (`githubUrl` per project via `usePortfolioDetails.ts`) — these can't be enumerated statically from the repo; if the user has Hygraph access or a data export, check those; otherwise note that live verification requires CMS credentials this agent doesn't have.
- **Wedding page links** (`app/ravyla-atirson/page.tsx` `CONFIG`): `GIFTS.giftListUrl`, `GIFTS.pixKeyURL`, `VENUE.mapsLink`, `VENUE.mapsEmbed`.
- **OG/preview image references**: metadata references `/og-image.png` and `/preview.jpg` — confirm each resolves to an actual file under `public/` or a Next.js special metadata file under `app/` (`ls public/ app/` and grep for the literal string).
- **Contact form target**: `app/api/contact/route.ts` posts to `https://ntfy.sh/atirson-portfolio` — confirm the endpoint is still reachable (`WebFetch` a HEAD/GET) and note that this is a public, guessable topic name (informational, not necessarily a bug).

## Validation

For each link, classify:

```
[CRITICAL] Broken important link
[HIGH] Broken project/demo link
[MEDIUM] Potentially outdated link
[LOW] Minor issue
```

## Output Format

List every checked link with its status and severity if broken. Group by source (internal / social / project / wedding / images).

## Definition of Done

- Every link source listed above was actually checked (fetched or file-existence-checked), not assumed valid.
- No link was removed — only flagged.
