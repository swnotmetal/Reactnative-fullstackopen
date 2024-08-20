import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../graphql/mutations";


const useSignup = () => {
    const [mutate, result] = useMutation(CREATE_USER);
    
    const signUp = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: { user: { username, password } }
            });
            console.log("new user", data.username);
            return data;
          
        } catch (e) {
            console.log(e);
        }
    };
    
    return [signUp, result];
    }


export default useSignup;