<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
useHead({ title: 'Home' });

const isbn = ref('');
const searchValue: Ref<string> = useState('search');
searchValue.value = '';

const searchIsbn = async (event: Event) => {
  event.preventDefault();
  if (isbn.value) {
    // addToHistory(isbn.value);
    await navigateTo(`/books/${unref(isbn)}`);
  }
};

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
        isbn="0425027066"
        title="Dune"
        :authors="['Frank Herbert']"
        cover="https://covers.openlibrary.org/b/id/11157826-L.jpg"
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
