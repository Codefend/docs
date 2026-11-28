---
title: Lua source obfuscation
description: Use Codefend with Lua to rename application-owned names, preserve external contracts, and compare the original and generated result.
---

# Lua source obfuscation

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

Rename private locals and a local helper in a Lua script. The helper totals three values; the standard `ipairs` and `print` functions remain unchanged.

Install a Lua interpreter (this example uses Lua 5.4 syntax) and [Node.js/Codefend](/get-started/installation).

## 1. Create the source

In a new project directory, install Codefend:

```sh
npm install --global codefend
```

Create `source/main.lua`:

<<< @/resources/languages/lua/source/main.lua{lua}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/lua/obfuscated/main.lua{lua}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

The `m_` names belong to this example. Public output and external API names remain unchanged.

## 2. Configure selected names

Create `.codefendrc.json` alongside the `source` directory:

<<< @/resources/languages/lua/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

The lowercase `ox` prefix produces names such as `ox0`; the default empty pool avoids a limited replacement dictionary. The plain `main.lua` filename does not match this rule.

`release` must be a disposable sibling of `source`. Codefend removes existing output before generation. Keep this input text-only, with build products and dependencies outside it.

## 3. Compare original and generated output

Run from the project root:

```sh
lua source/main.lua
codefend --obfuscate
lua release/main.lua
```

Both executions should print:

```text
42
```

See [Lua standalone interpreter](https://www.lua.org/manual/5.4/manual.html#7) for the language's execution model.

## Preserve external names

Keep identifiers passed to a host application, exported module keys, metatable methods such as `__index`, and names accessed through strings stable. Local renaming does not coordinate with host code or another Lua module.

Codefend matches and replaces text, including text in strings or comments. The preset does not infer language syntax, visibility, or external data contracts. See [troubleshooting](/distribution/troubleshooting) before applying the convention to a larger project.

Browse the other [language and build examples](/examples/list).

## Add Codefend to your workflow

Run Codefend before bundling your Lua scripts with their host application. Execute tests using the generated scripts, including host callbacks and module interfaces, before assembling the distributable files.

```sh
codefend --obfuscate
lua release/main.lua
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
