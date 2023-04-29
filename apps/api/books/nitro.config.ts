/* eslint-disable turbo/no-undeclared-env-vars */
import { defineNitroConfig } from 'nitropack';
export default defineNitroConfig({
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
  routeRules: {
    '/editions/**': {
      cache: {
        swr: true,
        maxAge: 86400,
      },
    },
  },
});
