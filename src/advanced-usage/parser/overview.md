# Parser

A Codefend parser is a list of regular expressions that discover names for replacement. It does not parse a programming language's syntax tree.

## Choose a preset

For new CLI projects using an explicit `m_` naming convention, we recommend [`startWithMAndUnderscore`](presets). It selects fewer unrelated names than the broader underscore rule. Requires Codefend 3.3.0 or later.

| Name                      | Rules selected                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `startWithMAndUnderscore` | `m_` followed by an ASCII letter, then letters or digits; no additional underscores.                 |
| `default`                 | Both the underscore code-name rule and hyphenated file-name rule.                                    |
| `codeOnly`                | Underscore names such as `l_value`, `m_camera`, and `c_User`.                                        |
| `fileOnly`                | Hyphenated names beginning with `pkg`, `cmp`, `lib`, `file`, `folder`, `module`, `style`, or `main`. |
| `Parser_A`                | Deprecated alias for `default`; use `default` for new configurations.                                |

For example, this configuration selects the recommended `m_` preset:

```json
{
  "parser": {
    "name": "startWithMAndUnderscore"
  }
}
```

Use a built-in parser when its naming convention matches the names you intend to change. The names describe the matching rules, not separate processing targets. Every rule can match source contents and path strings.

## Why the CLI examples use this preset

The examples mark application-owned names with `m_`, such as `m_total`. The preset limits selection to that convention without repeating a custom regex in every configuration. The broader `codeOnly` rule also discovers unrelated underscore names, including Arduino's `LED_BUILTIN` and names such as `external_value`.

This explicit selection helps preserve library APIs and framework entry points while you introduce the naming convention. It uses the same replacement engine; it does not provide stronger obfuscation or automatic knowledge of private/public symbols.

See [parser presets](presets) for selected and excluded names, including `m_Total` and `m_2total`.

The preset configuration above is complete for `m_` names: no `regexList` or custom rule label is needed.

## When to use a custom rule

Use a [custom parser](custom-naming-convention) only when your naming convention needs a different expression, such as an existing project using another prefix. The custom-parser guide explains `name: "custom"` and `regexList` for that separate case.

Plugin versions 3.3.0 and later accept either `codeOnly` or `startWithMAndUnderscore` through `parser.name`. The narrower `m_` preset is recommended for new projects; `codeOnly` remains the default. Custom regex lists remain available through the core CLI/API.

## Selection is only one step

Rules can match text in strings, comments, and paths too. From core 3.3.0, automatic replacement uses the exact occurrences selected by the parser, preserving their spelling and matching boundaries. Explicit static replacements are literal, case-sensitive text mappings. Name collisions, pool allocation, and external data contracts still require review.

See [custom naming conventions](custom-naming-convention) for a complete configuration and [troubleshooting](/distribution/troubleshooting) before adopting a rule in a larger project.
