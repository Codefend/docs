---
title: R source obfuscation
description: Use Codefend with R to rename application-owned names, preserve external contracts, and compare the original and generated result.
---

# R source obfuscation

Obfuscate a small R calculation while preserving the built-in `sum`, `c`, and `cat` functions. The script prints the total of three values.

Install R with the `Rscript` command and [Node.js/Codefend](/get-started/installation).

## 1. Create the source

In a new project directory, install Codefend:

```sh
npm install --global codefend
```

Create `source/main.R`:

<<< @/resources/languages/r/source/main.R{r}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/r/obfuscated/main.R{r}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

The `l_` names belong to this example. Public output and external API names remain unchanged.

## 2. Configure selected names

Create `.codefendrc.json` alongside the `source` directory:

<<< @/resources/languages/r/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom rule selects the example's application names. The lowercase `ox` prefix produces names such as `ox0`; the default empty pool avoids a limited replacement dictionary. The plain `main.R` filename does not match this rule.

`release` must be a disposable sibling of `source`. Codefend removes existing output before generation. Keep this input text-only, with build products and dependencies outside it.

## 3. Compare original and generated output

Run from the project root:

```sh
Rscript source/main.R
codefend --obfuscate
Rscript release/main.R
```

Both executions should print:

```text
42
```

See [Rscript reference](https://stat.ethz.ch/R-manual/R-devel/library/utils/html/Rscript.html) for the language's execution model.

## Preserve external names

R uses names in named arguments, formulas, data-frame columns, and non-standard evaluation. Keep those external contracts stable, including names used with `get`, `assign`, or package exports. This example only renames a private helper, its parameter, and a local result.

Codefend matches and replaces text, including text in strings or comments. A custom discovery rule does not provide syntax-aware renaming or eliminate core's current boundary/case limitations. See [troubleshooting](/distribution/troubleshooting) before applying the convention to a larger project.

Browse the other [language and build examples](/examples/list).

## Add Codefend to your workflow

Generate the source before your R validation or reporting job, then execute the generated script and its tests. Keep package installation, datasets, and report artifacts outside the processed source directory.

```sh
codefend --obfuscate
Rscript release/main.R
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
