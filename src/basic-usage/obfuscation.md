# Obfuscation

First [create your configuration](/basic-usage/generating-configuration) and mark the names you want to transform using the selected [naming convention](/basic-usage/naming-conventions/naming-conventions).

Run the configuration check from the directory containing `.codefendrc.json`:

```bash
npx codefend --check
```

The check reports selected configuration issues. It is not a complete path-safety or program-correctness check; inspect the configuration and its printed diagnostics before proceeding.

Then generate the output:

```bash
npx codefend --obfuscate
```

You can add a script to `package.json`:

```json
{
  "scripts": {
    "obfuscate": "codefend --obfuscate"
  }
}
```

and run:

```bash
npm run obfuscate
```

## Choose a disposable output directory

Codefend removes the configured output directory before generating it. Use a dedicated output that is separate from your input and contains no original files. Prefer sibling `source` and `generated` directories as shown in the configuration guide. Ensure the source exists before every run.

Do not set output to the source directory, an ancestor of the source, or a filesystem root. Avoid nesting output inside input and avoid parser-matching names in the output path. The current CLI does not reliably reject unsafe relationships or normalize all output exclusions.

## Check the generated program

Inspect the generated source and mapping statistics, then build and run its tests. Matching is text-based and can affect strings, public interfaces, and paths. Keep binary files outside the processed input tree: the current CLI rewrites copied contents as UTF-8.

Use the [troubleshooting guide](/distribution/troubleshooting) when output differs from the original program. See the [command reference](/references/commands) for all CLI options.
