# STRUCTURE.md
<!-- last_mapped_commit: auto | date: 2026-04-30 -->

## Directory Layout

```
danie08.github.io/
├── _bibliography/         # BibTeX publications database
│   └── papers.bib         # All publication entries
├── _config.yml            # Main Jekyll + al-folio configuration
├── _data/                 # Structured site data (YAML)
│   ├── coauthors.yml      # Co-author name → profile URL mapping
│   ├── cv.yml             # CV sections (education, experience, etc.)
│   ├── socials.yml        # Social media / contact links
│   └── venues.yml         # Conference/journal abbreviation → full name
├── _includes/             # Reusable Liquid template partials
│   ├── cv/                # CV section partials
│   ├── repository/        # GitHub repo card partials (unused in this fork)
│   ├── resume/            # Resume partials
│   ├── bib_search.liquid  # Publication search UI
│   ├── header.liquid      # Site navigation
│   ├── footer.liquid      # Site footer
│   ├── head.liquid        # HTML <head> with metadata/CSS
│   ├── news.liquid        # News feed partial
│   ├── projects.liquid    # Project cards (grid)
│   ├── projects_horizontal.liquid  # Project cards (list)
│   ├── social.liquid      # Social icons
│   └── ...                # Other component partials
├── _layouts/              # Page layout templates
│   ├── default.liquid     # Base layout (wraps all pages)
│   ├── about.liquid       # Homepage / about page
│   ├── bib.liquid         # Publications page
│   ├── cv.liquid          # CV page
│   ├── post.liquid        # Blog post
│   └── ...
├── _news/                 # News items (dated .md files)
│   └── YYYY-MM-DD.md
├── _pages/                # Top-level pages
│   ├── about.md           # Homepage (layout: about)
│   ├── cv.md              # CV page
│   ├── news.md            # News archive
│   ├── projects.md        # Projects listing
│   ├── publications.md    # Publications page
│   └── 404.md
├── _plugins/              # Custom Jekyll Ruby plugins
│   ├── google-scholar-citations.rb
│   ├── inspirehep-citations.rb
│   ├── hide-custom-bibtex.rb
│   ├── cache-bust.rb
│   ├── download-3rd-party.rb
│   ├── external-posts.rb
│   ├── file-exists.rb
│   ├── details.rb
│   └── remove-accents.rb
├── _sass/                 # SCSS stylesheets
│   ├── _variables.scss    # Design tokens
│   ├── _base.scss         # Base styles
│   ├── _layout.scss       # Layout styles
│   ├── _themes.scss       # Light/dark theme
│   ├── _cv.scss           # CV-specific styles
│   ├── _tabs.scss         # Tab component
│   ├── font-awesome/      # Icon font
│   └── tabler-icons/      # Additional icon set
├── _scripts/              # Client-side JS (Liquid-processed)
│   └── search.liquid.js   # Publication search logic
├── _site/                 # Build output (git-ignored)
├── assets/                # Static assets
│   ├── bibliography/      # Generated BibTeX JSON
│   ├── css/               # Compiled CSS
│   ├── fonts/             # Web fonts
│   ├── img/               # Images (profile photo, etc.)
│   ├── js/                # JavaScript bundles
│   ├── json/              # Generated search index
│   └── webfonts/          # Font Awesome webfonts
├── bin/                   # Build/deploy scripts
│   ├── cibuild            # CI build script
│   ├── deploy             # Deployment script
│   └── entry_point.sh     # Docker entrypoint
├── reports/               # Site audit reports
│   ├── a11y-audit-2026-03-17.md
│   ├── content-audit-2026-03-17.md
│   └── seo-audit-2026-03-17.md
├── .github/               # GitHub Actions workflows
│   └── workflows/
├── Gemfile                # Ruby gem dependencies
├── package.json           # Node.js dependencies (Prettier, etc.)
├── _config.yml            # Jekyll configuration
├── docker-compose.yml     # Docker dev environment
└── purgecss.config.js     # CSS purging configuration
```

---

## Key File Locations

| What | Where |
|------|-------|
| Site settings | `_config.yml` |
| Publications database | `_bibliography/papers.bib` |
| CV content | `_data/cv.yml` |
| Social links | `_data/socials.yml` |
| Co-author links | `_data/coauthors.yml` |
| News items | `_news/YYYY-MM-DD.md` |
| Homepage | `_pages/about.md` |
| Profile photo | `assets/img/prof_pic.jpg` |
| Theme variables | `_sass/_variables.scss` |
| Navigation | `_config.yml` → `nav_bar` section |

---

## Naming Conventions

- **Pages:** lowercase, hyphenated (`_pages/about.md`, `_pages/cv.md`)
- **News items:** date-prefixed (`_news/2025-06-05.md`)
- **Layouts/includes:** lowercase, hyphenated Liquid files (`.liquid`)
- **SCSS:** underscore-prefixed partials (`_variables.scss`, `_base.scss`)
- **Data files:** snake_case YAML (`.yml`)
- **Plugins:** lowercase, hyphenated Ruby files (`.rb`)

---

## Where to Add New Content

| Content Type | Location |
|-------------|---------|
| New publication | `_bibliography/papers.bib` — add BibTeX entry |
| News item | `_news/YYYY-MM-DD.md` — new dated file |
| New page | `_pages/name.md` — with front matter `layout:` and `permalink:` |
| CV section | `_data/cv.yml` — add under appropriate category |
| Social link | `_data/socials.yml` |
| New include partial | `_includes/name.liquid` |
| New layout | `_layouts/name.liquid` |
| Custom styles | `_sass/_base.scss` or a new `_sass/_component.scss` |

---

## Special Directories

- **`_site/`** — Jekyll build output, not committed (in `.gitignore`)
- **`.jekyll-cache/`** — Build cache, not committed
- **`reports/`** — Site quality audit reports, committed for reference
- **`.planning/`** — GSD project planning documents (this directory)
