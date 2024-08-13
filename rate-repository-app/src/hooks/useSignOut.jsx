import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

export const useSignOut = () => {  
    const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return [signOut];
}

