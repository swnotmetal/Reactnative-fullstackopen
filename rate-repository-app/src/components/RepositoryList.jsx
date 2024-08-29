import React from 'react';
import { FlatList, View, StyleSheet, } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link, } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import { useState } from 'react';
import SearchBar from './SearchBar';

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
    borderRadius: 5,
    borderWidth: 1,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    height: 55,
  }
});

export class RepositoryListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: props.order || 'latest',
    };
  }

    handleOrderChange = (itemValue) => {
    this.setState({ order: itemValue });
    this.props.setOrder(itemValue);
  }

  renderHeader = () => {
    const { order } = this.state;
    return (
      <View style={styles.pickerContainer}>
          <SearchBar setSearchKeyWord={this.props.setSearchKeyWord} />
        <Picker
          style={styles.picker}
          selectedValue={order}
          onValueChange={this.handleOrderChange}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      
      </View>
    );
  }

   
    
    render() {
      const {repositories} = this.props;
      const {onEndReach} = this.props;
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
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}

          ListHeaderComponent={this.renderHeader}
      />
    );
};
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const [order, setOrder] = useState('latest');
  const [keyWord, setSearchKeyWord] = useState('');

  let orderBy
  let orderDirection


  switch (order) {
    /*case 'select':
      orderBy = '';
      orderDirection = '';
      break;*/  // removed for the backend does not support this option
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';

      break;
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC'

      break;
    case 'lowest':  
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';

      break;      

  }


  const {repositories, fetchMore, loading} = useRepositories({
    first: 4,
    orderBy, 
    orderDirection, 
    keyWord});
  
    const onEndReach = () => {
      if (!loading && fetchMore) {
        fetchMore();
      }
    };

  return (
    <>
   
  <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} order={order} setOrder={setOrder} keyWord={keyWord} setSearchKeyWord={setSearchKeyWord}/>
  </>
  );
};




export default RepositoryList;