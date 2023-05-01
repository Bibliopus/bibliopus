<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    big?: boolean
  }>(),
  {
    type: 'button',
    big: false,
  },
);
</script>

<template>
  <button
    class="btn"
    :class="{ 'btn-big': big }"
    :type="type"
  >
    <slot />
  </button>
</template>
