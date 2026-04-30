---
phase: 1
slug: visual-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-30
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static site; validation is grep-based + visual |
| **Config file** | `purgecss.config.js` (build tool, not test framework) |
| **Quick run command** | `bundle exec jekyll build` |
| **Full suite command** | `bundle exec jekyll build && npx purgecss --config purgecss.config.js` |
| **Estimated runtime** | ~30–60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bundle exec jekyll build`
- **After every plan wave:** Run `bundle exec jekyll build && npx purgecss --config purgecss.config.js`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 1-??-01 | TBD | 1 | VIS-01 | — | N/A | grep | `grep -i "5C4B8A" _site/assets/css/main.css` | ❌ W0 | ⬜ pending |
| 1-??-02 | TBD | 1 | VIS-01 | — | N/A | grep | `grep "0076df" _site/assets/css/main.css \| grep -v "code-bg"` | ❌ W0 | ⬜ pending |
| 1-??-03 | TBD | 1 | VIS-01 | — | N/A | grep | `grep -i "FAFAF8" _site/assets/css/main.css` | ❌ W0 | ⬜ pending |
| 1-??-04 | TBD | 1 | VIS-02 | — | N/A | grep | `grep "Inter" _site/assets/css/main.css` | ❌ W0 | ⬜ pending |
| 1-??-05 | TBD | 1 | VIS-02 | — | N/A | grep | `grep "Source Serif" _site/assets/css/main.css` | ❌ W0 | ⬜ pending |
| 1-??-06 | TBD | 1 | VIS-02 | — | N/A | grep | `grep "css2" _site/index.html` | ❌ W0 | ⬜ pending |
| 1-??-07 | TBD | 1 | VIS-03 | — | N/A | grep | `grep -r "al-folio" _site/*.html` | ❌ W0 | ⬜ pending |
| 1-??-08 | TBD | 1 | VIS-03 | — | N/A | grep | `grep -r "Powered by" _site/*.html` | ❌ W0 | ⬜ pending |
| 1-??-09 | TBD | 1 | VIS-04 | — | N/A | grep | `grep "safelist" purgecss.config.js` | ❌ W0 | ⬜ pending |
| 1-??-10 | TBD | 1 | VIS-04 | — | N/A | grep | `grep "btn-primary-link" _site/assets/css/main.css` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no test infrastructure needed for this phase. All verification is grep-on-compiled-output or DevTools visual inspection. The Jekyll build is the "test runner."

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Inter and Source Serif 4 render correctly in browser | VIS-02 | Font rendering requires browser | Open `localhost:4000` after `jekyll serve`, inspect heading font in DevTools → Computed → font-family should show "Source Serif 4"; body should show "Inter" |
| Profile photo doesn't clash with plum palette | D-01 specifics | Visual judgment | Open homepage, visually confirm `assets/img/prof_pic.jpeg` harmonizes with `#5C4B8A` accent color |
| Footer looks finished: copyright, social icons, nav links | VIS-03 / D-13 | Visual layout judgment | Check footer renders copyright line, GitHub/Scholar/LinkedIn icons, About/Publications/CV links in the built site |
| Dark mode tokens produce coherent dark theme | D-11 | Requires toggling dark mode | Temporarily set `enable_darkmode: true` in `_config.yml`, rebuild, verify dark theme colors are not garish (then revert if needed) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
