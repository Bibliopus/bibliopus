export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated } = useUser();

  if (!await isAuthenticated())
    return navigateTo('/auth/sign-up', { redirectCode: 401 });
});
