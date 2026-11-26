# How Codefend works

## 1. Find matching text

A [parser](/advanced-usage/parser/overview) is a list of regular expressions. The built-in rules find underscore names such as `l_temperature` and certain hyphenated paths such as `file-sensor`.

Matching is textual: Codefend does not resolve variable scope, distinguish a class member from a local variable, or restrict matches to executable code. The same text in a string or comment can be selected.

## 2. Assign replacement names

The [transformation settings](/advanced-usage/transformation/list) choose what each selected word becomes. The default uses `Ox` followed by an index. For a fresh runtime processing this snippet alone:

```js
const l_value = 7;
console.log(l_value);
```

the output is:

```js
const Ox0 = 7;
console.log(Ox0);
```

The exact numbering in a larger project depends on the words processed. Use the mapping statistics and generated output when reviewing a build; do not treat these small example numbers as a project-wide naming contract.

## 3. Generate or bundle

The CLI copies the configured input to a generated directory, transforms matching paths, and processes the copied text files. Build and test that generated source with your usual tools.

The [Rollup](/examples/rollup), [Vite](/examples/vite), and [Webpack](/examples/webpack) integrations run during bundling instead. They do not use the CLI's source-directory generation settings.

## Verify the result

Keep public APIs, library names, required entry points, and external data formats compatible. For example, an Arduino sketch must retain `setup()` and `loop()`. Inspect the [Arduino workflow](/examples/arduino) for a concrete example.

Obfuscation changes names; it does not encrypt data or guarantee protection against reverse engineering. Read the [current limitations](/distribution/troubleshooting) before using it on a larger project.
