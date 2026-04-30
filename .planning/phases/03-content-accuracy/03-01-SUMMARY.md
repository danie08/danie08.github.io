---
phase: 03-content-accuracy
plan: "01"
subsystem: content/bibliography
tags: [bibliography, bibtex, seo, meta-descriptions, cv, content-accuracy]
dependency_graph:
  requires: []
  provides: [CONT-01, CONT-02, CONT-03, CONT-04]
  affects: [_bibliography/papers.bib, _pages/publications.md, _pages/news.md, _pages/cv.md, _data/cv.yml]
tech_stack:
  added: []
  patterns: [bibtex-note-field, jekyll-frontmatter-description]
key_files:
  created: []
  modified:
    - _bibliography/papers.bib
    - _data/cv.yml
    - _pages/publications.md
    - _pages/news.md
    - _pages/cv.md
decisions:
  - Added note: field to all four BibTeX entries using research-value-focused voice consistent with featured cards on publications.md
  - Fixed stale cv.yml PhD entry — year updated from '2021 - Present' to '2021 - 2025' with honors noted (discovery snapshot D-01 was stale)
  - Uncommented description: in publications.md and cv.md; added missing description: to news.md (discovery snapshot D-06 was stale)
metrics:
  duration: "~8m"
  completed: "2026-04-30"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 5
---

# Phase 3 Plan 1: Content Accuracy Summary

**One-liner:** Four BibTeX note fields added with research-value voice; PhD honors status and page SEO descriptions corrected across five files.

## Objective

Close content-accuracy requirements CONT-01 through CONT-04. CONT-03 required a code edit (adding `note:` to each bib entry). CONT-01, CONT-02, CONT-04 were verified — the discovery snapshot was partially stale, so corrections were applied as deviations.

## Tasks Completed

| Task | Description | Commit | Status |
|------|-------------|--------|--------|
| 1 | Add plain-language note: field to all four BibTeX entries | 07f89e9 | Done |
| 2 | Verify CONT-01, CONT-02, CONT-04 — fix stale snapshot gaps | d7abbcb | Done |

## Task 1: BibTeX note: Fields Added

Four `note = {…}` fields were added to `_bibliography/papers.bib`, each placed immediately after `bibtex_show = {true},`.

**Entry: `occhipinti:etal:2020italianlp` (EVALITA 2020) — line 12**
```bibtex
  note = {Author profiling in Italian — an early study on inferring speaker attributes from text, and the system that won every subtask.},
```

**Entry: `occhipinti-etal-2025-superman` (ACL 2025) — line 36**
```bibtex
    note = {Explores how dialogue generation changes when models know not just who is speaking, but who they are speaking to — and what that relationship means for consistency.},
```

**Entry: `occhipinti-etal-2024-fine` (ACL 2024) — line 67**
```bibtex
    note = {Investigates how human post-editing of machine-generated dialogues affects model training, finding that data quality matters most for smaller models.},
```

**Entry: `occhipinti:etal-2024-prodigy` (NAACL 2024) — line 94**
```bibtex
    note = {Introduces PRODIGy, a dataset pairing movie-script dialogues with rich speaker profiles — personality, biography, and communication style — to support persona-aware dialogue generation.},
```

**Voice compliance verified:**
- No entry starts with "We" or "This paper"
- No jargon: UmBERTo, SVM, LLM, fine-tuning absent from all note fields
- Each is one full sentence, research-value-focused
- Indentation preserved: EVALITA uses 2-space, ACL/NAACL entries use 4-space

**`_layouts/bib.liquid` was NOT modified** — the template already renders `entry.note` in a `.periodical` div at line 181.

## Task 2: Verification Evidence

### CONT-01 — News milestones (pre-existing, verified correct)

News files covering key 2024–2025 milestones:

| Milestone | File(s) |
|-----------|---------|
| ACL 2025 | `_news/2025-06-05.md`, `_news/2025-07-28.md` |
| ACL 2024 | `_news/2024-03-13.md`, `_news/2024-05-16.md`, `_news/2024-06-10.md`, `_news/2024-08-11.md` |
| NAACL 2024 | `_news/2024-03-13.md`, `_news/2024-06-10.md` |
| PhD defense | `_news/2024-04-01.md`, `_news/2026-04-28.md` |

No `_news/*.md` file contains a `permalink:` front-matter field. CONT-01 satisfied.

### CONT-02 — PhD status (fixed from stale snapshot)

- `_pages/about.md` line 27: "I completed a PhD in Information Engineering and Computer Science at the University of Trento and FBK, with honors." — correct, unchanged.
- `_data/cv.yml`: updated from stale `year: 2021 - Present` to `year: 2021 - 2025` with `PhD graduated with honors, 2025.` in description. CONT-02 now satisfied.

### CONT-04 — SEO meta descriptions (partial fix from stale snapshot)

`_includes/metadata.liquid` renders `page.description` into 4 places:
- Line 42: `<meta name="description" content="{% if page.description %}{{ page.description }}...`
- Line 60: `<meta property="og:description" content="{% if page.description %}{{ page.description }}...`
- Line 69: `<meta name="twitter:description" content="{% if page.description %}{{ page.description }}...`
- Line 232: schema.org `"description"` field

Pages with active `description:` front-matter confirmed after fixes:

| Page | Description |
|------|-------------|
| `_pages/about.md` | "Daniela Occhipinti is an NLP researcher at FBK specialising in persona-based dialogue generation..." (pre-existing) |
| `_pages/projects.md` | pre-existing |
| `_pages/publications.md` | "Publications by Daniela Occhipinti — research on persona-based dialogue generation..." (fixed: was commented out) |
| `_pages/news.md` | "News and updates from Daniela Occhipinti — recent publications..." (fixed: was absent) |
| `_pages/cv.md` | "Academic CV of Daniela Occhipinti — NLP researcher at FBK..." (fixed: was commented out placeholder) |

CONT-04 now satisfied.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] cv.yml PhD entry showed stale in-progress status**
- **Found during:** Task 2 verification
- **Issue:** `_data/cv.yml` had `year: 2021 - Present` with no honors mention, contradicting CONT-02 must_haves truth and the discovery snapshot D-01 claim
- **Fix:** Updated year to `2021 - 2025`, description now reads "PhD graduated with honors, 2025."
- **Files modified:** `_data/cv.yml`
- **Commit:** d7abbcb

**2. [Rule 2 - Missing Critical Functionality] Three pages missing description: front-matter**
- **Found during:** Task 2 verification
- **Issue:** `_pages/publications.md`, `_pages/cv.md` had `description:` commented out with placeholder text; `_pages/news.md` had no `description:` at all — contradicting CONT-04 must_haves and discovery snapshot D-06 claim
- **Fix:** Uncommented and replaced description in publications.md and cv.md; added description to news.md
- **Files modified:** `_pages/publications.md`, `_pages/cv.md`, `_pages/news.md`
- **Commit:** d7abbcb

**Discovery snapshot discrepancy note:** The Phase 3 CONTEXT.md recorded D-01 ("cv.yml already states graduated with honors") and D-06 ("all pages already have description: front matter") as pre-answered truths. Both were incorrect — the actual codebase state required correction. The plan's fail-close instruction for Task 2 was followed: discrepancies were surfaced, diagnosed, and fixed per Rules 1 and 2 rather than silently passing.

## Known Stubs

None. All four note: fields contain real research-value content. All description: fields contain real descriptive text.

## Threat Flags

None. No new network endpoints, auth paths, or trust boundaries introduced. All changes are static content (`.bib` data, front-matter YAML, markdown).

## Self-Check: PASSED

| Item | Status |
|------|--------|
| `_bibliography/papers.bib` exists | FOUND |
| `_data/cv.yml` exists | FOUND |
| `_pages/publications.md` exists | FOUND |
| `_pages/news.md` exists | FOUND |
| `_pages/cv.md` exists | FOUND |
| `03-01-SUMMARY.md` exists | FOUND |
| Commit `07f89e9` exists | FOUND |
| Commit `d7abbcb` exists | FOUND |
