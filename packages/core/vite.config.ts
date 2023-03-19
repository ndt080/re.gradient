import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "url";
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  plugins: [
    typescript({
      declaration: true,
      rootDir: fileURLToPath(new URL("./src", import.meta.url)),

      compilerOptions: {
        'plugins': [
          { 'transform': 'typescript-transform-paths', 'useRootDirs': true },
          { 'transform': 'typescript-transform-paths', 'useRootDirs': true, 'afterDeclarations': true },
        ],
      },
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: 'darkvi-core',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
  },
  resolve: {
    alias: [
      { find: '@/', replacement: fileURLToPath(new URL("./src", import.meta.url)) },
    ]
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
