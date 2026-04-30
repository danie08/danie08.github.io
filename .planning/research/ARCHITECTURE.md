# Architecture Patterns for Design Customization

**Domain:** Jekyll/al-folio academic personal website — visual redesign
**Researched:** 2026-04-30
**Confidence:** HIGH — based on direct inspection of actual codebase files

---

## How the Design System Is Actually Structured

This codebase already has a functioning two-layer design system. Understanding this split is the foundation of all customization work.

### Layer 1: Build-time tokens — `_sass/_variables.scss`

SCSS variables (`$name`) are compile-time constants. They are resolved by Sass during the Jekyll build and become static values in the output CSS. They cannot switch between light and dark mode at runtime.

Current uses:
- Spacing scale: `$space-1` through `$space-12`
- Typography scale: `$text-body-size`, `$text-title-1`, etc.
- Border radii: `$radius-sm`, `$radius-md`, `$radius-pill`
- Named color primitives: `$red-color`, `$blue-color`, `$grey-color-dark`, etc.

These are the right place for **palette primitive definitions** — the raw hex values that feed into the design system.

### Layer 2: Runtime theming — `_sass/_themes.scss`

CSS custom properties (`--global-*`) are set on `:root` (light mode) and `html[data-theme="dark"]`. They reference the SCSS primitive variables via the `#{}` interpolation syntax. They switch at runtime when the user toggles dark mode.

Current semantic tokens:
- `--global-bg-color` — page background
- `--global-text-color` — primary text
- `--global-text-color-light` — secondary/muted text
- `--global-theme-color` — brand accent (currently `$blue-color: #0076df`)
- `--global-hover-color` — interactive hover state
- `--global-hover-text-color` — text on accent backgrounds
- `--global-card-bg-color` — card surfaces
- `--global-divider-color` — borders and rules
- `--global-footer-bg-color`, `--global-footer-text-color`, `--global-footer-link-color`
- `--global-highlight-color` — award/distinction color (currently `$red-color-dark`)

**All downstream SCSS uses `var(--global-*)`, never hardcoded hex values.** This means changing a design token in `_themes.scss` propagates everywhere: navbar, cards, links, publication badges, buttons, code blocks, the progress bar, and the search overlay.

### Layer 3: Component styles — `_sass/_base.scss` and `_sass/_layout.scss`

These files consume the tokens. They do not define palette values. The current split is:

- `_base.scss`: HTML element resets plus all custom component classes — `.hero-thesis`, `.homepage-highlights`, `.highlight-item`, `.research-question-grid`, `.project-story`, `.collaboration-cta`, `.publications`, navbar, social icons, footer, code, posts
- `_layout.scss`: Body container, `.profile`, and skeleton section comments for Publications and Projects

In practice `_base.scss` is doing the work of both files. It is already very long (~1700 lines).

### Layer 4: Typography source — `_includes/head.liquid` + `_config.yml`

The Google Fonts URL is defined in `_config.yml` under `third_party_libraries.google_fonts.url.fonts`. The current font stack is `Roboto` and `Roboto Slab`. The `<link>` tag is injected by `_includes/head.liquid`. This is the single place to swap typefaces.

There is no `font-family` declaration currently in any `_sass/` file — fonts are inherited from Bootstrap's reset defaults combined with whatever Google Fonts loads. Adding explicit `font-family` rules to `_base.scss` would lock in the chosen typeface.

---

## Where Design Changes Live

### Color palette and brand accent

**File: `_sass/_variables.scss`**
Add new primitive color constants here (e.g., `$warm-terracotta: #c26b4a`).

**File: `_sass/_themes.scss`**
Point `--global-theme-color` and `--global-hover-color` to new primitives. Update both `:root` (light) and `html[data-theme="dark"]` blocks. Every component picking up `var(--global-theme-color)` will update automatically — this includes link color, publication venue badges, active nav item, button backgrounds, blockquote left borders, progress bar, and the search accent.

A warm palette change requires coordinating at minimum:
- `--global-theme-color` (primary brand accent)
- `--global-hover-color` (same or a darker shade)
- `--global-highlight-color` (award/distinction; currently dark red, can stay or be harmonized)
- `--global-bg-color` (if moving away from pure white)
- `--global-card-bg-color` (if surface color should be slightly warm)
- `--global-footer-bg-color` (currently very dark grey `#1c1c1d`)

### Typography

**File: `_config.yml`** — change the Google Fonts URL under `third_party_libraries.google_fonts.url.fonts`.

**File: `_sass/_variables.scss`** — add `$font-body` and `$font-display` variables.

**File: `_sass/_base.scss`** — add `font-family` declarations to `body` and heading selectors. Body is styled in `_sass/_layout.scss` (line 5 sets `font-size` and `line-height`) but `font-family` is absent — both files should be touched.

The `$text-*` scale tokens are already in `_variables.scss` and control all size/line-height values. No changes needed there unless the new typeface needs different scale values.

### Homepage layout

**File: `_pages/about.md`** — the inline HTML blocks that define the homepage structure (`.hero-thesis`, `.homepage-highlights`, `.research-question-grid`). Structural HTML changes (reordering sections, adding new blocks) happen here.

**File: `_layouts/about.liquid`** — the template wrapper that includes News, Selected Papers, and Social. Moving sections relative to each other (e.g., placing selected papers above news) requires editing this file. The hardcoded `.collaboration-cta` block also lives here.

**File: `_sass/_base.scss`** — all visual styling for those custom homepage classes is here (lines 281–432). Spacing, card appearance, grid columns, responsive breakpoints.

### Visual consistency across pages

The card border style is set once on a shared selector group (lines 296–306 of `_base.scss`):
```scss
.highlight-item,
.homepage-currently,
.research-question-card,
.featured-publication-card,
.project-story,
.collaboration-cta,
.cv-intro {
  border: 1px solid var(--global-divider-color);
  border-radius: $radius-md;
  background-color: var(--global-card-bg-color);
}
```
This is the right pattern. Any new card-like component should be added to this selector list, not styled independently.

The `.highlight-label` and `.featured-publication-label` tag style is a shared accent treatment — small caps, `var(--global-theme-color)` color. Adding a new label variant should reuse or extend this rather than defining a new rule.

---

## The SCSS Compilation Chain

```
assets/css/main.scss  (Jekyll front matter + @import list)
        │
        ├── _sass/_variables.scss   ($tokens — build-time)
        ├── _sass/_themes.scss      (CSS custom props — runtime)
        ├── _sass/_layout.scss      (body, .container, .profile, .cv)
        ├── _sass/_base.scss        (everything else + custom components)
        ├── _sass/_distill.scss     (Distill-format posts, irrelevant here)
        ├── _sass/_cv.scss          (CV page specifics)
        ├── _sass/_tabs.scss        (tab component)
        ├── _sass/_typograms.scss   (typogram diagrams, irrelevant here)
        ├── _sass/font-awesome/     (icon font)
        └── _sass/tabler-icons/     (icon font)
```

`main.scss` also interpolates `{{ site.max_width }}` from `_config.yml` (currently `930px`) and assigns it to `$max-content-width` before the imports. This is the only Liquid variable that bleeds into the SCSS layer.

**Import order matters for cascade:** `_variables.scss` must stay first (it defines `$tokens` used by all other partials). `_themes.scss` must come before `_base.scss`/`_layout.scss` because the component files reference `var(--global-*)` but do not define those properties. The existing order is correct and should not be changed.

---

## Liquid/HTML Component Hierarchy for the Homepage

```
_pages/about.md
    └── layout: about
        └── _layouts/about.liquid
            ├── layout: default
            │   └── _layouts/default.liquid
            │       ├── {% include head.liquid %}      ← CSS links, fonts, theme script
            │       ├── {% include header.liquid %}    ← navbar
            │       ├── {{ content }}                  ← about.liquid renders here
            │       ├── {% include footer.liquid %}
            │       └── {% include scripts.liquid %}
            │
            ├── {% include figure.liquid %}            ← profile photo
            ├── {{ content }}                          ← about.md body (hero, highlights, research questions)
            ├── {% include news.liquid %}              ← from _news/ collection
            ├── {% include selected_papers.liquid %}   ← bibliography query
            ├── .collaboration-cta (hardcoded HTML)
            └── {% include social.liquid %}
```

Key consequence: the `content` block in `about.liquid` is the inline HTML from `about.md`. This means all the custom homepage sections (`.hero-thesis`, `.homepage-highlights`, `.research-question-grid`) are sourced from the Markdown file, not from a template partial. To add or reorder these sections, edit `about.md`. To add new sections that depend on data (like a dynamic featured projects block), add a new `{% include %}` call in `about.liquid`.

---

## How Override Works: What You Should Never Do

**Do not edit al-folio vendor files directly.** The icon font SCSS in `_sass/font-awesome/` and `_sass/tabler-icons/` should not be touched. Same for Bootstrap and MDB CSS in `assets/css/`.

**Do not hardcode hex values in component files.** Every color in `_base.scss` and `_layout.scss` uses `var(--global-*)`. Adding a hardcoded `color: #c26b4a` in a component file would break dark mode and create an unmaintainable exception. All new color values must go through `_variables.scss` → `_themes.scss` → consumed as a CSS custom property.

**Do not duplicate the card border rule.** The shared selector group in `_base.scss` lines 296–306 is the single source of truth for card appearance. Do not define separate border/background rules on new card components — add them to the group instead.

**Do not add a new SCSS partial unless it has a clear scope boundary.** The current `_base.scss` is large but coherent. A new partial makes sense for a genuinely separate concern (e.g., a `_homepage.scss` if the homepage-specific rules grow substantially). Do not create `_colors.scss` or `_custom.scss` catch-all files — that splits the design token chain and makes debugging harder.

---

## Suggested Implementation Order

### Step 1 — Color palette (do this first)

Reason: Every other change depends on color. Getting the palette right unlocks a preview of the full site with minimal HTML work. The `--global-theme-color` token propagates so widely that this single change gives the most signal per effort.

Work: `_variables.scss` (add primitives) + `_themes.scss` (remap semantic tokens for both light and dark).

Verify by checking: navbar active link, blockquote left border, publication venue badge, `.highlight-label`, link color, `.btn-primary-link`, the progress bar. These are the widest consumers of `--global-theme-color`.

### Step 2 — Typography

Reason: Typography choice shapes perceived personality. Should be locked in before any spacing or layout work, because different typefaces have different x-heights, spacing rhythms, and weight rendering that affect how existing layout feels.

Work: `_config.yml` (Google Fonts URL) + `_variables.scss` (add font-family variables) + `_base.scss` and `_layout.scss` (add explicit `font-family` to `body` and heading selectors).

Note: The existing `$text-*` scale tokens may need adjustment after a typeface swap — some fonts need slightly larger or smaller sizes for the same visual weight.

### Step 3 — Global surface treatment

Reason: The card border rule and background colors set the visual temperature of the whole site. This is also where a slightly off-white warm background (if desired) would go.

Work: `_themes.scss` (adjust `--global-bg-color`, `--global-card-bg-color`, `--global-divider-color`) + `_variables.scss` if new surface color primitives are needed.

The shared card selector in `_base.scss` picks up `var(--global-card-bg-color)` and `var(--global-divider-color)` automatically — no per-component changes needed.

### Step 4 — Homepage layout and section styling

Reason: Homepage is the highest-stakes page and has the most custom HTML. Changes here do not affect other pages. Safe to iterate without risk to publications, CV, or news.

Work: `_pages/about.md` (restructure content sections, refine copy) + `_layouts/about.liquid` (reorder template-driven sections like news vs. selected papers, fix the hardcoded `.collaboration-cta`) + `_base.scss` (adjust spacing, grid columns, section-specific visual tweaks).

The `.homepage-highlights` grid is currently 2 columns desktop, 1 column mobile. The `.research-question-grid` and `.featured-publications-grid` are 3 columns desktop, 1 column mobile (breakpoint at 991.98px). These are configured by the `grid-template-columns` rules in `_base.scss`.

### Step 5 — Cross-page visual consistency

Reason: Once the palette, typography, and homepage are stable, audit the secondary pages (publications, CV, projects, news) for consistency. These pages use the same token system so most work is inherited. What typically needs attention is: section heading treatment, spacing rhythm between publication entries, and CV card styling.

Work: `_base.scss` (`.publications`, `.cv` sections) + `_sass/_cv.scss` (CV-specific includes).

---

## Component Boundary Map

| Component | Where HTML lives | Where CSS lives | Data source |
|-----------|-----------------|-----------------|-------------|
| Navbar | `_includes/header.liquid` | `_base.scss` (`.navbar*`, `.nav-control*`) | `site.pages` with `nav: true` |
| Homepage hero text | `_pages/about.md` | `_base.scss` (`.hero-thesis`) | Static copy in Markdown |
| Homepage highlight cards | `_pages/about.md` | `_base.scss` (`.homepage-highlights`, `.highlight-item`, `.highlight-label`) | Static copy in Markdown |
| Research questions grid | `_pages/about.md` | `_base.scss` (`.research-question-grid`, `.research-question-card`) | Static copy in Markdown |
| News feed | `_includes/news.liquid` | `_base.scss` (none specific — inherits table/link styles) | `_news/*.md` collection |
| Selected papers | `_includes/selected_papers.liquid` | `_base.scss` (`.publications`) | `_bibliography/papers.bib` filtered `selected=true` |
| Collaboration CTA | `_layouts/about.liquid` (hardcoded) | `_base.scss` (`.collaboration-cta`) | Hardcoded in layout |
| Social icons | `_includes/social.liquid` | `_base.scss` (`.social`, `.contact-icons`) | `_config.yml` social handles |
| Publications list | `_pages/publications.md` + `_layouts/bib.liquid` | `_base.scss` (`.publications`, `.abbr`, `.links`, `.author`) | `_bibliography/papers.bib` |
| CV sections | `_layouts/cv.liquid` + `_includes/cv/*.liquid` | `_base.scss` (`.cv`) + `_sass/_cv.scss` | `_data/cv.yml` |
| Project stories | `_pages/projects.md` | `_base.scss` (`.project-story`, `.project-story-question`, `.project-story-links`) | Static copy in Markdown |
| Footer | `_includes/footer.liquid` | `_base.scss` (`footer.fixed-bottom`, `footer.sticky-bottom`) | `_config.yml` |

---

## Dark Mode Compatibility Notes

Any new CSS custom property added to `:root` in `_themes.scss` must also be defined in the `html[data-theme="dark"]` block. Missing a dark-mode definition causes the light-mode value to bleed through in dark mode.

The dark mode toggle state is stored in `localStorage` and read by `assets/js/theme.js`, which sets `data-theme` on the `<html>` element synchronously in `<head>` to prevent flash. This runs before the browser renders anything, so there is no flicker. This mechanism is not affected by CSS changes.

If a new color is added only as an SCSS variable (not promoted to a CSS custom property), it will not be theme-switchable — it will be baked in at build time as the same value in both themes. This is acceptable for structural tokens (spacing, radii, font sizes) but wrong for any color that should adapt to dark mode.

---

## Pitfall: `_base.scss` Scope Creep

Currently `_base.scss` contains styles for: global elements, homepage custom sections, navbar, social icons, footer, publications, projects, CV layout, blog, code blocks, search overlay, progress bar, and third-party component overrides (ninja-keys, popover, swiper). This is structurally the al-folio pattern — one large file.

For this redesign, continue using `_base.scss` for all new component styles. Do not introduce new SCSS partials unless a section grows past ~150 lines of focused, standalone rules. The risk of splitting is that design token usage gets scattered and harder to audit when something looks wrong.

---

*Based on direct codebase inspection — 2026-04-30*
