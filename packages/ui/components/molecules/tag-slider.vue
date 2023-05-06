<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

defineProps<{
  tags: {
    id: number
    name: string
  }[]
  selected: number
}>();

defineEmits<{
  (event: 'update:selected', value: number): void
}>();
</script>

<template>
  <Swiper
    slides-per-view="auto"
    :space-between="10"
    class="w-full"
  >
    <SwiperSlide
      v-for="tag in tags"
      :key="tag.id"
      class="!w-fit"
    >
      <AtomsTag
        :selected="tag.id === selected"
        @click="$emit('update:selected', tag.id)"
      >
        {{ tag.name }}
      </AtomsTag>
    </SwiperSlide>
  </Swiper>
</template>
