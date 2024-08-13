import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';

console.log("expoConfig",Constants.expoConfig.extra);

 const { apolloUri } = Constants.expoConfig.extra;

 const httpLink = createHttpLink({
    uri: apolloUri,
  });



  const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        console.log("accessToken in apolloClient",accessToken);
        return {
          headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        };
      } catch (e) {
        console.log("error",e);
        return {
          headers,
        };
      }
    });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };


export default createApolloClient;