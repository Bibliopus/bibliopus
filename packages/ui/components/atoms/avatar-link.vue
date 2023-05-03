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
    variant: 'beam',
    size: 40,
  },
);
</script>

<template>
  <NuxtLink :to="to">
    <Avatar
      :size="40"
      :variant="variant"
      :name="seed"
    />
  </NuxtLink>
</template>
