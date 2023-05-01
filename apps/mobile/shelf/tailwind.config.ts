import type { Config } from 'tailwindcss';
import config from '@bibliopus/ui/tailwind.config';

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    '../../../packages/ui/**/*.{js,vue,ts}',
  ],
  theme: config.theme,
} satisfies Config;
