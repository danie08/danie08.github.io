---
phase: 01-visual-foundation
plan: "03"
subsystem: footer-purgecss
tags: [footer, liquid, purgecss, safelist, al-folio-removal, social-icons, nav-links]
dependency_graph:
  requires: [plum-palette-primitives, google-fonts-inter-source-serif-4]
  provides: [footer-attribution-removed, footer-social-icons, footer-nav-links, purgecss-safelist]
  affects: [_config.yml, _includes/footer.liquid, purgecss.config.js, _site/index.html, _site/assets/css/main.css]
tech_stack:
  added: []
  patterns: [liquid-include-social, liquid-site-pages-iteration, purgecss-greedy-safelist]
key_files:
  created: []
  modified:
    - _config.yml
    - _includes/footer.liquid
    - purgecss.config.js
decisions:
  - "Used safelist.greedy (not bare safelist array) to match compound selectors like .btn-primary-link:hover"
  - "Both fixed-bottom and sticky-bottom footer branches updated identically — toggling footer_fixed cannot resurrect al-folio attribution"
  - "Nav links use site.pages | sort: nav_order with p.nav == true filter — mirrors header.liquid, automatically picks up future nav pages"
metrics:
  duration: "8m"
  completed: "2026-04-30"
  tasks_completed: 3
  tasks_total: 3
---

# Phase 01 Plan 03: Footer + PurgeCSS Summary

**One-liner:** Removed al-folio attribution from _config.yml footer_text, redesigned both footer.liquid branches with social icons and nav links, and added a greedy PurgeCSS safelist covering 11 custom CSS class families.

## What Was Built

Three files modified to implement VIS-03 (footer attribution removal) and VIS-04 (PurgeCSS safelist):

1. `_config.yml` — `footer_text` replaced: old multi-line value (Powered by Jekyll + al-folio + GitHub Pages) replaced with single-line GitHub Pages-only credit
2. `_includes/footer.liquid` — Both `fixed-bottom` and `sticky-bottom` branches redesigned: added `footer-copyright`, `footer-social`, `footer-nav` div wrappers; added `{% include social.liquid %}` in each branch; added nav link iteration via `site.pages | sort: "nav_order"` with `p.nav == true` filter
3. `purgecss.config.js` — Added `safelist.greedy` array with 11 regex patterns covering all custom CSS class families

## Files Modified

| File | Changes | Lines Added | Lines Removed |
|------|---------|-------------|---------------|
| `_config.yml` | footer_text replaced (multi-line → single-line) | +1 | -2 |
| `_includes/footer.liquid` | Both branches restructured with new wrappers and includes | +46 | -21 |
| `purgecss.config.js` | safelist.greedy block added | +15 | 0 |

## _config.yml footer_text Diff

**Old (lines 13–15):**
```yaml
footer_text: >
  Powered by <a href="https://jekyllrb.com/" target="_blank">Jekyll</a> with <a href="https://github.com/alshedivat/al-folio">al-folio</a> theme.
  Hosted by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.
```

**New (lines 13–14):**
```yaml
footer_text: >
  Hosted by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.
```

al-folio attribution completely removed. Jekyll and GitHub Pages credits gone too — only GitHub Pages hosting credit remains per D-13.

## footer.liquid Restructure Summary

Both `{% if site.footer_fixed %}` and `{% else %}` branches now use identical body structure:

```liquid
<div class="footer-copyright">
  &copy; Copyright {{ site.time | date: '%Y' }} ... {{ site.footer_text }}
  {% if site.impressum_path %} ... {% endif %}
  {% if site.last_updated %} ... {% endif %}
</div>
<div class="footer-social">
  {% include social.liquid %}
</div>
<div class="footer-nav">
  {% assign sorted_pages = site.pages | sort: "nav_order" %}
  {% for p in sorted_pages %}
    {% if p.nav and p.nav == true %}
      <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
    {% endif %}
  {% endfor %}
</div>
```

**Preserved invariants:**
- `class="fixed-bottom"` and `class="sticky-bottom mt-5"` on `<footer>` elements (base.scss selectors depend on them)
- `{% if site.impressum_path %}` conditional in both branches
- `{% if site.last_updated %}` conditional in both branches
- `{% if site.newsletter.enabled %}` block in the sticky-bottom branch
- `{% include social.liquid %}` appears exactly twice (once per branch) — no hardcoded social URLs

## PurgeCSS Safelist Patterns Added

```javascript
safelist: {
  greedy: [
    /^hero-/,             // homepage hero section classes
    /^homepage-/,         // homepage layout classes
    /^highlight-/,        // publication highlight classes
    /^research-question-/,// research question card classes
    /^featured-publication/, // featured publication classes
    /^project-story/,     // project story classes
    /^collaboration-cta/, // collaboration CTA classes
    /^btn-primary-link/,  // bib.liquid button — highest stakes (used on every pub page)
    /^btn-outline-link/,  // bib.liquid button — highest stakes (used on every pub page)
    /^cv-intro/,          // CV intro classes
    /^footer-/,           // footer-copyright, footer-social, footer-nav (NEW from Task 2)
  ],
},
```

`/^footer-/` added specifically to protect the new div wrappers introduced in Task 2. The `greedy` form (vs bare `safelist: []` array) matches compound selectors like `.btn-primary-link:hover` and `.footer-nav a:hover`.

## Verified Grep Results

### Built pages (after Jekyll build + PurgeCSS)

| Check | Result |
|-------|--------|
| `al-folio` in `_site/index.html` | NOT FOUND (removed) |
| `Powered by` in `_site/index.html` | NOT FOUND (removed) |
| `al-folio` in `_site/about/index.html` | NOT FOUND |
| `Powered by` in `_site/about/index.html` | NOT FOUND |
| `footer-copyright` in `_site/index.html` | FOUND |
| `fa-brands fa-github` in `_site/index.html` | FOUND (social.liquid rendered) |
| `Publications` nav link in footer | FOUND (`/publications/`) |
| `CV` nav link in footer | FOUND (`/cv/`) |

### Compiled CSS (after PurgeCSS pass)

| Check | Result |
|-------|--------|
| `btn-primary-link` in `_site/assets/css/main.css` | FOUND (safelist preserved) |
| `btn-outline-link` in `_site/assets/css/main.css` | FOUND (safelist preserved) |
| `5C4B8A` (plum palette) | FOUND (Plans 01 invariant intact) |
| `Inter` (font stack) | FOUND (Plans 02 invariant intact) |

## Task Commits

| Task | Description | Commit |
|------|-------------|--------|
| Task 1 | Remove al-folio attribution from _config.yml footer_text | `80756dd` |
| Task 2 | Redesign footer.liquid — both branches with social icons and nav links | `c8caeee` |
| Task 3 | Add PurgeCSS safelist.greedy with 11 patterns | `16e9d06` |

## Phase 1 Completion Signal

All four Phase 1 requirements are now satisfied:

| Requirement | Status | Evidence |
|-------------|--------|----------|
| VIS-01 — Color palette | Complete (Plan 01) | `#5C4B8A` in compiled CSS, token chain verified |
| VIS-02 — Typography | Complete (Plan 02) | Inter + Source Serif 4 in `<link>` tag and compiled CSS |
| VIS-03 — Footer attribution removed | **Complete (Plan 03)** | al-folio + Powered by absent from all built pages |
| VIS-04 — PurgeCSS safelist | **Complete (Plan 03)** | greedy safelist with 11 patterns; btn classes survive PurgeCSS |

Phase 1 — Visual Foundation is **complete**.

## Deviations from Plan

None — plan executed exactly as written. All three tasks implemented per specification with no deviation from the prescribed template content, class names, or safelist patterns.

## Known Stubs

None — all template wiring is live end-to-end. Social icons render from `site.data.socials`, nav links render from `site.pages` with `nav: true`, and `footer_text` renders the GitHub Pages hosting credit.

## Threat Flags

None. Changes are limited to YAML configuration, a Liquid template, and a Node.js config file — no new network endpoints, auth paths, or trust boundary changes introduced. Build pipeline gate (T-01-03-03) satisfied by successful `bundle exec jekyll build`. PurgeCSS safelist coverage (T-01-03-04) verified by post-PurgeCSS grep confirming btn-primary-link and btn-outline-link survival.

## Self-Check: PASSED

- `_config.yml` contains `Hosted by <a href="https://pages.github.com/"` — FOUND
- `_config.yml` does not contain `Powered by` — CONFIRMED
- `_config.yml` does not contain `al-folio` in footer_text — CONFIRMED (comments only)
- `_config.yml` contains `enable_darkmode: true` — FOUND (preserved)
- `_config.yml` contains `css2?family=Inter` — FOUND (preserved from Plan 02)
- `_includes/footer.liquid` contains `include social.liquid` exactly 2 times — CONFIRMED
- `_includes/footer.liquid` contains `p.nav == true` — FOUND
- `_includes/footer.liquid` contains `sort: "nav_order"` — FOUND
- `_includes/footer.liquid` contains `class="fixed-bottom"` — FOUND
- `_includes/footer.liquid` contains `class="sticky-bottom mt-5"` — FOUND
- `_includes/footer.liquid` contains `footer-copyright`, `footer-social`, `footer-nav` — FOUND
- `_includes/footer.liquid` contains `site.newsletter.enabled` — FOUND
- `purgecss.config.js` contains `safelist` and `greedy` — FOUND
- `purgecss.config.js` contains all 11 regex patterns — FOUND
- `_site/index.html` does not contain `al-folio` — CONFIRMED
- `_site/index.html` contains `footer-copyright` — FOUND
- `_site/assets/css/main.css` contains `btn-primary-link` after PurgeCSS — FOUND
- `_site/assets/css/main.css` contains `btn-outline-link` after PurgeCSS — FOUND
- Commit `80756dd` (Task 1) — FOUND
- Commit `c8caeee` (Task 2) — FOUND
- Commit `16e9d06` (Task 3) — FOUND
