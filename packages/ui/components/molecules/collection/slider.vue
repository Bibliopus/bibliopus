<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

defineProps<{
  collections: { id: number; name: string; user: string; covers: string[] }[]
}>();
</script>

<template>
  <Swiper
    slides-per-view="auto"
    :space-between="20"
    class="w-full !px-4"
  >
    <SwiperSlide
      v-for="collection in collections"
      :key="collection.id"
      class="!w-fit"
    >
      <AtomsCollectionItem
        v-bind="collection"
      />
    </SwiperSlide>
  </Swiper>
</template>
