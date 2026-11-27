---
title: Adopt Codefend naming conventions with AI
description: Copy a migration prompt for an AI coding assistant to rename internal variables, functions, and classes for Codefend while preserving behavior and external interfaces.
---

# Adopt Codefend naming conventions with AI

Use an AI coding assistant with access to your repository to prepare an existing project for Codefend. The migration gives internal names readable prefixes such as `l_total` and `f_calculateTotal`; Codefend later replaces selected names when you generate or build the distributed code.

Paste the prompt below into your coding assistant. You can narrow its scope to a module or feature before running it on a larger project. Review the resulting changes and test the actual Codefend output.

## Copyable migration prompt

```text
Migrate this project's internal source names to Codefend naming conventions while preserving program behavior.

Inspect the repository instructions, language, frameworks, build/test commands, and any existing Codefend configuration first. Work in small, coherent batches using the project's existing tools.

Use these readable prefixes for names whose declarations and references we control:
- c_ for classes, such as c_Calculator.
- f_ for functions and methods, such as f_calculateTotal.
- p_ for parameters, such as p_order.
- l_ for local variables, such as l_total.
- m_ for internal members, such as m_balance.

Keep the rest of each name descriptive. Preserve language-specific casing, visibility, and reserved-name rules. Leave names unchanged when a prefix would break language or framework semantics, including JSX component capitalization, Go export casing, or Python special methods. If the configured replacement names would change those semantics, report the incompatibility.

Rename only application-owned symbols whose consumers are inside the same transformed project. Preserve public APIs, library/framework interfaces, entry points, overrides, serialized fields, database keys, environment variables, routes, selectors, and names used through reflection or external string lookups. For internal module exports, rename them only when every importer is controlled by this build and all references can be updated together.

Use syntax-aware symbol refactoring rather than blind text replacement. Update all references, imports, exports, relevant tests, and supported template bindings together. Expand shorthand properties or destructuring where needed to preserve external keys: { userId } may need to become { userId: l_userId }. Do not rename files or folders as part of this source-name migration. Keep dependencies and generated/vendor files outside the editing scope.

Check the actual Codefend selection rules. The built-in codeOnly parser matches broad underscore names, not just the prefixes above. Existing names in strings, comments, and paths may also be selected, and replacement is case-insensitive and can affect substrings. Audit external names and possible collisions. Use transformation.ignore where appropriate, but verify the generated result rather than assuming an ignore entry solves every collision.

Honor the project's existing Codefend configuration. The Vite, Rollup, Webpack, and esbuild plugins expose transformation and debug options; do not pass CLI parser or generation settings to them. If Codefend is not configured, report the appropriate CLI or plugin setup and any names that need preserving.

Run the relevant existing checks before and after renaming. Then, if Codefend is configured, use the established generation or production-build workflow with disposable output and test that generated program or bundle. Check application behavior and external interfaces, not only whether the build succeeds. If a check cannot run or was already failing, report that accurately.

Keep the maintained source readable with these prefixes; do not replace it with generated Ox0-style names. Report the changed scope, representative old-to-new names, names deliberately preserved and why, any configuration changes, commands run and their results, and remaining limitations.
```

## What migrated code looks like

Before migration:

```js
function calculateTotal(order) {
  const total = order.unitPrice * order.quantity;
  return { total };
}

console.log(calculateTotal({ unitPrice: 5, quantity: 2 }).total);
```

After applying the source naming convention:

```js
function f_calculateTotal(p_order) {
  const l_total = p_order.unitPrice * p_order.quantity;
  return { total: l_total };
}

console.log(f_calculateTotal({ unitPrice: 5, quantity: 2 }).total);
```

Both versions print `10`. The function, parameter, and local variable are renamed together. The input keys `unitPrice` and `quantity`, and the returned key `total`, remain stable. This example assumes the function and its caller are internal to the same project.

## Check the generated result

An AI refactor prepares source names; it does not establish that every selected name can be obfuscated safely. Review the actual generated code for public names, case differences, substring collisions, and shared references. A project can still contain underscore names that were present before migration and are selected by the built-in parser.

The CLI supports [custom parser rules](/advanced-usage/parser/custom-naming-convention) when the built-in selection is too broad. Bundler plugins use the built-in `codeOnly` parser and share `transformation` and `debug` options; custom parser configuration is not exposed through those plugins. `transformation.ignore` preserves words during transformation; it does not exclude source files or dependency directories.

Follow the [code naming convention](./code-naming-convention) and [configuration reference](/references/configuration) for the exact rules. The [examples](/examples/list), [build and deployment guide](/distribution/build-and-deployment), and [troubleshooting guide](/distribution/troubleshooting) show how to inspect and verify the generated application.
