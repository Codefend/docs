import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  buildParserOptions,
  buildRuntimeOptions,
  buildTransformationOptions,
  obfuscate,
} from "codefend";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const examples = join(root, "src/resources/languages");
const scratch = realpathSync.native(tmpdir());
mkdirSync(scratch, { recursive: true });
const temporary = mkdtempSync(join(scratch, "language-check-"));
const require = createRequire(import.meta.url);
const cli = resolve(dirname(require.resolve("codefend")), "../bin/index.js");
const results = [];

try {
  for (const language of readdirSync(examples).sort()) {
    const directory = join(examples, language);
    const metadata = JSON.parse(
      readFileSync(join(directory, "example.json"), "utf8"),
    );
    const config = JSON.parse(
      readFileSync(join(directory, "codefend.config.json"), "utf8"),
    );
    assert.equal(config.generation.inputDir, "source");
    assert.equal(config.generation.outputDir, "release");
    assert.deepEqual(
      buildTransformationOptions(config.transformation).pool,
      [],
    );
    assert.ok(metadata.sourceFiles.includes(metadata.entry));
    assert.equal(config.parser.name, "startWithMAndUnderscore");
    assert.equal(config.parser.regexList, undefined);
    const parser = buildParserOptions(config.parser);
    assert.equal(parser.error, undefined);
    const transformation = buildTransformationOptions(config.transformation);
    const runtime = buildRuntimeOptions();
    const fixture = join(temporary, language);
    mkdirSync(fixture);
    cpSync(join(directory, "source"), join(fixture, "source"), {
      recursive: true,
    });
    writeFileSync(join(fixture, ".codefendrc.json"), JSON.stringify(config));
    const originals = new Map();
    for (const file of metadata.sourceFiles) {
      assert.ok(
        !file.includes("/") && !file.includes("\\"),
        "Example source names must stay flat",
      );
      originals.set(file, readFileSync(join(fixture, "source", file), "utf8"));
    }
    for (const command of ["--check", "--obfuscate"]) {
      const result = spawnSync(process.execPath, [cli, command], {
        cwd: fixture,
        encoding: "utf8",
        timeout: 15000,
      });
      assert.ifError(result.error);
      assert.equal(
        result.status,
        0,
        `${language}: ${result.stderr || result.stdout}`,
      );
    }
    const generated = new Map();
    for (const file of readdirSync(join(fixture, "source")).sort()) {
      const input = originals.get(file);
      assert.equal(typeof input, "string");
      const output = readFileSync(join(fixture, "release", file), "utf8");
      assert.equal(readFileSync(join(fixture, "source", file), "utf8"), input);
      assert.equal(
        output,
        obfuscate(input, transformation, parser.data, runtime),
      );
      const preview = readFileSync(join(directory, "obfuscated", file), "utf8");
      assert.equal(
        output.replaceAll("\r\n", "\n"),
        preview.replaceAll("\r\n", "\n"),
        `Stale source preview: ${language}/${file}; run npm run examples:update`,
      );
      assert.doesNotMatch(output, /\bm_[A-Za-z][A-Za-z0-9]*\b/, language);
      assert.notEqual(
        output,
        input,
        `No selected names in ${language}/${file}`,
      );
      generated.set(file, output);
    }
    const combined = Array.from(generated.values()).join("\n");
    for (const symbol of metadata.preservedSymbols ?? [])
      assert.ok(combined.includes(symbol), `${language}: ${symbol}`);
    const inverse = new Map(
      Object.entries(runtime.map).map(([before, after]) => [after, before]),
    );
    assert.equal(
      inverse.size,
      Object.keys(runtime.map).length,
      `Mapping collision: ${language}`,
    );
    for (const [file, output] of generated) {
      const restored = output.replace(
        /\b(?:ox|Ox)\d+\b/g,
        (name) => inverse.get(name) ?? name,
      );
      assert.equal(
        restored,
        originals.get(file),
        `Unintended text change: ${language}/${file}`,
      );
    }
    const result = {
      language: metadata.language,
      transformedFiles: generated.size,
      selectedNames: inverse.size,
      runtime: "not run (toolchain-specific)",
    };
    if (language === "sql") {
      const { DatabaseSync } = await import("node:sqlite");
      for (const sql of [
        originals.get(metadata.entry),
        generated.get(metadata.entry),
      ]) {
        const database = new DatabaseSync(":memory:");
        try {
          const row = database.prepare(sql).get();
          assert.deepEqual(Object.keys(row), ["total"]);
          assert.equal(String(row.total), metadata.expectedOutput);
        } finally {
          database.close();
        }
      }
      result.runtime = "original/generated query executed in SQLite";
    }
    if (language === "htmlcss") {
      const html = generated.get("index.html");
      const css = generated.get("styles.css");
      const className = html.match(/class="([^"]+)"/)[1];
      assert.ok(css.includes(`.${className} {`));
      assert.ok(html.includes(`>${metadata.expectedOutput}</p>`));
      assert.ok(html.includes('href="styles.css"'));
      result.runtime =
        "HTML/CSS class and file references checked; browser not run";
    }
    results.push(result);
  }
  if (process.env.CODEFEND_EXAMPLE_RESULTS) {
    writeFileSync(
      process.env.CODEFEND_EXAMPLE_RESULTS,
      JSON.stringify(results, null, 2) + "\n",
    );
  }
  console.log(
    `Verified actual Codefend CLI transformations, filenames, original preservation, and inverse mappings for ${results.length} language examples.`,
  );
  console.log(
    "SQLite queries executed and HTML/CSS references checked. Other native compilation/execution requires the language toolchains.",
  );
} finally {
  assert.ok(
    temporary.startsWith(scratch + sep),
    "Cleanup must stay in docs scratch directory",
  );
  rmSync(temporary, { recursive: true });
}
