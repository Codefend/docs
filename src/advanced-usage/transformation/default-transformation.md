# Default Transformation

The default transformation relies on the `prefix` specified in the configuration file and on the current index of the detected word's occurrence.

```json
// .codefend.json

{
  //...
  "transformation": {
    "prefix": "Ox"
    //...
  }
}
```

For example:

```
l_variable1 = l_variable2 + l_variable3
```

Gets transformed to:

```
Ox0 = Ox1 + Ox2
```

:::tip
Here, `Ox` represents the prefix, and `0`, `1`, and `2` are the respective indexes of the obfuscated words.
:::

The transformation is also applied to folder and file names, as shown in the following example:

```
├── pkg-src
│   ├── pkg-controller
│   │   ├── file-user-controller.js
```

Gets transformed to:

```
├── Ox0
│   ├── Ox1
│   │   ├── Ox2.js
```
