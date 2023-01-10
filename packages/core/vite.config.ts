import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [],
  build: {
    target: "esnext",
    minify: "terser",
    lib: {
      entry: "src/main.ts",
      name: "darkvi-core",
      formats: ["es", "umd", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: srcPath }],
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
