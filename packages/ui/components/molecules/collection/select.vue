<script setup lang="ts">
withDefaults(defineProps<{
  selected: number
  collections: { id: number; name: string }[]
  editions: { title: string; authors: string[]; cover: string; isbn: string }[]
  vertical?: boolean
  count?: { [id: string]: number }
}>(), {
  vertical: false,
  count: () => ({}),
});

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
    <p
      v-if="count[selected]"
      class="text-dune-300"
    >
      {{ count[selected] }} edition{{ count[selected] === 1 ? '' : 's' }}
    </p>
    <AtomsSliderWrapper v-if="editions.length && !vertical">
      <MoleculesBookSlider
        class="!px-4"
        :editions="editions"
      />
    </AtomsSliderWrapper>
    <div
      v-else-if="editions.length && vertical"
      class="flex flex-col gap-4"
    >
      <AtomsBookItem
        v-for="edition in editions"
        :key="edition.isbn"
        :isbn="edition.isbn"
        :title="edition.title"
        :authors="edition.authors"
        :cover="edition.cover"
      />
    </div>
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
