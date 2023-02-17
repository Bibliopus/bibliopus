export const useBook = () => {
  const config = useRuntimeConfig();

  const client = useSupabaseClient<any>();
  const { getUser } = useUser();

  const getBook = async (isbn: string) => await useFetch(
    `${config.public.booksApiUrl}/editions/${isbn}`, {
      responseType: 'json',
    },
  );

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
  return {
    getBook,
    getUserHasBook,
    addBookToUser,
  };
};
