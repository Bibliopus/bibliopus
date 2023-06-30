import type { RealtimeChannel } from '@supabase/supabase-js';

export const useMessages = () => {
  const client = useSupabaseClient<any>();
  const { getUser } = useUser();

  const subscribeToMessages = async (refreshFunctions: (() => void)[]) => {
    let realtimeChannel: RealtimeChannel;

    onMounted(() => {
      realtimeChannel = client.channel('public:messages').on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => refreshFunctions.forEach(async f => await f()),
      );
      realtimeChannel.subscribe();
    });

    onUnmounted(() => {
      client.removeChannel(realtimeChannel);
    });
  };

  const getUsersFromMessages = async () => {
    const authId = (await getUser()).data.value?.id;
    return await useAsyncData(`messages-users-${authId}`, async () => {
      const { data } = await client
        .rpc('get_users_from_messages', {
          authenticated_user: authId,
        });
      return data;
    });
  };

  const getLastMessage = async (user: string) => {
    const authId = (await getUser()).data.value?.id;
    return await useAsyncData(`last-message-${authId}-${user}`, async () => {
      const { data } = await client
        .rpc('get_last_message_with_user', {
          authenticated_user: authId,
          interlocutor: user,
        }).select('content, created_at').maybeSingle();
      return data;
    });
  };

  const getMessages = async (user: string) => {
    const authId = (await getUser()).data.value?.id;
    return await useAsyncData(`users-messages-${authId}-${user}`, async () => {
      const { data } = await client
        .rpc('get_user_messages_with_user', {
          authenticated_user: authId,
          interlocutor: user,
        });
      return data;
    });
  };

  const sendMessage = async (user: string, message: string) => {
    const authId = (await getUser()).data.value?.id;
    await client
      .from('messages')
      .insert([
        {
          sender: authId,
          receiver: user,
          content: message,
        },
      ]);
  };

  return {
    subscribeToMessages,
    getUsersFromMessages,
    getLastMessage,
    getMessages,
    sendMessage,
  };
};
