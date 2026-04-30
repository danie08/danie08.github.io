# Phase 1: Visual Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-30
**Phase:** 1-Visual-Foundation
**Areas discussed:** Color palette direction, Typography scope, Dark mode handling, Footer cleanup depth

---

## Color Palette Direction

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, plum direction | Warm, intellectual, distinctive. Reflects the humanities → NLP/CS path. | ✓ |
| Cooler direction | Slate-blue or muted teal — leans more into CS/NLP identity | |
| I have specific colors in mind | A hex code or reference I want to use | |
| You decide | Trust the research recommendation | |

**User's choice:** Indigo-plum direction confirmed.

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle and muted (Recommended) | #5C4B8A — visible but restrained | ✓ |
| Richer and more present | ~#7B5EA7 — more saturated, more personality | |
| Even quieter | More of a hint than an accent | |

**User's choice:** Subtle and muted (#5C4B8A).

| Option | Description | Selected |
|--------|-------------|----------|
| Warm off-white (Recommended) | #FAFAF8 — almost imperceptible warmth | ✓ |
| Pure white | #FFFFFF — cleaner, higher contrast, more clinical | |
| You decide | Whatever pairs best with plum accent | |

**User's choice:** Warm off-white (#FAFAF8).

---

## Typography Scope

| Option | Description | Selected |
|--------|-------------|----------|
| All headings h1–h3 (Recommended) | Consistent serif for all section headings — strongest visual identity | ✓ |
| Hero / h1 only | Serif only on page title/name — more subtle | |
| You decide | Apply wherever it reads best | |

**User's choice:** All headings h1–h3 get Source Serif 4.

| Option | Description | Selected |
|--------|-------------|----------|
| Light-to-medium (400–600) (Recommended) | Elegant and airy — Source Serif 4 shines at lighter weights | ✓ |
| Bold (700) | Strong and clear — more conventional | |
| You decide | Use whatever the font renders best at | |

**User's choice:** Weights 400–600.

---

## Dark Mode Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Explicitly out of scope | Document it, keep disabled, avoid doubling token work | |
| Pair all new tokens now | Write dark-mode values alongside every new color token | |
| Enable it if time allows | Do light mode first, add dark mode as stretch goal | ✓ |

**Follow-up clarification:**

| Option | Description | Selected |
|--------|-------------|----------|
| Prepare the tokens now (Recommended) | Write dark-mode pairs in _themes.scss; enabling = one config flag | ✓ |
| Light mode only | Dark mode truly out of scope | |

**User's choice:** Write dark-mode token pairs now (keep toggle disabled). Enabling later = flip one config flag.

---

## Footer Cleanup Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Attribution only | Remove "Powered by al-folio" — one line | |
| Attribution + copyright line | Remove attribution + update copyright text | |
| Light footer redesign (Recommended) | Remove attribution, clean layout, apply new palette | ✓ |

**User's choice:** Light footer redesign.

| Option | Description | Selected |
|--------|-------------|----------|
| Copyright line | © 2025 Daniela Occhipinti | ✓ |
| Social icons | GitHub, Google Scholar, LinkedIn | ✓ |
| Last updated | Shows when site was last updated | ✓ |
| Navigation links | Quick links to About, Publications, CV | ✓ |

**User's choice:** All four footer elements.

---

## Claude's Discretion

None — all areas had clear user preferences.

## Deferred Ideas

None — discussion stayed within phase scope.
