import type { SupabaseClient } from '@supabase/supabase-js';

export const useSupabase = () => {
  const app = useNuxtApp();
  const supabase = app.$supabase as SupabaseClient;

  if (!app.$supabase) {
    // console.log('supabase', supabase);
    throw new Error('Supabase Not Initialized Properly');
  }

  const signUp = async (email: string, password: string) => await supabase.auth.signUp({
    email,
    password,
  });

  const signIn = async (email: string, password: string) => await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const signOut = async () => await supabase.auth.signOut();

  const getUser = async () => (await supabase.auth.getUser()).data.user;

  const isAuthenticated = async () => !!(await getUser());

  return {
    client: supabase,
    signUp,
    signIn,
    signOut,
    getUser,
    isAuthenticated,
  };
};
