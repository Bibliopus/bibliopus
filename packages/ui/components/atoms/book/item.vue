<script setup lang="ts">
import { useImage } from '@vueuse/core';

const props = defineProps<{
  cover: string | null
  isbn: string
  title: string
  authors: string[]
}>();

const isLoading = props.cover ? useImage({ src: props.cover }).isLoading : ref(false);

const authorsNames = computed(() => props.authors.map(author => author).join(', '));
</script>

<template>
  <NuxtLink
    :to="`/editions/${isbn}`"
    class="group w-full flex justify-between rounded-md bg-dune-900 border border-dune-800 p-3 cursor-pointer hover:bg-dune-800 hover:border-dune-600 transition-colors"
  >
    <div class="flex flex-col">
      <span class="text-sm text-dune-300 line-clamp-1">#{{ isbn }}</span>
      <div class="mt-auto mb-0">
        <h3 class="text-dune-50 mb-2 text-xl line-clamp-2">
          {{ title }}
        </h3>
        <p class="text-sm text-dune-300 line-clamp-1">
          {{ authorsNames }}
        </p>
      </div>
    </div>
    <div
      v-if="isLoading"
      class="flex w-[80px] h-[120px] rounded bg-dune-800 group-hover:bg-600 animate-pulse"
    />
    <img
      v-else-if="cover"
      class="rounded w-[80px] object-cover aspect-[180/270] ml-4"
      :src="cover"
      :alt="`Cover of ${title}`"
    >
    <div
      v-else
      class="flex items-center justify-center w-[80px] h-[120px] rounded bg-dune-800 group-hover:bg-dune-600 transition-colors"
    >
      <Icon
        name="ph-image"
        size="28"
        class="text-dune-900 group-hover:text-dune-800"
      />
    </div>
  </NuxtLink>
</template>
