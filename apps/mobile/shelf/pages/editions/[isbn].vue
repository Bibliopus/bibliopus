<script setup lang="ts">
import { useImage } from '@vueuse/core';
import type { Ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const errorMessage = ref('');

const {
  getBook,
  getUsersWithBook,
} = useBook();

const { data, error } = await getBook(route.params.isbn as string);
const book = data as Ref<any>;
const isCoverLoading = book.value.cover ? useImage({ src: book.value.cover }).isLoading : ref(false);

if (error.value)
  errorMessage.value = 'Failed to fetch the book you are searching for.';

const { data: usersWithBook } = await getUsersWithBook(route.params.isbn as string);

const authorsNames = computed(() => book.value.authors.map(
  (author: { name: string }) => author.name,
).join(', '));
</script>

<template>
  <div class="flex flex-col gap-4">
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
      <AtomsCollectionButton icon="ph-book-bookmark">
        To read
      </AtomsCollectionButton>
      <AtomsCollectionButton icon="ph-book-open">
        Reading
      </AtomsCollectionButton>
      <AtomsCollectionButton icon="ph-book">
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
  </div>
</template>
