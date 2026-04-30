---
phase: 01-visual-foundation
plan: "01"
subsystem: scss-tokens
tags: [color-palette, typography-tokens, dark-mode, scss]
dependency_graph:
  requires: []
  provides: [plum-palette-primitives, font-stack-primitives, semantic-css-tokens-light, semantic-css-tokens-dark]
  affects: [_sass/_themes.scss, _sass/_variables.scss, all var(--global-*) consumers]
tech_stack:
  added: []
  patterns: [two-tier-scss-token-system, dark-mode-parity]
key_files:
  created: []
  modified:
    - _sass/_variables.scss
    - _sass/_themes.scss
decisions:
  - "Updated $code-bg-color-light derivation from $blue-color to $plum-color for palette coherence"
  - "Dark mode tokens updated in full: plum-bg-dark, warm-text-dark, plum-light for theme/hover"
  - "Font tokens added to both :root and html[data-theme=dark] blocks per dark-mode parity pattern"
metrics:
  duration: "2m 12s"
  completed: "2026-04-30"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 01 Plan 01: Color Palette and Font Tokens Summary

**One-liner:** Replaced al-folio blue palette with indigo-plum (#5C4B8A) + warm off-white (#FAFAF8) via two-tier SCSS token system, propagating to all 183+ `var(--global-*)` consumers automatically.

## What Was Built

Two SCSS files modified to implement VIS-01 (color palette foundation):

1. `_sass/_variables.scss` — Added 9 plum palette primitives and 2 font-stack primitives; updated `$code-bg-color-light` derivation to use `$plum-color`
2. `_sass/_themes.scss` — Updated 7 light-mode tokens, 8 dark-mode tokens, added `--font-sans` and `--font-serif` to both `:root` and `html[data-theme="dark"]` blocks

## Files Modified

| File | Changes | Lines Added | Lines Removed |
|------|---------|-------------|---------------|
| `_sass/_variables.scss` | +9 palette primitives, +2 font stacks, updated 1 derivation | +13 | -1 |
| `_sass/_themes.scss` | 15 token substitutions + 4 new font token declarations | +6 | -0 net (substitutions in place) |

## New Primitives Added

### Palette Primitives (`_sass/_variables.scss`)

```scss
$plum-color: #5C4B8A;      // light-mode theme accent
$plum-light: #9B8CC4;      // dark-mode theme accent
$plum-bg-dark: #1C1A24;    // dark-mode background + footer bg
$plum-card-dark: #252330;  // dark-mode card background
$warm-white: #FAFAF8;      // light-mode page background
$warm-black: #1A1A1A;      // light-mode primary text
$warm-grey: #5E5A6E;       // light-mode secondary text
$warm-grey-light: #9B95AA; // dark-mode secondary text
$warm-text-dark: #E8E3F0;  // dark-mode primary text
```

### Font-Stack Primitives (`_sass/_variables.scss`)

```scss
$font-sans: "Inter", system-ui, -apple-system, sans-serif;
$font-serif: "Source Serif 4", "Georgia", serif;
```

### Code-bg Derivation Updated

```scss
// Before:
$code-bg-color-light: rgba($blue-color, 0.05);
// After:
$code-bg-color-light: rgba($plum-color, 0.05);
```

## Token Substitutions Applied

### Light Mode (`:root` block)

| CSS Token | Old Value | New Value |
|-----------|-----------|-----------|
| `--global-bg-color` | `#ffffff` | `#FAFAF8` |
| `--global-text-color` | `#000000` | `#1A1A1A` |
| `--global-text-color-light` | `#767676` | `#5E5A6E` |
| `--global-theme-color` | `#0076df` | `#5C4B8A` |
| `--global-hover-color` | `#0076df` | `#5C4B8A` |
| `--global-footer-bg-color` | `#1c1c1d` | `#1C1A24` |
| `--global-divider-color` | `rgba(0, 0, 0, 0.1)` | `rgba(92, 75, 138, 0.12)` |
| `--font-sans` | (new) | `Inter, system-ui, -apple-system, sans-serif` |
| `--font-serif` | (new) | `Source Serif 4, Georgia, serif` |

### Dark Mode (`html[data-theme="dark"]` block)

| CSS Token | Old Value | New Value |
|-----------|-----------|-----------|
| `--global-bg-color` | `#1c1c1d` | `#1C1A24` |
| `--global-text-color` | `gainsboro` | `#E8E3F0` |
| `--global-text-color-light` | `#767676` | `#9B95AA` |
| `--global-theme-color` | `#0076df` | `#9B8CC4` |
| `--global-hover-color` | `#0076df` | `#9B8CC4` |
| `--global-footer-bg-color` | `#212529` | `#1C1A24` |
| `--global-divider-color` | `#424246` | `rgba(155, 140, 196, 0.15)` |
| `--global-card-bg-color` | `#212529` | `#252330` |
| `--font-sans` | (new) | `Inter, system-ui, -apple-system, sans-serif` |
| `--font-serif` | (new) | `Source Serif 4, Georgia, serif` |

### Preserved Tokens (unchanged)

- `--global-card-bg-color` in `:root` — still `#ffffff` (white cards on warm bg)
- `--global-highlight-color: #b71c1c` — award badge red color
- `--global-hover-text-color: #ffffff` — white text on hover buttons
- `--global-footer-text-color`, `--global-footer-link-color` — footer text colors
- `--global-back-to-top-*` — back-to-top button
- `--global-newsletter-*` — newsletter box
- All `--global-tip-block-*`, `--global-warning-block-*`, `--global-danger-block-*` — alert blocks

## Verified Grep Results (compiled CSS)

```
5C4B8A present: --global-theme-color: #5C4B8A in :root
FAFAF8 present: --global-bg-color: #FAFAF8 in :root
0076df count: 0 (completely eliminated from compiled output, including code-bg)
```

Full compiled `:root` in `_site/assets/css/main.css`:
```
:root{--global-bg-color: #FAFAF8;--global-code-bg-color: rgba(92, 75, 138, 0.05);
--global-text-color: #1A1A1A;--global-text-color-light: #5E5A6E;
--global-theme-color: #5C4B8A;--global-hover-color: #5C4B8A;
--global-hover-text-color: #ffffff;--global-footer-bg-color: #1C1A24;
--global-divider-color: rgba(92, 75, 138, 0.12);--global-card-bg-color: #ffffff;
--global-highlight-color: #b71c1c;...
--font-sans: Inter, system-ui, -apple-system, sans-serif;
--font-serif: Source Serif 4, Georgia, serif}
```

Dark mode block confirms `#1C1A24` background and `#9B8CC4` theme color.

## Task Commits

| Task | Description | Commit |
|------|-------------|--------|
| Task 1 | Add palette and font-stack primitives to `_variables.scss` | `22f9605` |
| Task 2 | Repoint semantic tokens in `_themes.scss` for both `:root` and `html[data-theme="dark"]` | `3acf32b` |

## Deviations from Plan

None — plan executed exactly as written. The `$code-bg-color-light` update to use `$plum-color` was specified in the plan and applied correctly.

## Known Stubs

None — this plan applies fully wired color tokens. Plans 02 and 03 consume `--font-sans` and `--font-serif` tokens declared here.

## Threat Flags

None. CSS contains only color and font-stack values — no secrets, no new network endpoints, no trust boundary changes. Build-pipeline gate (T-01-01-03) satisfied by successful `bundle exec jekyll build`.

## Self-Check: PASSED

- `_sass/_variables.scss` exists and contains `$plum-color: #5C4B8A;` — FOUND
- `_sass/_themes.scss` exists and contains `--global-theme-color: #{$plum-color};` — FOUND
- Commit `22f9605` (Task 1) — FOUND
- Commit `3acf32b` (Task 2) — FOUND
- Compiled `_site/assets/css/main.css` contains `5C4B8A` — FOUND
- Compiled `_site/assets/css/main.css` contains `FAFAF8` — FOUND
- `0076df` occurrence count in compiled CSS: 0 — PASSED
