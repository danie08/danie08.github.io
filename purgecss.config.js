// Named CommonJS exports also remain visible to the CLI's dynamic import().
exports.content = ["_site/**/*.html", "_site/**/*.js"];
exports.css = ["_site/assets/css/*.css"];
exports.output = "_site/assets/css/";
exports.skippedContentGlobs = ["_site/assets/**/*.html"];
exports.safelist = {
  greedy: [
    /^portfolio-/,
    /aria-current/,
    /unloaded/,
    /^hero-/,
    /^homepage-/,
    /^highlight-/,
    /^research-question-/,
    /^featured-publication/,
    /^project-story/,
    /^collaboration-cta/,
    /^btn-primary-link/,
    /^btn-outline-link/,
    /^cv-intro/,
    /^footer-/,
    /^selected-papers-showcase/,
  ],
};
