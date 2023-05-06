<script setup lang="ts">
defineProps<{
  selected?: boolean
}>();

defineEmits<{
  (event: 'click'): void
}>();
</script>

<template>
  <div
    class="
      bg-dune-900 text-dune-50
      border border-dune-800
      rounded-full py-[12px] px-4
      hover:bg-dune-800 hover:border-dune-600
      transition-colors
      cursor-pointer
      w-fit
      "
    :class="{
      '!bg-dune-50 !text-dune-950 !border-dune-50': selected,
    }"
    @click="$emit('click')"
  >
    <span class="line-clamp-1">
      <slot />
    </span>
  </div>
</template>
