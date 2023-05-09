<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Search' });

const { addToHistory, textsHistory, editionsHistory } = useSearchHistory();
const { searchEditions, getEdition, getEditions } = useEdition();

const searchValue: Ref<string> = useState('search');
const isbnBook: Ref<any> = ref(null);
const searchResults: Ref<any> = ref(null);
const searchPending = ref(true);

const search = async () => {
  getEdition(searchValue.value).then((res) => {
    searchPending.value = false;
    isbnBook.value = res.data.value;
  });
  searchEditions(searchValue.value).then((res) => {
    searchPending.value = false;
    searchResults.value = res.data.value;
  });
  addToHistory({
    type: 'text',
    value: searchValue.value,
  });
};

const { data: editionsFromHistory, error: historyError, pending: historyPending } = editionsHistory.value.length > 0
  ? await getEditions(editionsHistory.value.map(edition => edition.value))
  : { data: ref([]), error: ref(new Error('Nothing found yet.')) };

const limitedTextsHistory = computed(() => textsHistory.value.slice(0, 5));

if (searchValue.value)
  search();

const searchAndIsbnResults = computed(() => {
  if (isbnBook.value)
    return [isbnBook.value, ...searchResults.value];
  return searchResults.value;
});

watchDebounced(
  searchValue,
  search,
  { debounce: 1000, maxWait: 3000 },
);

watch(searchValue, () => {
  searchPending.value = true;
});
</script>

<template>
  <div>
    <div v-if="!searchValue" class="flex flex-col gap-8">
      <section class="flex flex-col gap-4">
        <h2 class="section-title">
          Search history
        </h2>
        <ul
          v-if="limitedTextsHistory && limitedTextsHistory.length > 0"
          class="flex flex-wrap gap-2 max-h-[120px] overflow-hidden"
        >
          <li
            v-for="(text, index) in limitedTextsHistory"
            :key="index"
            class="max-w-[50%]"
          >
            <AtomsTag @click="searchValue = text.value">
              {{ text.value }}
            </AtomsTag>
          </li>
        </ul>
        <AtomsError v-else>
          No search done yet.
        </AtomsError>
      </section>
      <section class="flex flex-col gap-y-4">
        <h2 class="section-title">
          Found recently
        </h2>
        <ul
          v-if="editionsHistory && editionsHistory.length > 0"
          class="flex flex-wrap gap-y-4"
        >
          <li v-if="historyPending" class="w-full">
            <AtomsLoading />
          </li>
          <li
            v-for="(edition, index) in editionsFromHistory"
            :key="index"
            class="w-full"
          >
            <AtomsBookItem
              v-if="edition"
              :isbn="edition.isbn"
              :title="edition.title"
              :authors="edition.authors"
              :cover="edition.cover"
            />
          </li>
          <li v-if="historyError" class="w-full">
            <AtomsError>
              {{ historyError.message }}
            </AtomsError>
          </li>
        </ul>
        <AtomsError v-else>
          No book found yet.
        </AtomsError>
      </section>
    </div>
    <section v-if="searchValue" class="flex flex-col gap-y-4">
      <h2 class="section-title">
        Results
      </h2>
      <div v-if="searchPending">
        <AtomsLoading />
      </div>
      <div
        v-else-if="searchAndIsbnResults && searchAndIsbnResults.length > 0"
        class="flex flex-col gap-y-4"
      >
        <AtomsBookItem
          v-for="(book, index) in searchAndIsbnResults"
          :key="index"
          :isbn="book.isbn"
          :title="book.title"
          :authors="book.authors"
          :cover="book.cover"
        />
      </div>
      <div v-else>
        <AtomsError>
          No book found for {{ searchValue }}.
        </AtomsError>
      </div>
    </section>
  </div>
</template>
