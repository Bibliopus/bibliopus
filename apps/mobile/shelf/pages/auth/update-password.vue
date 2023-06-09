<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['auth'],
});

useHead({ title: 'Update password' });

const { auth } = useSupabaseAuthClient();
const password = ref('');
const passwordConfirmation = ref('');
const errorMessage = ref('');

const passwordIsInvalid = computed(() => unref(password) !== unref(passwordConfirmation));

const resetPassword = async (event: Event) => {
  event.preventDefault();
  if (passwordIsInvalid.value)
    return errorMessage.value = 'Passwords do not match.';
  const { error } = await auth.updateUser({
    password: unref(password),
  });

  if (error)
    errorMessage.value = 'Could not reset password. Please check that your password is valid.';
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
    <form class="flex flex-col w-full gap-4" @submit="resetPassword">
      <p class="text-dune-100 text-sm">
        To request a reset password email, please fill the form below.
      </p>
      <AtomsInputText
        v-model="password"
        type="password"
        placeholder="Password"
        name="current-password"
        class="input input-bordered w-full"
      />
      <AtomsInputText
        v-model="passwordConfirmation"
        type="password"
        placeholder="Password confirmation"
        name="current-password-confirmation"
        class="input input-bordered w-full"
      />
      <AtomsError v-if="errorMessage">
        {{ errorMessage }}
      </AtomsError>
      <AtomsInputButton type="submit">
        Update password
      </AtomsInputButton>
    </form>
  </div>
</template>
