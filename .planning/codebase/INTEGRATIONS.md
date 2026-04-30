# External Integrations

**Analysis Date:** 2026-04-30

## APIs & External Services

**Academic Citation Badges (build-time scraping / runtime JS):**
- Google Scholar — displays per-paper citation counts
  - Plugin: `_plugins/google-scholar-citations.rb`
  - Mechanism: scrapes `https://scholar.google.com/citations?view_op=view_citation&...` at build time using `nokogiri` + `open-uri`
  - Config: `scholar_userid: yPrpiQQAAAAJ` in `_config.yml`
- InspireHEP — displays citation counts for physics/HEP papers
  - Plugin: `_plugins/inspirehep-citations.rb`
  - Mechanism: calls `https://inspirehep.net/api/literature/?fields=citation_count&q=recid:<id>` at build time via `net/http`
  - Config: per-entry `inspirehep_id` field in `_bibliography/papers.bib`
- Altmetric — attention score badge on publications page
  - Script: loaded at runtime from `https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js`
  - Config: `enable_publication_badges.altmetric: true` in `_config.yml`; per-entry `altmetric` field in `.bib`
- Dimensions — citation/usage badge on publications page
  - Script: loaded at runtime from `https://badge.dimensions.ai/badge.js`
  - Config: `enable_publication_badges.dimensions: true` in `_config.yml`; per-entry `dimensions` field in `.bib`
- Google Scholar badge (link) — links from publications to Google Scholar entry
  - URL template: `https://scholar.google.com/citations?view_op=view_citation&hl=en&user={{ scholar_userid }}&citation_for_view=...`
  - Config: `enable_publication_badges.google_scholar: true` in `_config.yml`

**Social Profile Links:**
- GitHub: `github_username: danie08` — linked in social bar (`_includes/social.liquid`)
- LinkedIn: `linkedin_username: daniela-occhipinti` — linked in social bar
- X (Twitter): `x_username: docchipinti8` — linked in social bar; used for Twitter Card meta tags in `_includes/metadata.liquid`
- Bluesky: `bluesky_url: https://bsky.app/profile/docchipinti8.bsky.social` — linked in social bar
- ORCID: `orcid_id: 0009-0009-7052-4671` — linked in social bar
- Google Scholar profile: `scholar_userid: yPrpiQQAAAAJ` — linked in social bar
- Scopus: `scopus_id: 57220749030` — linked in social bar
- Semantic Scholar: `semanticscholar_id: 2265752109` — linked in social bar
- All social IDs configured in `_config.yml` and mirrored in `_data/socials.yml`

## Data Storage

**Databases:**
- None. This is a statically generated site — no database at runtime.

**File Storage:**
- Local filesystem only. Assets in `assets/`, bibliography in `_bibliography/papers.bib`, CV data in `_data/cv.yml`, news in `_news/`.

**Caching:**
- None at runtime. Build-time asset caching via `_plugins/cache-bust.rb` (MD5 fingerprinting of asset URLs).

## Authentication & Identity

**Auth Provider:**
- None. No user authentication — fully public static site.

## Analytics

**Google Analytics 4:**
- Measurement ID: `G-HQ58HXBFK7` (in `_config.yml` as `google_analytics:`)
- Implementation: gtag.js loaded from `https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}`
- Setup script: `assets/js/google-analytics-setup.js`
- Enabled via: `enable_google_analytics: true` in `_config.yml`

**Cronitor RUM:** Supported but disabled (`enable_cronitor_analytics: false`)
**Pirsch Analytics:** Supported but disabled (`enable_pirsch_analytics: false`)
**Openpanel Analytics:** Supported but disabled (`enable_openpanel_analytics: false`)

## Third-Party CDN Libraries

All libraries listed below are served from `cdn.jsdelivr.net` (or `cdnjs.cloudflare.com` for polyfill) with SRI hashes defined in `_config.yml` under `third_party_libraries:`. When `third_party_libraries.download: false` (current setting), files are fetched from CDN at runtime. If set to `true`, they are downloaded to `assets/libs/` at build time.

| Library | Version | CDN URL Pattern |
|---------|---------|-----------------|
| Bootstrap Table | 1.22.4 | `cdn.jsdelivr.net/npm/bootstrap-table@...` |
| Chart.js | 4.4.1 | `cdn.jsdelivr.net/npm/chart.js@...` |
| D3 | 7.8.5 | `cdn.jsdelivr.net/npm/d3@...` |
| diff2html | 3.4.47 | `cdn.jsdelivr.net/npm/diff2html@...` |
| ECharts | 5.5.0 | `cdn.jsdelivr.net/npm/echarts@...` |
| Google Fonts (Roboto, Roboto Slab, Material Icons) | — | `fonts.googleapis.com` |
| highlight.js | 11.9.0 | `cdn.jsdelivr.net/npm/highlight.js@...` |
| imagesloaded | 5.0.0 | `cdn.jsdelivr.net/npm/imagesloaded@...` |
| img-comparison-slider | 8.0.6 | `cdn.jsdelivr.net/npm/img-comparison-slider@...` |
| jQuery | 3.6.0 | `cdn.jsdelivr.net/npm/jquery@...` |
| Leaflet | 1.9.4 | `cdn.jsdelivr.net/npm/leaflet@...` |
| Lightbox2 | 2.11.5 | `cdn.jsdelivr.net/npm/lightbox2@...` |
| MathJax | 3.2.2 | `cdn.jsdelivr.net/npm/mathjax@...` |
| Masonry Layout | 4.2.2 | `cdn.jsdelivr.net/npm/masonry-layout@...` |
| MDB (mdbootstrap) | 4.20.0 | `cdn.jsdelivr.net/npm/mdbootstrap@...` |
| medium-zoom | 1.1.0 | `cdn.jsdelivr.net/npm/medium-zoom@...` |
| Mermaid | 10.7.0 | `cdn.jsdelivr.net/npm/mermaid@...` |
| PhotoSwipe | 5.4.4 | `cdn.jsdelivr.net/npm/photoswipe@...` |
| ES6 Polyfill | 3 | `cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js` |
| pseudocode.js | 2.4.1 | `cdn.jsdelivr.net/npm/pseudocode@...` |
| Spotlight.js | 0.7.8 | `cdn.jsdelivr.net/npm/spotlight.js@...` |
| Swiper | 11.0.5 | `cdn.jsdelivr.net/npm/swiper@...` |
| Vega | 5.27.0 | `cdn.jsdelivr.net/npm/vega@...` |
| Vega-Embed | 6.24.0 | `cdn.jsdelivr.net/npm/vega-embed@...` |
| Vega-Lite | 5.16.3 | `cdn.jsdelivr.net/npm/vega-lite@...` |
| VenoBox | 2.1.8 | `cdn.jsdelivr.net/npm/venobox@...` |
| TikZJax (fonts + script) | — | `https://tikzjax.com/v1/` |

## Monitoring & Observability

**Error Tracking:**
- None configured.

**Logs:**
- No runtime logging (static site). Build-time output goes to stdout of `jekyll build`.

## CI/CD & Deployment

**Hosting:**
- GitHub Pages at `https://danie08.github.io`

**CI Pipeline:**
- GitHub Actions (`.github/workflows/`)
  - `deploy.yml` — primary workflow: builds Jekyll, purges CSS, deploys to GitHub Pages on push to `main`/`master`
  - `prettier.yml` — code formatting check
  - `axe.yml` — accessibility audit
  - `broken-links-site.yml` — broken link checker
  - `codeql.yml` — CodeQL security scanning
  - `deploy-image.yml` / `deploy-docker-tag.yml` / `docker-slim.yml` — Docker image publishing workflows
  - `prettier-html.yml` / `prettier-comment-on-pr.yml` — PR formatting feedback

## Webhooks & Callbacks

**Incoming:**
- None. Static site has no server to receive webhooks.

**Outgoing:**
- None configured.

## Newsletter (Optional / Disabled)

**Provider:** Loops.so (`https://app.loops.so`)
- Form template: `_includes/newsletter.liquid`
- Endpoint: `https://app.loops.so/api/newsletter-form/{{ site.newsletter.endpoint }}`
- Status: **disabled** (`newsletter.enabled: false` in `_config.yml`)

## External Post Fetching (Optional / Disabled)

**Plugin:** `_plugins/external-posts.rb`
- Fetches blog posts from external RSS feeds or URLs at build time
- Uses `feedjira` (RSS parsing) and `httparty` (HTTP requests)
- Status: **disabled** — `external_sources:` key commented out in `_config.yml`

## Open Graph & Schema.org

**Meta Tags:**
- Open Graph and Schema.org meta tags rendered by `_includes/metadata.liquid`
- Twitter Card meta tags also generated (type: `summary`) using `x_username` from `_config.yml`
- Default OG image: `/assets/img/prof_pic.jpeg`

---

*Integration audit: 2026-04-30*
