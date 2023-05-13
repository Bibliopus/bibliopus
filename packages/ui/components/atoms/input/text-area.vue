<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  modelValue?: string
  name: string
  autocomplete?: string
  autofocus?: boolean
  disabled?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}>(), {
  type: 'text',
  placeholder: '',
  modelValue: '',
  autocomplete: 'off',
  autofocus: false,
  disabled: false,
  resize: 'none',
});

defineEmits<{
  (event: 'update:modelValue', modelValue: string): void
}>();
</script>

<template>
  <textarea
    class="rounded w-full bg-dune-50 p-3 text-dune-950"
    :class="{
      'resize-none': resize === 'none',
      'resize-vertical': resize === 'vertical',
      'resize-horizontal': resize === 'horizontal',
      'resize-both': resize === 'both',
    }"
    :placeholder="placeholder"
    :name="name"
    :value="modelValue"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :disabled="disabled"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
