# Static transformation

Static mappings assign explicit replacement text to chosen names. They let separately built components agree on a name when both use the same mapping.

Merge this fragment into your configuration:

```json
{
  "transformation": {
    "static": [
      { "from": "l_name", "to": "fieldA" },
      { "from": "l_age", "to": "fieldB" }
    ]
  }
}
```

Input:

```js
const user = { l_name: "Ada", l_age: 37 };
console.log(user.l_name);
```

Output:

```js
const user = { fieldA: "Ada", fieldB: 37 };
console.log(user.fieldA);
```

Static targets are used as supplied, including case and whitespace. The prefix is not added. Use valid, collision-free names and avoid accidental trailing spaces.

An explicit mapping is added to the replacement map even if the discovery parser did not select that word. Source contents and path text can both be affected. In Codefend, regex metacharacters in mapping keys and overlapping names can produce incorrect replacement; use simple distinct identifiers and verify the output.

## Shared data formats

If client and server source both use `l_name` and the same static mapping, they can agree on `fieldA` in their generated code. This changes the field name; it does not encrypt its value, authenticate the request, or protect network traffic. Third-party clients and stored data may still depend on the original field names, so treat such a change as a data-contract migration.

Keep transport security and authentication in your normal application stack. Codefend does not replace either.
