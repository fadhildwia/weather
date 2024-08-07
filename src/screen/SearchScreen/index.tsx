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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../../compnents/Input';
import useWeatherDataByCity from '../../hooks/useWeatherByCity';
import WorldMap from '../../assets/WorldMap/WorldMap.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  _retrieveLocalStorageItem,
  _storeLocalStorageItem,
} from '../../utils/localStorage';
import { useFocusEffect } from '@react-navigation/native';

const ValidationSchema = Yup.object({
  search: Yup.string().required('City name is required'),
});

const Search = () => {
  const [favorite, setFavorite] = useState<Array<string>>([]);

  const {
    mutate: searchCity,
    data: weatherData,
    error,
    isLoading: loadingData,
  } = useWeatherDataByCity();

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: async values => {
      searchCity({ city: values.search });
    },
  });

  useFocusEffect(
    useCallback(() => {
      const retrieveLocalStorage = async () => {
        const favoriteLocalStorage = await _retrieveLocalStorageItem(
          'Favorite',
        );
        if (favoriteLocalStorage) {
          setFavorite(JSON.parse(favoriteLocalStorage));
        }
      };
      retrieveLocalStorage();
    }, []),
  );

  const handleAddFavorite = () => {
    _storeLocalStorageItem({
      storageKey: 'Favorite',
      storageValue: JSON.stringify([
        ...favorite,
        formik.values.search.toLowerCase(),
      ]),
    });
    setFavorite([...favorite, formik.values.search.toLowerCase()]);
  };

  const handleRemoveFavorite = () => {
    const newFavorite = favorite.filter(
      (item: string) => item !== formik.values.search.toLowerCase(),
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
        <Input
          icon="search-location"
          placeholder="e.g., Yogyakarta"
          value={formik.values.search}
          onChangeText={value => formik.setFieldValue('search', value)}
          onSubmitEditing={() => formik.handleSubmit()}
        />
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
                    {favorite?.includes(formik.values.search.toLowerCase()) ? (
                      <TouchableOpacity onPress={handleRemoveFavorite}>
                        <Icon name="close-circle" size={55} color="#f52a2a" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={handleAddFavorite}>
                        <Icon name="add-circle" size={55} color="#FEEF0A" />
                      </TouchableOpacity>
                    )}
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

export default Search;
