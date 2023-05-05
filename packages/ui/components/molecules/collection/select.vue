<script setup lang="ts">
const selectedCollection = ref(1);
</script>

<template>
  <MoleculesCollectionTagSlider
    v-model:selected="selectedCollection"
    :tags="[
      { id: 1, name: 'To read' },
      { id: 2, name: 'Reading' },
      { id: 3, name: 'Read' },
      { id: 4, name: 'Fiction' },
      { id: 5, name: 'My wishlist' },
    ]"
  />
  <MoleculesBookSlider
    :books="[
      {
        title: 'Dune',
        authors: [{ name: 'Frank Herbert' }],
        cover: 'https://covers.openlibrary.org/b/id/9719751-L.jpg',
      },
      {
        title: 'Foundation',
        authors: [{ name: 'Isaac Asimov' }],
        cover: 'https://covers.openlibrary.org/b/id/13440809-L.jpg',
      },
      {
        title: 'A Court of Mist and Fury',
        authors: [{ name: 'Sarah J. Maas' }],
        cover: 'https://covers.openlibrary.org/b/id/13325541-L.jpg',
      },
    ]"
  />
</template>
