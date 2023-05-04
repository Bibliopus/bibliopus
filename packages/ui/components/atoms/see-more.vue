<script setup lang="ts">
const expanded = ref(false);
</script>

<template>
  <div
    class="
      w-full flex flex-col gap-2
      rounded-md
      bg-dune-900 border border-dune-800
      p-3 cursor-pointer
      hover:bg-dune-800 hover:border-dune-600
      transition-colors
    "
    @click="expanded = !expanded"
  >
    <p
      class="text-dune-50 text-sm leading-5"
      :class="{ 'line-clamp-4': !expanded }"
    >
      <slot />
    </p>
    <span class="text-dune-300 text-sm">See {{ expanded ? 'less' : 'more' }}</span>
  </div>
</template>
