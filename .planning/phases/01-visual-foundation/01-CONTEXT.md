# Phase 1: Visual Foundation - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Apply a custom color palette and typography to the site via the existing CSS token system. The entire visual identity change touches exactly 4 files: `_config.yml` (Google Fonts URL), `_sass/_variables.scss` (new color/font SCSS variables), `_sass/_themes.scss` (CSS custom property values, light + dark), `_sass/_base.scss` (font-family declarations). Also includes: PurgeCSS safelist fix and a light footer redesign removing the al-folio attribution.

This phase does NOT touch layout, homepage section order, or content — those belong to Phases 2 and 3.

</domain>

<decisions>
## Implementation Decisions

### Color Palette

- **D-01:** Theme color direction is **indigo-plum**, subtle and muted. Use `#5C4B8A` as `--global-theme-color` (light mode). Rationale: warm, scholarly, humanist undertone that reflects the Digital Humanities → NLP/CS research path. Uncommon for academic sites — differentiates from the generic blue cluster.
- **D-02:** Background is **warm off-white** (`#FAFAF8`), not pure white. Barely perceptible warmth makes the page feel softer and more intentional.
- **D-03:** Saturation is deliberately muted. Do NOT increase to a more saturated value like `#7B5EA7`. The muted quality is intentional and distinguishes "designed" from "accidentally colorful."
- **D-04:** Full recommended palette from research:
  - `--global-theme-color`: `#5C4B8A` (light), `#9B8CC4` (dark)
  - `--global-hover-color`: same as theme-color
  - `--global-text-color`: `#1A1A1A` (light), `#E8E3F0` (dark)
  - `--global-text-color-light`: `#5E5A6E` (light), `#9B95AA` (dark)
  - `--global-bg-color`: `#FAFAF8` (light), `#1C1A24` (dark)
  - `--global-card-bg-color`: `#FFFFFF` (light), `#252330` (dark)
  - `--global-divider-color`: `rgba(92, 75, 138, 0.12)` (light), `rgba(155, 140, 196, 0.15)` (dark)
- **D-05:** WCAG AA contrast ratios MUST be verified before this phase is complete. Body text requires 4.5:1 minimum against `#FAFAF8`. Large text requires 3:1 minimum. If `#5C4B8A` fails at body text sizes, lighten slightly until it passes.

### Typography

- **D-06:** Body font: **Inter** (weights 400, 500, 600). Replace Roboto site-wide. Use the `css2?` Google Fonts API with variable font axis parameters.
- **D-07:** Heading font: **Source Serif 4** (ital, opsz, weights 400, 600, 700) applied to **h1, h2, and h3** — all three heading levels get the serif treatment. This is the strongest visual identity signal.
- **D-08:** Heading weight: **400–600** (light to medium). Do NOT use bold (700) as the default heading weight — Source Serif 4 at lighter weights is elegant and avoids heaviness.
- **D-09:** Google Fonts URL to use in `_config.yml`:
  ```
  https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap
  ```
  (Use `css2?` API, not `css?`. Remove Roboto Slab from the URL entirely.)
- **D-10:** SCSS variables to add in `_variables.scss`:
  ```scss
  $font-sans: "Inter", system-ui, -apple-system, sans-serif;
  $font-serif: "Source Serif 4", "Georgia", serif;
  ```
  Expose as CSS tokens in `_themes.scss`: `--font-sans` and `--font-serif`. Apply in `_base.scss` with `body { font-family: var(--font-sans); }` and `h1, h2, h3 { font-family: var(--font-serif); }`.

### Dark Mode

- **D-11:** Dark mode stays **disabled** (toggle remains off, `enable_darkmode` not set in `_config.yml`). However, dark-mode token pairs MUST be written alongside every new light-mode color token in `_themes.scss` `html[data-theme="dark"]` block. Enabling dark mode later = flip one config flag.
- **D-12:** Do NOT enable the dark mode toggle in this phase — even if the tokens are ready. Enabling the toggle is out of scope for Phase 1.

### Footer

- **D-13:** Footer gets a **light redesign**, not just an attribution removal. Specifically:
  - Remove the "Powered by al-folio" attribution text and link entirely
  - Apply the new color palette to footer background/text (use `--global-footer-bg-color`, update to complement the new palette)
  - Footer content to include: copyright line (© 2025 Daniela Occhipinti), social icons (GitHub, Google Scholar, LinkedIn), last-updated signal, navigation links (About, Publications, CV)
- **D-14:** Footer redesign stays in the Liquid template (`_layouts/default.liquid` or the footer include). Do not attempt to restructure the footer's HTML radically — keep changes minimal and focused on content and palette.

### PurgeCSS Safelist

- **D-15:** Add a safelist to `purgecss.config.js` covering all existing custom CSS class families. At minimum, safelist pattern for: `hero-thesis`, `homepage-highlights`, `highlight-item`, `highlight-label`, `homepage-currently`, `research-question-card`, `research-question-grid`, `btn-primary-link`, `btn-outline-link`, and any new class families added in this phase. Use a regex pattern: `/^(hero-|homepage-|highlight-|research-question-|btn-primary-link|btn-outline-link)/` or equivalent.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### CSS Token System (primary implementation surface)
- `_sass/_variables.scss` — SCSS variable definitions; add new color and font-stack variables here
- `_sass/_themes.scss` — CSS custom property mappings; this is where all color values and dark-mode pairs go
- `_sass/_base.scss` — apply `font-family` declarations; contains existing custom homepage classes

### Font Loading
- `_config.yml` — update `third_party_libraries.google_fonts.url.fonts` (one line change)
- `_includes/head.liquid` — understand how the font URL is consumed (read-only reference)

### Footer
- `_layouts/default.liquid` — footer HTML lives here; check for footer include or inline HTML
- Check for `_includes/footer.liquid` if it exists (may be a separate include)

### PurgeCSS
- `purgecss.config.js` — add safelist here; no safelist currently exists

### Planning Artifacts
- `.planning/PROJECT.md` — project goals and core value
- `.planning/REQUIREMENTS.md` — VIS-01 through VIS-04 are the in-scope requirements
- `.planning/research/STACK.md` — full prescriptive implementation recommendations (MUST read — contains exact hex values, Google Fonts URL, SCSS patterns, and what NOT to do)
- `.planning/research/PITFALLS.md` — 15 pitfalls specific to this codebase; PurgeCSS and dark mode sections are most relevant to Phase 1

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Two-tier SCSS token system**: `_variables.scss` (SCSS vars) + `_themes.scss` (CSS custom properties) is already the correct architecture. All component styles use `var(--global-*)` tokens. No architecture changes needed — just update values.
- **Existing spacing scale**: `$space-1` through `$space-12` in `_variables.scss` — use these for footer spacing, do not introduce new spacing values.
- **`--global-footer-bg-color`**: token already exists in `_themes.scss`; update its value rather than adding a new token.

### Established Patterns
- **Never hardcode hex values in component SCSS** — always reference `var(--global-*)` tokens. The existing code follows this strictly; new code must too.
- **Dark mode uses `html[data-theme="dark"]` selector** in `_themes.scss` — every new color token added to `:root` must have a paired value in this block.
- **Google Fonts loaded via `_config.yml`** — do NOT use `@import url(...)` in SCSS files.
- **PurgeCSS runs post-build** — any CSS class used in Liquid/JS that doesn't appear in static HTML will be stripped unless safelisted.

### Integration Points
- Bootstrap 5 (`assets/css/bootstrap.min.css`) loads before `main.css` and may override some tokens. If Bootstrap-styled elements bleed the old blue, add overrides targeting `body { --bs-link-color: var(--global-theme-color); }` in `head.liquid`.
- `bib.liquid` uses `.btn-primary-link` and `.btn-outline-link` — these MUST be in the PurgeCSS safelist.

</code_context>

<specifics>
## Specific Ideas

- The profile photo is at `assets/img/prof_pic.jpeg` — dominant colors in the photo should be visually checked against the palette before shipping to ensure they don't clash with `#5C4B8A`.
- The footer should feel finished: clean layout, new palette applied, the "Powered by al-folio" line completely gone.
- The warm off-white background (`#FAFAF8`) should give the site an intentional warmth, not feel like a missed white.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Visual-Foundation*
*Context gathered: 2026-04-30*
