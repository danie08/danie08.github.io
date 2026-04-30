module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: {
    greedy: [
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
  },
};
