interface HistoryEntry {
  type: 'edition' | 'text'
  value: string
}

export const useSearchHistory = () => {
  const history = useLocalStorage<HistoryEntry[]>('search-history', []);
  const addToHistory = (entry: HistoryEntry) => {
    if (history.value[0] && entry.value === history.value[0].value)
      return;
    if (entry && entry.value && entry.type && entry.value !== '')
      history.value.unshift(entry);
  };

  const editionsHistory = computed(() => history.value.filter(entry => entry.type === 'edition'));
  const textsHistory = computed(() => history.value.filter(entry => entry.type === 'text'));

  return {
    history,
    addToHistory,
    editionsHistory,
    textsHistory,
  };
};
