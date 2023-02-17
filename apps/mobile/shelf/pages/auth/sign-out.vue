<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: 'auth',
});

const { auth } = useSupabaseAuthClient();
const { error } = await auth.signOut();
if (error)
  throw error;
else
  navigateTo('/auth/sign-up');
</script>

<template>
  <p class="hidden">
    Signing you out...
  </p>
</template>
