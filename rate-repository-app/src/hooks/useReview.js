import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";
import { Text } from "react-native";

const useReviews = (id) => {
    const { data, loading, error } = useQuery(GET_REVIEWS, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });

    console.log('reviewsid', id)

    if (loading) return <Text>Loading...</Text>;

    if (error) {
      console.log('errorre', error);
      return <Text>Error</Text>;
    }

    return { reviews: data?.repository.reviews, loading };
}

export default useReviews;