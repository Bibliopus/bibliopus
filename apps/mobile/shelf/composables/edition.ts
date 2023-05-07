export const useEdition = () => {
  const config = useRuntimeConfig();

  const client = useSupabaseClient<any>();
  const { getUser } = useUser();

  // Get functions for editions use the api instead of supabase
  // because we need to be able to call providers if we don't have
  // the edition in our database

  const getEdition = async (isbn: string) => await useFetch<any>(
    `${config.public.booksApiUrl}/editions/${isbn}`, {
      responseType: 'json',
    },
  );

  const getEditions = async (isbns: string[]) => await useFetch<any[]>(
    `${config.public.booksApiUrl}/editions?isbn=${isbns.join(',')}`, {
      responseType: 'json',
    },
  );

  const searchEditions = async (query: string) =>
    await useAsyncData(`search-${query}`, async () => {
      const { data } = await client
        .from('editions_search')
        .select()
        .textSearch('fts', query, {
          type: 'websearch',
          config: 'english',
        });
      return data;
    });

  const getEditionsFromCollection = async (id: number) =>
    await useAsyncData(`collection-editions-${id}`, async () => {
      const { data: isbns } = await client
        .from('collection_editions')
        .select('edition')
        .eq('collection', id);
      const { data } = await client
        .from('editions')
        .select()
        .in('isbn', isbns?.map(item => item.edition) || []);
      return data;
    });

  const getUserRecentlyAddedEditions = async (id: string) =>
    await useAsyncData(`user-recently-added-editions-${id}`, async () => {
      const { data } = await client.rpc('get_user_editions', { user_id: id })
        .order('created_at', { ascending: false })
        .limit(3);
      return data;
    });

  const getUserBooks = async (id: string) =>
    await useAsyncData(`books-${id}`, async () => {
      const { data } = await client
        .from('user-books')
        .select('isbn')
        .eq('user', id);
      return data;
    });

  const getUserHasBook = async (isbn: string) =>
    await useAsyncData(`has-book-${isbn}`, async () => {
      const { data } = await client
        .from('user-books')
        .select('id')
        .eq('user', (await getUser()).data.value?.id)
        .eq('isbn', isbn);
      return !!data?.length;
    });

  const addBookToUser = async (isbn: string) => {
    await client
      .from('user-books')
      .insert([
        { isbn, user: (await getUser()).data.value?.id },
      ]);
  };

  const getUsersWithBook = async (isbn: string) =>
    await useAsyncData(`users-with-book-${isbn}`, async () => {
      const { data: userIds } = await client
        .from('user-books')
        .select('user')
        .eq('isbn', isbn);

      const { data: users } = await client
        .from('profiles')
        .select('id, first_name, last_name, email')
        .in('id', userIds?.map(item => item.user) || []);

      return users;
    });

  return {
    getEdition,
    getEditions,
    searchEditions,
    getEditionsFromCollection,
    getUserRecentlyAddedEditions,

    // Old
    getUserHasBook,
    addBookToUser,
    getUsersWithBook,
    getUserBooks,
  };
};
