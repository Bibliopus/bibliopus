export const useSearchHistory = () => {
  const history = useLocalStorage<string[]>('search-history', []);

  const addToHistory = (isbn: string) => history.value.unshift(isbn);

  return {
    history,
    addToHistory,
  };
};
