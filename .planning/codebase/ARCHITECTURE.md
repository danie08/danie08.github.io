<!-- refreshed: 2026-04-30 -->
# Architecture

**Analysis Date:** 2026-04-30

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────┐
│                        Browser / GitHub Pages                        │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ static HTML/CSS/JS
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Jekyll Build Pipeline                           │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │   _pages/    │  │   _news/     │  │    _bibliography/        │  │
│  │  *.md pages  │  │ news posts   │  │    papers.bib            │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│         │                 │                        │                 │
│         ▼                 ▼                        ▼                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │               _layouts/*.liquid  +  _includes/*.liquid        │   │
│  │   default → about / page / post / cv / bib                   │   │
│  └──────────────────────────┬───────────────────────────────────┘   │
│                             │                                        │
│  ┌──────────────┐           │  ┌─────────────┐                      │
│  │   _data/     │──────────▶│  │  _plugins/  │                      │
│  │  *.yml data  │           │  │  *.rb Ruby  │                      │
│  └──────────────┘           │  └─────────────┘                      │
│                             │                                        │
│  ┌──────────────┐           │                                        │
│  │   _sass/     │──────────▶│                                        │
│  │  *.scss      │           │                                        │
│  └──────────────┘           ▼                                        │
│                       _site/ (output)                                │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Site config | All global settings, plugins, scholar config, feature flags | `_config.yml` |
| Default layout | HTML shell: `<head>`, `<body>`, navbar, footer, scripts | `_layouts/default.liquid` |
| About layout | Homepage with profile, news feed, selected papers, social | `_layouts/about.liquid` |
| Page layout | Generic content page with optional TOC and related publications | `_layouts/page.liquid` |
| Post layout | News/blog post with breadcrumbs, tags, categories, comments | `_layouts/post.liquid` |
| CV layout | Structured CV driven entirely by `_data/cv.yml` | `_layouts/cv.liquid` |
| Bib layout | Single bibliography entry row (venue badge, authors, links, abstract) | `_layouts/bib.liquid` |
| Head include | CSS links, meta tags, OG/Schema.org, dark mode init | `_includes/head.liquid` |
| Header include | Fixed navbar built from `site.pages` with `nav: true` | `_includes/header.liquid` |
| Scripts include | Conditional JS loading (jQuery, Bootstrap, analytics, search, etc.) | `_includes/scripts.liquid` |
| News include | Scrollable table of `site.news` entries, limited by config | `_includes/news.liquid` |
| Selected papers | Bibliography query filtered to `selected=true` entries | `_includes/selected_papers.liquid` |
| Bib search | Search overlay over the full bibliography | `_includes/bib_search.liquid` |
| Social include | Social icon links from `_data/socials.yml` and `_config.yml` | `_includes/social.liquid` |
| CV sub-includes | Typed CV sections: list, map, time_table, nested_list, list_groups | `_includes/cv/*.liquid` |
| Resume sub-includes | JSON Resume section renderers | `_includes/resume/*.liquid` |
| Cache-bust plugin | MD5-based asset fingerprinting for CSS/JS cache invalidation | `_plugins/cache-bust.rb` |
| Scholar citations plugin | Fetches Google Scholar citation counts at build time | `_plugins/google-scholar-citations.rb` |
| Hide custom bibtex plugin | Strips internal-only BibTeX fields from rendered output | `_plugins/hide-custom-bibtex.rb` |
| Remove accents plugin | Normalizes author names for coauthor lookup | `_plugins/remove-accents.rb` |
| External posts plugin | Pulls in external RSS/post sources | `_plugins/external-posts.rb` |

## Pattern Overview

**Overall:** Static Site Generation (Jekyll/Liquid template engine)

**Key Characteristics:**
- All pages are built at deploy time into `_site/`; there is no runtime server logic
- Content is authored in Markdown with YAML front matter; structure is enforced through layouts
- Data-driven components: CV sections, venues, coauthors, and social links are all driven by YAML files in `_data/`
- Publications are driven entirely by `_bibliography/papers.bib` parsed by `jekyll-scholar`
- The navbar is auto-generated from any `_pages/*.md` file that declares `nav: true` and a `nav_order`
- Feature flags in `_config.yml` control optional JS loading (dark mode, search, masonry, math, analytics)

## Layers

**Content Layer:**
- Purpose: Source material for all pages, posts, and the bibliography
- Location: `_pages/`, `_news/`, `_bibliography/`, `_posts/` (empty)
- Contains: Markdown files with YAML front matter, BibTeX file
- Depends on: Layout layer (via `layout:` front matter key)
- Used by: Jekyll build process

**Data Layer:**
- Purpose: Structured YAML data consumed by layouts and includes, not authored as pages
- Location: `_data/`
- Contains: `cv.yml` (CV sections), `coauthors.yml` (coauthor URL map), `venues.yml` (venue badges), `socials.yml`
- Depends on: Nothing
- Used by: `_layouts/cv.liquid`, `_layouts/bib.liquid`, `_includes/social.liquid`, `_includes/header.liquid`

**Layout Layer:**
- Purpose: Page-level HTML wrappers that inject `{{ content }}` and call includes
- Location: `_layouts/`
- Contains: `.liquid` templates; inheritance chain is `about/page/post/cv/bib → default`
- Depends on: Include layer, Data layer
- Used by: Content layer pages via `layout:` front matter

**Include Layer:**
- Purpose: Reusable partial HTML fragments composed into layouts
- Location: `_includes/`, `_includes/cv/`, `_includes/resume/`, `_includes/repository/`
- Contains: `.liquid` partials for header, footer, head, news, papers, social, search
- Depends on: Data layer, `_config.yml` site variables
- Used by: Layout layer

**Style Layer:**
- Purpose: SCSS compiled to `assets/css/main.css`
- Location: `_sass/`
- Contains: `_variables.scss`, `_themes.scss`, `_layout.scss`, `_cv.scss`, `_base.scss`, `_distill.scss`, `_tabs.scss`, `_typograms.scss`, plus `font-awesome/` and `tabler-icons/` icon sets
- Depends on: Nothing
- Used by: Browser via `assets/css/main.scss` entrypoint

**Plugin Layer:**
- Purpose: Custom Ruby logic extending Jekyll's build
- Location: `_plugins/`
- Contains: `cache-bust.rb`, `google-scholar-citations.rb`, `hide-custom-bibtex.rb`, `remove-accents.rb`, `file-exists.rb`, `external-posts.rb`, `download-3rd-party.rb`, `inspirehep-citations.rb`
- Depends on: Jekyll Ruby API, external HTTP (for citation fetching)
- Used by: Jekyll build; Liquid templates call plugin-registered filters/tags

**Asset Layer:**
- Purpose: Static files served directly: JS, CSS, fonts, images
- Location: `assets/`
- Contains: `assets/js/` (feature JS files), `assets/css/` (compiled and vendor CSS), `assets/img/` (profile pic, conference photos, publication previews), `assets/fonts/`, `assets/json/`, `assets/bibliography/`
- Depends on: Nothing at build time
- Used by: Browser

## Data Flow

### Primary Page Request Path

1. User requests URL (e.g., `/`) — served from `_site/index.html`
2. Jekyll matched `_pages/about.md` → `layout: about` front matter
3. `_layouts/about.liquid` wraps page content; declares `layout: default`
4. `_layouts/default.liquid` assembles full HTML: calls `{% include head.liquid %}`, `{% include header.liquid %}`, injects `{{ content }}`, calls `{% include footer.liquid %}`, `{% include scripts.liquid %}`
5. Within `about.liquid`: `{% include news.liquid %}` queries `site.news` collection (from `_news/*.md`), limited by `site.announcements.limit`
6. Within `about.liquid`: `{% include selected_papers.liquid %}` runs `{% bibliography --query @*[selected=true]* %}` against `_bibliography/papers.bib`
7. Output written to `_site/index.html` at build time

### Publications Page Path

1. `_pages/publications.md` → `layout: page`
2. Page body manually includes `{% include bib_search.liquid %}` then `{% bibliography %}`
3. `jekyll-scholar` parses `_bibliography/papers.bib`, groups by year descending
4. Each entry is rendered with `_layouts/bib.liquid`
5. `bib.liquid` looks up `site.data.venues[entry.abbr]` for badge color/URL
6. `bib.liquid` looks up `site.data.coauthors[clean_last_name]` (via `remove-accents` plugin) to link coauthor names
7. Citation counts fetched from Google Scholar via `_plugins/google-scholar-citations.rb` at build time

### CV Page Path

1. `_pages/cv.md` → `layout: cv`
2. `_layouts/cv.liquid` iterates `site.data.cv` (from `_data/cv.yml`)
3. Each entry dispatches to the appropriate `_includes/cv/*.liquid` partial based on `entry.type` (`list`, `map`, `time_table`, `nested_list`, `list_groups`)

### News Item Path

1. `_news/YYYY-MM-DD.md` files are a Jekyll collection named `news`
2. Each uses `layout: post`
3. `_layouts/post.liquid` renders breadcrumbs (Home / News / title), date, content
4. `_includes/news.liquid` on the about page iterates `site.news | reverse` and limits to `site.announcements.limit`

**State Management:**
- No client-side state management; this is a static site
- `_config.yml` acts as global compile-time configuration
- Feature flags in `_config.yml` (e.g., `enable_darkmode: true`) control which JS is included in `_includes/scripts.liquid`
- Dark mode preference persisted in `localStorage` via `assets/js/theme.js` (loaded synchronously in `<head>` to prevent flash)

## Key Abstractions

**Jekyll Collection (`news`):**
- Purpose: A group of related Markdown documents that Jekyll processes together
- Examples: `_news/2025-06-05.md`, `_news/2024-12-04.md`
- Pattern: YAML front matter (`layout: post`, `inline: true/false`) + Markdown body; accessible as `site.news`

**Liquid Layout Inheritance:**
- Purpose: Templates extend each other via `layout:` front matter, avoiding duplication
- Examples: `about.liquid` → `default.liquid`; `bib.liquid` standalone (called by `jekyll-scholar`)
- Pattern: Child layout declares `layout: parent` in its own YAML front matter block

**Data-Driven CV:**
- Purpose: CV content is fully separated from presentation
- Examples: `_data/cv.yml` entries with `type: time_table`, `type: list`
- Pattern: `cv.liquid` switches on `entry.type` and delegates to `_includes/cv/[type].liquid`

**jekyll-scholar Bibliography:**
- Purpose: BibTeX entries rendered as structured HTML publication lists
- Examples: `_bibliography/papers.bib`, rendered via `_layouts/bib.liquid`
- Pattern: Custom BibTeX fields (`selected`, `abbr`, `arxiv`, `preview`, `bibtex_show`) consumed by `bib.liquid`; internal fields stripped from rendered BibTeX by `hide-custom-bibtex.rb`

**Asset Cache Busting:**
- Purpose: Forces browsers to fetch updated assets after deploys
- Examples: `{{ '/assets/css/main.css' | relative_url | bust_css_cache }}`
- Pattern: `bust_file_cache` and `bust_css_cache` Liquid filters from `_plugins/cache-bust.rb` append MD5 hash as query string

## Entry Points

**Homepage:**
- Location: `_pages/about.md`
- Triggers: Request to `/`
- Responsibilities: Profile photo, hero text, news feed, selected papers, social links, collaboration CTA

**Publications:**
- Location: `_pages/publications.md`
- Triggers: Request to `/publications/`
- Responsibilities: Featured paper cards, full bibliography with search and bib entries

**CV:**
- Location: `_pages/cv.md`
- Triggers: Request to `/cv/`
- Responsibilities: Structured academic CV from `_data/cv.yml`

**Projects:**
- Location: `_pages/projects.md`
- Triggers: Request to `/projects/`
- Responsibilities: Narrative research project descriptions (PRODIGy, HED-IT, interlocutor-aware dialogue)

**News:**
- Location: `_pages/news.md`
- Triggers: Request to `/news/`
- Responsibilities: Full list of news items from `_news/` collection

**Individual News Posts:**
- Location: `_news/YYYY-MM-DD.md`
- Triggers: Request to `/news/<title>/`
- Responsibilities: Single news item detail rendered with `layout: post`

**Search Data:**
- Location: `_scripts/search.liquid.js`
- Triggers: Built into `/assets/js/search-data.js` at build time
- Responsibilities: Generates JS array of all navigable pages for the ninja-keys search overlay

## Architectural Constraints

- **Static output:** All rendering happens at build time via `bundle exec jekyll build`; no server-side logic at request time
- **Global state:** `_config.yml` is read once at build start; `site.*` variables are globally available in all Liquid templates
- **Plugin execution:** `_plugins/*.rb` run in the Jekyll build process; `google-scholar-citations.rb` makes live HTTP requests to Google Scholar during the build, which can be slow or fail
- **Layout inheritance:** Layouts form a single inheritance chain; `default.liquid` is the root shell; all other layouts wrap it
- **Navbar population:** Nav links are auto-generated from `site.pages` filtered by `nav: true`; `nav_order` controls ordering; this is set in each `_pages/*.md` front matter
- **Collections:** Only the `news` collection is active; `projects` collection is commented out in `_config.yml` (projects are authored directly in `_pages/projects.md`)
- **Blog disabled:** Blog/posts feature is fully commented out in `_config.yml`; `_posts/` is empty

## Anti-Patterns

### Hardcoded content in layout

**What happens:** `_layouts/about.liquid` contains a hardcoded `<div class="collaboration-cta">` block with static text inside the layout file itself
**Why it's wrong:** Layout files should be generic shells; content belongs in `_pages/about.md` or `_data/`; this makes the text invisible to content-focused editors
**Do this instead:** Move the CTA text into `_pages/about.md` as inline HTML, or into a `_data/` entry referenced from the layout

### Feature JS loaded even when features are unused

**What happens:** `_includes/scripts.liquid` conditionally includes many JS libraries (MathJax, chart.js, Mermaid, etc.) based on `page.*` front matter flags
**Why it's wrong:** Requires authors to know the exact flag names (`page.mermaid.enabled`, `page.chart.chartjs`, etc.) and set them in front matter; easy to forget
**Do this instead:** Document all available page-level flags clearly in a single reference location (currently absent); this is an accepted tradeoff of the al-folio framework

## Error Handling

**Strategy:** Jekyll build fails fast on Liquid/Ruby errors; no runtime error handling (static site)

**Patterns:**
- `google-scholar-citations.rb` wraps HTTP fetches in `rescue Exception => e` and returns `"N/A"` on failure, printing the error to the build log
- `file-exists.rb` provides `{% file_exists path %}` tag used in `bib.liquid` to conditionally include hook overrides
- Missing data keys in `_data/venues.yml` are handled gracefully in `bib.liquid` via `{% if site.data.venues[entry.abbr] %}` guards

## Cross-Cutting Concerns

**Logging:** Jekyll build log only; Google Scholar citation errors print to stdout during `bundle exec jekyll build`
**Validation:** None automated; front matter correctness is not validated
**Authentication:** None; this is a public static site
**Analytics:** Google Analytics (G-HQ58HXBFK7) injected via `_includes/scripts.liquid` when `enable_google_analytics: true`
**SEO:** Open Graph and Schema.org meta tags injected via `_includes/metadata.liquid` included from `_includes/head.liquid`; canonical URL set per page; `jekyll-sitemap` generates `sitemap.xml`

---

*Architecture analysis: 2026-04-30*
