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
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const cli = resolve(dirname(require.resolve("codefend")), "../bin/index.js");
const resources = join(root, "src/resources");
const languages = join(resources, "languages");
const scratch = realpathSync.native(tmpdir());
mkdirSync(scratch, { recursive: true });
const temporary = mkdtempSync(join(scratch, "preview-update-"));
const examples = readdirSync(languages).map((language) => {
  const directory = join(languages, language);
  return {
    name: language,
    source: join(directory, "source"),
    config: join(directory, "codefend.config.json"),
    output: join(directory, "obfuscated"),
  };
});
examples.push(
  {
    name: "nodejs",
    source: join(resources, "nodejs/standalone/source"),
    config: join(resources, "nodejs/standalone/codefend.config.json"),
    output: join(resources, "nodejs/standalone/obfuscated"),
  },
  {
    name: "arduino",
    source: join(resources, "arduino/snippets/original"),
    config: join(resources, "arduino/codefend.config.json"),
    output: join(resources, "arduino/snippets/obfuscated"),
    sketch: true,
  },
);

try {
  for (const example of examples) {
    const directory = join(temporary, example.name);
    const config = JSON.parse(readFileSync(example.config, "utf8"));
    const destination = example.sketch
      ? join(directory, "source/PulseBlink")
      : join(directory, "source");
    mkdirSync(directory);
    cpSync(example.source, destination, { recursive: true });
    writeFileSync(join(directory, ".codefendrc.json"), JSON.stringify(config));
    const result = spawnSync(process.execPath, [cli, "--obfuscate"], {
      cwd: directory,
      encoding: "utf8",
      timeout: 15000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, `${example.name}: ${result.stderr}`);
    const generated = example.sketch
      ? join(directory, "release/PulseBlink")
      : join(directory, "release");
    mkdirSync(example.output, { recursive: true });
    for (const file of readdirSync(generated)) {
      writeFileSync(
        join(example.output, file),
        readFileSync(join(generated, file), "utf8").replaceAll("\r\n", "\n"),
      );
    }
  }
  console.log(
    `Updated ${examples.length} source previews using the actual Codefend CLI. No files were staged.`,
  );
} finally {
  assert.ok(
    temporary.startsWith(scratch + sep),
    "Cleanup must stay within the docs scratch directory",
  );
  rmSync(temporary, { recursive: true });
}
