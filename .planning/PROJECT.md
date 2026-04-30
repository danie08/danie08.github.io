# danie08.github.io — Website Redesign

## What This Is

A redesign of Daniela's academic personal website (danie08.github.io) to move away from the generic al-folio Jekyll template feel toward a distinctive, warm, and personal presence. The site must serve two audiences simultaneously: hiring committees evaluating Daniela for faculty/postdoc/industry roles, and fellow researchers looking to understand her work and connect. It runs on Jekyll and is hosted on GitHub Pages.

## Core Value

A visitor should immediately understand who Daniela is as a researcher — her personality and the research vision that drives her — without the site feeling like a CV template.

## Requirements

### Validated

- [x] Custom color palette and typography — Validated in Phase 1: Visual Foundation
- [x] Homepage layout: short personal bio → research pitch/vision → featured publications — Validated in Phase 2: Homepage Layout

### Active

- [ ] Research interests section that clearly surfaces what questions Daniela is working on and why they matter
- [ ] Visual consistency across all pages — about, publications, CV, projects share a cohesive look
- [ ] News section updated to reflect recent achievements (currently stale)

### Out of Scope

- Blog or research notes section — deferred, not in scope for this redesign
- Dedicated talks/media page — not needed right now
- Server-side functionality — static site only, no backend

## Context

- **Stack**: Jekyll + GitHub Pages (al-folio theme base), SCSS, Liquid templates, deployed via GitHub Actions
- **Audience**: Dual — hiring committees (faculty, postdoc, industry research) and fellow researchers/collaborators
- **Daniela's research**: NLP researcher at FBK (LanD group), PhD 2025 with honors, specializing in persona-based dialogue generation, interlocutor-aware conversational AI, and dialogue system evaluation
- **Current state**: Site has solid content (publications, CV, projects, news) but looks like every other al-folio site — generic template feel is the main problem
- **Existing customizations**: The codebase has already been modified from vanilla al-folio — layouts, includes, and styles have diverged

## Constraints

- **Tech stack**: Jekyll/GitHub Pages — all changes must work as static site, no server-side code
- **Build**: Must deploy correctly via existing GitHub Actions workflow
- **Scope**: Redesign existing pages only — no new page types or sections

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Redesign-not-rebuild | Site has good content and structure already; the problem is visual identity | — Pending |
| Custom design over theme swap | Swapping to a new theme risks breaking existing customizations | — Pending |

---
*Last updated: 2026-04-30 — Phase 2 (Homepage Layout) complete*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
