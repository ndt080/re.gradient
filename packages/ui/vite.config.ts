import babel from '@rollup/plugin-babel';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

const getPath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

export default defineConfig({
  build: {
    lib: {
      entry: getPath('./src/index.ts'),
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
      plugins: [babel({ babelHelpers: 'bundled' })],

    },
    minify: true,
    target: 'esnext',
  },
  resolve: {
    alias: [{ find: '@', replacement: getPath('./src') }],
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
