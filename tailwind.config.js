/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#f9f6f7',
          100: '#f3ecee',
          200: '#e7d9de',
          300: '#d5b8c2',
          400: '#c294a4',
          500: '#aa7086',
          600: '#8c4d63',
          700: '#733e51',
          800: '#623645',
          900: '#53303c',
        },
        cream: {
          50: '#fefcf8',
          100: '#fff9ed',
          200: '#fff3d6',
          300: '#ffe7b3',
          400: '#ffd280',
          500: '#ffb74d',
          600: '#ff9d1f',
          700: '#ff8c0f',
          800: '#cc6d06',
          900: '#a65a09',
        },
        gold: {
          50: '#fbf8eb',
          100: '#f7f0d0',
          200: '#f0e3a3',
          300: '#e7cf6d',
          400: '#e0be45',
          500: '#d3a422',
          600: '#bc861d',
          700: '#9c6a1c',
          800: '#825520',
          900: '#6e471f',
        },
      },
    },
  },
  plugins: [],
};