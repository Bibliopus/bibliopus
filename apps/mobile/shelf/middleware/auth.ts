export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated } = useSupabase();

  if (!await isAuthenticated())
    return navigateTo('/auth/sign-up', { redirectCode: 401 });
});
