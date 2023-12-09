# Obfuscation

:::tip Prerequisites

- Configuration file created
- Naming convention of Folder names, File names, and/or Code.
  :::
  :::tip Important
  Make sure to follow the naming convention to ensure effective obfuscation with Codefend. Failure to do so may result in no obfuscation being applied to your project. Therefore, it's essential to use the recommended naming guidelines to achieve the desired level of code protection.
  :::

To start obfuscating your code, run the following command in your project directory, where you have the configuration file:

```bash
codefend -o
```

Optionally, you can include it in the scripts section of your `package.json`:

```json
// package.json
{
  "scripts": {
    "obfuscate": "codefend -o"
  }
}
```

this way you can executed with the following command:

```bash
npm run obfuscate
```

:::tip
Running this command will duplicate and obfuscate your project, creating a new directory `/codefend-output`. Inside this directory, you will find the obfuscated version of your project. Importantly, <b>the original code in your project directory will remain completely unaffected.</b>
:::

To see a detailed list of all available commands, check out this [section](../references/commands.md).
