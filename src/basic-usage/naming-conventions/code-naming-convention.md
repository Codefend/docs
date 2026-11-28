# Code naming convention

For new CLI projects, we recommend [`startWithMAndUnderscore`](/advanced-usage/parser/presets), available in Codefend 3.3.0 or later. Mark application-owned names with `m_`, regardless of their role:

- `m_value`
- `m_readSensor`
- `m_camera`
- `m_UserManager`
- `m_value2`

The preset's regular expression is:

```js
/\bm_[A-Za-z][A-Za-z0-9]*\b/g;
```

You can mark internal names while leaving required APIs unchanged. For a fresh runtime processing this snippet alone:

```js
const m_value = 7;
console.log(m_value);
```

the output is:

```js
const Ox0 = 7;
console.log(Ox0);
```

Select it in `.codefendrc.json`:

```json
{
  "parser": {
    "name": "startWithMAndUnderscore"
  }
}
```

`m_Total` and `m_value2` are selected. `m_2total`, `M_total`, and `m_total_amount` are excluded. This narrower rule leaves unrelated underscore names such as `external_value` and `LED_BUILTIN` alone. It does not infer ownership or visibility; only mark names whose consumers you control.

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
