---
title: Dart source obfuscation
description: Rename application-owned Dart local identifiers with Codefend, preserve the main entry point, and compare the original and generated Dart CLI output.
---

# Obfuscate Dart source

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

This example renames selected identifiers in a Dart CLI program before running it. It calculates a discounted order total in integer cents.

Install the [Dart SDK](https://dart.dev/get-dart) and [Node.js for Codefend](/get-started/installation). In a new directory:

```sh
npm install --global codefend
```

## 1. Add a standalone program

Create `source/main.dart`:

<<< @/resources/languages/dart/source/main.dart{dart}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/dart/obfuscated/main.dart{dart}

The program's expected output remains `1800`. Generated identifier numbers can change when the source or Codefend version changes.

The helper is local to `main`, so this example does not rename an API imported by another library. Dart's `main`, `print`, and built-in type names stay unchanged. The `~/` operator keeps the discount calculation in integers.

## 2. Configure Codefend

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/dart/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

Plain `main.dart` does not match it; the empty pool uses generated prefix-and-sequence names.

Keep `release` separate from `source` and reserve it for disposable generated files. Codefend removes an existing output directory. Keep package caches, Flutter assets, compiled artifacts, and other binary files outside the processed input tree.

## 3. Run both source files

Run from the project root:

```sh
dart run source/main.dart
codefend --obfuscate
dart run release/main.dart
```

Both versions should print:

```text
1800
```

Dart supports [running a source file by its relative path](https://dart.dev/tools/dart-run#running-a-dart-file). This standalone example needs no package dependencies.

## Dart and Flutter integration

Preserve library APIs, named-argument contracts, JSON keys, generated-code references, and platform-channel method names. Dart uses a leading underscore for [library privacy](https://dart.dev/language/libraries); this example's `m_` convention is a selection marker, not a privacy mechanism. Renaming private identifiers with a prefix that drops their leading underscore can change their visibility.

This guide covers source-text transformation of a CLI program. It does not establish compatibility with an entire Flutter application or replace Flutter's own build-time obfuscation options. Test the generated Dart application, including reflection or interop features you use, and review [current limitations](/distribution/troubleshooting).

## Add Codefend to your workflow

Run Codefend before your Dart build or validation step, then run the generated application and its tests. Keep package configuration and dependencies in their normal locations, outside the text-only input tree.

```sh
codefend --obfuscate
dart run release/main.dart
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
