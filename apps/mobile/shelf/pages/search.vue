<script setup lang="ts">
const { addToHistory, textsHistory, editionsHistory } = useSearchHistory();
const { getBook } = useBook();
const searchValue: Ref<string> = useState('search');
const isbnBook: Ref<any> = ref(null);
const searchError: Ref<any> = ref(null);

const search = async () => {
  if (!searchValue.value)
    return;

  const { data, error } = await getBook(searchValue.value);
  searchError.value = error;
  isbnBook.value = data.value;
};

watch(searchError, (error) => {
  if (!error.value) {
    addToHistory({
      type: 'edition',
      value: searchValue.value,
    });
  }
  else {
    addToHistory({
      type: 'text',
      value: searchValue.value,
    });
  }
});

watchDebounced(
  searchValue,
  search,
  { debounce: 1000, maxWait: 3000 },
);

const limitedTextsHistory = computed(() => textsHistory.value.slice(0, 5));
</script>

<template>
  <div v-if="!searchValue" class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
      <h2 class="section-title">
        Search history
      </h2>
      <ul class="flex flex-wrap gap-2 max-h-[120px] overflow-hidden">
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
    </section>
    <section class="flex flex-col gap-4">
      <h2 class="section-title">
        Found recently
      </h2>
      <ul class="flex flex-wrap gap-2 max-h-[120px] overflow-hidden">
        <!-- <li
          v-for="(edition, index) in editionsHistory"
          :key="index"
          class="max-w-[50%]"
        >
          <AtomsBookItem
            v-if="isbnBook"
            :isbn="isbnBook.isbn"
            :title="isbnBook.title"
            :authors="isbnBook.authors"
            :cover="isbnBook.cover"
          />
        </li> -->
      </ul>
    </section>
  </div>
  <section v-if="searchValue" class="flex flex-col gap-4">
    <h2 class="section-title">
      Results
    </h2>
    <AtomsBookItem
      v-if="isbnBook"
      :isbn="isbnBook.isbn"
      :title="isbnBook.title"
      :authors="isbnBook.authors"
      :cover="isbnBook.cover"
    />
    <div v-else-if="searchError">
      No results
    </div>
    <div v-else>
      Loading...
    </div>
  </section>
</template>
