import React from 'react';
import { FlatList, View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import useMyReview from '../hooks/useMyReview';
import useDeleteReview from '../hooks/useDeleteReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    button: {
      backgroundColor: '#0366d6',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      margin: 10,
    },
    deleteButton: {
      backgroundColor: '#C7253E',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      margin: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    reviewItem: {
      backgroundColor: 'white',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    ratingCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#0366d6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rating: {
      color: '#0366d6',
      fontSize: 16,
      fontWeight: 'bold',
    },
    username: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    date: {
      color: '#666',
      fontSize: 14,
    },
    reviewText: {
      marginTop: 10,
      fontSize: 14,
      lineHeight: 20,
    },
    separator: {
        height: 10,
    },
  });
  



const ReviewItem = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();


  const handleDelete = async () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            console.log("Delete button pressed for review id:", review.id);
            try {
              const result = await deleteReview(review.id);
              console.log("Delete result:", result);
              if (result && result.deleteReview) {
                console.log("Review deleted successfully");
                await refetch();
              } else {
                console.log("Delete operation didn't return expected result:", result);
              }
            } catch (e) {
              console.error("Error deleting review:", e);
            }
          }
        }
      ],
      { cancelable: false }
    );
  }; // with andorid emulator fails me on "ERROR  TypeError: Cannot read property 'NativeModule' of undefined, js engine: hermes", I had to assume that this works since the similiar codes work with the web version of the app.
 

  /*  const handleDelete = async () => {
    console.log("Delete button pressed for review id:", review.id);
    try {
      const result = await deleteReview(review.id);
      console.log("Delete result:", result);
      if (result && result.deleteReview) {
        console.log("Review deleted successfully");
        await refetch();
      } else {
        console.log("Delete operation didn't return expected result:", result);
      }
    } catch (e) {
      console.error("Error deleting review:", e);
    }
  };*/ //the above code is the original code for the handleDelete function, it is left here because I could not get the andorid emulator to work at all, and this works with the web version of the app.
    return (
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <View style={styles.ratingCircle}>
            <Text style={styles.rating}>{review.rating}</Text>
          </View>
          <View>
            <Text style={styles.username}>{review.user?.username}</Text>
            <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
        <Text style={styles.reviewText}>{review.text}</Text>
        <Pressable style={styles.button} onPress={() => {navigate(`/repository/${review.repositoryId}`)}}>
          <Text style={styles.buttonText}>View Repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Review</Text>
        </Pressable>
      </View>
    );
  };
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { reviews, loading, error, refetch } = useMyReview();
    console.log(reviews, "reviews in my reviews component");

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading reviews</Text>;
    }

    const reviewNodes = reviews?.edges
        ? reviews.edges.map(edge => edge.node)
        : [];

    console.log("edges", reviews?.edges);

    return (
        <View style={styles.container}>
            {reviewNodes.length > 0 ? (
                <FlatList
                    data={reviewNodes}
                    renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
                    ItemSeparatorComponent={ItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>No reviews found</Text>
            )}
        </View>
    )
};

export default MyReviews;

