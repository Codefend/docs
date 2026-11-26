---
title: Arduino sketch obfuscation
description: Obfuscate an Arduino C++ sketch with Codefend while preserving setup(), loop(), sketch filenames, and Arduino library APIs. Includes Arduino CLI build commands.
---

# Obfuscating an Arduino sketch

Codefend can rename selected identifiers in Arduino C++ source before you share a sketch. This example uses a small LED sketch, keeps the Arduino entry points and APIs intact, and compiles the generated sketch with Arduino CLI.

Codefend runs on your development computer. It does not add a runtime library to the Arduino board. It transforms source text; it does not encrypt firmware or protect credentials embedded in source or compiled binaries.

## Prerequisites

- [Node.js and Codefend](../get-started/installation.md).
- [Arduino CLI](https://docs.arduino.cc/arduino-cli/installation/) or Arduino IDE, and the board platform for your target.
- An Arduino Uno for the build commands below, or your board's fully qualified board name (FQBN) in place of `arduino:avr:uno`.

To install the Uno platform for Arduino CLI:

```sh
arduino-cli core update-index
arduino-cli core install arduino:avr
```

A connected board is needed to test the LED behavior, but is not needed to compile the sketch. See Arduino's [CLI getting started guide](https://docs.arduino.cc/arduino-cli/getting-started/).

## 1. Create a source-only sketch directory

Use this layout in a new project directory:

```text
arduino-example/
├── source/
│   └── PulseBlink/
│       └── PulseBlink.ino
└── .codefendrc.json
```

Install Codefend globally on your development computer:

```sh
npm install --global codefend
codefend --version
```

This makes the `codefend` command available across your sketch projects. The Arduino project does not need `package.json` or `package-lock.json`.

::: details Optional: keep Codefend local to the project
To manage Codefend alongside the project's other tools, run these commands from the project root instead:

```sh
npm init -y
npm install --save-dev codefend
```

This creates npm package files to manage Codefend on your computer. Use `npx codefend` in place of `codefend` in the commands below.
:::

Arduino requires the primary `.ino` filename to match the sketch folder: `PulseBlink/PulseBlink.ino`. Keep these names unchanged. See the [Arduino sketch specification](https://docs.arduino.cc/arduino-cli/sketch-specification/).

Put this code in `source/PulseBlink/PulseBlink.ino`:

<<< @/resources/arduino/snippets/original/PulseBlink.ino{cpp}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/arduino/snippets/obfuscated/PulseBlink.ino{cpp}

The expected behavior remains an LED toggle every half second. The Arduino entry points and library APIs stay unchanged; generated identifier numbers can vary with the input.

Only our application identifiers use `l_`. Keep `setup`, `loop`, `pinMode`, `digitalWrite`, `millis`, `LED_BUILTIN`, `OUTPUT`, `HIGH`, and `LOW` unchanged: they belong to the Arduino build environment or API.

Compile the original before adding obfuscation to your workflow:

```sh
arduino-cli compile --fqbn arduino:avr:uno source/PulseBlink
```

## 2. Configure selective renaming

Save the following as `.codefendrc.json` in the project root:

<<< @/resources/arduino/codefend.config.json

The custom parser selects application names beginning with `l_` in this sketch. This is useful here because the broader `codeOnly` convention also matches underscore names such as `LED_BUILTIN`. The default transformation generates names such as `Ox0`; no additional transformation settings are needed.

The plain folder and filename do not match this naming rule, so this example retains `PulseBlink/PulseBlink.ino`. Codefend also applies matching to paths; choosing a code-oriented parser alone does not guarantee that every possible filename will be preserved.

::: warning Use a dedicated generated directory
Codefend replaces its configured output directory. Keep `release` separate from `source`, and reserve it for generated files. Use the exact layout above; never point output at the source directory or a directory containing files you want to retain.

Keep this example's input source-only. Store compiled `.hex`/`.bin` artifacts, images, downloaded libraries, and other binary files outside `source`; the current CLI processes copied file contents as text.
:::

## 3. Generate and inspect the sketch

Run from the project root:

```sh
codefend --obfuscate
```

The generated sketch is located at:

```text
release/
└── PulseBlink/
    └── PulseBlink.ino
```

Compare the generated file with the preview above. Inspect the statistics and output after each change: selected application names should be renamed consistently, while the Arduino APIs, entry points, and sketch filename remain intact.

## 4. Compile and test the generated sketch

Compile the generated directory, rather than the original:

```sh
arduino-cli compile --fqbn arduino:avr:uno release/PulseBlink
```

You can also open `release/PulseBlink/PulseBlink.ino` in Arduino IDE and use **Verify**. Upload that generated sketch using your normal board and port selection, then confirm the LED changes state every half second just as it does with the original.

To save compiled artifacts outside the source and generated sketch directories:

```sh
arduino-cli compile --fqbn arduino:avr:uno --output-dir firmware release/PulseBlink
```

Arduino's [compile command reference](https://docs.arduino.cc/arduino-cli/commands-reference/arduino-cli_compile/) documents FQBN selection and output options.

This example's original and generated sketches were compiled for `arduino:avr:uno` using Arduino CLI 1.6.0 and Arduino AVR platform 1.8.8. Both produced identical HEX firmware, using 832 bytes of flash and 14 bytes of RAM. That result applies to this sketch and toolchain; no physical-board test was performed.

## Larger Arduino projects

- Keep hardware entry points, interrupt callback contracts, library APIs, macro names, and externally referenced names compatible with their callers. Add the naming convention only to identifiers you control, updating all their references.
- Use a separate generated sketch tree. Preserve matching sketch-folder/primary-file names, include paths, and any filenames required by the Arduino toolchain.
- Before extending to several `.ino`, `.h`, or `.cpp` files, compile both trees and exercise cross-file references. In the current engine, a non-empty replacement pool can reuse or change mappings across calls; this example deliberately has one source file and the default empty pool.
- Matching and replacement operate on text, including matching string contents and comments. Test for changes to protocol fields, serialized keys, case variants, and longer names containing a selected name. A custom discovery regex does not provide syntax-aware C++ renaming.
- Source obfuscation changes how distributed source looks. It does not guarantee smaller firmware, faster execution, resistance to reverse engineering, or secrecy of embedded values. Keep the original source and required license notices when distributing derivatives.

For configuration details, see [custom naming conventions](../advanced-usage/parser/custom-naming-convention.md) and [build and deployment](../distribution/build-and-deployment.md).

## Add Codefend to your workflow

Add source generation before your existing Arduino build, then compile the generated sketch:

```sh
codefend --obfuscate
arduino-cli compile --fqbn arduino:avr:uno --output-dir firmware release/PulseBlink
```

These steps can run in a local build script or CI after installing Codefend and the board platform. Configure the script to stop if either command fails. Keep firmware artifacts outside `source`, and upload or distribute only the generated build you have verified. If you use Arduino IDE, regenerate the sketch before opening the copy under `release` and using **Verify**. Test hardware behavior separately.
