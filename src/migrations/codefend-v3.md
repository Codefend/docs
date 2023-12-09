# Codefend 3 Migration Guide

Follow these steps to migrate to Codefend 3:

1. Navigate to your project directory.

2. Move your existing `.codefendrc.json` file out of your project structure for backup.

3. Install the latest version of Codefend globally or as a development dependency:

   ```bash
   npm i codefend@latest -g
   ```

   or

   ```bash
   npm i codefend@latest -D
   ```

4. In your project, execute the command `codefend -i` to generate a new configuration file based on Codefend v3.

5. Re-insert all your custom configuration files, referring to the [configuration section](https://codefend.github.io/docs/references/configuration) in the docs.

6. Run `npm codefend -c` to check for warnings or errors.

7. If all errors are resolved, execute `npm codefend -o` to test the new obfuscation.
