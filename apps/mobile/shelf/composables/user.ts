export const useUser = () => {
  const client = useSupabaseClient();

  const getUser = async () =>
    await useAsyncData('user', async () =>
      (await client.auth.getUser()).data.user,
    );

  const isAuthenticated = async () =>
    !!(await (await getUser()).data.value);

  const checkUser = async () =>
    (await client.auth.getUser()).data.user;

  const getUserProfile = async () =>
    await useAsyncData('profile', async () => {
      const { data } = await client
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('id', (await getUser()).data.value?.id)
        .single();
      return data;
    });

  return {
    getUser,
    isAuthenticated,
    getUserProfile,
    checkUser,
  };
};
