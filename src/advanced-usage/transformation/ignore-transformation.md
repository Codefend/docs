# Ignore transformation

`transformation.ignore` preserves named text during replacement. Use it for external property names, dependency interfaces, or other names that must remain stable.

Merge this fragment into your configuration:

```json
{
  "transformation": {
    "ignore": ["external_value"]
  }
}
```

For a fresh runtime processing:

```js
const l_value = external_value;
console.log(l_value);
```

the output is:

```js
const Ox0 = external_value;
console.log(Ox0);
```

Ignored entries are added directly to the replacement map, even if a parser did not discover them. In the current implementation, ignore mappings take precedence over static mappings for the same original text.

Use ordinary identifier spellings. In Codefend, regex metacharacters in static or ignore names can affect the replacement regex. Matching is textual and current case/boundary limitations still apply.

## Excluding files is a separate setting

`transformation.ignore` retains text; it does not prevent files from being copied. Use `generation.ignore` for exact file/directory names that should be excluded from the CLI input tree. For example, the generated default configuration both excludes the `node_modules` directory from copying and keeps the text `node_modules` unchanged.

Never rely on obfuscation to hide credentials. Keep secrets out of distributed source and firmware regardless of the ignore settings. See [troubleshooting](/distribution/troubleshooting) when a generated program fails.
