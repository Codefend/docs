---
title: PowerShell source obfuscation
description: Use Codefend with PowerShell to rename application-owned names, preserve external contracts, and compare the original and generated result.
---

# PowerShell source obfuscation

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

Rename a private PowerShell helper and its variables while keeping `Write-Output` and language keywords intact. The script totals an integer array.

Use Windows PowerShell 5.1 or PowerShell 7 and install [Node.js/Codefend](/get-started/installation). Your script execution policy must permit running your local source and generated scripts.

## 1. Create the source

In a new project directory, install Codefend:

```sh
npm install --global codefend
```

Create `source/main.ps1`:

<<< @/resources/languages/powershell/source/main.ps1{powershell}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/powershell/obfuscated/main.ps1{powershell}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

The `m_` names belong to this example. Public output and external API names remain unchanged.

## 2. Configure selected names

Create `.codefendrc.json` alongside the `source` directory:

<<< @/resources/languages/powershell/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

The lowercase `ox` prefix produces names such as `ox0`; the default empty pool avoids a limited replacement dictionary. The plain `main.ps1` filename does not match this rule.

`release` must be a disposable sibling of `source`. Codefend removes existing output before generation. Keep this input text-only, with build products and dependencies outside it.

## 3. Compare original and generated output

Run from a PowerShell prompt in the project root:

```powershell
& ./source/main.ps1
codefend --obfuscate
& ./release/main.ps1
```

Both executions should print:

```text
42
```

See [PowerShell command-line options](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pwsh) for the language's execution model.

## Preserve external names

Keep public function names, named parameters, module exports, environment variables, and properties consumed by callers stable. PowerShell treats many names case-insensitively, while this preset selects exact casing. Use consistent spelling so references to one symbol receive the same mapping, and test the result. Variable replacement preserves the leading `$` in this example.

Codefend matches and replaces text, including text in strings or comments. The preset does not infer language syntax, visibility, or external data contracts. See [troubleshooting](/distribution/troubleshooting) before applying the convention to a larger project.

Browse the other [language and build examples](/examples/list).

## Add Codefend to your workflow

Use Codefend as a generation step before script tests or module packaging. Run those checks against the generated scripts. In a PowerShell automation script, check the native command's `$LASTEXITCODE` before continuing to execution or packaging.

```powershell
codefend --obfuscate
if ($LASTEXITCODE -ne 0) { throw "Codefend failed." }
& ./release/main.ps1
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
