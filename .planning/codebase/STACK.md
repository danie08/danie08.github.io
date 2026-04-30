# Technology Stack

**Analysis Date:** 2026-04-30

## Languages

**Primary:**
- Ruby - Jekyll site generation, custom plugins in `_plugins/`
- Liquid - Templating language for all layouts (`_layouts/`) and includes (`_includes/`)
- SCSS/Sass - Styles in `_sass/` and `assets/css/main.scss`

**Secondary:**
- JavaScript - Client-side interactivity in `assets/js/`
- Python - Jupyter notebook conversion via `nbconvert` (build-time only)
- HTML - Static markup within Liquid templates

## Runtime

**Environment:**
- Ruby 3.3.5 (pinned in `.github/workflows/deploy.yml`)
- Node.js (runtime for ExecJS, used by `jekyll-terser` for JS minification)
- Python 3.13 (build-time only, for `nbconvert`)

**Package Manager:**
- Bundler 2.6.2 (Ruby gems) — lockfile: `Gemfile.lock` present and committed
- npm (Node) — lockfile: `package-lock.json` present and committed

## Frameworks

**Core:**
- Jekyll 4.3.4 — static site generator; configured in `_config.yml`
- al-folio theme — academic website theme base (forked/customized); layout roots in `_layouts/` and `_includes/`

**CSS Framework:**
- Bootstrap 5 (vendored at `assets/css/bootstrap.min.css`) — layout and components
- MDB (mdbootstrap) 4.20.0 — served from jsDelivr CDN
- Bootstrap-TOC — `assets/css/bootstrap-toc.min.css`
- Academicons — `assets/css/academicons.min.css` (academic icon font)
- Font Awesome — `_sass/font-awesome/`
- Tabler Icons — `_sass/tabler-icons/`

**Build/Dev:**
- PurgeCSS (npm global, `purgecss.config.js`) — removes unused CSS from `_site/` after build
- Prettier 3.1.1 with `@shopify/prettier-plugin-liquid` 1.4.0 — code formatting for Liquid/HTML files
- Docker (`Dockerfile`, `docker-compose.yml`) — local dev environment using `amirpourmand/al-folio:v0.13.4` image
- ImageMagick — responsive WebP image generation (configured in `_config.yml` under `imagemagick:`)

## Key Dependencies

**Critical Ruby Gems:**
- `jekyll-scholar` — BibTeX bibliography rendering from `_bibliography/papers.bib`; configured under `scholar:` key in `_config.yml`
- `jekyll-minifier` — HTML/CSS minification (JS minification delegated to terser)
- `jekyll-terser` (git: `RobertoJBeltran/jekyll-terser`) — JavaScript minification using the `terser` gem
- `jekyll-feed` — generates RSS/Atom feed
- `jekyll-sitemap` — generates `sitemap.xml`
- `jekyll-link-attributes` — adds `rel="noopener"` and `target="_blank"` to external links
- `jekyll-paginate-v2` — pagination support
- `jekyll-get-json` — loads `assets/json/resume.json` into `site.data.resume` at build time
- `jekyll-imagemagick` — responsive image generation (defined in `Gemfile`, disabled in `_config.yml` plugins list)
- `jekyll-jupyter-notebook` — renders `.ipynb` notebooks as posts
- `jekyll-twitter-plugin` — embeds tweets
- `jekyll-email-protect` — obfuscates email addresses
- `jekyll-toc` — table of contents generation
- `jekyll-tabs` — tab component support
- `jekyll-regex-replace` — regex find/replace in content
- `jemoji` — GitHub-style emoji support
- `bibtex-ruby` 6.1.0 — BibTeX parsing (used by `jekyll-scholar`)
- `classifier-reborn` — content categorization during build
- `feedjira` 3.2.4 — RSS feed parsing for external posts (plugin `_plugins/external-posts.rb`)
- `httparty` — HTTP requests in `_plugins/external-posts.rb`
- `nokogiri` — HTML parsing in multiple plugins

**Python:**
- `nbconvert` — Jupyter notebook conversion to HTML

## Configuration

**Environment:**
- No `.env` file required for basic operation (site is statically generated)
- Google Analytics measurement ID `G-HQ58HXBFK7` stored directly in `_config.yml`
- `JEKYLL_ENV=production` set during CI build; `JEKYLL_ENV=development` set in Docker compose

**Build:**
- `_config.yml` — primary Jekyll configuration; controls all feature flags, third-party library versions, scholar settings, social IDs
- `Gemfile` / `Gemfile.lock` — Ruby dependency manifest
- `package.json` / `package-lock.json` — Node dependency manifest (only dev: Prettier)
- `purgecss.config.js` — PurgeCSS content/CSS paths for post-build CSS trimming
- `.github/workflows/deploy.yml` — CI build and deploy to GitHub Pages

## Platform Requirements

**Development:**
- Ruby 3.3.5 + Bundler 2.6.2
- Node.js (for ExecJS/terser)
- Python 3 + `nbconvert` (for Jupyter notebook support)
- ImageMagick (`convert` binary on PATH) for responsive image generation
- OR: Docker with `docker-compose.yml` for a fully containerized dev environment

**Production:**
- GitHub Pages (static HTML hosting)
- Build runs in GitHub Actions (`ubuntu-latest`) via `.github/workflows/deploy.yml`
- Deployed using `JamesIves/github-pages-deploy-action@v4` writing `_site/` to Pages

---

*Stack analysis: 2026-04-30*
