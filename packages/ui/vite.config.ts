import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'darkvi-ui',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['@darkvi/core'],
      output: {
        globals: {
          '@darkvi/core': 'Darkvi',
        },
      },
    },
    minify: true,
    target: 'esnext',
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./public', import.meta.url)),
      },
    ],
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
