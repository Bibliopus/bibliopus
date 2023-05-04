<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['guest'],
});

useHead({ title: 'Sign up' });

const { auth } = useSupabaseAuthClient();
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const errorMessage = ref('');

const signUnAndRedirect = async (event: Event) => {
  event.preventDefault();
  const { error } = await auth.signUp({
    email: unref(email),
    password: unref(password),
    options: {
      data: {
        first_name: unref(firstName),
        last_name: unref(lastName),
      },
    },
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    errorMessage.value = error.message;
  }
  else { await navigateTo('/'); }
};
</script>

<template>
  <div class="m-5">
    <h2 class="font-serif text-3xl text-center my-8">
      Bibliopus
    </h2>
    <form class="flex flex-col w-full gap-4" @submit="signUnAndRedirect">
      <div class="flex gap-4">
        <input
          v-model="firstName"
          type="text"
          placeholder="First name"
          name="first-name"
          class="input input-bordered w-full"
        >
        <input
          v-model="lastName"
          type="text"
          placeholder="Last name"
          name="last-name"
          class="input input-bordered w-full"
        >
      </div>
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
      <p v-if="errorMessage" class="text-error">
        {{ errorMessage }}
      </p>
      <!-- <input type="text" placeholder="Address" name="address" class="input input-bordered w-full"> -->
      <button class="btn btn-primary" type="submit">
        Sign up
      </button>
    </form>
    <NuxtLink to="/auth/sign-in" class="inline-block link mt-4">
      Already have an account? Sign in!
    </NuxtLink>
  </div>
</template>
