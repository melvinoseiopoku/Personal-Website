import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "dist");

const rootFiles = [
  "CNAME",
  "favicon.ico",
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const entries = await readdir(root, { withFileTypes: true });
for (const entry of entries) {
  if (entry.isFile() && entry.name.endsWith(".html")) {
    await cp(join(root, entry.name), join(outDir, entry.name));
  }
}

for (const file of rootFiles) {
  await cp(join(root, file), join(outDir, file));
}

await cp(join(root, "assets"), join(outDir, "assets"), { recursive: true });

console.log("Static site copied to dist/");
