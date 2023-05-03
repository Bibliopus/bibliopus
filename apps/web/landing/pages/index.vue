<script setup lang="ts">
const title = 'Bibliopus';
const description = 'Connect with fellow book enthusiasts in your area, share and swap books, keep track of your reads, and curate captivating collections for everyone to enjoy.';

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
});

const shelfUrl = useRuntimeConfig().public.shelfUrl;
</script>

<template>
  <div class="flex flex-col lg:h-screen lg:flex lg:flex-row-reverse h-screen">
    <div class="flex flex-col p-8 lg:w-3/5 bg-dune-950 text-dune-50">
      <MoleculesHeader />
      <main class="my-auto">
        <h1 class="text-6xl lg:text-9xl pb-5 first-letter:-ml-[8px]">
          {{ title }}
        </h1>
        <h2 class="pb-7 max-w-lg">
          {{ description }}
        </h2>
        <AtomsLink
          :to="shelfUrl"
          big
        >
          Get started
        </AtomsLink>
      </main>
    </div>
    <aside class="h-full lg:h-screen lg:w-2/5 bg-dune-900">
      <AtomsCoverBackground
        :columns="7"
        :rows="7"
      />
    </aside>
  </div>
</template>
