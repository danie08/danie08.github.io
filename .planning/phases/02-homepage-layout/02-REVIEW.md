---
phase: 02-homepage-layout
reviewed: 2026-04-30T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - _layouts/about.liquid
  - _pages/about.md
  - _sass/_base.scss
  - purgecss.config.js
findings:
  critical: 0
  warning: 4
  info: 2
  total: 6
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-04-30
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Phase 02 adds a 3-column highlights grid, a selected-papers showcase wrapper, and mobile breakpoint splits to `_base.scss`, plus a PurgeCSS safelist entry for the new wrapper. The changes are structurally sound and the new SCSS tokens are all defined. Four warnings and two info items were found — no critical (security/data-loss/crash) issues. The most significant finding is a breakpoint gap that leaves the `.homepage-highlights` grid in an undefined state at 768–991px, which will cause a visual regression on tablets. The second significant finding is that nested classes inside `.selected-papers-showcase` (`.abbr`, `.links`, `.row`, `.col-sm-10`, `.col-sm-8`) are written as descendant selectors and will be stripped by PurgeCSS if the class names never appear standalone in the built HTML outside of bib.liquid output.

---

## Warnings

### WR-01: Tablet breakpoint gap — `.homepage-highlights` collapses to 1 column at ≥768px

**File:** `_sass/_base.scss:982-992`

**Issue:** Two media queries handle the 3-column grid at smaller widths, but they leave an unaddressed range. The `max-width: 575.98px` query forces 1 column, the `min-width: 576px and max-width: 767.98px` query forces 2 columns, but above 768px the rule at line 297 (`grid-template-columns: repeat(3, minmax(0, 1fr))`) is the only active rule. On tablets in the 768–991px range (Bootstrap's `md` breakpoint) the 3-column layout applies without any 2-column intermediate, potentially producing very narrow columns on 768px-wide devices. This is a layout regression from the original 2-column grid which had no such gap. The intended design should either collapse to 2 columns in the `md` range or explicitly confirm 3 columns is acceptable there. As written, the breakpoints cover `<576` and `576–768` but are silent on `768–991`, which is the range most likely to be cramped.

**Fix:**
```scss
// Option A: extend the 2-col range up to md boundary
@media (min-width: 576px) and (max-width: 991.98px) {
  .homepage-highlights {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

// Option B: add explicit 3-col affirmation for md+ (no change needed if 3 cols is intentional)
// and remove the 576–768 rule entirely so 3-col starts at 576px.
```

---

### WR-02: PurgeCSS will strip nested showcase selectors — `.abbr`, `.links`, `.row`, `.col-sm-*`

**File:** `purgecss.config.js:19` / `_sass/_base.scss:1791-1809`

**Issue:** The safelist entry `/^selected-papers-showcase/` protects only class names that *start with* `selected-papers-showcase`. The selectors inside the `.selected-papers-showcase {}` block that target generic Bootstrap/bib.liquid class names — `.abbr` (line 1791), `.links` (line 1796), `.row` (line 1801), `.col-sm-10` and `.col-sm-8` (lines 1806-1808) — are compiled into flat CSS rules like `.selected-papers-showcase .abbr { display: none }`. PurgeCSS scans built HTML for class usage to decide what to keep. If `.abbr`, `.links`, `.row`, `.col-sm-10`, `.col-sm-8` are found in `_site/**/*.html` (which they will be via bib.liquid output), those rules survive. But the safelist regex does not help these — it only protects selectors whose class name begins with `selected-papers-showcase`. This is actually fine at runtime provided the bib.liquid output is present in `_site`, but the reasoning is fragile: if PurgeCSS ever runs before the site is fully built (e.g., on a clean CI run where selected papers output is empty), these nested rules will be purged. The safelist should be made explicit about the intent.

**Fix:** Add a comment to the safelist entry documenting that nested selectors (`.abbr`, `.links`, `.row`, `.col-sm-*`) are retained via content-scanning of bib.liquid HTML output, not via the safelist regex. Additionally, if any of those nested selectors can appear in a zero-paper scenario (no selected papers), add them explicitly:
```js
safelist: {
  greedy: [
    // ... existing entries ...
    /^selected-papers-showcase/,
    // Nested selectors inside .selected-papers-showcase are retained
    // because bib.liquid emits .abbr, .links, .row, .col-sm-* in built HTML.
    // If selected_papers list is ever empty, these rules will be purged.
  ],
},
```

---

### WR-03: `transition-property` used as a shorthand value — invalid CSS (pre-existing, now in reviewed scope)

**File:** `_sass/_base.scss:1182` and `1202`

**Issue:** Lines 1182 and 1202 read:
```scss
transition-property: 0.15s ease;
```
`transition-property` accepts a list of CSS property names (e.g., `all`, `opacity`, `max-height`), not a duration/easing value. The correct property is `transition`. The immediately following line (1186/1206) `transition: all 0.15s ease` is correct and overrides this, so the invalid declaration is silently discarded. This is dead/broken CSS. Although it predates Phase 02 and is inside `.publications`, the file is in review scope and the defect is real.

**Fix:**
```scss
// Remove the two invalid transition-property lines; the correct shorthand is already present:
// transition: all 0.15s ease;   ← keep this, remove the transition-property: 0.15s ease; lines
```

---

### WR-04: `latest_posts` block in layout will silently produce no output — condition checks `.enabled` on a missing key

**File:** `_layouts/about.liquid:52-57`

**Issue:** The condition at line 52 is:
```liquid
{% if page.latest_posts and page.latest_posts.enabled %}
```
`about.md` has no `latest_posts` key in its front matter (confirmed at review time). In Liquid, accessing `.enabled` on a falsy/nil value returns nil and does not error, so this silently evaluates to false — correct at runtime. However the `{% include latest_posts.liquid %}` at line 56 will fail with a Liquid rendering error if the include file does not exist (it was deleted in this phase's cleanup according to git status). A missing include is a build-time error in Jekyll, not a silent no-op.

**Fix:** Confirm that `_includes/latest_posts.liquid` still exists in the repository. If it has been deleted, remove the entire `latest_posts` block (lines 51-57) from the layout to prevent a build failure if `latest_posts: true` is ever set in any page's front matter.

---

## Info

### IN-01: `description` front-matter field in `about.md` is not rendered on the homepage

**File:** `_pages/about.md:6`

**Issue:** The `description` field at line 6 is consumed by `_includes/metadata.liquid` for `<meta name="description">` and Open Graph tags — which is correct and intentional. However the field name shadows `page.description` site-wide and could mislead future editors into thinking it displays visible text. There is no corresponding rendering in `_layouts/about.liquid`. This is not a bug, but the intent is not self-documenting.

**Fix:** Add a brief inline comment:
```yaml
description: "Daniela Occhipinti is an NLP researcher..." # SEO/OG meta only — not rendered on page
```

---

### IN-02: Commented-out margin value in navbar SCSS

**File:** `_sass/_base.scss:519`

**Issue:** Line 519 contains a commented-out CSS property:
```scss
// margin: 0.5rem;
```
This is dead commented-out code inside the `.navbar-brand.social a img` block. It predates Phase 02 but is in the reviewed file.

**Fix:** Remove the commented-out line.

---

_Reviewed: 2026-04-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
