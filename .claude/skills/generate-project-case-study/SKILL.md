---
name: generate-project-case-study
description: Turn a project (from Hygraph-sourced data or user-provided detail) into a portfolio-ready case study draft. Use when asked to write up a project for the portfolio, LinkedIn, or a resume. Never invents facts or metrics.
allowed-tools: Read, Grep, Glob
---

# Skill: Generate Project Case Study

## Description

Produces a structured, factual case-study draft for a project. Output is a draft the user pastes into Hygraph (the CMS backing `app/[locale]`'s "Featured Projects"/"Real Projects" sections), LinkedIn, or a resume — this skill has no write access to Hygraph.

## When to Use

- User asks to write up or improve a project description.
- Backing `portfolio-content` for case-study-shaped requests.

## Procedure

1. Gather what's known about the project from: the `Project` shape already used in this repo (`name`, `slug`, `description`, `language`, `githubUrl`, `stars`, `forks`, `featured`, `tags` — see `app/services/usePortfolioDetails.ts`), the actual project's own repo/README if the user points to it, or facts the user states directly.
2. Identify: Project name, Problem, Context, Role, Responsibilities, Architecture, Technologies, Challenges, Decisions, Solutions, Results, Lessons learned.
3. For any of those you can't source from the above, write `[MISSING INFO: ...]` rather than inferring or inventing.
4. Draft using the structure below.

## Structure

```
# Project Name

## Overview

## The Problem

## My Role

## Technical Approach

## Architecture

## Key Challenges

## Solutions

## Results

## Technologies

## Lessons Learned
```

## Validation

- No metric (stars, forks, users, performance numbers, revenue, etc.) appears unless it's sourced from the repo/CMS data or explicitly given by the user.
- Every section either has real content or an explicit `[MISSING INFO]` marker — never a filler sentence.

## Output Format

The filled-in structure above, plus a short note on where each fact came from (repo data / user-provided / missing) so the user can spot-check before publishing.

## Definition of Done

- Structure matches the template exactly.
- No invented facts or metrics.
- User is told this is a draft for Hygraph/LinkedIn/resume — not something the skill has published anywhere.
