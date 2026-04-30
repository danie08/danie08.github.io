# Phase 2: Homepage Layout - Discussion Log

**Date:** 2026-04-30
**Phase:** 02-homepage-layout

---

## Session Summary

User opened the discussion by reframing the goal: the site must appeal to both academia and industry simultaneously. This dual-audience constraint became the guiding principle for all layout decisions.

---

## Areas Discussed

### 1. Dual-audience framing (user-initiated)
**User input:** "We need the site to be appealing for both academia and industry."
**Outcome:** Locked as the guiding constraint for Phase 2. Every layout decision was evaluated against whether it works for both hiring committees (academic depth) and industry recruiters (fast scan, applied legibility).

---

### 2. Section order

**Question:** What order should the homepage content blocks use?

**Options presented:**
- Hero-thesis first → bio paragraphs → highlights grid *(recommended)*
- Bio paragraphs first → hero-thesis → highlights grid
- Highlights grid first → hero-thesis → bio paragraphs

**User selection:** Hero-thesis first (recommended)

**Rationale:** The research statement ("I study how dialogue agents can stay in character…") is the strongest hook for both audiences in one sentence. Bio paragraphs follow for depth, then highlights grid closes as a credentials snapshot.

---

### 3. Subtitle wording

**Question:** What should the subtitle beneath Daniela's name say?

**Options presented:**
- "NLP Researcher · FBK" *(recommended)*
- "NLP Researcher, persona-based dialogue generation"
- "NLP Researcher · Conversational AI"

**User selection:** "NLP Researcher · FBK"

**Rationale:** Short and scannable. Leads with the research identity ("NLP Researcher"), then the institutional affiliation. Works on both a business card and a faculty evaluation.

---

### 4. Selected papers visual layout

**Question:** How should the selected papers section be made visually distinct from the default al-folio card grid?

**Options presented:**
- CSS restyle of bib.liquid output via a wrapper container class *(recommended)*
- Custom HTML cards in about.md (bypasses bib pipeline, manual maintenance)

**User selection:** CSS restyle (recommended)

**Rationale:** Keeps the jekyll-scholar pipeline intact (auto-syncs with papers.bib), avoids duplicating content, and bib.liquid is treated as read-only. New `.selected-papers-showcase` wrapper class targets bib.liquid's HTML output with accent bars, larger titles, reduced venue badge noise.

---

### 5. Highlights grid

**Question:** Should the 3-cell Research/Applied AI/Engineering grid change layout after moving below the bio?

**Options presented:**
- Keep grid as-is (2-column, 3rd cell wraps)
- Restructure to 3-column full-width
- You decide (Claude's discretion)

**User selection:** Restructure to 3-column full-width

**Rationale:** A true 3-column layout is visually cleaner and eliminates the awkward wrap. One CSS property change in `.homepage-highlights`. Content stays as-is (Phase 3 territory).

---

## Deferred Ideas

None — discussion stayed within phase scope.

---

## Claude's Discretion Items

- Exact SCSS selectors for targeting bib.liquid output within `.selected-papers-showcase`
- Mobile breakpoint stacking behavior for the 3-column highlights grid
- Spacing adjustments between reordered sections
