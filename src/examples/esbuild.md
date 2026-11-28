---
title: esbuild code obfuscation
description: Add esbuild-plugin-codefend to a JavaScript build, keep imports and exports consistent across modules, and execute the generated bundle with Node.js.
---

# esbuild code obfuscation

Requires version **3.3.0 or later** of the plugin. This guide selects the recommended [`m_` parser preset](/advanced-usage/parser/presets).

Use [esbuild-plugin-codefend](https://www.npmjs.com/package/esbuild-plugin-codefend) to apply Codefend while esbuild loads source modules. This example builds two JavaScript modules into a CommonJS bundle so you can execute and check the result with Node.js.

## 1. Install esbuild and the plugin

Start in a new directory with `npm init -y`, or use an existing project:

```sh
npm install --save-dev esbuild esbuild-plugin-codefend@^3.3.0
```

In a project that already has esbuild, only the plugin needs adding. It supports esbuild 0.25.12 and newer within esbuild 0.25, 0.26, 0.27, and 0.28.

## 2. Create two source modules

```js [src/math.js]
export function m_add(m_left, m_right) {
  return m_left + m_right;
}
```

```js [src/main.js]
import { m_add } from "./math.js";

console.log(m_add(2, 3));
```

### Expected obfuscated source

With the configuration below, esbuild emits this bundle at `dist/bundle.cjs`:

<<< @/resources/bundlers/esbuild/bundle.cjs{js}

This output comes from an actual build with the configuration below. It prints `5`; Codefend replaces the application's `m_` names while preserving `console.log`. Exact generated names and formatting can vary with the input and tool versions.

The same mapping is used for the function's export and import, so the two modules continue to work together. Keep names required by external consumers unchanged.

## 3. Configure the build

Create `build.mjs`. The `.mjs` extension allows the script to use ES module imports regardless of your project's package type.

```js [build.mjs]
import { build } from "esbuild";
import { codefend } from "esbuild-plugin-codefend";

await build({
  entryPoints: ["src/main.js"],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: "dist/bundle.cjs",
  plugins: [codefend({ parser: { name: "startWithMAndUnderscore" } })],
});
```

The plugin accepts `parser.name`, `transformation`, and `debug` options. This example selects `startWithMAndUnderscore`; `codeOnly` remains the default when parser settings are omitted. For example, `codefend({ debug: { stats: false } })` disables its build statistics.

esbuild's JavaScript build API loads the plugin. Its command-line interface, `buildSync`, and `transform` API do not load plugins. This example leaves minification disabled through esbuild's defaults so you can inspect the renamed source.

## 4. Build and execute

```sh
node build.mjs
node dist/bundle.cjs
```

The bundle should print:

```text
5
```

Inspect `dist/bundle.cjs` to confirm that the example's `m_` names were replaced. The source files under `src` retain their readable names.

## Add this to your workflow

Keep Codefend in your existing esbuild plugin list and run your normal build script. Merge these scripts into `package.json`:

```json
{
  "scripts": {
    "build": "node build.mjs",
    "check:bundle": "node dist/bundle.cjs"
  }
}
```

For a local or CI build:

```sh
npm ci
npm run build
npm run check:bundle
```

The plugin runs whenever included in a build, rebuild, or watch context. A production-only integration can include it conditionally in the build script. No separate global Codefend CLI step is needed.

For a browser application, keep its existing platform, output format, loaders, and framework settings. The `platform: "node"` and CommonJS output above belong to this executable example. Run the application's tests against its generated output before deployment.

## Integrating with a larger build

- The plugin transforms JavaScript and TypeScript file modules through `onLoad`, before esbuild compiles or minifies them. JavaScript, JSX, TypeScript, TSX, and their module extensions are supported, along with configured JavaScript/TypeScript loader overrides.
- File entry points are required. `stdin` input is not supported. Modules whose contents are supplied by another plugin's loader, including virtual modules, are outside this plugin's transformation step.
- Preserve public export names, external data keys, and property or path names expected by other systems. `transformation.ignore` preserves words; it does not exclude files or dependency directories.
- CSS, JSON, text, and binary loaders keep their normal behavior. Codefend does not provide a separate obfuscation source map; check debugging requirements before relying on production source maps.

See the [code naming conventions](/basic-usage/naming-conventions/code-naming-convention), [AI migration guide](/basic-usage/naming-conventions/ai-assisted-migration), and [configuration reference](/references/configuration) for selecting and preserving names. The [Vite guide](./vite) covers Vite projects.
