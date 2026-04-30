---
phase: 2
slug: homepage-layout
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-30
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — static Jekyll site; all validation is manual or via `jekyll build` |
| **Config file** | none |
| **Quick run command** | `bundle exec jekyll build` (build passes = no syntax errors) |
| **Full suite command** | `bundle exec jekyll serve` + manual browser inspection at localhost:4000 |
| **Estimated runtime** | ~30 seconds (build); ~60 seconds (serve + inspect) |

---

## Sampling Rate

- **After every task commit:** Run `bundle exec jekyll build` to confirm no Liquid/SCSS/YAML errors
- **After every plan wave:** Manual browser inspection at localhost:4000 covering all modified elements
- **Before `/gsd-verify-work`:** Full browser inspection at 375px, 768px, and 1200px viewports
- **Max feedback latency:** 60 seconds (build + serve)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Secure Behavior | Test Type | Automated Command | Manual Check | Status |
|---------|------|------|-------------|-----------------|-----------|-------------------|--------------|--------|
| 2-01-01 | 01 | 1 | HOME-02 | N/A | manual | `bundle exec jekyll build` | homepage `<p class="desc">` shows "NLP Researcher · FBK" (plain text, no anchor) | ⬜ pending |
| 2-01-02 | 01 | 1 | HOME-01 | N/A | manual | `bundle exec jekyll build` | scroll order: hero-thesis → bio paragraphs → highlights grid | ⬜ pending |
| 2-01-03 | 01 | 1 | HOME-01 | N/A | manual | `bundle exec jekyll build` | at 768px+: three `.highlight-item` cards side-by-side; at 576px–767px: 2 cols; below 576px: 1 col | ⬜ pending |
| 2-02-01 | 02 | 2 | HOME-03 | N/A | manual | `bundle exec jekyll build` | view source: `<div class="selected-papers-showcase">` wraps `<div class="publications">` | ⬜ pending |
| 2-03-01 | 03 | 3 | HOME-03 | N/A | manual | `bundle exec jekyll build` | each paper entry has left accent bar (indigo-plum), serif title at 1.125rem, muted author/venue at 0.75rem | ⬜ pending |
| 2-03-02 | 03 | 3 | HOME-03 | N/A | manual | `bundle exec jekyll build` | venue badge not visible in showcase; still visible on /publications/ page | ⬜ pending |
| 2-04-01 | 04 | 4 | HOME-03 | N/A | manual | `JEKYLL_ENV=production bundle exec jekyll build` | production CSS contains `.selected-papers-showcase` rules (not purged) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no test framework installation needed. Jekyll build environment is confirmed working from Phase 1 execution.

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Section order on homepage | HOME-01 | Static site — no automated DOM inspection; Jekyll build only confirms no errors, not visual order | `jekyll serve` → localhost:4000 → scroll: hero-thesis paragraph first, then bio paragraphs, then `.homepage-highlights` grid |
| Subtitle renders as plain text | HOME-02 | HTML rendering cannot be checked by build alone | View page source → confirm `<p class="desc">NLP Researcher · FBK</p>` with no `<a>` tag inside |
| 3-column grid at 768px+ | HOME-01 | Responsive layout requires browser inspection | DevTools → set viewport to 768px → confirm grid shows 3 columns |
| 2-column grid at 576px–767px | HOME-01 | Responsive layout requires browser inspection | DevTools → set viewport to 640px → confirm grid shows 2 columns |
| 1-column grid below 576px | HOME-01 | Responsive layout requires browser inspection | DevTools → set viewport to 375px → confirm grid shows 1 column |
| Showcase accent bar | HOME-03 | Visual SCSS property requires browser inspection | Each paper entry has 3px indigo-plum left border visible on homepage |
| Showcase on publications page | HOME-03 (non-regression) | Ensure publications page not affected by scoped SCSS | Navigate to /publications/ → verify normal citation list style, no accent bar, badges still visible |
| Mobile showcase padding | HOME-03 | Responsive layout requires browser inspection | At 375px: paper entries have reduced horizontal padding, no overflow |

---

## Validation Sign-Off

- [ ] All tasks have build-passing automated check + manual inspection protocol
- [ ] Sampling continuity: build check after every task
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
