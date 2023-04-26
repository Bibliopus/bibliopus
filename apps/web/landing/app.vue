<template>
  <div class="content md:h-screen md:flex md:flex-row-reverse">
    <div class="flex flex-col justify-between gap-y-16 p-8 md:max-h-none md:w-3/5 md:p-12 bg-dune-950 text-dune-50">
      <div class="flex justify-between items-center">
        <img src="./assets/img/logo.svg" width="56px" height="35" />
        <div class="log flex gap-x-4">
          <button class="btn-outline text-dune-50 normal-case">Sign up</button>
          <button class="btn btn-outline text-dune-50 normal-case">Sign in</button>
        </div>
      </div>
      <div class="my-auto max-w-md">
        <h1 class="text-7xl pb-5 bold font-serif">Bibliopus</h1>
        <p class="text-sm pb-7 md:text-base">Help people to exchange their books with other people, create a real interaction between readers and extend the durability of books</p>
        <base-button text="Check our app" />
      </div>
      <div>
        <p class="text-sm pb-4 md:text-base">If you wish to be informed of future updates etc.</p>
        <div class="input-group">
          <input type="text" placeholder="mail" class="input input-bordered w-full max-w-xs text-dune-950" />
          <base-button text="Subscribe" :border="true" @click="showModal = true" />
        </div>
      </div>
    </div>
    <div class="h-screen md:w-2/5"></div>
  </div>
  <modal v-show="showModal" @close-modal="showModal = false" />
</template>

<script>
  export default {
    data() {
      return {
        showModal: false,
      }
    },
  }
</script>
