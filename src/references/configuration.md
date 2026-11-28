# Configuration

Codefend reads `.codefendrc.json` from the current directory. `npx codefend --init` generates the following default settings, together with a generated `__meta` object containing project/configuration metadata:

```json
{
  "generation": {
    "inputDir": ".",
    "outputDir": "codefend-output",
    "ignore": [
      "codefend-output",
      ".codefendrc.json",
      "node_modules",
      ".git",
      ".github",
      ".gitignore",
      ".vscode",
      "build",
      "dist",
      "README.md",
      "package-lock.json"
    ]
  },
  "transformation": {
    "prefix": "Ox",
    "static": [],
    "ignore": ["node_modules"],
    "pool": []
  },
  "debug": {
    "stats": true,
    "ignoredWarnings": []
  },
  "parser": {
    "name": "default"
  }
}
```

For new CLI workflows, prefer an isolated text-only input and a disposable sibling output, as shown in [generating configuration](/basic-usage/generating-configuration). Current path and binary limitations still apply to the generated defaults.

## Generation

These settings apply to the CLI's source-copy workflow, not to bundler plugins.

| Setting                | Type       | Generated default   | Meaning                                                                                           |
| ---------------------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| `generation.inputDir`  | `string`   | `"."`               | Existing source directory to process. Relative paths are resolved from the current directory.     |
| `generation.outputDir` | `string`   | `"codefend-output"` | Disposable generated directory. The current CLI removes it before copying.                        |
| `generation.ignore`    | `string[]` | Listed above        | File/directory names to exclude from copying. Matching uses exact entry names, not glob patterns. |

Do not use source, its ancestor, or a filesystem root as output. Avoid output nested within input and parser-matching names in the output path. Keep binary assets outside the processed source tree; Codefend rewrites copied contents as UTF-8. See [obfuscation](/basic-usage/obfuscation).

## Transformation

| Setting                 | Type                             | Generated default  | Meaning                                                                                                    |
| ----------------------- | -------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `transformation.prefix` | `string`                         | `"Ox"`             | Prefix for generated fallback names such as `Ox0`. It is not added to static replacements or pool entries. |
| `transformation.static` | `{ from: string, to: string }[]` | `[]`               | Explicit mappings from original names to replacement text.                                                 |
| `transformation.ignore` | `string[]`                       | `["node_modules"]` | Text to retain unchanged during transformation. This does not exclude a file from generation.              |
| `transformation.pool`   | `string \| string[]`             | `[]`               | Candidate replacement names supplied as a space-separated string or an array.                              |

Keep replacement names valid for your target language and avoid collisions with names that remain unchanged. Prefixes and pools are not complete language-aware validators. Read the [pool limitations](/advanced-usage/transformation/pool-transformation) before using a pool across files or chunks.

The generated config retains `node_modules` during transformation and excludes that directory from generation. These are separate behaviors. Optional fields passed directly through the JavaScript API can have different helper defaults; this table describes the CLI-generated configuration.

## Parser

| Setting            | Type                                | Default               | Meaning                                                                                                                                  |
| ------------------ | ----------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `parser.name`      | `string`                            | `"default"`           | `startWithMAndUnderscore` (3.3.0+), `default`, `codeOnly`, `fileOnly`, or `custom`. `Parser_A` remains a deprecated alias for `default`. |
| `parser.regexList` | `{ name: string, value: string }[]` | Required for `custom` | Named regex-source strings, compiled with the `g` flag.                                                                                  |

A custom regex list is used only with `name: "custom"`; a built-in name selects its built-in rules. JSON strings must escape backslashes, and values must omit `/` delimiters and flags. See [parser settings](/advanced-usage/parser/overview).

For new CLI projects using explicit `m_` names, we recommend [`startWithMAndUnderscore`](/advanced-usage/parser/presets). It selects `m_total`, `m_Total`, and `m_value2`, while excluding unrelated underscore names. The generated default remains `default`. Plugin versions 3.3.0 and later expose `parser.name` with just `codeOnly` and `startWithMAndUnderscore`; their default remains `codeOnly`.

The parsers operate on both source text and paths. `codeOnly` selects the underscore rule, not a restriction to executable code or a guarantee that filenames remain unchanged.

## Debug

| Setting                 | Type                | Default | Meaning                                                                                               |
| ----------------------- | ------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `debug.stats`           | `boolean`           | `true`  | Print transformation type, original name, target, and parsed match count.                             |
| `debug.ignoredWarnings` | `"all" \| string[]` | `[]`    | Hide all warnings, or the listed warning codes, in configuration checking. Errors are not suppressed. |

Statistics describe recorded mappings, not build correctness or the security of the output. Regex item names are not grouped in the current statistics table. Review [troubleshooting](/distribution/troubleshooting) for current validation and transformation limitations.
