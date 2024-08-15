import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Text from './Text';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading,
    marginBottom: 5,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  language: {
    alignSelf: 'flex-start',
    color: theme.colors.textThird,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statsItem: {
    alignItems: 'center',
  },
});

const thousandIsK = (number) => {
  return number > 1000 ? `${Math.round(number / 100) / 10}k` : number.toString();
};

const StatItem = ({ label, value }) => (
  <View style={styles.statsItem}>
    <Text fontWeight="bold">{thousandIsK(value)}</Text>
    <Text>{label}</Text>
  </View>
);

const RepositoryItem = ({ fullName, description, language, stars, forks, reviews, rating, avatar }) => (
  <View style={styles.container} testID="repositoryItem" >
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.language}>{language}</Text>
      </View>
    </View>
    <View style={styles.statsContainer}>
      <StatItem label="Stars" value={stars} />
      <StatItem label="Forks" value={forks} />
      <StatItem label="Reviews" value={reviews} />
      <StatItem label="Rating" value={rating} />
    </View>
  </View>
);

export default RepositoryItem;