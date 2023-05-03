<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const isbn = ref('');
const searchValue: Ref<string> = useState('search');
searchValue.value = '';

const searchIsbn = async (event: Event) => {
  event.preventDefault();
  if (isbn.value) {
    // addToHistory(isbn.value);
    await navigateTo(`/books/${unref(isbn)}`);
  }
};
</script>

<template>
  <div class="m-4 mt-10">
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
        <AtomsBookItem
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
