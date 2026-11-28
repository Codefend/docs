---
title: Adopt Codefend naming conventions with AI
description: Copy a migration prompt for an AI coding assistant to rename internal variables, functions, and classes for Codefend while preserving behavior and external interfaces.
---

# Adopt Codefend naming conventions with AI

Use an AI coding assistant with access to your repository to prepare an existing project for Codefend. We recommend the `m_` convention with the [`startWithMAndUnderscore` preset](/advanced-usage/parser/presets) in Codefend 3.3.0 or later. Internal names such as `m_total` and `m_calculateTotal` stay readable in source; Codefend replaces them in generated code.

Paste the prompt below into your coding assistant. You can narrow its scope to a module or feature before running it on a larger project. Review the resulting changes and test the actual Codefend output.

## Copyable migration prompt

```text
Migrate this project's internal source names to Codefend naming conventions while preserving program behavior.

Inspect the repository instructions, language, frameworks, build/test commands, and any existing Codefend configuration first. Work in small, coherent batches using the project's existing tools.

Use m_ for application-owned names whose declarations and references we control, regardless of whether they are classes, functions, parameters, locals, or members. Examples: m_Calculator, m_calculateTotal, m_order, m_total, and m_balance.

For the startWithMAndUnderscore preset, start the suffix with an ASCII letter and use only letters or digits after it. For example, m_Total and m_value2 are selected; m_2total, M_total, and m_total_amount are excluded. The m_ prefix marks selection; it does not imply that a name is a member or private.

Keep the rest of each name descriptive. Preserve language-specific casing, visibility, and reserved-name rules. Leave names unchanged when a prefix would break language or framework semantics, including JSX component capitalization, Go export casing, or Python special methods. If the configured replacement names would change those semantics, report the incompatibility.

Rename only application-owned symbols whose consumers are inside the same transformed project. Preserve public APIs, library/framework interfaces, entry points, overrides, serialized fields, database keys, environment variables, routes, selectors, and names used through reflection or external string lookups. For internal module exports, rename them only when every importer is controlled by this build and all references can be updated together.

Use syntax-aware symbol refactoring rather than blind text replacement. Update all references, imports, exports, relevant tests, and supported template bindings together. Expand shorthand properties or destructuring where needed to preserve external keys: { userId } may need to become { userId: m_userId }. Do not rename files or folders as part of this source-name migration. Keep dependencies and generated/vendor files outside the editing scope.

Check the installed Codefend version and actual selection rules. For a new CLI workflow on 3.3.0 or later, prefer parser.name: "startWithMAndUnderscore". Honor an existing approved configuration; explain any proposed parser change. Matching text in strings, comments, and paths can also be selected. From 3.3.0, automatic replacement respects the parser's exact occurrences and casing. Audit external names, generated-name collisions, and pool behavior. Use transformation.ignore where appropriate and verify the generated result.

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
function m_calculateTotal(m_order) {
  const m_total = m_order.unitPrice * m_order.quantity;
  return { total: m_total };
}

console.log(m_calculateTotal({ unitPrice: 5, quantity: 2 }).total);
```

Both versions print `10`. The function, parameter, and local variable are renamed together. The input keys `unitPrice` and `quantity`, and the returned key `total`, remain stable. This example assumes the function and its caller are internal to the same project.

## Check the generated result

An AI refactor prepares source names; it does not establish that every selected name can be obfuscated safely. Review generated code for public names, collisions, matching strings, and shared references. The `m_` preset reduces selection of unrelated underscore names; it does not determine which APIs or data keys are external.

The CLI supports [parser presets](/advanced-usage/parser/presets) and [custom rules](/advanced-usage/parser/custom-naming-convention). Bundler plugins currently use `codeOnly`, which selects `m_` names and other underscore patterns. They accept `transformation` and `debug` options, without exposing parser selection. `transformation.ignore` preserves words during transformation; it does not exclude source files or dependency directories.

Follow the [code naming convention](./code-naming-convention) and [configuration reference](/references/configuration) for the exact rules. The [examples](/examples/list), [build and deployment guide](/distribution/build-and-deployment), and [troubleshooting guide](/distribution/troubleshooting) show how to inspect and verify the generated application.
