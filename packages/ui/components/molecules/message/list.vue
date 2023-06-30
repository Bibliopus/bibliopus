<script setup lang="ts">
const props = withDefaults(defineProps<{
  messages: { id: number; content: string; type: 'text' | 'image'; sentByAuth: boolean; createdAt: string }[]
}>(), {
  messages: () => [],
});
</script>

<template>
  <ul class="flex flex-col gap-3">
    <AtomsMessageItem
      v-for="message in messages"
      :key="message.id"
      :content="message.content"
      :type="message.type"
      :sent-by-auth="message.sentByAuth"
      :created-at="message.createdAt"
    />
    <AtomsError v-if="messages.length === 0">
      No messages yet.
    </AtomsError>
  </ul>
</template>
