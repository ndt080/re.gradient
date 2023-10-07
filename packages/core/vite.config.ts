/// <reference types="vitest" />

import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'darkvi-core',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    minify: true,
    target: 'esnext',
  },
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
