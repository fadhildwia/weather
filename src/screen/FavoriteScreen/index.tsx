/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';

import {
  ActivityContainer,
  Container,
  Header,
  ImageView,
  Image,
  Main,
  Temperature,
  TemperatureText,
  Text,
  Content,
  Footer,
} from './styles';
import weatherImage from '../../utils/weatherImages';
import { capitalize } from '../../utils/capitalize';
import WorldMap from '../../assets/WorldMap/WorldMap.png';

const Favorite = () => {
  return (
    <Container>
      <Header>
        <Text style={{ color: '#ffffff' }}>Favorite</Text>
      </Header>
      <Main>
        <ImageBackground
          resizeMode="stretch"
          source={WorldMap}
          style={{
            width: '100%',
            height: '40%',
            flex: 1,
            alignItems: 'center',
          }}>
        </ImageBackground>
      </Main>
    </Container>
  );
};

export default Favorite;
