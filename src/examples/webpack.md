---
title: Webpack code obfuscation
description: Configure webpack-plugin-codefend for a production-only Webpack 5 build and verify the resulting JavaScript with Node.js.
---

# Webpack code obfuscation

Requires version **3.3.0 or later** of the plugin. This guide selects [`startWithMAndUnderscore`](/advanced-usage/parser/presets), which we recommend for new projects using explicit `m_` names. Its narrower selection helps preserve unrelated underscore names.

Use `webpack-plugin-codefend` to apply Codefend during Webpack's asset-processing stage. This JavaScript-only example targets Node.js so you can execute and check the emitted bundle directly.

## 1. Install Webpack and the plugin

Run `npm init -y` in a new project, then install:

```sh
npm install --save-dev webpack@^5 webpack-cli webpack-plugin-codefend@^3.3.0
```

Use a Node.js version supported by the installed Webpack CLI. The Codefend plugin supports Webpack 5.

## 2. Add application code

```js [src/main.js]
function m_add(m_left, m_right) {
  return m_left + m_right;
}

console.log(m_add(2, 3));
```

### Expected obfuscated source

With the production configuration below, Webpack emits this source at `dist/bundle.cjs`:

<<< @/resources/bundlers/webpack/bundle.cjs{js}

This output comes from an actual build with minification disabled. The program still prints `5`; Codefend changes the helper and parameter names, while Webpack adds its bundle wrapper. Exact generated names and wrapper formatting can vary with the input and tool versions.

The `m_` names belong to the application. Leave platform APIs such as `console.log` unchanged.

## 3. Configure production-only obfuscation

Create `webpack.config.cjs`:

```js [webpack.config.cjs]
const path = require("node:path");
const { WebpackPluginCodefend } = require("webpack-plugin-codefend");

module.exports = (_env, argv) => ({
  entry: "./src/main.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.cjs",
  },
  devtool: false,
  optimization: {
    minimize: false,
  },
  plugins:
    argv.mode === "production"
      ? [
          new WebpackPluginCodefend({
            parser: { name: "startWithMAndUnderscore" },
          }),
        ]
      : [],
});
```

Webpack passes command-line arguments to a [configuration function](https://webpack.js.org/configuration/configuration-types/#exporting-a-function). The plugin is included only when you request production mode. The `.cjs` extension preserves CommonJS configuration syntax even when your package uses ES modules.

Minification is disabled in this example so the Codefend renames are easy to inspect. After verifying the output, you can restore Webpack's production minification. For a browser application, retain your existing browser target and framework configuration rather than copying `target: "node"`.

## 4. Build and execute

```sh
npx webpack --config webpack.config.cjs --mode production
node dist/bundle.cjs
```

The bundle should print:

```text
5
```

Inspect `dist/bundle.cjs` to confirm that the `m_` names were replaced. Running the same build command with `--mode development` omits the Codefend plugin.

## Add this to your workflow

Keep the plugin in your application's existing production configuration. Merge this build script into `package.json`:

```json
{
  "scripts": {
    "build": "webpack --config webpack.config.cjs --mode production"
  }
}
```

Your local or CI build can run:

```sh
npm ci
npm run build
node dist/bundle.cjs
```

Run the application's tests against the generated assets before deployment. Keep its existing target, loaders, framework plugins, and other required settings; `target: "node"` belongs to this small example. The locally installed Webpack plugin performs obfuscation as part of the build, without a separate global Codefend CLI step.

## Integrating with a larger build

The plugin processes assets available at Webpack's `PROCESS_ASSETS_STAGE_DERIVED` stage, before normal size optimization. It accepts `parser.name`, `transformation`, and `debug` settings. This example selects `startWithMAndUnderscore`; `codeOnly` remains the default when parser settings are omitted. Webpack's `.tap()` method registers the callback; it does not provide a separate obfuscation algorithm.

Keep public exports, external property names, and framework entry points stable. This example uses an empty pool; custom pools need whole-build testing because shared allocation has known limitations. Builds containing CSS, binary assets, multiple chunks, or additional asset plugins also need representative runtime and asset checks.

The plugin replaces assets with raw transformed source and does not preserve the original source-map mappings. This example therefore disables source maps. Obfuscation renames selected text; it does not encrypt the application or make embedded credentials safe to distribute.

See [code naming conventions](../basic-usage/naming-conventions/code-naming-convention) for selecting names, and the [Vite example](./vite) for Vite projects.
