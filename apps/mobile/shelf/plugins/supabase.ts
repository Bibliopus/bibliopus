import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin((_) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

  // eslint-disable-next-line no-console
  console.log(supabase);

  return {
    provide: {
      supabase,
    },
  };
});
