---
title: PHP source obfuscation
description: Use Codefend to rename application-owned PHP functions and variables, preserve PHP APIs and dollar-prefixed variables, and compare CLI program output.
---

# Obfuscate PHP source

This PHP CLI example calculates an order total in integer cents. The application function and local variables are renamed; PHP's own functions and constants remain intact.

Install the [PHP CLI](https://www.php.net/manual/en/features.commandline.php) and [Node.js for Codefend](/get-started/installation). In a new directory, install Codefend:

```sh
npm install --global codefend
```

## 1. Add the program

Create `source/main.php`:

<<< @/resources/languages/php/source/main.php{php}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/php/obfuscated/main.php{php}

The program's expected output remains `1800`. Generated identifier numbers can change when the source or Codefend version changes.

Only names we own use `l_`. The custom rule matches the name after `$` in a variable, leaving the dollar sign in place. `intdiv`, `PHP_EOL`, language keywords, and the PHP opening tag are preserved.

## 2. Configure Codefend

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/php/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

This source-only input and disposable sibling `release` directory keep generated files separate from originals. Codefend removes an existing output directory before generation. The default empty pool uses generated prefix-and-sequence names, and the plain `main.php` path does not match the custom rule.

Keep Composer dependencies, images, sessions, caches, and other unrelated assets outside this input tree. Codefend currently reads copied file contents as text.

## 3. Execute before and after

Run from the project root:

```sh
php source/main.php
codefend --obfuscate
php release/main.php
```

Both versions should print:

```text
1800
```

The result represents two items at 1,000 cents each, less 10%. PHP documents this [CLI execution form](https://www.php.net/manual/en/features.commandline.usage.php).

## Integrating with an application

Preserve public class/method names, framework callbacks, route contracts, autoload paths, and fields used by serializers or templates. Test variable functions, reflection, and string-based method/property access. Named arguments are also part of a callable's external contract: changing a parameter name can affect callers.

This example keeps all function calls together and uses positional arguments. Codefend performs text replacement rather than PHP-aware symbol analysis. Its case and boundary limitations can matter even though PHP treats some kinds of names case-insensitively. Check the [current limitations](/distribution/troubleshooting) and run the generated application's tests before distribution.

## Add Codefend to your workflow

Place Codefend before your PHP validation and packaging steps. Lint the generated source, then run the application tests against that source so the original files do not mask a changed runtime contract.

```sh
codefend --obfuscate
php -l release/main.php
php release/main.php
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
