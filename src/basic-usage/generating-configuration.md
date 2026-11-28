# Generating the configuration file

From your project directory, create `.codefendrc.json`:

```bash
npx codefend --init
```

Create it once, then edit it for your source layout and naming convention. In Codefend, running `--init` again overwrites an existing configuration; save a copy before regenerating it.

The generated configuration includes source/output settings, transformations, parser selection, debugging settings, and generated `__meta` information. See the [configuration reference](/references/configuration).

For a first source-only project, use separate input and output directories under the project root. For example, `source` contains your text sources and `generated` is disposable output. Select the recommended [`startWithMAndUnderscore` preset](/advanced-usage/parser/presets) for application-owned names marked with `m_` in Codefend 3.3.0 or later:

```json
{
  "generation": {
    "inputDir": "source",
    "outputDir": "generated",
    "ignore": ["node_modules", ".git", "package-lock.json"]
  },
  "transformation": {
    "prefix": "Ox",
    "static": [],
    "ignore": [],
    "pool": []
  },
  "parser": {
    "name": "startWithMAndUnderscore"
  },
  "debug": {
    "stats": true,
    "ignoredWarnings": []
  }
}
```

Create `source` before running Codefend and keep the output's parent directory present. Choose an output path that contains no parser-matching names. Never point output at the source, a source ancestor, or a directory containing files you need: the current CLI removes the output directory at the start of a run.

Use a text-only input tree. Current CLI processing reads every copied file as UTF-8, so binary assets need to be kept outside that tree and copied separately by your build. See [obfuscation](/basic-usage/obfuscation) for the next steps.
