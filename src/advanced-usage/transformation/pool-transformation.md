# Pool transformation

A pool supplies candidate replacement names in place of prefix-generated names. It accepts a space-separated string or an array.

Configuration fragment:

```json
{
  "transformation": {
    "pool": ["alpha", "bravo", "charlie"]
  }
}
```

For a fresh runtime processing this snippet alone:

```js
const m_first = 1;
const m_other = 2;
console.log(m_first + m_other);
```

the output is:

```js
const alpha = 1;
const bravo = 2;
console.log(alpha + bravo);
```

The option builder lowercases pool words, removes underscores and special characters, removes leading digits, discards entries shorter than three characters, and deduplicates the resulting list. For example, `Bananas.` and `BANANAS` both normalize to `bananas`.

Choose names valid for your target language. Normalization does not eliminate language keywords or prevent collisions with existing identifiers. The CLI's pool checks and API normalization are also different steps; simple identifier-only array entries are easier to review.

## Current multi-file limitation

Codefend can reuse a pool name for different words across successive calls sharing a runtime. It can also change an already emitted fallback mapping if a later call supplies more pool values. These issues can break references across source files or output chunks.

The example above demonstrates a single call only. Keep `pool: []` in the runnable project examples and use the default transformation until your complete workflow has verified mapping stability. A successful configuration check does not test this behavior.

When the pool runs out, unresolved words use prefix-generated fallback names. The current allocation limitations still apply; supplying a larger pool alone does not establish safe cross-file allocation. See [troubleshooting](/distribution/troubleshooting).
