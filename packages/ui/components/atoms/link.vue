<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'text'
    to: string
    big?: boolean
  }>(),
  {
    type: 'button',
    big: false,
  },
);
</script>

<template>
  <NuxtLink
    v-if="type === 'button'"
    :to="to"
    class="btn"
    :class="{ 'btn-big': big }"
  >
    <slot />
  </NuxtLink>
  <NuxtLink
    v-else-if="type === 'text'"
    :to="to"
    class="hover:underline"
  >
    <slot />
  </NuxtLink>
</template>
