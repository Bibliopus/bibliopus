<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

withDefaults(
  defineProps<{
    seeds: string[]
    variant?: 'beam' | 'bauhaus' | 'pixel' | 'ring' | 'marble' | 'sunset'
    size?: number
    limit?: number
  }>(),
  {
    variant: 'marble',
    size: 40,
    limit: 5,
  },
);
</script>

<template>
  <div class="flex -space-x-3">
    <Avatar
      v-for="(seed, index) in seeds.slice(0, limit)"
      :key="index"
      :size="size"
      :variant="variant"
      :name="seed"
      class="group-hover:border-dune-800 border-2  rounded-full border-dune-900 transition-colors"
    />
    <div
      v-if="seeds.length > limit"
      class="flex items-center justify-center bg-dune-800 group-hover:bg-dune-600 rounded-full border-2 border-dune-900 text-dune-300 w-[40px] h-[40px] group-hover:border-dune-800 transition-colors"
    >
      +{{ seeds.length - limit }}
    </div>
  </div>
</template>
