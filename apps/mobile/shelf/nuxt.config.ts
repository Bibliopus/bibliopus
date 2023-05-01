/* eslint-disable turbo/no-undeclared-env-vars */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '../../../packages/ui',
  ],
  modules: [
    '@nuxtjs/supabase',
  ],
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
  nitro: {
    preset: 'vercel',
  },
});
