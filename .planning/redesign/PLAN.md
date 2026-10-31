# Research and Applied AI Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline, followed by a fresh whole-change review.

**Goal:** Implement the agreed local navy portfolio and update research/industry content.
**Architecture:** Retain Jekyll; shared sidebar shell, runtime theme tokens and scoped portfolio SCSS. Continue Jekyll Scholar with a separate publication template, leaving bib.liquid unchanged.
**Tech Stack:** Jekyll, Liquid, SCSS, browser JavaScript, GitHub Pages.
**Spec:** .planning/redesign/DESIGN.md

## Global Constraints

Local only; static site; original bib.liquid read-only; Ruby 3.3.5 deployment retained; full titles and direct PDFs; CSS safelist; accessible responsive pages.

## Review Focus

Long titles and author lists must wrap at 375px. Native abstract/Bib controls must work without JavaScript. All five publications must remain reachable. Navigation must work from secondary and historical pages. CV dates must not fabricate a precise industry timeline.

### Task 1: Shared visual shell and homepage

Files: \_layouts/default.liquid, \_layouts/about.liquid, \_includes/portfolio-sidebar.liquid, \_pages/about.md, \_sass/\_portfolio.scss, \_sass/\_themes.scss, assets/css/main.scss, assets/js/portfolio.js, purgecss.config.js, \_config.yml.
Interface: home section IDs introduction, research, applied-ai, background, milestones, contact; .portfolio-\* classes.

- [x] Establish rendered-site checks and observe missing design/content on baseline.
- [x] Implement shared shell, agreed homepage text and styles; preserve URLs and metadata.
- [x] Build and verify anchors, contacts, assets, mobile layout and navigation.

### Task 2: Publications, CV and milestones

Files: \_layouts/publication.liquid, \_bibliography/papers.bib, \_pages/publications.md, \_pages/cv.md, \_data/cv.yml, \_data/socials.yml, \_news/2026-10-29.md, \_pages/projects.md.
Interface: Jekyll Scholar entry and existing CV data schema; new template selected globally.

- [x] Verify rendered checks reject missing EMNLP paper and direct PDFs.
- [x] Add all metadata/PDFs, preserve existing rows and resources with native details; update CV, milestones and relevant legacy text.
- [x] Production build, rendered-content and link checks; preserve original bib template hash.

### Task 3: Preview, production CSS and review

- [x] Run PurgeCSS and verify essential responsive/interaction styles remain.
- [x] Inspect desktop and 375px/768px homepage, publications and CV; check keyboard and publication controls.
- [x] Fresh reviewer examines the full diff and constraints; address material findings and recheck.
- [x] Leave changes local and reviewable; provide preview and remaining date caveat.
