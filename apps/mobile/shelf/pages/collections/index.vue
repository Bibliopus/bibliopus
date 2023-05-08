<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Collections' });

const { getEditionsFromCollection, getEditionCountFromCollection } = useEdition();
const { getCollectionsFromUser } = useCollection();
const { getUser } = useUser();

const { query } = useRoute();
const { data: user } = await getUser();

const { data: collections } = await useAsyncData(async () => {
  if (user.value) {
    const { data } = await getCollectionsFromUser(user.value?.id);
    return data.value;
  }
  return [];
});

const { data: inCollectionCount } = await useAsyncData(async () => {
  const editionByCollection: { [id: string]: number } = {};
  if (collections.value) {
    for (const collection of collections.value) {
      const { data } = await getEditionCountFromCollection(collection.id);
      editionByCollection[collection.id] = data.value ?? 0;
    }
    return editionByCollection;
  }
  return {};
});

const selectedCollection = ref((() => {
  if (query.selected)
    return +query.selected;
  else if (collections.value)
    return collections.value[0].id;
  else
    return null;
})());
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
      <div class="flex justify-between items-center">
        <h2 class="section-title line-clamp-2">
          Collections
        </h2>
        <!-- <AtomsInputButton>New</AtomsInputButton> -->
      </div>
      <MoleculesCollectionSelect
        :selected="selectedCollection"
        :collections="collections ?? []"
        :editions="selectedEditions as any[] ?? []"
        vertical
        :count="inCollectionCount ?? {}"
        @update:selected="setSelectedCollection($event)"
      />
    </div>
  </div>
</template>
