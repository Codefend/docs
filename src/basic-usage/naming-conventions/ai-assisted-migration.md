---
title: Adopt Codefend naming conventions with AI
description: Copy a migration prompt for an AI coding assistant to rename internal variables, functions, and classes for Codefend while preserving behavior and external interfaces.
---

# Adopt Codefend naming conventions with AI

Use an AI coding assistant with access to your repository to prepare an existing project for Codefend. We recommend the `m_` convention with the [`startWithMAndUnderscore` preset](/advanced-usage/parser/presets) in Codefend 3.3.0 or later. Internal names such as `m_total` and `m_calculateTotal` stay readable in source; Codefend replaces them in generated code.

## Preferred parser and naming convention

For a CLI project adopting this convention, prefer `startWithMAndUnderscore` over `default`. The default combines broad underscore-name matching with hyphenated file-name matching. The narrower preset selects explicit `m_` names, helping leave unrelated names such as `external_value`, `LED_BUILTIN`, and `file-sensor` alone.

Select it explicitly in `.codefendrc.json`; generating a configuration still selects `default`:

```json
{
  "parser": {
    "name": "startWithMAndUnderscore"
  }
}
```

Use the same `m_` prefix for application-owned symbols whose callers you control:

| Role               | Before           | After              |
| ------------------ | ---------------- | ------------------ |
| Class              | `Calculator`     | `m_Calculator`     |
| Function or method | `calculateTotal` | `m_calculateTotal` |
| Parameter          | `order`          | `m_order`          |
| Local variable     | `total`          | `m_total`          |
| Member             | `balance`        | `m_balance`        |

Start the suffix with an ASCII letter, then use letters or digits. For multiple words, use names such as `m_totalAmount`; additional underscores such as `m_total_amount` are excluded. The prefix marks selection and does not determine visibility or ownership.

## Ask an AI assistant to migrate

Paste the prompt below into your coding assistant. You can narrow its scope to a module or feature before running it on a larger project. Review the resulting changes and test the actual Codefend output.

## Copyable migration prompt

```text
Migrate this project's internal source names to Codefend naming conventions while preserving program behavior.

Inspect the repository instructions, language, frameworks, build/test commands, and any existing Codefend configuration first. Work in small, coherent batches using the project's existing tools.

For this m_ migration with Codefend 3.3.0 or later, prefer parser.name: "startWithMAndUnderscore" over "default" in CLI configuration. With version 3.3.0 or later of a bundler plugin, select the same preset through parser.name instead of its default codeOnly selection. Select the preset directly, without a custom regexList. The default parser selects broader underscore names and hyphenated file names; the new preset narrows selection to explicitly marked m_ names, reducing unintended changes to unrelated library names, external fields, or paths. Explain any existing requirement for broader path selection before changing an approved configuration.

Use m_ for application-owned names whose declarations and references we control, regardless of whether they are classes, functions, parameters, locals, or members. Examples: m_Calculator, m_calculateTotal, m_order, m_total, and m_balance.

For the startWithMAndUnderscore preset, start the suffix with an ASCII letter and use only letters or digits after it. For example, m_Total and m_value2 are selected; m_2total, M_total, and m_total_amount are excluded. The m_ prefix marks selection; it does not imply that a name is a member or private.

Use camelCase or PascalCase after m_ for multiple words, such as m_totalAmount and m_OrderSummary. Use m_ consistently instead of role-based c_, f_, p_, or l_ prefixes when adopting this preset, because those other prefixes are not selected.

Keep the rest of each name descriptive. Preserve language-specific casing, visibility, and reserved-name rules. Leave names unchanged when a prefix would break language or framework semantics, including JSX component capitalization, Go export casing, or Python special methods. If the configured replacement names would change those semantics, report the incompatibility.

Rename only application-owned symbols whose consumers are inside the same transformed project. Preserve public APIs, library/framework interfaces, entry points, overrides, serialized fields, database keys, environment variables, routes, selectors, and names used through reflection or external string lookups. For internal module exports, rename them only when every importer is controlled by this build and all references can be updated together.

Use syntax-aware symbol refactoring rather than blind text replacement. Update all references, imports, exports, relevant tests, and supported template bindings together. Expand shorthand properties or destructuring where needed to preserve external keys: { userId } may need to become { userId: m_userId }. Do not rename files or folders as part of this source-name migration. Keep dependencies and generated/vendor files outside the editing scope.

Check the installed Codefend version and actual selection rules. Honor an existing approved configuration; explain any proposed parser change. Matching text in strings, comments, and paths can also be selected. From 3.3.0, automatic replacement respects the parser's exact occurrences and casing. Audit external names, generated-name collisions, and pool behavior. Use transformation.ignore where appropriate and verify the generated result.

Honor the project's existing Codefend configuration. Version 3.3.0 or later of the Vite, Rollup, Webpack, and esbuild plugins exposes parser.name, transformation, and debug options. Their parser.name accepts only codeOnly or startWithMAndUnderscore; omit it to retain codeOnly. Do not pass CLI generation settings, custom regexList, or other core parser names to them. If Codefend is not configured, report the appropriate CLI or plugin setup and any names that need preserving.

Run the relevant existing checks before and after renaming. Then, if Codefend is configured, use the established generation or production-build workflow with disposable output and test that generated program or bundle. Check application behavior and external interfaces, not only whether the build succeeds. If a check cannot run or was already failing, report that accurately.

Keep the maintained source readable with this m_ convention; do not replace it with generated Ox0-style names. Report the changed scope, representative old-to-new names, names deliberately preserved and why, any configuration changes, commands run and their results, and remaining limitations.
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

After running Codefend with the `startWithMAndUnderscore` configuration above, a fresh runtime using the default `Ox` replacement prefix produces:

```js
function Ox0(Ox1) {
  const Ox2 = Ox1.unitPrice * Ox1.quantity;
  return { total: Ox2 };
}

console.log(Ox0({ unitPrice: 5, quantity: 2 }).total);
```

All three versions print `10`, and the external data keys stay unchanged. Keep the readable `m_` version as maintained source; Codefend creates the `Ox...` names in generated output. Exact generated identifiers can vary with the configuration and processing order.

## Check the generated result

An AI refactor prepares source names; it does not establish that every selected name can be obfuscated safely. Review generated code for public names, collisions, matching strings, and shared references. The `m_` preset reduces selection of unrelated underscore names; it does not determine which APIs or data keys are external.

The CLI supports [parser presets](/advanced-usage/parser/presets) and [custom rules](/advanced-usage/parser/custom-naming-convention). Plugin versions 3.3.0 and later accept `parser.name`, `transformation`, and `debug` options. Select `startWithMAndUnderscore` for the recommended narrower convention, or `codeOnly` for broader underscore matching. Omitted parser settings retain `codeOnly`. `transformation.ignore` preserves words during transformation; it does not exclude source files or dependency directories.

Follow the [code naming convention](./code-naming-convention) and [configuration reference](/references/configuration) for the exact rules. The [examples](/examples/list), [build and deployment guide](/distribution/build-and-deployment), and [troubleshooting guide](/distribution/troubleshooting) show how to inspect and verify the generated application.
