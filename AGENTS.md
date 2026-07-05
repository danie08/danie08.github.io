# danie08.github.io — Project Guide

## Project

Academic personal website redesign for Daniela Occhipinti (NLP researcher, FBK).
Goal: Warm, distinctive, personal — not a generic al-folio template.

See `.planning/PROJECT.md` for full context and requirements.

## GSD Workflow

This project uses GSD (Get Shit Done) for structured planning and execution.

### Key commands

```
/gsd-discuss-phase <N>   — gather context and clarify approach for a phase
/gsd-ui-phase <N>        — generate UI design contract (for visual phases)
/gsd-plan-phase <N>      — create detailed execution plan for a phase
/gsd-execute-phase <N>   — execute all plans in a phase
/gsd-progress            — check current status
/gsd-settings            — update workflow preferences
```

### Current state

- **Active phase:** Phase 1 — Visual Foundation
- **Roadmap:** `.planning/ROADMAP.md`
- **Requirements:** `.planning/REQUIREMENTS.md`
- **State:** `.planning/STATE.md`

## Architecture notes

- Jekyll + GitHub Pages static site (al-folio base)
- Design token system: `_sass/_variables.scss` (build-time) + `_sass/_themes.scss` (runtime CSS custom properties)
- Color changes: edit `_themes.scss` — `--global-theme-color` propagates site-wide
- Font changes: update `_config.yml` Google Fonts URL + `_sass/_base.scss` font-family declarations
- Homepage: content sections in `_pages/about.md`, template structure in `_layouts/about.liquid`
- PurgeCSS runs in CI — any new CSS class families must be added to `purgecss.config.js` safelist

## Critical constraints

- Static site only — no server-side code
- `bib.liquid` is tightly coupled — treat as read-only during visual phases
- Dark mode currently disabled — do not add dark-mode-unsafe CSS
- All changes must pass GitHub Actions deployment (`ruby 3.3.5`)
