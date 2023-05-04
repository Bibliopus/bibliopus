<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['guest'],
});

useHead({ title: 'Sign in' });

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
  <div class="flex flex-col justify-end h-screen -mt-8 gap-8 pb-[70px] relative z-10">
    <header class="flex items-center gap-3">
      <NuxtLink to="/">
        <img
          src="~/assets/img/logo.svg"
          class="w-10"
        >
      </NuxtLink>
      <h1 class="text-dune-100 text-3xl">
        Bibliopus
      </h1>
    </header>
    <form class="flex flex-col w-full gap-4" @submit="signInAndRedirect">
      <AtomsInputText
        v-model="email"
        type="email"
        placeholder="Email"
        name="email"
        class="input input-bordered w-full"
      />
      <AtomsInputText
        v-model="password"
        type="password"
        placeholder="Password"
        name="current-password"
        class="input input-bordered w-full"
      />
      <p v-if="errorMessage" class="text-error">
        {{ errorMessage }}
      </p>
      <NuxtLink to="/auth/sign-up" class="underline text-dune-300 text-sm">
        No account yet? Sign up.
      </NuxtLink>
      <AtomsInputButton type="submit">
        Sign in
      </AtomsInputButton>
    </form>
  </div>
</template>
