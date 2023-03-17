<template>
  <div class="flex justify-between flex-wrap h-screen">
    <div class="w-2/5 h-full bg-gray-700"></div>
    <div class="w-3/5 h-full flex flex-col justify-between p-12">
      <div class=" flex items-center gap-x-4 self-end">
        <a href="#">Sign up</a>
        <button class="btn btn-outline btn-primary">Sign in</button>
      </div>
      <div class="my-auto max-w-md">
        <h1 class="text-6xl pb-4 bold font-serif">Bibliopus</h1>
        <p class="pb-8">Help people to exchange their books with other people, create a real interaction between readers and extend the durability of books</p>
        <button class="btn btn-primary flex gap-x-2 hover:gap-x-4 transition-all">
          Get started
          <Icon name="ph:arrow-right-bold" size="24" />
        </button>
      </div>
      <div>
        <p class="pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div class="input-group">
          <input type="text" placeholder="mail" class="input input-bordered w-full max-w-xs" />
          <button class="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</template>
