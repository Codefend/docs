# Pool Transformation

- Pool Transformation allows you to add unlimited custom words and inject them into your code.
- You can draw paragraphs from various sources, such as books, lyrics, dictionaries, and Lorem ipsum text.
- Your code is obfuscated and transformed into a paragraph of your choice, making it misleading to any attempt to hack or understand it easily.

:::tip Use Cases:

1. Confuse and mislead hackers by disguising the obfuscated code to appear unobfuscated at first glance.

2. Conceal the obfuscation process discreetly to avoid drawing attention, allowing for easier sharing of the project's source code without revealing its complexity.

3. Get creative and have fun using text from books as the source code, but always be mindful of potential copyright issues.

4. Express your passion for music by incorporating lyrics from your favorite songs as the source code, while being respectful of copyright laws.

:::

```json
// .codefendrc.json
{
  //...
  "transformation": {
    "pool": "I love Bananas. Bananas are my favorite fruits."
    //...
  }
}
```

Or can be a space array of strings:

```json
// .codefendrc.json
{
  //...
  "transformation": {
    "pool": [
      "I",
      "love",
      "Bananas.",
      "Bananas",
      "are",
      "my",
      "favorite",
      "fruits"
    ]
    //...
  }
}
```

For example:

```python
l_variable1 = l_variable2 + l_variable3
```

Gets transformed to:

```python
love = bananas + are
```

:::tip Notice
The letter `I` has not been used in the pool transformation because Codefend only utilizes words from the pool that consist of a minimum of three characters.
:::

Similarly, this transformation can be applied to folder and file names as well:

```json
// .codefendrc.json

{
  //...
  "transformation": {
    "pool": "I Love Bananas. Bananas are my favorite fruits."
    //...
  }
}
```

For example:

```
├── pkg-src
│   ├── pkg-controller
│   │   ├── file-user-controller.js
```

Gets transformed to:

```
├── love
│   ├── bananas
│   │   ├── are.js
```

:::tip Notice
Codefend allows duplicate words to be included in the pool; however, it will utilize each duplicate word only once during the pool transformation process.

e.g: `Bananas` duplicate word in the pool has been only used once.
:::

:::tip Notice
The words of the pool will all get transformed to lower case
and any special character in the pool will be removed.

e.g: `Bananas.` transformed to `bananas`
:::
