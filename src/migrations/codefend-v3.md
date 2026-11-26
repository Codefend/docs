# Codefend 3 migration guide

1. Back up your existing `.codefendrc.json` and commit your original source before upgrading.
2. Install Codefend 3 as a local development dependency:

   ```bash
   npm install --save-dev codefend@3
   ```

3. Move the old configuration aside before generating a fresh one. `--init` overwrites an existing file:

   ```bash
   npx codefend --init
   ```

4. Merge your source layout, transformations, and custom parser settings into the new configuration using the [reference](/references/configuration). Keep a dedicated disposable output separate from input.
5. Use `parser.name: "custom"` for a custom `regexList`. Replace the deprecated `Parser_A` alias with `default` when retaining the built-in combined rules.
6. Check the configuration and inspect the printed diagnostics:

   ```bash
   npx codefend --check
   ```

7. Generate output, then build and test that generated program:

   ```bash
   npx codefend --obfuscate
   ```

Codefend requires Node.js `18.0.0` or newer. Review [troubleshooting](/distribution/troubleshooting) for current path, binary, replacement, and pool limitations before migrating a larger project.
