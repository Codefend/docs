# Codefend documentation

Guides and examples for [Codefend](https://www.npmjs.com/package/codefend), published at [codefend.github.io/docs](https://codefend.github.io/docs/).

The [example index](src/examples/list.md) covers JavaScript/TypeScript, Python, C#, Java, C/C++, Go, Rust, PHP, Ruby, Kotlin, Swift, Dart, R, Lua, SQL, Bash, PowerShell, and HTML/CSS. It also links the Arduino and Vite/Rollup/Webpack build guides.

Bundler integrations are available through [vite-plugin-codefend](https://www.npmjs.com/package/vite-plugin-codefend), [rollup-plugin-codefend](https://www.npmjs.com/package/rollup-plugin-codefend), and [webpack-plugin-codefend](https://www.npmjs.com/package/webpack-plugin-codefend). The [Vite guide](src/examples/vite.md) uses the dedicated Vite plugin, which runs automatically during production builds.

## Development

Use Node.js 22.18 or later. CI uses Node.js 24. This requirement belongs to the documentation tools, including CSpell; Codefend's runtime requirement remains Node.js 18 or later.

```sh
npm ci
npm run docs:dev
```

## Validation

```sh
npm run check
```

This runs spelling, executable CLI examples, the production site build, and generated-page checks for links, canonical metadata, and the sitemap. The site build also rejects dead Markdown links.

- `npm run examples:check` executes the original and generated Node.js program, then verifies the Arduino transformation against the displayed sketch, preserving required filenames and APIs.
- The same command checks every language fixture through the actual Codefend CLI: source and filenames are preserved, selected names are replaced, direct API results agree, and inverse mappings restore the original text. It also executes the SQL example in SQLite and checks HTML/CSS references.
- These checks do not install every language toolchain or claim every example was compiled. Follow each language guide to compile/run both versions with your own SDK. Runtime checks performed during authoring are recorded separately from source-transformation checks.
- Arduino board compilation requires Arduino CLI and the board platform. Follow the Arduino guide to compile both versions; the automated source check does not compile firmware or test hardware.
- `npm run docs:preview` serves the production build for a local review.

VitePress is kept on stable 1.6.4. A scoped override updates its Vite dependency to the compatible 6.4.6 security line; the Vue plugin supports Vite 6. Review this override when upgrading VitePress. See the [upstream discussion](https://github.com/vuejs/vitepress/issues/5201).

## Writing guides

Add complete tutorials under `src/examples`, with a descriptive title and description in frontmatter. Link them from the sidebar and example index. Keep reusable code under `src/resources` and import it into Markdown so the displayed code matches the files checked by scripts.

Language fixtures live under `src/resources/languages/<language>/`: a `source` directory, `codefend.config.json`, and `example.json` with the route, source filenames, entry file, and expected output. The scripts discover these fixtures to check transformation behavior and require each guide in the generated sitemap. Keep build artifacts outside `source`.

Recommend global Codefend installation for CLI tutorials outside Node.js projects, and local dependencies for Node.js, TypeScript, and bundler projects. Prefer supported source-file runners when they avoid a separate project or build configuration. Show required configuration and meaningful overrides; leave default options implicit. The obfuscation command already checks configuration.

Place an expected obfuscated-source preview immediately after the original code, then explain how to add the transformation to an existing workflow. Regenerate CLI previews with `npm run examples:update`; the example checks compare them with actual CLI output. Bundler previews record actual build output and source/config fingerprints and must be refreshed from a real bundler build when those inputs change.

Resource Markdown fragments and the old authoring template are excluded from site routes, search, and the sitemap. They remain available to Markdown includes.

Use the deployed `/docs/` base when changing site metadata. The build generates canonical and sharing URLs plus a sitemap containing public pages. Search-engine indexing and ranking depend on the search engines; generating metadata does not guarantee placement.

## Deployment

Pull requests run the validation workflow. The Pages workflow validates and deploys on pushes to `main` or an explicit manual run. Deploy permissions are limited to the deployment job.

## License

[MIT](LICENSE)
