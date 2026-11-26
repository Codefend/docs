# Parser

A Codefend parser is a list of regular expressions that discover names for replacement. It does not parse a programming language's syntax tree.

## Built-in parsers

| Name       | Rules selected                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `default`  | Both the underscore code-name rule and hyphenated file-name rule.                                    |
| `codeOnly` | Underscore names such as `l_value`, `m_camera`, and `c_User`.                                        |
| `fileOnly` | Hyphenated names beginning with `pkg`, `cmp`, `lib`, `file`, `folder`, `module`, `style`, or `main`. |
| `Parser_A` | Deprecated alias for `default`; use `default` for new configurations.                                |

For example, this configuration fragment selects the code-name rule:

```json
{
  "parser": {
    "name": "codeOnly"
  }
}
```

Use a built-in parser when its naming convention matches the names you intend to change. The names describe the matching rules, not separate processing targets. Every rule can match source contents and path strings.

## Why the language examples use a custom parser

The examples mark application-owned names with `l_`, such as `l_total`. A custom rule limits discovery to that convention. The broader `codeOnly` rule also discovers unrelated underscore names, including Arduino's `LED_BUILTIN` and names such as `external_value`.

This explicit selection helps preserve library APIs and framework entry points while you introduce the naming convention. It uses the same replacement engine; it does not provide stronger obfuscation or automatic knowledge of private/public symbols.

Use `name: "custom"` with a nonempty `regexList`:

```json
{
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

This rule selects the example's `l_` names followed by an ASCII letter and then letters or digits. It does not select every possible underscore-containing name.

Each item has a descriptive `name` and a regex-source string in `value`. Codefend compiles custom expressions with the `g` flag. Omit surrounding `/` delimiters and flags; JSON requires doubled backslashes.

Supplying `regexList` with a built-in `name` does not override that built-in parser. The current bundler adapters select their built-in `codeOnly` parser rather than exposing this custom-parser setting.

## Selection is only one step

Discovery rules can match text in strings, comments, and paths too. Core's later replacement step has separate case/boundary limitations, so a name excluded during discovery is not a guarantee that every occurrence stays untouched.

See [custom naming conventions](custom-naming-convention) for a complete configuration and [troubleshooting](/distribution/troubleshooting) before adopting a rule in a larger project.
