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

    <div class="flex flex-col my-8 gap-4">
      <h2 class="section-title">
        Recently searched
      </h2>
      <div class="flex flex-col gap-4">
        <!-- <LazyBookItem
          v-for="(bookIsbn, index) in history.slice(0, 5)"
          :key="index"
          :isbn="bookIsbn"
        /> -->
        <AtomsBook
          isbn="9780736692403"
          title="Dune"
          :authors="[{ name: 'Frank Herbert' }]"
          cover="https://covers.openlibrary.org/b/id/13440809-L.jpg"
        />
        <AtomsBookSliderItem
          cover="https://covers.openlibrary.org/b/id/13440809-L.jpg"
          title="fondation"
          :authors="[{ name: 'Isaac Asimov' }]"
        />
      </div>
    </div>
  </div>
</template>
