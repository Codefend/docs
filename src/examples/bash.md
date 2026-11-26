---
title: Bash source obfuscation
description: Use Codefend with Bash to rename application-owned names, preserve external contracts, and compare the original and generated result.
---

# Bash source obfuscation

Rename a script-local Bash function and its local variables. The script totals three arguments and prints the result without changing shell built-ins.

Use Bash and [Node.js/Codefend](/get-started/installation). On Windows, use a Bash environment such as Git Bash; run the commands from the same project directory.

## 1. Create the source

In a new project directory, install Codefend:

```sh
npm install --global codefend
```

Create `source/main.sh`:

<<< @/resources/languages/bash/source/main.sh{bash}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/bash/obfuscated/main.sh{bash}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

The `l_` names belong to this example. Public output and external API names remain unchanged.

## 2. Configure selected names

Create `.codefendrc.json` alongside the `source` directory:

<<< @/resources/languages/bash/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom rule selects the example's application names. The lowercase `ox` prefix produces names such as `ox0`; the default empty pool avoids a limited replacement dictionary. The plain `main.sh` filename does not match this rule.

`release` must be a disposable sibling of `source`. Codefend removes existing output before generation. Keep this input text-only, with build products and dependencies outside it.

## 3. Compare original and generated output

Run from the project root:

```sh
bash source/main.sh
codefend --obfuscate
bash release/main.sh
```

Both executions should print:

```text
42
```

See [Bash shell functions](https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html) for the language's execution model.

## Preserve external names

Bash variable and function names are case-sensitive. Preserve exported environment variables, command names, command-line option names, and functions sourced by other scripts. Dynamic names used with `eval` or indirect expansion need additional checks. This script is for Bash, not every shell.

Codefend matches and replaces text, including text in strings or comments. A custom discovery rule does not provide syntax-aware renaming or eliminate core's current boundary/case limitations. See [troubleshooting](/distribution/troubleshooting) before applying the convention to a larger project.

Browse the other [language and build examples](/examples/list).

## Add Codefend to your workflow

Add source generation before your script checks or packaging step. Run the generated script through Bash syntax checking, then run your script tests against the generated files.

```sh
codefend --obfuscate
bash -n release/main.sh
bash release/main.sh
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
