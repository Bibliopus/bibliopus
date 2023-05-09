<script setup lang="ts">
import { useImage } from '@vueuse/core';

const props = defineProps<{
  isbn: string
  cover: string | null
  title: string
  authors: string[]
}>();

const isLoading = props.cover ? useImage({ src: props.cover }).isLoading : ref(false);

const authorsNames = computed(() => props.authors.map(author => author).join(', '));
</script>

<template>
  <NuxtLink
    :to="`/editions/${isbn}`"
    class="group block p-3 w-fit bg-dune-900 border border-dune-800 rounded-md cursor-pointer hover:bg-dune-800 hover:border-dune-600 transition-colors"
  >
    <div
      v-if="isLoading"
      class="flex w-[180px] h-[270px] rounded bg-dune-800 group-hover:bg-dune-600 animate-pulse"
    />
    <img
      v-else-if="cover"
      class="aspect-[180/270] rounded w-[180px] object-cover bg-dune-800 group-hover:bg-dune-600 animate-fade-in"
      :src="cover"
      :alt="`Cover of ${title}`"
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

    <p class="text-sm text-dune-300 mt-2 max-w-[180px] line-clamp-1">
      {{ authorsNames }}
    </p>
    <h3 class="text-dune-50 max-w-[180px] line-clamp-1">
      {{ title }}
    </h3>
  </NuxtLink>
</template>
