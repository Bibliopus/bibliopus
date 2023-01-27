/* eslint-disable turbo/no-undeclared-env-vars */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
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
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,

  },
  googleFonts: {
    families: {
      'DM Serif Display': true,
      'Inter': true,
    },
  },
});
