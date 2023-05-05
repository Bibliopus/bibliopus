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
</script>

<template>
  <div class="flex flex-col my-8 gap-8">
    <div class="flex flex-col gap-4">
      <h2 class="section-title">
        Recently added
      </h2>
      <AtomsBookItem
        isbn="9780736692403"
        title="Dune"
        :authors="[{ name: 'Frank Herbert' }]"
        cover="https://covers.openlibrary.org/b/id/13440809-L.jpg"
      />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="section-title">
        Your collections
      </h2>
      <MoleculesCollectionSelect />
    </div>
    <AtomsInputButton @click="open = !open">
      Give your feedback
    </AtomsInputButton>
    <MoleculesFeedback v-model:open="open" @submit="submitFeedback" />
  </div>
</template>
