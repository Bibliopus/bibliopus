import { createClient } from '@supabase/supabase-js';
import { HTTPError } from '~/types/error';

export default defineEventHandler(async (event) => {
  // Fix CORS Issues for now
  event.node.res.setHeader('Access-Control-Allow-Origin', '*');

  const config = useRuntimeConfig();

  // Create a single supabase client for interacting with your database
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Get the editions for the given isbn
  const { data, error } = await supabase.from('editions')
    .select('cover')
    .eq('isbn', event.context.params.isbn).maybeSingle();

  // If there is an error, send it to the client
  if (error)
    throw new HTTPError(error.message, +error.code);

  // If the edition is found, return it
  if (data)
    return data;
});
