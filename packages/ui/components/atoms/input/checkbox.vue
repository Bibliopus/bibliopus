<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    modelValue: boolean
    label: string
  }>(),
  {
    modelValue: false,
  },
);

defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>();
</script>

<template>
  <label class="flex items-center group">
    <input
      type="checkbox"
      class="sr-only"
      :name="name"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    >
    <div
      class="
        flex justify-center items-center bg-900 rounded p-1 border border-dune-800
        group-hover:bg-dune-800 group-hover:border-dune-600
        transition-colors
        cursor-pointer
      "
      :class="{ '!bg-dune-50 !border-dune-50': modelValue }"
    >
      <Icon
        name="ph:check-bold"
        size="16"
        class="text-dune-900 group-hover:text-dune-300 transition-colors"
        :class="{ '!text-dune-950': modelValue }"
      />
    </div>
    <span class="ml-2 text-dune-50">{{ label }}</span>
  </label>
</template>
