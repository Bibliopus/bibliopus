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
  <div class="flex flex-col gap-y-3 w-[calc(100% + 40px)] -mx-4">
    <MoleculesTagSlider
      class="!px-4"
      :selected="selected"
      :tags="collections"
      @update:selected="$emit('update:selected', $event)"
    />
    <MoleculesBookSlider
      class="!px-4"
      :editions="editions"
    />
  </div>
</template>
