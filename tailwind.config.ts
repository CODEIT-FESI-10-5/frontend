/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("tailwindcss-preset-px-to-rem")],
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
