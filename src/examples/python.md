---
title: Python source obfuscation
description: Obfuscate selected Python function and variable names with Codefend, preserve Python entry points, and compare original and generated script output.
---

# Obfuscate Python source

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

This example calculates a discounted order total in integer cents. Codefend renames our function and local identifiers; Python still executes the resulting source.

Install a [Python interpreter](https://www.python.org/downloads/) and [Node.js for Codefend](/get-started/installation). Start in a new directory:

```sh
npm install --global codefend
```

## 1. Add the program

Create `source/main.py`:

<<< @/resources/languages/python/source/main.py{python}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/python/obfuscated/main.py{python}

The program's expected output remains `1800`. Generated identifier numbers can change when the source or Codefend version changes.

Our identifiers use `m_`. Python's `print`, `__name__`, and `"__main__"` stay unchanged. Keep Python's special names and any public package API stable.

## 2. Configure selective renaming

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/python/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

The default empty pool uses generated names with the `Ox` prefix. Plain `main.py` does not match the rule, so its filename stays unchanged.

`release` is disposable sibling output. Codefend removes an existing output directory; keep it separate from original files. Process source text only: keep virtual environments, `__pycache__`, bytecode, native extensions, and other binary assets outside `source`.

## 3. Run both scripts

Run from the project root:

```sh
python3 source/main.py
codefend --obfuscate
python3 release/main.py
```

On Windows, use `py -3` in place of `python3` if that is your installed launcher. Python documents [executing a script by filename](https://docs.python.org/3/using/cmdline.html#interface-options).

Both executions should print:

```text
1800
```

That is two items at 1,000 cents each, with a 10% discount. Compare the output and inspect `release/main.py` to verify that our marked names changed.

## Larger Python applications

Preserve public imports, decorators, framework hooks, serialization fields, and names used through `getattr`, `globals`, or other dynamic lookups. Renaming a function parameter can also affect callers that supply it as a keyword argument. This single-file example controls all callers; larger projects need matching changes and tests across modules.

Matching is textual and can also affect comments and strings. Check external contracts and generated-name collisions. This is source obfuscation, with no guarantee that a distributed Python program or its bytecode cannot be inspected. See [current limitations](/distribution/troubleshooting).

## Add Codefend to your workflow

Run Codefend before your application tests or packaging step, and point those tests at the generated source. Keep your existing virtual environment and dependency installation; confirm imports and dynamic-name references using the generated files.

```sh
codefend --obfuscate
python3 release/main.py
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
