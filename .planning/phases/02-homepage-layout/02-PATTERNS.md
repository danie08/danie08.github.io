# Phase 2: Homepage Layout - Pattern Map

**Mapped:** 2026-04-30
**Files analyzed:** 4
**Analogs found:** 4 / 4

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `_pages/about.md` | content/config | transform | itself (existing front matter + content) | exact — edit in place |
| `_layouts/about.liquid` | layout template | request-response | itself (existing selected papers block, lines 59–65) | exact — edit in place |
| `_sass/_base.scss` | stylesheet | transform | itself (existing `.homepage-highlights` rule, lines 295–300; existing mobile breakpoint, lines 975–981; existing Phase 1 homepage blocks) | exact — edit in place |
| `purgecss.config.js` | build config | transform | itself (existing `safelist.greedy` array, lines 7–19) | exact — edit in place |

All four files are self-referential analogs — each is already the authoritative source for its own pattern. The extractions below give the executor the exact existing code to read before making targeted edits.

---

## Pattern Assignments

### `_pages/about.md` (content/config, transform)

**Analog:** itself

**Change 1 — Subtitle front matter (line 5):**

Current value (line 5):
```yaml
subtitle: Researcher at <a href='https://www.fbk.eu/en/'>Fondazione Bruno Kessler</a>.
```

Target value:
```yaml
subtitle: "NLP Researcher · FBK"
```

Rule: plain text only, middle dot U+00B7 as separator, YAML-quoted for safety.

**Change 2 — Content block reorder (lines 18–43):**

Current order in the content block (lines 18–43):
```
lines 18–20:  <p class="hero-thesis">...</p>          ← stays at top
lines 22–35:  <div class="homepage-highlights">...</div>  ← currently SECOND
lines 37–43:  <p>...</p> <p>...</p>                    ← currently THIRD
```

Target order:
```
lines 18–20:  <p class="hero-thesis">...</p>          ← stays at top (no change)
              <p>...</p> <p>...</p>                    ← bio paragraphs move UP (currently lines 37–43)
              <div class="homepage-highlights">...</div>  ← highlights move DOWN (currently lines 22–35)
```

Implementation: cut lines 37–43 (two `<p>` tags) and paste them between the `.hero-thesis` paragraph (line 20) and the `.homepage-highlights` div (line 22). No content changes; tags are already correct.

**Full current content block for reference (lines 18–43):**
```liquid
<p class="hero-thesis">
  I study how dialogue agents can stay in character as the persona they are playing, while adapting to the person they are speaking with.
</p>

<div class="homepage-highlights" aria-label="Areas of expertise">
  <div class="highlight-item">
    <span class="highlight-label">Research</span>
    <p>Persona-based dialogue, interlocutor adaptation, LLM evaluation</p>
  </div>
  <div class="highlight-item">
    <span class="highlight-label">Applied AI</span>
    <p>RAG systems, conversational agents, retrieval pipelines</p>
  </div>
  <div class="highlight-item">
    <span class="highlight-label">Engineering</span>
    <p>Production NLP, REST APIs, Docker</p>
  </div>
</div>

<p>
  I research and build conversational AI. As a Researcher at the Language and Dialogue Technologies (<a href="https://land.fbk.eu/">LanD</a>) group at Fondazione Bruno Kessler (<a href="https://www.fbk.eu/en/">FBK</a>) in Trento, I work on persona-based dialogue generation alongside production-ready NLP systems, RAG pipelines, conversational agents, and LLM fine-tuning for applied settings.
</p>

<p>
  I completed a PhD in Information Engineering and Computer Science at the <a href="https://www.unitn.it/en/">University of Trento</a> and FBK, with honors. My thesis addresses a gap in persona-based dialogue research: most systems learn to generate responses consistent with the persona the agent is playing, but ignore the conversational partner. I study how models can balance staying in character with adapting to different interlocutors.
</p>
```

---

### `_layouts/about.liquid` (layout template, request-response)

**Analog:** itself

**Selected papers block — current (lines 59–65):**
```liquid
<!-- Selected papers -->
{% if page.selected_papers %}
  <h2>
    <a href="{{ '/publications/' | relative_url }}" class="section-link">Main publications</a>
  </h2>
  {% include selected_papers.liquid %}
{% endif %}
```

**Target state after D-04:**
```liquid
<!-- Selected papers -->
{% if page.selected_papers %}
  <h2>
    <a href="{{ '/publications/' | relative_url }}" class="section-link">Main publications</a>
  </h2>
  <div class="selected-papers-showcase">
    {% include selected_papers.liquid %}
  </div>
{% endif %}
```

Rule: the `<div class="selected-papers-showcase">` wrapper goes around line 64 only (`{% include selected_papers.liquid %}`). The `<h2>` heading stays outside the wrapper — it is not scoped by the SCSS. `selected_papers.liquid` is read-only; the wrapper lives in `about.liquid` only.

**Pattern for conditional include wrapper** — follow the same indentation style as the existing `{% if page.news %}` block (lines 44–49):
```liquid
{% if page.news and site.announcements.enabled %}
  <h2>
    <a href="{{ '/news/' | relative_url }}" class="section-link">News</a>
  </h2>
  {% include news.liquid limit=true %}
{% endif %}
```

---

### `_sass/_base.scss` (stylesheet, transform)

**Analog:** itself — three distinct edit sites plus one new block appended.

#### Edit 1 — `.homepage-highlights` column change (line 297)

Current rule (lines 295–300):
```scss
.homepage-highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $space-4;
  margin: $space-6 0 $space-8;
}
```

Change only line 297: `repeat(2, minmax(0, 1fr))` → `repeat(3, minmax(0, 1fr))`.
All other properties stay unchanged.

#### Edit 2 — Mobile breakpoint split (lines 975–981)

Current grouped rule:
```scss
@media (max-width: 991.98px) {
  .homepage-highlights,
  .research-question-grid,
  .featured-publications-grid {
    grid-template-columns: 1fr;
  }
}
```

Target state — split `.homepage-highlights` out of the group; the other two classes keep their 991.98px breakpoint:
```scss
@media (max-width: 991.98px) {
  .research-question-grid,
  .featured-publications-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575.98px) {
  .homepage-highlights {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .homepage-highlights {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

The base rule (after Edit 1) already handles 768px+: 3 columns. These two media queries cover the sub-768px cases.

**Token and style pattern to match** — copy indentation style from the existing mobile rule at lines 975–981 and from the Phase 1 grid patterns (two-space indent, `@media` on its own line).

#### Edit 3 — New `.selected-papers-showcase` block (append after line 981 or end of file)

There is no existing `.selected-papers-showcase` block. Append as a new section after the existing mobile breakpoint rules. Follow the comment header style used for other major sections in `_base.scss` (single-line `//` comment with a descriptor).

**Full block to add:**
```scss
// ─── Selected Papers Showcase (Phase 2, D-04/D-05) ───────────────────────────
// Targets bib.liquid HTML output within the homepage showcase wrapper only.
// bib.liquid is read-only — do not modify it. Selectors derived from its output.

.selected-papers-showcase {
  .publications {
    margin-top: 0;
    margin-bottom: 0;
  }

  ol.bibliography {
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
  }

  ol.bibliography li {
    position: relative;
    padding: $space-6 $space-4 $space-6 calc(#{$space-4} + 4px);
    border-bottom: 1px solid var(--global-divider-color);
    border-left: 3px solid var(--global-theme-color);
    margin-left: 0;

    &:last-child {
      border-bottom: none;
    }
  }

  // Title — increased prominence (D-05)
  ol.bibliography li .title {
    font-family: var(--font-serif);
    font-size: $text-title-3;
    font-weight: 600;
    line-height: 1.3;
    color: var(--global-text-color);
    margin-bottom: $space-2;
  }

  // Author line — less dominant (D-05)
  ol.bibliography li .author {
    font-size: $text-caption-size;
    font-weight: 400;
    color: var(--global-text-color-light);
    margin-bottom: $space-2;
  }

  // Venue / year — reduced noise (D-05)
  ol.bibliography li .periodical {
    font-size: $text-caption-size;
    font-weight: 400;
    color: var(--global-text-color-light);
    margin-bottom: $space-2;

    em {
      font-style: normal;
      color: var(--global-text-color-light);
    }
  }

  // Venue badge — suppress within showcase; still visible on /publications/ page
  ol.bibliography li abbr.badge {
    display: none;
  }

  // Links row — keep compact
  ol.bibliography li .links {
    margin-top: $space-2;
  }

  // Bootstrap .row inside li — remove default gutters
  ol.bibliography li .row {
    margin-left: 0;
    margin-right: 0;
  }

  ol.bibliography li .col-sm-10,
  ol.bibliography li .col-sm-8 {
    padding-left: 0;
  }
}

// Showcase mobile padding reduction
@media (max-width: 575.98px) {
  .selected-papers-showcase ol.bibliography li {
    padding: $space-4 $space-3 $space-4 calc(#{$space-3} + 4px);
  }
}
```

**Notes on this block:**
- `margin-top: 0` on `.publications` is required to override the global `.publications { margin-top: $space-8; }` rule at line 985 — without it there will be 2rem of unexpected space below the section heading.
- `abbr.badge { display: none }` hides only the badge text; the `.col-sm-2.abbr` column div remains but collapses visually (acceptable per RESEARCH.md).
- All tokens (`$space-*`, `$text-*`, `$radius-md`) are confirmed present in `_variables.scss`. No new tokens needed.
- All custom properties (`var(--global-*)`) are confirmed in `_themes.scss` and are dark-mode safe.
- `.selected-papers-showcase` specificity wins over the global `.publications ol.bibliography li .title { font-weight: 700 }` rule at line 1051 — no `!important` needed.

**Existing style patterns to match:**

Nested SCSS pattern from `.highlight-item` (lines 314–322) — same nesting depth and `$space-*` token usage:
```scss
.highlight-item {
  padding: $space-4;

  p {
    margin-bottom: 0;
    font-size: $text-small-size;
    line-height: $text-small-line-height;
  }
}
```

`var(--global-theme-color)` accent usage from `.highlight-label` (lines 324–333):
```scss
.highlight-label,
.featured-publication-label {
  display: inline-block;
  margin-bottom: $space-2;
  color: var(--global-theme-color);
  font-size: $text-caption-size;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

`var(--global-divider-color)` border usage from `.highlight-item` group (lines 302–312):
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

---

### `purgecss.config.js` (build config, transform)

**Analog:** itself

**Current `safelist.greedy` array (lines 7–19):**
```js
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
    /^footer-/,
  ],
},
```

**Target state — append one entry at the end of the array (after `/^footer-/,`):**
```js
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
    /^footer-/,
    /^selected-papers-showcase/,
  ],
},
```

Rule: append only. Do not modify or remove any existing entries. Match the existing pattern: regex literal, trailing comma, same indentation (6 spaces).

---

## Shared Patterns

### Token usage (applies to all SCSS edits)

**Source:** `_sass/_variables.scss` (read-only) and `_sass/_themes.scss` (read-only)

Never hardcode hex or pixel values. All spacing uses `$space-*` tokens. All type sizes use `$text-*` tokens. All colors use `var(--global-*)` custom properties.

Token reference confirmed available:
- Spacing: `$space-1` (0.25rem), `$space-2` (0.5rem), `$space-3` (0.75rem), `$space-4` (1rem), `$space-6` (1.5rem), `$space-8` (2rem), `$space-12` (3rem)
- Type: `$text-caption-size` (0.75rem), `$text-caption-line-height` (1.4), `$text-title-3` (1.125rem), `$radius-md` (0.5rem)
- Colors: `var(--global-theme-color)` (#5C4B8A), `var(--global-bg-color)`, `var(--global-card-bg-color)`, `var(--global-text-color)`, `var(--global-text-color-light)` (#5E5A6E), `var(--global-divider-color)`

### Section heading pattern (applies to `about.liquid`)

All section headings in `about.liquid` use the same pattern — a `<h2>` containing an `<a class="section-link">` — and the heading stays outside any content wrapper. Do not move the `<h2>` inside `.selected-papers-showcase`.

### Safelist greedy pattern (applies to `purgecss.config.js`)

Established in Phase 1 Plan 03. Any new top-level CSS class family used only on the homepage (not present in `.html` source files scanned by PurgeCSS) must be added as a `/^classname/` regex to `safelist.greedy`. The pattern covers the root class and any subclasses sharing the same prefix.

---

## No Analog Found

None — all four files are present in the codebase and serve as their own analogs. The executor edits existing files at identified line numbers.

---

## Metadata

**Analog search scope:** `_pages/`, `_layouts/`, `_sass/`, project root (`purgecss.config.js`)
**Files read:** 6 (`about.md`, `about.liquid`, `_base.scss` targeted sections, `purgecss.config.js`, `02-CONTEXT.md`, `02-RESEARCH.md`, `02-UI-SPEC.md`)
**Pattern extraction date:** 2026-04-30
**Valid until:** stable (static Jekyll site; no dependency churn expected)
