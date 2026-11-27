import { defineConfig } from "vitepress";

const siteUrl = "https://codefend.github.io/docs/";
const description =
  "Codefend source obfuscation guides for C#, C++, Python, Java, JavaScript, and more, plus Arduino and bundler examples.";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Codefend",
  titleTemplate: ":title | Codefend",
  description,
  lastUpdated: true,
  lang: "en-US",
  base: "/docs/",
  srcDir: "src",
  srcExclude: ["resources/**/*.md", "examples/template.md"],
  cleanUrls: true,
  sitemap: { hostname: siteUrl },
  transformHead({ pageData }) {
    if (pageData.relativePath === "404.md") return [];
    const route = pageData.relativePath
      .replace(/(^|\/)index\.md$/, "$1")
      .replace(/\.md$/, "");
    const url = new URL(route, siteUrl).href;
    const pageDescription = pageData.description || description;
    return [
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: "Codefend" }],
      ["meta", { property: "og:title", content: pageData.title || "Codefend" }],
      ["meta", { property: "og:description", content: pageDescription }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { name: "twitter:card", content: "summary" }],
    ];
  },
  themeConfig: {
    search: {
      provider: "local",
    },

    nav: [
      { text: "Guide", link: "/get-started/introduction" },
      { text: "Examples", link: "/examples/list" },
      { text: "Languages", link: "/examples/list#languages" },
    ],

    sidebar: [
      {
        text: "Get Started",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/get-started/introduction" },
          { text: "How it works", link: "/get-started/how-it-works" },
          { text: "Installation", link: "/get-started/installation" },
        ],
      },
      {
        text: "Basic Usage",
        collapsed: false,
        items: [
          {
            text: "Generating the Configuration",
            link: "/basic-usage/generating-configuration",
          },
          {
            text: "Naming Conventions",
            link: "/basic-usage/naming-conventions/naming-conventions",
            items: [
              {
                text: "Folders and Files Naming Convention",
                link: "/basic-usage/naming-conventions/folders-files-naming-convention",
              },
              {
                text: "Code Naming Convention",
                link: "/basic-usage/naming-conventions/code-naming-convention",
              },
              {
                text: "Adopt Naming Conventions with AI",
                link: "/basic-usage/naming-conventions/ai-assisted-migration",
              },
            ],
          },
          { text: "Obfuscation", link: "/basic-usage/obfuscation" },
        ],
      },
      {
        text: "Advanced Usage",
        collapsed: true,
        items: [
          {
            text: "Transformation",
            link: "/advanced-usage/transformation/list",
            items: [
              {
                text: "Default Transformation",
                link: "/advanced-usage/transformation/default-transformation",
              },
              {
                text: "Static Transformation",
                link: "/advanced-usage/transformation/static-transformation",
              },
              {
                text: "Ignore Transformation ",
                link: "/advanced-usage/transformation/ignore-transformation",
              },
              {
                text: "Pool Transformation ",
                link: "/advanced-usage/transformation/pool-transformation",
              },
            ],
          },
          {
            text: "Parser",
            collapsed: true,
            items: [
              {
                text: "Overview",
                link: "/advanced-usage/parser/overview",
              },
              {
                text: "Custom Naming convention",
                link: "/advanced-usage/parser/custom-naming-convention",
              },
            ],
          },
          {
            text: "Multi-layer Obfuscation",
            link: "/advanced-usage/multi-layer-obfuscation",
          },
        ],
      },
      {
        text: "Distribution",
        collapsed: true,
        items: [
          {
            text: "Build and Deployment",
            link: "/distribution/build-and-deployment",
          },
          { text: "Troubleshooting", link: "/distribution/troubleshooting" },
        ],
      },
      {
        text: "References",
        collapsed: true,
        items: [
          { text: "Commands", link: "/references/commands" },
          { text: "Configuration", link: "/references/configuration" },
        ],
      },
      {
        text: "Examples",
        collapsed: true,
        link: "/examples/list",
        items: [
          { text: "JavaScript (Node.js)", link: "/examples/nodejs" },
          { text: "TypeScript", link: "/examples/typescript" },
          { text: "Arduino", link: "/examples/arduino" },
          { text: "Python", link: "/examples/python" },
          { text: "C#", link: "/examples/csharp" },
          { text: "Java", link: "/examples/java" },
          { text: "C", link: "/examples/c" },
          { text: "C++", link: "/examples/cplusplus" },
          { text: "Go", link: "/examples/go" },
          { text: "Rust", link: "/examples/rust" },
          { text: "PHP", link: "/examples/php" },
          { text: "Ruby", link: "/examples/ruby" },
          { text: "Kotlin", link: "/examples/kotlin" },
          { text: "Swift", link: "/examples/swift" },
          { text: "Dart", link: "/examples/dart" },
          { text: "R", link: "/examples/r" },
          { text: "Lua", link: "/examples/lua" },
          { text: "SQL (SQLite)", link: "/examples/sql" },
          { text: "Bash", link: "/examples/bash" },
          { text: "PowerShell", link: "/examples/powershell" },
          { text: "HTML and CSS", link: "/examples/html-css" },
          { text: "Vite", link: "/examples/vite" },
          { text: "esbuild", link: "/examples/esbuild" },
          { text: "Rollup", link: "/examples/rollup" },
          { text: "Webpack", link: "/examples/webpack" },
        ],
      },
      {
        text: "Migration guide",
        collapsed: false,
        items: [
          { text: "Migrate to Codefend 3", link: "/migrations/codefend-v3" },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Codefend/core",
      },
    ],
  },
});
