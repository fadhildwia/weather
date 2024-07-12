/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

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
import useWeatherDataByCity from '../../hooks/useWeatherByCity';
import WorldMap from '../../assets/WorldMap/WorldMap.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  _retrieveLocalStorageItem,
  _storeLocalStorageItem,
} from '../../utils/localStorage';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/routes';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

type DetailProps = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
};

const DetailScreen: React.FC<DetailProps> = ({ route }) => {
  const { city } = route.params;
  const [favorite, setFavorite] = useState<Array<string>>([]);

  const {
    mutate: searchCity,
    data: weatherData,
    error,
    isLoading: loadingData,
  } = useWeatherDataByCity();

  useFocusEffect(
    useCallback(() => {
      searchCity({ city });
      const retrieveLocalStorage = async () => {
        const favoriteLocalStorage = await _retrieveLocalStorageItem(
          'Favorite',
        );
        if (favoriteLocalStorage) {
          setFavorite(JSON.parse(favoriteLocalStorage));
        }
      };
      retrieveLocalStorage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const handleRemoveFavorite = () => {
    const newFavorite = favorite.filter(
      (item: string) => item !== city.toLowerCase(),
    );

    _storeLocalStorageItem({
      storageKey: 'Favorite',
      storageValue: JSON.stringify(newFavorite),
    });
    setFavorite(newFavorite);
  };

  return (
    <Container>
      <Header>
        <Text style={{ color: '#ffffff' }}>Search by City</Text>
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
          {!loadingData ? (
            <>
              {weatherData?.main.temp && weatherData?.weather[0].description ? (
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
                    <Text>
                      {capitalize(weatherData?.weather[0].description)}
                    </Text>
                    <TemperatureText>
                      {weatherData?.main.temp.toFixed(0)}
                      <TemperatureText style={{ color: '#FEEF0A' }}>
                        º
                      </TemperatureText>
                    </TemperatureText>
                    {favorite?.includes(city.toLowerCase()) ? (
                      <TouchableOpacity onPress={handleRemoveFavorite}>
                        <Icon name="close-circle" size={55} color="#f52a2a" />
                      </TouchableOpacity>
                    ) : null}
                  </Temperature>
                  <Footer>
                    {weatherData?.main && (
                      <>
                        <Text>
                          Min: {weatherData?.main.temp_min.toFixed(0)}
                          <Text style={{ color: '#FEEF0A' }}>º</Text>
                        </Text>
                        <Text>
                          Max: {weatherData?.main.temp_max.toFixed(0)}
                          <Text style={{ color: '#FEEF0A' }}>º</Text>
                        </Text>
                      </>
                    )}
                  </Footer>
                </Content>
              ) : (
                error && (
                  <Text style={{ marginBottom: 'auto' }}>Not Found Data</Text>
                )
              )}
            </>
          ) : (
            <ActivityContainer>
              <ActivityIndicator size="large" color="#FEEF0A" />
            </ActivityContainer>
          )}
        </ImageBackground>
      </Main>
    </Container>
  );
};

export default DetailScreen;
