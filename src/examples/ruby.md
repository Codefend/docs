---
title: Ruby source obfuscation
description: Rename selected Ruby methods and local variables with Codefend using a lowercase replacement prefix, then compare original and generated CLI output.
---

# Obfuscate Ruby source

This example calculates a discounted total using integer arithmetic. It renames a method and local variables owned by the program, while retaining Ruby's language constructs and `puts`.

Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Node.js for Codefend](/get-started/installation). In a new directory:

```sh
npm install --global codefend
```

## 1. Create the source

Create `source/main.rb`:

<<< @/resources/languages/ruby/source/main.rb{ruby}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/ruby/obfuscated/main.rb{ruby}

The program's expected output remains `1800`. Generated identifier numbers can change when the source or Codefend version changes.

The `l_` convention marks the names to transform. This example's arithmetic uses integer cents, so the displayed result does not depend on currency formatting.

## 2. Choose a lowercase prefix

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/ruby/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

**Use the lowercase `ox` prefix here.** Ruby distinguishes ordinary local-variable names from capitalized constant names. The usual `Ox` prefix would not preserve the role of these local variables. See Ruby's [local-variable naming rules](https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Local+Variable+Names).

The default empty pool uses the lowercase prefix and generated sequence. Plain `main.rb` does not match the custom selection rule, so the filename stays unchanged.

Keep `release` as disposable sibling output: Codefend removes its configured output directory before writing. Limit `source` to the application text you intend to transform, keeping dependencies and binary assets elsewhere.

## 3. Run both versions

Run from the project root:

```sh
ruby source/main.rb
codefend --obfuscate
ruby release/main.rb
```

Both should print:

```text
1800
```

Two items at 1,000 cents each, less 10%, produce a total of 1,800 cents.

## Ruby-specific contracts

Preserve class/module constants, framework methods, callbacks, serialized fields, and names used by `send`, symbols, or metaprogramming. Renaming keyword parameters can affect callers. Keep public gem APIs stable and test every caller of a changed method.

The method in this example has positional arguments and all its callers are shown. Codefend's parser does not infer Ruby visibility or understand method lookup: it selects text. A lowercase prefix addresses this example's identifier role; it does not resolve general collisions or replacement boundaries. Read [current limitations](/distribution/troubleshooting) before extending the workflow.

## Add Codefend to your workflow

Place Codefend before Ruby syntax checks and application tests. Run those tests against the generated files, preserving the existing dependency setup and public gem interfaces.

```sh
codefend --obfuscate
ruby -c release/main.rb
ruby release/main.rb
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
