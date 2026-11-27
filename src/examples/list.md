---
title: Codefend language and build examples
description: Source obfuscation examples for C#, C++, Python, Java, JavaScript, TypeScript, Go, Rust, and more, plus Arduino, Vite, esbuild, Rollup, and Webpack builds.
---

# Examples

Choose a language or build tool. Each guide includes source files, configuration, commands for the original and generated program, and the language's external names to preserve.

CLI examples outside Node.js projects use one global Codefend installation, so they do not need npm project files. Node.js, TypeScript, and bundler examples keep their tooling local to the project. See [installation](/get-started/installation) to choose the setup. The configurations show only necessary settings; omitted options use Codefend's defaults. `codefend --obfuscate` already runs configuration checking, so a separate `--check` command is optional.

Each guide shows expected obfuscated source directly after the input code and includes a section on adding Codefend to an existing build, test, or CI workflow. The custom CLI parser deliberately selects the examples' `l_` names; [read why](/advanced-usage/parser/custom-naming-convention) before choosing a broader convention.

## Languages

| Language                                 | Example focus                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| [JavaScript (Node.js)](/examples/nodejs) | Execute a CommonJS program before and after obfuscation.                               |
| [TypeScript](/examples/typescript)       | Transform source, compile it, and execute explicit CommonJS output.                    |
| [Python](/examples/python)               | Rename application functions and locals while preserving Python entry-point behavior.  |
| [C#](/examples/csharp)                   | Preserve the program entry point and keep .NET build artifacts outside the input tree. |
| [Java](/examples/java)                   | Preserve the public class name, source filename, and main method.                      |
| [C](/examples/c)                         | Rename private helpers and variables while preserving main and standard-library calls. |
| [C++](/examples/cplusplus)               | Transform a small native program while keeping compiler and library contracts stable.  |
| [Go](/examples/go)                       | Preserve package/main entry points and keep generated helper names unexported.         |
| [Rust](/examples/rust)                   | Rename a private helper without changing standard-library macros or public names.      |
| [PHP](/examples/php)                     | Preserve variable sigils and PHP APIs while renaming application names.                |
| [Ruby](/examples/ruby)                   | Use lowercase replacements to preserve local-variable and method naming rules.         |
| [Kotlin](/examples/kotlin)               | Preserve main and keep JAR build products outside processed source.                    |
| [Swift](/examples/swift)                 | Keep argument-label and entry-point behavior explicit.                                 |
| [Dart](/examples/dart)                   | Preserve main and platform APIs in a small command-line program.                       |
| [R](/examples/r)                         | Run a calculation while preserving built-in functions and external data names.         |
| [Lua](/examples/lua)                     | Rename local functions and variables without changing host or standard-library names.  |
| [SQL (SQLite)](/examples/sql)            | Rename internal query aliases while keeping the public result column stable.           |
| [Bash](/examples/bash)                   | Preserve shell built-ins and external environment/command contracts.                   |
| [PowerShell](/examples/powershell)       | Preserve cmdlets and external parameter names while renaming private script names.     |
| [HTML and CSS](/examples/html-css)       | Keep an application-owned class consistent across markup and stylesheet files.         |

Codefend's configurable text rules can apply across these languages; they do not provide a language-aware parser or universal compatibility guarantee. These examples use small, source-only inputs and explicit naming conventions. Compile or run both versions in your own toolchain before extending the pattern to a larger project.

The automated docs checks verify each language fixture's actual Codefend transformation. They execute the Node.js and SQL examples and check HTML/CSS references. Other language compilation and runtime checks depend on installed toolchains; see the commands in each guide.

## Arduino

[Obfuscate an Arduino sketch](/examples/arduino) while preserving its sketch-folder/primary-file relationship, framework callbacks, and library APIs. Both example versions were compiled for the Uno target.

## Bundlers

| Build tool                   | Guide                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------- |
| [Vite](/examples/vite)       | Use the dedicated Vite plugin, which runs automatically during production builds. |
| [esbuild](/examples/esbuild) | Build and execute two JavaScript modules with esbuild-plugin-codefend. |
| [Rollup](/examples/rollup)   | Bundle a two-module JavaScript example.                                       |
| [Webpack](/examples/webpack) | Process a production JavaScript bundle with the official plugin.              |

Read [how it works](/get-started/how-it-works), [naming conventions](/basic-usage/naming-conventions/naming-conventions), and [troubleshooting](/distribution/troubleshooting) for shared configuration and current limitations.

Examples are maintained in this documentation site. Use the language and bundler guides above for complete source code, configuration, and build commands.
