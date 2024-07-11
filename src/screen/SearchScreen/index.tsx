import React from 'react';
import {TouchableOpacity} from 'react-native';

import {SearchProps} from '../../types/routes';
import {Container, Text} from './styles';

function Search({navigation}: SearchProps) {
  return (
    <Container>
      <Text>Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
        <Text>Favorite</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default Search;
