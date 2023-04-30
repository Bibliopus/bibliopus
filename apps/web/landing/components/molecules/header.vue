<script setup lang="ts">
const shelfUrl = useRuntimeConfig().public.shelfUrl;
</script>

<template>
  <header class="flex justify-between items-center mb-8 lg:mb-0">
    <img
      src="@/assets/img/logo.svg"
      class="w-10"
    >
    <nav class="flex gap-x-4 items-center">
      <AtomsLink
        :to="`${shelfUrl}/auth/sign-in`"
        type="text"
      >
        Sign in
      </AtomsLink>
      <AtomsLink :to="`${shelfUrl}/auth/sign-up`">
        Sign up
      </AtomsLink>
    </nav>
  </header>
</template>
