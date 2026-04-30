---
phase: 01-visual-foundation
verified: 2026-04-30T00:00:00Z
status: human_needed
score: 12/12 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Open _site/index.html locally in a browser and inspect a <p> element in DevTools — verify computed font-family is Inter (not Roboto)"
    expected: "Computed font-family for body text shows Inter (the Google font must have loaded)"
    why_human: "Google Fonts is loaded via an external CDN link; static CSS analysis confirms the font-family token is wired, but actual font rendering depends on the browser fetching the CDN stylesheet. Cannot verify font rendering without a browser."
  - test: "Open _site/index.html locally in a browser and inspect an <h1> or <h2> element — verify computed font-family contains Source Serif 4"
    expected: "Computed font-family for h1/h2/h3 shows Source Serif 4"
    why_human: "Same reason as above — the token wiring is confirmed but display font rendering requires a live browser check."
  - test: "Open _site/index.html locally. Visually verify: page background is warm off-white (not pure white), navbar active link is plum (not blue), blockquote left border is plum"
    expected: "Visual impression is warm/scholarly, not the default al-folio blue-on-white scheme"
    why_human: "Palette correctness at the perceptual level (warm vs. cool, readable contrast) cannot be verified by grep against hex values alone."
---

# Phase 1: Visual Foundation Verification Report

**Phase Goal:** Visitors see a distinctive color palette and intentional typography across every page of the site — al-folio's default blue and Roboto are gone
**Verified:** 2026-04-30
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

All truths are drawn from the merged set of PLAN frontmatter must_haves across the three plans. All 12 verified against the actual codebase.

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | Every page renders with a warm off-white (#FAFAF8) background, not pure white | VERIFIED | `_sass/_themes.scss` line 8: `--global-bg-color: #{$warm-white};`; compiled CSS: `--global-bg-color: #FAFAF8` confirmed in `:root` block |
| 2 | Theme accent color is indigo-plum (#5C4B8A), no longer the al-folio blue (#0076df) | VERIFIED | `_sass/_themes.scss`: `--global-theme-color: #{$plum-color};` in `:root`; compiled CSS: `--global-theme-color: #5C4B8A`; `0076df` produces zero hits in `_site/assets/css/main.css` |
| 3 | Body text reads in near-black (#1A1A1A) on the warm off-white background | VERIFIED | `_sass/_themes.scss`: `--global-text-color: #{$warm-black};`; compiled CSS: `--global-text-color: #1A1A1A` |
| 4 | All `var(--global-*)` consumers across the site automatically pick up the new palette | VERIFIED | Token propagation confirmed: compiled `_site/assets/css/main.css` applies `var(--global-theme-color)`, `var(--global-bg-color)`, `var(--global-text-color)` throughout; body, navbar, blockquotes, cards, links, footer all reference these tokens |
| 5 | Dark mode tokens are paired for every new light-mode token | VERIFIED | `html[data-theme=dark]` block in compiled CSS confirms: `#1C1A24` background, `#E8E3F0` text, `#9B8CC4` theme/hover, `#9B95AA` text-light, `#252330` card-bg — all dark-mode pairings present; `--font-sans` and `--font-serif` appear twice in `_themes.scss` (once per block) |
| 6 | The Google Fonts URL in the served HTML loads Inter and Source Serif 4 — Roboto and Roboto Slab are no longer requested | VERIFIED | `_site/index.html` `<link>` tag: `css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght...&display=swap`; `family=Roboto` produces zero hits in built HTML |
| 7 | Body copy renders in Inter site-wide (computed font-family contains Inter) | VERIFIED (partial — human needed for browser rendering) | `_sass/_layout.scss` line 11: `font-family: var(--font-sans);` inside body block; compiled CSS: `body{...font-family:var(--font-sans)}` confirmed; `--font-sans` resolves to `Inter, system-ui, -apple-system, sans-serif` |
| 8 | h1, h2, and h3 elements render in Source Serif 4 (computed font-family contains Source Serif 4) | VERIFIED (partial — human needed for browser rendering) | `_sass/_base.scss` lines 58–61: `h1, h2, h3 { font-family: var(--font-serif); }`; compiled CSS: `h1,h2,h3{font-family:var(--font-serif)}`; `--font-serif` resolves to `Source Serif 4, Georgia, serif` |
| 9 | h4, h5, h6 stay in the sans stack (Inter) — display font is reserved for top three heading levels | VERIFIED | grep confirms no `h4`, `h5`, or `h6` selector adjacent to `font-family: var(--font-serif)` in `_base.scss`; those elements inherit from body |
| 10 | The phrase "Powered by" and the word "al-folio" no longer appear in any built page footer | VERIFIED | grep on `_site/index.html` for `al-folio` and `Powered by` returns zero matches; `_config.yml` `footer_text` now contains only GitHub Pages hosting credit |
| 11 | Every built page footer renders a copyright line, social icons, and a navigation link list | VERIFIED | Built `_site/index.html` contains: `<div class="footer-copyright">© Copyright 2026 Daniela Occhipinti. Hosted by GitHub Pages`; `fa-brands fa-github` and other social icon classes present; `footer-nav` contains `<a href="/publications/">Publications</a>` and `<a href="/cv/">CV</a>` |
| 12 | `purgecss.config.js` declares a `safelist.greedy` regex array covering all required class families; btn classes survive PurgeCSS | VERIFIED | `purgecss.config.js` has `safelist: { greedy: [...] }` with all 11 patterns (`/^hero-/`, `/^homepage-/`, `/^highlight-/`, `/^research-question-/`, `/^featured-publication/`, `/^project-story/`, `/^collaboration-cta/`, `/^btn-primary-link/`, `/^btn-outline-link/`, `/^cv-intro/`, `/^footer-/`); `btn-primary-link` and `btn-outline-link` rules confirmed present in `_site/assets/css/main.css` |

**Score:** 12/12 truths verified (2 require browser rendering confirmation — see Human Verification section)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `_sass/_variables.scss` | SCSS color and font primitives ($plum-color, $warm-white, etc.) | VERIFIED | Contains `$plum-color: #5C4B8A;`, `$warm-white: #FAFAF8;`, `$warm-black: #1A1A1A;`, `$warm-grey: #5E5A6E;`, `$warm-grey-light: #9B95AA;`, `$warm-text-dark: #E8E3F0;`, `$plum-light: #9B8CC4;`, `$plum-bg-dark: #1C1A24;`, `$plum-card-dark: #252330;`, `$font-sans`, `$font-serif`; `$code-bg-color-light` updated to use `$plum-color`; `$blue-color: #0076df !default;` preserved |
| `_sass/_themes.scss` | Updated semantic CSS tokens for light and dark mode | VERIFIED | All 7 light-mode tokens updated (bg, text, text-light, theme, hover, footer-bg, divider); 8 dark-mode tokens updated; `--font-sans` and `--font-serif` declared twice (once per mode block); preserved: `--global-highlight-color`, `--global-hover-text-color`, alert-block tokens, back-to-top tokens |
| `_config.yml` | Inter + Source Serif 4 Google Fonts URL; cleared footer_text | VERIFIED | `css2?family=Inter:wght@400;500;600&family=Source+Serif+4:...` at line 488; `footer_text` contains only `Hosted by <a href="https://pages.github.com/"...>GitHub Pages</a>.`; `enable_darkmode: true` preserved at line 432 |
| `_sass/_layout.scss` | Body `font-family: var(--font-sans);` inside body block | VERIFIED | Line 11: `font-family: var(--font-sans);` present; all existing body properties preserved |
| `_sass/_base.scss` | `h1, h2, h3 { font-family: var(--font-serif); }` rule | VERIFIED | Lines 58–61: `h1,\nh2,\nh3 {\n  font-family: var(--font-serif);\n}` — each selector on its own line; h4/h5/h6 excluded; original color-only typography rule untouched |
| `_includes/footer.liquid` | Redesigned footer template — both branches include social.liquid and nav-links list | VERIFIED | `include social.liquid` appears exactly twice; `p.nav == true` and `sort: "nav_order"` present; `class="fixed-bottom"` and `class="sticky-bottom mt-5"` preserved; `footer-copyright`, `footer-social`, `footer-nav` wrappers present; `{% if site.newsletter.enabled %}` preserved; no `al-folio` or `Powered by` anywhere |
| `purgecss.config.js` | PurgeCSS safelist configured with all 11 greedy regex patterns | VERIFIED | `safelist: { greedy: [...] }` form used; all 11 patterns present; existing keys (`content`, `css`, `output`, `skippedContentGlobs`) preserved |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `_sass/_variables.scss` | `_sass/_themes.scss` | SCSS variable interpolation `#{$plum-color}` | WIRED | `_themes.scss` directly interpolates `$plum-color`, `$warm-white`, `$warm-black`, `$warm-grey`, `$warm-grey-light`, `$warm-text-dark`, `$plum-light`, `$plum-bg-dark`, `$plum-card-dark`, `$font-sans`, `$font-serif` |
| `_sass/_themes.scss` | compiled `_site/assets/css/main.css` | Sass build | WIRED | Compiled CSS `:root` block contains `#FAFAF8`, `#5C4B8A`, `#1A1A1A`, `#5E5A6E`; dark block contains `#1C1A24`, `#9B8CC4`, `#E8E3F0`; `0076df` absent from entire compiled output |
| `_config.yml google_fonts.url.fonts` | `_includes/head.liquid` | Liquid `{{ site.third_party_libraries.google_fonts.url.fonts }}` | WIRED | `_site/index.html` emits `<link defer rel="stylesheet" ... href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Source+Serif+4...">` |
| `_sass/_themes.scss --font-sans/--font-serif` | `_sass/_layout.scss body` and `_sass/_base.scss h1/h2/h3` | `var(--font-sans)` and `var(--font-serif)` consumption | WIRED | Compiled CSS confirms: `body{...font-family:var(--font-sans)}` and `h1,h2,h3{font-family:var(--font-serif)}` |
| `_config.yml footer_text` | `_includes/footer.liquid` | Liquid `{{ site.footer_text }}` | WIRED | Built `_site/index.html` footer contains "Hosted by GitHub Pages" — the new `footer_text` value is rendered, no al-folio attribution |
| `_includes/footer.liquid (include social.liquid)` | `_includes/social.liquid` | Liquid include | WIRED | Built `_site/index.html` shows `fa-brands fa-github`, `fa-brands fa-linkedin`, `fa-brands fa-bluesky`, `fa-brands fa-x-twitter` icon classes from social.liquid rendering |
| `_includes/footer.liquid (nav-link iteration)` | nav pages with `nav: true` | Liquid `p.nav == true` filter | WIRED | Built `_site/index.html` footer-nav contains `<a href="/publications/">Publications</a>` and `<a href="/cv/">CV</a>` |
| `purgecss.config.js safelist.greedy` | `_site/assets/css/main.css` | PurgeCSS post-build pass | WIRED | `btn-primary-link` and `btn-outline-link` CSS rules confirmed present in compiled `_site/assets/css/main.css` after PurgeCSS pass |

### Data-Flow Trace (Level 4)

Not applicable — this phase produces CSS tokens and static template changes, not components rendering dynamic data from an API or database. All "data" flows are CSS custom property inheritance from `:root` declarations, which are fully verified in the compiled CSS above.

### Behavioral Spot-Checks

| Behavior | Check | Result | Status |
|----------|-------|--------|--------|
| Plum color present in compiled CSS | `grep -i '5C4B8A' _site/assets/css/main.css` | Found in `:root` `--global-theme-color` and `--global-hover-color` | PASS |
| Warm off-white present in compiled CSS | `grep -i 'FAFAF8' _site/assets/css/main.css` | Found in `:root` `--global-bg-color` | PASS |
| al-folio blue absent from compiled CSS | `grep '0076df' _site/assets/css/main.css` | Zero matches | PASS |
| Roboto absent from built HTML | `grep 'family=Roboto' _site/index.html` | Zero matches | PASS |
| Inter font link emitted in built HTML | `grep 'css2.*Inter' _site/index.html` | `<link defer rel="stylesheet" ...css2?family=Inter...>` found | PASS |
| al-folio attribution absent from built pages | `grep 'al-folio\|Powered by' _site/index.html` | Zero matches | PASS |
| Footer nav links present in built HTML | grep for `/publications/` and `/cv/` inside footer-nav | Both found | PASS |
| Social icons rendered in footer | `fa-brands fa-github` in `_site/index.html` | Found | PASS |
| btn-primary-link survives PurgeCSS | `grep 'btn-primary-link' _site/assets/css/main.css` | Rule present | PASS |
| btn-outline-link survives PurgeCSS | `grep 'btn-outline-link' _site/assets/css/main.css` | Rule present | PASS |
| Commits exist for all 7 tasks | `git log --oneline` | `22f9605`, `3acf32b`, `007d9bc`, `80c2702`, `80756dd`, `c8caeee`, `16e9d06` all found | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|---------|
| VIS-01 | Plan 01 | Custom color palette (warm, non-al-folio blue) applied site-wide via CSS tokens | SATISFIED | `--global-theme-color: #5C4B8A`, `--global-bg-color: #FAFAF8` in compiled CSS; `0076df` absent; dark mode paired |
| VIS-02 | Plan 02 | Intentional typography — body font and display/heading font replacing Roboto | SATISFIED | Inter loaded via css2? URL; `font-family:var(--font-sans)` on body; `font-family:var(--font-serif)` on h1/h2/h3; Roboto absent from built HTML |
| VIS-03 | Plan 03 | Footer no longer shows al-folio "powered by" attribution | SATISFIED | `al-folio` and `Powered by` absent from `_config.yml` footer_text, `_includes/footer.liquid`, and all built pages |
| VIS-04 | Plan 03 | PurgeCSS safelist configured so custom CSS classes survive production builds | SATISFIED | `safelist.greedy` with 11 patterns in `purgecss.config.js`; `btn-primary-link` and `btn-outline-link` confirmed present in post-PurgeCSS CSS |

All four Phase 1 requirement IDs (VIS-01, VIS-02, VIS-03, VIS-04) are satisfied. No orphaned requirements — REQUIREMENTS.md assigns no additional IDs to Phase 1.

### Anti-Patterns Found

No anti-patterns found. Scan of `_sass/_variables.scss`, `_sass/_themes.scss`, `_sass/_layout.scss`, `_sass/_base.scss`, `_includes/footer.liquid`, and `purgecss.config.js` found zero TODO/FIXME/PLACEHOLDER comments, zero stub return values, zero hardcoded empty data, and zero disconnected handlers.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | None found | — | — |

### Human Verification Required

#### 1. Body font rendering (Inter)

**Test:** Open `_site/index.html` in a browser (e.g., `cd _site && python3 -m http.server 4000`, then visit `http://localhost:4000`). Inspect any `<p>` element in DevTools Computed Styles.
**Expected:** Computed `font-family` shows `Inter` as the first matched font (not Roboto or a system font).
**Why human:** The `font-family: var(--font-sans)` token wiring is confirmed in source and compiled CSS. However, `var(--font-sans)` resolves to `Inter, system-ui, -apple-system, sans-serif` — if the Google Fonts CDN `<link>` tag fails to load (network, CORS, etc.), the browser falls back to `system-ui`. Only a live browser check can confirm Inter is actually served and applied.

#### 2. Heading font rendering (Source Serif 4)

**Test:** Same local server as above. Inspect an `<h1>` or `<h2>` element in DevTools Computed Styles.
**Expected:** Computed `font-family` shows `Source Serif 4` as the first matched font.
**Why human:** Same CDN dependency as above. The token wiring (`h1,h2,h3{font-family:var(--font-serif)}`) is verified; actual rendering depends on the CDN stylesheet loading correctly.

#### 3. Visual palette impression

**Test:** Same local server. View the homepage without DevTools.
**Expected:** Page background appears warm off-white (slightly cream, not bright white), navbar active link and blockquote borders appear plum/indigo (not bright blue), overall impression is warm and scholarly.
**Why human:** Perceptual color accuracy at the human vision level cannot be verified by hex-value grep. The hex values are correct (#FAFAF8, #5C4B8A) but whether these read as "warm" and "distinctive" vs. "indistinguishable from blue" requires a human observer.

### Gaps Summary

No gaps. All 12 must-haves are VERIFIED in the codebase. The three human verification items are standard browser-rendering checks that cannot be automated — they do not indicate missing or broken implementation.

The phase goal is achieved in code: al-folio's default blue (#0076df) is completely absent from the compiled CSS, Roboto is gone from the font request, the plum palette (#5C4B8A/#FAFAF8) propagates through every `var(--global-*)` consumer, Inter and Source Serif 4 are wired via CSS tokens, and the footer attribution has been removed. Pending human confirmation that the CDN-delivered fonts render correctly in a browser.

---

_Verified: 2026-04-30_
_Verifier: Claude (gsd-verifier)_
