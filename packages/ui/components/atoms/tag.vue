<script setup lang="ts">
defineEmits<{
  (event: 'click'): void
}>();
</script>

<template>
  <li
    class="
      bg-dune-900 text-dune-50
      border border-dune-800
      rounded-full py-[12px] px-4
      hover:bg-dune-800 hover:border-dune-600
      transition-colors
      cursor-pointer
      w-full
      "
    @click="$emit('click')"
  >
    <span class="line-clamp-1">
      <slot />
    </span>
  </li>
</template>
