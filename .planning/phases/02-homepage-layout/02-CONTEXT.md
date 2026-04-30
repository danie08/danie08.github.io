# Phase 2: Homepage Layout - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Restructure the homepage so that bio and research identity lead the page, update the subtitle to reflect research identity, and give the selected papers section a visually distinct layout. This phase touches layout and structure only — copy rewrites, paper descriptions, and news updates are Phase 3.

**Dual-audience constraint:** Every layout decision must work for both hiring committees (academic depth, credentials visible) and industry recruiters (fast scan, applied work legible). Neither audience should feel the site is not for them.

</domain>

<decisions>
## Implementation Decisions

### Section order (HOME-01)
- **D-01:** New order in `about.md` content block: hero-thesis **first**, then bio paragraphs, then highlights grid. Current order is hero-thesis → highlights → bio; bio paragraphs move above the highlights grid, hero-thesis stays at the top.
- **D-02:** The sections rendered by `about.liquid` after `{{ content }}` (News, Selected papers, Collaboration CTA, Social) stay in their current layout-controlled positions — no change to their relative order.

### Subtitle (HOME-02)
- **D-03:** Subtitle becomes `NLP Researcher · FBK`. Change the `subtitle:` key in `_pages/about.md` front matter. The middle dot (·) is the separator. Do not use a comma or dash.

### Selected papers visual layout (HOME-03)
- **D-04:** Use a CSS restyle approach — do NOT bypass the `{% bibliography %}` pipeline or touch `bib.liquid`. Add a wrapper class (`.selected-papers-showcase`) around the `{% include selected_papers.liquid %}` call in `about.liquid`, then write targeted SCSS in `_base.scss` to restyle bib.liquid's HTML output within that wrapper.
- **D-05:** The restyled layout should: use a left accent bar per entry (using `--global-theme-color`), increase title prominence, reduce venue badge visual noise, and make author lines less dominant. The goal is a showcase feel, not a citation list.
- **D-06:** The new `.selected-papers-showcase` class MUST be added to `purgecss.config.js` safelist to survive production builds.

### Highlights grid (HOME-01 / layout)
- **D-07:** Change the highlights grid from 2-column to true 3-column full-width. Update `grid-template-columns` in the `.homepage-highlights` rule in `_base.scss` from `repeat(2, minmax(0, 1fr))` to `repeat(3, minmax(0, 1fr))`. No content changes — content is Phase 3.

### Claude's Discretion
- Exact SCSS selectors used to target bib.liquid's HTML structure within `.selected-papers-showcase`
- Mobile breakpoint behavior for the 3-column grid (acceptable to stack to 1 column below ~576px)
- Spacing adjustments between the reordered sections if gaps feel off after the move

</decisions>

<specifics>
## Specific Ideas

- "The site should appeal to both academia and industry" — this is the guiding dual-audience principle for all layout decisions in this phase.
- The hero-thesis ("I study how dialogue agents can stay in character…") is the primary hook for both audiences and must remain the first visible content.
- The left accent bar treatment for selected papers should use `--global-theme-color` (indigo-plum `#5C4B8A`) to connect visually to the Phase 1 palette.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Homepage content and structure
- `_pages/about.md` — front matter (subtitle to change), content block (section reorder happens here)
- `_layouts/about.liquid` — layout template; `{% include selected_papers.liquid %}` call gets the wrapper class added here

### Styles
- `_sass/_base.scss` — all homepage-specific CSS classes live here (`.hero-thesis`, `.homepage-highlights`, `.featured-publication-card`, etc.); new `.selected-papers-showcase` styles go here
- `_sass/_variables.scss` — spacing scale (`$space-*`), radius (`$radius-md`), text size tokens — use these, do not introduce new values
- `_sass/_themes.scss` — CSS custom properties; use `var(--global-theme-color)` for accent, `var(--global-card-bg-color)` for card backgrounds

### Selected papers pipeline
- `_includes/selected_papers.liquid` — current include; renders `{% bibliography --group_by none --query @*[selected=true]* %}`. Treat as read-only; only add a wrapper div if needed.
- `_layouts/bib.liquid` — renders each bibliography entry; treat as **read-only**. SCSS targets its output HTML structure (`.bibliography li`, `.title`, `.author`, `.periodical`)

### PurgeCSS
- `purgecss.config.js` — any new CSS class families MUST be added to the safelist here

### Phase 1 context (token system rules)
- `.planning/phases/01-visual-foundation/01-CONTEXT.md` — Phase 1 decisions; critical constraints: always use `var(--global-*)` tokens, never hardcode hex, every new token needs a dark-mode pair even though dark mode is currently disabled

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`.hero-thesis`**: already styled in `_base.scss` with `clamp()` font-size, line-height, max-width, and margin — do not re-declare; it stays in place at the top.
- **`.homepage-highlights`**: currently `grid-template-columns: repeat(2, minmax(0, 1fr))` — one line change to `repeat(3, ...)` delivers D-07.
- **`.featured-publication-card` / `.featured-publications-grid`**: classes already exist in `_base.scss` with card border, radius, and padding — these are available but NOT the approach chosen; D-04 uses `.selected-papers-showcase` wrapper instead.
- **Spacing scale**: `$space-4`, `$space-6`, `$space-8` are the primary margin/gap tokens in use on the homepage — stay within this scale.

### Established Patterns
- Homepage content sections all live in `_pages/about.md` (within `{{ content }}`) — reorder is a pure `about.md` edit.
- Sections rendered by `about.liquid` (News, Selected papers, CTA, Social) are layout-controlled — their order is changed in the Liquid template, not in Markdown.
- New CSS class families must be safelisted in `purgecss.config.js` using `safelist.greedy` patterns (per Phase 1 Plan 03 precedent).

### Integration Points
- `{% include selected_papers.liquid %}` in `about.liquid` → `{% bibliography %}` → `bib.liquid` per entry. The wrapper class goes on the container in `about.liquid` (or a new wrapper div added to `selected_papers.liquid`).
- The `.bibliography` class is the root element of jekyll-scholar's rendered output — SCSS within `.selected-papers-showcase .bibliography li` is the correct targeting pattern.

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-homepage-layout*
*Context gathered: 2026-04-30*
