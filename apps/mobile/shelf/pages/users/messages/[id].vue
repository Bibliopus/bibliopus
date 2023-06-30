<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Messages' });

const { getUserProfile } = useUser();

const { params } = useRoute();
const userId = params.id as string;
const { data: profile } = await getUserProfile(userId);

const { subscribeToMessages, getMessages } = useMessages();

const { data: messages, refresh: refreshMessages } = await getMessages(userId);

subscribeToMessages([
  refreshMessages,
]);
</script>

<template>
  <div class="flex flex-col my-8 gap-8">
    <div
      v-for="message in messages"
      :key="message.id"
    >
      {{ message.content }}
    </div>
  </div>
</template>
