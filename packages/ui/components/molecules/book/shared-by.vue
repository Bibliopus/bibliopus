<script setup lang="ts">
defineProps<{
  users: string[]
  to: string
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="group w-full flex flex-col justify-between gap-2 rounded-md bg-dune-900 border border-dune-800 p-3 cursor-pointer hover:bg-dune-800 hover:border-dune-600 transition-colors"
  >
    <p class="text-dune-50">
      These users are sharing this book
    </p>
    <AtomsAvatars
      :seeds="users"
    />
  </NuxtLink>
</template>
