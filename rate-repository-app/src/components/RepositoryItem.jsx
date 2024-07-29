import React from "react";
import { View } from "react-native";
import Text from './Text';

const RepositoryItem = ({fullName, description, language, stars, forks, reviews, rating}) => (
    <View>
        <Text>Full name: {fullName}</Text>
        <Text>Description: {description}</Text>
        <Text>Language: {language}</Text>
        <Text>Starts: {stars}</Text>
        <Text>Forks: {forks}</Text>
        <Text>Reviews: {reviews}</Text>
        <Text>Rating: {rating}</Text>
    </View>
)

export default RepositoryItem;