<template>
  <div class="mx-auto max-w-md p-4">
    <div class="absolute top-0 left-0 w-full h-full">
      <AtomsCoverBackground
        :columns="4"
        :rows="7"
        mode="auth"
      />
    </div>
    <main>
      <slot />
    </main>
  </div>
</template>
