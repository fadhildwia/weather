/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator } from 'react-native';

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

const ValidationSchema = Yup.object({
  search: Yup.string().required('City name is required'),
});

const Search = () => {
  const {
    mutate: searchCity,
    data: weatherData,
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
        {!loadingData ? (
          weatherData?.main.temp && weatherData?.weather[0].description ? (
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
            <Text style={{ marginBottom: 'auto' }}>Not Found Data</Text>
          )
        ) : (
          <ActivityContainer>
            <ActivityIndicator size="large" color="#FEEF0A" />
          </ActivityContainer>
        )}
      </Main>
    </Container>
  );
};

export default Search;
