import { createClient } from '@supabase/supabase-js';

import type { Author, Edition } from '~/types/book';
import { HTTPError } from '~/types/error';
import { getIdsFromAuthors } from '~/utils/format/authors';
import { addAuthorsToEdition } from '~/utils/format/editions';
import { getGoogleData } from '~/utils/providers/google';
import { mergeProvidersData } from '~/utils/providers/merge';
import { getOpenLibraryData } from '~/utils/providers/open-library';
import { validateIsbn } from '~/utils/validate/isbn';

const emptyEdition: Edition = {
  isbn: null,
  title: null,
  description: null,
  authors: null,
  publisher: null,
  pages: null,
  release: null,
  cover: null,
};

export default defineEventHandler(async (event): Promise<Edition> => {
  // Fix CORS Issues for now
  event.node.res.setHeader('Access-Control-Allow-Origin', '*');

  if (!event.context.params.isbn || !validateIsbn(event.context.params.isbn))
    throw new HTTPError('No isbn provided or is invalid', 400);

  const config = useRuntimeConfig();

  // Create a single supabase client for interacting with your database
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Get the editions for the given isbn
  const { data, error } = await supabase.from('editions')
    .select('*')
    .eq('isbn', event.context.params.isbn).maybeSingle();

  // If there is an error, send it to the client
  if (error)
    throw new HTTPError(error.message, +error.code);

  // If the edition is found, return it
  if (data) { return await addAuthorsToEdition(supabase, data as Edition) as Edition; }
  // If the edition is not found, get the data from the providers
  else {
    const [googleData, openlibraryData] = await Promise.all([
      await getGoogleData(event.context.params.isbn),
      await getOpenLibraryData(event.context.params.isbn),
    ]);

    // Merge the data from the providers
    const bookData = mergeProvidersData([
      emptyEdition,
      { isbn: event.context.params.isbn },
      googleData,
      openlibraryData,
    ]);

    // Find or insert the authors into the database
    const authors = await getIdsFromAuthors(supabase, bookData.authors as Author[]);

    // Insert the new edition into the database
    const { data, error } = await supabase.from('editions').insert([{
      ...bookData,
      authors,
    }]).select().maybeSingle();

    if (error)
      throw new HTTPError(error.message, +error.code);

    return await addAuthorsToEdition(supabase, data as Edition) as Edition;
  }
});
