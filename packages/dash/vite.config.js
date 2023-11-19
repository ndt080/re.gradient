import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    visualizer({
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html',
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 're.gradient_dash',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['@re.gradient/core', 'dashjs'],
      output: {
        globals: {
          '@re.gradient/core': 'ReGradientCore',
          dashjs: 'DashJs',
        },
      },
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
});
