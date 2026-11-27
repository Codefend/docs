# Naming conventions

Codefend selects text using regular expressions. Its built-in conventions cover:

- [Code names](code-naming-convention), such as `l_temperature` and `f_readSensor`.
- [Folder and file names](folders-files-naming-convention), such as `pkg-source` and `file-sensor`.

To adopt code naming conventions in an existing project, use the [AI migration guide and copyable prompt](ai-assisted-migration).

Choose `codeOnly`, `fileOnly`, or `default` in the [parser settings](/advanced-usage/parser/overview) to select the corresponding rules. All selected rules operate on both source contents and path text. For example, `codeOnly` can still match an underscore name in a filename; it does not guarantee that every path is preserved.

Mark names you own. Preserve names required by libraries, entry points, external APIs, serialized data, or other systems outside the transformed project. The [Arduino example](/examples/arduino) demonstrates keeping required sketch names and API calls unchanged.

You can define a [custom naming convention](/advanced-usage/parser/custom-naming-convention) when the built-in rules select too much. Test both transformed names and names that must remain unchanged. Renaming more text does not establish stronger security or guarantee a working program.
