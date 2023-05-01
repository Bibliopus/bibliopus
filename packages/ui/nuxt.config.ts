// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@vueuse/nuxt',
  ],
  css: [
    '@bibliopus/ui/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Manrope: true,
    },
  },
  vite: {
    server: {
      hmr: {
        port: (Number(process.env.PORT) + 1000) || undefined,
      },
    },
  },
});
