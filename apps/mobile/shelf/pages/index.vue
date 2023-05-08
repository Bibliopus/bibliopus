<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Home' });

const { getUserRecentlyAddedEditions, getEditionsFromCollection } = useEdition();
const { getCollectionsFromUser } = useCollection();
const { getUser } = useUser();

const searchValue: Ref<string> = useState('search');
searchValue.value = '';

const { data: user } = await getUser();
const { data: recentlyAddedEditions } = user.value ? await getUserRecentlyAddedEditions(user.value?.id) : { data: ref([]) };

const open = ref(false);

const { sendUserFeedback } = useFeedback();

const { data: collections } = user.value ? await getCollectionsFromUser(user.value?.id) : { data: ref([]) };
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
        Your collections
      </h2>
      <MoleculesCollectionSelect
        :selected="selectedCollection"
        :collections="collections ?? []"
        :editions="selectedEditions as any[] ?? []"
        @update:selected="setSelectedCollection($event)"
      />
    </div>
    <AtomsInputButton @click="open = !open">
      Give your feedback
    </AtomsInputButton>
    <MoleculesFeedback v-model:open="open" @submit="sendUserFeedback" />
  </div>
</template>
