<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['guest'],
});

useHead({ title: 'Sign in' });

const { auth } = useSupabaseAuthClient();
const { public: publicConfig } = useRuntimeConfig();
const email = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const resetPassword = async (event: Event) => {
  event.preventDefault();
  const { error } = await auth.resetPasswordForEmail(unref(email), {
    redirectTo: `${publicConfig.url}/auth/update-password`,
  });

  if (error) {
    successMessage.value = '';
    if (error.status === 429)
      errorMessage.value = 'Please wait 60 seconds before you try again.';
    else
      errorMessage.value = 'Could not find an account to reset. Please check your credentials.';
  }
  else {
    errorMessage.value = '';
    successMessage.value = 'An email has been sent to you. Please check your inbox.';
  }
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
        v-model="email"
        type="email"
        placeholder="Email"
        name="email"
        class="input input-bordered w-full"
      />
      <AtomsError v-if="errorMessage">
        {{ errorMessage }}
      </AtomsError>
      <AtomsError v-if="successMessage">
        {{ successMessage }}
        <button type="submit" class="cursor-pointer underline">
          Did not receive anything? Send again.
        </button>
      </AtomsError>
      <AtomsInputButton type="submit">
        Reset password
      </AtomsInputButton>
    </form>
  </div>
</template>
