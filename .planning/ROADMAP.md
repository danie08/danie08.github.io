# Roadmap: danie08.github.io — Academic Website Redesign

## Overview

The redesign moves from the generic al-folio default look to a distinctive, warm visual identity that immediately communicates who Daniela is as a researcher. The work runs in strict dependency order: design tokens first (they propagate site-wide automatically), then homepage hierarchy (the highest-stakes page), then content accuracy (kept separate to protect research voice), then a pre-launch validation pass. Four phases, 14 requirements, one cohesive site.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Visual Foundation** - Custom color palette and typography applied site-wide via the CSS token system
- [ ] **Phase 2: Homepage Layout** - Section hierarchy reordered so bio and research identity lead; selected papers visually improved
- [ ] **Phase 3: Content Accuracy** - PhD status, bio, paper summaries, news, and SEO meta descriptions updated
- [ ] **Phase 4: Pre-Launch Checks** - Accessibility CI re-enabled; WCAG contrast, PurgeCSS safelist, and mobile viewports verified

## Phase Details

### Phase 1: Visual Foundation
**Goal**: Visitors see a distinctive color palette and intentional typography across every page of the site — al-folio's default blue and Roboto are gone
**Depends on**: Nothing (first phase)
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04
**Success Criteria** (what must be TRUE):
  1. Every page uses the new indigo-plum accent color — no instances of the al-folio default `#0076df` remain visible
  2. Body text renders in Inter and headings render in Source Serif 4 site-wide — Roboto is not loaded or applied
  3. The footer no longer contains any "powered by al-folio" attribution text or link
  4. PurgeCSS safelist is configured so that all new custom CSS class families survive a production build without being stripped
**Plans**: TBD
**UI hint**: yes

### Phase 2: Homepage Layout
**Goal**: The homepage opens with Daniela's bio and research identity before credentials, and the selected papers section uses an improved visual layout
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03
**Success Criteria** (what must be TRUE):
  1. The personal bio and origin story appear above the highlights/credentials grid when a visitor loads the homepage
  2. The subtitle beneath Daniela's name leads with her research identity ("NLP Researcher, persona-based dialogue generation") rather than just her employer title
  3. The selected papers section on the homepage uses a visual layout that is clearly distinct from the default al-folio card grid
**Plans**: TBD
**UI hint**: yes

### Phase 3: Content Accuracy
**Goal**: All site copy is factually current and professionally complete — PhD status correct, paper descriptions plain-language, news fresh, SEO meta tags present
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. The news section contains entries covering recent 2024–2025 milestones and no broken permalink formats remain
  2. The bio and about page consistently state that Daniela completed her PhD in 2025 with honors — no "completing a PhD" phrasing remains
  3. Each paper on the publications page includes a plain-language one-line description (not raw BibTeX abstract)
  4. Pasting the site URL or any page URL into a social media link preview tool shows a correct title and meta description
**Plans**: TBD

### Phase 4: Pre-Launch Checks
**Goal**: The site passes accessibility, contrast, mobile, and build-integrity checks before going live
**Depends on**: Phase 3
**Requirements**: QUAL-01, QUAL-02, QUAL-03
**Success Criteria** (what must be TRUE):
  1. The new color palette passes WCAG AA contrast ratios — body text at 4.5:1 minimum and large text at 3:1 minimum against all background colors used
  2. The axe accessibility CI workflow runs automatically on every push (not manual-dispatch only) and passes without errors
  3. All modified pages render correctly on 375px and 768px viewport widths — no clipped text, broken layouts, or overflowing elements
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Visual Foundation | 0/TBD | Not started | - |
| 2. Homepage Layout | 0/TBD | Not started | - |
| 3. Content Accuracy | 0/TBD | Not started | - |
| 4. Pre-Launch Checks | 0/TBD | Not started | - |
