---
title: Swift source obfuscation with Codefend
description: Rename selected Swift helper and parameter names before compilation while preserving public APIs and argument-label contracts.
---

# Obfuscate Swift source

This standalone Swift program calculates an order total. Codefend renames the private helper and local parameter names before the Swift compiler builds an executable.

## 1. Create the program

Install [Node.js and Codefend](/get-started/installation) and a [Swift toolchain](https://www.swift.org/install/). The shell commands below use macOS/Linux executable paths. In a new directory, run:

```sh
npm install --global codefend
```

Create `source/main.swift`:

<<< @/resources/languages/swift/source/main.swift{swift}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/swift/obfuscated/main.swift{swift}

The program's expected output remains `75`. Generated identifier numbers can change when the source or Codefend version changes.

Only the helper and its internal parameter names use `l_`. The `_` argument labels make the call positional. Preserve `Int`, `print`, and any APIs supplied by Swift or a framework. Top-level code is the entry point in this small program; see [A Swift Tour](https://docs.swift.org/latest/documentation/the-swift-programming-language/guidedtour/).

## 2. Configure selected names

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/swift/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom parser selects this example's `l_` names and leaves the plain `main.swift` filename unchanged. Reserve `release` for generated source: Codefend replaces its configured output directory. Keep binary products and toolchain files outside the text-only `source` tree.

## 3. Build and compare

Run from the project root:

```sh
swiftc source/main.swift -o original
./original
codefend --obfuscate
swiftc release/main.swift -o generated
./generated
```

Both programs should print:

```text
75
```

On Windows with a supported Swift toolchain, use executable names such as `original.exe` and `generated.exe`, then run them with `./original.exe` and `./generated.exe` in PowerShell. Follow the toolchain's platform-specific setup instructions.

## Keep Swift contracts stable

External argument labels are part of a Swift call's spelling. Avoid marking labels used outside the processed source, and preserve public declarations, protocol requirements, Objective-C selectors, `Codable` keys, and names referenced by storyboards or other resources. A private declaration can still participate in an external contract.

This example is a standalone command-line program; it does not configure an Xcode or Swift Package build. Codefend does not resolve Swift syntax, overloads, or symbols. Test the generated program and read [current replacement limitations](/distribution/troubleshooting) before applying the same text rule to an application.

## Add Codefend to your workflow

Add Codefend before Swift compilation, then run the resulting executable and project tests. An existing Xcode or Swift Package workflow should retain its normal configuration while explicitly selecting the generated source copy.

```sh
codefend --obfuscate
swiftc release/main.swift -o generated
./generated
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
