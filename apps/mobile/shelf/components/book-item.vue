<script setup lang="ts">
const props = defineProps<{
  isbn: string
}>();

const { getBook } = useBook();
const { data: book } = await getBook(props.isbn);
</script>

<template>
  <NuxtLink :to="`/books/${isbn}`">
    <article class="flex items-center gap-3 w-full">
      <img
        :src="book.cover"
        class="w-14 h-20 object-cover rounded"
        loading="lazy"
      >
      <div class="flex flex-col">
        <p class="text-xs line-clamp-1">
          {{ isbn }}
        </p>
        <p class="font-bold line-clamp-2">
          {{ book.title }}
        </p>
        <p class="line-clamp-1">
          {{ book.authors[0].name }}
        </p>
      </div>
    </article>
  </NuxtLink>
</template>
