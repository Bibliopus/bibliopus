/* eslint-disable turbo/no-undeclared-env-vars */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseKey: '',
      booksApiUrl: '',
    },
  },
  googleFonts: {
    families: {
      'DM Serif Display': true,
      'Inter': true,
    },
  },
  nitro: {
    preset: 'vercel',
  },
});
