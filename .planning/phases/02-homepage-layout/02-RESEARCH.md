# Phase 2: Homepage Layout - Research

**Researched:** 2026-04-30
**Domain:** Jekyll + Liquid layout, SCSS targeting of jekyll-scholar output
**Confidence:** HIGH

---

## Summary

Phase 2 is a pure layout/CSS phase: three files carry almost all the changes (`_pages/about.md`, `_layouts/about.liquid`, `_sass/_base.scss`) plus one safelist entry in `purgecss.config.js`. Every decision in CONTEXT.md is confirmed implementable against the real file contents with no surprises — except one **landmine** in the existing mobile breakpoint for `.homepage-highlights` that the planner must address.

The four decisions are mechanically straightforward: a YAML front matter change (D-03), a block reorder inside one Markdown file (D-01), a `<div>` wrapper insertion in one Liquid template (D-04), and a targeted SCSS block plus a one-line column change (D-05/D-07). No build pipeline changes are needed beyond the one PurgeCSS safelist entry (D-06).

**Primary recommendation:** Execute as three sequential tasks — (1) `about.md` edits (subtitle + reorder), (2) `about.liquid` wrapper, (3) `_base.scss` SCSS additions + grid fix + mobile rules — then the safelist entry. Tasks 1 and 2 can be batched; task 3 must be last because it has the most risk of affecting other pages through cascade.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** New order in `about.md` content block: hero-thesis first, then bio paragraphs, then highlights grid. Current order is hero-thesis → highlights → bio; bio paragraphs move above the highlights grid.
- **D-02:** Sections rendered by `about.liquid` after `{{ content }}` (News, Selected papers, Collaboration CTA, Social) stay in their current layout-controlled positions — no change to their relative order.
- **D-03:** Subtitle becomes `NLP Researcher · FBK`. Change the `subtitle:` key in `_pages/about.md` front matter. The middle dot (·) is the separator. No HTML link, plain text only.
- **D-04:** CSS restyle via `.selected-papers-showcase` wrapper in `about.liquid` around `{% include selected_papers.liquid %}`. Do NOT bypass the `{% bibliography %}` pipeline or touch `bib.liquid`.
- **D-05:** Restyled layout uses left accent bar per entry (`--global-theme-color`), increased title prominence, reduced venue badge noise, less dominant author lines.
- **D-06:** `.selected-papers-showcase` class MUST be added to `purgecss.config.js` safelist.
- **D-07:** Change highlights grid from `repeat(2, minmax(0, 1fr))` to `repeat(3, minmax(0, 1fr))` in `_base.scss`.

### Claude's Discretion
- Exact SCSS selectors used to target bib.liquid's HTML structure within `.selected-papers-showcase`
- Mobile breakpoint behavior for the 3-column grid (acceptable to stack to 1 column below ~576px)
- Spacing adjustments between the reordered sections if gaps feel off after the move

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HOME-01 | Homepage opens with bio and origin story before credentials/highlights (section reorder in `about.md`) | D-01: block reorder is a pure `about.md` edit; confirmed feasible from file inspection |
| HOME-02 | Subtitle reflects research identity (NLP / persona-based dialogue generation) | D-03: `subtitle:` front matter key change only; current value confirmed as HTML link |
| HOME-03 | Selected papers section on the homepage uses an improved visual layout | D-04/D-05: wrapper div in `about.liquid` + SCSS block in `_base.scss`; bib.liquid HTML structure confirmed |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Section reorder (HOME-01) | Frontend Server (Jekyll/Liquid) | — | Content structure lives in `_pages/about.md` (Markdown); rendered by `about.liquid` |
| Subtitle change (HOME-02) | Frontend Server (Jekyll/Liquid) | — | YAML front matter in `about.md`; rendered into `<p class="desc">` by `about.liquid` |
| Selected papers showcase (HOME-03) | CDN / Static (SCSS → CSS) | Frontend Server (Liquid wrapper) | Visual styling is pure SCSS; the wrapper that enables scoped targeting is a Liquid edit |
| Highlights grid column change (D-07) | CDN / Static (SCSS → CSS) | — | One property change in existing CSS rule |
| PurgeCSS safelist (D-06) | CDN / Static (build config) | — | Ensures new CSS class survives production build |

---

## Current File State (Verified)

### `_pages/about.md` — VERIFIED [VERIFIED: direct file read]

**Front matter (current):**
```yaml
subtitle: Researcher at <a href='https://www.fbk.eu/en/'>Fondazione Bruno Kessler</a>.
```
Target: `subtitle: "NLP Researcher · FBK"` — plain text, YAML-quoted to be safe with the middle dot.

**Content block line-by-line (current order):**
- Lines 18–20: `.hero-thesis` paragraph — stays at top (no change needed)
- Lines 22–35: `.homepage-highlights` div with three child `.highlight-item` divs — currently SECOND
- Lines 37–43: Two bio `<p>` tags — currently THIRD

**Target order after D-01:** hero-thesis → bio paragraphs → highlights grid.

The reorder is a pure cut-paste of the two `<p>` blocks (lines 37–43) to before the `.homepage-highlights` div (before line 22). No content changes; closing `</p>` tags are already correct.

Note: the `about.md` content block has no trailing blank line after the second `</p>` — Jekyll handles this fine.

**Also confirmed:** The highlights grid already has three `.highlight-item` children (Research / Applied AI / Engineering). D-07 is a CSS change only; no content additions needed for the 3-column display.

---

### `_layouts/about.liquid` — VERIFIED [VERIFIED: direct file read]

**Selected papers block (lines 59–65):**
```liquid
<!-- Selected papers -->
{% if page.selected_papers %}
  <h2>
    <a href="{{ '/publications/' | relative_url }}" class="section-link">Main publications</a>
  </h2>
  {% include selected_papers.liquid %}
{% endif %}
```

D-04 wraps line 64 (`{% include selected_papers.liquid %}`) in a `<div class="selected-papers-showcase">`. The `<h2>` heading stays outside the wrapper — that is correct per the UI spec (the wrapper scopes the bibliography list, not the heading).

No other changes to `about.liquid`.

---

### `_sass/_base.scss` — VERIFIED [VERIFIED: direct file read]

**`.hero-thesis` (lines 287–293):** Already styled with `clamp(1.2rem, 2.2vw, 1.55rem)`, `line-height: 1.45`, `max-width: 42rem`, `margin-bottom: $space-6`. Do NOT re-declare.

**`.homepage-highlights` (lines 295–300):**
```scss
.homepage-highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));  // ← D-07 changes this to repeat(3, ...)
  gap: $space-4;
  margin: $space-6 0 $space-8;
}
```

**`.highlight-label` (lines 324–333):** Already uses `color: var(--global-theme-color)`, weight 700, uppercase, letter-spacing 0.08em. The UI spec notes weight 600 for `.highlight-label` but the current rule uses 700. Do NOT change the existing `.highlight-label` rule — it is out of scope and the discrepancy is in the existing style, not introduced by this phase.

**`.publications` (lines 985–1213):** The global `.publications ol.bibliography li .title` rule sets `font-weight: 700`. The showcase override sets weight 600. Since `.selected-papers-showcase` adds specificity, the override will win — no `!important` needed.

**CRITICAL LANDMINE — existing mobile breakpoint (lines 975–981):**
```scss
@media (max-width: 991.98px) {
  .homepage-highlights,
  .research-question-grid,
  .featured-publications-grid {
    grid-template-columns: 1fr;
  }
}
```
This single-column override fires at 991.98px and below (tablet width). After D-07 changes the base rule to 3 columns, this breakpoint will still collapse to 1 column at ≤991px. The UI-SPEC calls for:
- 768px+: 3 columns
- 576px–767px: 2 columns
- below 576px: 1 column

**The existing `@media (max-width: 991.98px)` rule must be modified** to instead apply only at `max-width: 575.98px` for `.homepage-highlights`. The other classes in that grouped rule (`.research-question-grid`, `.featured-publications-grid`) can keep their 991.98px breakpoint or be handled separately. The safest approach is to split `.homepage-highlights` out of the grouped rule.

No existing `.selected-papers-showcase` block exists — it must be added.

---

### `_includes/selected_papers.liquid` — VERIFIED [VERIFIED: direct file read]

```liquid
<div class="publications">
  {% bibliography --group_by none --query @*[selected=true]* %}
</div>
```

Confirmed: renders a `<div class="publications">` root. The SCSS selector `.selected-papers-showcase .publications { ... }` is correct.

---

### `_layouts/bib.liquid` — VERIFIED [VERIFIED: direct file read]

The HTML structure rendered per entry (confirmed from source):

```
.selected-papers-showcase
  .publications                        ← selected_papers.liquid
    ol.bibliography                    ← jekyll-scholar output
      li                               ← one entry
        .row
          .col-sm-2.abbr               ← ONLY when enable_publication_thumbnails: true
            abbr.badge.rounded.w-100  ← venue badge (within thumbnail column)
          .col-sm-8 (thumbnails on) OR .col-sm-10 (thumbnails off)
            .title                     ← plain div, not anchor
            .author                    ← div with inline author spans/links/em
            .periodical                ← two .periodical divs: journal/conf and note
            .links.links-primary       ← PDF, DOI, Code, Website buttons
            .links.links-secondary     ← Award, Abstract, arXiv, Bib, etc.
            .badges                    ← altmetric/dimensions (conditional)
            .award.hidden              ← expandable (conditional)
            .abstract.hidden           ← expandable (conditional)
            .bibtex.hidden             ← expandable (conditional)
```

**Key finding — `enable_publication_thumbnails: true` in `_config.yml`:**

The thumbnail column (`.col-sm-2.abbr`) is active. This means the content column is `.col-sm-8`, not `.col-sm-10`. The UI-SPEC accounts for both:
```scss
ol.bibliography li .col-sm-10,
ol.bibliography li .col-sm-8 {
  padding-left: 0;
}
```
This is correct — the rule covers both variants.

**Key finding — `abbr.badge` is in `.col-sm-2.abbr`, NOT in the content column:**

The UI-SPEC says to target `ol.bibliography li abbr.badge` with `display: none` to suppress venue badges. However, the `abbr.badge` is rendered inside the `.abbr` thumbnail column div, not in the content column. Suppressing it with `display: none` will hide the badge but leave an empty `.col-sm-2` column div, which will collapse in Bootstrap's grid and may cause the content column to shift layout. This is acceptable (the column still occupies grid space but renders nothing visual), but the planner should be aware.

**Alternative approach for badge suppression:** Target `.selected-papers-showcase .abbr { display: none; }` to collapse the entire thumbnail column. Then the content column (`.col-sm-8`) would gain no additional width (Bootstrap grid does not auto-expand), but the empty space disappears. This is actually cleaner than hiding just `abbr.badge`. Planner should choose between:
1. `abbr.badge { display: none }` — hides only the badge text/link, column div remains
2. `.abbr { display: none }` — hides the entire thumbnail column

For a "showcase" feel, option 2 is cleaner.

**`.periodical` appears twice:** bib.liquid renders two `.periodical` divs — one for journal/booktitle/location/year, one for `entry.note`. Both will be styled by the same SCSS selector. If `entry.note` is empty, the second `.periodical` div renders as an empty element (no visible impact). This is fine.

**`.title` is a plain `<div>`, not an anchor.** The UI-spec interaction contract correctly states "title is not a link in bib.liquid output." No hover state needed.

**`.author > em`** wraps Daniela's own name (self-highlighting). The author SCSS rule sets a caption-size font for the `.author` div but does not reset the `em` nested style. The existing global rule for `.publications li .author > em` sets `border-bottom: 1px solid`. Within the showcase, authors are de-emphasised globally — the border-bottom on `em` may look odd at caption size. The planner may want to add `.selected-papers-showcase ol.bibliography li .author em { border-bottom: none; }` to suppress the underline, or leave it. Mark as Claude's discretion.

---

### `purgecss.config.js` — VERIFIED [VERIFIED: direct file read]

Current `safelist.greedy` array (11 entries):
```js
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
/^footer-/,
```

D-06 adds `/^selected-papers-showcase/` as entry 12. Append only; do not modify or remove any existing entries.

Note: `.bibliography`, `.title`, `.author`, `.periodical`, `.links`, `.col-sm-*`, `.row`, `.abbr`, `.badge` are standard al-folio / Bootstrap classes already handled by content scanning. Only the wrapper class needs safelisting.

---

### `_sass/_variables.scss` — VERIFIED [VERIFIED: direct file read]

All tokens referenced in the UI-SPEC are confirmed present:
- `$space-1` through `$space-12` — all defined
- `$text-caption-size: 0.75rem`
- `$text-caption-line-height: 1.4`
- `$text-body-size: 1rem`
- `$text-body-line-height: 1.65`
- `$text-title-3: 1.125rem`
- `$radius-md: 0.5rem`

No new tokens are needed. Read-only.

---

### `_sass/_themes.scss` — VERIFIED [VERIFIED: direct file read]

All CSS custom properties referenced in the UI-SPEC are confirmed present in `:root`:
- `--global-theme-color` → `#5C4B8A` (indigo-plum)
- `--global-bg-color` → `#FAFAF8`
- `--global-card-bg-color` → `#FFFFFF`
- `--global-text-color` → `#1A1A1A`
- `--global-text-color-light` → `#5E5A6E`
- `--global-divider-color` → `rgba(92, 75, 138, 0.12)`

Dark mode equivalents are also present. Dark mode is live (`enable_darkmode: true` in `_config.yml`), so all CSS custom properties are already dark-mode-safe. The new `.selected-papers-showcase` block uses only existing `var(--global-*)` tokens — no new dark-mode pairs are needed.

Read-only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scoped bibliography styling | Custom Jekyll plugin or post-processing | SCSS wrapper class targeting bib.liquid output | bib.liquid is tightly coupled; CSS cascade with specificity is the correct tool |
| Mobile grid columns | Custom JS grid | CSS `@media` breakpoints + `grid-template-columns` | Standard CSS grid breakpoints are sufficient; no JS needed |
| PurgeCSS integration | Custom CSS class preservation | `safelist.greedy` regex pattern | Already established pattern in this repo (Plan 03 precedent) |

---

## Landmines and Pitfalls

### CRITICAL: Existing `@media (max-width: 991.98px)` collapses `.homepage-highlights` to 1 column

**What goes wrong:** After D-07 changes the base rule to `repeat(3, minmax(0, 1fr))`, the existing breakpoint at 991.98px (line 975 in `_base.scss`) overrides it back to `1fr` on tablets. At 768px width (iPad), the grid would be 1 column instead of the intended 3.

**Why it happens:** The original 2-column grid needed tablet override; the grouped rule was written for all three grid classes.

**How to fix:** Split `.homepage-highlights` out of the grouped `@media (max-width: 991.98px)` rule. Add specific breakpoints for `.homepage-highlights`:
- `@media (max-width: 575.98px)`: 1 column
- `@media (min-width: 576px) and (max-width: 767.98px)`: 2 columns
- `@media (min-width: 768px)`: 3 columns (the base rule)

The other classes (`research-question-grid`, `featured-publications-grid`) can keep their 991.98px breakpoint.

**Warning sign:** On tablet viewport (768px–991px), the grid appears as a single column.

---

### MEDIUM: `.publications` global rule has `margin-top: $space-8`

**What goes wrong:** The global `.publications` rule at line 985 sets `margin-top: $space-8` (2rem). Within `.selected-papers-showcase`, the UI-SPEC overrides this to `margin-bottom: 0`, but does not override `margin-top`. The showcase's `<div class="publications">` child will have `margin-top: 2rem`, creating unexpected space below the "Main publications" heading.

**How to fix:** Add `margin-top: 0` to `.selected-papers-showcase .publications { }` alongside the existing `margin-bottom: 0`.

---

### LOW: `font-weight: 700` on `.title` in global `.publications` rule

**What it is:** The global `.publications ol.bibliography li .title` sets `font-weight: 700` (line 1051). The showcase override sets `font-weight: 600`. The showcase selector `.selected-papers-showcase ol.bibliography li .title` has higher specificity and will win. No `!important` needed, but the planner should be aware this is an override, not a fresh declaration.

---

### LOW: Two empty `.periodical` divs if `entry.note` is blank

**What it is:** bib.liquid always renders two `<div class="periodical">` elements — the second for `entry.note`. If note is empty, it renders as `<div class="periodical"></div>` — an empty div with `margin-bottom: $space-2` applied. This adds 8px of space below the venue line even when there is no note. Acceptable for now; Phase 3 content work can address if needed.

---

### LOW: `em` underline on self-author name at caption size

**What it is:** The global `.publications li .author > em` rule applies `border-bottom: 1px solid`. Within the showcase, author lines are caption-size (0.75rem). The 1px underline at that size may look heavy. Optional mitigation: `.selected-papers-showcase ol.bibliography li .author em { border-bottom: none; }`. Claude's discretion.

---

### LOW: `enable_publication_thumbnails: true` means `.col-sm-8` not `.col-sm-10`

**What it is:** With thumbnails enabled, each entry's content lives in `.col-sm-8`, not `.col-sm-10`. The UI-SPEC SCSS handles both columns. The thumbnail column (`.col-sm-2.abbr`) will be present but the badge inside it is hidden (or the column is hidden if the `.abbr` suppression approach is used). No layout breakage — just confirm the padding-left:0 rule targets the correct column class.

---

## bib.liquid HTML → SCSS Selector Verification

Full verified mapping from bib.liquid source to UI-SPEC selectors:

| bib.liquid output | SCSS selector in UI-SPEC | Match? |
|-------------------|--------------------------|--------|
| `<ol class="bibliography">` (jekyll-scholar) | `.selected-papers-showcase ol.bibliography` | CONFIRMED |
| `<li>` per entry | `.selected-papers-showcase ol.bibliography li` | CONFIRMED |
| `<div class="row">` | `.selected-papers-showcase ol.bibliography li .row` | CONFIRMED |
| `<div class="col-sm-8">` or `col-sm-10` | `.col-sm-10, .col-sm-8` | CONFIRMED (both covered) |
| `<div class="title">` | `.selected-papers-showcase ol.bibliography li .title` | CONFIRMED |
| `<div class="author">` | `.selected-papers-showcase ol.bibliography li .author` | CONFIRMED |
| `<div class="periodical">` (×2) | `.selected-papers-showcase ol.bibliography li .periodical` | CONFIRMED (both affected) |
| `<abbr class="badge rounded w-100">` | `.selected-papers-showcase ol.bibliography li abbr.badge` | CONFIRMED — but note: lives in `.col-sm-2.abbr` column |
| `<div class="links links-primary">` | `.selected-papers-showcase ol.bibliography li .links` | CONFIRMED |
| `<div class="publications">` (selected_papers.liquid) | `.selected-papers-showcase .publications` | CONFIRMED |

**One selector not in UI-SPEC that may be needed:**
`.selected-papers-showcase .publications { margin-top: 0; }` — to override the global `margin-top: $space-8` on `.publications`. See Landmines section.

---

## Phase 1 Impact on Phase 2

Phase 1 completed all three plans (Color Tokens, Typography, Footer + PurgeCSS). Relevant impacts on Phase 2:

| Phase 1 Artifact | Phase 2 Impact |
|-----------------|----------------|
| `$plum-color: #5C4B8A` in `_variables.scss` | Used via `var(--global-theme-color)` for accent bar — works as-is |
| `--font-sans` / `--font-serif` tokens in `_themes.scss` | All typography in showcase uses these tokens — works as-is |
| `safelist.greedy` structure in `purgecss.config.js` | Pattern established; Phase 2 just appends one entry |
| Dark mode tokens added for all palette values | The new showcase SCSS uses only `var(--global-*)` tokens → dark mode safe automatically |
| `_base.scss` `.hero-thesis`, `.homepage-highlights`, `.highlight-item`, `.highlight-label`, `.collaboration-cta` rules | All confirmed present; Phase 2 does not re-declare them |

No conflicts between Phase 1 deliverables and Phase 2 requirements.

---

## File Change Summary (Confirmed)

| File | Change | Lines Affected |
|------|--------|----------------|
| `_pages/about.md` | 1) `subtitle:` front matter → `"NLP Researcher · FBK"` (line 5); 2) move bio `<p>` blocks (lines 37–43) above `.homepage-highlights` div (line 22) | Lines 5, 22–43 |
| `_layouts/about.liquid` | Wrap `{% include selected_papers.liquid %}` in `<div class="selected-papers-showcase">...</div>` | Line 64 (+ wrapper open/close) |
| `_sass/_base.scss` | 1) `.homepage-highlights grid-template-columns`: `repeat(2,...)` → `repeat(3,...)` (line 297); 2) Split `.homepage-highlights` out of the `@media (max-width: 991.98px)` grouped rule (lines 975–981) and add 3 breakpoint rules; 3) Add `.selected-papers-showcase { ... }` SCSS block; 4) Add mobile showcase padding override | Lines 297, 975–981, append new blocks |
| `purgecss.config.js` | Add `/^selected-papers-showcase/` to `safelist.greedy` array | Line 19 (append after last entry) |

Read-only (do not touch):
- `_includes/selected_papers.liquid`
- `_layouts/bib.liquid`
- `_sass/_variables.scss`
- `_sass/_themes.scss`

---

## Standard Stack

| Tool | Role | Notes |
|------|------|-------|
| Jekyll + Liquid | Template rendering | `about.liquid` is the homepage template |
| jekyll-scholar | Bibliography rendering | `{% bibliography %}` tag → `bib.liquid` per entry |
| Bootstrap 5 | Grid system | `.row` / `.col-sm-*` layout within each bib entry |
| SCSS (Dart Sass) | Styling | Nested rules, `$variable` tokens, `var(--custom-property)` |
| PurgeCSS | Build-time CSS pruning | Configured in `purgecss.config.js` |
| GitHub Actions / Ruby 3.3.5 | CI/CD | Must pass after all changes |

---

## Validation Architecture

No automated test framework is configured for this repository (static Jekyll site). Validation is manual.

### Per-task checks

| Task | Manual Verification |
|------|---------------------|
| Subtitle change | `jekyll serve` → homepage → check `<p class="desc">` renders `NLP Researcher · FBK` (plain text, no link) |
| Section reorder | Homepage → scroll: hero-thesis first, bio paragraphs second, highlights grid third |
| 3-column grid | At 768px+ viewport: three `.highlight-item` cards render side-by-side |
| Grid mobile | At 576px–767px: 2 columns; below 576px: 1 column |
| Showcase wrapper | View source: `<div class="selected-papers-showcase">` wraps `<div class="publications">` |
| Showcase styling | Each paper entry has left accent bar, serif title at 1.125rem, muted author/venue at 0.75rem |
| Badge suppression | No venue badge (or no `.abbr` column) visible in showcase; badge still visible on `/publications/` page |
| PurgeCSS | Production build (`JEKYLL_ENV=production jekyll build`) → inspect CSS: `.selected-papers-showcase` rules present |

### Phase gate

All four modified files must produce a passing GitHub Actions deployment (`bundle exec jekyll build` on Ruby 3.3.5) before phase is marked complete.

---

## Environment Availability

Step 2.6: SKIPPED (no external tools needed beyond the existing Jekyll/Ruby environment already confirmed working from Phase 1).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Jekyll-scholar renders `<ol class="bibliography">` as the root list element | bib.liquid verification | [VERIFIED: bib.liquid source confirms jekyll-scholar produces `ol.bibliography`] — not actually assumed |
| A2 | `enable_publication_thumbnails: true` means `.col-sm-8` is the content column (not `.col-sm-10`) | bib.liquid / config | [VERIFIED: `_config.yml` line 375 and bib.liquid line 51] |
| A3 | Dark mode is live (`enable_darkmode: true`) | _themes.scss | [VERIFIED: `_config.yml` line 432] — new SCSS using only `var(--global-*)` tokens is automatically dark-mode safe |

**No unverified assumptions remain.** All claims in this research document are tagged VERIFIED against actual file contents.

---

## Open Questions

None blocking. All implementation decisions are resolved. The one judgment call (whether to hide `abbr.badge` only or the entire `.abbr` column) is Claude's discretion and does not affect other decisions.

---

## Sources

### PRIMARY (HIGH confidence — direct file reads)
- `_pages/about.md` — current subtitle, content block order, exact line numbers
- `_layouts/about.liquid` — exact selected_papers include location (line 64), section structure
- `_sass/_base.scss` — `.homepage-highlights` rule (lines 295–300), existing mobile breakpoint (lines 975–981), `.publications` global rule, `.hero-thesis` rule
- `_sass/_variables.scss` — all token values confirmed present
- `_sass/_themes.scss` — all CSS custom property values confirmed
- `_includes/selected_papers.liquid` — confirmed wrapper structure
- `_layouts/bib.liquid` — full HTML output structure verified
- `purgecss.config.js` — current safelist confirmed, insertion point identified
- `_config.yml` — `enable_publication_thumbnails: true`, `enable_darkmode: true` confirmed

### SECONDARY
- `.planning/phases/02-homepage-layout/02-CONTEXT.md` — locked decisions
- `.planning/phases/02-homepage-layout/02-UI-SPEC.md` — SCSS block to implement

---

## Metadata

**Confidence breakdown:**
- Section reorder (HOME-01): HIGH — file inspection confirms exact lines; pure text move
- Subtitle change (HOME-02): HIGH — front matter key identified, target value locked
- Showcase SCSS (HOME-03): HIGH — bib.liquid HTML structure fully verified; selector hierarchy confirmed
- Grid column change (D-07): HIGH — exact line identified; landmine (mobile breakpoint) documented with fix
- PurgeCSS (D-06): HIGH — safelist structure confirmed; insertion point identified

**Research date:** 2026-04-30
**Valid until:** 2026-05-30 (stable stack — Jekyll + SCSS do not change rapidly)
