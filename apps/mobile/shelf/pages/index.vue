<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const { getUser, isAuthenticated } = useSupabase();

// eslint-disable-next-line no-console
console.log(await getUser(), await isAuthenticated());
</script>

<template>
  <p class="text-sm">
    hello
  </p>
</template>
