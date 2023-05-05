<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
</script>

<template>
  <Swiper
    slides-per-view="auto"
    :space-between="20"
    class="w-full"
  >
    <SwiperSlide
      v-for="i in 3"
      :key="i"
      class="!w-fit"
    >
      <AtomsBookSliderItem
        title="Dune"
        :authors="[{ name: 'Frank Herbert' }]"
        cover="https://covers.openlibrary.org/b/id/13440809-L.jpg"
      />
    </SwiperSlide>
  </Swiper>
</template>
