export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated } = useUser();
  const userIsAuthenticated = await isAuthenticated();
  console.log('isAuthenticated', userIsAuthenticated);
  if (!userIsAuthenticated) {
    console.log('navigateTo', '/auth/sign-up');
    return navigateTo('/auth/sign-up', { redirectCode: 401 });
  }
});
