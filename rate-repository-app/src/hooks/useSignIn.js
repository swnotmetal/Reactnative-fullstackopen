import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const AUTHENTICATE = gql`
mutation Authenticate( $credentials: AuthenticateInput ){
    authenticate(credentials: $credentials){
        accessToken
    }
}
`


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE, {
        onSuccess: (data) => {
            console.log(data, "User has signed in successfully")
    },
    onError: (error) => {
        console.log(error, "Error signing in")
    }

});
  
    const signIn = async ({ username, password }) => {
      
        const { data } = await mutate({ variables: { credentials:{ username, password} } });
        return data
    };
  
    return [signIn, result];
  };

export default useSignIn;