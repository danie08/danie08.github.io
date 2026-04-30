# Phase 3: Content Accuracy - Pattern Map

**Mapped:** 2026-04-30
**Files analyzed:** 1 (only `_bibliography/papers.bib` is modified)
**Analogs found:** 1 / 1 (the existing `.bib` entries themselves are the analog)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `_bibliography/papers.bib` | data/content | transform (BibTeX → rendered HTML) | existing entries in same file | exact |

All other canonical refs (`_layouts/bib.liquid`, `_pages/publications.md`, `_pages/about.md`, `_data/cv.yml`) are read-only for this phase — no pattern extraction needed for modification purposes.

---

## Pattern Assignments

### `_bibliography/papers.bib` (data/content, BibTeX → HTML transform)

**The only change:** Add a `note:` field to each existing BibTeX entry. The field is already rendered by the template — no template changes needed.

---

#### Rendering context — where `note:` appears

**Analog:** `_layouts/bib.liquid` lines 186–191

```liquid
<div class="periodical">
  {{ periodical | strip }}
</div>
<div class="periodical">
  {{ entry.note | strip }}
</div>
```

The `note:` value is rendered as plain text inside a `.periodical` div, immediately after the venue/year line. No HTML is applied. Write the value as a plain sentence — no markup, no italics, no links.

---

#### BibTeX field syntax pattern

**Analog:** existing fields in `_bibliography/papers.bib` (e.g., `abstract =`, `abbr =`, `bibtex_show =`)

The file uses two spacing conventions interchangeably — both are accepted by Jekyll-Scholar:

```bibtex
  note = {One-line plain-language description of what the paper is about.},
```

Place `note` after `bibtex_show` and before the closing `}` of each entry. Use curly-brace delimiters `{...}`, consistent with all other string fields in the file.

---

#### Tone and voice pattern — what the note: descriptions must sound like

**Source:** `_pages/publications.md` featured cards (the canonical voice reference per D-04)

Featured card for ACL 2025 (lines 23):
```
This paper is the strongest expression of my current research direction: dialogue models
should adapt not only to a target persona, but also to the interlocutor and the
relationship between speakers.
```

Featured card for ACL 2024 (line 28):
```
HED-IT asks how human post-editing affects the quality of dialogue training data,
connecting model behavior to the often-hidden question of what counts as good
conversational supervision.
```

Featured card for NAACL 2024 (line 33):
```
PRODIGy introduces a dataset for studying richer speaker representations in dialogue
generation and lays the groundwork for much of my later work on persona-aware systems.
```

**Voice rules extracted from these examples:**
- One sentence. Full sentence, not a fragment.
- Research-value-focused: what question does the paper ask, or what does it contribute — not what method was used.
- First word is not "We" or "This paper uses" — lead with the research object or the question.
- No jargon: avoid "fine-tuning", "LLM", "SVM", "UmBERTo" in the note (those belong in the abstract).
- Consistent with Daniela's authorial voice — direct, intellectually precise, not promotional.

---

#### Per-paper note: content to write

The `.bib` file contains four entries. Notes must be written for all four (D-03).

**Entry 1 — EVALITA 2020** (`occhipinti:etal:2020italianlp`)
- Title: "ItaliaNLP @ TAG-IT: UmBERTo for Author Profiling at TAG-it 2020"
- What it is: Author profiling shared task — identifying author attributes from text using Italian BERT.
- Suggested note (Claude's discretion per CONTEXT.md):
  `An early system paper on author profiling in Italian, using a pretrained transformer to infer speaker attributes from text — and winning all subtasks.`

**Entry 2 — ACL 2025** (`occhipinti-etal-2025-superman`)
- Featured card text is longer and more reflective; the note: should be a tighter one-liner.
- Suggested note:
  `Explores how dialogue generation changes when models know not just who is speaking, but who they are speaking to — and what that relationship means for consistency.`

**Entry 3 — ACL 2024** (`occhipinti-etal-2024-fine`)
- Featured card already provides the right framing.
- Suggested note:
  `Investigates how human post-editing of machine-generated dialogues affects model training, finding that data quality matters most for smaller models.`

**Entry 4 — NAACL 2024** (`occhipinti:etal-2024-prodigy`)
- Featured card already provides the right framing.
- Suggested note:
  `Introduces PRODIGy, a dataset pairing movie-script dialogues with rich speaker profiles — personality, biography, and communication style — to support persona-aware dialogue generation.`

The planner/executor MUST use the voice rules above to refine or replace these suggestions if needed. The suggestions here are a starting point, not locked copy.

---

## Shared Patterns

None applicable. This phase has a single file and a single field type. There are no cross-cutting concerns (no auth, no error handling, no SCSS tokens).

The one shared constraint across all four note: additions:
- Plain sentence, no HTML, no BibTeX special characters that require escaping.
- If the sentence naturally contains a comma or colon, that is fine — BibTeX `{...}` delimiters handle it without escaping.

---

## No Analog Found

None. The `note:` field pattern is fully covered by the existing `.bib` entries and the rendering logic in `bib.liquid`. The tone pattern is fully covered by the featured cards in `publications.md`.

---

## Metadata

**Analog search scope:** `_bibliography/`, `_layouts/bib.liquid`, `_pages/publications.md`
**Files scanned:** 3
**Pattern extraction date:** 2026-04-30
