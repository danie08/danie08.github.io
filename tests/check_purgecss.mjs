// The deployment CLI imports CommonJS configuration as an ES module.
import assert from "node:assert/strict";
import * as config from "../purgecss.config.js";
assert.ok(Array.isArray(config.content) && config.content.includes("_site/**/*.html"), "PurgeCSS CLI must receive content globs");
assert.ok(Array.isArray(config.css) && config.css.length, "PurgeCSS CLI must receive CSS inputs");
assert.ok(
  config.safelist.greedy.some((pattern) => pattern.test("portfolio-navigation")),
  "Portfolio interaction styles must be safelisted"
);
console.log("PurgeCSS configuration imports correctly for the deployment CLI.");
