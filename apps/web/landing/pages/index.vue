<script setup lang="ts">
definePageMeta({
  title: 'Bibliopus',
  description: 'Help people to exchange their books with other people.',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '@/assets/img/logo.svg',
    },
  ],
});

const shelfUrl = useRuntimeConfig().public.shelfUrl;
</script>

<template>
  <div class="content lg:h-screen lg:flex lg:flex-row-reverse">
    <div class="flex flex-col p-8 lg:w-3/5 bg-dune-950 text-dune-50">
      <MoleculesHeader />
      <main class="my-auto max-w-lg">
        <h1 class="text-6xl lg:text-9xl pb-5 bold font-serif">
          Bibliopus
        </h1>
        <p class="pb-7">
          Help people to exchange their books with other people, create a real interaction between readers and extend the durability of books.
        </p>
        <AtomsLink
          :to="shelfUrl"
          big
        >
          Get started
        </AtomsLink>
      </main>
    </div>
    <aside class="h-screen lg:w-2/5 bg-dune-900">
      <AtomsCoverBackground
        :columns="7"
        :rows="5"
      />
    </aside>
  </div>
</template>
