export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated } = useUser();
  const userIsAuthenticated = await isAuthenticated();
  if (!userIsAuthenticated)
    return navigateTo('/auth/sign-up', { redirectCode: 401 });
});
