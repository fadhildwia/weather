import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import WeatherData from '../../types/WeatherData';

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
} from './styles';
import weatherImage from '../../utils/weatherImages';
import { capitalize } from '../../utils/capitalize';

function Search() {
  const [weatherData] = useState<null | WeatherData>(null);
  const [loadingData] = useState(false);

  return (
    <Container>
      <Header>
        <Text>Search by City</Text>
      </Header>
      <Main>
        {!loadingData ? (
          <>
            {weatherData?.main.temp && weatherData?.weather[0].description && (
              <Content>
                <ImageView>
                  {weatherData?.weather[0].icon && (
                    <Image
                      source={weatherImage(weatherData?.weather[0].icon)}
                      style={{ width: 250, height: 250 }}
                    />
                  )}
                </ImageView>
                <Temperature>
                  <Text>
                    {weatherData.name}, {weatherData.sys.country}
                  </Text>
                  <Text>{capitalize(weatherData?.weather[0].description)}</Text>
                  <TemperatureText>
                    {weatherData?.main.temp.toFixed(0)}
                    <TemperatureText style={{ color: '#FEEF0A' }}>
                      º
                    </TemperatureText>
                  </TemperatureText>
                </Temperature>
              </Content>
            )}
          </>
        ) : (
          <ActivityContainer>
            <ActivityIndicator size="large" color={'#FEEF0A'} />
          </ActivityContainer>
        )}
      </Main>
    </Container>
  );
}

export default Search;
