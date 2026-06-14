import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7fb',
          100: '#e8edf7',
          500: '#3b6fe0',
          600: '#2f59c2',
          700: '#27479a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
