---
title: Rollup code obfuscation
description: Build and execute a two-module JavaScript project using rollup-plugin-codefend and the default Codefend naming strategy.
---

# Rollup code obfuscation

The Rollup plugin runs Codefend while source modules are transformed. This example bundles two JavaScript modules into a CommonJS file, then runs that file with Node.js.

## 1. Install Rollup and the plugin

Start in a new directory with `npm init -y`, or use an existing project:

```sh
npm install --save-dev rollup@^4 rollup-plugin-codefend
```

The plugin supports Rollup 3 and 4. Use a Node.js version supported by the bundler release you install.

## 2. Create two source modules

```js [src/math.js]
export function l_add(l_left, l_right) {
  return l_left + l_right;
}
```

```js [src/main.js]
import { l_add } from "./math.js";

console.log(l_add(2, 3));
```

### Expected obfuscated source

With the configuration below, the two modules produce this bundle at `dist/bundle.cjs`:

<<< @/resources/bundlers/rollup/bundle.cjs{js}

This output comes from an actual build. It still prints `5`; the application helper and its parameters have generated names, while `console.log` is unchanged. Exact identifiers and bundler formatting can vary with the input and tool versions.

The function and parameter names use Codefend's `l_` naming convention. Keep the module's imports consistent with its exports.

## 3. Configure the build

Create `rollup.config.mjs`. The `.mjs` extension allows the configuration to use ES module imports regardless of your project's package type.

```js [rollup.config.mjs]
import { codefend } from "rollup-plugin-codefend";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.cjs",
    format: "cjs",
  },
  plugins: [codefend()],
};
```

The plugin uses its built-in `codeOnly` parser. It accepts `transformation` and `debug` settings; it does not expose a custom parser or a `renderChunk` option. See [Rollup's configuration tutorial](https://rollupjs.org/tutorial/#using-config-files) for the bundler's configuration model.

## 4. Build and execute

```sh
npx rollup --config rollup.config.mjs
node dist/bundle.cjs
```

The result should be:

```text
5
```

Inspect `dist/bundle.cjs` to confirm that the example's `l_` names were replaced. The precise generated names are not part of this example's contract.

## Add this to your workflow

Keep Codefend in your existing Rollup plugin list so the normal build performs the transformation. Merge a build script into `package.json`:

```json
{
  "scripts": {
    "build": "rollup --config rollup.config.mjs"
  }
}
```

For a local or CI build:

```sh
npm ci
npm run build
node dist/bundle.cjs
```

In a real application, run your tests against the generated bundle before publishing or deploying it. Preserve the other Rollup plugins and output settings your project needs. No separate global Codefend CLI step is required for this plugin workflow.

## Preserve your external contracts

This example builds an application entry point rather than a public library API. For a library, retain exported names that consumers import, or configure intentional names to be ignored. The same applies to properties supplied by external services or third-party libraries.

The empty pool uses Codefend's default generated names. Custom fixed pools have known allocation limitations across successive modules, so test a complete multi-module build before using them. The plugin also does not provide a corresponding map for its text replacements; validate source-map requirements separately.

For a Vite application, use the [Vite example](./vite), which applies the adapter only during builds.
