<script setup lang="ts">
import type { Ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const isbn = ref('');
const errorMessage = ref('');

const searchIsbn = async (event: Event) => {
  event.preventDefault();
  if (isbn.value)
    await navigateTo(`/books/${unref(isbn)}`);
};

const { getBook } = useBook();
const { data, error } = await getBook(route.params.isbn as string);
const book = data as Ref<any>;
if (error.value)
  errorMessage.value = 'Failed to fetch the book you are searching for.';
</script>

<template>
  <div class="m-5 mt-20">
    <h2 class="font-serif text-3xl text-center my-8">
      Bibliopus
    </h2>
    <form class="flex flex-col w-full gap-4" @submit="searchIsbn">
      <input
        v-model="isbn"
        type="text"
        placeholder="Search for ISBN"
        name="isbn"
        class="input input-bordered w-full"
      >
      <button class="btn btn-primary" type="submit">
        Find
      </button>
    </form>

    <div class="my-8">
      <p v-if="errorMessage" class="text-error">
        {{ errorMessage }}
      </p>
      <div v-if="book">
        <div class="flex flex-col items-center gap-5 mt-12 mb-10">
          <img :src="book.cover" class="w-34 h-48 object-cover">
          <div class="text-center">
            <h3 class="text-xl font-bold">
              {{ book.title }}
            </h3>
            <p>
              {{ book.authors[0].name }}
            </p>
          </div>
        </div>
        <p v-html="book.description" />
      </div>
    </div>
  </div>
</template>
