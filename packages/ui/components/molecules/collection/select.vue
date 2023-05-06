<script setup lang="ts">
const props = defineProps<{
  selected: number
  collections: { id: number; name: string }[]
  editions: { title: string; authors: { name: string }[]; cover: string }[]
}>();

defineEmits<{
  (event: 'update:selected', id: number): void
}>();
</script>

<template>
  <MoleculesTagSlider
    :selected="selected"
    :tags="collections"
    @update:selected="$emit('update:selected', $event)"
  />
  <MoleculesBookSlider
    :editions="editions"
  />
</template>
