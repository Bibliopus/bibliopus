<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Home' });

const { getUserRecentlyAddedEditions, getEditionsFromCollection, getEditionCountFromCollection } = useEdition();
const { getCollectionsFromUser, getSharingCollection } = useCollection();
const { getUserProfile, getUser } = useUser();

const { params } = useRoute();
const userId = params.id as string;

const { data: profile } = await getUserProfile(userId);
const { data: recentlyAddedEditions } = await getUserRecentlyAddedEditions(userId);
const { data: userCollections } = await getCollectionsFromUser(userId);

const isAuthProfile = await useAsyncData(async () => {
  return userId === (await getUser()).data.value?.id;
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

const { data: sharingCollection } = await getSharingCollection(userId);
const { data: sharingEditions } = await useAsyncData(async () => {
  if (sharingCollection.value)
    return (await getEditionsFromCollection(sharingCollection.value.id)).data.value;
  return [];
});
const sharingCount = computed(() => sharingEditions.value?.length ?? 0);

const selectedCollection = collections.value && collections.value.length > 0 ? ref(collections.value[0].id) : ref(null);
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
    <MoleculesUserProfileCard
      :id="isAuthProfile ? null : userId"
      :first-name="profile?.first_name ?? ''"
      :last-name="profile?.last_name ?? ''"
      :joined-at="profile?.joined_at ?? ''"
    />
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
        No added edition yet.
      </AtomsError>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="section-title">
        Sharing
      </h2>
      <p v-if="sharingEditions?.length && sharingEditions.length > 0" class="text-dune-300">
        {{ sharingCount }} edition{{ sharingCount === 1 ? '' : 's' }}
      </p>
      <AtomsBookItem
        v-for="(edition, index) in sharingEditions"
        :key="index"
        :isbn="edition.isbn"
        :title="edition.title"
        :authors="edition.authors"
        :cover="edition.cover"
      />
      <AtomsError v-if="sharingEditions?.length === 0">
        Not sharing any edition yet.
      </AtomsError>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="section-title">
        Collections
      </h2>
      <MoleculesCollectionSelect
        v-if="collections?.length > 0"
        :selected="selectedCollection"
        :collections="collections ?? []"
        :editions="selectedEditions as any[] ?? []"
        @update:selected="setSelectedCollection($event)"
      />
      <AtomsError v-else>
        All your collections are empty.
      </AtomsError>
    </div>
  </div>
</template>
