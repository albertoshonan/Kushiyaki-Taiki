/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#9a001d',
          dark: '#7a0017',
          light: '#b50023',
        },
        cream: {
          DEFAULT: '#f8f1e8',
          dark: '#e8ddd0',
          light: '#fdf8f2',
        },
        decorative: '#d3c9bd',
      },
      fontFamily: {
        serif: ['"Shippori Mincho"', 'serif'],
        display: ['"Inter"', 'sans-serif'],
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};
