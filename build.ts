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

async function buildCss() {
  console.log("🎨 Building CSS...");
  const proc = Bun.spawn([
    "postcss",
    "index.css",
    "-o",
    "dist/bundle.css",
  ]);
  await proc.exited;
}

async function buildLibrary() {
  console.log("🏗️  Building Advanced Table Library...");
  await buildCss();

  const entrypoints = ["./components/index.ts"]; // Corrected from "./index.ts" to be more standard

  // Build ESM
  await build({
    entrypoints,
    outdir: "./dist/esm",
    format: "esm",
    target: "browser",
    sourcemap: "external",
    minify: true,
    external: ["react", "react-dom"], // Added externals to prevent bundling dependencies
    naming: "[dir]/[name].mjs",
  });

  // Build CJS
  await build({
    entrypoints,
    outdir: "./dist/cjs",
    format: "cjs",
    target: "browser",
    sourcemap: "external",
    minify: true,
    external: ["react", "react-dom"], // Added externals
    naming: "[dir]/[name].cjs",
  });

  // Generate type declarations
  console.log("📝 Generating type declarations...");
  const proc = Bun.spawn([
    "tsc",
    "--declaration",
    "--emitDeclarationOnly",
    "--outDir",
    "dist/types",
  ]);
  await proc.exited;

  console.log("✅ Build complete!");
}

buildLibrary().catch(console.error);
