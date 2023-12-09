import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Codefend",
  titleTemplate: "Protect any source code",
  description: "Protect any source code",
  lastUpdated: true,
  lang: "en-US",
  base: "/docs/",
  srcDir: "src",
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: "local",
    },

    nav: [
      // { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Get Sarted",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/get-started/introduction" },
          { text: "How it works?", link: "/get-started/how-it-works" },
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
          { text: "Node js", link: "/examples/nodejs" },
          { text: "C++", link: "/examples/cplusplus" },
          { text: "Java", link: "/examples/java" },
          { text: "C#", link: "/examples/csharp" },
          { text: "PHP", link: "/examples/php" },
          { text: "Angular", link: "/examples/angular" },
          { text: "React", link: "/examples/react" },
          { text: "Vuejs", link: "/examples/vuejs" },
          { text: "Svelte", link: "/examples/Svelte" },
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
  ignoreDeadLinks: [
    "./../../../get-started/installation",
    "./../../../basic-usage/generating-configuration",
    "./../../../references/configuration",
    "./../../../basic-usage/obfuscation",
    "./../../../references/commands",
    "./../../../distribution/troubleshooting",
    "./../../../distribution/build-and-deployment",
    "./../advanced-usage/transformation/list",
  ],
});
