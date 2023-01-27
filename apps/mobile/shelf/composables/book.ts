export const useBook = () => {
  const config = useRuntimeConfig();
  const getBook = async (isbn: string) => await useFetch(
    `${config.public.booksApiUrl}/editions/${isbn}`, {
      responseType: 'json',
    },
  );

  return {
    getBook,
  };
};
