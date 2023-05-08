<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: 'auth',
});

useHead({ title: 'Sign out' });

const { auth } = useSupabaseAuthClient();
await auth.signOut();

const interval = useInterval(100);
watch(interval, async () => {
  if (!(await auth.getUser()).data.user)
    navigateTo('/auth/sign-up');
});
</script>

<template>
  <p class="hidden">
    Signing you out...
  </p>
</template>
