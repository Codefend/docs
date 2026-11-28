---
title: Vite code obfuscation
description: Add Codefend to a Vite production build with vite-plugin-codefend, keep development unchanged, and verify a working JavaScript example.
---

# Vite code obfuscation

Requires version **3.3.0 or later** of the plugin. This guide selects [`startWithMAndUnderscore`](/advanced-usage/parser/presets), which we recommend for new projects using explicit `m_` names. Its narrower selection helps preserve unrelated underscore names.

Use [vite-plugin-codefend](https://www.npmjs.com/package/vite-plugin-codefend) in a Vite build to rename source names that follow Codefend's naming convention. The plugin automatically runs only during builds, keeping the development server and HMR unchanged.

The plugin uses the `transform` hook after framework transforms and preserves Vite's internal helper modules and generated asset and preload markers. If your Vite configuration currently imports `rollup-plugin-codefend`, replace that dependency and import with `vite-plugin-codefend`; the `transformation` and `debug` options have the same structure.

## 1. Install the plugin

The plugin supports Vite 6.4.6 and newer within Vite 6, 7, and 8. In an existing Vite project, run:

```sh
npm install --save-dev vite-plugin-codefend@^3.3.0
```

For a new minimal project, run `npm init -y` and install Vite as well:

```sh
npm install --save-dev vite vite-plugin-codefend@^3.3.0
```

## 2. Apply Codefend only during builds

Create `vite.config.mjs`:

```js [vite.config.mjs]
import { defineConfig } from "vite";
import { codefend } from "vite-plugin-codefend";

export default defineConfig({
  plugins: [codefend({ parser: { name: "startWithMAndUnderscore" } })],
  build: {
    minify: false,
  },
});
```

Minification is disabled here so you can inspect Codefend's changes separately. Your application can also enable Vite's minification after verifying the combined build. Preserve any framework plugins already required by your project.

## 3. Mark names owned by your application

Create the HTML entry and JavaScript module:

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Codefend Vite example</title>
  </head>
  <body>
    <p id="result"></p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

```js [src/main.js]
function m_add(m_left, m_right) {
  return m_left + m_right;
}

document.querySelector("#result").textContent = String(m_add(2, 3));
```

### Expected obfuscated source

With the build configuration above, the application section of the emitted JavaScript looks like this:

<<< @/resources/bundlers/vite/application.js

This is an excerpt from an actual build; Vite's module-preload helper is omitted. The page still displays `5`. Codefend replaces our `m_` names while preserving `document.querySelector` and `#result`. Exact generated names and bundler formatting can vary with the input and tool versions.

Only application-owned names receive the `m_` convention. Browser APIs such as `document` and `querySelector`, and the HTML ID `result`, retain their original names.

## 4. Build and check the result

```sh
npx vite build
npx vite preview
```

Open the preview URL printed by Vite. The page should display `5`. Inspect the emitted JavaScript under `dist/assets`: the example's `m_` names should have been replaced. Exact generated names and output formatting may vary.

Run `npx vite` to use the development server. The plugin's build-only behavior skips Codefend transformations during development without a conditional plugin list.

## Add this to your workflow

Keep the Codefend plugin in your existing Vite configuration so it runs as part of each production build. Merge these scripts into your project's `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Your local or CI build can then use:

```sh
npm ci
npm run build
```

Test the application served from `dist` before deployment. Retain the framework plugins and build settings your application already needs. This integration uses the locally installed plugin; it does not need a separate global Codefend CLI step.

## Applying this to a larger application

- Keep public API names, framework entry points, external JSON fields, and names expected by third-party code stable.
- The plugin accepts `parser.name`, `transformation`, and `debug` options. Choose `startWithMAndUnderscore` for the narrower `m_` convention or `codeOnly` for the existing broader rule; omitted parser settings retain `codeOnly`.
- Codefend uses text matching; it does not infer component ownership or coordinate HTML, CSS, and JavaScript selectors automatically. Test the production application, including lazy-loaded routes and any shared names.
- This example uses the default generated-name strategy and an empty pool. Test custom pools across all modules before adopting them; shared pool allocation has known limitations.
- The plugin does not provide a separate HTML or CSS asset transformation step. Its hook returns transformed source without a corresponding Codefend source map. Validate your debugging requirements before enabling production source maps.

For direct bundling, see the [Rollup example](./rollup). For naming details, see [code naming conventions](../basic-usage/naming-conventions/code-naming-convention).
