import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import postcssPrefixSelector from "postcss-prefix-selector";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ outDir: "dist", insertTypesEntry: true }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssPrefixSelector({
          transform: function (
            prefix: any,
            selector: string,
            prefixedSelector: string
          ) {
            if (
              selector === ":root" ||
              selector === ":host" ||
              selector === "@theme"
            ) {
              return "*";
            }
            return selector;
          },
        }),
      ],
    },
  },
  build: {
    lib: {
      entry: "src/index.ts", // Adjust this to your main export file
      name: "TableComponent",
      formats: ["es", "cjs"], // ESM and CommonJS support
      fileName: (format) => (format === "es" ? "index.mjs" : "index.js"), // These match package.json
    },
    rollupOptions: {
      // Don't bundle external dependencies (keep peer deps external)
      external: [
        "react",
        "react-dom",
        "@tanstack/react-table",
        "@tanstack/react-virtual",
        "@dnd-kit/core",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-popover",
        "@radix-ui/react-select",
      ],
      output: {
        assetFileNames: "[name].[ext]",
      },
    },
    cssCodeSplit: true, // remains for css splitting
    sourcemap: true, // recommended for library consumers
    outDir: "dist",
    emptyOutDir: true,
  },
});
