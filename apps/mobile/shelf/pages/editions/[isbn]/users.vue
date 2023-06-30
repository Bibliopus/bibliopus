<script setup lang="ts">
import Avatar from 'vue-boring-avatars';

definePageMeta({
  middleware: ['auth'],
});

const { getEdition } = useEdition();
const {
  getUsersSharingEdition,
} = useCollection();
const { getUserProfile } = useUser();

const route = useRoute();
const errorMessage = ref('');

const { data, error } = await getEdition(route.params.isbn as string);
const book = data as Ref<any>;

useHead({ title: `Users sharing ${book.value.title}` });

const authorsNames = computed(() => book.value.authors.join(', '));

const { data: usersSharing } = await getUsersSharingEdition(book.value.isbn);

const usersSharingNames = computed(() => {
  const names: string[] = [];
  if (!usersSharing.value)
    return names;
  for (const user of usersSharing.value)
    names.push(`${user.first_name} ${user.last_name}`);
  return names;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <AtomsBookItem
      v-if="book"
      :isbn="book.isbn"
      :title="book.title"
      :authors="book.authors"
      :cover="book.cover"
    />
    <AtomsError v-else>
      Sorry, we failed to load this page.
    </AtomsError>

    <section class="flex flex-col gap-4">
      <h3 class="section-title">
        Users that share this edition
      </h3>
      <ul>
        <li v-for="user in usersSharing" :key="user.user">
          <NuxtLink
            :to="`/users/${user.user}`"
            class="flex gap-4 items-center px-4 py-3 border-b border-dune-900"
          >
            <Avatar
              :size="40"
              variant="marble"
              :name="`${user.first_name} ${user.last_name}`"
            />
            <p class="text-md">
              {{ user.first_name }} {{ user.last_name }}
            </p>
          </NuxtLink>
        </li>
        <AtomsError v-if="usersSharing?.length === 0">
          No one is sharing this edition yet.
        </AtomsError>
      </ul>
    </section>
  </div>
</template>
