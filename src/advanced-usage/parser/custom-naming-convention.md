# Custom naming convention

Use a custom parser when you want Codefend to discover a specific naming convention. The language examples mark names controlled by the application with `l_`; library and framework names keep their original spelling.

## Why choose a custom rule?

The built-in `codeOnly` parser discovers a broad underscore naming pattern. That includes `l_total`, but also unrelated names such as `external_value` or Arduino's `LED_BUILTIN`.

The examples use this narrower discovery expression:

```js
/\bl_[A-Za-z][A-Za-z0-9]*\b/g;
```

| Source name                          | Discovered by this custom rule?                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `l_total`, `l_firstName`, `l_value2` | Yes: the names follow the example's `l_` convention.                                            |
| `main`, `setup`, `loop`              | No: required entry points are not marked.                                                       |
| `LED_BUILTIN`, `external_value`      | No: these names do not start with `l_`.                                                         |
| `l_total_amount`                     | No: this rule allows letters and digits after the first underscore, not additional underscores. |

The benefit is explicit selection: mark the names whose callers you control, then inspect their replacements. A custom parser is optional. A built-in parser is simpler when its broader convention fits your project. Both use the same transformation engine.

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
        "name": "applicationNames",
        "value": "\\bl_[A-Za-z][A-Za-z0-9]*\\b"
      }
    ]
  }
}
```

Keep `release` as disposable sibling output. Codefend removes existing output before generation; follow the [output-directory guidance](/basic-usage/obfuscation).

The doubled backslashes are JSON escaping. Write a regex-source string without `/` delimiters or flags; Codefend compiles it with `g`. The regex item's `name` is a label, not a different parser implementation. A built-in parser name selects its built-in rules even if you also supply `regexList`.

The parser chooses which names to discover. Transformation settings choose the replacement names. The defaults generate names such as `Ox0`; the [Ruby](/examples/ruby) and [Go](/examples/go) guides use a lowercase prefix to preserve their naming rules.

## Understand the limits

This is a text convention, not a syntax-aware member or private-variable parser. Marking a public name with `l_` also makes it eligible. The expression can discover matching text in strings, comments, and paths, and its ASCII naming rule does not describe every language's identifier grammar.

There is a separate replacement limitation in Codefend: stored names are later replaced with a case-insensitive regex that does not retain the discovery expression's boundaries. If `l_total` was discovered, replacement can also change that substring in `al_total`, or mishandle a differently cased `L_total`. Tightening discovery alone does not fix that step.

Review the before/after output, preserve public APIs and external data contracts, and test the generated program. A custom rule helps control discovery; it does not make every program safe to rename automatically. There is currently no built-in `mPrefix` parser, and parser selection in the CLI is separate from the options exposed by bundler plugins.

See [troubleshooting](/distribution/troubleshooting) for current replacement and mapping limitations.
