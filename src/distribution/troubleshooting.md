# Troubleshooting

In case of failed run or build processes, it is possible that the failure is caused by the obfuscation of certain reserved words associated with your language, framework or dependencies.

## Solution:

1. To display a comprehensive list of the words being obfuscated, set `stats=true` in the `.codefendrc.json` configuration file. This will enable the generation of detailed statistics regarding the obfuscated words during the obfuscation process.
2. From the provided list, identify the words that should be exempted from the obfuscation process, ensuring they are not obfuscated.
3. To exclude specific words from the obfuscation process, add those words to the `ignore` array within the `.codefendrc.json` configuration file under the `transformation` section.
4. Continuously re-run or re-build the obfuscated version of your project until all run or build errors are resolved. This iterative process ensures that any issues stemming from the obfuscation are addressed and eliminated.
5. Deploy the successfully built obfuscated version of your project.
