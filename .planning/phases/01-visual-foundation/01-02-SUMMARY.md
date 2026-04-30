---
phase: 01-visual-foundation
plan: "02"
subsystem: typography
tags: [typography, google-fonts, inter, source-serif-4, scss-tokens, font-family]
dependency_graph:
  requires: [plum-palette-primitives, font-stack-primitives, semantic-css-tokens-light, semantic-css-tokens-dark]
  provides: [google-fonts-inter-source-serif-4, body-font-family-wired, heading-font-family-wired]
  affects: [_config.yml, _sass/_layout.scss, _sass/_base.scss, _site/index.html, _site/assets/css/main.css]
tech_stack:
  added: []
  patterns: [css-custom-property-consumption, google-fonts-css2-api]
key_files:
  created: []
  modified:
    - _config.yml
    - _sass/_layout.scss
    - _sass/_base.scss
decisions:
  - "Used var(--font-sans) and var(--font-serif) tokens (not hardcoded stacks) to preserve token indirection for future font swaps"
  - "h4/h5/h6 left sans-serif via body inheritance — serif scope is h1/h2/h3 only per D-07"
  - "font-family placed after line-height in body block, preserving all existing properties"
metrics:
  duration: "4m"
  completed: "2026-04-30"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 01 Plan 02: Typography Summary

**One-liner:** Replaced Roboto with Inter (body) + Source Serif 4 (h1/h2/h3) by updating the Google Fonts css2? URL in _config.yml and wiring --font-sans / --font-serif CSS tokens into the SCSS layout and base files.

## What Was Built

Three files modified to implement VIS-02 (typography foundation):

1. `_config.yml` — Google Fonts URL updated from Roboto/Roboto Slab css? endpoint to Inter + Source Serif 4 css2? endpoint
2. `_sass/_layout.scss` — `font-family: var(--font-sans);` added inside existing body {} block
3. `_sass/_base.scss` — `h1, h2, h3 { font-family: var(--font-serif); }` rule added after typography color block

## Files Modified

| File | Changes | Lines Added | Lines Removed |
|------|---------|-------------|---------------|
| `_config.yml` | Google Fonts URL replaced in `third_party_libraries.google_fonts.url.fonts` | +1 | -1 |
| `_sass/_layout.scss` | +1 font-family line inside body block | +1 | 0 |
| `_sass/_base.scss` | +5 lines for h1/h2/h3 serif rule (selector + braces + property + blank line) | +5 | 0 |

## Google Fonts URL Diff

**Old (css? API, Roboto):**
```
https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:100,300,400,500,700|Material+Icons&display=swap
```

**New (css2? API, Inter + Source Serif 4):**
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap
```

Inter loaded at weights 400/500/600. Source Serif 4 loaded with optical sizing (opsz 8–60) at roman 400/600/700 and italic 400.

## New Font-Family Declarations

### body block in `_sass/_layout.scss`
```scss
body {
  padding-bottom: $space-12;
  color: var(--global-text-color);
  background-color: var(--global-bg-color);
  font-size: $text-body-size;
  line-height: $text-body-line-height;
  font-family: var(--font-sans);  /* NEW */

  h1, h2, h3, h4, h5, h6 {
    scroll-margin-top: 66px;
  }
}
```

### h1/h2/h3 rule in `_sass/_base.scss` (after typography color block, before hr)
```scss
h1,
h2,
h3 {
  font-family: var(--font-serif);
}
```

h4/h5/h6 inherit `var(--font-sans)` from body — no explicit declaration needed.

## Verified Grep Results

### _config.yml
- Contains `css2?family=Inter:wght@400;500;600&family=Source+Serif+4:...&display=swap`: YES
- Contains `family=Roboto:`: NO (gone)
- Contains `Roboto+Slab`: NO (gone)
- `enable_darkmode: true` preserved at line 433: YES
- `footer_text:` preserved (Plan 03 target): YES

### _site/index.html (compiled)
- `<link>` tag contains `css2?family=Inter`: YES
- Old Roboto URL `family=Roboto:300,400,500,700`: GONE

### _site/assets/css/main.css (compiled)
- Contains `Inter`: YES — via `--font-sans: Inter, system-ui, -apple-system, sans-serif;`
- Contains `Source Serif`: YES — via `--font-serif: Source Serif 4, Georgia, serif`
- Contains `--font-sans` token declaration: YES (in :root and html[data-theme=dark])
- Contains `--font-serif` token declaration: YES (in :root and html[data-theme=dark])
- Contains `font-family:var(--font-sans)` on body: YES
- Contains `h1,h2,h3{font-family:var(--font-serif)}`: YES

## Task Commits

| Task | Description | Commit |
|------|-------------|--------|
| Task 1 | Replace Google Fonts URL with Inter + Source Serif 4 css2? endpoint | `007d9bc` |
| Task 2 | Apply font-sans to body and font-serif to h1/h2/h3 in SCSS | `80c2702` |

## Preserved Constraints

- `enable_darkmode: true` at line 433 of `_config.yml` — UNTOUCHED
- `footer_text:` in `_config.yml` — UNTOUCHED (Plan 03 handles footer)
- `footer_fixed:` in `_config.yml` — UNTOUCHED
- All existing body properties preserved: `padding-bottom`, `color`, `background-color`, `font-size`, `line-height`, nested `h1...h6 { scroll-margin-top: 66px }`
- Original typography color block in `_base.scss` unchanged: `p, h1, h2, h3, h4, h5, h6, em, div, li, span, strong { color: var(--global-text-color); }`
- No hardcoded font stacks in `_layout.scss` or `_base.scss` — both use CSS custom property references

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all token wiring is live end-to-end. The Google Fonts URL is served in `_site/index.html`, body renders Inter via `var(--font-sans)`, h1/h2/h3 render Source Serif 4 via `var(--font-serif)`.

## Threat Flags

None. Changes are limited to YAML configuration and SCSS font-family declarations — no new network endpoints, no auth paths, no trust boundary changes. Build pipeline gate (T-01-02-04) satisfied by successful `bundle exec jekyll build`.

T-01-02-03 (font fallback) verified: `--font-sans` resolves to `Inter, system-ui, -apple-system, sans-serif` and `--font-serif` resolves to `Source Serif 4, Georgia, serif` — system fallbacks confirmed in compiled CSS.

## Self-Check: PASSED

- `_config.yml` contains `css2?family=Inter` — FOUND
- `_config.yml` does not contain `family=Roboto:` — CONFIRMED
- `_config.yml` contains `enable_darkmode: true` — FOUND
- `_sass/_layout.scss` contains `font-family: var(--font-sans);` — FOUND
- `_sass/_base.scss` contains `font-family: var(--font-serif);` with h1/h2/h3 selector — FOUND
- `_site/index.html` `<link>` tag references `css2?family=Inter` — FOUND
- `_site/assets/css/main.css` contains `Inter` — FOUND
- `_site/assets/css/main.css` contains `Source Serif` — FOUND
- `_site/assets/css/main.css` contains `font-family:var(--font-sans)` — FOUND
- `_site/assets/css/main.css` contains `h1,h2,h3{font-family:var(--font-serif)}` — FOUND
- Commit `007d9bc` (Task 1) — FOUND
- Commit `80c2702` (Task 2) — FOUND
