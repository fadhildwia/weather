import React from 'react';
import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';
import {HomeProps} from '../types/routes';

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

function Home({navigation}: HomeProps) {
  return (
    <Container>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
        <Text>Favorite</Text>
      </TouchableOpacity>
    </Container>
  );
}

export default Home;
