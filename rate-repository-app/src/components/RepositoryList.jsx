import { FlatList, View, StyleSheet, } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link, } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  picker: {
    color: 'black',
    borderRadius: 3,
    borderWidth: 1,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    height: 55,
  }
});

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
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

          ListHeaderComponent={() => (
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={order}
                onValueChange={(itemValue) => setOrder(itemValue)}
              > 
                <Picker.Item label="Select an item" value="select" />
                <Picker.Item label="Latest repositories" value="latest" />
                <Picker.Item label="Highest rated repositories" value="highest" />
                <Picker.Item label="Lowest rated repositories" value="lowest" />
              </Picker>
            </View>
          )}
      />
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const [order, setOrder] = useState('latest');

  let orderBy
  let orderDirection

  switch (order) {
    case 'select':
      orderBy = '';
      orderDirection = '';
      break;
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':  
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;      

  }

  const {repositories} = useRepositories(orderBy, orderDirection);

  return (
    <>
   
  <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder}/>
  </>
  );
};




export default RepositoryList;