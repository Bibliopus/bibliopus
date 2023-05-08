<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

withDefaults(
  defineProps<{
    to: string
    seed: string
    variant?: 'beam' | 'bauhaus' | 'pixel' | 'ring' | 'marble' | 'sunset'
    size?: number
  }>(),
  {
    variant: 'marble',
    size: 40,
  },
);
</script>

<template>
  <NuxtLink :to="to">
    <Avatar
      :size="size"
      :variant="variant"
      :name="seed"
    />
  </NuxtLink>
</template>
