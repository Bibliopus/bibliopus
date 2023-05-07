/* eslint-disable turbo/no-undeclared-env-vars */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '../../../packages/ui',
  ],
  modules: [
    '@nuxtjs/supabase',
    '@vite-pwa/nuxt',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseKey: '',
      booksApiUrl: '',
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    manifest: {
      name: 'Bibliopus',
      short_name: 'Bibliopus',
      theme_color: '#1D1C16',
      icons: [
        {
          src: 'icon_192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon_512.png',
          sizes: '512x512',
          type: 'image/png',
        },

        {
          src: 'icon_512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    registerWebManifestInRouteRules: true,
    workbox: { navigateFallback: null },
  },
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
  },
  nitro: {
    preset: 'vercel',
  },
});
