export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated } = useUser();

  if (await isAuthenticated())
    return navigateTo('/');
});
