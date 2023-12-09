# Parser

Codefend uses regex patterns to find words for obfuscation in your code, folders, and files.

```json
// .codefendrc

{
  "generation": {
   ...
  },

  "transformation": {
    ....
  },
  "debug": {
   ...
  },
  "parser": {
    "regexList": [
      {
        "name": "main",
        "value": "([a-zA-Z]+(_[a-zA-Z0-9]+)+)"
      },
      {
        "name": "file",
        "value": "((cmp|lib)+(-[a-zA-Z0-9]+)+)"
      }
    ]
  }
}
```

:::tip Understanding the Impact of Regex Names in Obfuscation Statistics

In the obfuscation process, regex names play a crucial role. Although these names do not affect parsing, they serve for statistical analysis at the end to determine <b>which words have been parsed by each regex</b>.

This information provides a <b>detailed breakdown</b> of the obfuscation process, allowing you to understand how each regex contributes to the project's overall transformation.

It also enables you to apply different <b>transformation techniques</b> in case essential words were unnecessarily obfuscated, potentially disrupting the compilation process.
:::

You have the flexibility to customize your regex usage according to your needs. Whether you want to add multiple ones, use only one, or modify existing, the choice is entirely up to you.

Remember, altering the regex also means modifying the naming convention in your project. For further details, you can refer to the information provided in the [custom naming convention](custom-naming-convention) section.
