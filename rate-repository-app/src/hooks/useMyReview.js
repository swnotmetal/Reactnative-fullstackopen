import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMyReview = () => {
    const { data, loading, error, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true }
    });

    if (loading) return 'loading';
    if (error) return 'error';

    console.log("my reviews hook data fetched?", data);
    return {reviews: data?.me.reviews || [], refetch};
};

export default useMyReview;