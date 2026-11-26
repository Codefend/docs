# Folder and file naming convention

The `fileOnly` parser selects hyphenated names such as:

- `pkg-source`
- `cmp-input`
- `lib-sensor`
- `file-controller`
- `folder-models`
- `module-network`
- `style-main`
- `main-page`

The `default` parser includes this rule alongside the underscore code-name rule. Extensions are not part of these example matches: `file-sensor.js` can become a name such as `Ox0.js`.

Codefend also replaces selected path text in source contents, including import strings. This is text replacement rather than module resolution. Keep references consistent and run the generated program's build and tests.

## Preserve toolchain-required names

Some names are part of a toolchain contract. For example, Arduino requires the primary `.ino` file to match its sketch folder, and bundlers expect configured entry points. Use plain stable names when the toolchain requires them; do not add a naming prefix to every file automatically. The [Arduino example](/examples/arduino) keeps the sketch structure stable.

`generation.ignore` excludes exact file/directory entry names from CLI copying. It does not accept glob patterns. `transformation.ignore` instead preserves named text during transformation.

Keep binary assets outside the CLI's processed input tree in Codefend: the CLI rewrites copied contents as UTF-8, even when only a filename was intended to change. Let your build copy binary assets unchanged.

To change which names are discovered, see [custom parser configuration](/advanced-usage/parser/custom-naming-convention).
