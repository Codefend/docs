# Obfuscating a Node js Project <Badge type="info" text="8 minutes read" />

:::tip Prerequisites

- Familiarity with the command line
- Install [Node.js](https://nodejs.org/) version 16.0 or higher
  :::

## Project overview

#### Original Project Structure

The project is composed of 3 small files for the simplicity of the example: `index.js`, `user.js`, and `constants.js`

```diff

├── lib
│   ├── user.js
├── utils
│   ├── constants.js
├── index.js
├── node_modules
├── package.json
└── package-lock.json
```

#### Original Code

```javascript
//index.js
const fs = require("fs");
const { fullName } = require("./lib/user");
const constants = require("./utils/constants");

const sayHi = (firstName, lastName) => {
  const name = fullName(firstName, lastName);
  fs.writeFileSync("sayHi.txt", name);
  console.log(`${constants.greeting} ${name}!`);
};

sayHi();
```

```javascript
//user.js
const fullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};
module.exports = { fullName };
```

```javascript
//constants.js
const greeting = "hi";
module.exports = { greeting };
```

## 1. Setup

### Installation

You can find more information about the installation process in the [installation](../get-started/installation.md) guide.

### Configuration file

Create a new file `.codefendrc.json` in the root level of your project:

```diff

├── lib
│   ├── user.js
├── utils
│   ├── constants.js
├── index.js
├── node_modules
├── package.json
├── package-lock.json
+   .codefendrc.json

```

Open `.codefendrc.json` and paste the following content:

```json
// .codefendrc.json

{
  "generation": {
    "inputDir": ".",
    "outputDir": "codefend-output",
    "ignore": [
      "codefend-output",
      ".rc.json",
      "node_modules",
      ".git",
      ".github",
      ".gitignore",
      ".vscode",
      "build",
      "dist",
      "README.md"
    ]
  },

  "transformation": {
    "prefix": "Ox",
    "static": [],
    "ignore": ["node_modules"],
    "pool": []
  },
  "debug": {
    "stats": true
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

Refer to the configuration [guide](../basic-usage/generating-configuration.md) or [reference](../references/configuration.md) for additional details on Codefend configuration.

## 2. Applying naming convention

#### Project Structure

Simply add the prefix `pkg-` to each folder and `file-` to each file that requires the action. Remember to exclude any folders and files that should not undergo this process, and don't forget to update your imports inside your code.

```diff

+ ├── pkg-lib
+ │   ├── file-user.js
+ ├── pkg-utils
+ │   ├── file-constants.js
+ ├── file-index.js
  ├── node_modules
  ├── package.json
  └── package-lock.json
```

#### Code

Simply add the prefix `l_` to each variable that need to be obfuscated.

```javascript
//file-index.js
const l_fs = require("fs");
const { l_fullName } = require("./pkg-lib/file-user");
const l_constants = require("./pkg-utils/file-constants");

const l_sayHi = (l_firstName, l_lastName) => {
  const l_name = l_fullName(l_firstName, l_lastName);
  l_fs.writeFileSync("sayHi.txt", l_name);
  console.log(`${l_constants.l_greeting} ${l_name}!`);
};

l_sayHi();
```

```javascript
//file-user.js
const l_fullName = (l_firstName, l_lastName) => {
  return `${l_firstName} ${l_lastName}`;
};
module.exports = { l_fullName };
```

```javascript
//file-constants.js
const l_greeting = "hi";
module.exports = { l_greeting };
```

:::warning Caution: It's not possible to obfuscate all variables and functions.

Be sure to avoid adding the prefix to variables and functions that are not defined in your source code, like those from 3rd party dependencies.

For example, in the code above, we added the prefix "l\_" to the variable "fs" because it's defined in our files, but we didn't add the prefix to "writeFileSync" since it's defined in the external library "fs".

:::

## 3. Obfuscation

To start obfuscating your code, run the following command in your project directory, where you have the configuration file:

```bash
codefend -o
```

For more information about this step, please refer to this [guide](../basic-usage/obfuscation.md).

To see a detailed list of all available commands, check out this [section](../references/commands.md).

#### Output

```diff

+ ├── Ox0
+ │   ├── Ox1.js
+ ├── Ox2
+ │   ├── Ox3.js
+ ├── Ox4.js
  ├── node_modules
  ├── package.json
  └── package-lock.json
```

```javascript
//file-index.js
const Ox5 = require("fs");
const { Ox6 } = require("./Ox0/Ox1");
const Ox7 = require("./Ox2/Ox3");

const Ox8 = (Ox9, Ox10) => {
  const Ox11 = Ox6(Ox9, Ox10);
  Ox5.writeFileSync("sayHi.txt", Ox11);
  console.log(`${Ox7.Ox12} ${Ox11}!`);
};

Ox8();
```

```javascript
//file-user.js
const Ox6 = (Ox9, Ox10) => {
  return `${Ox9} ${Ox10}`;
};
module.exports = { Ox6 };
```

```javascript
//file-constants.js
const Ox12 = "hi";
module.exports = { Ox12 };
```

For more information on the different transformation techniques available and how to apply them, please check the transformation [guide](../advanced-usage/transformation/list.md) in the advanced usage section.

## 4. Distribution

#### Troubleshooting, Building, and Deployment

After successfully obfuscating your code, you'll have two versions: the original source code and the obfuscated one.

To ensure the obfuscated code works just like the original, run it and perform thorough testing. If you encounter any issues, refer to the [troubleshooting guide](../distribution/troubleshooting.md). Once you're confident it's working as expected, proceed with building and deploying the obfuscated code. This will create a protected version that you can share without revealing your original source code.

For more detailed instructions on building and deploying, check out this [section](../distribution/build-and-deployment.md).
