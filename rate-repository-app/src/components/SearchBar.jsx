import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const SearchBar = ({ setSearchKeyWord }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    setSearchKeyWord(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchKeyWord]);

  const handleInputChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={handleInputChange}
      value={searchQuery}
    />
  );
};

export default SearchBar;
