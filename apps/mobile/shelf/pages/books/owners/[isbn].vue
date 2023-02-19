<script setup lang="ts">
import type { Ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const errorMessage = ref('');

const {
  getUsersWithBook,
} = useBook();

const { data: usersWithBook, error: userError } = await getUsersWithBook(route.params.isbn as string);

if (userError.value)
  errorMessage.value = 'Failed to fetch the users you are searching for.';
</script>

<template>
  <div class="m-5 mt-10">
    <div class="my-8">
      <p v-if="errorMessage" class="text-error">
        {{ errorMessage }}
      </p>
      <div class="flex flex-col">
        <LazyBookItem
          :isbn="route.params.isbn as string"
        />
        <div class="divider" />
        <div v-if="usersWithBook" class="flex flex-col gap-4">
          <LazyUserItem
            v-for="user in usersWithBook"
            :id="user.id"
            :key="user.id"
            :first-name="user.first_name"
            :last-name="user.last_name"
            :email="user.email"
          />
        </div>
      </div>
    </div>
  </div>
</template>
