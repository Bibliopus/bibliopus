<script setup lang="ts">
import { UseImage } from '@vueuse/components';

const props = defineProps<{
  user: string
  name: string
  covers: string[]
}>();
</script>

<template>
  <div class="p-3 w-fit bg-dune-900 border border-dune-800 rounded-md cursor-pointer hover:bg-dune-800 hover:border-dune-600 transition-colors">
    <div class="max-h-[130px] min-w-[220px] overflow-hidden">
      <div class="flex justify-center px-2 items-end">
        <UseImage
          v-if="covers[0]"
          :src="covers[0]"
          class="relative rounded h-[150px] object-cover aspect-[180/270] -rotate-6 z-10 select-none"
          :class="{
            'mt-1': covers.length === 1,
            '-mx-2': covers.length === 2,
          }"
        />
        <UseImage
          v-if="covers[1]"
          :src="covers[1]"
          class="relative rounded h-[150px] object-cover aspect-[180/270] -mx-10 z-20 mb-1 select-none"
          :class="{
            '-mx-2 mt-1 mb-0 rotate-6': covers.length === 2,
          }"
        />
        <UseImage
          v-if="covers[2]"
          :src="covers[2]"
          class="relative rounded h-[150px] object-cover aspect-[180/270] rotate-6 z-30 select-none"
        />
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
  </div>
</template>
