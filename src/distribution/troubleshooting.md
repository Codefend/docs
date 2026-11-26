# Troubleshooting

Start with a small text-only example, keep the original source, and compare the generated program with it. Current Codefend has limitations that a successful configuration check does not rule out.

The findings below were verified with Codefend `3.2.1`. Recheck them when upgrading.

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

| Symptom                                                | What to check                                                                                                                                                                                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing or damaged input/output files                  | The CLI removes output before generation. Use an existing text-only source and a dedicated sibling output; never point output at source, its ancestor, or a filesystem root. Avoid nesting output inside input.                             |
| Binary files change or no longer open                  | Copied files are read and rewritten as UTF-8. Keep images, archives, compiled artifacts, and other binary assets outside the processed input tree.                                                                                          |
| Names change inside strings or longer identifiers      | Matching and replacement are text-based. The replacement step does not retain a custom parser's boundaries.                                                                                                                                 |
| Differently cased text disappears                      | Replacement is case-insensitive, while map lookups use the matched spelling. A case variant not present in the map can be replaced with an empty string.                                                                                    |
| Two properties or variables receive the same pool name | Pool allocation restarts across calls. A pool reused across files/chunks can collide, and a fallback name can change when a later call supplies pool entries. Keep `pool: []` for the examples and test shared-runtime workflows carefully. |
| Invalid generated identifiers                          | Generated names can collide with existing names or language keywords. A custom prefix/pool is not a complete language-aware validator.                                                                                                      |
| An error mentions an invalid regular expression        | Check custom regex syntax. Static/ignored words containing regex metacharacters can also affect core's replacement regex in this version.                                                                                                   |
| A check prints success but a later run fails           | Configuration checking is partial. Verify required paths, parser settings, and the generated program separately. Inspect diagnostic output as well as process status.                                                                       |

For a reproducible problem, record the installed Codefend/plugin versions, a minimal input, the configuration, the command, and the observed output. Remove credentials and private source before sharing a report in [Codefend issues](https://github.com/Codefend/core/issues).
