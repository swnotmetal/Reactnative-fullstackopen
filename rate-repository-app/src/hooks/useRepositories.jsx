
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (orderBy, orderDirection) => {
  const { loading , data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection  }
  },
  );

  if (loading) {
    return <div>Loading....</div>;
  }

  return { repositories:data?.repositories };

};

export default useRepositories;