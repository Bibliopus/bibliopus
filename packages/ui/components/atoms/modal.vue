<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

defineProps<{
  open: boolean
  title: string
}>();

defineEmits<{
  (event: 'update:open', value: boolean): void
}>();
</script>

<template>
  <!-- Wrap your dialog in a `TransitionRoot`. -->
  <TransitionRoot
    :show="open"
    as="template"
  >
    <Dialog
      class="relative z-10"
      @close="$emit('update:open', $event)"
    >
      <!-- Wrap your backdrop in a `TransitionChild`. -->
      <TransitionChild
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-dune-950/90 z-10" />
      </TransitionChild>

      <div class="p-4 fixed bottom-0 z-20 max-w-md w-full h-fit left-1/2 -translate-x-1/2">
        <!-- Wrap your panel in a `TransitionChild`. -->
        <TransitionChild
          enter="duration-200 ease-out"
          enter-from="opacity-0 translate-y-full"
          enter-to="opacity-100 translate-y-0"
          leave="duration-150 ease-in"
          leave-from="opacity-100 translate-y-0"
          leave-to="opacity-0 translate-y-full"
        >
          <DialogPanel class="p-3 bg-dune-950 border border-dune-900 rounded flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <DialogTitle class="text-xl text-dune-50">
                {{ title }}
              </DialogTitle>
              <AtomsInputIconButton
                icon="ph:x"
                @click="$emit('update:open', false)"
              />
            </div>
            <slot />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
