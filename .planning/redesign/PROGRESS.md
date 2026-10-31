# Redesign execution ledger — .planning/redesign/PLAN.md

- Existing checkout clean at start. Working on codex/research-applied-ai-redesign in the current local checkout; no worktree required for this local-first task.
- Approved preview and interview consolidate into DESIGN.md; user authorized implementation with “ok go ahead.”
- Dependency installation started in ignored vendor/bundle, using available Homebrew Ruby 3.4.2. CI Ruby 3.3.5 unchanged.
- Original bibliography template will remain unchanged. New template preserves semantic rows with native details.
- Provisional date ruling: use dated April 28, 2026 defense announcement over stale 2025 CV; confirm in handoff. Employment date uncertainty uses “Current”/“Previously.”

- Task 1/2 implemented. Original baseline built with a temporary local override (image conversion off, unused demo notebook excluded); rendered checks correctly failed for missing sections, current employer/email and EMNLP PDF.
- Production redesign build passed (143.969 seconds); development build passed (2.925 seconds). First four rendered checks passed. The fifth metadata regression test reproduced stale FBK schema, then passed after using current role/employer settings.
- Reviewer found skip-link contrast and stale structured metadata. Both reproduced and corrected. Native Abstract and Bib disclosures and direct PDF rows verified in browser; filtering Stranger shows exactly one paper.
- Browser checks at 375px: home/publications/CV have no horizontal overflow. Long publication titles wrap. Legacy CV heading levels skipped h2/h3; regression test reproduced it, then headings were corrected without changing their visual scale.
- Test adjustment: author checks normalize HTML whitespace so both development and production output are tested as rendered text, not formatting.

- Final production build passed in 3.056 seconds. Disabling redundant CSS minification (Sass already compresses it) reduced build time from ~145 seconds without changing the design.
- Production cleanup uncovered a pre-existing PurgeCSS CLI/CommonJS import issue: module.exports object was invisible to its dynamic import, silently yielding zero input files. A new import regression check failed first; named CommonJS exports fixed it. The real CLI processed 11 stylesheets; main.css reduced from 634,207 to 40,567 bytes.
- Final verification: 6/6 rendered-site checks; deployment config import check; JavaScript and preview-script syntax; changed-file Prettier checks; git diff whitespace checks. Original \_layouts/bib.liquid unchanged.
- Browser QA after actual CSS cleanup: home, publications and CV at 375px, 768px and 1280px, all without horizontal overflow. Verified PDF targets, native abstract expansion, working publication filter, keyboard skip-to-main focus and scroll section cue. Tablet name renders with a space. Body text contrast >=6.41:1 on the brightest background; skip link 10.91:1.
- Reviewer P2 fixes: skip-link contrast and current Person schema both corrected. Internal homepage field filtered out of exported citations. CV heading regression reproduced and corrected.
- Local runtime is Ruby 3.4.2; GitHub Actions remains configured for Ruby 3.3.5. Remote CI not run because local-only work was requested. No push, deployment, merge or commit performed.
- Local preview remains at http://127.0.0.1:4000/ for review. Restart with bin/preview when needed. Branch: codex/research-applied-ai-redesign.

## Review refinements

- Identity changed to AI Researcher & Engineer; introduction uses “an AI researcher and engineer.” Removed the rejected explanatory sentence without adding replacement wording.
- Homepage keeps the two latest milestones and now links to All milestones. The existing /news/ route presents all 16 source events in reverse chronology, linked to their preserved detail pages. Added archive links in secondary navigation and the footer.
- Production build passed (3.078 seconds), actual PurgeCSS cleanup passed, 7/7 rendered checks passed (including all archive entries and local detail links), config import check passed, and git diff whitespace check passed.
- Browser refresh tooling returned “browser.user is unavailable”; rendered output was checked directly. The local server continues serving the rebuilt pages.

## Publication

- User explicitly authorized GitHub publication after reviewing the local redesign and refinements.
- Fetched origin; local starting commit and origin/main are identical (f947b6d). No remote work needs reconciliation.
- Final production build passed (3.399 seconds); CSS cleanup, 7/7 rendered checks, PurgeCSS import regression, JavaScript and preview-script syntax, changed-file formatting and whitespace checks passed before committing.
