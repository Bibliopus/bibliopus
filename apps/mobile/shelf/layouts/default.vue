<template>
  <div class="mx-auto max-w-md py-8 px-4">
    <OrganismsHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style>
html {
  @apply overflow-y-scroll;
}
</style>
