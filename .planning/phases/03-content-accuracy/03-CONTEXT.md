# Phase 3: Content Accuracy - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Verify and update all site copy so it is factually current and complete: confirm PhD status phrasing is correct everywhere, add plain-language descriptions to bibliography entries, confirm news entries are current, and verify all pages have correct SEO meta descriptions for social link previews. No layout or visual changes — pure content.

</domain>

<decisions>
## Implementation Decisions

### Bio and PhD status (CONT-02)
- **D-01:** Pre-answered — no changes needed. `about.md` already states "I completed a PhD in Information Engineering and Computer Science at the University of Trento and FBK, with honors." `_data/cv.yml` already states "graduated with honors, University of Trento & FBK, 2025." Full codebase scan found zero stale "completing a PhD" phrasing.

### Paper descriptions (CONT-03)
- **D-02:** Add plain-language one-line descriptions via the `note:` field in `_bibliography/papers.bib`. The `note:` field is already rendered inline by `_layouts/bib.liquid` at line 190 (inside `.periodical` div, directly after venue/year) — no template changes required.
- **D-03:** Apply descriptions to all papers in `.bib`, not just the 3 selected ones. The EVALITA 2020 paper should also receive a brief one-liner.
- **D-04:** Descriptions must be plain-language, one line, non-technical — what the work is about, not what method was used. The featured cards on `_pages/publications.md` already have good examples of this tone; the `note:` descriptions should be consistent with that voice.

### News (CONT-01)
- **D-05:** Pre-answered — no changes needed. Existing news entries cover all key 2024–2025 milestones (ACL 2024 acceptance + poster, NAACL 2024 acceptance + poster, CLiC-it 2024 poster, ACL 2025 acceptance + poster, FBK Researcher appointment, PhD defense). No broken permalink formats found — all entries use standard front matter with no custom `permalink:` fields.

### SEO meta descriptions (CONT-04)
- **D-06:** Pre-answered — all pages already have `description:` front matter, and `_includes/metadata.liquid` correctly renders them into `<meta name="description">`, `og:description`, and `twitter:description` tags for all pages. No new pages need descriptions.
- **D-07:** The CV page description ("Academic CV and research experience.") is intentionally left unchanged per user decision — the CV page is secondary and hired via the homepage.

### Claude's Discretion
- Exact wording of the `note:` field descriptions for each paper — should be plain-language summaries (not copied from abstract), consistent with the voice used in the featured cards on publications.md
- Whether to capitalize/format the note field as a sentence or fragment (sentence preferred for readability)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Bibliography and publications
- `_bibliography/papers.bib` — source of truth for all paper metadata; `note:` fields added here for CONT-03
- `_layouts/bib.liquid` — renders bibliography entries; `entry.note` rendered at line 190 in `.periodical` div. **Treat as read-only** — no template changes needed or allowed.
- `_pages/publications.md` — publications page; featured cards already have plain-language descriptions for selected papers — use these as the tone/voice reference for `note:` field descriptions

### Bio and CV
- `_pages/about.md` — homepage bio; PhD status already correct
- `_data/cv.yml` — CV data; PhD status already correct

### SEO / metadata
- `_includes/metadata.liquid` — renders `page.description` into all social/SEO meta tags; already wired correctly

### Phase 1 context (token system rules — applies if any SCSS is touched)
- `.planning/phases/01-visual-foundation/01-CONTEXT.md` — critical constraints: always use `var(--global-*)` tokens, never hardcode hex

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`entry.note` in `bib.liquid:190`**: Already rendered inline in `.periodical` div after venue/year — adding `note:` to `.bib` entries is zero-code, pure content change.
- **Featured cards in `publications.md`**: Have good examples of the desired tone for paper descriptions (plain-language, one-line, research-value-focused). Use these as writing reference.

### Established Patterns
- **All content changes are pure front-matter or markdown edits** — no SCSS or Liquid template changes required for this phase.
- **News format**: `_news/*.md` files use `layout: post`, `date:`, `inline: true/false`, `related_posts: false` — no custom permalinks, no special fields.
- **`page.description` → meta tags**: the pattern is front-matter `description:` in the page file → `metadata.liquid` renders it everywhere needed.

### Integration Points
- `_bibliography/papers.bib` → `bib.liquid` (renders bibliography list on `/publications/`) — the `note:` field is the only integration point for CONT-03.

</code_context>

<specifics>
## Specific Ideas

- The featured card on `publications.md` for ACL 2025 reads: "This paper is the strongest expression of my current research direction: dialogue models should adapt not only to a target persona, but also to the interlocutor and the relationship between speakers." The `note:` descriptions should be shorter but match this voice — research-value-focused, not method-focused.
- The featured card for ACL 2024 reads: "HED-IT asks how human post-editing affects the quality of dialogue training data, connecting model behavior to the often-hidden question of what counts as good conversational supervision." Same tone target.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-content-accuracy*
*Context gathered: 2026-04-30*
