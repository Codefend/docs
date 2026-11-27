# Code naming convention

The built-in `codeOnly` rule finds names consisting of ASCII letters followed by one or more underscore-separated alphanumeric segments. Examples include:

- `l_value`
- `f_readSensor`
- `m_camera`
- `c_UserManager`
- `node_John_Doe`

The parser's regular expression is:

```js
/([a-zA-Z]+(_[a-zA-Z0-9]+)+)/g;
```

You can mark internal names while leaving required APIs unchanged. For a fresh runtime processing this snippet alone:

```js
const l_value = 7;
console.log(l_value);
```

the output is:

```js
const Ox0 = 7;
console.log(Ox0);
```

## Optional prefixes

Prefixes can communicate the original role of a name to maintainers:

| Convention     | Example         |
| -------------- | --------------- |
| Class          | `c_UserManager` |
| Function       | `f_readSensor`  |
| Parameter      | `p_sampleCount` |
| Local variable | `l_total`       |
| Member         | `m_temperature` |

Codefend does not infer those roles. All of these names match the same underscore rule, and comments or strings containing them can also change.

The current rule and replacement engine can match parts of longer names. Use consistent casing, preserve external interfaces, and test both selected names and names that should remain unchanged. `codeOnly` also operates on path text; it does not guarantee filenames remain unchanged.

For an existing project, use the [AI migration prompt](./ai-assisted-migration) to ask a coding assistant to adopt these conventions while preserving external interfaces and updating references.

See the [Arduino](/examples/arduino) and [JavaScript bundler examples](/examples/vite) for concrete naming choices, or define a [custom naming convention](/advanced-usage/parser/custom-naming-convention).
