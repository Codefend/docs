# Custom Naming convention

:::tip Encouraging collaboration in the community
We advise sticking with the default regex provided, as it offers a solid starting point for most cases. However, if you come across a new and more potent regex that could simplify the process for developers using Codefend, we highly encourage you to adopt it and share it with the community. Your contribution can enhance the obfuscation experience for everyone and make the tool even more powerful and user-friendly. Let's collaborate and make obfuscation easier and more effective together!

:::

Although it is not recommended, you have the flexibility to customize Codefend's parser according to your specific requirements, granting you the ability to modify the naming convention used for detection.

However, it is important to proceed with caution and be aware that making changes to the parser carries inherent risks.

This can be accomplished by adjusting the regex list in the configuration file to your requirements:

```json
// .codefendrc.json

{
...
  "parser": {
    "regexList": [
      {
        "name": "myFirstCustomRegex",
        "value": "([a-zA-Z]+(_[a-zA-Z0-9]+)+)"
      },
      {
        "name": "mySecondCustomRegex",
        "value": "((cmp|lib)+(-[a-zA-Z0-9]+)+)"
      }
    ]
  }
}
```

If you encounter any run or build failures, the [Troubleshooting](../../distribution/troubleshooting.md) section is available to provide guidance and support. Please refer to this section for assistance in resolving any issues you may encounter during the execution or building of your project.
