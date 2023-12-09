## 2. Applying naming convention <Badge type="info" text="Required" />

#### Project Structure

Simply add the prefix `pkg-` to each folder and `file-` to each file that requires the action. Remember to exclude any folders and files that should not undergo this process, and don't forget to update your imports inside your code.

<!--@include: ../resources/nodejs/structure/naming-convention.md-->

#### Code

Simply add the prefix `l_` to each variable that need to be obfuscated.

::: code-group
<<< @/resources/nodejs/snippets/naming-convention/index.js [file-index.js]
<<< @/resources/nodejs/snippets/naming-convention/user.js [file-user.js]
<<< @/resources/nodejs/snippets/naming-convention/constants.js [file-constants.js]
:::

:::warning Caution: It's not possible to obfuscate all variables and functions.

Be sure to avoid adding the prefix to variables and functions that are not defined in your source code, like those from 3rd party dependencies.

For example, in the code above, we added the prefix "l\_" to the variable "fs" because it's defined in our files, but we didn't add the prefix to "writeFileSync" since it's defined in the external library "fs".

:::
