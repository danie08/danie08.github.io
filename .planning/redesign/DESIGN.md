# Research and applied AI redesign — agreed design, 2026-10-31

## Intent

Present Daniela Occhipinti as an AI researcher and engineer, connecting interlocutor-aware dialogue research with practical LLM applications and careful evaluation. Professional, approachable writing; autonomy is a motivation, not a claim that existing products serve particular vulnerable groups.

## Agreed presentation

A navy, slate and restrained teal design inspired by Brittany Chiang. Spacious desktop identity sidebar with portrait, name, role, section navigation and social links; flowing content on the right. Mobile stacks the identity and content. Keyboard access, readable contrast, reduced motion and meaningful headings are required.

Homepage: introduction and motivation → research question and selected papers → Applied AI → concise background/CV → compact milestones → simple contact. Research wording approved in the interview begins “AI that adapts to who it’s talking to.” Applied AI covers designing/developing LLM applications, RAG, agents and evaluation pipelines including LLM/agent judges. No confidential project or client details.

Publications retain year grouping, venue badges, available thumbnails, full titles, authors, proceedings and resource controls. Titles and PDF controls open the papers directly. Full publications and updated CV remain separate local pages. Preserve relevant existing profile links; use dani.occhipinti91@gmail.com as main email. Add EMNLP 2026 and PhD completion milestones.

## Approaches considered

Warm editorial, green studio and plum notebook were rejected. A navy continuous portfolio layout was selected after reviewing Brittany Chiang. Research-first narrative was selected over leading with industry. Build within Jekyll rather than migrate platforms; this implementation choice preserves GitHub Pages and existing data/content.

## Constraints and calls

Local only; no push, publish or deployment. Ruby 3.3.5 CI retained. Static files only. Original \_layouts/bib.liquid is read-only. New class families are safelisted for PurgeCSS. Both default and dark token sets use the approved navy palette, without enabling a theme switcher.

Retain existing historical pages/URLs but remove redundant Projects/News destinations from primary navigation. Complete publication list and CV inherit the same shell. Keep all known papers in the full list; select the recent interlocutor papers on home.

Dates conflict: old CV says PhD 2025, defense news and LinkedIn indicate April 2026. Use the existing dated defense announcement (28 April 2026) for completion and mark this as provisional in handoff. Ricca IT current role is confirmed; use “Current” where precise start/end dates are not reliably available. Do not fabricate employment dates.

## Approval

User approved the visual preview, research wording, narrative flow, full titles and familiar publication layout, then instructed “ok go ahead.” This record consolidates those decisions; implementation is authorized by that instruction.

## Review refinements

- Use “an AI researcher and engineer”; remove the rejected sentence about exploring language models and turning learning into practical systems.
- Keep recent milestones on home, with an explicit All milestones link to the complete chronological history at /news/. Retain all 16 source entries and link each to its existing detail page. Make Milestones reachable from secondary-page navigation and the footer.

## Publication authorization

After reviewing the local implementation and wording/history refinements, Daniela explicitly requested pushing the changes to GitHub so the site can go online. The earlier local-only restriction is lifted for publishing this redesign through the repository's existing main-branch GitHub Pages workflow.
