<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['guest'],
});
const { auth } = useSupabaseAuthClient();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const signInAndRedirect = async (event: Event) => {
  event.preventDefault();
  const { error } = await auth.signInWithPassword({
    email: unref(email),
    password: unref(password),
  });

  if (error)
    errorMessage.value = error.message;
  else
    await navigateTo('/');
};
</script>

<template>
  <div class="m-5">
    <h2 class="font-serif text-3xl text-center my-8">
      Bibliopus
    </h2>
    <form class="flex flex-col w-full gap-4" @submit="signInAndRedirect">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        name="email"
        class="input input-bordered w-full"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        name="current-password"
        class="input input-bordered w-full"
      >
      <!-- <input type="text" placeholder="Address" name="address" class="input input-bordered w-full"> -->
      <p v-if="errorMessage" class="text-error">
        {{ errorMessage }}
      </p>
      <button class="btn btn-primary" type="submit">
        Sign in
      </button>
    </form>
    <NuxtLink to="/auth/sign-up" class="inline-block link mt-4">
      Don't have an account? Sign up!
    </NuxtLink>
  </div>
</template>
