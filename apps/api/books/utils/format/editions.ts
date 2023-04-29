import type { SupabaseClient } from '@supabase/supabase-js';
import type { Edition } from '~/types/book';

export const addAuthorsToEdition = async (supabase: SupabaseClient, edition: Edition) => {
  // Get authors from the database
  edition.authors = await Promise.all(edition.authors.map(async (author) => {
    const { data: foundAuthor, error: foundError } = await supabase.from('authors')
      .select('name')
      .eq('id', author)
      .maybeSingle();

    if (foundError)
      throw new Error(foundError.message);

    if (foundAuthor)
      return foundAuthor;
    else return null;
  }));

  return edition;
};