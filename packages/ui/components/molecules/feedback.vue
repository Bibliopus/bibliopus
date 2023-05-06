<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';

defineProps<{
  open: Boolean
}>();

const emits = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'submit', value: {
    type: string
    content: string
    subscribed: boolean
  }): void
}>();

const feedbacktypes = ref([
  { name: 'Issue', placeholder: 'I have an issue with...' },
  { name: 'Suggestion', placeholder: 'I have a suggestion for...' },
  { name: 'Other', placeholder: 'I want to talk about...' },
]);

const selectedFeedbackTypeIndex = ref(0);
const selectedFeeback = computed(() => feedbacktypes.value[selectedFeedbackTypeIndex.value]);
const feedbackContent = ref('');
const wantToBeContacted = ref(false);

const changeTab = (index: number) => {
  selectedFeedbackTypeIndex.value = index;
};

const submitFeedback = async () => {
  emits('submit', {
    type: selectedFeeback.value.name,
    content: feedbackContent.value,
    subscribed: wantToBeContacted.value,
  });
  selectedFeedbackTypeIndex.value = 0;
  feedbackContent.value = '';
  wantToBeContacted.value = false;
  emits('update:open', false);
};
</script>

<template>
  <AtomsModal
    :open="open"
    title="Give us your feedback"
    @update:open="$emit('update:open', $event)"
  >
    <div class="w-full">
      <TabGroup
        :selected-index="selectedFeedbackTypeIndex"
        @change="changeTab"
      >
        <TabList class="flex gap-x-2">
          <Tab
            v-for="feedbacktype in feedbacktypes"
            :key="feedbacktype.name"
            class="w-full"
          >
            <AtomsInputButton class="w-full">
              {{ feedbacktype.name }}
            </AtomsInputButton>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            v-for="feedbacktype in feedbacktypes"
            :key="feedbacktype.name"
            class="mt-2"
          >
            <form
              class="flex flex-col gap-y-2"
              @submit.prevent="submitFeedback"
            >
              <AtomsInputTextArea
                v-model="feedbackContent"
                class="w-full h-[100px]"
                name="feedback-content"
                :placeholder="feedbacktype.placeholder"
              />
              <AtomsInputCheckbox
                v-model="wantToBeContacted"
                name="want-to-be-contacted"
                label="I want to be contacted about future updates."
              />
              <AtomsInputButton
                type="submit"
                class="w-full"
              >
                Send
              </AtomsInputButton>
            </form>
          </tabpanel>
        </TabPanels>
      </TabGroup>
    </div>
  </AtomsModal>
</template>
