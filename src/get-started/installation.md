# Installation

Codefend requires Node.js `18.0.0` or newer on your development computer, including when you process another language. It produces source files; it does not add a Node.js runtime to your C#, Python, or Arduino program.

## Choose an installation

| Your project                                                                  | Recommended approach                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Arduino, C#, C/C++, Python, Java, or another project without npm dependencies | Install the Codefend CLI globally once and use `codefend`.                                    |
| A Node.js or TypeScript project                                               | Install Codefend locally as a development dependency and use `npx codefend` or an npm script. |
| A Vite, esbuild, Rollup, or Webpack build                                     | Install the corresponding plugin locally in that project.                                     |

### Other languages: install globally

For a standalone Arduino sketch, C# application, Python script, or similar project:

```sh
npm install --global codefend
codefend --version
```

The command is available across your projects. You do not need to create `package.json` or `package-lock.json` just to run Codefend there.

After creating your configuration, run from the directory containing `.codefendrc.json`:

```sh
codefend --obfuscate
```

See the [language examples](/examples/list#languages) and [Arduino guide](/examples/arduino) for complete source/configuration workflows.

### Node.js projects: install locally

From an existing Node.js project's root:

```sh
npm install --save-dev codefend
npx codefend --version
```

This records Codefend alongside the project's other development tools. Commit the package manifest and lockfile to share the selected version with your team. For a new npm project, run `npm init -y` first.

Run the local CLI with:

```sh
npx codefend --obfuscate
```

An npm script can call `codefend` directly because npm adds local package executables to its command path:

```json
{
  "scripts": {
    "obfuscate": "codefend --obfuscate"
  }
}
```

Then run `npm run obfuscate`. This is a `package.json` fragment to merge into your existing scripts.

## Existing build and CI workflows

Add obfuscation before compiling, packaging, or distributing the generated source, then run the generated program's tests. For a repeatable CI setup, even a non-Node.js project can choose a local development dependency and lockfile, install it with `npm ci`, and run `npx codefend --obfuscate`.

For bundler integrations, install the corresponding plugin locally so the build configuration can import it:

| Bundler | Plugin | Setup guide |
| ------- | ------ | ----------- |
| Vite | [vite-plugin-codefend](https://www.npmjs.com/package/vite-plugin-codefend) | [Vite guide](/examples/vite) |
| esbuild | [esbuild-plugin-codefend](https://www.npmjs.com/package/esbuild-plugin-codefend) | [esbuild guide](/examples/esbuild) |
| Rollup | [rollup-plugin-codefend](https://www.npmjs.com/package/rollup-plugin-codefend) | [Rollup guide](/examples/rollup) |
| Webpack | [webpack-plugin-codefend](https://www.npmjs.com/package/webpack-plugin-codefend) | [Webpack guide](/examples/webpack) |

Your bundler may require newer Node.js versions independently of Codefend. Use an actively maintained Node.js release for development. Contributors running this documentation site's tools need Node.js `22.18.0` or newer; that is separate from Codefend's runtime requirement.
