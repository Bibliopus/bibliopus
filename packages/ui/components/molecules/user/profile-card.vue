<script setup lang="ts">
import Avatar from 'vue-boring-avatars';
const props = withDefaults(defineProps<{
  id: string | null
  firstName: string
  lastName: string
  variant?: 'beam' | 'bauhaus' | 'pixel' | 'ring' | 'marble' | 'sunset'
  joinedAt: string
}>(), {
  variant: 'marble',
});

const fullname = computed(() => `${props.firstName} ${props.lastName}`);

const formattedJoinedAt = computed(() => {
  const date = new Date(props.joinedAt);
  return date.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<template>
  <div class="flex items-start gap-3 rounded border border-dune-800 text-dune-300 w-full p-3">
    <Avatar
      :size="80"
      :variant="variant"
      :name="fullname"
    />
    <div class="flex flex-col gap-1">
      <p class="text-dune-50 text-2xl">
        {{ fullname }}
      </p>
      <p class="text-dune-300 text-sm">
        Joined {{ formattedJoinedAt }}
      </p>
      <AtomsLink
        v-if="id"
        :to="`/users/messages?user=${id}`"
        small
        class="mt-3 w-max"
      >
        Send a message
      </AtomsLink>
    </div>
  </div>
</template>
