# Requirements — danie08.github.io Website Redesign

## v1 Requirements

### Visual Identity

- [ ] **VIS-01**: User sees a custom color palette (warm, non-al-folio blue) applied site-wide via CSS tokens in `_themes.scss` and `_variables.scss`
- [x] **VIS-02**: User sees intentional typography — a body font and a display/heading font — replacing Roboto defaults site-wide
- [ ] **VIS-03**: Footer no longer shows the al-folio "powered by" attribution
- [ ] **VIS-04**: PurgeCSS safelist configured so custom CSS classes survive production builds without being silently stripped

### Homepage

- [ ] **HOME-01**: Homepage opens with bio and origin story before credentials/highlights (section reorder in `about.md` and `about.liquid`)
- [ ] **HOME-02**: Subtitle reflects research identity (NLP / persona-based dialogue generation), not just employer title
- [ ] **HOME-03**: Selected papers section on the homepage uses an improved visual layout

### Content

- [ ] **CONT-01**: News section updated with recent achievements; broken permalink format fixed
- [ ] **CONT-02**: Bio text reflects PhD completed 2025 with honors
- [ ] **CONT-03**: Publications page includes a plain-language 1-line description for each paper
- [ ] **CONT-04**: All pages have SEO meta descriptions for correct social media link previews

### Quality

- [ ] **QUAL-01**: New color palette validated at WCAG AA contrast ratios (4.5:1 body text, 3:1 large text)
- [ ] **QUAL-02**: axe accessibility CI workflow re-enabled in GitHub Actions
- [ ] **QUAL-03**: All modified pages verified on mobile viewports

---

## v2 Requirements (Deferred)

- Research question grid with distinct visual weight enhancement
- Cross-page visual audit for publications, CV, projects, and news pages (secondary pages inherit palette/type from Phase 1 automatically; deep per-page audit deferred)
- Blog or research notes section
- Dedicated talks/media page

---

## Out of Scope

- Server-side functionality — static site only
- New page types or sections — redesign of existing pages only
- Dark mode redesign — currently disabled; dark mode CSS risks documented but out of scope
- Backend/CMS — no content management system

---

## Traceability

_Filled by roadmapper._

| REQ-ID | Phase | Status |
|--------|-------|--------|
| VIS-01 | Phase 1 — Visual Foundation | Not started |
| VIS-02 | Phase 1 — Visual Foundation | Complete |
| VIS-03 | Phase 1 — Visual Foundation | Not started |
| VIS-04 | Phase 1 — Visual Foundation | Not started |
| HOME-01 | Phase 2 — Homepage Layout | Not started |
| HOME-02 | Phase 2 — Homepage Layout | Not started |
| HOME-03 | Phase 2 — Homepage Layout | Not started |
| CONT-01 | Phase 3 — Content Accuracy | Not started |
| CONT-02 | Phase 3 — Content Accuracy | Not started |
| CONT-03 | Phase 3 — Content Accuracy | Not started |
| CONT-04 | Phase 3 — Content Accuracy | Not started |
| QUAL-01 | Phase 4 — Pre-Launch Checks | Not started |
| QUAL-02 | Phase 4 — Pre-Launch Checks | Not started |
| QUAL-03 | Phase 4 — Pre-Launch Checks | Not started |
