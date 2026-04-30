# Phase 1: Visual Foundation - Research

**Researched:** 2026-04-30
**Domain:** Jekyll/al-folio SCSS token system, Google Fonts, CSS custom properties, PurgeCSS
**Confidence:** HIGH — all findings based on direct file inspection of the actual codebase

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Theme color direction is indigo-plum. Use `#5C4B8A` as `--global-theme-color` (light mode).
- **D-02:** Background is warm off-white (`#FAFAF8`), not pure white.
- **D-03:** Saturation is deliberately muted. Do NOT increase to a more saturated value like `#7B5EA7`.
- **D-04:** Full recommended palette:
  - `--global-theme-color`: `#5C4B8A` (light), `#9B8CC4` (dark)
  - `--global-hover-color`: same as theme-color
  - `--global-text-color`: `#1A1A1A` (light), `#E8E3F0` (dark)
  - `--global-text-color-light`: `#5E5A6E` (light), `#9B95AA` (dark)
  - `--global-bg-color`: `#FAFAF8` (light), `#1C1A24` (dark)
  - `--global-card-bg-color`: `#FFFFFF` (light), `#252330` (dark)
  - `--global-divider-color`: `rgba(92, 75, 138, 0.12)` (light), `rgba(155, 140, 196, 0.15)` (dark)
- **D-05:** WCAG AA contrast ratios MUST be verified before phase is complete. Body text requires 4.5:1 against `#FAFAF8`. Large text requires 3:1. (See contrast verification in research — all ratios confirmed passing.)
- **D-06:** Body font: Inter (weights 400, 500, 600). Replace Roboto site-wide.
- **D-07:** Heading font: Source Serif 4 (ital, opsz, weights 400, 600, 700) applied to h1, h2, h3.
- **D-08:** Heading weight: 400–600. Do NOT use bold (700) as default weight.
- **D-09:** Google Fonts URL: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap`
- **D-10:** SCSS variables: `$font-sans: "Inter", system-ui, -apple-system, sans-serif;` and `$font-serif: "Source Serif 4", "Georgia", serif;`
- **D-11:** Dark mode tokens MUST be written alongside every new light-mode token, even though toggle stays off.
- **D-12:** Do NOT enable dark mode toggle in this phase.
- **D-13:** Footer light redesign: remove al-folio attribution, apply new palette, include copyright, social icons, navigation links.
- **D-14:** Footer changes in `_includes/footer.liquid` only. Minimal HTML changes — content and palette focus.
- **D-15:** PurgeCSS safelist: regex pattern covering `hero-`, `homepage-`, `highlight-`, `research-question-`, `btn-primary-link`, `btn-outline-link`.

### Claude's Discretion

None stated — all decisions locked.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| VIS-01 | Custom color palette (warm, non-al-folio blue) applied site-wide via CSS tokens | Token system confirmed: change `_variables.scss` + `_themes.scss` — propagates to 183+ `var(--global-*)` usages in `_base.scss` alone |
| VIS-02 | Intentional typography — body font and display/heading font replacing Roboto defaults | No `font-family` declaration currently exists in `_layout.scss` body rule — adding one is clean; heading font requires 3 selector additions |
| VIS-03 | Footer no longer shows al-folio "powered by" attribution | Attribution is in `_config.yml` `footer_text` key AND rendered in `_includes/footer.liquid`. Two-step fix: clear `footer_text`, redesign template. |
| VIS-04 | PurgeCSS safelist configured | `purgecss.config.js` confirmed: NO safelist currently exists. Six lines of config to add. |
</phase_requirements>

---

## Summary

Phase 1 is a surgical, well-scoped change to 5 files: `_config.yml`, `_sass/_variables.scss`, `_sass/_themes.scss`, `_sass/_base.scss`, `_includes/footer.liquid`, and `purgecss.config.js`. The codebase uses a clean two-tier design token system — SCSS primitive variables in `_variables.scss` that feed CSS custom properties in `_themes.scss`, consumed by 183+ `var(--global-*)` references throughout `_base.scss`. Changing the tokens in these two files propagates the new palette everywhere automatically. No component-level color edits are needed.

The Google Fonts change is genuinely a single line in `_config.yml` (the `fonts:` key under `third_party_libraries.google_fonts.url`). The font-family application requires adding declarations to the `body` rule in `_layout.scss` (which currently has no `font-family` property) and to heading selectors in `_base.scss` (which already group h1/h2/h3/h4/h5/h6 under `body` in `_layout.scss`). The footer redesign is confined to `_includes/footer.liquid` plus clearing `footer_text` in `_config.yml`. PurgeCSS has no safelist at all — the fix is a 6-line addition.

One important discovery: **`enable_darkmode: true` is currently set in `_config.yml`** (line 433). This means dark mode is technically active, though the toggle UI may not be prominent. Dark mode token pairs must be written correctly — the site is already responding to dark mode even before explicit toggle use.

**Primary recommendation:** Execute changes in this order: (1) color tokens, (2) font loading + application, (3) footer redesign, (4) PurgeCSS safelist. Verify each step locally before moving to the next.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Color palette tokens | Build-time SCSS | Runtime CSS custom properties | SCSS primitives in `_variables.scss` compile to CSS vars in `_themes.scss`; runtime switching via `html[data-theme]` |
| Typography loading | Config layer (`_config.yml`) | None — no SCSS needed | `head.liquid` reads URL directly from config and emits `<link>` tag |
| Typography application | Component CSS (`_base.scss`, `_layout.scss`) | None | `font-family` declarations go on selectors in the existing component layer |
| Dark mode pairing | Runtime CSS (`_themes.scss`) | None | All dark-mode values live in `html[data-theme="dark"]` block |
| Footer content | Template (`_includes/footer.liquid`) | Config (`_config.yml` footer_text) | Attribution sourced from config, rendered in template |
| PurgeCSS safelist | Build pipeline (`purgecss.config.js`) | None | Post-build step; config-only change |

---

## Exact Current State of Each File

### `_config.yml` — Google Fonts (line 489)

Current value:
```yaml
google_fonts:
  url:
    fonts: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:100,300,400,500,700|Material+Icons&display=swap"
```

**Key facts:**
- Uses old `css?` API, not `css2?`
- Loads Roboto, Roboto Slab, and Material Icons — all three must be replaced by the new URL
- This is the ONLY place fonts are loaded; `head.liquid` line 31 reads `site.third_party_libraries.google_fonts.url.fonts` directly
- **`enable_darkmode: true`** is set at line 433 — dark mode is active, NOT disabled as assumed before reading the file
- `footer_text` key at lines 13–15 contains the al-folio attribution: `Powered by <a href="https://jekyllrb.com/">Jekyll</a> with <a href="https://github.com/alshedivat/al-folio">al-folio</a> theme. Hosted by <a href="https://pages.github.com/">GitHub Pages</a>.`

**Required change — Google Fonts:** Replace the `fonts:` value entirely with the new URL (D-09).

**Required change — footer attribution:** Set `footer_text` to empty or a minimal replacement (e.g., `Hosted by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.`) so the Liquid template stops rendering the al-folio attribution.

---

### `_sass/_variables.scss` — Current state (76 lines total)

**Color primitive variables (lines 9–33):**
```scss
$red-color: #ff3636 !default;
$red-color-dark: #b71c1c !default;
$orange-color: #f29105 !default;
$blue-color: #0076df !default;          // ← THE THEME COLOR — referenced in _themes.scss x4
$blue-color-dark: #00369f !default;
$cyan-color: #2698ba !default;
$light-cyan-color: color.adjust($cyan-color, $lightness: 25%);
$green-color: #00ab37 !default;
// ... more greens ...
$purple-color: #b509ac !default;
$light-purple-color: color.adjust($purple-color, $lightness: 25%);
// ...
$grey-color: #767676 !default;
$grey-color-light: color.adjust($grey-color, $lightness: 40%);
$grey-color-dark: #1c1c1d;
$grey-900: #212529;
$white-color: #ffffff !default;
$black-color: #000000 !default;
```

**Derived color token (line 37):**
```scss
$code-bg-color-light: rgba($blue-color, 0.05);   // ← uses $blue-color
$code-bg-color-dark: #2c3237 !default;
```

**CRITICAL FINDING:** `$code-bg-color-light` is derived from `$blue-color`. When `$blue-color` changes to `$plum-color`, the code background will automatically shift to a subtle plum tint — this is the correct behavior and no additional action is needed. However, if the intent is to keep a neutral code background, `$code-bg-color-light` must be independently defined (e.g., `rgba($plum-color, 0.05)` is fine as-is since it just tints with the theme color).

**Design tokens (lines 41–75):** spacing scale `$space-1` through `$space-12`, border radii `$radius-sm/md/pill`, text scale `$text-body-size` through `$text-title-3` — these are ALL PRESERVED, no changes needed.

**Uses `@use "sass:color"` at line 6** — this means the modern Sass module system is in use. Adding new variables by editing this file directly is the correct pattern (Pitfall 5 confirmed: do NOT override via a new partial).

**What to add (D-10 and STACK.md):**
```scss
// New color primitives — add after line 33 (existing color block)
$plum-color: #5C4B8A;
$plum-light: #9B8CC4;
$plum-bg-dark: #1C1A24;
$plum-card-dark: #252330;
$warm-white: #FAFAF8;
$warm-black: #1A1A1A;
$warm-grey: #5E5A6E;
$warm-grey-light: #9B95AA;
$warm-text-dark: #E8E3F0;

// New font-stack variables — add after the color block
$font-sans: "Inter", system-ui, -apple-system, sans-serif;
$font-serif: "Source Serif 4", "Georgia", serif;
```

**Do NOT remove** `$blue-color`, `$red-color`, `$green-color`, etc. — they are used in `_themes.scss` for functional colors (award badges, alert blocks), and `$code-bg-color-light` derives from `$blue-color`.

---

### `_sass/_themes.scss` — Current state (160 lines total)

**Light mode `:root` block (lines 7–76):**
| Token | Current Value | Change? |
|-------|--------------|---------|
| `--global-bg-color` | `#{$white-color}` → `#ffffff` | YES → `#{$warm-white}` → `#FAFAF8` |
| `--global-code-bg-color` | `#{$code-bg-color-light}` → `rgba(#0076df, 0.05)` | Automatic — follows `$blue-color` shift |
| `--global-text-color` | `#{$black-color}` → `#000000` | YES → `#{$warm-black}` → `#1A1A1A` |
| `--global-text-color-light` | `#{$grey-color}` → `#767676` | YES → `#{$warm-grey}` → `#5E5A6E` |
| `--global-theme-color` | `#{$blue-color}` → `#0076df` | YES → `#{$plum-color}` → `#5C4B8A` |
| `--global-hover-color` | `#{$blue-color}` → `#0076df` | YES → `#{$plum-color}` → `#5C4B8A` |
| `--global-hover-text-color` | `#{$white-color}` | PRESERVE |
| `--global-footer-bg-color` | `#{$grey-color-dark}` → `#1c1c1d` | YES — update to complement palette |
| `--global-footer-text-color` | `#{$grey-color-light}` | PRESERVE (or lighten) |
| `--global-footer-link-color` | `#{$white-color}` | PRESERVE |
| `--global-divider-color` | `rgba(0, 0, 0, 0.1)` | YES → `rgba(92, 75, 138, 0.12)` |
| `--global-card-bg-color` | `#{$white-color}` | YES → `#FFFFFF` (same, but source changes to clarity) |
| `--global-highlight-color` | `#{$red-color-dark}` | PRESERVE — award badge color |
| `--global-back-to-top-bg-color` | complex `rgba(black, 0.4)` | PRESERVE — functional |
| Alert blocks (`--global-tip-block`, etc.) | green/yellow/red values | PRESERVE — semantic functional colors |

**New tokens to ADD to `:root` block:**
```scss
--font-sans: #{$font-sans};
--font-serif: #{$font-serif};
```

**Dark mode `html[data-theme="dark"]` block (lines 78–122):**
| Token | Current Value | Change? |
|-------|--------------|---------|
| `--global-bg-color` | `#{$grey-color-dark}` → `#1c1c1d` | YES → `#{$plum-bg-dark}` → `#1C1A24` |
| `--global-text-color` | `#{$grey-color-light}` | YES → `#{$warm-text-dark}` → `#E8E3F0` |
| `--global-text-color-light` | `#{$grey-color}` → `#767676` | YES → `#{$warm-grey-light}` → `#9B95AA` |
| `--global-theme-color` | `#{$blue-color}` → `#0076df` | YES → `#{$plum-light}` → `#9B8CC4` |
| `--global-hover-color` | `#{$blue-color}` → `#0076df` | YES → `#{$plum-light}` → `#9B8CC4` |
| `--global-footer-bg-color` | `#{$grey-900}` → `#212529` | YES — harmonize with dark palette |
| `--global-divider-color` | `#424246` | YES → `rgba(155, 140, 196, 0.15)` |
| `--global-card-bg-color` | `#{$grey-900}` → `#212529` | YES → `#{$plum-card-dark}` → `#252330` |

**New dark-mode tokens to ADD** (must pair every new light token):
```scss
--font-sans: #{$font-sans};   // same value — fonts don't change with theme
--font-serif: #{$font-serif};
```

**IMPORTANT: `enable_darkmode: true` in `_config.yml`** — dark mode is currently active. The `html[data-theme="dark"]` block is live in production. Dark mode token changes take effect immediately upon deploy.

---

### `_sass/_base.scss` — Font-family and heading declarations

**Current body rule:** `_layout.scss` lines 5–20 defines:
```scss
body {
  padding-bottom: $space-12;
  color: var(--global-text-color);
  background-color: var(--global-bg-color);
  font-size: $text-body-size;
  line-height: $text-body-line-height;

  h1, h2, h3, h4, h5, h6 {
    scroll-margin-top: 66px;
  }
}
```

**CONFIRMED: No `font-family` declaration exists on `body` in `_layout.scss` or `_base.scss`.** The current site font renders via Bootstrap/MDB defaults (Roboto via Google Fonts) without any explicit SCSS declaration. Adding `font-family: var(--font-sans)` to the body rule is a clean, non-breaking addition.

**Heading declarations in `_base.scss` lines 43–56:**
```scss
p, h1, h2, h3, h4, h5, h6, em, div, li, span, strong {
  color: var(--global-text-color);
}
```
This is a color-only rule. The serif heading font declaration goes separately. The correct place is in `_layout.scss` nested inside the `body` block (or added immediately after), OR as a standalone rule in `_base.scss`. Either placement works; the `_base.scss` approach is consistent with how all other custom rules are placed.

**What to add to `_layout.scss` (inside the `body` block):**
```scss
font-family: var(--font-sans);
```

**What to add to `_base.scss` (new rule, near the typography section lines 41–56):**
```scss
h1, h2, h3 {
  font-family: var(--font-serif);
}
```

Note: `h4`, `h5`, `h6` intentionally do NOT get the serif treatment — keeping those as sans-serif preserves hierarchy and prevents over-use of the display font at small sizes.

**Hardcoded colors audit:** Direct inspection of `_base.scss` shows zero hardcoded hex color values in CSS rules (confirmed by `grep`). The only hex-like content in the file is in a comment at line 1533. The `rgba(0, 0, 0, ...)` occurrences at lines 723 and 1572–1613 are: (1) the WeChat modal overlay (a legitimate black overlay, not a theme color), and (2) newsletter/bibsearch form shadows (aesthetic depth shadows, not theme colors). These do not need to change.

---

### `_includes/footer.liquid` — Current state (35 lines)

The file has two branches based on `site.footer_fixed`:

**Fixed footer branch (lines 1–15):**
```html
<footer class="fixed-bottom" role="contentinfo">
  <div class="container mt-0">
    &copy; Copyright {{ site.time | date: '%Y' }}
    {{ site.first_name }} {{ site.middle_name }} {{ site.last_name }}.
    {{ site.footer_text }}     ← THIS RENDERS THE al-folio ATTRIBUTION
    {% if site.impressum_path %}...{% endif %}
    {% if site.last_updated %}...{% endif %}
  </div>
</footer>
```

**Non-fixed branch (lines 16–35):** Same structure with `sticky-bottom` class and an optional newsletter include.

**Current footer CSS (`_base.scss` lines 742–774):**
- `footer.fixed-bottom`: dark grey background (`var(--global-footer-bg-color)`), caption font size, center-aligned text
- `footer.sticky-bottom`: border-top, larger padding, body font size

**What the footer currently lacks (per D-13):**
- No social icons
- No navigation links (About, Publications, CV)
- No last-updated signal
- Attribution from `{{ site.footer_text }}` must go

**Site uses `footer_fixed: true`** (confirmed in `_config.yml` line 45), so only the `fixed-bottom` branch is active in production. The `sticky-bottom` branch is dead code in this configuration but should still be updated for consistency.

**Required changes (D-13, D-14):**

**Step 1 — `_config.yml`:** Change `footer_text` to empty or a minimal string. The Liquid template renders this variable literally, so clearing it removes the attribution from both footer branches automatically:
```yaml
footer_text: >
  Hosted by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.
```

**Step 2 — `_includes/footer.liquid`:** Redesign to add social icons and nav links. Minimal structural change — add `{% include social.liquid %}` and a nav links block within the existing `.container`. Keep the `fixed-bottom` / `sticky-bottom` class structure intact — the CSS depends on it.

**Step 3 — `_sass/_themes.scss`:** Update `--global-footer-bg-color` to complement the new palette (the current value is `#1c1c1d` in light mode, `#212529` in dark mode — a neutral dark grey that is palette-agnostic; it can stay or shift to a plum-tinted dark like `#1C1A24` which matches the dark mode background).

---

### `purgecss.config.js` — Current state (6 lines)

```javascript
module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
};
```

**Confirmed: NO `safelist` property exists.** PurgeCSS scans compiled `_site/**/*.html` only. Custom CSS class families that appear in Liquid template code but may not produce bare class-name strings in every scanned HTML page are at risk.

**Required addition (D-15):**
```javascript
module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: {
    greedy: [
      /^hero-/,
      /^homepage-/,
      /^highlight-/,
      /^research-question-/,
      /^featured-publication/,
      /^project-story/,
      /^collaboration-cta/,
      /^btn-primary-link/,
      /^btn-outline-link/,
      /^cv-intro/,
    ],
  },
};
```

The `greedy` option in PurgeCSS matches not just the exact class name but any selector containing the pattern. This covers compound selectors like `.highlight-item:hover` and nested rules like `.homepage-highlights .highlight-item`.

---

## Bootstrap Interaction Analysis

**Bootstrap 5 CSS custom properties that may bleed through:** Bootstrap defines `--bs-font-sans-serif`, `--bs-body-font-family`, `--bs-link-color`, `--bs-link-hover-color` on its `:root`. Since `assets/css/bootstrap.min.css` loads BEFORE `main.css` (confirmed in `head.liquid` lines 5–6), al-folio's `_themes.scss` `:root` declarations override Bootstrap's for any `--global-*` properties. However, Bootstrap elements that consume `var(--bs-link-color)` directly (forms, alerts, etc.) will NOT automatically pick up the new `--global-theme-color`.

**Already confirmed:** No `--bs-*` override exists anywhere in `_base.scss`, `_layout.scss`, or `_themes.scss`. Bootstrap link colors are currently blue and will remain blue unless explicitly overridden.

**Mitigation in D-13 (from CONTEXT.md code_context):** If Bootstrap-styled elements bleed the old blue, add to `head.liquid`:
```html
<style>
  body {
    --bs-link-color: var(--global-theme-color);
    --bs-link-hover-color: var(--global-hover-color);
  }
</style>
```

This is a "if needed" fix, not a required Phase 1 task. The most prominent links (publication entries, nav links, social icons) are all styled via `_base.scss` using `var(--global-theme-color)` directly, so they will update automatically.

---

## WCAG Contrast Verification (D-05 fulfilled)

Computed ratios against `#FAFAF8` (warm off-white) background:

| Pairing | Ratio | WCAG AA Body (4.5:1) | WCAG AA Large (3:1) |
|---------|-------|---------------------|---------------------|
| `#5C4B8A` plum on `#FAFAF8` | **7.1:1** | PASSES | PASSES |
| `#1A1A1A` near-black on `#FAFAF8` | **16.65:1** | PASSES | PASSES |
| `#5E5A6E` muted grey on `#FAFAF8` | **6.35:1** | PASSES | PASSES |
| `#9B8CC4` plum-light on `#1C1A24` (dark mode) | **5.68:1** | PASSES | PASSES |

All palette choices pass WCAG AA without modification. D-05's caveat ("lighten slightly if it fails") is not needed — `#5C4B8A` at 7.1:1 comfortably exceeds the 4.5:1 body text requirement. [VERIFIED: computed in session via WCAG luminance formula]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dark mode support | Manual CSS duplication | `html[data-theme="dark"]` block in `_themes.scss` | Already architected; adding tokens to both blocks is the complete solution |
| Font loading | `@import url(...)` in SCSS | `_config.yml` `google_fonts.url.fonts` key | The `head.liquid` mechanism is already in place; SCSS imports bypass the correct loading path |
| PurgeCSS safelist patterns | Per-class whitelist | `greedy: [/^pattern-/]` regex array | Covers entire class families with one entry; per-class lists require maintenance on every new class |
| CSS variable override for Bootstrap | `!important` rules | `body { --bs-link-color: var(--global-theme-color) }` | CSS specificity-safe, theme-switchable |

---

## Common Pitfalls for This Phase

### Pitfall A: `enable_darkmode: true` is already set
**What goes wrong:** The research plan and CONTEXT.md say "dark mode stays disabled" but `_config.yml` line 433 has `enable_darkmode: true`. Dark mode is currently live. This means:
1. Every new color token MUST have a correct dark-mode pair immediately
2. The dark highlight stylesheet IS being loaded (see `head.liquid` lines 76–86)
3. If dark-mode pairs are wrong, the regression is visible immediately to any dark-mode user

**CONTEXT.md says NOT to enable the toggle (D-12)** — this refers to NOT ADDING the toggle UI, not to the `enable_darkmode` config key. The existing behavior must be preserved.

**Action:** When writing dark-mode token pairs, verify them locally with `data-theme="dark"` set on `<html>` before deploying.

### Pitfall B: `$code-bg-color-light` derives from `$blue-color`
**What goes wrong:** If `$blue-color` is changed to `$plum-color` in `_variables.scss` (as a way to patch the theme), `$code-bg-color-light: rgba($blue-color, 0.05)` would produce a plum-tinted code background — which is the intended behavior. However, if `$blue-color` is left unchanged and new plum variables are added alongside it, this derivation is harmless.

**Correct approach:** Leave `$blue-color: #0076df` unchanged. Add new `$plum-color: #5C4B8A`. Update `_themes.scss` to point semantic tokens at `$plum-color` instead of `$blue-color`. The `$code-bg-color-light` will remain blue-tinted unless also updated.

**Decision needed:** Is a plum-tinted code background (`rgba(92, 75, 138, 0.05)`) correct? It produces a very subtle lavender tint instead of the current very subtle blue tint. Both are near-invisible. Either is acceptable — the planner should make this call explicit. [ASSUMED: plum-tinted code background is acceptable; if not, explicitly define `$code-bg-color-light: rgba($plum-color, 0.05)` or keep `rgba($blue-color, 0.05)` by not changing the derivation]

### Pitfall C: Footer has two branches — only `fixed-bottom` is active
**What goes wrong:** If the footer redesign only edits the `fixed-bottom` branch (`footer_fixed: true` is current config), the `sticky-bottom` branch stays with the old attribution. If `footer_fixed` is ever turned off, the old attribution reappears.

**Action:** Edit BOTH branches in `footer.liquid` so both render the new design.

### Pitfall D: `btn-primary-link` and `btn-outline-link` must stay in safelist
**What goes wrong:** These classes are used in `bib.liquid` (confirmed at lines 197, 199, 203, 206, 209). They are defined in `_base.scss` at lines 1115 and 1125. If PurgeCSS scans only HTML and these classes appear in compiled publication pages, they survive today. But without a safelist, any configuration change or edge case (publication pages not built during a partial build) could strip them.

**Action:** Both class patterns are already in the D-15 safelist. Confirmed sufficient.

### Pitfall E: Footer social icons require `{% include social.liquid %}` not custom HTML
**What goes wrong:** Writing custom `<a href="https://github.com/danie08">` tags in the footer instead of using `{% include social.liquid %}` means the social links are hardcoded and must be maintained separately from the `_config.yml` social handles.

**Action:** Use `{% include social.liquid %}` in the footer — it reads from `_config.yml` social handles and is already the correct abstraction. The include renders all configured social icons automatically.

---

## Architecture Patterns

### Token Update Pattern (confirmed from codebase)
```scss
// Step 1: _variables.scss — add primitives
$plum-color: #5C4B8A;

// Step 2: _themes.scss :root — update semantic token
--global-theme-color: #{$plum-color};

// Step 3: All 183 var(--global-theme-color) usages in _base.scss
// update automatically — NO component edits needed
```

### Font Application Pattern
```scss
// _layout.scss — inside body { } block
font-family: var(--font-sans);

// _base.scss — new rule near lines 43-56
h1, h2, h3 {
  font-family: var(--font-serif);
}
```

### PurgeCSS Safelist Pattern
```javascript
safelist: {
  greedy: [/^hero-/, /^homepage-/]  // matches .hero-thesis, .hero-thesis:hover, etc.
}
```

---

## State of the Art

| Old Approach | Current Approach | Status |
|--------------|------------------|--------|
| `css?` Google Fonts API | `css2?` API with variable font axes | In use in locked decision D-09 |
| `@import url(...)` in SCSS | `_config.yml` → `head.liquid` link tag | Already correct in this codebase |
| Roboto (generic default) | Inter + Source Serif 4 (intentional pairing) | Replacing in this phase |
| `#0076df` generic blue | `#5C4B8A` indigo-plum | Replacing in this phase |
| No PurgeCSS safelist | `safelist.greedy` regex array | Adding in this phase |

---

## Validation Architecture

Verification commands and checks for each success criterion:

### VIS-01: Color palette applied site-wide

**Grep verification (run after changes):**
```bash
# Confirm new theme color token value in compiled CSS
grep -r "5C4B8A\|5c4b8a" _site/assets/css/main.css

# Confirm old blue is gone from theme tokens
grep "0076df\|0076DF" _site/assets/css/main.css
# Expected: 0 results (the old $blue-color value should no longer be a theme token)

# Confirm background color change
grep "FAFAF8\|fafaf8" _site/assets/css/main.css
```

**Browser checks:**
1. Open `_site/index.html` locally — navbar active link color should be plum, not blue
2. Open any blockquote — left border should be plum
3. Open Publications page — venue badge accent and PDF button should use plum
4. With DevTools: toggle `html` element to `data-theme="dark"` and verify dark palette applies

### VIS-02: Typography replaced

**Grep verification:**
```bash
# Confirm Inter is referenced in compiled CSS
grep -i "Inter" _site/assets/css/main.css

# Confirm Source Serif 4 is referenced
grep -i "Source Serif" _site/assets/css/main.css

# Confirm Roboto is gone from custom CSS (Bootstrap CSS still has it, that's OK)
grep "Roboto" _site/assets/css/main.css
# Expected: only in the Bootstrap/MDB vendored CSS blocks, not in custom rules
```

**Browser checks:**
1. Load the homepage — body text should render in Inter (use DevTools computed styles on a `<p>` to verify)
2. Check h1/h2/h3 elements — should render in Source Serif 4
3. Check h4/h5/h6 — should remain in Inter (sans-serif)
4. Verify Google Fonts link tag in page `<head>` points to new URL: `view-source:http://localhost:4000`

### VIS-03: Footer attribution removed

**Grep verification:**
```bash
# Confirm al-folio attribution is gone from compiled HTML
grep -r "al-folio\|alshedivat" _site/**/*.html
# Expected: 0 results in footer areas (may still appear in blog/project footers if any)
grep -r "Powered by" _site/**/*.html
# Expected: 0 results
```

**Visual check:** Open any page — footer should show copyright, social icons, and optional nav links. No "Powered by Jekyll with al-folio theme" text.

### VIS-04: PurgeCSS safelist configured

**Config verification:**
```bash
# Confirm safelist key exists in config
grep -A 20 "safelist" purgecss.config.js
```

**Functional verification (requires a full CI/production build):**
```bash
# After `bundle exec jekyll build` and PurgeCSS run:
grep "btn-primary-link\|btn-outline-link\|homepage-highlights\|hero-thesis" _site/assets/css/main.css
# Expected: all these selectors present in compiled CSS
```

**Local dev note:** `bundle exec jekyll serve` does NOT run PurgeCSS. The safelist can only be verified by either running PurgeCSS manually (`npx purgecss --config purgecss.config.js`) after `jekyll build`, or by checking CI deploy output.

---

## Environment Availability

Step 2.6: SKIPPED (no external tools or services required — all changes are code/config edits within the existing Jekyll build system. Ruby 3.3.5 and Node.js are already operational per CI requirements confirmed in `.github/workflows/deploy.yml`.)

---

## Validation Architecture (Nyquist)

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None — static site; validation is visual + grep-based |
| Config file | `purgecss.config.js` (build tool, not test framework) |
| Quick run command | `bundle exec jekyll build` |
| Full suite command | `bundle exec jekyll build && npx purgecss --config purgecss.config.js` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| VIS-01 | Plum theme color in compiled CSS | grep | `grep -i "5C4B8A" _site/assets/css/main.css` | Run after build |
| VIS-01 | Old blue gone from tokens | grep | `grep "0076df" _site/assets/css/main.css \| grep -v "code-bg"` | Only residual should be in `$code-bg-color-light` derivation |
| VIS-01 | Warm white background in CSS | grep | `grep -i "FAFAF8" _site/assets/css/main.css` | |
| VIS-02 | Inter referenced in CSS | grep | `grep "Inter" _site/assets/css/main.css` | |
| VIS-02 | Source Serif 4 referenced | grep | `grep "Source Serif" _site/assets/css/main.css` | |
| VIS-02 | Google Fonts link tag updated | grep | `grep "css2" _site/index.html` | |
| VIS-03 | al-folio attribution gone | grep | `grep -r "al-folio" _site/*.html _site/**/*.html` | |
| VIS-03 | "Powered by" gone | grep | `grep -r "Powered by" _site/**/*.html` | |
| VIS-04 | Safelist exists in config | grep | `grep "safelist" purgecss.config.js` | |
| VIS-04 | Button classes survive PurgeCSS | grep | `grep "btn-primary-link" _site/assets/css/main.css` | After full build + PurgeCSS |

### Wave 0 Gaps
None — no test infrastructure needed for this phase. All verification is grep-on-compiled-output or DevTools visual inspection.

---

## Open Questions

1. **`$code-bg-color-light` derivation after palette change**
   - What we know: `$code-bg-color-light: rgba($blue-color, 0.05)` — if `$blue-color` is left unchanged, code backgrounds stay blue-tinted; if the new tokens use `$plum-color`, code background can optionally be updated to `rgba($plum-color, 0.05)` for consistency
   - What's unclear: whether a plum-tinted code background is intentional
   - Recommendation: Update to `$code-bg-color-light: rgba($plum-color, 0.05)` for palette coherence; the tint is barely visible at 5% opacity and either value is acceptable

2. **Footer `--global-footer-bg-color` for light mode**
   - What we know: Current value is `#{$grey-color-dark}` → `#1c1c1d` (nearly black). The new palette has `#1C1A24` as the dark mode background — very similar
   - What's unclear: Whether the footer should stay very dark (high contrast with `#FAFAF8` background) or shift to a lighter plum-tinted dark
   - Recommendation: Use `#1C1A24` for footer bg in light mode (same value as dark mode page bg) — creates visual anchoring at the bottom of the page while harmonizing with the palette

3. **Navigation links in footer (D-13)**
   - What we know: The current `footer.liquid` has no navigation links; adding them requires new Liquid logic to render About/Publications/CV links
   - What's unclear: Whether to use `site.pages | where: "nav", true` (dynamic, picks up all nav pages) or hardcode the three links
   - Recommendation: Use `site.pages | where: "nav", true` with a `sort: "nav_order"` filter — this is how `header.liquid` builds the navbar, so the footer nav will stay in sync automatically with any future nav changes

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Plum-tinted code background (`rgba($plum-color, 0.05)`) is acceptable | Open Questions #1 | Code blocks could look slightly off-palette; low risk — barely visible at 5% |
| A2 | Footer `--global-footer-bg-color` set to `#1C1A24` is correct for light mode | Open Questions #2 | Footer could look dark-themed against the warm-white page; can be adjusted post-review |
| A3 | `{% include social.liquid %}` is the correct pattern for footer social icons | Pitfall E | If social.liquid doesn't render well in the footer context, custom HTML fallback needed; low risk since social.liquid is already used on homepage |

---

## Sources

### Primary (HIGH confidence)

- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/_sass/_variables.scss` — full file read, all variables documented
- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/_sass/_themes.scss` — full file read, all tokens documented
- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/_sass/_base.scss` — header section, footer section, line count, grep for hex colors and CSS var usage
- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/_sass/_layout.scss` — full file read, body rule confirmed
- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/_config.yml` — full file read, Google Fonts URL line 489, footer_text lines 13–15, enable_darkmode line 433 confirmed
- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/_includes/footer.liquid` — full file read, both branches documented
- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/_includes/head.liquid` — Google Fonts loading mechanism confirmed at line 31
- Direct inspection: `/Users/daniela/Desktop/website/danie08.github.io/purgecss.config.js` — no safelist confirmed
- WCAG contrast ratios — computed in-session via standard luminance formula; all palette choices pass AA

### Secondary (MEDIUM confidence)

- `.planning/research/STACK.md` — prescriptive implementation guidance, cross-referenced against direct file inspection; all recommendations confirmed accurate
- `.planning/research/ARCHITECTURE.md` — architecture documentation, confirmed against direct file reads
- `.planning/research/PITFALLS.md` — 15 pitfalls, directly applicable to this phase; Pitfalls 1, 2, 3, 4, and 5 most relevant

---

## Metadata

**Confidence breakdown:**
- Exact file state: HIGH — every file directly read and contents documented
- Token system: HIGH — both tiers directly inspected, token names and current values confirmed
- PurgeCSS state: HIGH — confirmed no safelist, correct fix pattern documented
- WCAG contrast: HIGH — computed in-session, not assumed
- Bootstrap interaction: MEDIUM — Bootstrap CSS not inspected directly; interaction behavior inferred from load order and absence of `--bs-*` overrides in al-folio SCSS
- Footer nav links approach: MEDIUM — `site.pages | where: "nav", true` pattern confirmed in al-folio docs but not verified against this site's exact nav_order configuration

**Research date:** 2026-04-30
**Valid until:** 2026-05-30 (stable codebase; only invalidated if third-party library versions change or upstream al-folio template is updated)

---

## RESEARCH COMPLETE
