<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder: string
    modelValue?: string
    name: string
    autocomplete?: string
    autofocus?: boolean
    disabled?: boolean
  }>(), {
    modelValue: '',
    autocomplete: 'off',
    autofocus: false,
    disabled: false,
  },
);

defineEmits<{
  (event: 'update:modelValue', modelValue: string): void
  (event: 'focus'): void
}>();

const input = ref();
const { focused } = useFocus(input);
</script>

<template>
  <label
    :for="name"
    class="relative flex rounded-full w-full bg-dune-50 items-center pl-3 gap-2"
    @click="focused = true"
  >
    <Icon
      name="ph-magnifying-glass"
      size="24"
      class=" text-dune-900"
    />
    <input
      ref="input"
      type="text"
      class="text-sm p-3 pl-0 w-full bg-transparent rounded-e-full outline-none placeholder:text-dune-400 text-dune-950"
      :placeholder="placeholder"
      :value="modelValue"
      :name="name"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="$emit('focus')"
    >

  </label>
</template>
