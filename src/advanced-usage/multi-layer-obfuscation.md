---
title: Add a second layer of obfuscation
description: Use Codefend alongside an existing uglifier or obfuscator, understand how the layers work, and test the complete build.
---

# Multi-layer obfuscation

You can add Codefend to a build that already uses an uglifier or another obfuscator. Keep your existing tools and use Codefend as an extra step.

## Use Codefend with your existing uglifier

Codefend replaces the names you select. Your JavaScript uglifier can then apply its own renaming and other changes to that code.

```text
Original source → Codefend → Your uglifier or obfuscator → Final output
```

This gives you two layers when both tools change names or otherwise obfuscate the code. Removing spaces alone makes a file smaller; it does not add another layer of name changes. Tools such as [Terser](https://github.com/terser/terser#command-line-usage) and [UglifyJS](https://github.com/mishoo/UglifyJS#usage) have separate options for compression and name mangling.

For a CLI workflow, generate the source first, then point your normal build at the generated directory. For a bundler project, keep the Codefend plugin in your existing configuration. The [Vite](/examples/vite), [esbuild](/examples/esbuild), [Rollup](/examples/rollup), and [Webpack](/examples/webpack) guides show where it runs. Check the order of your plugins and minifier before adding another step.

Use tools that support your language and target. A JavaScript uglifier does not process an Arduino C++ sketch; compile that sketch with its normal toolchain.

## Obfuscation inside obfuscation

The second tool receives code that Codefend has already changed. It can rename or transform that result again. You can include both steps in the same build script or CI workflow.

Running Codefend twice does not automatically add another layer. For example, its default output names, such as `Ox0`, do not match the original underscore naming rule. A second pass with the same rule may leave them unchanged.

## Test the complete build

1. Keep the original source and use a separate generated directory for the CLI.
2. Run Codefend and check that the generated program works.
3. Run your existing build tools on that result.
4. Test the final output, including public APIs, shared names, and file paths.

Extra layers can make code harder to read and debug. They do not encrypt it or guarantee that it cannot be reverse engineered. Check source maps and error reporting before you distribute the build. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
