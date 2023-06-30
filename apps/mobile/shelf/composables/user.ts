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

  const getUserProfile = async (id?: string) =>
    await useAsyncData(`profile-${id ?? 'me'}`, async () => {
      if (!id)
        id = (await getUser()).data.value?.id;
      const { data } = await client
        .from('profiles')
        .select('id, first_name, last_name, joined_at')
        .eq('id', id)
        .single();
      return data;
    });

  const getUsersProfiles = async (ids: string[]) =>
    await useAsyncData(`profiles-${ids.join('-')}`, async () => {
      const { data } = await client
        .from('profiles')
        .select('id, first_name, last_name, joined_at')
        .in('id', ids);
      return data;
    });

  return {
    getUser,
    isAuthenticated,
    getUserProfile,
    getUsersProfiles,
    checkUser,
  };
};
