# Technology Stack: Design Customization

**Project:** danie08.github.io redesign
**Scope:** Visual design and UX layer only — CSS/SCSS patterns, typography, color, within existing Jekyll/GitHub Pages constraints
**Researched:** 2026-04-30
**Overall confidence:** HIGH — based on direct inspection of the live codebase combined with established SCSS/CSS custom property patterns

---

## What We Are Actually Doing

This is not a stack decision in the build-tools sense — Jekyll, GitHub Pages, Bootstrap 5, and jekyll-scholar are all fixed constraints. The "stack" decision here is about **which customization technique** to use, **which Google Fonts to adopt**, **what color system to design**, and **what patterns to follow or avoid** when modifying the existing SCSS layer.

The existing codebase already has a clean, layered SCSS architecture with CSS custom properties. The redesign works entirely within it.

---

## Current State That Shapes Every Decision

### The CSS Custom Property System (the important bit)

The codebase uses a two-tier theming system:

**Tier 1 — SCSS variables** (`_sass/_variables.scss`): raw named values
```scss
$blue-color: #0076df;
$grey-color: #767676;
// etc.
```

**Tier 2 — CSS custom properties** (`_sass/_themes.scss`): semantic tokens mapped to SCSS variables
```css
:root {
  --global-theme-color: #{$blue-color};
  --global-text-color: #{$black-color};
  --global-bg-color: #{$white-color};
  /* etc. */
}
html[data-theme="dark"] {
  /* dark-mode overrides */
}
```

**All component styles reference only Tier 2 tokens**, never SCSS variables directly. This means the entire site's palette is controlled from two files: `_variables.scss` (where you define values) and `_themes.scss` (where you map them to semantic tokens). Dark mode is automatic — define a light value and its dark counterpart in `_themes.scss` and it propagates everywhere.

This architecture is correct and should not be changed. All customization work happens by modifying these two files.

### Current Font Loading

Google Fonts loaded via `_config.yml` under `third_party_libraries.google_fonts.url.fonts`. The Liquid template in `_includes/head.liquid` reads this URL and emits a `<link>` tag. Changing the fonts requires only updating this URL string in `_config.yml` — no template changes needed.

Current fonts: `Roboto:300,400,500,700 | Roboto+Slab:100,300,400,500,700` — pure al-folio defaults, nothing distinctive about them.

### Bootstrap 5 Constraint

Bootstrap 5 is vendored at `assets/css/bootstrap.min.css` (not CDN, not npm, a committed file). Bootstrap's own CSS custom properties (`--bs-font-sans-serif`, `--bs-body-font-family`, `--bs-link-color`, etc.) load before `main.css`. The al-folio theme does not currently override Bootstrap tokens — it sits on top of them. This means some Bootstrap defaults bleed through on elements that are not explicitly styled by al-folio (forms, tables, modals). This is manageable and not a blocker.

---

## Recommended Design Stack

### Typography

**Recommended pairing:**

| Role | Font | Weights | Rationale |
|------|------|---------|-----------|
| Display / headings | **Source Serif 4** | 400, 600, 700 | Humanist old-style serif; warm and legible at large sizes; optical-size aware; available on Google Fonts; associates the site with scholarly depth without feeling stiff like Times New Roman or corporate like Georgia |
| Body / UI | **Inter** | 400, 500, 600 | The dominant choice for academic/research product UIs in 2024–2025; exceptional screen legibility at small sizes; neutral enough to not compete with Source Serif 4; Variable font available on Google Fonts, reducing HTTP requests |

**Why this specific pairing over alternatives:**

- Roboto (current) is the default choice for everything — it actively signals "I used a template". Replacing it signals intentionality.
- Inter vs. DM Sans vs. Nunito: Inter wins for professional contexts. DM Sans is warmer but less sharp at small sizes. Nunito reads as too casual for hiring committees.
- Source Serif 4 vs. Playfair Display vs. Lora: Playfair is beautiful but too decorative for body-adjacent heading sizes; it becomes fussy. Lora reads as blog-ish. Source Serif 4 is the contemporary scholarly option — it is used by serious digital humanities and NLP research publications precisely because it reads as intellectual without being ostentatious.
- This pairing specifically: both are humanist (warm, slightly curved), which creates coherence. Source Serif 4 at headings gives the site a distinctive voice; Inter keeps the reading experience frictionless.

**Google Fonts URL to use in `_config.yml`:**
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap
```

Note: Use the `css2?` API (not `css?`) — it is the current Google Fonts API version and supports variable font axis parameters. The `opsz` axis in Source Serif 4 enables optical size adjustments automatically.

**Font assignment in SCSS:**
In `_sass/_variables.scss`, add:
```scss
$font-sans: "Inter", system-ui, -apple-system, sans-serif;
$font-serif: "Source Serif 4", "Georgia", serif;
```

In `_sass/_themes.scss`, expose as tokens:
```css
:root {
  --font-sans: #{$font-sans};
  --font-serif: #{$font-serif};
}
```

In `_sass/_layout.scss` or `_sass/_base.scss`, apply:
```scss
body {
  font-family: var(--font-sans);
}
h1, h2, h3 {
  font-family: var(--font-serif);
}
```

This is the complete, contained set of changes. No other files need to be touched.

**What NOT to use:**
- Do not use `font-display: block` — use `display=swap` (already in the URL) to prevent invisible text during font load
- Do not load Roboto Slab if it is not used — removing it from the Google Fonts URL reduces the stylesheet weight by ~12KB
- Do not use web fonts for the monospace stack (`more-info` section uses `font-family: monospace` in `_base.scss`) — system monospace is correct there

---

### Color Palette

**Recommended palette:**

The goal is warm and distinctive, not blue-corporate. The existing `--global-theme-color` is `#0076df` — an entirely generic primary blue that appears on thousands of al-folio sites.

| Token | Light value | Dark value | Rationale |
|-------|------------|-----------|-----------|
| `--global-theme-color` | `#5C4B8A` — medium indigo-plum | `#9B8CC4` — lightened for dark mode legibility | Distinctive without being aggressive; reads as intellectual and humanist; warm undertone (reddish bias) connects to the "warm, personal" goal; uncommon for academic sites, which cluster around blue |
| `--global-hover-color` | same as theme-color | same | Keep consistent |
| `--global-text-color` | `#1A1A1A` — near-black with warmth | `#E8E3F0` — slightly warm off-white | Avoiding pure `#000000`/`#ffffff` reduces harshness |
| `--global-text-color-light` | `#5E5A6E` — muted plum-grey | `#9B95AA` — lightened | Harmonizes with theme-color hue; more cohesive than neutral grey |
| `--global-bg-color` | `#FAFAF8` — warm off-white | `#1C1A24` — deep warm dark | Very slight warmth to the white reads as intentional, not blank |
| `--global-card-bg-color` | `#FFFFFF` | `#252330` | Slight lift from background for cards |
| `--global-divider-color` | `rgba(92, 75, 138, 0.12)` | `rgba(155, 140, 196, 0.15)` | Dividers tinted to the theme color rather than pure grey — subtle but cohesive |

**SCSS variables to define in `_variables.scss`:**
```scss
$plum-color: #5C4B8A;
$plum-light: #9B8CC4;
$plum-bg-dark: #1C1A24;
$warm-white: #FAFAF8;
$warm-black: #1A1A1A;
$warm-grey: #5E5A6E;
$warm-grey-light: #9B95AA;
```

**What NOT to use:**
- Do not use a pure bright warm color (orange, coral, red) as the theme color — it reads as a personal blog, not a researcher's professional presence
- Do not use a fully saturated color — muted/toned-down values (`#5C4B8A` vs. `#7B2FBE`) are what distinguish "designed" from "accidentally colorful"
- Do not change `$red-color` or `$green-color` — those are used for award badges and status indicators; leave functional colors alone
- Do not attempt to override Bootstrap's vendored `bootstrap.min.css` inline — any Bootstrap variable overrides need to be in a `<style>` block in `_includes/head.liquid` targeting `body { --bs-link-color: var(--global-theme-color); }` if Bootstrap elements bleed through

---

### SCSS Customization Patterns

**The correct pattern for this codebase:**

Everything goes in the existing `_sass/` files. There is no need for a separate override file. The existing structure already provides clean separation of concerns:

| File | What to edit | What not to touch |
|------|-------------|------------------|
| `_variables.scss` | Add new SCSS vars for colors and fonts | Do not remove existing color vars — they are referenced by `_themes.scss` |
| `_themes.scss` | Change `--global-theme-color`, `--global-bg-color`, etc. on `:root` and `[data-theme="dark"]`; add `--font-sans`, `--font-serif` | Do not change dark mode selector structure |
| `_base.scss` | Apply `font-family: var(--font-sans)` on `body`; `font-family: var(--font-serif)` on headings | Do not add page-specific layout rules here |
| `_layout.scss` | Adjust spacing, component-level styles | This file is already per-component; add new component classes here if needed |
| `_config.yml` | Update `third_party_libraries.google_fonts.url.fonts` | Do not add `@import` statements for Google Fonts in SCSS — the `_config.yml` mechanism is the correct loading path |

**What NOT to do:**
- Do not create a new `_custom.scss` file and import it at the end of `main.scss` — it works but creates a parallel system. Use the existing files.
- Do not override with `!important` — the existing code uses almost no `!important`; adding them creates specificity debt
- Do not modify `assets/css/bootstrap.min.css` directly — it is vendored and will be overwritten
- Do not add `@import url(...)` for Google Fonts inside SCSS — the `_config.yml` + `head.liquid` mechanism is already in place and correct; SCSS-based imports fire at build time and bypass the SRI/integrity check flow

---

### Spacing and Layout Tokens

The existing `_variables.scss` already defines a spacing scale (`$space-1` through `$space-12`) and a typography scale (`$text-body-size`, `$text-title-1`, `$text-title-2`, `$text-title-3`). These are well-designed and should be used as-is. No changes needed.

The `max_width: 930px` in `_config.yml` is reasonable for academic content. Do not change it — wider layouts make long publication lists harder to scan.

---

### Profile Image Treatment

**Recommended:** Keep `image_circular: false` (current setting). A rectangular or slightly-rounded image reads as a professional headshot. Circular crops feel like social media avatars. The current setting is correct.

If a border-radius is desired for softening, use `border-radius: $radius-md` (0.5rem) in `_base.scss` on `.profile img` — not the full circle crop.

---

## Alternatives Considered and Rejected

| Category | Considered | Rejected Because |
|----------|-----------|-----------------|
| Body font | DM Sans | Warmer but less sharp at 14–15px; insufficient for dense publication lists |
| Body font | Nunito | Too playful; undermines professional credibility with hiring committees |
| Body font | Lato | Better than Roboto but still a default al-folio choice; does not differentiate |
| Display font | Playfair Display | Too decorative; the serifs become fussy at h3/h4 sizes; reads as fashion/editorial rather than scholarly |
| Display font | Lora | Solid but blog-register; common on personal sites |
| Display font | Libre Baskerville | Heavier weight creates visual heaviness that doesn't pair well with Inter |
| Theme color | Warm terracotta (#C1440E) | Reads as creative portfolio or food blog; hiring committees want professional signals |
| Theme color | Deep teal (#1A6B7B) | Better than blue but still clusters with the generic academic palette |
| Theme color | Sage green (#6B8E6E) | Good warmth but low contrast at the required ratios for accessibility |
| Override strategy | Separate `_custom.scss` | Creates a third file to maintain alongside `_base.scss` and `_layout.scss`; the existing files have room |
| Override strategy | Inline Bootstrap overrides via `style` in default.liquid | Works but scatters CSS across templates; prefer the SCSS layer |

---

## Implementation Entry Points (for the roadmap)

To change the entire visual identity, these are the only files that need to change:

1. `_config.yml` — update the Google Fonts URL (one line)
2. `_sass/_variables.scss` — add 6–8 new SCSS color and font-stack variables
3. `_sass/_themes.scss` — update ~8 CSS custom property values on `:root` and `html[data-theme="dark"]`
4. `_sass/_base.scss` — add `font-family` declarations on `body` and headings (3–5 lines)

That is the complete surface area for the typography and color redesign. The rest of the visual work (layout adjustments, homepage improvements) stays in `_layout.scss` and the Liquid templates, which is separately scoped.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Customization technique | HIGH | Directly verified from codebase inspection; the CSS custom property + SCSS variable pattern is confirmed working |
| Font loading mechanism | HIGH | Traced through `_config.yml` → `head.liquid` → `<link>` tag; confirmed single-file change |
| Font pairing recommendation | MEDIUM-HIGH | Based on established typographic principles and knowledge of academic site design conventions; not verified against live 2025 examples due to web access limitation |
| Color palette | MEDIUM | Principled design reasoning; specific hex values should be visually validated against the profile photo and tested for WCAG AA contrast (4.5:1 for body text) before committing |
| Bootstrap interaction | MEDIUM | Bootstrap 5 custom properties are well-documented; the specific tokens that bleed through have not been enumerated by live inspection |

---

*Research date: 2026-04-30*
