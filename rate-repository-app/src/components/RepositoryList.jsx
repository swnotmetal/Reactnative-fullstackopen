import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link, useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});




export const RepositoryListContainer = ({ repositories }) => {
  const repoNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
    
    return (
      <FlatList
        data={repoNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => 
          <Link to={`/repository/${item.id}`}>
        
          <RepositoryItem 
              fullName={item.fullName}
              description={item.description}
              language={item.language}
              stars={item.stargazersCount}
              forks={item.forksCount}
              reviews={item.reviewCount}
              rating={item.ratingAverage}
              avatar={item.ownerAvatarUrl}
          />
          </Link>
          }
      />
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const {repositories} = useRepositories();

  return (
  <RepositoryListContainer repositories={repositories} />
  
  );
};




export default RepositoryList;