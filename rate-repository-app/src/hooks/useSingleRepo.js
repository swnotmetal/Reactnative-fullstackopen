import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";

const useSingleRepo = ({ id, first }) => {
  const { data, loading, error, fetchMore } = useQuery(GET_SINGLE_REPO, {
    variables: { id, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log('Cannot fetch more: either loading or no more pages');
      return;
    }

    console.log('Fetching more singlerepo. Current count:', data.repository.reviews.edges.length);
    console.log('End cursor singlerepo:', data.repository.reviews.pageInfo.endCursor);

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first,
        id
      },
    });
  };

  return { 
    repository: data?.repository, 
    loading, 
    fetchMore: handleFetchMore, 
    error 
  };
};

export default useSingleRepo;