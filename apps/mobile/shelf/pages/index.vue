<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Home' });

const { getUserRecentlyAddedEditions, getEditionsFromCollection, getEditionCountFromCollection } = useEdition();
const { getCollectionsFromUser } = useCollection();
const { getUser } = useUser();

const searchValue: Ref<string> = useState('search');
searchValue.value = '';

const { data: user } = await getUser();
const { data: recentlyAddedEditions } = user.value ? await getUserRecentlyAddedEditions(user.value?.id) : { data: ref([]) };

const { data: userCollections } = await useAsyncData(async () => {
  if (user.value) {
    const { data } = await getCollectionsFromUser(user.value?.id);
    return data.value;
  }
  return [];
});

const { data: inCollectionCount } = await useAsyncData(async () => {
  const editionByCollection: { [id: string]: number } = {};
  if (userCollections.value) {
    for (const collection of userCollections.value) {
      const { data } = await getEditionCountFromCollection(collection.id);
      editionByCollection[collection.id] = data.value ?? 0;
    }
    return editionByCollection;
  }
  return {};
});

const collections = computed(() => {
  if (userCollections.value) {
    return userCollections.value.filter(collection =>
      inCollectionCount.value && inCollectionCount.value[collection.id] > 0,
    );
  }
  return [];
});

const selectedCollection = collections.value ? ref(collections.value[0].id) : ref(null);
const { data: selectedEditions, refresh: selectedEditionsRefresh } = await useAsyncData(async () => {
  if (selectedCollection.value)
    return (await getEditionsFromCollection(selectedCollection.value)).data.value;
  return [];
});

const setSelectedCollection = (collectionId: number) => {
  selectedCollection.value = collectionId;
  selectedEditionsRefresh();
};
</script>

<template>
  <div class="flex flex-col my-8 gap-8">
    <div class="flex flex-col gap-4">
      <h2 class="section-title">
        Recently added
      </h2>
      <AtomsBookItem
        v-for="(edition, index) in recentlyAddedEditions"
        :key="index"
        :isbn="edition.isbn"
        :title="edition.title"
        :authors="edition.authors"
        :cover="edition.cover"
      />
      <AtomsError v-if="recentlyAddedEditions.length === 0">
        Your didn't add any book yet.
      </AtomsError>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="section-title">
        In your collections
      </h2>
      <MoleculesCollectionSelect
        :selected="selectedCollection"
        :collections="collections ?? []"
        :editions="selectedEditions as any[] ?? []"
        @update:selected="setSelectedCollection($event)"
      />
    </div>
  </div>
</template>
