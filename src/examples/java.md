---
title: Java source obfuscation with Codefend
description: Rename internal Java helper names with Codefend and run original and generated source directly with JDK 11 or later, preserving Main and public contracts.
---

# Obfuscate Java source

This example transforms one Java source file, compiles each version, and compares an order-total calculation. Codefend changes selected source text; it does not process `.class` files or JARs.

## 1. Add the Java source

Install [Node.js](/get-started/installation) and JDK 11 or later. Install Codefend once on your development computer:

```sh
npm install --global codefend
```

Create `source/Main.java`:

<<< @/resources/languages/java/source/Main.java{java}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/java/obfuscated/Main.java{java}

The program's expected output remains `75`. Generated identifier numbers can change when the source or Codefend version changes.

Preserve the public class name `Main`, its matching `Main.java` filename, and `public static void main`. Only the helper and parameters we own use `l_`. `System.out.println` belongs to the Java platform and stays unchanged. This standalone example needs no Maven, Gradle, or npm project files.

## 2. Configure selective matching

Create `.codefendrc.json` in the project root:

<<< @/resources/languages/java/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom rule selects this example's `l_` identifiers; it does not match `Main.java`. Keep only source text under `source`. Reserve sibling `release` for generated source because Codefend replaces its output directory. Compiled classes belong outside both trees.

## 3. Run and compare

Run from the project root:

```sh
java source/Main.java
codefend --obfuscate
java release/Main.java
```

Both programs should print:

```text
75
```

The JDK's [source-file launcher](https://docs.oracle.com/en/java/javase/25/docs/specs/man/java.html#using-source-file-mode-to-launch-source-code-programs) compiles and runs this single file directly, so no explicit `javac` command or class-output directory is needed. Inspect `release/Main.java` for the renamed helper and parameters. Their exact generated names can change with the input.

## Preserve runtime contracts

Keep public APIs, package/class relationships, reflection strings, service-provider declarations, JNI bindings, serialization contracts, and framework-discovered names compatible with their callers. Do not rename a method only because it is private: reflection can still reference it.

Codefend does not analyze Java syntax or bytecode. Text replacements can also affect strings, comments, and longer names. Compile and run the complete generated application; review [current mapping and replacement limitations](/distribution/troubleshooting) before adopting custom pools or a larger input tree.

## Add Codefend to your workflow

Add Codefend before your Java compilation or source-run step. In a Maven or Gradle application, retain the existing project configuration and make its build and tests consume a generated-source copy with matching package paths.

```sh
codefend --obfuscate
java release/Main.java
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
