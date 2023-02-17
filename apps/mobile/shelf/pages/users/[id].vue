<script setup lang="ts">
import type { Ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const errorMessage = ref('');

const { getUser, getUserProfile } = useUser();
const { data: profile, error } = await getUserProfile(route.params.id as string);

const { data: currentUser } = await getUser();
const isItCurrentUser = currentUser.value?.id === profile.value?.id;

if (error.value)
  errorMessage.value = 'Failed to fetch this user.';
</script>

<template>
  <div class="m-5 mt-10">
    <p v-if="errorMessage" class="text-error">
      {{ errorMessage }}
    </p>
    <div v-else>
      <h2 class="text-xl font-bold">
        <p>{{ profile?.first_name }} {{ profile?.last_name }}</p>
      </h2>
      <p>{{ profile?.email }}</p>

      <NuxtLink
        v-if="isItCurrentUser"
        to="/auth/sign-out"
        class="btn btn-primary mt-10"
      >
        Sign out
      </NuxtLink>
    </div>
  </div>
</template>
