# Coding Conventions

**Analysis Date:** 2026-04-30

## Naming Patterns

**Files:**
- Liquid templates: `kebab-case.liquid` — e.g., `_includes/bib_search.liquid`, `_includes/selected_papers.liquid`
- SCSS partials: `_kebab-case.scss` with underscore prefix — e.g., `_sass/_variables.scss`, `_sass/_base.scss`, `_sass/_layout.scss`
- JavaScript files: `kebab-case.js` — e.g., `assets/js/theme.js`, `assets/js/common.js`, `assets/js/progress-bar.js`
- Ruby plugins: `kebab-case.rb` — e.g., `_plugins/cache-bust.rb`, `_plugins/hide-custom-bibtex.rb`
- Markdown content: `YYYY-MM-DD.md` for news items — e.g., `_news/2025-07-28.md`, `_news/2025-06-05.md`
- Data files: `kebab-case.yml` — e.g., `_data/cv.yml`, `_data/venues.yml`, `_data/coauthors.yml`

**Liquid Variables (assign):**
- `snake_case` for local template variables — e.g., `{% assign author_is_self = false %}`, `{% assign venue_style = null %}`, `{% assign entry_has_altmetric_badge = false %}`
- Prefix `entry_has_` for boolean badge flags: `entry_has_altmetric_badge`, `entry_has_dimensions_badge`
- Prefix `author_` for author-related variables: `author_last_name`, `author_last_html`, `author_is_self`

**JavaScript Functions:**
- `camelCase` for all function names — e.g., `toggleThemeSetting`, `applyTheme`, `determineComputedTheme`, `initTheme`, `setHighlight`, `setGiscusTheme`, `setMermaidTheme`
- `let` is used for all function declarations (not `const` or `function`) in `assets/js/theme.js`
- `$()` jQuery-style handlers in `assets/js/common.js` wrapped in `$(document).ready(function() { ... })`

**Ruby Plugins:**
- Module names: `PascalCase` nested under `Jekyll` — e.g., `Jekyll::CacheBust`, `Jekyll::HideCustomBibtex`, `Jekyll::CleanString`
- Class names: `PascalCase` — e.g., `CacheDigester`, `RemoveAccents`, `GoogleScholarCitationsTag`
- Methods: `snake_case` — e.g., `digest!`, `bust_file_cache`, `bust_css_cache`, `remove_accents`, `hideCustomBibtex`

**SCSS Variables:**
- `$kebab-case` with semantic naming — e.g., `$red-color`, `$blue-color-dark`, `$grey-color-light`
- Design tokens use numeric scale: `$space-1`, `$space-2`, `$space-4`, `$space-8`, `$space-12`
- Typography tokens prefixed `$text-`: `$text-body-size`, `$text-small-size`, `$text-title-1`
- Border-radius tokens prefixed `$radius-`: `$radius-sm`, `$radius-md`, `$radius-pill`

**CSS Classes:**
- Bootstrap utilities used directly: `btn`, `btn-sm`, `z-depth-0`, `btn-primary-link`, `btn-outline-link`, `col-sm-*`
- Custom classes: `kebab-case` — e.g., `.nav-control`, `.nav-control-item`, `.more-authors`, `.periodical`, `.highlight-item`
- BEM-like naming for homepage custom sections: `.homepage-highlights`, `.highlight-item`, `.highlight-label`, `.research-question-grid`, `.research-question-card`
- Page-specific sections: `.featured-publications-intro`, `.featured-publications-grid`, `.featured-publication-card`, `.project-story`, `.project-story-question`

**BibTeX entry keys:**
- Format: `lastname:etal:year` (older) or `lastname-etal-year-keyword` (newer ACL anthology style) — e.g., `occhipinti:etal:2020italianlp`, `occhipinti-etal-2025-superman`

## Code Style

**Formatting:**
- Prettier 3.1.1 with `@shopify/prettier-plugin-liquid` 1.4.0
- Enforced via CI on push and pull_request to `main`/`master` (`.github/workflows/prettier.yml`)
- `npx prettier . --check` is the gate; failures generate an HTML diff artifact
- Indentation: 2 spaces in Liquid templates (observed in `_includes/header.liquid`, `_layouts/default.liquid`)
- Indentation: 4 spaces in Ruby plugins (observed in `_plugins/google-scholar-citations.rb`)

**SCSS:**
- Sass `@use` module system for `sass:color` — e.g., `@use "sass:color"` at top of `_sass/_variables.scss` and `_sass/_themes.scss`
- CSS custom properties (variables) for runtime theming: `var(--global-theme-color)`, `var(--global-text-color)` — defined in `_sass/_themes.scss`
- SCSS variables (`$name`) for build-time tokens; CSS variables for theme-switchable values
- Block comments: `/** ... */` section headers, `//` inline comments
- Nesting used for state and pseudo-selectors: `&:hover`, `&:focus`
- WCAG annotations in comments: `// Skip to main content link (WCAG 2.4.1)`, `// Reduced motion support (WCAG 2.3.3)`

**Liquid Templates:**
- Front matter (`---`) required on layouts; absent on pure partials
- Comments used to label logical sections: `<!-- Title -->`, `<!-- Author -->`, `<!-- Links/Buttons -->`, `<!-- Hidden abstract block -->`
- Long conditional chains use `{% if %}...{% elsif %}...{% else %}...{% endif %}` — no ternary-style shorthand
- `{% assign %}` used to precompute boolean flags before conditionals to avoid repetition (see `_layouts/bib.liquid`)
- `{% capture %}` used to build complex strings before rendering — e.g., `entrytype`, `periodical` in `_layouts/bib.liquid`
- `{%- -%}` whitespace control used consistently when suppressing spacing in author lists

**JavaScript:**
- ES6+ `let`/`const`; `var` still present in `common.js` (bootstrap-toc section)
- No module system (no `import`/`export`) except where `type="module"` is explicit in `scripts.liquid`
- Guard checks before using optional libraries: `if (typeof mermaid !== "undefined")`, `if (typeof echarts !== "undefined")`

## Import Organization

**SCSS — main.scss import order** (inferred from `_config.yml` sass settings):
1. Variables (`_variables.scss`)
2. Themes (`_themes.scss`)
3. Base elements (`_base.scss`)
4. Layout (`_layout.scss`)
5. Component files (`_cv.scss`, `_tabs.scss`, etc.)

**Liquid — include order in `_layouts/default.liquid`:**
1. `{% include head.liquid %}` — CSS and meta
2. `{% include header.liquid %}` — navigation
3. Page `{{ content }}` — main content
4. `{% include footer.liquid %}` — footer
5. `{% include scripts.liquid %}` — JS at end of body

**JavaScript loading strategy in `_includes/scripts.liquid`:**
- jQuery and Bootstrap: synchronous (no `defer`) — loaded first
- Feature scripts: `defer` attribute — loaded after DOM parse
- Analytics: `async` — non-blocking
- Search: loaded last, using `type="module"` for ninja-keys

## Error Handling

**Ruby Plugins:**
- `rescue Exception => e` used broadly in `_plugins/google-scholar-citations.rb` to catch any network/parse error
- On error: returns `"N/A"` as citation count and prints to stdout via `puts`
- No retries — fail-fast approach with graceful fallback value

**JavaScript:**
- Image load errors handled inline: `onerror="this.onerror=null; $('.responsive-img-srcset').remove();"` in `_includes/figure.liquid`
- Optional feature checks use `typeof` guards before calling library methods (see `assets/js/theme.js`)
- No try/catch in client JS — errors are silent or handled by guards

**Liquid Templates:**
- Null-safe checks via `{% if entry.field %}` before rendering optional content (publications, badges, links)
- Fallback defaults: `alt="{{ include.alt | default: '' }}"` in `_includes/figure.liquid`
- `{% file_exists %}` custom tag used to check for optional hook files before including: `{% capture hook_exists %}{% file_exists _includes/hook/bib.liquid %}{% endcapture %}`

## Logging

**Framework:** Ruby `puts` for build-time messages in plugins

**Patterns:**
- Error messages print exception class and message: `puts "Error fetching citation count for #{article_id} in #{article_url}: #{e.class} - #{e.message}"`
- Validation warnings print to stdout: `puts "Invalid scholar_id provided"`, `puts "Invalid article_id provided"`
- No structured logging — plain text to stdout only during `bundle exec jekyll build`

## Comments

**When to Comment:**
- Section dividers in SCSS: `/*****...****/` block headers naming logical sections
- Inline `//` for single-line explanations of non-obvious behavior
- HTML comments `<!-- ... -->` in Liquid to label content blocks within templates
- WCAG accessibility notes in SCSS for accessibility-related rules
- Build notes in `_config.yml`: inline `#` comments explaining each setting

**Liquid:**
- `{% comment %}...{% endcomment %}` used for metadata: e.g., `{% comment %} Social links generator for "sameAs schema" {% endcomment %}` in `_includes/metadata.liquid`
- Plain HTML comments used for structural labels: `<!-- Title -->`, `<!-- Author -->`, `<!-- Nav Bar -->`

## Function Design

**Ruby Plugin Pattern:**
- Class wraps logic: constructor sets attributes, `digest!` is the single public method
- Private methods for internal steps: `file_content`, `directory_files_content`, `file_contents`, `is_directory?`
- Filters registered via `Liquid::Template.register_filter(Jekyll::ModuleName)`
- Tags registered via `Liquid::Template.register_tag('tag_name', Jekyll::ClassName)`

**JavaScript:**
- Each function has a single responsibility: `setHighlight`, `setGiscusTheme`, `setMermaidTheme` are separate
- Theme state read from `localStorage` via `determineThemeSetting`, computed result via `determineComputedTheme`
- Side-effect functions named with imperative verbs: `applyTheme`, `transTheme`, `initTheme`

## Module Design

**Exports (Ruby):**
- Each plugin file defines one module under `Jekyll::` namespace
- Filters and tags self-register at file bottom — no external wiring needed

**Liquid Includes:**
- Partials receive data through `include` parameter hash: `{% include figure.liquid path=... class=... alt=... %}`
- Parameters are optional — presence checked with `{% if include.param %}`
- Named boolean parameters: `loading="eager"`, `zoomable=true`, `cache_bust=true`

**Jekyll Collections:**
- `_news/` collection with `layout: post` default and `output: true`
- Content files use YAML front matter for metadata, Markdown/HTML for body

**Data Files (`_data/`):**
- `venues.yml`: keyed by venue abbreviation string — e.g., `"ACL2025":`, `"NAACL2024":`
- `coauthors.yml`: keyed by lowercase last name for lookup in `_layouts/bib.liquid`
- `cv.yml`: array of section objects with `title`, `type`, and `contents` keys

---

*Convention analysis: 2026-04-30*
