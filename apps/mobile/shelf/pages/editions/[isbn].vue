<script setup lang="ts">
import { useImage } from '@vueuse/core';
import type { RealtimeChannel } from '@supabase/supabase-js';
const client = useSupabaseClient();

definePageMeta({
  middleware: ['auth'],
});

const { getEdition } = useEdition();
const {
  getReadCollection,
  getReadingCollection,
  getToReadCollection,
  toggleEditionInCollection,
  isEditionInCollection,
} = useCollection();
const { addToHistory } = useSearchHistory();

const route = useRoute();
const errorMessage = ref('');

const { data, error } = await getEdition(route.params.isbn as string);
const book = data as Ref<any>;
const isCoverLoading = (book.value && book.value.cover) ? useImage({ src: book.value.cover }).isLoading : ref(false);

if (error.value) { errorMessage.value = 'Sorry, we failed to fetch the book you are searching for.'; }
else if (book.value) {
  addToHistory({
    type: 'edition',
    value: route.params.isbn as string,
  });
}

const authorsNames = computed(() => book.value.authors.join(', '));

const { data: readCollection } = await getReadCollection();
const { data: readingCollection } = await getReadingCollection();
const { data: toReadCollection } = await getToReadCollection();

const { data: isRead, refresh: readRefresh, pending: readPending } = readCollection.value
  ? await isEditionInCollection(readCollection.value.id, book.value.isbn)
  : { data: ref(false), refresh: () => {}, pending: ref(false) };
const { data: isReading, refresh: readingRefresh, pending: readingPending } = readingCollection.value
  ? await isEditionInCollection(readingCollection.value.id, book.value.isbn)
  : { data: ref(false), refresh: () => {}, pending: ref(false) };
const { data: isToRead, refresh: toReadRefresh, pending: toReadPending } = toReadCollection.value
  ? await isEditionInCollection(toReadCollection.value.id, book.value.isbn)
  : { data: ref(false), refresh: () => {}, pending: ref(false) };

const toggleInCollection = async (collection: {
  id: any
  name: any
  user: any
} | null) => {
  if (book.value && collection) {
    const inCollection = await toggleEditionInCollection(collection.id, book.value.isbn);
    if (collection.name === 'Read')
      isRead.value = inCollection;
    else if (collection.name === 'Reading')
      isReading.value = inCollection;
    else if (collection.name === 'To read')
      isToRead.value = inCollection;
  }
};
</script>

<template>
  <div>
    <AtomsError v-if="errorMessage">
      {{ errorMessage }}
    </AtomsError>
    <div v-else-if="book" class="flex flex-col gap-4">
      <section class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <div
            v-if="isCoverLoading"
            class="flex w-[180px] h-[270px] rounded bg-dune-800 group-hover:bg-600 animate-pulse"
          />
          <img
            v-else-if="book.cover"
            class="aspect-[180/270] rounded w-[180px] object-cover"
            :src="book.cover"
            alt="#"
          >
          <div
            v-else
            class="flex items-center justify-center w-[180px] h-[270px] rounded bg-dune-800 group-hover:bg-dune-600 transition-colors"
          >
            <Icon
              name="ph-image"
              size="28"
              class="text-dune-900 group-hover:800"
            />
          </div>
          <span class="text-dune-300 text-sm text-center line-clamp-1">#{{ book.isbn }}</span>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-dune-300 text-center line-clamp-1">
            {{ authorsNames }}
          </p>
          <h2 class="text-dune-50 text-4xl text-center line-clamp-2">
            {{ book.title }}
          </h2>
        </div>
      </section>
      <section class="flex w-full gap-2">
        <AtomsCollectionButton
          icon="ph-book-bookmark"
          :active="isRead ?? false"
          :pending="readPending"
          @click="toggleInCollection(readCollection)"
        >
          To read
        </AtomsCollectionButton>
        <AtomsCollectionButton
          icon="ph-book-open"
          :active="isReading ?? false"
          :pending="readingPending"
          @click="toggleInCollection(readingCollection)"
        >
          Reading
        </AtomsCollectionButton>
        <AtomsCollectionButton
          icon="ph-book"
          :active="isToRead ?? false"
          :pending="toReadPending"
          @click="toggleInCollection(toReadCollection)"
        >
          Read
        </AtomsCollectionButton>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="section-title">
          Description
        </h3>
        <AtomsSeeMore>
          <span v-html="book.description" />
        </AtomsSeeMore>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="section-title">
          Present in
        </h3>
        <AtomsCollectionItem
          user="Livres de "
          name="Zinzin"
          :covers="[
            'https://covers.openlibrary.org/b/id/258357-L.jpg',
            'https://covers.openlibrary.org/b/id/7885536-L.jpg',
            'https://covers.openlibrary.org/b/id/13008986-L.jpg',
          ]"
        />
      </section>
    </div>
  </div>
</template>
