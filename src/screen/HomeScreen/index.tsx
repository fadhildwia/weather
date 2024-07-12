/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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
  ImageView,
  Main,
  Temperature,
  TemperatureText,
  Text,
} from './styles';

import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../../app.json';
import { capitalize } from '../../utils/capitalize';
import WorldMap from '../../assets/WorldMap/WorldMap.png';
import Icon from 'react-native-vector-icons/Ionicons';
import useWeatherData from '../../hooks/useWeatherData';
import weatherImage from '../../utils/weatherImages';
import useGetWeatherAll from '../../hooks/useGetWeatherAll';
import DailyData from '../../compnents/DailyData';

function Home() {
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

  const {
    data: weatherData,
    isLoading: loadingData,
    refetch: refetchWeatherData,
    isRefetching: loadingWeatherData,
  } = useWeatherData({
    latitude: location?.coords?.latitude as number | string,
    longitude: location?.coords?.longitude as number | string,
    options: {
      enabled:
        !!location && !!location.coords.latitude && !!location.coords.longitude,
    },
  });

  const { data: weatherAll, isLoading: loadingAll } = useGetWeatherAll({
    latitude: location?.coords?.latitude as number | string,
    longitude: location?.coords?.longitude as number | string,
    options: {
      enabled:
        !!location && !!location.coords.latitude && !!location.coords.longitude,
    },
  });

  const { daily } = weatherAll || {};
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysData: Array<string> = [];
  const tempData: Array<any> = [];

  daily?.forEach((e, index) => {
    if (index >= 1) {
      const dayIndex = new Date(e.dt * 1000).getUTCDay();
      daysData.push(days[dayIndex]);
      tempData.push(e.temp.day);
    }
  });

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
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
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

  return (
    <Container>
      <Header>
        <View>
          {weatherData && !loadingData && !loadingWeatherData && (
            <View style={{ flexDirection: 'row' }}>
              <HeaderLocation style={{ fontWeight: 'bold' }}>
                {weatherData.name},
              </HeaderLocation>
              <HeaderLocation> {weatherData.sys.country}</HeaderLocation>
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
          {weatherData?.main.temp && weatherData?.weather[0].description ? (
            <Temperature>
              <ImageView>
                {weatherData?.weather[0].icon && (
                  <Image
                    source={weatherImage(weatherData?.weather[0].icon)}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </ImageView>
              <Text>{capitalize(weatherData?.weather[0].description)}</Text>
              <TemperatureText>
                {weatherData?.main.temp.toFixed(0)}
                <TemperatureText style={{ color: '#FEEF0A' }}>
                  º
                </TemperatureText>
              </TemperatureText>
              {!loadingAll && daysData && tempData && (
                <DailyData dayData={daysData} tempData={tempData} />
              )}
              <TouchableOpacity onPress={() => refetchWeatherData()}>
                <Icon name="reload-circle" size={55} color="#FEEF0A" />
              </TouchableOpacity>
            </Temperature>
          ) : (
            <Temperature>
              <ActivityIndicator size="large" color="#ffffff" />
            </Temperature>
          )}

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
        </Main>
      </ImageBackground>
    </Container>
  );
}

export default Home;
