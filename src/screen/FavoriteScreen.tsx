import React from 'react';
import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';
import {FavoriteProps} from '../types/routes';

export const Container = styled.View`
  background: #fff;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.Text`
  color: #000;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
`;

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
