/* eslint-disable turbo/no-undeclared-env-vars */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    '../../../packages/ui',
  ],
  runtimeConfig: {
    public: {
      shelfUrl: '',
    },
  },
  nitro: {
    preset: 'vercel',
  },
});
