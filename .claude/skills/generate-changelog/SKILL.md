---
name: generate-changelog
description: Summarize a set of commits/diffs into Added/Changed/Fixed/Deprecated/Breaking categories for release notes or update announcements. Use when asked to summarize recent changes. This repo has no CHANGELOG.md today — ask where the output should go rather than assuming.
allowed-tools: Read, Bash
---

# Skill: Generate Changelog

## Description

This repo has no `CHANGELOG.md` and no semantic-release process — commit history (`git log`) is the record today, and the maintainer has historically announced portfolio updates directly (e.g. LinkedIn posts about new sections). This skill produces a categorized summary for whichever of those destinations the user actually wants, rather than assuming a changelog file should exist.

## When to Use

- User asks to summarize recent changes, prep release notes, or draft an update announcement.

## Procedure

1. Determine the range to summarize (`git log <range> --oneline`, or a diff the user points to).
2. Read the actual diffs for that range — don't rely on commit messages alone, since they may not capture user-visible impact.
3. Classify each meaningful change as:
   - Added
   - Changed
   - Fixed
   - Deprecated
   - Breaking
4. **Ignore**: formatting-only changes, internal refactors with no behavior change, comment-only edits, and (since there's no test suite) any test-only changes.
5. Focus on user-visible impact — what a visitor or the maintainer would actually notice, not implementation detail.
6. Ask the user where this should go: appended to a new/existing `CHANGELOG.md`, a PR description, or just returned as chat text for a social post. Don't create `CHANGELOG.md` unprompted.

## Validation

Every entry must trace to an actual commit/diff in the range — no summarizing "general improvements" without a concrete change behind it.

## Output Format

```
## Added
- ...

## Changed
- ...

## Fixed
- ...

## Deprecated
- ...

## Breaking
- ...
```

## Definition of Done

- Every entry is backed by a real diff, not a guess from the commit message title alone.
- Formatting/refactor/comment/test-only changes are excluded.
- Output destination was confirmed with the user, not assumed.
