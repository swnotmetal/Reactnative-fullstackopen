import RepositoryItem from "./RepositoryItem"
import React from 'react'
import { useParams } from "react-router-native"
import useSingleRepo from "../hooks/useSingleRepo"
import { Pressable, Text, StyleSheet } from "react-native"
import * as Linking from 'expo-linking';


const styles = StyleSheet.create({

  button: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },

});

export const SingleRepoPage = () => {
    const { id } = useParams()
    const { repository } = useSingleRepo(id)
    const handlePress = () => {
        Linking.openURL(repository?.url)
    }
    return (
        <>
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
        </>
    )
}