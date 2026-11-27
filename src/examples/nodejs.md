---
title: Node.js source obfuscation with Codefend
description: Run a small Node.js CommonJS program before and after Codefend obfuscation, using a separate source folder and stable filenames.
---

# Obfuscate a Node.js program

This example uses Codefend's CLI to rename identifiers in a small CommonJS program. Node.js runs on your computer; Codefend produces another source file for Node.js to execute.

Use Node.js 18 or later for Codefend. This is the core package's runtime requirement; documentation tooling and bundlers can require newer Node.js versions.

## 1. Create the source

Start in a new project directory:

```sh
npm init -y
npm install --save-dev codefend
```

Create `source/index.cjs`:

<<< @/resources/nodejs/standalone/source/index.cjs{js}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/nodejs/standalone/obfuscated/index.cjs{js}

The program should still print `Hello, Ada Lovelace!`. Generated names can change with the source or Codefend version.

The `l_` convention marks the identifiers we own. `console.log` is a Node.js API and stays unchanged. The `.cjs` extension keeps the example's CommonJS format explicit.

## 2. Configure a separate output

Create `.codefendrc.json` in the project root, alongside `source`:

<<< @/resources/nodejs/standalone/codefend.config.json

`codeOnly` selects the underscore naming rule and also applies to paths. The plain `index.cjs` filename does not match that rule, so this example preserves it. The default empty pool uses generated prefix-and-sequence names. `release` is a disposable sibling of `source`: it must contain no original files or other valuable data because Codefend removes an existing output directory before writing.

## 3. Compare the result

Run these commands from the project root:

```sh
node source/index.cjs
npx codefend --obfuscate
node release/index.cjs
```

Both executions should print:

```text
Hello, Ada Lovelace!
```

The output remains named `index.cjs`; its selected identifiers change. Treat generated identifier numbers as implementation details, rather than an API contract.

For a larger application, verify imports, public exports, string-key references, and runtime behavior. Keep binary assets outside a CLI input tree: current Codefend reads copied files as text. See [troubleshooting](/distribution/troubleshooting), or use the [Vite](/examples/vite), [esbuild](/examples/esbuild), [Rollup](/examples/rollup), or [Webpack](/examples/webpack) adapter for a bundler-based project.

## Add Codefend to your workflow

Add an npm script to the existing project so local development and CI use the same installed version:

```json
{
  "scripts": {
    "obfuscate": "codefend --obfuscate",
    "start:generated": "node release/index.cjs"
  }
}
```

Run `npm run obfuscate`, then test the generated program before packaging it. In CI, install locked dependencies with `npm ci` and run the same script. For an application that compiles or bundles source, place obfuscation at the appropriate build step and run the tests against the generated result. See [build and deployment](/distribution/build-and-deployment).
