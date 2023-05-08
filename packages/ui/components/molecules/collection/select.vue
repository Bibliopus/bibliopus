<script setup lang="ts">
defineProps<{
  selected: number
  collections: { id: number; name: string }[]
  editions: { title: string; authors: string[]; cover: string }[]
}>();

defineEmits<{
  (event: 'update:selected', id: number): void
}>();
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <AtomsSliderWrapper>
      <MoleculesTagSlider
        class="!px-4"
        :selected="selected"
        :tags="collections"
        @update:selected="$emit('update:selected', $event)"
      />
    </AtomsSliderWrapper>
    <AtomsSliderWrapper v-if="editions.length">
      <MoleculesBookSlider
        class="!px-4"
        :editions="editions"
      />
    </AtomsSliderWrapper>
    <div
      v-else
      class="min-h-[356px]"
    >
      <AtomsError>
        Nothing in this collection.
      </AtomsError>
    </div>
  </div>
</template>
