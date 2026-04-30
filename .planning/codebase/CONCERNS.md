# Codebase Concerns

**Analysis Date:** 2026-04-30

## Known Bugs

**Broken image: PhD defense post references missing file:**
- Symptoms: The news post at `/news/2025-04-28/` renders a broken image
- Files: `_news/2025-04-28.md` (line referencing `assets/img/phd_defense/defense.jpeg`)
- Trigger: The file `defense.jpeg` does not exist; only `assets/img/phd_defense/photo_2026-04-30_09-06-26.jpg` is present
- Fix: Rename `photo_2026-04-30_09-06-26.jpg` to `defense.jpeg`, or update the path in the news file to match the actual filename

**Broken internal links: projects page links to non-existent news slugs:**
- Symptoms: Three links in `_pages/projects.md` resolve to 404 pages
- Files: `_pages/projects.md` (lines 28, 47, 64)
- Trigger: Links use title-derived slugs (`/news/paper-accepted-at-naacl-2024-findings/`, `/news/paper-accepted-at-acl-2024-findings/`, `/news/paper-accepted-at-acl-2025-main/`) but news files are named by date only (e.g., `2024-03-13.md`), so Jekyll generates date-based slugs (`/news/2024-03-13/`). The "Paper accepted" news posts also use `inline: true`, meaning they do not generate standalone pages at all.
- Fix: Either rename news files to include the title (e.g., `2024-05-16-paper-accepted-at-acl-2024-findings.md`) so Jekyll generates the expected slug, or remove the inline flag and ensure the permalink matches the link targets

## Tech Debt

**Social profile data maintained in two places:**
- Issue: Social links are defined in both `_config.yml` (lines 59–97) and `_data/socials.yml`. Both files must be kept in sync manually. The `_includes/social.liquid` reads from `_data/socials.yml` while other parts of the theme (e.g., Schema.org metadata in `_includes/metadata.liquid`) read from `_config.yml`.
- Files: `_config.yml`, `_data/socials.yml`, `_includes/social.liquid`, `_includes/metadata.liquid`
- Impact: Adding or removing a social profile requires two edits; a mismatch causes social icons and Schema.org links to diverge
- Fix approach: Standardize on `_data/socials.yml` as the single source and update `_includes/metadata.liquid` to read from it

**ImageMagick plugin: Gemfile and config out of sync:**
- Issue: `jekyll-imagemagick` is present in `Gemfile` and `imagemagick: enabled: true` is set in `_config.yml`, but the plugin is commented out in the `plugins:` list in `_config.yml` (line 252: `#  - jekyll-imagemagick`). As a result, zero WebP variants are generated locally (0 `.webp` files in `assets/img/`). The CI deploy workflow still installs ImageMagick via `apt-get` unnecessarily.
- Files: `_config.yml` (line 252, lines 393–411), `Gemfile`, `.github/workflows/deploy.yml`
- Impact: Responsive WebP images are not being generated; pages load original JPEGs/PNGs without responsive variants, missing potential performance gains
- Fix approach: Either re-enable the plugin by uncommenting the `plugins:` entry and confirming ImageMagick is available, or remove the `imagemagick` config block and the `apt-get install imagemagick` step in CI to eliminate the dead configuration

**Google Scholar citation scraper is fragile:**
- Issue: `_plugins/google-scholar-citations.rb` scrapes Google Scholar HTML using `URI.open` with a spoofed `User-Agent` and random `sleep` delays (1.5–3.5s per article). It also uses `rescue Exception` which silently catches all errors including `Interrupt` and `SignalException`.
- Files: `_plugins/google-scholar-citations.rb`
- Impact: Any Google Scholar HTML structure change silently returns `"N/A"`. Rate limiting during CI builds causes unpredictable build times. The broad `rescue Exception` mask makes debugging failures difficult.
- Fix approach: Switch to the official Google Scholar API or the Semantic Scholar API (already configured via `semanticscholar_id`); replace `rescue Exception` with `rescue StandardError`

## Security Considerations

**Deprecated SVG attribute in social links fallback:**
- Risk: `_includes/social.liquid` (line 100) uses `xlink:href` inside an `<image>` element for custom social icons. `xlink:href` is deprecated in SVG 2.0 and removed in some browser rendering paths.
- Files: `_includes/social.liquid` (line 100)
- Current mitigation: Only affects custom social icons (the `{% else %}` branch), which are not currently configured
- Recommendations: Replace with the `href` attribute directly on the `<image>` element

**Google Analytics measurement ID committed to repository:**
- Risk: The GA4 ID `G-HQ58HXBFK7` is hardcoded in `_config.yml` (line 116). While GA Measurement IDs are not secret (they appear in page source), committing them is standard practice for static sites and not a credential risk.
- Files: `_config.yml` (line 116)
- Current mitigation: This is acceptable for a public static site; no action required

**No Content Security Policy headers:**
- Risk: GitHub Pages does not support custom HTTP response headers, so no CSP can be set. The site loads resources from multiple CDNs (jsdelivr, fonts.googleapis.com, cdn.jsdelivr.net) without a CSP restricting allowed origins.
- Files: `_includes/head.liquid`, `_config.yml` (third_party_libraries section)
- Current mitigation: SRI (Subresource Integrity) hashes are configured for most third-party libraries in `_config.yml`; these provide integrity protection even without CSP
- Recommendations: No action available within GitHub Pages constraints; the SRI hash configuration is the appropriate mitigation

## Performance Bottlenecks

**Poster images use filenames with spaces (URL encoding risk):**
- Problem: Three poster files have spaces in their names: `assets/img/acl2025/ACL 2025 Poster.png`, `assets/img/naacl2024/NAACL 2024 POSTER.png`, `assets/img/acl2024/ACL2024 HED-IT Poster.png`. These are referenced directly in news posts (`_news/2025-07-28.md` line 20, `_news/2024-06-10.md` line referencing NAACL poster, `_news/2024-08-11.md` and `_news/2024-12-04.md`).
- Files: `_news/2025-07-28.md`, `_news/2024-06-10.md`, `_news/2024-08-11.md`, `_news/2024-12-04.md`
- Cause: Spaces in filenames require URL percent-encoding (`%20`); Jekyll's Liquid may or may not encode them automatically depending on context
- Improvement path: Rename poster files to use hyphens (`acl-2025-poster.png`, etc.) and update all references

**No WebP image conversion (see ImageMagick concern above):**
- Problem: All images are served as original JPEG/PNG without responsive WebP variants. The poster images are particularly large: `acl2025_poster.jpeg` (348KB), `clicit2024/all.jpeg` (303KB), `naacl2024/naacl_virtual.jpeg` (264KB).
- Files: `assets/img/acl2025/`, `assets/img/clicit2024/`, `assets/img/naacl2024/`
- Cause: ImageMagick plugin is disabled in the `plugins:` list (see Tech Debt above)
- Improvement path: Re-enable `jekyll-imagemagick` plugin to generate WebP variants at 480px, 800px, and 1400px widths

## Fragile Areas

**News collection permalink / slug architecture:**
- Files: `_config.yml` (permalink: `/:collection/:title/`), all `_news/*.md` files
- Why fragile: News files are named by date only (e.g., `2024-05-16.md`), causing Jekyll to use the date as the `:title` slug. Any internal link that assumes a title-derived slug (as in `_pages/projects.md`) will 404. Adding new news items requires knowing which naming convention produces working URLs.
- Safe modification: Name new news files with the title slug included (e.g., `2024-05-16-paper-accepted-at-acl-2024.md`) if the post needs a stable URL; use bare date names only for `inline: true` posts that never need direct links
- Test coverage: None — broken links CI (`broken-links.yml`) uses `--exclude-path` for Liquid-heavy files and checks `.md` and `.html` but does not verify Liquid-rendered internal links

**Build-time web scraping causing non-deterministic builds:**
- Files: `_plugins/google-scholar-citations.rb`, `_plugins/inspirehep-citations.rb`
- Why fragile: Both plugins make HTTP requests during `jekyll build`. Network failures, rate limits, or upstream API changes cause build failures or silently incorrect citation counts. The Google Scholar plugin includes `sleep(rand(1.5..3.5))` calls that make build time variable.
- Safe modification: Cache results locally; add timeouts; handle failures with a meaningful placeholder rather than relying on broad rescue

## Missing Critical Features

**Google Search Console verification not configured:**
- Problem: `enable_google_verification: false` and `google_site_verification:` is commented out in `_config.yml`. The site is not verified with Google Search Console.
- Blocks: Cannot monitor search performance, crawl errors, or submit sitemaps via Search Console
- Fix: Add the verification meta tag ID from Google Search Console and set `enable_google_verification: true` in `_config.yml`

## Test Coverage Gaps

**No automated validation of internal Liquid-rendered links:**
- What's not tested: Internal links rendered via `relative_url` in Liquid templates (e.g., `_pages/projects.md` news links) are not checked by the broken-links workflow, which only processes static `.md` and `.html` files
- Files: `_pages/projects.md` (lines 28, 47, 64, 66), `.github/workflows/broken-links.yml`
- Risk: Broken internal links go undetected until manually browsing the site
- Priority: Medium

**Accessibility CI is manual-only:**
- What's not tested: The axe accessibility workflow (`_github/workflows/axe.yml`) is commented out for automatic triggers — it only runs on `workflow_dispatch`. No accessibility checks run on push or PR.
- Files: `.github/workflows/axe.yml`
- Risk: Accessibility regressions introduced in layout or content changes go undetected
- Priority: Medium

## Orphaned Assets

**Template demo images not in use:**
- Issue: Twelve numbered images (`assets/img/1.jpg` through `assets/img/12.jpg`) and `assets/img/template_error.png` exist in the repository but are not referenced in any `.liquid`, `.md`, or `.yml` file. These appear to be leftover demo assets from the al-folio theme.
- Files: `assets/img/1.jpg` — `assets/img/12.jpg`, `assets/img/template_error.png`
- Impact: Adds ~700KB of unserved assets to the repository; included in PurgeCSS content scan unnecessarily
- Fix approach: Delete all files in `assets/img/` that match `[0-9]+.jpg` and `template_error.png`

---

*Concerns audit: 2026-04-30*
