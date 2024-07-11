import React from 'react';
import {TouchableOpacity} from 'react-native';

import {FavoriteProps} from '../../types/routes';
import {Container, Text} from './styles';

function Favorite({navigation}: FavoriteProps) {
  return (
    <Container>
      <Text>Favorite</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default Favorite;
