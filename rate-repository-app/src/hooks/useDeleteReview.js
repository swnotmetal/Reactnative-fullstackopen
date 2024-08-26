import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    console.log("deleteReview function called with id:", id);
    try {
      const { data } = await mutate({ variables: { id } });
      console.log("Mutation result:", data);
      if (data && data.deleteReview) {
        console.log("Review deleted successfully");
        return data;
      } else {
        console.log("Unexpected mutation result:", data);
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error in deleteReview:", error);
      throw error;
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;