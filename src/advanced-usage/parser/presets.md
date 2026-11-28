---
title: Parser presets
description: Choose a Codefend parser preset and use startWithMAndUnderscore for explicit, narrower selection of application-owned names.
---

# Parser presets

A preset selects a built-in naming rule without requiring a custom regular expression. For new CLI projects, we recommend `startWithMAndUnderscore` when you can mark the internal names you control with `m_`.

This convention gives you narrower selection than `codeOnly`: `m_total` is selected, while unrelated underscore names such as `external_value` and Arduino's `LED_BUILTIN` are left alone. It helps reduce unintended renaming while keeping the source readable.

## Recommended: startWithMAndUnderscore

Requires **Codefend 3.3.0 or later**. Add this fragment to `.codefendrc.json`:

```json
{
  "parser": {
    "name": "startWithMAndUnderscore"
  }
}
```

Use the exact spelling shown above. The preset and its regex rule have the same name. The rule is case-sensitive:

```js
/\bm_[A-Za-z][A-Za-z0-9]*\b/g;
```

After `m_`, the name must start with an ASCII letter, followed by letters or digits. Additional underscores are excluded.

| Name                                       | Selected? | Reason                                                        |
| ------------------------------------------ | --------- | ------------------------------------------------------------- |
| `m_total`, `m_Total`, `m_value2`           | Yes       | Lowercase `m_`, then a letter and optional letters or digits. |
| `m_2total`                                 | No        | The first character after `m_` is a digit.                    |
| `M_total`                                  | No        | The prefix must be lowercase `m_`.                            |
| `m_total_amount`                           | No        | The suffix contains another underscore.                       |
| `am_total`                                 | No        | `m_` does not start at a word boundary.                       |
| `l_total`, `external_value`, `LED_BUILTIN` | No        | These names do not use the selected prefix.                   |

The [CLI language examples](/examples/list) use this preset. To prepare an existing project, use the [AI migration guide](/basic-usage/naming-conventions/ai-assisted-migration) to rename application-owned symbols and update their callers together.

## Other presets

| Preset     | When to use it                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`  | Select the broader underscore code-name rule and the hyphenated file-name rule together. This remains the generated configuration's default.                  |
| `codeOnly` | Keep an existing broad underscore convention, including names such as `l_total`, `f_readSensor`, and `c_User`. It can also select unrelated underscore names. |
| `fileOnly` | Select hyphenated names beginning with `pkg`, `cmp`, `lib`, `file`, `folder`, `module`, `style`, or `main`.                                                   |
| `Parser_A` | Compatibility alias for `default`; use `default` in new configurations.                                                                                       |

Choose a [custom parser](custom-naming-convention) when your naming rule differs from these presets. Supplying `regexList` alongside a preset name does not change that preset's rules.

## What the preset controls

The parser selects text; it does not infer whether a symbol is private, public, a member, or a local variable. Only mark names whose consumers you control. Matching text in strings, comments, and paths can also change.

The core CLI's generation workflow can also rename copied folders and files marked with `m_`; see [folder and file naming conventions](/basic-usage/naming-conventions/folders-files-naming-convention). Bundler plugins transform contents and leave output naming to the bundler; they do not provide that CLI copying/renaming step.

The expression uses ASCII word boundaries, rather than a language's full identifier grammar. For example, it can select the `m_total` portion of `$m_total`; whether that is appropriate depends on the source language. Keep external interfaces stable and test the generated program. Pool allocation and replacement-name collisions remain separate concerns; see [troubleshooting](/distribution/troubleshooting).

## Bundler plugins

From version 3.3.0, the Vite, Rollup, Webpack, and esbuild plugins accept `parser.name` with either `codeOnly` or `startWithMAndUnderscore`. We recommend `startWithMAndUnderscore` for new projects using explicit `m_` names. Omitting `parser`, supplying `parser: {}`, or selecting `codeOnly` retains the existing broader selection.

Pass the same `parser` object shown above in the plugin options. Custom regex lists and the other core presets are not exposed through these plugins. See the [Vite](/examples/vite), [Rollup](/examples/rollup), [Webpack](/examples/webpack), and [esbuild](/examples/esbuild) guides for complete configurations.
