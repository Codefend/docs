import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, ".vitepress/dist");
const site = "https://codefend.github.io/docs/";
assert.ok(
  existsSync(join(output, "index.html")),
  "Run npm run docs:build first",
);

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
    const path = join(directory, item.name);
    return item.isDirectory()
      ? htmlFiles(path)
      : item.name.endsWith(".html")
        ? [path]
        : [];
  });
}

let links = 0;
const pages = htmlFiles(output);
for (const file of pages) {
  const path = relative(output, file).split(sep).join("/");
  const html = readFileSync(file, "utf8");
  const route = path === "index.html" ? "" : path.replace(/\.html$/, "");
  const canonical = new URL(route, site).href;
  if (path !== "404.html") {
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, path);
    assert.ok(
      html.includes(`rel="canonical" href="${canonical}"`),
      `Canonical URL: ${path}`,
    );
    assert.match(
      html,
      /<meta name="description" content="[^"]+"/,
      `Description: ${path}`,
    );
    assert.ok(
      html.includes(`property="og:url" content="${canonical}"`),
      `Sharing URL: ${path}`,
    );
    assert.ok(
      !path.startsWith("resources/") && path !== "examples/template.html",
      `Internal partial indexed: ${path}`,
    );
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) continue;
    const target = new URL(href.replaceAll("&amp;", "&"), canonical);
    if (!target.href.startsWith(site)) continue;
    const local = decodeURIComponent(
      target.pathname.slice(new URL(site).pathname.length),
    );
    const candidate = resolve(output, local || "index.html");
    assert.ok(
      candidate.startsWith(output + sep),
      `Link escapes output: ${href}`,
    );
    assert.ok(
      [candidate, candidate + ".html", join(candidate, "index.html")].some(
        existsSync,
      ),
      `Broken link in ${path}: ${href}`,
    );
    links++;
  }
}
const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
const languageDirectory = join(root, "src/resources/languages");
const languageRoutes = readdirSync(languageDirectory).map((language) => {
  const metadata = JSON.parse(
    readFileSync(join(languageDirectory, language, "example.json"), "utf8"),
  );
  assert.match(metadata.route, /^\/examples\/[a-z-]+$/);
  return metadata.route.slice("/examples/".length);
});
for (const route of [
  "arduino",
  "nodejs",
  "vite",
  "esbuild",
  "rollup",
  "webpack",
  ...languageRoutes,
]) {
  const url = site + "examples/" + route;
  assert.ok(
    sitemap.includes(`<loc>${url}</loc>`),
    `Missing example from sitemap: ${route}`,
  );
  assert.ok(
    readFileSync(join(output, `examples/${route}.html`), "utf8").includes(
      "<h1",
    ),
    `Missing rendered content: ${route}`,
  );
  const article = readFileSync(join(root, `src/examples/${route}.md`), "utf8");
  assert.match(
    article,
    /^### Expected obfuscated source$/m,
    `Missing early source preview: ${route}`,
  );
  assert.match(
    article,
    /^## .*workflow/im,
    `Missing workflow guidance: ${route}`,
  );
}
const bundlerResources = join(root, "src/resources/bundlers");
const bundlerPreviews = JSON.parse(
  readFileSync(join(bundlerResources, "previews.json"), "utf8"),
);
const digest = (value) => createHash("sha256").update(value).digest("hex");
for (const preview of bundlerPreviews.previews) {
  const generated = readFileSync(
    join(bundlerResources, preview.preview),
    "utf8",
  ).replaceAll("\r\n", "\n");
  assert.equal(
    digest(generated),
    preview.sha256,
    `Changed bundler preview: ${preview.name}`,
  );
  const article = readFileSync(join(root, "src", preview.sourcePage), "utf8");
  const blocks = Array.from(
    article.matchAll(/```\w+ \[([^\]]+)\]\r?\n([\s\S]*?)```/g),
    ([, file, code]) => ({
      file,
      code: code.replaceAll("\r\n", "\n"),
    }),
  );
  assert.equal(
    digest(JSON.stringify(blocks)),
    preview.sourceSha256,
    `Rebuild the ${preview.name} preview after source/config changes`,
  );
}
assert.doesNotMatch(sitemap, /\/resources\/|\/examples\/template|\/404/);
console.log(
  `Verified ${pages.length} HTML pages, ${links} local links, example content, canonical metadata, and sitemap.`,
);
