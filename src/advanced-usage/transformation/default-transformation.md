# Default transformation

The default transformation assigns a configured prefix followed by a numeric index. The default prefix is `Ox`.

Merge this fragment into your configuration:

```json
{
  "transformation": {
    "prefix": "Ox"
  }
}
```

For a fresh runtime processing this snippet alone:

```js
const l_value = 7;
console.log(l_value);
```

the output is:

```js
const Ox0 = 7;
console.log(Ox0);
```

Other detected names receive their own generated names. The exact numbering depends on processing order and the other transformation settings. It is not derived from the number of occurrences of a word.

Selected names in paths and source references can also be replaced. Keep required filenames and external interfaces stable, and inspect the generated result. Choose a prefix that is valid for your language and does not collide with existing names; current Codefend does not provide complete collision detection.
