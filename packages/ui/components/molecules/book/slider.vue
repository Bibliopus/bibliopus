<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

defineProps<{
  editions: { title: string; authors: { name: string }[]; cover: string }[]
}>();
</script>

<template>
  <Swiper
    slides-per-view="auto"
    :space-between="20"
    class="w-full"
  >
    <SwiperSlide
      v-for="(edition, index) in editions"
      :key="index"
      class="!w-fit"
    >
      <AtomsBookSliderItem
        :title="edition.title"
        :authors="edition.authors"
        :cover="edition.cover"
      />
    </SwiperSlide>
  </Swiper>
</template>
