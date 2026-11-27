---
title: TypeScript source obfuscation
description: Obfuscate selected TypeScript identifiers with Codefend, compile both source versions with tsc, and compare their Node.js output using explicit CommonJS files.
---

# Obfuscate TypeScript source

This example applies Codefend to TypeScript before compiling it to JavaScript. The program calculates a discounted order total in integer cents.

Install [Node.js](/get-started/installation), then start in a new directory:

```sh
npm init -y
npm install --save-dev codefend typescript
```

## 1. Add typed application code

Create `source/main.cts`:

<<< @/resources/languages/typescript/source/main.cts{ts}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/typescript/obfuscated/main.cts{ts}

The program's expected output remains `1800`. Generated identifier numbers can change when the source or Codefend version changes.

The `.cts` extension makes the resulting module CommonJS under TypeScript's NodeNext mode, producing `main.cjs`. This keeps the example explicit even if the surrounding package uses ES modules. The `number` types, `Math.trunc`, and `console.log` are retained.

## 2. Configure the source transformation

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/typescript/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom rule selects the `l_` application identifiers. It leaves this example's plain filename unchanged. The default empty pool uses generated prefix-and-sequence names.

Reserve `release` for generated source, separate from `source`. Codefend removes an existing output directory. Keep compiled JavaScript, source maps, declaration files, dependencies, and binary assets outside the processed input.

## 3. Compile and compare

Run these commands from the project root:

```sh
npx tsc source/main.cts --target ES2022 --module NodeNext --outDir build/original
node build/original/main.cjs
npx codefend --obfuscate
npx tsc release/main.cts --target ES2022 --module NodeNext --outDir build/generated
node build/generated/main.cjs
```

Both executions should print:

```text
1800
```

The original and generated TypeScript compile into separate build directories. TypeScript documents [compiling explicit input files](https://www.typescriptlang.org/docs/handbook/compiler-options.html) and [NodeNext module behavior](https://www.typescriptlang.org/tsconfig/module.html).

## Project integration

Keep exported APIs, property keys, framework hooks, decorator metadata, and runtime data formats stable. TypeScript types do not protect a renamed JSON field from breaking a server contract. If you emit declarations for consumers, verify that the published declarations and JavaScript expose the same intended API.

Codefend uses text matching, not the TypeScript symbol table, and it does not provide a source map for its replacements. Compile and run representative generated code; assess debugging/source-map needs separately. For bundler-based projects, see [Vite](/examples/vite), [esbuild](/examples/esbuild), [Rollup](/examples/rollup), or [Webpack](/examples/webpack), and read [current limitations](/distribution/troubleshooting).

## Add Codefend to your workflow

Add generation before TypeScript compilation in your existing npm build script. In CI, install the pinned project dependencies with `npm ci`, compile the generated source, and run tests against that build before packaging JavaScript or declarations.

```sh
npx codefend --obfuscate
npx tsc release/main.cts --target ES2022 --module NodeNext --outDir build/generated
node build/generated/main.cjs
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
