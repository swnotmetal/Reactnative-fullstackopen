import React from 'react'
import { useParams } from "react-router-native"
import useSingleRepo from "../hooks/useSingleRepo"
import useReviews from "../hooks/useReview"
import { Pressable, Text, StyleSheet, View, FlatList } from "react-native"
import * as Linking from 'expo-linking';
import RepositoryItem from "./RepositoryItem"

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
});

const RepositoryInfo = ({ repository }) => {
  const handlePress = () => {
    Linking.openURL(repository?.url)
  }

  return (
    <View>
      <RepositoryItem
        fullName={repository?.fullName}
        description={repository?.description}
        language={repository?.language}
        stars={repository?.stargazersCount}
        forks={repository?.forksCount}
        reviews={repository?.reviewCount}
        rating={repository?.ratingAverage}
        avatar={repository?.ownerAvatarUrl}
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  )
}

const ReviewItem = ({ review }) => {
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
    </View>
  );
};

export const SingleRepoPage = () => {
  const { id } = useParams()
  const { repository, fetchMore, loading, error } = useSingleRepo({id, first: 4})
  const { reviews } = useReviews(repository?.id)
  
  const reviewNodes = reviews?.edges
  .map(edge => edge.node)
  .filter((review, index, self) => self.findIndex(r => r.id === review.id) === index) || [];

  // asked AI for help to filter out duplicate ids in the reviewNodes.

  console.log("all IDS should be unique", reviewNodes.map(item => item.id));
  const onEndReach = () => {
    if (!loading && fetchMore) {
      fetchMore()
    }
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}