<script setup lang="ts">
import { UseImage } from '@vueuse/components';

withDefaults(defineProps<{
  mode?: 'home' | 'auth'
}>(), {
  mode: 'home',
});

const container = ref(null);
const { width, height } = useElementSize(container);
const columnCount = computed(() => Math.ceil(width.value / 90));
const rowCount = computed(() => Math.ceil(height.value / 145));

const booksApiUrl = useRuntimeConfig().public.booksApiUrl;

// Init covers
const { data: covers }: { data: Ref<any> } = await useFetch(
  `${booksApiUrl}/covers/random?amount=${columnCount.value * rowCount.value}`,
);

// Create a computed property to get the covers in a 2D array named columns
const imageColumns = computed(() => {
  const columns = [];
  for (let i = 0; i < columnCount.value; i++)
    columns.push((covers.value as { cover: string }[])?.slice(i * rowCount.value, (i + 1) * rowCount.value));
  return columns;
});

// Watch columnsCount to update the covers
watch(
  [columnCount, rowCount],
  () => {
    useFetch(
      `${booksApiUrl}/covers/random?amount=${columnCount.value * rowCount.value}`,
    ).then(
      ({ data }) => covers.value = data.value);
  },
);
</script>

<template>
  <div
    ref="container"
    class="
      w-full h-full overflow-hidden relative
      before:content[''] before:absolute before:inset-0 before:w-full before:h-full
      before:bg-gradient-to-b before:z-10
    "

    :class="{
      'before:from-dune-950/95 before:via-dune-950/50 before:to-dune-950': mode === 'home',
      'before:from-dune-950/95 before:via-dune-950/80 before:to-dune-950 before:to-60%': mode === 'auth',
    }"
  >
    <div class="flex gap-4 absolute w-max left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
      <div
        v-for="(imageRows, column) in imageColumns"
        :key="column"
        class="flex flex-col gap-4"
      >
        <div
          v-for="(image, row) in imageRows"
          :key="row"
        >
          <UseImage
            class="rounded w-[110px] object-cover aspect-[180/270]"
            :src="image.cover"
            alt=""
          >
            <template #loading>
              <div
                class="flex w-[110px] h-[165px] rounded bg-dune-800 group-hover:bg-600 animate-pulse"
              />
            </template>
          </UseImage>
        </div>
      </div>
    </div>
  </div>
</template>
