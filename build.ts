import { join } from "path";
import { build } from "bun";
import { readdir, stat } from "fs/promises";

async function getAllTsFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const items = await readdir(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      files.push(...(await getAllTsFiles(fullPath)));
    } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function buildLibrary() {
  console.log("🏗️  Building Advanced Table Library...");

  const entrypoints = ["./index.ts"];

  // Build ESM
  await build({
    entrypoints,
    outdir: "./dist",
    format: "esm",
    target: "esnext",
    sourcemap: "external",
    minify: true,
  });

  // Build CJS
  await build({
    entrypoints,
    outdir: "./dist",
    format: "cjs",
    target: "esnext",
    sourcemap: "external",
    minify: true,
  });

  // Generate type declarations
  console.log("📝 Generating type declarations...");
  const proc = Bun.spawn([
    "tsc",
    "--declaration",
    "--emitDeclarationOnly",
    "--outDir",
    "dist",
  ]);
  await proc.exited;

  console.log("✅ Build complete!");
}

buildLibrary().catch(console.error);
