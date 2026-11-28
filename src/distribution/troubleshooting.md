# Troubleshooting

Start with a small text-only example, keep the original source, and compare the generated program with it. Current Codefend has limitations that a successful configuration check does not rule out.

This guide targets Codefend 3.3.0 and later. The CLI examples use the narrower [`startWithMAndUnderscore` preset](/advanced-usage/parser/presets); selection remains text-based.

## Inspect names and statistics

Enable mapping statistics in `.codefendrc.json`:

```json
{
  "debug": {
    "stats": true
  }
}
```

The table shows transformation type, original name, replacement, and parsed match count. It does not group results by regex name or prove that the program still works.

To preserve a selected external name, add it to `transformation.ignore`:

```json
{
  "transformation": {
    "ignore": ["external_value"]
  }
}
```

Keep library APIs, required entry points, and external data formats stable. Run the generated program's tests after adjusting a configuration.

## Current limitations

| Symptom                                                 | What to check                                                                                                                                                                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing or damaged input/output files                   | The CLI removes output before generation. Use an existing text-only source and a dedicated sibling output; never point output at source, its ancestor, or a filesystem root. Avoid nesting output inside input.                             |
| Binary files change or no longer open                   | Copied files are read and rewritten as UTF-8. Keep images, archives, compiled artifacts, and other binary assets outside the processed input tree.                                                                                          |
| Names change inside strings, comments, or path text     | The parser selects text rather than syntax. From 3.3.0, automatic replacement preserves its exact matches and casing. Review the selected rule and preserve external data contracts.                                                        |
| References stop agreeing in a case-insensitive language | Use consistent spelling. Codefend's matching is case-sensitive even when the language treats differently cased spellings as one symbol.                                                                                                     |
| Two properties or variables receive the same pool name  | Pool allocation restarts across calls. A pool reused across files/chunks can collide, and a fallback name can change when a later call supplies pool entries. Keep `pool: []` for the examples and test shared-runtime workflows carefully. |
| Invalid generated identifiers                           | Generated names can collide with existing names or language keywords. A custom prefix/pool is not a complete language-aware validator.                                                                                                      |
| An error mentions an invalid regular expression         | Check custom regex syntax. From 3.3.0, static keys and ignore entries are literal text, rather than additional regular expressions.                                                                                                         |
| A check prints success but a later run fails            | Configuration checking is partial. Verify required paths, parser settings, and the generated program separately. Inspect diagnostic output as well as process status.                                                                       |

For a reproducible problem, record the installed Codefend/plugin versions, a minimal input, the configuration, the command, and the observed output. Remove credentials and private source before sharing a report in [Codefend issues](https://github.com/Codefend/core/issues).

## Upgrading from 3.2.1

Core 3.3.0 fixes the earlier replacement behavior that could change a stored name inside an excluded longer name, mishandle a differently cased occurrence, or interpret punctuation in a static key as regex syntax. Automatic replacement now uses the selected parser's original-source occurrences; explicit static keys match literal, case-sensitive text. Inserted replacement text is not processed again.

These fixes do not resolve pool allocation, generated-name collisions, or the consequences of selecting public names and external string keys. Test the generated output when upgrading. See [parser presets](/advanced-usage/parser/presets) to adopt the `m_` convention, or retain an existing parser when its rule fits your project.
