<script setup lang="ts">
const props = defineProps<{
  cover: string
  title: string
  authors: {
    name: string
  }[]
}>();

const authorsNames = computed(() => props.authors.map(author => author.name).join(', '));
</script>

<template>
  <div class="p-3 w-fit bg-dune-900 border border-dune-800 rounded-md cursor-pointer hover:bg-dune-800 hover:border-dune-600 transition-colors">
    <img
      class="aspect-[180/270] rounded w-[180px] object-cover mb-2"
      :src="cover"
      alt="#"
    >
    <p class="text-sm text-dune-300">
      {{ authorsNames }}
    </p>
    <h3 class="text-dune-50">
      {{ title }}
    </h3>
  </div>
</template>
