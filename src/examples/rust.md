---
title: Rust source obfuscation
description: Obfuscate selected private Rust functions and variables with Codefend, preserve main and macro APIs, and compile the original and generated source.
---

# Obfuscate a Rust program

Codefend can rename selected application identifiers in Rust source. This single-file example totals a slice of integers while keeping the entry point and standard macro names unchanged.

## 1. Create the source

Install [Rust](https://www.rust-lang.org/tools/install) and [Codefend](/get-started/installation). Codefend requires Node.js 18 or later; it runs before Rust compilation.

```sh
npm install --global codefend
```

Create `source/main.rs`:

<<< @/resources/languages/rust/source/main.rs{rust}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/rust/obfuscated/main.rs{rust}

The program's expected output remains `42`. Generated identifier numbers can change when the source or Codefend version changes.

Only our helper, parameters, and locals use `l_`. Keep `main`, Rust keywords/types, and `println!` unchanged.

## 2. Configure selection

Create `.codefendrc.json` beside `source`:

<<< @/resources/languages/rust/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom parser selects these marked ASCII names. The lowercase `ox` prefix produces names such as `ox0`, compatible with the naming style used for the example's functions and locals. The default empty pool uses generated names without a limited replacement dictionary.

`release` is a disposable sibling directory. Codefend replaces existing output, so keep original source and valuable files outside it. Keep build artifacts out of the processed input tree.

## 3. Compile both versions

From the project root:

```sh
rustc --edition=2021 source/main.rs -o original
./original
codefend --obfuscate
rustc --edition=2021 release/main.rs -o generated
./generated
```

On Windows, use `.\original.exe` and `.\generated.exe` if the compiler appends the executable extension. Both programs should print:

```text
42
```

See the Rust book's [compile-and-run example](https://doc.rust-lang.org/book/ch01-02-hello-world.html) and the compiler's [edition option](https://doc.rust-lang.org/rustc/command-line-arguments.html#--edition-specify-the-edition-to-use).

## Applying this to Cargo projects

This example uses `rustc` directly and has no external crates. For a Cargo application, preserve `Cargo.toml`, lockfiles, module paths, build scripts, and dependency configuration while arranging for Cargo to build the generated source. Keep `target` and downloaded dependencies outside Codefend's input. Test the generated package through its normal Cargo workflow.

Do not mark public APIs, trait-required method names, externally linked symbols, procedural-macro contracts, or serialization fields unless you control their consumers. Renaming text does not understand Rust scopes, borrowing, macro expansion, or foreign-function interfaces.

Compile and run tests for all generated modules. The default empty pool avoids current cross-call pool issues, but text replacement still requires checking case variants, embedded names, and string contents; see [current limitations](/distribution/troubleshooting).

## Add Codefend to your workflow

Run Codefend before compiling the generated Rust source and testing its behavior. For a Cargo project, keep its manifests and dependency configuration and arrange for the intended generated sources to be built and tested.

```sh
codefend --obfuscate
rustc --edition=2021 release/main.rs -o generated
./generated
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
