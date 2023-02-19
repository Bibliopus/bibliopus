<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

const props = defineProps<{
  id: string
  firstName: string
  lastName: string
  email: string
}>();

const { getUser } = useUser();
const { data: user } = await getUser();
</script>

<template>
  <NuxtLink :to="`/users/${id}`" class="w-full">
    <article class="flex items-center gap-3 w-full">
      <Avatar
        :size="48"
        variant="beam"
        :name="`${firstName} ${lastName}`"
      />
      <div class="flex flex-col">
        <div>
          <span class="font-bold">{{ firstName }} {{ lastName }}</span>
          <div v-if="user?.id === id" class="badge badge-primary ml-2">
            You
          </div>
        </div>
        <p>{{ email }}</p>
      </div>
    </article>
  </NuxtLink>
</template>
