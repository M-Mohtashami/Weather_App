/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-full': {
      transform: 'rotateY(3.142rad)',
    },
  });
});
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './main.js',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    rotateY: {
      full: '3.142rad',
    },
    fontFamily: {
      rubik: ['Rubik', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'dark-blue': '#00106B',
        'light-blue': '#0464AF',
        'lighter-blue': '#6AAFFE',
        sun: '#FBE05E',
      },
      keyframes: {
        pulse: {
          '0%': { opacity: '1' },
          '25%': { opacity: '0.75' },
          '50%': { opacity: '0.5' },
          '75%': { opacity: '0.75' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('flowbite/plugin'), rotateY],
};
