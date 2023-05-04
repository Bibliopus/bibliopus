import { createClient } from '@supabase/supabase-js';

import type { Author, Edition } from '~/types/book';
import { getIdsFromAuthors } from '~/utils/format/authors';
import { addAuthorsToEditions, orderEditionsFromIsbnList } from '~/utils/format/editions';
import { getGoogleData } from '~/utils/providers/google';
import { mergeProvidersData } from '~/utils/providers/merge';
import { getOpenLibraryData } from '~/utils/providers/open-library';

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

export default defineEventHandler(async (event): Promise<Edition[]> => {
  // Fix CORS Issues for now
  event.node.res.setHeader('Access-Control-Allow-Origin', '*');

  const config = useRuntimeConfig();

  // Create a single supabase client for interacting with your database
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);

  // Get query param amount
  const isbn = getQuery(event).isbn as string;

  // If there is no isbn, send an error
  if (!isbn)
    sendError(event, new Error('No isbn provided'));

  // Parse isbn seperated by ,
  const isbns = isbn.split(',');

  // Get the editions for the given isbn
  const { data: inDBEditions, error } = await supabase.from('editions')
    .select('*')
    .in('isbn', isbns);

  // If there is an error, send it to the client
  if (error)
    sendError(event, new Error(error.message));

  // Map editions that are found
  const foundIsbns = inDBEditions.map(edition => edition.isbn);

  // Filter isbns that are not found
  const notFoundIsbns = isbns.filter(isbn => !foundIsbns.includes(isbn));

  // If all editions are found, return them
  if (notFoundIsbns.length <= 0) {
    const orderedEditions = orderEditionsFromIsbnList(inDBEditions as Edition[], isbns);
    return await addAuthorsToEditions(supabase, orderedEditions) as Edition[];
  }

  // If editions are not found, get the data from the providers
  else {
    try {
      // For each isbn, get the data from the providers
      const booksData = await Promise.all(notFoundIsbns.map(async (isbn) => {
        const [googleData, openlibraryData] = await Promise.all([
          await getGoogleData(isbn),
          await getOpenLibraryData(isbn),
        ]);

        // Merge the data from the providers
        return mergeProvidersData([
          emptyEdition,
          { isbn },
          googleData,
          openlibraryData,
        ]);
      }));

      // Get authors id from each books in an array
      const authors = await Promise.all(booksData.map(async (bookData) => {
        return await getIdsFromAuthors(supabase, bookData.authors as Author[]);
      }));

      // Insert the new editions into the database
      const { data: addedEditions, error } = await supabase.from('editions').insert(booksData.map((bookData, index) => {
        return {
          ...bookData,
          authors: authors[index],
        };
      })).select();

      if (error)
        throw new Error(error.message);

      const orderedEditions = orderEditionsFromIsbnList(inDBEditions.concat(addedEditions) as Edition[], isbns);
      return await addAuthorsToEditions(supabase, orderedEditions) as Edition[];
    }
    catch (err) {
      // console.log(err);
      sendError(event, err, true);
    }
  }
});
