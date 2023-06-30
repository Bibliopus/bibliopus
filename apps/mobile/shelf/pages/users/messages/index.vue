<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Messages' });

const formattedCreatedAt = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const { getUsersProfiles } = useUser();
const { getUsersFromMessages, subscribeToMessages, getLastMessage } = useMessages();

const { data: users, refresh: refreshUsers } = await getUsersFromMessages();
const { data: profiles, refresh: refreshProfiles } = await getUsersProfiles(users.value);
const { data: lastMessages, refresh: refreshLastMessages } = await useAsyncData(async () => {
  const lastMessages = new Map();
  for (const user of users.value) {
    const { data: lastMessage } = await getLastMessage(user);
    lastMessages.set(user, lastMessage.value);
  }
  return lastMessages;
});

subscribeToMessages([
  refreshUsers,
  refreshProfiles,
  refreshLastMessages,
]);
</script>

<template>
  <div class="flex flex-col my-8 gap-8">
    <NuxtLink
      v-for="profile in profiles"
      :key="profile.id"
      :to="`/users/messages/${profile.id}`"
      class="flex justify-between items-center px-4 py-3 border-b border-dune-900"
    >
      <Avatar
        :size="40"
        variant="marble"
        :name="`${profile.first_name} ${profile.last_name}`"
        class="mr-2"
      />
      <div class="grow">
        <div class="flex justify-between items-end mb-1">
          <p class="text-sm">
            {{ profile.first_name }} {{ profile.last_name }}
          </p>
          <p class="text-xs text-dune-300">
            {{ formattedCreatedAt(lastMessages?.get(profile.id).created_at) }}
          </p>
        </div>
        <p class="text-dune-300 text-sm">
          {{ lastMessages?.get(profile.id).content }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
