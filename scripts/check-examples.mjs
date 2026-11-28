import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
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
const scratch = realpathSync.native(tmpdir());
mkdirSync(scratch, { recursive: true });
const temporary = mkdtempSync(join(scratch, "example-check-"));

function run(args, cwd) {
  const result = spawnSync(process.execPath, args, { cwd, encoding: "utf8" });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

try {
  const nodeExample = join(temporary, "nodejs");
  mkdirSync(nodeExample);
  cpSync(
    join(root, "src/resources/nodejs/standalone/source"),
    join(nodeExample, "source"),
    { recursive: true },
  );
  cpSync(
    join(root, "src/resources/nodejs/standalone/codefend.config.json"),
    join(nodeExample, ".codefendrc.json"),
  );
  const original = readFileSync(join(nodeExample, "source/index.cjs"), "utf8");
  const expected = "Hello, Ada Lovelace!";
  assert.equal(run(["source/index.cjs"], nodeExample), expected);
  run([cli, "--check"], nodeExample);
  run([cli, "--obfuscate"], nodeExample);
  assert.equal(run(["release/index.cjs"], nodeExample), expected);
  assert.equal(
    readFileSync(join(nodeExample, "source/index.cjs"), "utf8"),
    original,
  );
  assert.doesNotMatch(
    readFileSync(join(nodeExample, "release/index.cjs"), "utf8"),
    /\bm_[A-Za-z]/,
  );
  assert.equal(
    readFileSync(join(nodeExample, "release/index.cjs"), "utf8").replaceAll(
      "\r\n",
      "\n",
    ),
    readFileSync(
      join(root, "src/resources/nodejs/standalone/obfuscated/index.cjs"),
      "utf8",
    ).replaceAll("\r\n", "\n"),
    "Stale Node.js source preview; run npm run examples:update",
  );

  const arduino = join(temporary, "arduino");
  mkdirSync(join(arduino, "source/PulseBlink"), { recursive: true });
  const originalSketch = readFileSync(
    join(root, "src/resources/arduino/snippets/original/PulseBlink.ino"),
    "utf8",
  );
  writeFileSync(
    join(arduino, "source/PulseBlink/PulseBlink.ino"),
    originalSketch,
  );
  cpSync(
    join(root, "src/resources/arduino/codefend.config.json"),
    join(arduino, ".codefendrc.json"),
  );
  run([cli, "--check"], arduino);
  run([cli, "--obfuscate"], arduino);
  const generated = readFileSync(
    join(arduino, "release/PulseBlink/PulseBlink.ino"),
    "utf8",
  );
  const documented = readFileSync(
    join(root, "src/resources/arduino/snippets/obfuscated/PulseBlink.ino"),
    "utf8",
  );
  assert.equal(
    generated.replaceAll("\r\n", "\n"),
    documented.replaceAll("\r\n", "\n"),
  );
  assert.equal(
    readFileSync(join(arduino, "source/PulseBlink/PulseBlink.ino"), "utf8"),
    originalSketch,
  );
  assert.deepEqual(readdirSync(join(arduino, "release")), ["PulseBlink"]);
  assert.deepEqual(readdirSync(join(arduino, "release/PulseBlink")), [
    "PulseBlink.ino",
  ]);
  for (const name of [
    "setup",
    "loop",
    "pinMode",
    "digitalWrite",
    "millis",
    "LED_BUILTIN",
    "OUTPUT",
    "HIGH",
    "LOW",
  ]) {
    assert.ok(generated.includes(name), `Arduino symbol lost: ${name}`);
  }
  assert.doesNotMatch(generated, /\bm_[A-Za-z]/);
  console.log(
    "Node.js original/generated execution and Arduino source transformation passed.",
  );
  console.log(
    "Board compilation is a separate Arduino CLI check; hardware behavior is not tested here.",
  );
} finally {
  assert.ok(
    temporary.startsWith(scratch + sep),
    "Cleanup must stay inside the docs scratch directory",
  );
  if (existsSync(temporary)) rmSync(temporary, { recursive: true });
}
