---
name: audit-accessibility
description: WCAG-aligned accessibility audit for the portfolio, linktree, and wedding pages — semantic HTML, keyboard nav, focus, contrast, ARIA, motion, forms. Use when asked to review or improve accessibility.
allowed-tools: Read, Grep, Glob
---

# Skill: Audit Accessibility

## Description

Repeatable accessibility checklist scoped to this repo's actual components. Prioritize WCAG-aligned improvements; do not add ARIA where semantic HTML already solves the problem.

## When to Use

- User asks for an accessibility review.
- `portfolio-reviewer` needs the a11y section of a broader review.
- After UI changes to `app/[locale]/homeClient.tsx`, `app/linktree/page.tsx`, or `app/ravyla-atirson/page.tsx`.

## Procedure

Check, with concrete file targets:

- **Semantic structure & heading order**: `homeClient.tsx` and `app/ravyla-atirson/page.tsx` (the wedding page has many `<section>`s with `<h2>`s under CSS-driven fade-ins — confirm heading levels are sequential, not skipped).
- **Keyboard navigation**: mobile menu toggles (both `linktree` and wedding page have custom hamburger menus), carousel prev/next/dot controls in both `homeClient.tsx` (hero image rotation) and `app/ravyla-atirson/page.tsx` (couple-photo carousel) — confirm all are reachable and operable via keyboard, not just `onClick`.
- **Focus states**: custom buttons/links across all three surfaces use Tailwind hover states — confirm visible `:focus-visible` styling exists too, not just `:hover`.
- **ARIA**: verify existing `aria-label`s (e.g. on carousel/menu buttons) are present everywhere the icon-only pattern repeats, and that no ARIA role duplicates what a native element (`<button>`, `<nav>`, `<a>`) already provides.
- **Color contrast**: custom hex palettes — `CONFIG.COLORS` in `app/ravyla-atirson/page.tsx`, and the orange/black scheme in `app/linktree/page.tsx` — spot-check text-on-background pairs against WCAG AA (4.5:1 body text, 3:1 large text).
- **Images**: `next/image` usage (with `alt`) in `homeClient.tsx`/`linktree` vs raw `<img>` tags in `app/ravyla-atirson/page.tsx` — confirm every image has meaningful `alt` text (not just the filename).
- **Iframe accessibility**: the Google Maps embed in `app/ravyla-atirson/page.tsx` (`CONFIG.VENUE.mapsEmbed`) — confirm it has a `title` attribute.
- **Motion & autoplay**: the wedding page autoplays background music and runs continuous CSS animations (`float`, `pulse`) unconditionally — check whether `prefers-reduced-motion` is respected for the animations, and confirm the audio autoplay has an accessible, discoverable stop control (the floating music toggle button already exists — verify it's keyboard-reachable and labeled).
- **Forms**: `ContactForm.tsx` — confirm every `<label>` is programmatically associated with its input (`htmlFor`/`id`), not just visually adjacent.
- **Responsive behavior**: spot-check that touch targets remain usable at mobile widths across all three surfaces.

## Validation

Findings must cite the specific component and, where possible, line number. "Looks fine" without checking the specific pattern above is not a valid audit.

## Output Format

Actionable findings with file/line references, one per issue, tagged by WCAG-relevant category (structure, keyboard, contrast, ARIA, motion, forms).

## Definition of Done

- All checklist items above were checked against the actual current code, not skipped.
- No ARIA was recommended where fixing the underlying semantic HTML is the correct fix instead.
