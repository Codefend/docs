# Static Transformation

The static transformation in Codefend allows you to customize specific words by defining their original names `from` and the desired custom names `to` in the configuration file. Unlike the default transformation, the static transformation `ignores the general prefix` and uses the custom `to` name for obfuscation. All other detected words in the code will still be obfuscated using the default transformation based on the configuration's prefix and their occurrences. This feature provides a way to precisely control the obfuscation of certain words while keeping the default behavior for the rest of the code.

:::tip Use Cases:

Enhanced Network Security: Encrypt the communication between your backend and frontend projects, making it more challenging for reverse engineering attempts to intercept network requests.

```json
// .codefend.json
{
  //...
  "transformation": {
    "static": [
      { "from": "l_user", "to": "mJS8NWNh6K1x " },
      { "from": "l_name", "to": "rU8Ux9N4338e " },
      { "from": "l_age", "to": "C15xFG1fs7X8 " }
    ]
    //...
  }
}
```

By applying Codefend, your request and response models will be transformed into an obfuscated format, as illustrated below:

Original Request/Response Model:

```json
{
  "user": {
    "name": "John",
    "age": 27
  }
}
```

Request/Response Model following naming convention to be obfuscated:

```json
{
  "l_user": {
    "l_name": "John",
    "l_age": 27
  }
}
```

Obfuscated Request/Response Model:

```json
{
  "mJS8NWNh6K1x": {
    "rU8Ux9N4338e": "John",
    "C15xFG1fs7X8": 27
  }
}
```

In both your frontend and backend code, you will utilize `l_name` and `l_age` as properties for your user object, ensuring enhanced security in your network communications.
:::

```json
// .codefend.json

{
  //...
  "transformation": {
    "static": [
      {
        "from": "l_variable1",
        "to": "customVariableName "
      }
    ]
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
customVariableName  = Ox1 + Ox2
```

:::tip
In this example, notice how `l_variable1` has been transformed to `customVariableName `, while the other detected variables have been transformed using the default transformation.
:::

:::tip
The `from` of a static word must be detected by the `parser`, so it should follow the naming convention specified in the configuration.
:::

The same transformation is applied to the Folders and File names,
For example:

```json
// .codefend.json

{
  //...
  "transformation": {
    "static": [
      {
        "from": "pkg-src",
        "to": "src "
      }
    ]
    //...
  }
}
```

```
├── pkg-src
│   ├── pkg-controller
│   │   ├── file-user-controller.js
```

Gets transformed to:

```
├── src
│   ├── Ox1
│   │   ├── Ox2.js
```
