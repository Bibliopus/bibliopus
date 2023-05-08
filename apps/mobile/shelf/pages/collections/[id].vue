<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const { getEditionsFromCollection } = useEdition();
const { getCollection } = useCollection();
const { getUser, getUserProfile } = useUser();

const { data: user } = await getUser();
const { params } = useRoute();

const { data: collection } = await getCollection(+params.id);
if (collection.value?.user === user.value?.id)
  navigateTo(`/collections?selected=${collection.value?.id}`);

const { data: editions } = await getEditionsFromCollection(+params.id);
const { data: collectionUser } = await useAsyncData(async () => {
  if (!collection.value)
    return '';
  const { data } = await getUserProfile(collection.value.user);
  return `${data.value?.first_name} ${data.value?.last_name}`;
});

useHead({ title: collection.value?.name ?? 'Collection' });
</script>

<template>
  <div class="flex flex-col my-8 gap-8">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="section-title line-clamp-2">
          {{ collection?.name }}
        </h2>
        <p class="text-dune-300 line-clamp-2">
          Created by {{ collectionUser }}
        </p>
      </div>
      <AtomsBookItem
        v-for="(edition, index) in editions"
        :key="index"
        :isbn="edition.isbn"
        :title="edition.title"
        :authors="edition.authors"
        :cover="edition.cover"
      />
      <AtomsError v-if="editions?.length === 0">
        Your didn't add any book yet.
      </AtomsError>
    </div>
  </div>
</template>
