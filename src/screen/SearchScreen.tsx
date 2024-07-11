import React from 'react';
import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';
import {SearchProps} from '../types/routes';

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
