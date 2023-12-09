# How it works?

### 1. Parsing Phase

Codefend parses through every word in your project's files.
This analysis targets a [specific naming convention](../basic-usage/naming-conventions/naming-conventions.md) that is <b>crucial</b> for the tool's proper functioning. Thanks to this unique parsing feature, Codefend operates seamlessly with any programming language and framework, providing effective and versatile code protection.
:::tip <b>Key Elements Analyzed:</b>

- Folders names
- Files names
- Classes names
- Functions names
- Variables names
  :::

### 2. Transformation Phase

Once Codefend identifies words that conform to the predefined pattern, it proceeds to obfuscate those particular words using different [transformation techniques](../advanced-usage/transformation//list.md).

:::tip <b>Default Transformation Technique Overview</b>
`l_fullName = l_firstName + l_lastName  ---->  Ox0 = Ox1 + Ox2`

- This technique uses a prefix specified in the configuration file: `Ox`
- It relies on the index of when each word is first detected: `0`, `1`, `2`
  :::

### 3. Generation Phase

After analyzing and transforming the words in your source code stored in memory, Codefend <b>creates a new separate directory containing the obfuscated version of your source code</b>.

Unlike other tools that directly obfuscate your final output during the build process, Codefend takes a different approach. It generates a source code from your original source code, essentially creating a hidden secret code within another secret code.

This simple but powerful change brings numerous benefits:

- Enhanced Security: Imagine a hacker manages to decompile your application. By using Codefend, you won't be building your application directly from the original source code, but from the obfuscated version. Consequently, the hacker won't gain access to your original source code.

- Multi-Layer Obfuscation: The obfuscation process occurs prior to the build process, allowing you to apply additional layers of protection to the obfuscated version of your project. You can add various uglifiers, minifiers, and obfuscators of your choice, further increasing the security of your code.
