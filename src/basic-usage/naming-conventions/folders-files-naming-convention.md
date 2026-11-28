# Folder and file naming convention

## Recommended from 3.3.0: m_ names with the CLI

With Codefend 3.3.0 or later, the recommended [`startWithMAndUnderscore` preset](/advanced-usage/parser/presets) also selects `m_` names in paths. Use the same configuration as for [code names](./code-naming-convention):

```json
{
  "parser": {
    "name": "startWithMAndUnderscore"
  }
}
```

For example, the CLI can copy `source/m_models/m_calculator.cjs` to `release/Ox0/Ox1.cjs`. The folder and file name are selected, and the extension is preserved. Matching import/path text in the copied contents uses the same mapping. Generated names depend on processing order; the source tree remains unchanged.

Use lowercase `m_`, then an ASCII letter followed by letters or digits. Names such as `m_models` and `m_calculator` match; `m_2calculator` and `m_calculator_utils` do not.

This renaming happens in the core CLI's generation workflow. Bundler plugins do not provide this filesystem copying/renaming step: the bundler controls its output paths. Matching import strings can still be transformed as text, so preserve any matching path names with `transformation.ignore` when they must stay unchanged.

## Existing hyphenated conventions

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
