---
title: SQL (SQLite) source obfuscation
description: Use Codefend with SQL (SQLite) to rename application-owned names, preserve external contracts, and compare the original and generated result.
---

# SQL (SQLite) source obfuscation

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

Rename internal common-table-expression names in a read-only SQL query. This example targets SQLite and keeps the public result column `total` unchanged.

Install the SQLite command-line shell and [Node.js/Codefend](/get-started/installation). The query uses an in-memory database and creates no persistent schema.

## 1. Create the source

In a new project directory, install Codefend:

```sh
npm install --global codefend
```

Create `source/main.sql`:

<<< @/resources/languages/sql/source/main.sql{sql}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/sql/obfuscated/main.sql{sql}

The query should still return `42` in the public `total` column. Generated identifier numbers can change when the source or Codefend version changes.

The `m_` names belong to this example. Public output and external API names remain unchanged.

## 2. Configure selected names

Create `.codefendrc.json` alongside the `source` directory:

<<< @/resources/languages/sql/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

The lowercase `ox` prefix produces names such as `ox0`; the default empty pool avoids a limited replacement dictionary. The plain `main.sql` filename does not match this rule.

`release` must be a disposable sibling of `source`. Codefend removes existing output before generation. Keep this input text-only, with build products and dependencies outside it.

## 3. Compare original and generated output

Run from the project root:

```sh
sqlite3 :memory: ".read source/main.sql"
codefend --obfuscate
sqlite3 :memory: ".read release/main.sql"
```

Both executions should print:

```text
42
```

See [SQLite common table expressions](https://www.sqlite.org/lang_with.html) and [reading SQL files](https://www.sqlite.org/cli.html#reading_sql_from_a_file) for the language's execution model.

## Preserve external names

Keep persistent table/column names, stored procedure names, placeholders, and result columns consumed by callers stable. Renaming query aliases is different from migrating a database schema. Other database dialects need their own execution checks. Codefend does not hide SQL or data from the database server.

Codefend matches and replaces text, including text in strings or comments. The preset does not infer language syntax, visibility, or external data contracts. See [troubleshooting](/distribution/troubleshooting) before applying the convention to a larger project.

Browse the other [language and build examples](/examples/list).

## Add Codefend to your workflow

Run Codefend before query validation or packaging the query with your application. Execute the generated query against a test database and check its values and public result-column names. Keep actual schema and migration contracts unchanged.

```sh
codefend --obfuscate
sqlite3 :memory: ".read release/main.sql"
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
