# Custom naming convention

Use a custom parser when your naming rule differs from the [built-in presets](presets). For the `m_` convention used by the CLI examples, choose `startWithMAndUnderscore` in Codefend 3.3.0 or later; no custom regex is needed.

## Why choose a custom rule?

Suppose an existing project marks its internal names with `app_`. A custom rule lets you keep that convention while excluding unrelated names such as `external_value` or Arduino's `LED_BUILTIN`, which the broader `codeOnly` rule would select.

This example uses the expression:

```js
/\bapp_[A-Za-z][A-Za-z0-9]*\b/g;
```

| Source name                                | Discovered by this custom rule?                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `app_total`, `app_firstName`, `app_value2` | Yes: the names follow the example's `app_` convention.                                          |
| `main`, `setup`, `loop`                    | No: required entry points are not marked.                                                       |
| `LED_BUILTIN`, `external_value`            | No: these names do not start with `app_`.                                                       |
| `app_total_amount`                         | No: this rule allows letters and digits after the first underscore, not additional underscores. |

Mark the names whose callers you control, then inspect their replacements. Prefer a preset when its rule already matches your convention. Custom rules and presets use the same transformation engine.

## Complete configuration

Save the following as `.codefendrc.json` alongside a text-only `source` directory:

```json
{
  "generation": {
    "inputDir": "source",
    "outputDir": "release"
  },
  "parser": {
    "name": "custom",
    "regexList": [
      {
        "name": "appOwnedNames",
        "value": "\\bapp_[A-Za-z][A-Za-z0-9]*\\b"
      }
    ]
  }
}
```

Keep `release` as disposable sibling output. Codefend removes existing output before generation; follow the [output-directory guidance](/basic-usage/obfuscation).

The doubled backslashes are JSON escaping. Write a regex-source string without `/` delimiters or flags; Codefend compiles it with `g`. The regex item's `name` is a label, not a different parser implementation. A built-in parser name selects its built-in rules even if you also supply `regexList`.

The parser chooses which names to discover. Transformation settings choose the replacement names. The defaults generate names such as `Ox0`; the [Ruby](/examples/ruby) and [Go](/examples/go) guides use a lowercase prefix to preserve their naming rules.

## Understand the limits

This is a text convention, not a syntax-aware member or private-variable parser. Marking a public name with `app_` also makes it eligible. The expression can discover matching text in strings, comments, and paths, and its ASCII naming rule does not describe every language's identifier grammar.

From Codefend 3.3.0, automatic replacement uses the exact occurrences matched by the selected parser. A match for `app_total` does not by itself select the substring in `my_app_total` or a differently cased `APP_TOTAL`. This preserves the custom rule's selection; it does not prevent collisions between generated names and names already in the program.

Review the before/after output, preserve public APIs and external data contracts, and test the generated program. A custom rule helps control selection; it does not make every program safe to rename automatically. Parser selection in the CLI is separate from the options exposed by bundler plugins.

See [troubleshooting](/distribution/troubleshooting) for current replacement and mapping limitations.
