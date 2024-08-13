import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({ 
        variables: { credentials: { username, password } } 
      });
      
      if (data?.authenticate?.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        console.log("User has signed in successfully", data);
        await client.resetStore();
      } else {
        console.log("Sign in failed: No access token received");
      }
      
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;