<script setup lang="ts">
const { signOut } = useSupabase();
const { error } = await signOut();
if (error)
  throw error;
else
  navigateTo('/auth/sign-up');
</script>

<template>
  <p>Signing you out...</p>
</template>
