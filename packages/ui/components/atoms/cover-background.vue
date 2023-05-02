<script setup lang="ts">
const props = defineProps<{
  columns: number
  rows: number
}>();

const booksApiUrl = useRuntimeConfig().public.booksApiUrl;

const { data: covers } = await useFetch(
  `${booksApiUrl}/covers/random?amount=${props.columns * props.rows}`,
);

// Create a computed property to get the covers in a 2D array named columns
const imageColumns = computed(() => {
  const columns = [];
  for (let i = 0; i < props.columns; i++)
    columns.push((covers.value as { cover: string }[]).slice(i * props.rows, (i + 1) * props.rows));

  return columns;
});
</script>

<template>
  <div
    class="
      w-full h-full overflow-hidden relative
      before:content[''] before:absolute before:inset-0 before:w-full before:h-full
      before:bg-gradient-to-b before:from-dune-950/95 before:via-dune-950/50 before:to-dune-950 before:z-10
    "
  >
    <div class="flex gap-4 absolute w-max left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
      <div
        v-for="(imageRows, column) in imageColumns"
        :key="column"
        class="flex flex-col gap-4"
      >
        <img
          v-for="(imageRow, index) in imageRows"
          :key="index"
          class="rounded w-[110px] object-cover aspect-[180/270]"
          :src="imageRow.cover"
          alt=""
          aria-hidden="true"
        >
      </div>
    </div>
  </div>
</template>
