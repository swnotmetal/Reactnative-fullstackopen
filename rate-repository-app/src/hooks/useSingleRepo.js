import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";
import { Text } from "react-native";


console.log('GET_SINGLE_REPOSITORY:', GET_SINGLE_REPO);
 const useSingleRepo = (id) => {
    const { data, loading, error } = useQuery(GET_SINGLE_REPO, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    console.log('singlerepoid', id)

    if (loading) return <Text>Loading...</Text>;

    if (error) {
      console.log('errorre', error);
      return <Text>Error</Text>;
    }

    return { repository: data?.repository, loading };
}

export default useSingleRepo;