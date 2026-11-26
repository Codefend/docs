---
title: Build and deployment workflows
description: Add Codefend to an existing build, npm script, or CI workflow. Generate source, test the result, and deploy with your normal tools.
---

# Build, test, and deploy

Add Codefend to the tools you already use. For a CLI project, generate the source before building it. For a bundler project, let the plugin run during the build.

```text
Your source → Codefend → Build and test → Package or deploy
```

## Choose your setup

| Project                                                 | Where Codefend fits                                                                        |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Arduino, C#, Python, and other projects outside Node.js | Install the CLI globally and run `codefend --obfuscate` before your normal build or tests. |
| Node.js or TypeScript                                   | Install locally and use `npx codefend --obfuscate` or an npm script.                       |
| Vite, Rollup, or Webpack                                | Keep the plugin in your existing configuration and run your usual production build.        |

See [installation](/get-started/installation) for the commands and [examples](/examples/list) for complete projects.

## CLI: generate source before your build

Keep your original code in a text-only `source` directory. Configure a disposable sibling directory such as `release` for generated code. Codefend removes existing output before writing, so that directory must contain only generated files. Keep binaries, images, dependencies, and compiler output outside the input tree.

Run from the directory containing `.codefendrc.json`. Choose the command that matches your installation:

::: code-group

```sh [Global CLI]
codefend --obfuscate
```

```sh [Local CLI]
npx codefend --obfuscate
```

:::

Then point your compiler and tests at `release`. Keep your normal dependency installation and compiler settings. An existing build or test command may still read `source`; update its input before using it to check obfuscated code.

For example, the [Arduino guide](/examples/arduino) generates a sketch and compiles that copy:

```sh
codefend --obfuscate
arduino-cli compile --fqbn arduino:avr:uno --output-dir firmware release/PulseBlink
```

The firmware goes outside the source tree. Use the board platform required by your project, and verify the generated sketch before uploading it.

### Add an npm script

For the [Node.js example](/examples/nodejs), merge these scripts into `package.json`:

```json
{
  "scripts": {
    "obfuscate": "codefend --obfuscate",
    "check:generated": "node release/index.cjs"
  }
}
```

Run `npm run obfuscate`, then `npm run check:generated`. Here, the second script runs the small example. In your application, replace it with tests that load the generated code. npm scripts find the locally installed Codefend command automatically.

## Bundlers: keep your existing build

With the plugin configured, Codefend runs as part of the production build. You do not need a separate CLI pass over the same code.

In an npm project with a committed lockfile and a `build` script:

```sh
npm ci
npm run build
```

Test the generated bundle before deploying it. Keep the other framework plugins and settings your project needs. The [Vite](/examples/vite), [Rollup](/examples/rollup), and [Webpack](/examples/webpack) guides show full configurations and workflow examples.

Your existing uglifier or minifier can stay in the build. Check its order and test the final result; see [two layers of obfuscation](/advanced-usage/multi-layer-obfuscation).

## Run the same steps in CI

1. Start from a clean checkout and install the language tools your project needs. Avoid restoring old generated output as a build cache.
2. Install Codefend. For a global CLI setup, use `npm install --global codefend`. For a local npm setup with a committed lockfile, use `npm ci`.
3. Generate the source or run the plugin-enabled build. Configure your CI job to stop when a step fails.
4. Check that this run produced the expected files, then run tests against those files.
5. Package or deploy only the output that passed those checks.

Codefend has partial validation, and some failures can return a successful process status. Do not use that status alone as proof that generation worked. Check fresh output files and program behavior; [troubleshooting](/distribution/troubleshooting) explains the current limits.

## Deploy the tested result

Keep the original code in version control. Distribute the generated source or compiled artifacts your application needs, and let your normal build copy binary assets unchanged.

Review what you publish, including source maps: they can expose code, names, or paths you meant to omit. Test public APIs, file references, and data formats after the complete build. Obfuscation changes readability; it does not encrypt credentials or private keys embedded in an application.
