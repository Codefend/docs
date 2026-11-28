# Code naming convention

## Recommended from 3.3.0: startWithMAndUnderscore

From **Codefend 3.3.0**, we recommend [`startWithMAndUnderscore`](/advanced-usage/parser/presets) over the `default` parser for new projects adopting the `m_` convention. It selects explicitly marked names, helping reduce unintended renaming of unrelated underscore names such as `external_value` and `LED_BUILTIN`.

The `default` parser combines broader underscore matching with hyphenated file-name matching. The new preset uses only the narrower `m_` rule. Choose this convention when you can mark the internal names whose callers you control.

Select the preset in `.codefendrc.json`:

```json
{
  "parser": {
    "name": "startWithMAndUnderscore"
  }
}
```

With version 3.3.0 or later of a bundler plugin, pass the same `parser` object in its options. This recommendation is opt-in: the CLI's generated configuration still uses `default`, and omitted plugin parser settings still use `codeOnly`.

Mark application-owned names with `m_`, regardless of their role:

- `m_value`
- `m_readSensor`
- `m_camera`
- `m_UserManager`
- `m_value2`

The preset's regular expression is:

```js
/\bm_[A-Za-z][A-Za-z0-9]*\b/g;
```

### Example: rename marked names and preserve unrelated names

With the configuration above and a fresh runtime processing this snippet alone:

```js
const external_value = 7;
function m_calculateTotal(m_tax) {
  const m_total = external_value + m_tax;
  return m_total;
}
console.log(m_calculateTotal(5));
```

the output is:

```js
const external_value = 7;
function Ox0(Ox1) {
  const Ox2 = external_value + Ox1;
  return Ox2;
}
console.log(Ox0(5));
```

Both versions print `12`. The marked function, parameter, and local variable are renamed. `external_value` and `console.log` retain their names. Generated identifiers can vary with the input and processing order.

`m_Total` and `m_value2` are selected. `m_2total`, `M_total`, and `m_total_amount` are excluded. This narrower rule leaves unrelated underscore names such as `external_value` and `LED_BUILTIN` alone. It does not infer ownership or visibility; only mark names whose consumers you control.

## Folder and file names with the CLI

The same `m_` convention can mark folder and file names when using Codefend's CLI generation workflow. With `startWithMAndUnderscore` selected, copied output can look like this:

| Source path                        | Generated path        |
| ---------------------------------- | --------------------- |
| `source/m_models/m_calculator.cjs` | `release/Ox0/Ox1.cjs` |

Both `m_models` and `m_calculator` match the rule; the `.cjs` extension stays unchanged. Matching references in source text, such as `require("./m_models/m_calculator.cjs")`, use the same mapping. Generated names depend on processing order. The source files remain unchanged.

This file/folder renaming step belongs to the core CLI's copying workflow. The Vite, Rollup, Webpack, and esbuild plugins transform contents; they leave source files in place and let the bundler control output paths and filenames. Selecting the preset in a plugin does not enable the CLI's path-renaming workflow.

Matching text inside import strings can still change during a plugin transformation. Keep import paths stable and use `transformation.ignore` to preserve matching path names when needed; the plugin does not move the referenced files to match those text changes. See [folder and file naming conventions](./folders-files-naming-convention) for the CLI workflow and names your toolchain requires.

## Existing broader conventions

The `codeOnly` preset supports broader underscore patterns. Existing projects can retain role-based prefixes such as:

| Convention     | Example         |
| -------------- | --------------- |
| Class          | `c_UserManager` |
| Function       | `f_readSensor`  |
| Parameter      | `p_sampleCount` |
| Local variable | `l_total`       |
| Member         | `m_temperature` |

Codefend does not infer those roles. These names match `codeOnly`, whose expression is `/([a-zA-Z]+(_[a-zA-Z0-9]+)+)/g`. The `startWithMAndUnderscore` preset selects only the `m_` convention.

All rules can select text in comments, strings, and paths. From 3.3.0, automatic replacement respects the selected parser's exact matches and casing. Preserve external interfaces and test both names that should change and names that should remain unchanged.

For an existing project, use the [AI migration prompt](./ai-assisted-migration) to ask a coding assistant to adopt these conventions while preserving external interfaces and updating references.

See the [Arduino](/examples/arduino) and [JavaScript bundler examples](/examples/vite) for concrete naming choices, or define a [custom naming convention](/advanced-usage/parser/custom-naming-convention).
