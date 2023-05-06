export const useFeedback = () => {
  const client = useSupabaseClient<any>();
  const { getUser } = useUser();

  const sendUserFeedback = async (feedback: {
    type: string
    content: string
    subscribed: boolean
  }) => {
    await client
      .from('feedbacks')
      .insert([
        { ...feedback, user: (await getUser()).data.value?.id },
      ]);
  };

  return {
    sendUserFeedback,
  };
};
