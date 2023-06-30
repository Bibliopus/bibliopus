<script setup lang="ts">
const props = defineProps<{
  messages: { id: number; content: string; type: 'text' | 'image'; sentByAuth: boolean; createdAt: string }[]
  open: boolean
  scroll: boolean
  user: { id: string; last_name: string; first_name: string }
}>();

const emits = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'update:scroll', value: boolean): void
  (event: 'submit', value: {
    user: string
    message: string
  }): void
}>();

const messageContent = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
const { y } = useScroll(messagesContainer, { behavior: 'smooth' });

const submitMessage = async (event: Event) => {
  event.preventDefault();
  emits('submit', {
    user: props.user.id,
    message: messageContent.value,
  });
  messageContent.value = '';
};

watch(() => props.scroll, () => {
  if (props.scroll) {
    y.value = messagesContainer.value?.scrollHeight ?? 0;
    emits('update:scroll', false);
  }
});
</script>

<template>
  <AtomsModal
    :open="open"
    :title="`${user.first_name} ${user.last_name}`"
    @update:open="$emit('update:open', $event)"
  >
    <div class="w-full">
      <div
        ref="messagesContainer"
        class="-mr-2 pr-2 max-h-[calc(100vh-194px)] overflow-y-auto"
      >
        <MoleculesMessageList
          :messages="messages"
        />
      </div>

      <form
        class="flex gap-2 w-full bg-dune-950 pt-4"
        @submit="submitMessage"
      >
        <AtomsInputText
          v-model="messageContent"
          name="message"
          type="text"
          :placeholder="`Send to ${user?.first_name} ${user?.last_name}`"
        />
        <AtomsInputButton type="submit">
          Send
        </AtomsInputButton>
      </form>
    </div>
  </AtomsModal>
</template>
