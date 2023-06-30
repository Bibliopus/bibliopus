<script setup lang="ts">
const props = withDefaults(defineProps<{
  content: string
  type: 'text' | 'image'
  sentByAuth: boolean
  createdAt: string
}>(), {
  sentByAuth: false,
  type: 'text',
});

const formattedCreatedAt = computed(() => {
  const date = new Date(props.createdAt);
  return date.toLocaleDateString('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
});
</script>

<template>
  <li
    class="flex flex-col gap-[2px] w-full"
    :class="[sentByAuth ? 'self-end items-end' : 'self-start items-start']"
  >
    <p
      class="border border-dune-800 p-3 text-dune-50 rounded-md max-w-full text-sm break-words"
      :class="[sentByAuth ? 'rounded-br-sm bg-dune-900' : 'rounded-bl-sm bg-dune-950']"
    >
      {{ content }}
    </p>
    <span class="text-xs text-dune-400">{{ formattedCreatedAt }}</span>
  </li>
</template>
