# Ignore Transformation

The ignore transformation in Codefend enables you to exclude specific words from being obfuscated. These words, once identified by the parser, are ignored and not obfuscated.

:::tip Use Cases:
In case the `_` or `-` was in the variable <b>name</b> or the <b>value</b> of:

1. **Environment variables**

2. **API keys and credentials**

3. **Constants**

4. **External variables of a dependency that would break if changed**

5. **Specific folder names, function names, class names, or critical elements of external libraries could lead to errors during the project's execution or building process.** Visit [troubleshooting](../../distribution/troubleshooting.md) section for more info.

:::

```json
// .codefend.json
{
  //...
  "transformation": {
    "ignore": ["l_variable1"]
    //...
  }
}
```

For example:

```python
l_variable1 = l_variable2 + l_variable3
```

Gets transformed to:

```python
l_variable1  = Ox1 + Ox2
```

:::tip
In this example, notice how `l_variable1` has been ignored and kept as is, while the other detected variables have been transformed using the default transformation.
:::

:::tip
The words of the `ignore` array must be detected by the `parser`, so they should follow the naming convention specified in the configuration.
:::

The same transformation is applied to the Folders and File names,
For example:

```json
// .codefend.json
{
  //...
  "transformation": {
    "ignore": ["node_modules"]
    //...
  }
}
```

```
├── pkg-src
│   ├── pkg-controller
│   │   ├── file-user-controller.js
└── node_modules
```

Gets transformed to:

```
├── Ox0
│   ├── Ox1
│   │   ├── Ox2.js
└── node_modules
```

:::tip
In the previous example, pay attention to the file name `node_modules`. Although it follows the naming convention of the code rather than typical file naming, there's no need to worry. Codefend will handle it just like any other variable detected, using the specified naming convention for obfuscation, even if it originally referred to a file name instead of a word within the code.
:::
