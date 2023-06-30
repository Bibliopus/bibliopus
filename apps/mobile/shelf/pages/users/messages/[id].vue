<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'fullscreen',
});
useHead({ title: 'Messages' });

const { getUserProfile } = useUser();

const { params } = useRoute();
const userId = params.id as string;
const { data: profile } = await getUserProfile(userId);

const { subscribeToMessages, getMessages, sendMessage } = useMessages();

const { data: messages, refresh: refreshMessages } = await getMessages(userId);

subscribeToMessages([
  refreshMessages,
]);

const formattedMessages = computed(() => {
  return messages.value.map((message: any) => ({
    ...message,
    createdAt: message.created_at,
    sentByAuth: message.receiver === userId,
  }));
});

const messageContent = ref('');

const submitMessage = async (event: Event) => {
  event.preventDefault();
  await sendMessage(userId, messageContent.value);
  messageContent.value = '';
};
</script>

<template>
  <div class="flex flex-col my-8 gap-8 h-full">
    <div class="relative h-full">
      <AtomsMessageList class="max-h-[calc(100%-94px)] overflow-y-auto" :messages="formattedMessages" />

      <form class="absolute bottom-0 left-0 flex gap-2 w-full bg-dune-950 py-4" @submit="submitMessage">
        <AtomsInputText
          v-model="messageContent"
          name="message"
          type="text"
          :placeholder="`Send to ${profile?.first_name} ${profile?.last_name}`"
        />
        <AtomsInputButton type="submit">
          Send
        </AtomsInputButton>
      </form>
    </div>
  </div>
</template>
