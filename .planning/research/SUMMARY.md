# Project Research Summary

**Project:** danie08.github.io — Academic Website Redesign
**Domain:** Academic personal website — Jekyll/al-folio visual redesign (no stack migration)
**Researched:** 2026-04-30
**Confidence:** HIGH (all findings grounded in direct codebase inspection)

---

## Executive Summary

This is a visual identity and content quality redesign, not a rebuild. The existing Jekyll/GitHub Pages/al-folio stack is a fixed constraint — the work happens entirely within the existing SCSS layer. The site already has strong bones: solid content, a functioning two-layer design token system (SCSS primitives in `_variables.scss` + runtime CSS custom properties in `_themes.scss`), and custom components that exceed vanilla al-folio. The core problem is narrow: the site uses al-folio defaults for color, typography, and homepage hierarchy, which makes it indistinguishable from hundreds of other academic sites. The fix is proportionally narrow too — changing a handful of CSS custom property values and the Google Fonts URL transforms the entire visual identity with minimal breakage risk.

The recommended approach is to work in strict phase order: color palette first (single change propagates site-wide via CSS custom properties), typography second (locks in personality before layout work), global surface treatment third, then homepage layout, then cross-page consistency, then content. This order is dictated by the architecture — downstream styles consume design tokens, so tokens must be correct before component-level work begins. Content phases are explicitly separated from visual phases to protect research writing quality from inadvertent simplification during styling iterations.

The top risks are technical, not conceptual. PurgeCSS silently strips CSS classes not found in static HTML (invisible in local builds, broken in production), hardcoded hex colors break dark mode, and the Google Fonts switch can cause layout shift if fallback metrics are not set. All three are well-understood and preventable with specific, low-effort mitigations. The credibility risks — making the site feel like a different template, or losing research voice during copy edits — are equally important and require a design review gate after the visual identity phase.

---

## Key Findings

### Recommended Stack

No stack migration. Jekyll, GitHub Pages, Bootstrap 5, and jekyll-scholar are fixed. The "stack" decision is which customization technique to use within the existing SCSS layer — and the answer is: edit the existing files directly, never create a parallel override file.

**Core files to change (complete surface area for visual redesign):**
- `_sass/_variables.scss` — add new color primitives and font-stack variables (build-time)
- `_sass/_themes.scss` — remap `--global-theme-color` and related tokens for both light and dark (runtime)
- `_sass/_base.scss` — apply `font-family` to `body` and headings; new component rules
- `_config.yml` — update Google Fonts URL (one line) and remove al-folio footer attribution

**Recommended design decisions:**
- Typography: Inter (body/UI) + Source Serif 4 (headings). Humanist pairing that reads as scholarly without being ostentatious. Both available as variable fonts on Google Fonts; single URL covers both.
- Color: Indigo-plum `#5C4B8A` as primary accent (warm, distinctive, uncommon in academic sites); warm off-white `#FAFAF8` backgrounds; near-black `#1A1A1A` body text.
- Font loading: `css2?` Google Fonts API with `display=swap`; URL updated in `_config.yml` only — no SCSS changes needed for loading.

### Expected Features

**Must have (table stakes) — currently present, must not regress:**
- Name + affiliation above the fold, profile photo, publications list with working badges
- CV page (PDF currently missing — content audit H1, must be added)
- Contact and social links, mobile-responsive layout
- Working internal links (currently 3 broken in `_pages/projects.md`)

**Must have (table stakes) — currently missing or broken:**
- Custom color palette — site uses al-folio default `#0076df`; instant template signal
- Updated PhD status throughout — site still reads "completing a PhD" after 2025 defense with honors
- Subtitle leading with research identity ("NLP Researcher, persona-based dialogue") not affiliation
- Page meta descriptions for About and Publications (currently absent)
- al-folio footer attribution removed from `_config.yml`

**Should have (differentiators):**
- Inter + Source Serif 4 typeface pairing — signals intentionality immediately
- Homepage section reorder: hero → origin bio → research vision → highlights → publications (currently: highlights arrive before bio, burying the origin story)
- Research question grid with distinct visual treatment vs. other homepage cards
- Plain-language paper summaries on selected publications (currently raw BibTeX abstracts)
- News items with photo coverage for all major 2024–2025 milestones
- "Open to / looking for" signal for hiring audiences in the Currently card

**Defer:**
- Blog or research notes section (explicitly out of scope in PROJECT.md)
- Self-hosted font files (GDPR optimization — not launch-blocking)
- Complete class-prefix namespace refactor (low urgency, no current conflicts)

### Architecture Approach

The codebase uses a clean four-layer system: (1) SCSS primitives in `_variables.scss`, (2) runtime CSS custom properties in `_themes.scss`, (3) component styles in `_base.scss`/`_layout.scss` that consume only CSS custom properties, (4) Liquid templates and Markdown content files. This means a color change in layer 2 propagates automatically to every component — navbar, cards, links, badges, blockquotes, progress bar, and search overlay all update from a single file edit. Dark mode is handled automatically by the same token system. Working with this architecture is the single most important implementation principle.

**Component boundary map:**

| Concern | Files to edit |
|---------|--------------|
| Color palette | `_variables.scss` (primitives) + `_themes.scss` (token remapping, both light and dark blocks) |
| Typography | `_config.yml` (Google Fonts URL) + `_variables.scss` (font-family vars) + `_base.scss` (apply to body/headings) |
| Homepage structure | `_pages/about.md` (section order, copy) + `_layouts/about.liquid` (template sections, collaboration CTA) |
| Homepage component styles | `_sass/_base.scss` lines 281–432 |
| Publications styling | `_sass/_base.scss` — treat `bib.liquid` as read-only |
| CV styling | `_sass/_cv.scss` + `_sass/_base.scss` |
| Content | `_news/*.md`, `_pages/about.md`, `_bibliography/papers.bib`, `_data/cv.yml` |

### Critical Pitfalls

1. **PurgeCSS silently strips new CSS classes in production** — Local builds never trigger PurgeCSS; CI does. JS-toggled classes or classes in Liquid conditionals are stripped silently. Prevention: add `safelist` entries to `purgecss.config.js` for every new class family introduced during redesign. Spot-check live site after every deploy.

2. **Hardcoded hex colors break dark mode** — Every color in `_base.scss` and `_layout.scss` must use `var(--global-*)` tokens, not hex literals. Any hex value baked into a component file will not respond to the theme toggle. Prevention: grep for hex literals before each phase closes: `grep -n '#[0-9a-fA-F]\{3,6\}' _sass/_base.scss _sass/_layout.scss`. Add new colors to both `:root` and `html[data-theme="dark"]` in `_themes.scss`.

3. **Google Fonts switch causes layout shift (CLS)** — Different typeface metrics produce visible text reflow on load if the fallback stack is not updated. Prevention: `display=swap` in the Google Fonts URL (already planned in STACK.md); define a CSS fallback stack with close metrics; check Lighthouse CLS after Phase 1.

4. **`bib.liquid` is tightly coupled to CSS class names** — The publication layout uses `btn-primary-link`, `btn-outline-link`, and JS-driven abstract expand/collapse. Renaming those classes in `_base.scss` silently breaks publications. Prevention: treat `bib.liquid` as read-only during visual phases; grep for class names in `bib.liquid` before removing any CSS rule.

5. **Sass `@use` module system** — `_variables.scss` uses modern `@use "sass:color"`. Adding overrides via the old `@import` pattern will silently fail. Prevention: always edit `_variables.scss` directly; never shadow it from an external partial.

---

## Implications for Roadmap

### Phase 1: Visual Foundation — Color and Typography
**Rationale:** The token system means Phase 1 propagates everywhere automatically. Establishing palette and typefaces first gives an instant preview of the full redesigned site, and all subsequent phases inherit correct visual context. This is also the highest-risk phase for Pitfalls 2, 3, and 5 — addressing them first while the changeset is small makes debugging tractable.
**Delivers:** Indigo-plum palette live across all pages; Inter + Source Serif 4 replacing Roboto; warm off-white backgrounds; al-folio blue and Roboto gone.
**Files:** `_config.yml`, `_sass/_variables.scss`, `_sass/_themes.scss`, `_sass/_base.scss`
**Addresses:** Custom color palette (table stakes), typography (differentiator), footer attribution removal
**Avoids:** Pitfall 2 (hex colors), Pitfall 3 (FOUT/CLS), Pitfall 5 (Sass module system)

### Phase 2: Homepage Layout and Hierarchy
**Rationale:** Homepage is the highest-stakes page and entirely self-contained — changes here do not affect publications, CV, or projects. Safe to iterate. Phase 2 happens after Phase 1 so layout decisions are made in the context of the final color and type system.
**Delivers:** Bio origin story above highlights grid; research questions with distinct visual weight; collaboration CTA with visual breathing room; profile photo treatment reviewed.
**Files:** `_pages/about.md`, `_layouts/about.liquid`, `_sass/_base.scss`
**Addresses:** Homepage section order (structural anti-feature), research question grid treatment, collaboration CTA visual hierarchy
**Avoids:** Pitfall 1 (PurgeCSS — add safelist for any new class names), Pitfall 7 (Bootstrap conflicts — use consistent class prefixes)

### Phase 3: Cross-Page Visual Consistency
**Rationale:** Secondary pages (publications, CV, projects, news) inherit most visual updates from Phase 1 automatically via the token system. This phase is narrow — section heading treatment, spacing rhythm in publication lists, CV card styling. Should be done after homepage is stable.
**Delivers:** Publications, CV, and Projects pages feel like the same site as the homepage. Section headings treated consistently.
**Files:** `_sass/_base.scss` (publications, CV), `_sass/_cv.scss`
**Addresses:** Visual consistency across all pages (PROJECT.md active requirement)
**Avoids:** Pitfall 4 (bib.liquid coupling — style via CSS only, never touch bib.liquid structure)

### Phase 4: Content Fixes and Copy Updates
**Rationale:** Content is separated from visual phases deliberately — research voice can be accidentally degraded if copy edits happen during styling iterations (Pitfall 14). This phase addresses all content gaps identified in the audits.
**Delivers:** PhD status correct throughout; subtitle leads with research identity; "Currently" section accurate; 2–3 selected papers have plain-language summaries; news has photo coverage for 2024–2025 milestones; broken links fixed; meta descriptions added; CV PDF linked.
**Files:** `_pages/about.md`, `_news/*.md`, `_bibliography/papers.bib`, `_data/cv.yml`, `_pages/publications.md`
**Addresses:** PhD status (credibility), subtitle (table stakes), stale content (Pitfall 15), broken links, paper summaries (differentiator), SEO meta descriptions
**Avoids:** Pitfall 14 (research voice — add specificity, never remove it), Pitfall 15 (stale news)

### Phase 5: Pre-Launch Checks
**Rationale:** Integration verification pass before launch. Not new feature work. Accessibility CI is currently manual-dispatch only — re-enabling automated triggers is essential before going live.
**Delivers:** Accessibility workflow re-enabled; WCAG contrast ratios verified for new palette; PurgeCSS safelist confirmed complete; SRI hashes verified; mobile layout spot-checked; news section current.
**Files:** `.github/workflows/axe.yml`, `purgecss.config.js`
**Avoids:** Pitfall 1 (PurgeCSS final check), Pitfall 11 (SRI hashes), Pitfall 12 (accessibility CI)

### Phase Ordering Rationale

- **Tokens before components:** The CSS custom property architecture requires Phase 1 to precede all visual phases. Wrong color tokens at the foundation means rework in every subsequent phase.
- **Homepage before secondary pages:** Homepage has the most custom HTML and highest audience impact. It is self-contained, so stabilizing it first gives a reference point for Phase 3.
- **Visual before content:** Keeping visual and content work in separate phases protects research writing from inadvertent simplification. Content editors should work in a visually stable environment.
- **Checks last:** Pre-launch verification only makes sense after all changes are in.

### Research Flags

No phase in this project needs a dedicated research phase. All implementation paths are confirmed from direct codebase inspection.

Standard patterns (skip research phase):
- **Phase 1:** CSS custom property workflow directly verified; font loading mechanism traced end-to-end
- **Phase 2:** Homepage is static HTML reordering — straightforward
- **Phase 3:** Token system handles most consistency automatically
- **Phase 4:** Pure content work with clear audit findings
- **Phase 5:** Known checklist items

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack / customization technique | HIGH | CSS custom property chain traced end-to-end; Sass module system confirmed; font loading mechanism verified |
| Features — current state | HIGH | Based on direct inspection of all key files and existing audit reports |
| Features — "what makes a memorable academic site" | MEDIUM | Based on al-folio ecosystem and academic web conventions (Aug 2025 knowledge cutoff); not verified against live examples |
| Architecture | HIGH | Compilation chain traced from `main.scss` through all partials; component boundary map from actual file inspection |
| Pitfalls — technical | HIGH | PurgeCSS config inspected directly; dark mode mechanism verified; bib.liquid coupling verified |
| Color palette specific hex values | MEDIUM | Principled design reasoning; specific values need WCAG contrast validation before Phase 1 closes |
| Font pairing recommendation | MEDIUM-HIGH | Based on typographic principles and domain knowledge; not tested against live 2025 examples |

**Overall confidence:** HIGH for implementation path. MEDIUM for specific aesthetic choices (final hex values, type scale adjustments after font swap).

### Gaps to Address

- **WCAG contrast ratios:** The recommended palette (`#5C4B8A` on `#FAFAF8`, `#1A1A1A` text) should be validated for WCAG AA (4.5:1 body, 3:1 large text) before Phase 1 closes. If the theme accent fails as a text color on backgrounds, adjust lightness of text, not the accent hue.
- **Profile photo decision:** Two photos exist (`prof_pic.jpeg`, `prof_pic_color.jpeg`). Research recommends the color version with a bolder treatment, but exact crop and size should be decided visually with the new palette in place (Phase 2).
- **"Open to" signal wording:** Adding a hiring-audience signal to the Currently card is recommended, but exact wording depends on Daniela's actual current goals — a content question for Phase 4, not a research question.
- **Bootstrap bleed-through audit:** Bootstrap 5 custom properties have not been fully enumerated for elements that bleed through (forms, tables, modals). Only address if bleed-through is visible after Phase 1.

---

## Sources

### Primary (HIGH confidence — direct codebase inspection)
- `_sass/_variables.scss`, `_sass/_themes.scss`, `_sass/_base.scss`, `_sass/_layout.scss`
- `_config.yml`, `_includes/head.liquid`, `_layouts/about.liquid`, `_pages/about.md`
- `_layouts/bib.liquid`, `.github/workflows/deploy.yml`, `purgecss.config.js`
- `reports/content-audit-2026-03-17.md`, `reports/a11y-audit-2026-03-17.md`, `reports/seo-audit-2026-03-17.md`
- `.planning/codebase/CONCERNS.md`

### Secondary (MEDIUM confidence — knowledge-based)
- Google Fonts API v2 patterns — font URL format, variable font axes, `display=swap`
- WCAG 2.1 contrast requirements — 4.5:1 body text, 3:1 large text
- al-folio theme ecosystem conventions — dark mode pattern, PurgeCSS integration, jekyll-scholar coupling
- Academic web design conventions for NLP/CS researcher sites as of August 2025

---
*Research completed: 2026-04-30*
*Ready for roadmap: yes*
