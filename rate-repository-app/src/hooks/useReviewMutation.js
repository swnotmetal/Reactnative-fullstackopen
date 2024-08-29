import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateAReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  console.log('reviewResult', result);

  const createAReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      console.log('there is data', data.createReview.repositoryId);
      
      return { data };
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  };

  return [createAReview, result];
};

export default useCreateAReview;