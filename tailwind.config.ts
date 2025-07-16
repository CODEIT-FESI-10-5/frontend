/** @type {import('tailwindcss').Config} */

const pxToRem = require('tailwindcss-preset-px-to-rem');
module.exports = {
  presets: [pxToRem],
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    remDivider: 16,
    extend: {},
  },
  plugins: [],
};
