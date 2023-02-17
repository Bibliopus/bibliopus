export const useBook = () => {
  const config = useRuntimeConfig();

  const client = useSupabaseClient<any>();
  const { getUser } = useUser();

  const getBook = async (isbn: string) => await useFetch<any>(
    `${config.public.booksApiUrl}/editions/${isbn}`, {
      responseType: 'json',
    },
  );

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
        .select('id, first_name, last_name')
        .in('id', userIds?.map(item => item.user) || []);

      return users;
    });

  return {
    getBook,
    getUserHasBook,
    addBookToUser,
    getUsersWithBook,
    getUserBooks,
  };
};
