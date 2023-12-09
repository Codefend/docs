## 3. Obfuscation

To start obfuscating your code, run the following command in your project directory, where you have the configuration file:

```bash
codefend -o
```

For more information about this step, please refer to this [guide](../../../basic-usage/obfuscation.md).

To see a detailed list of all available commands, check out this [section](../../../references/commands.md).

#### Output

<!--@include: ../resources/nodejs/structure/obfuscated.md-->

::: code-group
<<< @/resources/nodejs/snippets/obfuscated/index.js [Ox4.js]
<<< @/resources/nodejs/snippets/obfuscated/user.js [Ox1.js]
<<< @/resources/nodejs/snippets/obfuscated/constants.js [Ox3.js]
:::
<ClientOnly>
<OutputTerminal :items="config.obfuscation.terminal"/>
</ClientOnly>
For more information on the different transformation techniques available and how to apply them, please check the transformation [guide](../advanced-usage/transformation/list.md) in the advanced usage section.
