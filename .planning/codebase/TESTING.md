# TESTING.md
<!-- last_mapped_commit: auto | date: 2026-04-30 -->

## Overview

No unit test framework is present. Quality gates are enforced entirely through **GitHub Actions CI workflows**.

---

## CI Quality Gates

| Tool | Purpose | Config |
|------|---------|--------|
| **Prettier** | Code formatting | `.prettierrc`, `.prettierignore` |
| **axe** | Accessibility auditing | GitHub Actions workflow |
| **lychee** | Link checker (broken links) | `.lycheeignore` |
| **Lighthouse** | Performance / SEO / a11y scores | GitHub Actions workflow |
| **CodeQL** | Static security analysis | `.github/workflows/` |

---

## Test Structure

There are no test files (`spec/`, `test/`, `__tests__/`) in this codebase.

All validation happens at the CI pipeline level on pull requests and pushes to main.

---

## Coverage

- **Unit tests:** None
- **Integration tests:** None
- **E2E tests:** None
- **Visual regression:** None
- **Accessibility:** axe (CI)
- **Performance:** Lighthouse (CI)
- **Link integrity:** lychee (CI)
- **Security:** CodeQL (CI)

---

## Running Checks Locally

```bash
# Formatting
npx prettier --check .

# Link checking (requires lychee installed)
lychee --config .lycheeignore .

# Jekyll build (smoke test)
bundle exec jekyll build
```

---

## Notes

Since this is a static Jekyll site, the primary "testing" concern is:
1. Jekyll builds without errors
2. Content renders correctly
3. No broken links
4. Accessibility compliance
5. Performance budget met (Lighthouse)

All enforced via `.github/workflows/`.
