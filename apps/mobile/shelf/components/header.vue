<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

const route = useRoute();
const router = useRouter();

const { getUserProfile } = useUser();
const { data: profile } = await getUserProfile();
const fullname = computed(() => `${profile.value?.first_name} ${profile.value?.last_name}`);

const goBack = () => {
  router.back();
};
</script>

<template>
  <header class="flex items-center m-5 h-12 gap-3">
    <button
      v-if="route.path !== '/'"
      class="btn btn-ghost"
      @click="goBack"
    >
      <Icon name="ph:caret-left-bold" size="24" />
    </button>
    <button
      v-else
      class="btn btn-disabled"
    >
      <Icon name="ph:house-bold" size="24" />
    </button>
    <span>{{ fullname }}</span>
    <NuxtLink class="ml-auto" :to="`/users/${profile?.id}`">
      <Avatar
        :size="40"
        variant="beam"
        :name="fullname"
      />
    </NuxtLink>
  </header>
</template>
