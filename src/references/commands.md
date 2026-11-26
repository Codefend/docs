# Commands

With a local installation, run `npx codefend` followed by one of these options. A global installation also supports `codefend` directly.

| Short | Long          | Action                                                                  |
| ----- | ------------- | ----------------------------------------------------------------------- |
| `-i`  | `--init`      | Write `.codefendrc.json` in the current directory.                      |
| `-c`  | `--check`     | Report selected configuration errors and warnings.                      |
| `-o`  | `--obfuscate` | Check the configuration, then generate the obfuscated source directory. |
| `-v`  | `--version`   | Print the installed Codefend version.                                   |
| `-h`  | `--help`      | Print CLI usage.                                                        |

```bash
npx codefend --version
npx codefend --init
npx codefend --check
npx codefend --obfuscate
```

Run commands from the directory containing your configuration. Current CLI options do not accept a custom config path, a dry-run mode, or a watch mode.

In Codefend, `--init` overwrites an existing configuration and `--obfuscate` removes the configured output before generation. Review the [configuration](/references/configuration) and [output-directory guidance](/basic-usage/obfuscation) first.

The check command is not a complete schema, path-safety, or program-correctness validator. Inspect its printed diagnostics; some current failure paths do not return a failing process status, so exit status alone is insufficient for validation in automation.
