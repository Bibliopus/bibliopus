<script setup lang="ts">
defineProps<{
  title: string
  author: string
  image: string
}>();
</script>

<template>
  <article class="flex items-center gap-3 w-full">
    <img :src="image" class="w-14 h-20 object-cover rounded">
    <div class="flex flex-col">
      <p>
        {{ title }}
      </p>
      <p>{{ author }}</p>
    </div>
  </article>
</template>
