<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

defineProps<{
  isbn: string
  users: any[]
}>();
</script>

<template>
  <NuxtLink :to="`/books/owners/${isbn}`">
    <div class="avatar-group -space-x-6">
      <div
        v-for="user in users.slice(0, 5)"
        :key="user.id"
        class="avatar"
      >
        <div class="w-12">
          <Avatar
            class="ml-auto"
            :size="48"
            variant="beam"
            :name="`${user?.first_name} ${user?.last_name}`"
          />
        </div>
      </div>
      <div v-if="users.length > 5" class="avatar placeholder">
        <div class="w-12 bg-neutral-focus text-neutral-content">
          <span>+ {{ users.length - 5 }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
