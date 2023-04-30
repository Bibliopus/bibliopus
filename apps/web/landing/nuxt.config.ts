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
      shelfUrl: '',
    },
  },
  googleFonts: {
    families: {
      Manrope: true,
    },
  },
  nitro: {
    preset: 'vercel',
  },
});
