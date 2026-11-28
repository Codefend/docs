---
title: Kotlin source obfuscation with Codefend
description: Apply Codefend to selected Kotlin source identifiers, preserve the JVM main entry point and external APIs, and compile the generated program into a runnable JAR.
---

# Obfuscate Kotlin source

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

This Kotlin/JVM example renames an application-owned helper and its parameters before compilation. It calculates an order total while preserving `main` and Kotlin's `println` API.

## 1. Create the source

Install [Node.js and Codefend](/get-started/installation), a JDK, and the [Kotlin command-line compiler](https://kotlinlang.org/docs/command-line.html). In a new directory, run:

```sh
npm install --global codefend
```

Create `source/Main.kt`:

<<< @/resources/languages/kotlin/source/Main.kt{kotlin}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/kotlin/obfuscated/Main.kt{kotlin}

The program's expected output remains `75`. Generated identifier numbers can change when the source or Codefend version changes.

Only names belonging to this example use `m_`. Keep `main`, `Int`, and `println` unchanged. This is a standalone Kotlin/JVM console program, not an Android or Kotlin/Native integration.

## 2. Configure the transformation

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/kotlin/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

The plain `Main.kt` filename stays unchanged. The default empty pool uses generated `Ox` identifiers.

Keep `source` text-only and `release` as disposable sibling output. Codefend removes an existing output directory. Keep JARs, downloaded libraries, and build caches outside the input tree.

## 3. Compile both versions

Run from the project root:

```sh
kotlinc source/Main.kt -include-runtime -d original.jar
java -jar original.jar
codefend --obfuscate
kotlinc release/Main.kt -include-runtime -d generated.jar
java -jar generated.jar
```

Both programs should print:

```text
75
```

The compiler's `-include-runtime` option includes the Kotlin runtime in the example JAR. The [official command-line guide](https://kotlinlang.org/docs/command-line.html#create-and-run-an-application) describes this workflow.

## Larger Kotlin projects

Keep names used by Java callers, reflection, serialization, framework annotations, Android components, resources, and generated code stable unless every relevant reference is updated. Parameter names can also be part of Kotlin named-argument calls. This example calls its private helper positionally and does not expose those parameters as a public API.

Codefend works on text; it does not understand Kotlin symbols, JVM metadata, or Android build rules. For a Gradle/Android project, introduce a separate generated-source step only after verifying generated files, source sets, and runtime behavior. Review [current limitations](/distribution/troubleshooting); no Android compatibility guarantee follows from this console example.

## Add Codefend to your workflow

Place Codefend before Kotlin compilation in a build script or CI job. For Gradle projects, keep dependency and source-set configuration intact while selecting the generated source for the intended build and tests.

```sh
codefend --obfuscate
kotlinc release/Main.kt -include-runtime -d generated.jar
java -jar generated.jar
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
