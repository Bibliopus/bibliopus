/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    fontFamily: {
      serif: ['"DM Serif Display"'],
      sans: ['"Inter"'],
    },
    extend: {
      colors: {
        "dune-50": "#F8F6F5",
        "dune-100": "#E8E4DF",
        "dune-200": "#D0C9BF",
        "dune-300": "#B0A898",
        "dune-400": "#8F8672",
        "dune-500": "#746C58",
        "dune-600": "#5C5645",
        "dune-700": "#4B473A",
        "dune-800": "#3E3B31",
        "dune-900": "#2A2822",
        "dune-950": "#1D1C16",
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp'),
  ],
};
