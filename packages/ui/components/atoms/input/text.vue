<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  modelValue?: string
  name: string
  autocomplete?: string
  autofocus?: boolean
  disabled?: boolean
}>(), {
  type: 'text',
  placeholder: '',
  modelValue: '',
  autocomplete: 'off',
  autofocus: false,
  disabled: false,
});

defineEmits<{
  (event: 'update:modelValue', modelValue: string): void
}>();
</script>

<template>
  <input
    :type="type"
    class="rounded w-full bg-dune-50 p-3"
    :placeholder="placeholder"
    :value="modelValue"
    :name="name"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :disabled="disabled"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
</template>
