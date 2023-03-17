<template>
  <div class="content md:h-screen md:flex md:flex-row-reverse">
    <div class="flex flex-col justify-between gap-y-16 p-8 md:max-h-none md:w-3/5 md:p-12">
      <div class="flex justify-between items-center">
        <div class="logo w-8 h-8 ">Logo</div>
        <div class="log flex gap-x-4">
          <button class="btn-outline btn-primary normal-case">Sign up</button>
          <button class="btn btn-outline btn-primary normal-case">Sign in</button>
        </div>
      </div>
      <div class="my-auto max-w-md">
        <h1 class="text-5xl pb-5 bold font-serif">Bibliopus</h1>
        <p class="text-sm pb-7 md:text-base">Help people to exchange their books with other people, create a real interaction between readers and extend the durability of books</p>
        <button class="btn btn-primary flex gap-x-2 hover:gap-x-4 transition-all">
          Get started
          <Icon name="ph:arrow-right-bold" size="24" />
        </button>
      </div>
      <div>
        <p class="text-sm pb-4 md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div class="input-group">
          <input type="text" placeholder="mail" class="input input-bordered w-full max-w-xs" />
          <button class="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
    <div class="h-screen bg-gray-700 md:w-2/5"></div>
  </div>
</template>
