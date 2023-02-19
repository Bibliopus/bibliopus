import { defineNitroConfig } from 'nitropack';
export default defineNitroConfig({
  routeRules: {
    '/editions/**': {
      cache: {
        swr: true,
        maxAge: 86400,
      },
    },
  },
});
