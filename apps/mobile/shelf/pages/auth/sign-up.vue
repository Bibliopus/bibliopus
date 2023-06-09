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

const signUpAndRedirect = async (event: Event) => {
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

  if (error)
    errorMessage.value = 'Could not sign up. Please check the provided information.';
  else await navigateTo('/');
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
    <form class="flex flex-col w-full gap-4" @submit="signUpAndRedirect">
      <div class="flex gap-4">
        <AtomsInputText
          v-model="firstName"
          type="text"
          placeholder="First name"
          name="first-name"
        />
        <AtomsInputText
          v-model="lastName"
          type="text"
          placeholder="Last name"
          name="last-name"
        />
      </div>
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
      <AtomsError v-if="errorMessage">
        {{ errorMessage }}
      </AtomsError>
      <AtomsInputButton type="submit">
        Join
      </AtomsInputButton>
      <NuxtLink to="/auth/sign-in" class="underline text-dune-300 text-sm">
        Already have an account? Sign in.
      </NuxtLink>
    </form>
  </div>
</template>
