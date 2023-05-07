<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Home' });

const { getUserRecentlyAddedEditions } = useEdition();
const { getUser } = useUser();

const searchValue: Ref<string> = useState('search');
searchValue.value = '';

const { data: user } = await getUser();
const { data: recentlyAddedEditions } = user.value ? await getUserRecentlyAddedEditions(user.value?.id) : { data: ref([]) };

const open = ref(false);

const { sendUserFeedback } = useFeedback();

const submitFeedback = (feedback: any) => {
  sendUserFeedback(feedback);
};

const selectedCollection = ref(1);
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
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="section-title">
        Your collections
      </h2>
      <MoleculesCollectionSelect
        v-model:selected="selectedCollection"
        :collections="[
          { id: 1, name: 'To read' },
          { id: 2, name: 'Reading' },
          { id: 3, name: 'Read' },
        ]"
        :editions="[
          {
            title: 'Dune',
            authors: ['Frank Herbert'],
            cover: 'https://covers.openlibrary.org/b/id/11157826-L.jpg',
          },
          {
            title: 'Dune Messiah',
            authors: ['Frank Herbert'],
            cover: 'https://covers.openlibrary.org/b/id/9256650-L.jpg',
          },
          {
            title: 'Children of Dune',
            authors: ['Frank Herbert'],
            cover: 'https://covers.openlibrary.org/b/id/8357660-L.jpg',
          },
        ]"
      />
    </div>
    <AtomsInputButton @click="open = !open">
      Give your feedback
    </AtomsInputButton>
    <MoleculesFeedback v-model:open="open" @submit="submitFeedback" />
  </div>
</template>
