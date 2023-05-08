<script setup lang="ts">
const { getUserProfile } = useUser();
const { data: profile } = await getUserProfile();
const fullname = computed(() => `${profile.value?.first_name} ${profile.value?.last_name}`);

const searchValue: Ref<string> = useState('search', () => '');
</script>

<template>
  <header class="flex items-center gap-5 mb-8">
    <NuxtLink to="/">
      <img
        src="~/assets/img/logo.svg"
        class="w-9 select-none"
      >
    </NuxtLink>
    <AtomsInputSearch
      v-model="searchValue"
      name="search"
      placeholder="Search for a book"
      @focus="navigateTo('/search')"
    />
    <MoleculesMenu :seed="fullname" />
  </header>
</template>
