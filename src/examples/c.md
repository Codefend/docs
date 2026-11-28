---
title: C source obfuscation
description: Obfuscate selected application identifiers in a C program with Codefend, preserve main and C library APIs, then compile and compare both versions.
---

# Obfuscate a C program

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

This example renames a private helper and its local variables before compiling a C program. It keeps `main`, library calls, and filenames unchanged. It transforms source text, not an existing executable.

## 1. Create the program

Install [Codefend](/get-started/installation) with Node.js 18 or later, and install a C compiler. The commands below use GCC:

```sh
npm install --global codefend
```

Create `source/main.c`:

<<< @/resources/languages/c/source/main.c{c}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/c/obfuscated/main.c{c}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

The helper totals three values and prints `42`. Only names we own use the `m_` convention. Keep `main`, `printf`, standard headers, and any external library APIs unchanged.

## 2. Configure selective naming

Save this as `.codefendrc.json` beside `source`:

<<< @/resources/languages/c/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

A narrow rule avoids treating unrelated underscore names in headers or macros as application identifiers. The default empty pool uses generated names with the configured prefix.

`release` is a disposable sibling of `source`: Codefend removes an existing output directory. Keep this input tree source-only and place object files, executables, libraries, and other binary assets outside it. See [output-directory guidance](/basic-usage/obfuscation).

## 3. Compile both versions

From the project root:

```sh
gcc -std=c11 source/main.c -o original
./original
codefend --obfuscate
gcc -std=c11 release/main.c -o generated
./generated
```

On Windows, GCC may add the `.exe` extension; run `.\original.exe` and `.\generated.exe` in PowerShell. Both programs should print:

```text
42
```

Inspect `release/main.c` to confirm that selected names changed while the entry point and C library calls stayed intact. GCC documents source-file suffixes and the `-o` output option in its [compilation options](https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html).

## Applying this to a larger C project

- Keep symbols referenced by external binaries, dynamic loaders, assembly, linker scripts, or foreign-function interfaces stable. A text replacement cannot discover those callers.
- Preserve required header/include paths and update all references when deliberately renaming an application symbol.
- Keep preprocessing contracts, public macros, compiler attributes, and library identifiers unchanged unless you control every consumer.
- Test cross-file references and compile all generated translation units. This example uses one source file and the default empty pool; a non-empty pool has current cross-call allocation limitations.
- The `startWithMAndUnderscore` preset does not make replacement syntax-aware. Review matching strings, external interfaces, and generated-name collisions; see [current limitations](/distribution/troubleshooting).

For an embedded C++ workflow with required framework entry points, see the [Arduino guide](/examples/arduino).

## Add Codefend to your workflow

Add Codefend as a generated-source step before your existing Make, CMake, or compiler build. Point that build at the generated translation units and run its tests before packaging the resulting binary.

```sh
codefend --obfuscate
gcc -std=c11 release/main.c -o generated
./generated
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
