# Feature Landscape: Academic Personal Website Redesign

**Domain:** Academic personal website — NLP researcher, dual audience (hiring committees + peers)
**Researched:** 2026-04-30
**Confidence note:** External web access was blocked during this session. Findings are drawn from
(a) direct inspection of the current codebase and its audit reports, (b) knowledge of academic web
conventions and the al-folio ecosystem as of the knowledge cutoff (August 2025), and
(c) observed patterns in the existing site that already exceed typical al-folio defaults.

---

## Starting Point: What the Site Already Has

Before listing what's missing, document what is already working above the al-folio baseline.
These are NOT gaps — they should be preserved and built upon.

| Feature | Current State | Assessment |
|---------|--------------|------------|
| Hero thesis statement | `.hero-thesis` — fluid font, max-width constrained | Good. Slightly generic styling; could be more visually distinctive |
| Research question grid | 3-column card grid on homepage | Good structure; cards currently look like all other cards on the page |
| Homepage highlights panel | 2-column grid of recent milestones | Useful; visual weight equal to everything else — does not read as "most important" |
| "Currently" section | Card with current focus | Good; content may be stale (see content audit) |
| Collaboration CTA | Bottom of homepage | Exists; visually indistinguishable from research cards |
| Selected papers on homepage | Section via `selected_papers.liquid` | Functional; relies on al-folio default paper list style |
| Project story framing | Each project framed as Q/contribution/takeaway | Excellent — this is a real differentiator already |
| Design tokens | Space, radius, type scale defined in `_variables.scss` | Foundation exists; color palette is still al-folio defaults |
| Social profiles | All major academic platforms linked | Complete |
| News feed | 14 items, well-maintained | Present; limited visual personality |

---

## Table Stakes

Features every good academic personal website in 2025 has. Their absence signals neglect or
a pure template — they do not make a site memorable but their absence immediately signals amateur.

| Feature | Why Expected | Complexity | Current State |
|---------|--------------|------------|---------------|
| Clear name + affiliation above the fold | Visitors need to orient immediately | Low | Present via `post-title` + subtitle |
| Profile photo | Humanizes; hiring committees expect it | Low | Present (`prof_pic.jpeg`) |
| One-paragraph research summary | What you work on and why | Low | Present but split across multiple sections |
| Publications list with venue badges | Core credential signal | Low | Present and well-implemented |
| CV page (or PDF link) | Required for hiring workflows | Low | CV page exists; PDF missing (content audit H1) |
| Contact / social links | Expected on every researcher site | Low | Present and complete |
| Mobile-responsive layout | Non-negotiable in 2025 | Medium | Bootstrap grid handles basics; custom grids need verification |
| Working links (no 404s, no dead coauthor URLs) | Professionalism signal | Low | Minor issues noted (content audit M2, M3) |
| Page titles and meta descriptions | SEO and social sharing | Low | About and Publications pages missing descriptions (SEO audit M-1, M-2) |
| Unique color identity — even minimal | Visitors pattern-match "another al-folio" instantly | Medium | Currently uses al-folio blue (`#0076df`); no custom palette |

---

## Differentiators

Features that distinguish excellent academic sites from competent ones. None are expected —
their presence creates the "memorable" impression that makes the difference between a site
a hiring committee forgets and one they remember.

### Visual Identity

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Custom color palette with semantic meaning | Immediately signals intentionality; al-folio blue is a dead giveaway | Low–Medium | Change `--global-theme-color` + define 2-3 supporting tones. Warm palette (terracotta, sand, muted olive) fits NLP/humanities origin; cooler palette (slate, teal) fits CS-facing persona |
| Distinctive type pairing | Typography is the highest-leverage visual signal after color | Medium | Current site uses system/Bootstrap fonts. One display font for headings (e.g. a humanist serif for the name/h1 or a geometric sans) + kept body font creates instant character |
| Intentional whitespace — not Bootstrap defaults | Generic sites use default Bootstrap margins; distinctive sites adjust rhythm | Medium | Current spacing tokens exist (`$space-*`) but values are Bootstrap-adjacent defaults |
| Profile photo with personality (not mugshot crop) | Warm, human, approachable — not a passport photo cropped to a box | Low | Two photos exist (`prof_pic.jpeg` and `prof_pic_color.jpeg`). Color version likely warmer. Photo treatment (size, shape, any decorative frame) matters |
| Consistent visual hierarchy across ALL pages | Hiring committees read About → Publications → CV in sequence; the visual system should hold | High | Currently pages share some styles but each section of the homepage has the same card weight — no clear hierarchy of importance |

### Homepage Layout and First Impression

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Name as typographic statement, not just text | The name is the brand; treat it with type weight, not just content | Low | Currently `<h1 class="post-title">` with no special treatment |
| Research pitch that reads like a human wrote it, not a grant abstract | Hiring committees and collaborators are people; conversational tone makes them stay | Low | The hero thesis already does this. The secondary paragraphs are more formal and could be warmer |
| Visual separation between "who I am" and "what I've done" | The most memorable sites put the human first, credentials second | Medium | Currently the homepage flows: hero → highlights → bio paragraphs → currently → research questions → news → publications. The credentials (highlights, papers) arrive before the human context (bio paragraphs). Consider reordering |
| A single visual anchor on the page | One element that carries visual weight and stops scrolling — usually the photo or a large typographic element | Medium | The profile photo floats right and is modest in size. Making it bolder or giving the hero section a distinct background treatment creates an anchor |
| Research questions framed for a non-specialist | The 3-question grid already exists and is conceptually strong. What would make it great: framing that a curious person outside NLP can understand in 5 seconds, then specialists get more | Low | Currently the questions assume familiarity with "persona" and "interlocutor" as technical terms. One human-readable framing per question, with the technical term underneath, would serve both audiences |

### Content Patterns That Signal Seriousness

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Paper abstracts rewritten as plain-language summaries | Distinguishes researchers who can communicate from those who cannot | Low | Currently the selected papers on the homepage use the BibTeX abstract. Rewriting 2-3 sentences per paper in plain language signals communication skill — critical for faculty applications |
| Explicit statement of research vision, not just research topic | "I work on dialogue" vs "I want to understand what makes a conversation feel like it is with a specific person, not a generic machine" — the second is memorable | Low | The hero thesis partially does this. It could go further by making the vision explicit: why does this matter for the world, not just the field |
| Publication context on the publications page | A short note before each paper explaining where it fits in the research arc | Low | The content audit says this "Start Here" section already exists on Publications. Preserve and expand it |
| Named research thread | Giving the program of work a name or framing ("I am building toward X") makes the arc legible to outsiders | Low | Currently implicit. Could be made explicit with 1-2 sentences at the top of the homepage or Publications page |
| Active news with photos | Conference attendance photos humanize the researcher and show active community participation | Low | Photos exist in `assets/img/` for ACL 2025, ACL 2024, CLICIT 2024, NAACL 2024, PhD defense. News items include some already. Ensuring every venue has a news item with a photo builds the timeline |

### Typography and Readability Signals

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Optimized line length for reading | Academic text at >80 characters per line is harder to read; good sites constrain body text to ~65ch | Low | Current `max-width: 930px` on `.container` is wide; body text paragraphs run long |
| Comfortable paragraph spacing | Generic sites use browser defaults; intentional sites increase `margin-bottom` on `<p>` slightly | Low | Current `line-height: 1.65` is good; paragraph spacing can be increased |
| Distinct heading scale | h1/h2/h3 should each feel clearly different in weight, not just size | Low | Current type scale tokens exist but the heading styles are not significantly differentiated by weight |
| Section dividers that are not `<hr>` | `<hr>` with `border-top: 1px solid` is pure al-folio. Section headings with left-border accent, subtle background shift, or typographic caps feel more intentional | Medium | Currently h2 section headings in the homepage have no special treatment |

### Personal Touches That Humanize

These are the "warmth" signals. None require new pages or structural changes.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Origin story in the bio ("My path into NLP began…") | Makes the researcher a person, not a credential list | Low | ALREADY EXISTS in the current about.md. Strong. Preserve it. |
| Language about why the work matters to you, not just to the field | Motivation signals genuine investment, which hiring committees read | Low | Partially present in the hero thesis. Could be slightly stronger in the "What My Research Is About" framing |
| Mention of geographic/cultural context | Trento, Italy, FBK, Digital Humanities background at Pisa — these are distinctive markers that make the researcher memorable | Low | Present. Could be surfaced slightly more prominently |
| Visible evidence of community participation | Conference photos, news items about workshops, invited talks | Low | News items exist. Photo coverage is partial |
| A short, specific "What I'm looking for" or "Open to" signal for hiring audiences | Hiring committees want to know if a candidate wants what they are offering | Low | Not currently present. Could be added to the "Currently" card or the collaboration CTA |

---

## Anti-Features

Things that are present on many academic sites (including this one in its current state) that
actively undermine the goal of a warm, distinctive, memorable presence.

### Visual Anti-Features

| Anti-Feature | Why It Hurts | What to Do Instead |
|--------------|-------------|-------------------|
| al-folio default blue `#0076df` as theme color | Instant pattern-match: "another al-folio site." The color is not bad but it signals no design intent | Choose a color that means something to Daniela's field or personality. Even a small shift (e.g. a warmer medium blue, or a muted teal) combined with changed secondary tones reads as intentional |
| All homepage sections using identical card style | When every section (highlights, currently, research questions, collaboration CTA) looks the same, nothing reads as important | Use visual weight to create hierarchy: the hero section and research vision should dominate; supporting sections should recede |
| Profile photo at 30% width floating right | A small floating photo is the al-folio default. It works but it does not make the visitor feel they have met someone | Consider a larger photo treatment for the above-the-fold section, or a slightly unconventional crop/framing |
| Bootstrap utility classes driving all spacing | Sites where spacing is generated by `mt-5`, `mb-3` etc. have a mechanical rhythm. Custom spacing tokens exist but need to replace utility classes | Replace `mt-5` etc. on key layout elements with `$space-*` tokens or custom values |
| `footer_text` advertising al-folio | "Powered by Jekyll with al-folio theme" in the footer is the final signal that this is a template | Remove the al-folio reference from `footer_text` in `_config.yml`. Keeping "Powered by Jekyll" is fine |

### Content Anti-Features

| Anti-Feature | Why It Hurts | What to Do Instead |
|--------------|-------------|-------------------|
| Raw BibTeX abstracts as publication summaries | BibTeX abstracts are written for indexing, not communication. They often start with "In this paper…" | Rewrite 1-2 sentences per selected paper that describe what the reader learns, not what the paper contains |
| Subtitle "Researcher at Fondazione Bruno Kessler" with no research framing | The subtitle appears under the name on every page. "Researcher at X" tells visitors nothing about what distinguishes this researcher | Consider "NLP Researcher — persona-based dialogue generation" or similar, so the research identity leads |
| PhD status ambiguity ("completing a PhD" when PhD is awarded) | Creates doubt about candidate's stage. Content audit flagged this as H2 | Update to "I completed my PhD with honors in 2025" throughout |
| Stale "Currently" section | If the currently section describes a past state, it signals the site is not maintained | Update to reflect actual current research focus post-PhD |
| Contact note in body ("You can reach me at docchipinti@fbk.eu") without a mailto link | Plain text email addresses are convenient but look informal; no link means extra steps for visitors | Wrap in `<a href="mailto:...">` and consider making the CTA section more prominent |
| News items with no categorization | 14 items in a flat list; the diversity of events (publications, talks, PhD, conferences) is invisible | Consider subtle visual labels (badge or prefix) distinguishing publication news from conference attendance from milestone news |

### Structural Anti-Features

| Anti-Feature | Why It Hurts | What to Do Instead |
|--------------|-------------|-------------------|
| Homepage section order: highlights → bio → currently → questions | Credentials arrive before the person. The bio paragraphs—which contain the origin story and research framing—are buried after the highlight grid | Reorder: hero thesis → origin/bio → research vision (questions grid) → recent highlights → selected publications |
| Research question grid with identical visual weight to other cards | The 3 research questions are the intellectual heart of the site but look the same as the "Currently" box | Give the research question grid distinct visual treatment — different background tone, or drop the border and use generous internal padding instead |
| Collaboration CTA at the bottom in a generic card | It reads as an afterthought. A CTA that is visually separated and uses warm, specific language makes the difference | Remove the border-box treatment; let it breathe with whitespace; use first-person and specific language about what collaboration looks like |

---

## Feature Dependencies

```
Custom color palette → All visual anti-features resolved (single change propagates site-wide)
Typography pairing → Heading hierarchy → Section differentiation
Homepage section reorder → Visual hierarchy → Credential vs. human balance
Bio rewrite (PhD status, currently) → Credibility signals for hiring committees
Plain-language paper summaries → Research vision legibility for both audiences
```

---

## MVP Recommendation

Five changes that together move the site from "al-folio" to "Daniela's site" with the lowest risk
of breaking existing functionality:

1. **Custom color palette** — change `--global-theme-color` and 2-3 supporting CSS custom properties in `_themes.scss`. This is a 10-line change that transforms the entire visual identity. Pick colors deliberately; do not just shift the hue.

2. **Add one display typeface for headings** — import via Google Fonts in `head.liquid`, target `h1, h2` in `_base.scss`. Pairing a humanist serif (e.g. Lora, Playfair Display, or DM Serif Display) with the existing system sans-serif creates immediate character that no default al-folio site has.

3. **Homepage section reorder** — move the bio paragraphs (origin story + research vision) above the highlights grid. This is a content-order change in `_pages/about.md` only; no layout changes needed.

4. **Subtitle update** — change the subtitle from "Researcher at Fondazione Bruno Kessler" to something that leads with research identity (e.g. "NLP Researcher, persona-based dialogue · FBK Trento"). One-line change in `about.md` front matter.

5. **Remove al-folio attribution from footer** — one-line change in `_config.yml` (`footer_text`). The last thing a visitor reads should not name the template.

**Defer:** Complete visual hierarchy overhaul (different treatment for each section type), profile photo redesign, and paper summary rewrites — these are valuable but require more effort and can follow the identity foundation above.

---

## What the Site Already Gets Right (Do Not Break)

- The origin story paragraph ("My path into NLP began in Digital Humanities at Pisa") is genuinely warm and distinctive. Preserve it.
- The 3-question research grid structure is strong. Only the styling needs work.
- The project story framing (question / contribution / takeaway) is above-average for academic sites. Keep it.
- The selected papers section on the homepage with contextual framing is not common on al-folio sites — it likely represents custom work already done. Preserve and improve the presentation rather than replacing it.
- The news timeline with 14 items spanning 2018–2025 tells a career story. Many academic sites neglect news entirely.
- The collaboration CTA's existence and specific language ("researchers, students, and collaborators interested in persona-based dialogue generation") is more specific than most. Keep the specificity; improve the visual treatment.

---

## Sources

All findings drawn from direct inspection of:
- `/Users/daniela/Desktop/website/danie08.github.io/_pages/about.md`
- `/Users/daniela/Desktop/website/danie08.github.io/_layouts/about.liquid`
- `/Users/daniela/Desktop/website/danie08.github.io/_sass/_base.scss`
- `/Users/daniela/Desktop/website/danie08.github.io/_sass/_variables.scss`
- `/Users/daniela/Desktop/website/danie08.github.io/_sass/_themes.scss`
- `/Users/daniela/Desktop/website/danie08.github.io/_config.yml`
- `/Users/daniela/Desktop/website/danie08.github.io/reports/content-audit-2026-03-17.md`
- `/Users/daniela/Desktop/website/danie08.github.io/reports/a11y-audit-2026-03-17.md`
- `/Users/daniela/Desktop/website/danie08.github.io/reports/seo-audit-2026-03-17.md`

Confidence: MEDIUM-HIGH for current-state analysis (based on direct code inspection).
Confidence: MEDIUM for "what distinguishes memorable academic sites" (based on training data
knowledge of academic web conventions, al-folio ecosystem patterns, and NLP/CS researcher
community norms as of August 2025 — not verified against live examples due to tool restriction).
