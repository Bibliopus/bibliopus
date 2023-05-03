<script setup lang="ts">
defineProps<{
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  value?: string
  name?: string
  autocomplete?: string
  autofocus?: boolean
  disabled?: boolean
}>();

defineEmits<{
  (event: 'input', value: string): void
}>();
</script>

<template>
  <input
    :type="type"
    class="rounded w-full bg-dune-50 p-3"
    :placeholder="placeholder"
    :value="value"
    :name="name"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :disabled="disabled"
    @input="$emit('input', value)"
  >
</template>
