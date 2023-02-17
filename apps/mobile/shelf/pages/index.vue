<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const isbn = ref('');

const { addToHistory, history } = useSearchHistory();

const searchIsbn = async (event: Event) => {
  event.preventDefault();
  if (isbn.value) {
    addToHistory(isbn.value);
    await navigateTo(`/books/${unref(isbn)}`);
  }
};
</script>

<template>
  <div class="m-5 mt-10">
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
      <h2 class="text-xl font-bold mb-6">
        Recently searched
      </h2>
      <div class="flex flex-col gap-4">
        <LazyBookItem
          v-for="(bookIsbn, index) in history"
          :key="index"
          :isbn="bookIsbn"
        />
      </div>
    </div>
  </div>
</template>
