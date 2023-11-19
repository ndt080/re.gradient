import AnimatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        light: 'hsl(0, 0%, 100%)',
        accent: 'hsl(129, 100%, 42%)',
        // accent: 'hsl(176, 100%, 36%)',
      },
    },
  },
  plugins: [AnimatePlugin],
};
