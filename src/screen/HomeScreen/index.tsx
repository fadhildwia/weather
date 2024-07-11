/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Container,
  Footer,
  Header,
  HeaderLocation,
  Main,
  Temperature,
  TemperatureText,
  Text,
} from './styles';

import Geolocation from 'react-native-geolocation-service';

import appConfig from '../../../app.json';
import {capitalize} from '../../utils/capitalize';

import WorldMap from '../../assets/WorldMap/WorldMap.png';
import Image01d from '../../assets/Weather/01d/01d.png';
import Image01n from '../../assets/Weather/01n/01n.png';
import Image09d from '../../assets/Weather/09d/09d.png';
import Image09n from '../../assets/Weather/09n/09n.png';
import Image10d from '../../assets/Weather/10d/10d.png';
import Image10n from '../../assets/Weather/10n/10n.png';
import Image11d from '../../assets/Weather/11d/11d.png';
import Image11n from '../../assets/Weather/11n/11n.png';
import Image13d from '../../assets/Weather/13d/13d.png';
import Image13n from '../../assets/Weather/13n/13n.png';
import Image0203d from '../../assets/Weather/0203d/0203d.png';
import Image0203n from '../../assets/Weather/0203n/0203n.png';
import Image0450 from '../../assets/Weather/0450/0450.png';

import {HomeProps} from '../../types/routes';
import useWeatherData from '../../hooks/useWeatherData';

function Home({navigation}: HomeProps) {
  const [location, setLocation] = useState<Geolocation.GeoPosition | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      if (await hasLocationPermission()) {
        getLocation();
      }
    })();
  }, []);

  useEffect(() => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      refetch();
    }
  }, [location]);

  const {
    data: weatherData,
    isLoading: loadingData,
    refetch,
  } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };

    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return await hasPermissionIOS();
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        setLocation(null);
        console.log(error, 'error');
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      },
    );
  };

  function renderImage(iconId: string) {
    switch (iconId) {
      case '01d':
        return Image01d;
      case '01n':
        return Image01n;
      case '02d':
        return Image0203d;
      case '02n':
        return Image0203n;
      case '03d':
        return Image0203d;
      case '03n':
        return Image0203n;
      case '04d':
        return Image0450;
      case '04n':
        return Image0450;
      case '09d':
        return Image09d;
      case '09n':
        return Image09n;
      case '10d':
        return Image10d;
      case '10n':
        return Image10n;
      case '11d':
        return Image11d;
      case '11n':
        return Image11n;
      case '13d':
        return Image13d;
      case '13n':
        return Image13n;
      case '50d':
        return Image0450;
      case '50n':
        return Image0450;

      default:
        break;
    }
  }

  console.log(weatherData);
  console.log('location', location);
  return (
    <Container>
      <Header>
        <View>
          {weatherData && (
            <View style={{flexDirection: 'row'}}>
              <HeaderLocation style={{fontWeight: 'bold'}}>
                {weatherData.timezone.split('/')[0]},
              </HeaderLocation>
              <HeaderLocation>
                {' '}
                {weatherData.timezone.split('/')?.[1]?.replace('_', ' ')}
              </HeaderLocation>
            </View>
          )}
        </View>
      </Header>

      <ImageBackground
        resizeMode="stretch"
        source={WorldMap}
        style={{
          width: '100%',
          height: '40%',
          flex: 1,
          alignItems: 'center',
        }}>
        <Main>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            {weatherData?.current.weather[0].icon && (
              <Image
                source={renderImage(weatherData?.current.weather[0].icon)}
                style={{width: 250, height: 250}}
              />
            )}
          </View>
          {!loadingData &&
          weatherData?.current.weather[0].description &&
          weatherData?.current.temp ? (
            <Temperature>
              <Text>
                {capitalize(weatherData?.current.weather[0].description)}
              </Text>
              <TemperatureText>
                {weatherData?.current.temp.toFixed(0)}
                <TemperatureText style={{color: '#FEEF0A'}}>º</TemperatureText>
              </TemperatureText>
            </Temperature>
          ) : (
            <Temperature>
              <ActivityIndicator size="large" color="#fff" />
            </Temperature>
          )}

          <TouchableOpacity
            style={{backgroundColor: '#333', padding: 10, borderRadius: 5}}
            onPress={() => refetch()}>
            <Text>Reload</Text>
          </TouchableOpacity>

          <Footer>
            <Text>Wind: {weatherData?.current.wind_speed} KM</Text>
          </Footer>
        </Main>
      </ImageBackground>
    </Container>
  );
}

export default Home;
