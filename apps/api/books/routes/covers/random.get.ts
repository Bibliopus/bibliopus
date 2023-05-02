import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  // Fix CORS Issues for now
  event.node.res.setHeader('Access-Control-Allow-Origin', '*');

  const config = useRuntimeConfig();

  // Get query param amount
  const amount = +getQuery(event).amount;

  // Create a single supabase client for interacting with your database
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Get covers from random_covers view
  const { data, error } = await supabase.from('random_covers').select('cover').limit(amount || 5);

  if (error)
    sendError(event, new Error(error.message));

  if (data)
    return data;
});