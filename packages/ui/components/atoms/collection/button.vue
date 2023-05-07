<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    active?: boolean
    pending?: boolean
  }>(),
  {
    icon: 'ph-bookmark',
    active: false,
    pending: false,
  },
);
</script>

<template>
  <div class="w-full flex flex-col items-center gap-1">
    <button
      class="btn w-full flex items-center justify-center"
      :class="{
        '!bg-dune-50 !border-dune-50': active,
        'animate-pulse': pending,
      }"
    >
      <Icon
        v-if="pending"
        name="ph:spinner"
        size="24"
        class="text-dune-50 animate-spin transition-colors"
        :class="{ '!text-dune-950': active }"
      />
      <Icon
        v-else
        :name="icon"
        size="24"
        class="text-dune-50 transition-colors"
        :class="{ '!text-dune-950': active }"
      />
    </button>
    <span class="text-dune-50 text-sm">
      <slot />
    </span>
  </div>
</template>
