/* eslint-disable turbo/no-undeclared-env-vars */
import { defineNitroConfig } from 'nitropack';
import errorHandler from './error';

export default defineNitroConfig({
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
  routeRules: {
    '/editions/**': {
      cache: {
        maxAge: 3600,
      },
    },
    '/covers/**': {
      cache: {
        maxAge: 3600,
      },
    },
  },
  errorHandler: '~/error',
  devErrorHandler: errorHandler,
});
