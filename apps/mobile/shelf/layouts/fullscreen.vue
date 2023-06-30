<template>
  <div class="mx-auto max-w-md py-8 px-4 h-screen">
    <OrganismsHeader />
    <main class="h-[calc(100vh-130px)]">
      <slot />
    </main>
  </div>
</template>

<style>
html {
  @apply overflow-y-hidden;
}
</style>
