interface HistoryEntry {
  type: 'edition' | 'text'
  value: string
}

export const useSearchHistory = () => {
  const history = useLocalStorage<HistoryEntry[]>('search-history', []);
  const addToHistory = (entry: HistoryEntry) => {
    // Check if the last history entry of same type has the same value
    const lastOfSameType = history.value.find(e => e.type === entry.type);
    if (lastOfSameType && lastOfSameType.value === entry.value)
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
