import { createClient } from '@supabase/supabase-js';
import { HTTPError } from '~/types/error';

export default defineEventHandler(async (event) => {
  // Fix CORS Issues for now
  event.node.res.setHeader('Access-Control-Allow-Origin', '*');

  const config = useRuntimeConfig();

  // Get query params
  const amount = +getQuery(event).amount;
  const collection = +getQuery(event).collection;

  // Create a single supabase client for interacting with your database
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  if (collection) {
    // Get covers from get_random_collection_covers function
    const { data, error } = await supabase.rpc('get_random_collection_covers', { collection_id: collection, amount: amount || 3 });

    if (error)
      throw new HTTPError(error.message, +error.code);

    if (data)
      return data;
  }
  else {
  // Get covers from random_covers view
    const { data, error } = await supabase.from('random_covers').select('cover').limit(amount || 5);

    if (error)
      throw new HTTPError(error.message, +error.code);

    if (data)
      return data;
  }
});
