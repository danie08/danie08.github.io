# Phase 1: Visual Foundation - Pattern Map

**Mapped:** 2026-04-30
**Files analyzed:** 6 (modified only — no new files created in this phase)
**Analogs found:** 6 / 6

---

## File Classification

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------|------|-----------|----------------|---------------|
| `_sass/_variables.scss` | config (SCSS primitives) | transform | `_sass/_variables.scss` itself — additive change | exact (self) |
| `_sass/_themes.scss` | config (CSS tokens) | transform | `_sass/_themes.scss` itself — value substitution | exact (self) |
| `_sass/_layout.scss` | config (component CSS) | transform | `_sass/_base.scss` typography block | role-match |
| `_sass/_base.scss` | config (component CSS) | transform | `_sass/_base.scss` lines 43–56 typography block | exact (self) |
| `_includes/footer.liquid` | template (Liquid) | request-response | `_includes/header.liquid` (nav + social pattern) | role-match |
| `_config.yml` | config (Jekyll YAML) | N/A | `_config.yml` itself — value substitution | exact (self) |
| `purgecss.config.js` | config (build pipeline) | N/A | `purgecss.config.js` itself — property addition | exact (self) |

---

## Pattern Assignments

### `_sass/_variables.scss` (config, SCSS primitives)

**Change type:** Additive — new variables inserted after the existing color block (line 33). No existing variables removed or renamed.

**Existing pattern to follow** (`_variables.scss` lines 8–38):
```scss
@use "sass:color";

// Colors
$red-color: #ff3636 !default;
$red-color-dark: #b71c1c !default;
$orange-color: #f29105 !default;
$blue-color: #0076df !default;
$blue-color-dark: #00369f !default;
$cyan-color: #2698ba !default;
$light-cyan-color: color.adjust($cyan-color, $lightness: 25%);
$green-color: #00ab37 !default;
// ... more color primitives ...
$grey-color: #767676 !default;
$grey-color-light: color.adjust($grey-color, $lightness: 40%);
$grey-color-dark: #1c1c1d;
$grey-900: #212529;

$white-color: #ffffff !default;
$black-color: #000000 !default;

// Theme colors
$code-bg-color-light: rgba($blue-color, 0.05);
$code-bg-color-dark: #2c3237 !default;
```

**What to add — insert after line 33 (after `$black-color`), before `// Theme colors`:**
```scss
// Palette — indigo-plum
$plum-color: #5C4B8A;
$plum-light: #9B8CC4;
$plum-bg-dark: #1C1A24;
$plum-card-dark: #252330;
$warm-white: #FAFAF8;
$warm-black: #1A1A1A;
$warm-grey: #5E5A6E;
$warm-grey-light: #9B95AA;
$warm-text-dark: #E8E3F0;
```

**What to add — after the existing design tokens block (after line 51, `$radius-pill: 999px`), before the spacing scale:**
```scss
// Font stacks
$font-sans: "Inter", system-ui, -apple-system, sans-serif;
$font-serif: "Source Serif 4", "Georgia", serif;
```

**Critical constraints:**
- Do NOT remove `$blue-color`, `$red-color`, `$green-color`, `$grey-color`, `$grey-color-dark`, `$grey-900`, or `$white-color` — used in `_themes.scss` for functional colors (alert blocks, award badges, code backgrounds, back-to-top)
- The `$code-bg-color-light: rgba($blue-color, 0.05)` derivation at line 37 stays — this is intentional; update it to `rgba($plum-color, 0.05)` for palette coherence
- The `@use "sass:color"` at line 6 is already present — do not add it again

---

### `_sass/_themes.scss` (config, CSS custom properties)

**Change type:** Value substitution in both `:root` and `html[data-theme="dark"]` blocks, plus two new token pairs.

**Existing `:root` block structure to preserve** (`_themes.scss` lines 7–76):
```scss
:root {
  --global-bg-color: #{$white-color};
  --global-code-bg-color: #{$code-bg-color-light};
  --global-text-color: #{$black-color};
  --global-text-color-light: #{$grey-color};
  --global-theme-color: #{$blue-color};
  --global-hover-color: #{$blue-color};
  --global-hover-text-color: #{$white-color};
  --global-footer-bg-color: #{$grey-color-dark};
  --global-footer-text-color: #{$grey-color-light};
  --global-footer-link-color: #{$white-color};
  --global-distill-app-color: #{$grey-color};
  --global-divider-color: rgba(0, 0, 0, 0.1);
  --global-card-bg-color: #{$white-color};
  --global-highlight-color: #{$red-color-dark};
  // ... back-to-top, newsletter, alert blocks (all PRESERVED) ...
}
```

**Token substitutions in `:root` (light mode):**

| Token | Current SCSS ref | New SCSS ref | New computed value |
|-------|-----------------|--------------|-------------------|
| `--global-bg-color` | `#{$white-color}` | `#{$warm-white}` | `#FAFAF8` |
| `--global-text-color` | `#{$black-color}` | `#{$warm-black}` | `#1A1A1A` |
| `--global-text-color-light` | `#{$grey-color}` | `#{$warm-grey}` | `#5E5A6E` |
| `--global-theme-color` | `#{$blue-color}` | `#{$plum-color}` | `#5C4B8A` |
| `--global-hover-color` | `#{$blue-color}` | `#{$plum-color}` | `#5C4B8A` |
| `--global-footer-bg-color` | `#{$grey-color-dark}` | `#{$plum-bg-dark}` | `#1C1A24` |
| `--global-divider-color` | `rgba(0, 0, 0, 0.1)` | `rgba(92, 75, 138, 0.12)` | (literal) |
| `--global-card-bg-color` | `#{$white-color}` | `#FFFFFF` | (unchanged value, explicit) |

**Tokens PRESERVED in `:root` (do not change):**
- `--global-hover-text-color`, `--global-footer-text-color`, `--global-footer-link-color`, `--global-distill-app-color`, `--global-highlight-color`, `--global-back-to-top-*`, `--global-newsletter-*`, all alert block tokens (`--global-tip-block-*`, `--global-warning-block-*`, `--global-danger-block-*`)

**New tokens to ADD to `:root` block (after existing tokens, before the `#light-toggle-system` nested rule):**
```scss
--font-sans: #{$font-sans};
--font-serif: #{$font-serif};
```

**Existing `html[data-theme="dark"]` block structure to follow** (`_themes.scss` lines 78–122):
```scss
html[data-theme="dark"] {
  --global-bg-color: #{$grey-color-dark};
  --global-code-bg-color: #{$code-bg-color-dark};
  --global-text-color: #{$grey-color-light};
  --global-text-color-light: #{$grey-color};
  --global-theme-color: #{$blue-color};
  --global-hover-color: #{$blue-color};
  --global-hover-text-color: #{$white-color};
  --global-footer-bg-color: #{$grey-900};
  --global-footer-text-color: #{$grey-color-light};
  --global-footer-link-color: #{$white-color};
  --global-distill-app-color: #{$grey-color-light};
  --global-divider-color: #424246;
  --global-card-bg-color: #{$grey-900};
  // ... back-to-top, newsletter, alert blocks ...
}
```

**Token substitutions in `html[data-theme="dark"]`:**

| Token | Current SCSS ref | New SCSS ref | New computed value |
|-------|-----------------|--------------|-------------------|
| `--global-bg-color` | `#{$grey-color-dark}` | `#{$plum-bg-dark}` | `#1C1A24` |
| `--global-text-color` | `#{$grey-color-light}` | `#{$warm-text-dark}` | `#E8E3F0` |
| `--global-text-color-light` | `#{$grey-color}` | `#{$warm-grey-light}` | `#9B95AA` |
| `--global-theme-color` | `#{$blue-color}` | `#{$plum-light}` | `#9B8CC4` |
| `--global-hover-color` | `#{$blue-color}` | `#{$plum-light}` | `#9B8CC4` |
| `--global-footer-bg-color` | `#{$grey-900}` | `#{$plum-bg-dark}` | `#1C1A24` |
| `--global-divider-color` | `#424246` | `rgba(155, 140, 196, 0.15)` | (literal) |
| `--global-card-bg-color` | `#{$grey-900}` | `#{$plum-card-dark}` | `#252330` |

**New tokens to ADD to `html[data-theme="dark"]` block (same font tokens — fonts don't change with theme):**
```scss
--font-sans: #{$font-sans};
--font-serif: #{$font-serif};
```

**Critical constraint:** `enable_darkmode: true` is already set in `_config.yml` (line 433). Dark mode is live in production. Every dark-mode token change takes effect immediately on deploy. Verify dark-mode appearance before merging.

---

### `_sass/_layout.scss` (config, body font declaration)

**Change type:** Single property addition inside the existing `body {}` block.

**Existing `body` rule** (`_layout.scss` lines 5–20) — the pattern to add inside:
```scss
body {
  padding-bottom: $space-12;
  color: var(--global-text-color);
  background-color: var(--global-bg-color);
  font-size: $text-body-size;
  line-height: $text-body-line-height;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    scroll-margin-top: 66px;
  }
}
```

**What to add — one line inside `body {}`, after `line-height: $text-body-line-height;`:**
```scss
font-family: var(--font-sans);
```

**Pattern rationale:** All other `body` properties reference design tokens via `var(--global-*)` or SCSS variables. The new `font-family` declaration follows the identical pattern — `var(--font-sans)` references the CSS token defined in `_themes.scss`.

---

### `_sass/_base.scss` (config, heading font declaration)

**Change type:** New standalone rule added near the existing typography block (lines 41–56).

**Existing typography section** (`_base.scss` lines 41–56) — the section to insert near:
```scss
// Typography

p,
h1,
h2,
h3,
h4,
h5,
h6,
em,
div,
li,
span,
strong {
  color: var(--global-text-color);
}
```

**What to add — new rule immediately after this block (after line 56):**
```scss
h1,
h2,
h3 {
  font-family: var(--font-serif);
}
```

**Pattern rationale:** This follows the exact grouping style already used — multiline selector list, single property using a CSS custom property reference. `h4`, `h5`, `h6` intentionally omitted to preserve hierarchy at small sizes.

**Existing footer CSS** (`_base.scss` lines 742–774) — reference only, do not change:
```scss
footer.fixed-bottom {
  background-color: var(--global-footer-bg-color);
  font-size: $text-caption-size;
  line-height: $text-caption-line-height;

  .container {
    color: var(--global-footer-text-color);
    padding-top: $space-2;
    padding-bottom: $space-2;
    text-align: center;
  }

  a {
    color: var(--global-footer-link-color);

    &:hover {
      color: var(--global-theme-color);
      text-decoration: none;
    }
  }
}

footer.sticky-bottom {
  border-top: 1px solid var(--global-divider-color);
  padding-top: $space-12;
  padding-bottom: $space-12;
  font-size: $text-body-size;

  .container {
    text-align: center;
  }
}
```

No changes needed to footer CSS — the token references (`var(--global-footer-bg-color)`, etc.) will automatically pick up the updated values from `_themes.scss`.

---

### `_includes/footer.liquid` (template, Liquid)

**Change type:** Content and structure changes within existing `fixed-bottom` and `sticky-bottom` branches.

**Existing file to replace** (`_includes/footer.liquid` lines 1–35):
```liquid
{% if site.footer_fixed %}
  <footer class="fixed-bottom" role="contentinfo">
    <div class="container mt-0">
      &copy; Copyright {{ site.time | date: '%Y' }}
      {{ site.first_name }}
      {{ site.middle_name }}
      {{ site.last_name }}. {{ site.footer_text }}
      {% if site.impressum_path %}
        <a href="{{ site.url }}{{ site.baseurl }}{{ site.impressum_path }}">Impressum</a>.
      {% endif %}
      {% if site.last_updated %}
        Last updated: {{ 'now' | date: '%B %d, %Y' }}.
      {% endif %}
    </div>
  </footer>
{% else %}
  <footer class="sticky-bottom mt-5" role="contentinfo">
    {% if site.newsletter.enabled %}
      {% include newsletter.liquid %}
    {% endif %}

    <div class="container">
      &copy; Copyright {{ site.time | date: '%Y' }}
      {{ site.first_name }}
      {{ site.middle_name }}
      {{ site.last_name }}. {{ site.footer_text }}
      {% if site.impressum_path %}
        <a href="{{ site.url }}{{ site.baseurl }}{{ site.impressum_path }}">Impressum</a>.
      {% endif %}
      {% if site.last_updated %}
        Last updated: {{ 'now' | date: '%B %d, %Y' }}.
      {% endif %}
    </div>
  </footer>
{% endif %}
```

**Analog for social icon pattern** (`_includes/header.liquid` line 25):
```liquid
<div class="navbar-brand social">{% include social.liquid %}</div>
```

**Analog for nav links pattern** (`_includes/header.liquid` — uses `site.pages | where: "nav", true | sort: "nav_order"`). Copy the same filter pattern for footer nav links so it stays in sync with navbar automatically.

**Required changes:**
1. Remove `{{ site.footer_text }}` from both branches — the attribution will also be cleared in `_config.yml`
2. Add `{% include social.liquid %}` inside each branch's `.container`
3. Add navigation links using the same page-filter pattern as the header, listing About, Publications, CV
4. Preserve the `fixed-bottom` / `sticky-bottom` class structure — `_base.scss` footer CSS depends on these class names
5. Update BOTH branches — `sticky-bottom` is dead code with current `footer_fixed: true` but must be consistent for future config changes (Pitfall C)
6. Keep `{% if site.last_updated %}` conditional intact — it is a legitimate site config toggle

---

### `_config.yml` (config, YAML)

**Change type:** Two value updates.

**Existing Google Fonts entry** (lines 487–489):
```yaml
google_fonts:
  url:
    fonts: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:100,300,400,500,700|Material+Icons&display=swap"
```

**Replace `fonts:` value with (D-09):**
```yaml
fonts: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap"
```

**Existing footer_text entry** (lines 13–15):
```yaml
footer_text: >
  Powered by <a href="https://jekyllrb.com/" target="_blank">Jekyll</a> with <a href="https://github.com/alshedivat/al-folio">al-folio</a> theme.
  Hosted by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.
```

**Replace with (D-13, VIS-03):**
```yaml
footer_text: >
  Hosted by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.
```

**Critical constraint:** `enable_darkmode: true` at line 433 — do NOT change this line. The dark mode toggle is active; the decisions only prohibit adding new toggle UI, not this flag.

---

### `purgecss.config.js` (config, build pipeline)

**Change type:** Single property addition — `safelist` key.

**Existing file** (`purgecss.config.js` lines 1–6):
```javascript
module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
};
```

**Add `safelist` property (D-15):**
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

**Pattern rationale:** The `greedy` option matches compound selectors (`.highlight-item:hover`, `.homepage-highlights .highlight-item`) with a single pattern entry. Confirmed: `btn-primary-link` and `btn-outline-link` are used in `bib.liquid` lines 197, 199, 203, 206, 209 and defined in `_base.scss` lines 1115 and 1125.

---

## Shared Patterns

### CSS Token Reference Pattern
**Source:** `_sass/_base.scss` and `_sass/_layout.scss` (throughout)
**Apply to:** All SCSS property values in `_layout.scss` and `_base.scss`

The entire codebase uses `var(--global-*)` for all color and semantic values — zero hardcoded hex values in component SCSS:
```scss
// Correct — always reference CSS custom properties
background-color: var(--global-footer-bg-color);
color: var(--global-footer-text-color);
border-top: 1px solid var(--global-divider-color);

// Correct — always reference SCSS variables for spacing/sizing
padding-top: $space-2;
font-size: $text-caption-size;

// NEVER in component SCSS
background-color: #1c1c1d;  // hardcoded hex — violates project pattern
```

### SCSS Variable → CSS Token → Component Chain
**Source:** `_sass/_variables.scss` → `_sass/_themes.scss` → `_sass/_base.scss`
**Apply to:** Every new color or font value in this phase

```scss
// Step 1: _variables.scss — primitive value
$plum-color: #5C4B8A;

// Step 2: _themes.scss — semantic token (both light and dark)
:root {
  --global-theme-color: #{$plum-color};
}
html[data-theme="dark"] {
  --global-theme-color: #{$plum-light};
}

// Step 3: Component SCSS reads token — automatically updated
a { color: var(--global-theme-color); }
// 183+ existing usages update automatically — no component edits needed
```

### Dark Mode Parity Pattern
**Source:** `_sass/_themes.scss` lines 7–122
**Apply to:** Every new token added to `:root`

Every token in `:root` must have a paired value in `html[data-theme="dark"]`. This is mandatory because `enable_darkmode: true` is already active:
```scss
:root {
  --global-theme-color: #{$plum-color};   // light mode
  --font-sans: #{$font-sans};              // same in both modes
}

html[data-theme="dark"] {
  --global-theme-color: #{$plum-light};   // dark mode pair — required
  --font-sans: #{$font-sans};              // same value — still required
}
```

### Liquid Include Pattern
**Source:** `_includes/header.liquid` line 25
**Apply to:** Social icons in `_includes/footer.liquid`

Use includes rather than hardcoded HTML for social links and other reusable components:
```liquid
{% include social.liquid %}
```
This reads from `_config.yml` social handles automatically. Do not write `<a href="https://github.com/danie08">` directly in the footer.

---

## No Analog Found

None — all files in this phase are modifications to existing files. No new files are created.

---

## Metadata

**Analog search scope:** `_sass/`, `_includes/`, `_layouts/`, `_config.yml`, `purgecss.config.js`
**Files read directly:** `_variables.scss`, `_themes.scss`, `_layout.scss`, `_base.scss` (typography + footer sections), `footer.liquid`, `head.liquid`, `social.liquid`, `header.liquid`, `_config.yml` (lines 1–50, 425–497), `purgecss.config.js`
**Pattern extraction date:** 2026-04-30
