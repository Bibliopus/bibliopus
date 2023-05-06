<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    icon: string
    size?: '16' | '24' | '32'
  }>(),
  {
    type: 'button',
    size: '16',
  },
);
</script>

<template>
  <button
    class="btn p-2 flex"
    :type="type"
  >
    <Icon
      :name="icon"
      :size="size"
      class="text-dune-50"
    />
  </button>
</template>
