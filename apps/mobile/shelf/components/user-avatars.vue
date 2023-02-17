<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

defineProps<{
  users: any
}>();
</script>

<template>
  <div class="avatar-group -space-x-6">
    <div
      v-for="user in users"
      :key="user.id"
      class="avatar"
    >
      <div class="w-12">
        <NuxtLink :to="`/users/${user.id}`">
          <Avatar
            class="ml-auto"
            :size="48"
            variant="beam"
            :name="`${user?.first_name} ${user?.last_name}`"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
