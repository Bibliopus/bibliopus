<script setup lang="ts">
import { UseImage } from '@vueuse/components';

withDefaults(defineProps<{
  id: number
  user: string
  name: string
  covers?: string[]
}>(), {
  covers: () => [],
});
</script>

<template>
  <NuxtLink
    :to="`/collections/${id}`"
    class="group block p-3 w-fit bg-dune-900 border border-dune-800 rounded-md cursor-pointer hover:bg-dune-800 hover:border-dune-600 transition-colors"
  >
    <div class="h-[130px] w-[220px] overflow-hidden">
      <div
        class="flex justify-center px-2 items-end"
      >
        <UseImage
          v-if="covers[0]"
          :src="covers[0]"
          class="relative rounded h-[150px] object-cover aspect-[180/270] -rotate-6 z-10 select-none bg-dune-800 group-hover:bg-dune-600 animate-fade-in"
          :class="{
            'mt-1': covers.length === 1,
            '-mx-2': covers.length === 2,
          }"
        >
          <template #loading>
            >
            <div
              class="relative rounded h-[150px] object-cover aspect-[180/270] -rotate-6 z-10 select-none bg-dune-800 animate-pulse"
            />
          </template>
        </UseImage>
        <UseImage
          v-if="covers[1]"
          :src="covers[1]"
          class="relative rounded h-[150px] object-cover aspect-[180/270] -mx-10 z-20 mb-1 select-none bg-dune-800 group-hover:bg-dune-600 animate-fade-in"
          :class="{
            '-mx-2 mt-1 mb-0 rotate-6': covers.length === 2,
          }"
        >
          <template #loading>
            >
            <div
              class="relative rounded h-[150px] object-cover aspect-[180/270] -mx-10 z-20 mb-1 select-none bg-dune-800 animate-pulse"
            />
          </template>
        </UseImage>
        <UseImage
          v-if="covers[2]"
          :src="covers[2]"
          class="relative rounded h-[150px] object-cover aspect-[180/270] rotate-6 z-30 select-none bg-dune-800 group-hover:bg-dune-600 animate-fade-in"
        >
          <template #loading>
            >
            <div
              class="relative rounded h-[150px] object-cover aspect-[180/270] rotate-6 z-30 select-none bg-dune-800 animate-pulse"
            />
          </template>
        </UseImage>
      </div>
    </div>
    <div class="text-dune-50">
      <p class="text-sm text-dune-300 mt-2 line-clamp-1">
        {{ user }}
      </p>
      <h3 class="text-dune-50 line-clamp-1">
        {{ name }}
      </h3>
    </div>
  </NuxtLink>
</template>
