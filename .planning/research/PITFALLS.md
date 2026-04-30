# Domain Pitfalls: Jekyll/al-folio Academic Site Redesign

**Domain:** Academic personal website — Jekyll + al-folio + GitHub Pages
**Researched:** 2026-04-30
**Confidence:** HIGH (derived primarily from direct codebase inspection + established knowledge of al-folio architecture)

---

## Critical Pitfalls

Mistakes that cause rewrites, broken builds, or silent regressions that reach production.

---

### Pitfall 1: PurgeCSS Silently Removes Custom Classes

**What goes wrong:** The CI deploy pipeline runs PurgeCSS after `jekyll build` (see `deploy.yml` line 85–88 and `purgecss.config.js`). PurgeCSS statically analyses `_site/**/*.html` and `_site/**/*.js` for class names, then removes any CSS selector it does not find. Custom classes added in `_base.scss` or `_layout.scss` that are only applied via JavaScript (e.g., toggled by theme.js), via Liquid conditionals that produce no output on the scanned pages, or in dynamically-inserted HTML will be stripped entirely. The build succeeds, CI is green, but the live site silently loses styling.

**Why it happens:** `purgecss.config.js` has no `safelist` entries. The content scan is static — it cannot detect classes added by JS at runtime or classes that only appear on rarely-visited page variants. The existing custom classes on the homepage (`hero-thesis`, `homepage-highlights`, `highlight-item`, `highlight-label`, `homepage-currently`, `research-question-grid`, `research-question-card`, `collaboration-cta`) are all present in static HTML and survive today. Any new component that uses JS-toggled classes or classes interpolated by Liquid into attribute strings (not bare class names) will be at risk.

**Consequences:** Styling disappears in production but looks fine in local `jekyll serve` (which does not run PurgeCSS). The regression is invisible until someone loads the live site.

**Warning signs:**
- A component looks correct locally but is unstyled after deployment
- Styles disappear only in production, never in `bundle exec jekyll serve`
- New interactive components (show/hide, tab panels, modals) lose their active/open/visible states

**Prevention:**
1. Add a `safelist` to `purgecss.config.js` for any class that is toggled dynamically or set via JS. Use the `greedy` pattern option for prefixed class families (e.g., `/^research-/`, `/^homepage-/`).
2. Alternatively, add custom class families to the `content` glob so PurgeCSS can find them in source `.liquid` and `.md` files as well as compiled HTML.
3. After every deploy, spot-check the page with the most JS-toggled styles.

**Phase mapping:** Every phase that adds new CSS classes. Phase where custom homepage layout or interactive components are introduced is highest risk.

---

### Pitfall 2: Hardcoded Hex Colors Instead of CSS Custom Properties Break Dark Mode

**What goes wrong:** al-folio's dark mode is implemented entirely via CSS custom properties on `html[data-theme="dark"]` (see `_themes.scss`). The entire color system lives in `--global-*` variables. Any custom CSS that uses a hardcoded hex value (e.g., `color: #3d3d3d`, `background: rgba(255,255,255,0.9)`) instead of a `var(--global-*)` token will not respond to the theme toggle. Components will look correct in light mode and visually broken or unreadable in dark mode — white text on white backgrounds, invisible borders, contrast failures.

**Why it happens:** It is faster to write a hex value directly than to check which CSS custom property to use. Designers working from a mockup will naturally write hex values. The dark-mode system is not obvious from the SCSS file structure — `_variables.scss` defines SCSS variables but the runtime theme system uses CSS custom properties defined in `_themes.scss`, and these are two separate layers that are easy to conflate.

**Consequences:** Dark mode is broken silently. The `enable_darkmode` feature is currently not in `_config.yml` (not set to `true`), so this is dormant risk — but if dark mode is ever enabled, or if a visitor forces dark mode via OS preference and the site responds (even partially) to `prefers-color-scheme`, contrast failures will occur.

**Warning signs:**
- SCSS variables (`$blue-color`, `$grey-color`) appear in custom CSS rules instead of `var(--global-theme-color)` equivalents
- Any `color:`, `background-color:`, or `border-color:` rule in `_base.scss` or `_layout.scss` that contains a hex literal rather than a CSS variable reference

**Prevention:**
1. All custom color rules must use `var(--global-*)` tokens only. Add new tokens to both the `:root` block and the `html[data-theme="dark"]` block in `_themes.scss` when the existing token palette does not cover a new color need.
2. Before any phase is called done, search custom SCSS for hex literals in color properties: `grep -n '#[0-9a-fA-F]\{3,6\}' _sass/_base.scss _sass/_layout.scss`.
3. If dark mode remains disabled, document why, so future contributors do not assume it is tested.

**Phase mapping:** Every phase that adds custom CSS rules. The "visual identity / color palette" phase is highest risk.

---

### Pitfall 3: Google Font Stack Causes Flash of Unstyled Text (FOUT) or Layout Shift

**What goes wrong:** `head.liquid` loads Google Fonts via a `<link defer rel="stylesheet">`. Deferred font loading means the browser renders text in a fallback font first, then re-renders when the custom font arrives. If the fallback font has meaningfully different metrics (x-height, character width) from the custom font, the reflow causes Cumulative Layout Shift (CLS) — a Core Web Vitals failure. Academic hiring committees increasingly use automated tools; a poor Lighthouse score is a credibility signal.

**Why it happens:** The current Google Fonts URL is in `_config.yml` under `third_party_libraries.google_fonts`. Switching font families mid-redesign is common, but the `font-display` strategy and CSS fallback stack are rarely updated when the font choice changes. The `defer` attribute also delays font availability further than necessary.

**Consequences:** Visible text reflow on load. Lighthouse CLS score degrades. On slow connections (conference WiFi, mobile) the effect is pronounced.

**Warning signs:**
- Running Lighthouse locally produces a CLS score above 0.1
- Visible text "jump" on page load in a throttled network simulation
- `font-display: swap` (or no `font-display` directive) in the Google Fonts URL query string

**Prevention:**
1. Use `font-display=optional` in the Google Fonts URL for body text to suppress layout shift (at the cost of the font only appearing on repeat visits if the network is slow).
2. Define a CSS font stack whose fallback metrics closely match the chosen custom font. Use the `size-adjust`, `ascent-override`, and `descent-override` descriptors in a local `@font-face` fallback declaration.
3. Consider self-hosting font files in `assets/` to eliminate the third-party round-trip entirely — this also removes the Google Fonts dependency for privacy-conscious visitors (GDPR).

**Phase mapping:** Typography selection phase. Must be addressed before finalizing the font choice.

---

### Pitfall 4: jekyll-scholar BibTeX Layout Changes Break Publication Badges

**What goes wrong:** The `bib.liquid` layout is deeply coupled to the BibTeX entry structure. It reads `entry.abbr`, `entry.preview`, `entry.google_scholar_id`, `entry.inspirehep_id`, and custom fields. It also calls Ruby Liquid tags (`{% google_scholar_citations %}`, `{% inspirehep_citations %}`) provided by plugins in `_plugins/`. Any change to `bib.liquid` that alters the structure around badge rendering risks breaking the JS-driven abstract expand/collapse, the citation badge scripts, or the venue color system (`--venue-accent` CSS variable set via inline style). Because these interactions span Liquid, inline JS (`onclick` in the more-authors span), and external badge scripts loaded asynchronously, failures are non-obvious.

**Why it happens:** `bib.liquid` is already customized (venue color via `_data/venues.yml`, custom link button classes `btn-primary-link`, `btn-outline-link`). Any further CSS changes that rename or remove those classes will silently break the publication list even if the Liquid template is untouched, because PurgeCSS may remove the selectors (see Pitfall 1) or a CSS rename will leave the class in HTML but unmatched in stylesheets.

**Consequences:** Publication entries render without abstracts, without badges, or with broken expand/collapse. This is the highest-visibility page for hiring committees.

**Warning signs:**
- Abstract "expand" buttons exist in HTML but click does nothing
- Citation badge images show broken image icons
- Venue badges appear but have no color (default grey) when `--venue-accent` is not applied

**Prevention:**
1. Treat `bib.liquid` as a read-only layout during purely visual redesign phases. Apply styling via CSS class additions, not structural HTML changes.
2. When changing button class names in `_base.scss`, search `bib.liquid` for the old class name before removing it.
3. After any change touching publications: manually verify abstract expand/collapse works, one venue badge renders with color, and the Google Scholar badge loads on at least one entry.

**Phase mapping:** Publications styling phase. Any phase touching `_base.scss` button styles.

---

### Pitfall 5: Sass `@use` / `@forward` Module System Conflicts with `!default` Variable Overrides

**What goes wrong:** `_variables.scss` already uses `@use "sass:color"` (modern Sass module system). If custom SCSS files attempt to override `!default` variables using the older `@import`-based pattern (defining a variable before an `@import "_variables"` statement), the override will silently fail under the `@use` system. Variables defined with `!default` in a `@use`-based module cannot be overridden by later `@use` calls — they can only be configured at the initial `@use` call via the `with` clause.

**Why it happens:** al-folio's SCSS structure mixes legacy and modern Sass conventions. Documentation and examples online still predominantly show the `@import` pattern. A developer adding a custom SCSS partial who follows a tutorial will likely use `@import`, which may still work partially depending on Jekyll's Sass compilation order, but produces subtle conflicts when `@use "sass:color"` functions are involved (the `color.adjust()` calls in `_variables.scss`).

**Consequences:** Custom color overrides do not apply, or worse, the build fails with a Sass error about module system conflicts. In some configurations the build appears to succeed but outputs a CSS file using the original variable values.

**Warning signs:**
- A custom SCSS variable defined as `$blue-color: #mycolor` has no effect on the compiled output
- Jekyll build emits warnings about `@import` being deprecated or about module conflicts
- Colors look correct in `_variables.scss` but wrong in the compiled site

**Prevention:**
1. All custom variable overrides must be made by directly editing `_variables.scss`, not by defining them in a new partial.
2. Do not introduce new `@import` directives. Use `@use` with the correct path.
3. When adding new SCSS files, follow the existing pattern: define the file in `_sass/`, add it to the main SCSS manifest, and use `@use` (not `@import`) for any module imports.

**Phase mapping:** SCSS/color palette setup phase. Must be addressed at the very start of any CSS work.

---

## Moderate Pitfalls

---

### Pitfall 6: News Permalink Architecture Causes Silent 404s Under Redesign

**What goes wrong:** This is already documented in CONCERNS.md but its redesign implication is distinct: during any phase that touches `_pages/projects.md` or adds new internal links, the mismatch between date-only news filenames and title-derived link targets will create additional 404s. The `permalink: /:collection/:title/` setting in `_config.yml` generates slugs from the filename stem, not the front-matter title. Anyone adding a news post or a project reference without knowing this convention will produce a broken link.

**Prevention:** Before adding any new news entries or internal cross-links, rename existing news files to include the title slug (e.g., `2024-05-16-paper-accepted-at-acl-2024-findings.md`), update the three broken links in `_pages/projects.md` to use date-based slugs, and document the naming convention in a comment at the top of the `_news/` directory via a README.

**Phase mapping:** Any phase that adds content or cross-links, most critically the news/content update phase.

---

### Pitfall 7: Custom Homepage Markup Uses Non-BEM Classes That Conflict with Bootstrap

**What goes wrong:** The homepage (`_pages/about.md`) contains custom HTML blocks using class names like `homepage-highlights`, `highlight-item`, `highlight-label`, `research-question-grid`, `research-question-card`. These classes are invented but not namespaced. Bootstrap 4 (loaded via MDB) uses a flat class namespace and future Bootstrap versions may introduce conflicting class names. More immediately, `card` and `card-title` are Bootstrap classes — if custom styles targeting `.card` are added to `_base.scss` for new visual purposes, they will affect all Bootstrap card components site-wide, not just the intended targets.

**Prevention:** Use a consistent prefix for all custom classes introduced during the redesign (e.g., `do-` for "Daniela Occhipinti" or any memorable prefix). Audit existing custom classes at the start of the redesign phase and add the prefix before adding new CSS rules that reference them.

**Phase mapping:** Any phase that adds new HTML components or extends existing Bootstrap card components.

---

### Pitfall 8: Minifier/Terser Strips Inline JavaScript Inside Liquid Templates

**What goes wrong:** `jekyll-minifier` is configured with `compress_javascript: false` but `jekyll-terser` handles JS minification. The `bib.liquid` layout contains inline JavaScript in an `onclick` attribute on the more-authors `<span>`. If Terser's configuration ever changes (e.g., `drop_console` is extended), or if future inline scripts are added to Liquid templates, the minifier may mangle variable names or remove code that appears "dead" to static analysis. The more-authors animation (which interpolates Liquid variables into JS string literals at build time) is particularly fragile: `'{{ more_authors_hide }}'` and `'{{ more_authors_show }}'` become inline string literals in the compiled HTML, and a minifier that normalises quotes or restructures the conditional expression will break the feature.

**Prevention:** Do not add new inline JS to Liquid templates. For any new interactive behavior, write a separate `.js` file in `_includes/` or `assets/js/` and load it conditionally. Keep the Terser `compress` config minimal.

**Phase mapping:** Any phase introducing new interactive components.

---

### Pitfall 9: Profile Image Aspect Ratio Change Breaks the About Page Layout

**What goes wrong:** `_layouts/about.liquid` places the profile image as a 30%-width right-floated element. The `img-fluid` class allows height to scale freely. If the profile photo is replaced with one of a very different aspect ratio (e.g., switching from a nearly-square headshot to a landscape image), the float layout collapses or produces excessive whitespace before the text reflows. The `z-depth-1 rounded` classes produce a drop shadow and border radius that look intentional only when the image proportions match what the layout expects.

**Prevention:** Keep profile images in a near-square crop (3:4 or 1:1). If a different aspect ratio is needed, add an explicit `height` constraint or `object-fit: cover` with a fixed container in the profile CSS block rather than relying on `img-fluid`.

**Phase mapping:** Any phase touching the profile/about layout.

---

## Minor Pitfalls

---

### Pitfall 10: Google Scholar Citation Scraper Makes Build Time Non-Deterministic

Already documented in CONCERNS.md. The redesign-specific risk: any phase that iterates frequently on build-and-preview will be slowed by the 1.5–3.5s sleep per publication entry. With the current number of publications this adds 15–30 seconds per build. During active layout development, this makes fast iteration difficult and may cause CI timeout failures if many builds queue.

**Prevention:** Disable the citation scraper locally during layout development by commenting out the `google_scholar_citations.rb` plugin, or by caching its output in a local data file. Re-enable for production deploys only.

**Phase mapping:** All phases. Most disruptive during the visual iteration phases.

---

### Pitfall 11: SRI Hashes Become Stale After Updating Third-Party Library Versions

**What goes wrong:** `_config.yml` configures `third_party_libraries` with `integrity:` (SRI) hashes for Bootstrap, MDB, and other CDN-loaded assets. If any library version is updated during the redesign (e.g., upgrading Bootstrap for a new component), the existing SRI hash will no longer match and the browser will block the resource load entirely — producing a completely unstyled or non-functional page with no obvious error except a console message.

**Prevention:** Any time a CDN library URL is changed, the integrity hash must be updated simultaneously. Use `openssl dgst -sha384 -binary [file] | openssl base64 -A` on the downloaded file, or use the SRI Hash Generator at https://www.srihash.org/.

**Phase mapping:** Any phase that touches `_config.yml` third-party library entries.

---

### Pitfall 12: Accessibility CI Runs Only on Manual Dispatch

As documented in CONCERNS.md, the axe workflow is `workflow_dispatch` only. The redesign-specific risk: visual changes are the primary source of accessibility regressions (contrast ratio changes, focus indicator removal, custom interactive elements without ARIA). A major visual redesign that never triggers automated accessibility checks can ship WCAG failures.

**Prevention:** Re-enable automatic triggers on the axe workflow (`push:` and `pull_request:` triggers) before the first visual redesign phase completes. At minimum, run `axe` locally using a browser extension before each phase review.

**Phase mapping:** Must be re-enabled in the first phase that changes visual styling. Not a blocker for content-only phases.

---

## Academic Credibility Pitfalls

These are not technical failures but design decisions that damage credibility with the primary audience (hiring committees, senior researchers).

---

### Pitfall 13: Design Signals "Template" Rather Than "Person"

**What goes wrong:** The exact problem the redesign is meant to solve. The failure mode during redesign is replacing one set of template signals with another: e.g., swapping the al-folio blue accent for a trendy gradient, adding a "hero section" with stock imagery, or using card-grid layouts that look like a SaaS marketing site. Hiring committees evaluate dozens of academic sites. Any design element that reads as "this person used a template" (even a fancy template) undermines the goal.

**Specific signals to avoid:**
- Gradient hero banners
- Icon-heavy "skills" grids (this is a researcher, not a UX portfolio)
- Animated entrance effects on scroll
- "Dark and techy" aesthetics that signal dev portfolio rather than research identity
- Excessive use of card grids for content that reads better as prose

**Warning signs:** A non-NLP-researcher colleague looks at the site and says "nice template" rather than "this is clearly Daniela's work."

**Prevention:** Typography and color palette are the primary identity signals; layout should stay calm and readable. Distinguish the site through voice (writing) and selective use of visual hierarchy, not decorative elements.

**Phase mapping:** Visual identity phase. Requires a design review with someone outside the project.

---

### Pitfall 14: Research Description Reads as CV Summary Rather Than Research Vision

**What goes wrong:** The "What My Research Is About" section (`about.md`) already has good bones. The redesign risk is that in making the page look more distinctive, the text gets revised to match a more "designed" container — shorter, punchier, more fragmented — losing the substantive content that establishes expertise. Hiring committees read for depth. Three sentences that explain the actual research question are worth more than ten design tokens.

**Warning signs:**
- Research descriptions become shorter during redesign iterations
- Section headings become more generic ("Research" instead of "How should a dialogue system represent a person?")
- Technical terms (persona-based dialogue generation, interlocutor adaptation, HED-IT) are removed in favor of plain English summaries

**Prevention:** Treat research text as locked during visual phases. Only revise text content in a dedicated content phase, and ask whether each revision adds or removes specificity.

**Phase mapping:** Content phases. Do not allow visual phases to touch body copy.

---

### Pitfall 15: Stale or Missing News Undermines "Active Researcher" Signal

**What goes wrong:** The most recent news items establish the impression of ongoing activity. A news section that ends in 2024 (or shows a gap of 12+ months) reads as an abandoned site or a researcher who stopped producing. This is a credibility signal that no visual redesign can compensate for.

**Current state:** `_news/2025-11-03.md` appears to be the most recent entry (a future-dated item). The broken image on the PhD defense post (`_news/2025-04-28.md`) means that entry renders poorly. Three news links in `_pages/projects.md` are broken.

**Warning signs:**
- Last news entry is more than 6 months before site launch
- Broken images in news entries
- News items with `inline: true` that are also linked from other pages (they produce no standalone page)

**Prevention:** Fix all broken links and images before launch (tracked in CONCERNS.md). Add a news entry for any award, paper acceptance, or conference appearance that occurred since the last entry. Make news content update the final step before launch.

**Phase mapping:** Content cleanup phase must precede launch. News content update is a distinct phase from visual redesign.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Color palette / CSS variables | Pitfall 2 (hardcoded hex), Pitfall 5 (Sass module conflicts) | Use only `var(--global-*)`, edit `_variables.scss` directly |
| Custom homepage layout | Pitfall 1 (PurgeCSS), Pitfall 7 (Bootstrap conflicts) | Add safelist, use prefixed class names |
| Typography selection | Pitfall 3 (FOUT/CLS) | Set `font-display`, consider self-hosting |
| Publications styling | Pitfall 4 (bib.liquid coupling), Pitfall 1 (PurgeCSS) | Read-only bib.liquid, verify badges after every change |
| New interactive components | Pitfall 8 (Terser/inline JS) | External JS files, not inline |
| Any CSS rename | Pitfall 4 (publication buttons) | Grep bib.liquid before removing any class |
| Content updates | Pitfall 6 (news slugs), Pitfall 15 (stale news) | Fix slug architecture first |
| Visual identity decisions | Pitfall 13 (template feel), Pitfall 14 (research voice) | Design review with external eye |
| Pre-launch | Pitfall 12 (accessibility CI), Pitfall 11 (SRI hashes) | Enable axe workflow, verify hashes |

---

## Sources

- Direct inspection of `/Users/daniela/Desktop/website/danie08.github.io/` codebase (2026-04-30)
- `.planning/codebase/CONCERNS.md` — existing known issues cross-referenced throughout
- `.planning/PROJECT.md` — project goals and constraints
- al-folio theme architecture: `_sass/_themes.scss`, `_sass/_variables.scss`, `_sass/_base.scss`
- Build pipeline: `.github/workflows/deploy.yml`, `purgecss.config.js`
- Layout templates: `_layouts/about.liquid`, `_layouts/bib.liquid`
- Custom includes: `_includes/head.liquid`, `_includes/header.liquid`
- Content: `_pages/about.md`, `_config.yml`
