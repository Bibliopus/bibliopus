<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Messages' });

const { getUsersProfiles } = useUser();
const { getUsersFromMessages, subscribeToMessages, getLastMessage } = useMessages();

const { data: users, refresh: refreshUsers } = await getUsersFromMessages();
const { data: profiles, refresh: refreshProfiles } = await getUsersProfiles(users.value);
const { data: lastMessages, refresh: refreshLastMessages } = await useAsyncData(async () => {
  const lastMessages = new Map();
  for (const user of users.value) {
    const { data: lastMessage } = await getLastMessage(user);
    lastMessages.set(user, lastMessage.value?.content ?? '');
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
    >
      <p>
        {{ profile.first_name }} {{ profile.last_name }}
      </p>
      <p>
        {{ lastMessages?.get(profile.id) }}
      </p>
    </NuxtLink>
  </div>
</template>
