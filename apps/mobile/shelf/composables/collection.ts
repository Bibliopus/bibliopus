export const useCollection = () => {
  const client = useSupabaseClient<any>();
  const { getUser } = useUser();

  const getCollection = async (id: number) =>
    await useAsyncData(`collection-${id}`, async () => {
      const { data } = await client
        .from('collections')
        .select('id, name, user')
        .eq('id', id)
        .maybeSingle();
      return data;
    });

  const getToReadCollection = async () =>
    await useAsyncData('collection-toread', async () => {
      const { data } = await client
        .from('collections')
        .select('id, name, user')
        .eq('name', 'To read')
        .eq('is_custom', false)
        .eq('user', (await getUser()).data.value?.id)
        .maybeSingle();
      return data;
    });

  const getReadingCollection = async () =>
    await useAsyncData('collection-reading', async () => {
      const { data } = await client
        .from('collections')
        .select('id, name, user')
        .eq('name', 'Reading')
        .eq('is_custom', false)
        .eq('user', (await getUser()).data.value?.id)
        .maybeSingle();
      return data;
    });

  const getReadCollection = async () =>
    await useAsyncData('collection-read', async () => {
      const { data } = await client
        .from('collections')
        .select('id, name, user')
        .eq('name', 'Read')
        .eq('is_custom', false)
        .eq('user', (await getUser()).data.value?.id)
        .maybeSingle();
      return data;
    });

  const getSharingCollection = async () =>
    await useAsyncData('collection-sharing', async () => {
      const { data } = await client
        .from('collections')
        .select('id, name, user')
        .eq('name', 'Sharing')
        .eq('is_custom', false)
        .eq('user', (await getUser()).data.value?.id)
        .maybeSingle();
      return data;
    });

  const getCollections = async (ids: number[]) =>
    await useAsyncData(`collections-${ids.join('-')}`, async () => {
      const { data } = await client
        .from('collections')
        .select('id, name, user')
        .in('id', ids);
      return data;
    });

  const getCollectionsFromUser = async (userId: string) =>
    await useAsyncData(`user-collections-${userId}`, async () => {
      const { data } = await client
        .from('collections')
        .select('id, name, user')
        .eq('user', userId);
      return data;
    });

  const getAuthUserCollections = async () =>
    await useAsyncData('user-collections-auth', async () => {
      const userId = (await getUser()).data.value?.id;
      if (!userId)
        throw new Error('User not authenticated');
      return (await getCollectionsFromUser(userId)).data;
    });

  const getCollectionsFromEdition = async (isbn: string) =>
    await useAsyncData(`edition-collections-${isbn}`, async () => {
      const { data } = await client.rpc('get_collections_by_isbn', { isbn });
      // .neq('is_custom', false);
      return data;
    });

  const addEditionToCollection = async (id: number, isbn: string) => {
    await client
      .from('collection_editions')
      .insert([
        { collection: id, edition: isbn },
      ]);
  };

  const removeEditionFromCollection = async (id: number, isbn: string) => {
    await client
      .from('collection_editions')
      .delete()
      .eq('collection', id)
      .eq('edition', isbn);
  };

  const isEditionInCollection = async (id: number, isbn: string) =>
    await useAsyncData(`edition-in-collection-${isbn}-${id}`, async () => {
      const { data } = await client
        .from('collection_editions')
        .select('id')
        .eq('collection', id)
        .eq('edition', isbn)
        .maybeSingle();

      return !!data;
    });

  const toggleEditionInCollection = async (id: number, isbn: string) => {
    const { data: isInCollection } = await isEditionInCollection(id, isbn);
    if (isInCollection.value)
      await removeEditionFromCollection(id, isbn);
    else
      await addEditionToCollection(id, isbn);
    return !isInCollection.value;
  };

  const getCollectionCovers = async (id: number, amount = 3) =>
    await useAsyncData(`collection-covers-${id}-${amount}`, async () => {
      const { data } = await client.rpc('get_random_collection_covers', { collection_id: id, amount });
      return data;
    });

  const getUserHasEdition = async (userId: string, isbn: string) =>
    await useAsyncData(`user-${userId}-has-${isbn}`, async () => {
      const { data } = await client
        .from('user_editions')
        .select()
        .eq('edition', isbn)
        .eq('user', userId)
        .maybeSingle();
      return !!data;
    });

  const getUsersSharingEdition = async (isbn: string) =>
    await useAsyncData(`sharing-${isbn}`, async () => {
      const { data } = await client
        .from('shared_editions')
        .select('user, first_name, last_name')
        .eq('edition', isbn);
      return data;
    });

  return {
    getCollection,
    getCollections,
    getToReadCollection,
    getReadingCollection,
    getReadCollection,
    getSharingCollection,
    getCollectionsFromUser,
    getAuthUserCollections,
    getCollectionsFromEdition,
    addEditionToCollection,
    removeEditionFromCollection,
    isEditionInCollection,
    toggleEditionInCollection,
    getCollectionCovers,
    getUserHasEdition,
    getUsersSharingEdition,
  };
};
