<script setup lang="ts">
useHead({
  titleTemplate: title => `${title} - Bibliopus App`,
  meta: [
    {
      name: 'description',
      content: 'Connect with fellow book enthusiasts in your area, share and swap books, keep track of your reads, and curate captivating collections for everyone to enjoy.',
    },
    {
      name: 'robots',
      content: 'none',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#1D1C16',
    },
  ],
});
</script>

<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator color="#B0A898" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active {
  transition: all 300ms ease;
}
.page-leave-active {
  transition: all 200ms ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
