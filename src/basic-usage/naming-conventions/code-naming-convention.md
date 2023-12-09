# Code Naming convention

To ensure <b>detection</b> by Codefend's parser, it is <b>necessary</b> for the words that need to be obfuscated to follow this format:

### The word must include an underscore `_` positioned in the middle.

:::tip Example
You have the flexibility to use either camelCase or PascalCase, and both are acceptable. However, it's important to follow the specified naming convention in addition to the chosen case style:

- `MyVariable` -> `l_MyVariable`
- `myVariable` -> `l_myVariable`
  :::

```javascript
------------------------------ Before Obfuscation ------------------------------

class l_Calculator {
  l_sum(l_firstNumber, l_secondNumber) {
    const l_results = l_firstNumber + l_secondNumber;
    return l_results;
  }
}
```

```javascript
------------------------------ After Obfuscation ------------------------------
class Ox0 {
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
    return Ox4;
  }
}
```

:::tip This naming convention can also be applied inside HTML, CSS, and JS files or even React, Vue, Angular, and Svelte components... Here's another example:
:::

```html
------------------------------ Before Obfuscation ------------------------------
<html>
  <head>
    <style>
      .l_red {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="l_red">l_secret</div>
    <div class="l_red">Hello World</div>
  </body>
</html>
```

```html
------------------------------ After Obfuscation ------------------------------
<html>
  <head>
    <style>
      .Ox1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="Ox1">Ox0</div>
    <div class="Ox1">Hello World</div>
  </body>
</html>
```

## Structured naming convention <Badge type="tip" text="optional" />

:::tip Given that the underscore should be in the middle of the word, an alternative option is to adopt a more structured naming convention, which can enhance the organization of your code:

1. Class names: Begin with "c\_" followed by the descriptive name.
   - Example: `c_UserManager`, `c_DataProcessor`, `c_Logger`
2. Function names: Begin with "f\_" followed by the descriptive name.
   - Example: `f_getUserData`, `f_calculateTotal`, `f_validateInput`
3. Parameter names: Begin with "p\_" followed by the descriptive name.
   - Example: `function doSomething(p_inputData) { ... }`
   - Example: `function processUserData(p_userInfo) { ... }`
4. Local variable names: Begin with "l\_" followed by the descriptive name.
   - Example: `function calculateSum() { let l_totalSum = 0; ... }`
   - Example: `function processArray() { let l_index = 0; ... }`

By following this convention, you can easily identify the purpose and scope of different elements in your code. The underscore in the middle of the word, along with the specified prefixes, will provide a clear and consistent naming pattern, contributing to code readability and maintainability.
:::

```javascript
------------------------------ Before Obfuscation ------------------------------

class c_Calculator {
  f_sum(p_firstNumber, p_secondNumber) {
    const l_results = p_firstNumber + p_secondNumber;
    return l_results;
  }
}
```

```javascript
------------------------------ After Obfuscation ------------------------------
class Ox0 {
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
    return Ox4;
  }
}
```

<b>This is the only rule and the only requirement </b> that Codefend needs from you as a programmer. Simply ensure that the words you want to be obfuscated contain an underscore `_` in the middle, following the specified format, and Codefend will handle the rest of the obfuscation process seamlessly for any code written in any language.
