<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const errorMessage = ref('');

const { getUser, getUserProfile } = useUser();
const { data: profile, error } = await getUserProfile(route.params.id as string);
const fullname = computed(() => `${profile.value?.first_name} ${profile.value?.last_name}`);

const { getUserBooks } = useBook();
const { data: books } = await getUserBooks(route.params.id as string);
const bookIsbns = computed(() => books.value?.map(book => book.isbn));

const { data: currentUser } = await getUser();
const isItCurrentUser = currentUser.value?.id === profile.value?.id;

if (error.value)
  errorMessage.value = 'Failed to fetch this user.';
</script>

<template>
  <div class="m-5 mt-10">
    <p v-if="errorMessage" class="text-error">
      {{ errorMessage }}
    </p>
    <div v-else>
      <div class="flex items-start gap-4">
        <Avatar
          :size="64"
          variant="beam"
          :name="fullname"
        />
        <div>
          <h2 class="text-xl font-bold">
            <p>{{ fullname }}</p>
          </h2>
          <p>{{ profile?.email }}</p>
        </div>
      </div>

      <NuxtLink
        v-if="isItCurrentUser"
        to="/auth/sign-out"
        class="btn btn-primary mt-4"
      >
        Sign out
      </NuxtLink>

      <div className="divider" />

      <div class="my-4">
        <h2 class="text-xl font-bold mb-6">
          Books
        </h2>
        <div class="flex flex-col gap-4">
          <LazyBookItem
            v-for="(bookIsbn, index) in bookIsbns"
            :key="index"
            :isbn="bookIsbn"
          />
        </div>
      </div>
    </div>
  </div>
</template>
