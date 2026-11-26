---
title: C++ source obfuscation
description: Rename selected private C++ identifiers with Codefend, keep public symbols and main stable, and compile a small calculation before and after transformation.
---

# Obfuscate a C++ program

Codefend can rename selected identifiers in C++ source before you compile or distribute it. This example totals three values through a small private helper, preserving `main` and standard library names.

## 1. Create the source

Install [Codefend](/get-started/installation) with Node.js 18 or later and a C++ compiler. These commands use GCC's `g++` driver:

```sh
npm install --global codefend
```

Create `source/main.cpp`:

<<< @/resources/languages/cplusplus/source/main.cpp{cpp}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/cplusplus/obfuscated/main.cpp{cpp}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

The helper, its parameters, and a local result use `l_`. The `stdio.h` header and `printf` function retain their library names. The three values total `42`.

## 2. Configure application names

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/cplusplus/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom parser selects this example's marked names; it does not parse templates or infer C++ access control. The plain `main.cpp` filename does not match the rule. The default empty pool avoids limited dictionary allocation across calls.

Keep `release` as disposable sibling output because Codefend removes that directory before writing. Keep compiled objects, archives, and executables outside the source tree. Read [output-directory guidance](/basic-usage/obfuscation) before running it on an existing project.

## 3. Compile and compare

Run from the project root:

```sh
g++ -std=c++17 source/main.cpp -o original
./original
codefend --obfuscate
g++ -std=c++17 release/main.cpp -o generated
./generated
```

In Windows PowerShell, run `.\original.exe` and `.\generated.exe` if your compiler adds the executable extension. Both should print:

```text
42
```

Inspect the generated source and test the resulting executable. Use the `g++` driver when linking C++ programs; it includes the C++ library automatically. See [GCC's C++ compiler documentation](https://gcc.gnu.org/onlinedocs/gcc/Invoking-G_002b_002b.html).

## Preserve external contracts

Public class/member names, exported symbols, plugin interfaces, reflection registrations, and serialized field names can be consumed outside the files you transform. Keep those names stable unless every consumer is coordinated.

Templates, macros, generated headers, resource files, and build-system rules can carry additional references. Codefend does not update an ABI or understand overloads and C++ scopes. Extend the naming convention gradually and compile the complete generated tree, including tests.

Text matching also affects matching string contents and can replace substrings that a custom discovery rule excluded. Review [current limitations](/distribution/troubleshooting), especially case/boundary handling and shared pools, before using a broader convention.

For Arduino-specific filename and callback requirements, see the [Arduino example](/examples/arduino).

## Add Codefend to your workflow

Run Codefend before your existing C++ build and compile the generated source tree. Keep compiler settings, dependencies, and binary outputs in the build system; run the generated program and project tests before packaging it.

```sh
codefend --obfuscate
g++ -std=c++17 release/main.cpp -o generated
./generated
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
