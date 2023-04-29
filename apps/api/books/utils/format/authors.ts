import type { SupabaseClient } from '@supabase/supabase-js';
import type { Author } from '~/types/book';

// Find or insert the authors into the database
export const getIdsFromAuthors = async (supabase: SupabaseClient, authors: Author[]) =>
  await Promise.all(authors.map(async (author) => {
  // Find the author in the database
    const { data: foundAuthor, error: foundError } = await supabase.from('authors')
      .select('*')
      .eq('name', author.name)
      .maybeSingle();

    if (foundError)
      throw new Error(foundError.message);

    if (foundAuthor) { return foundAuthor.id; }
    else {
    // If the author is not found, insert it into the database
      const { data: newAuthor, error: newError } = await supabase.from('authors').insert([
        { name: author.name },
      ]).select().maybeSingle();

      if (newError)
        throw new Error(newError.message);

      if (newAuthor)
        return newAuthor.id;
    }
  }));
