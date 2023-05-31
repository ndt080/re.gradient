import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [babel()],
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
