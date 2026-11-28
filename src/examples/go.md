---
title: Go source obfuscation
description: Use Codefend to rename selected unexported Go helpers and local variables, preserve package and library APIs, and compare original and generated programs.
---

# Obfuscate a Go program

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

This example transforms a small Go command's source before compilation. It keeps `package main`, the entry point, and imported APIs stable. A lowercase generated prefix preserves the helper's unexported naming.

## 1. Create the program

Install the [Go toolchain](https://go.dev/doc/install) and [Codefend](/get-started/installation). Codefend runs on Node.js 18 or later, independently of Go.

```sh
npm install --global codefend
```

Create `source/main.go`:

<<< @/resources/languages/go/source/main.go{go}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/go/obfuscated/main.go{go}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

The private helper and locals use `m_`; `main`, `fmt`, and `Println` remain unchanged. This program uses only the standard library.

## 2. Configure names and output

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/go/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

The `ox` prefix is deliberately lowercase. Go uses an identifier's first character to determine whether a package-level name is exported. An uppercase replacement such as `Ox0` would change an unexported helper into an exported name. See [exported identifiers in the Go specification](https://go.dev/ref/spec#Exported_identifiers).

Keep `release` separate from `source` and reserve it for generated files: Codefend replaces that directory. Store binaries and other non-text build artifacts outside the input tree.

## 3. Run both programs

From the project root:

```sh
go run source/main.go
codefend --obfuscate
go run release/main.go
```

Both commands should print:

```text
42
```

The Go command can run a list of named Go files. This standalone standard-library example therefore does not require a `go.mod` file. For module-based applications, retain your module and workspace configuration and run the generated package in its intended module context. See the [Go command documentation](https://pkg.go.dev/cmd/go#hdr-Compile_and_run_Go_program).

## Larger Go applications

- Keep exported APIs, interface method names, imported package members, and externally consumed identifiers stable. A lowercase prefix preserves this example's visibility, but does not coordinate interface contracts.
- Struct tags and exported fields often define JSON, database, or reflection behavior. Do not mark those names unless all consumers are covered.
- Preserve package declarations, import paths, filenames with build constraints, and generated-code contracts.
- Run `go test` against the generated application in the appropriate module. Check all packages and cross-file references before distributing it.
- This is text matching rather than a Go parser. The default empty pool avoids current dictionary-allocation limitations, but case variants, longer names, and string contents still need review. See [troubleshooting](/distribution/troubleshooting).

Generated source must still pass the Go compiler; Codefend is not a transformation of an already compiled Go binary.

## Add Codefend to your workflow

Generate the source before your Go build. This standalone example runs directly; for a module-based project, retain its module context and point your normal build and tests at the generated package sources.

```sh
codefend --obfuscate
go run release/main.go
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
