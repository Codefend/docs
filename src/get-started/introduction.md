# Codefend

Codefend renames selected words in source text and file paths using a naming convention. Its CLI creates a generated source directory that you can inspect, test, and build. [Vite](https://www.npmjs.com/package/vite-plugin-codefend), [Rollup](https://www.npmjs.com/package/rollup-plugin-codefend), and [Webpack](https://www.npmjs.com/package/webpack-plugin-codefend) plugins integrate the same engine into JavaScript builds.

You choose which names to mark, such as `l_temperature` or `f_calculateTotal`. Codefend replaces matching names with a configured prefix, explicit replacements, or words from a pool. The engine uses regular expressions rather than a language-specific syntax tree, so the same conventions can be applied to different text-based languages.

## Where to start

- [Install Codefend](installation) and understand [how it works](how-it-works).
- [Adopt naming conventions with AI](/basic-usage/naming-conventions/ai-assisted-migration) in an existing project using a copyable migration prompt.
- Try the [Node.js example](/examples/nodejs) for source generation.
- Follow the [Arduino example](/examples/arduino) for a sketch workflow.
- Integrate it with [Vite](/examples/vite), [Rollup](/examples/rollup), or [Webpack](/examples/webpack).

## What obfuscation provides

Renaming can make source code less readable and can be combined with your normal compiler, minifier, or other build tools. It does not encrypt source code, firmware, or network traffic. It cannot guarantee that a program cannot be understood or reverse engineered, and it does not hide secrets embedded in distributed code.

Because matching operates on text, it can affect strings, comments, public property names, and paths as well as identifiers. Keep external interfaces stable and test the generated program. The [troubleshooting guide](/distribution/troubleshooting) describes current limitations and checks to perform before distribution.
