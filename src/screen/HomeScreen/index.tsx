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
} from 'react-native';

import {
  Container,
  Header,
  Main,
  Temperature,
  TemperatureText,
  Text,
} from './styles';

import Geolocation from 'react-native-geolocation-service';

import appConfig from '../../../app.json';
import {capitalize} from '../../utils/capitalize';

import WorldMap from '../../assets/WorldMap/WorldMap.png';
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

  console.log('weatherData', weatherData)

  return (
    <Container>
      <Header />

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
          {!loadingData &&
          weatherData?.timezone &&
          weatherData?.current.temp ? (
            <Temperature>
              <Text>{capitalize(weatherData?.timezone)}</Text>
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
        </Main>
      </ImageBackground>
    </Container>
  );
}

export default Home;
