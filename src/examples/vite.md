---
title: Vite code obfuscation
description: Add Codefend to a Vite production build with rollup-plugin-codefend, keep development unchanged, and verify a working JavaScript example.
---

# Vite code obfuscation

Use `rollup-plugin-codefend` in a Vite build to rename source names that follow Codefend's naming convention. This example keeps the development server unchanged and applies Codefend when building.

The current adapter uses the `transform` hook on source modules. It does not use `renderChunk`, and it does not require a separate Vite plugin package. Vite supports compatible bundler plugins and [conditional plugin application](https://vite.dev/guide/api-plugin.html#conditional-application).

## 1. Install the plugin

Use a Node.js version supported by your Vite release. In an existing Vite project, run:

```sh
npm install --save-dev rollup-plugin-codefend
```

For a new minimal project, run `npm init -y` and install Vite as well:

```sh
npm install --save-dev vite rollup-plugin-codefend
```

## 2. Apply Codefend only during builds

Create `vite.config.mjs`:

```js [vite.config.mjs]
import { defineConfig } from "vite";
import { codefend } from "rollup-plugin-codefend";

export default defineConfig(({ command }) => ({
  plugins: command === "build" ? [codefend()] : [],
  build: {
    minify: false,
  },
}));
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
function l_add(l_left, l_right) {
  return l_left + l_right;
}

document.querySelector("#result").textContent = String(l_add(2, 3));
```

### Expected obfuscated source

With the build configuration above, the application section of the emitted JavaScript looks like this:

<<< @/resources/bundlers/vite/application.js

This is an excerpt from an actual build; Vite's module-preload helper is omitted. The page still displays `5`. Codefend replaces our `l_` names while preserving `document.querySelector` and `#result`. Exact generated names and bundler formatting can vary with the input and tool versions.

Only application-owned names receive the `l_` convention. Browser APIs such as `document` and `querySelector`, and the HTML ID `result`, retain their original names.

## 4. Build and check the result

```sh
npx vite build
npx vite preview
```

Open the preview URL printed by Vite. The page should display `5`. Inspect the emitted JavaScript under `dist/assets`: the example's `l_` names should have been replaced. Exact generated names and output formatting may vary.

Run `npx vite` to use the development server. With this configuration, Codefend is omitted during development.

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
- The adapter currently exposes `transformation` and `debug` options. Custom parser rules and a built-in `mPrefix` parser are not available through this plugin.
- Codefend uses text matching; it does not infer component ownership or coordinate HTML, CSS, and JavaScript selectors automatically. Test the production application, including lazy-loaded routes and any shared names.
- This example uses the default generated-name strategy and an empty pool. Test custom pools across all modules before adopting them; shared pool allocation has known limitations.
- The adapter returns transformed source without a corresponding Codefend source map. Validate your debugging requirements before enabling production source maps.

For direct bundling, see the [Rollup example](./rollup). For naming details, see [code naming conventions](../basic-usage/naming-conventions/code-naming-convention).
