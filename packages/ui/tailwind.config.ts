import type { Config } from 'tailwindcss';

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    '@bibliopus/ui/**/*.{js,vue,ts}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Manrope"'],
    },

    spacing: {
      px: '1px',
      0: '0',
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '30px',
      7: '35px',
      8: '40px',
      9: '45px',
      10: '50px',
    },
    borderRadius: {
      none: '0',
      sm: '5px',
      DEFAULT: '10px',
      md: '15px',
      lg: '20px',
      full: '9999px',
    },
    extend: {
      colors: {
        'dune-50': '#F8F6F5',
        'dune-100': '#E8E4DF',
        'dune-200': '#D0C9BF',
        'dune-300': '#B0A898',
        'dune-400': '#8F8672',
        'dune-500': '#746C58',
        'dune-600': '#5C5645',
        'dune-700': '#4B473A',
        'dune-800': '#3E3B31',
        'dune-900': '#2A2822',
        'dune-950': '#1D1C16',
      },
    },
  },
} satisfies Config;
