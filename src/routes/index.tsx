import React from 'react';
import { RootStackParamList } from '../types/routes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../screen/DetailWeatherScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabNavigator"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'left',
            headerTitleAllowFontScaling: false,
            headerBackTitleVisible: false,
            headerShadowVisible: true,
            title: 'Detail',
            headerTintColor: '#ffffff',
            headerStyle: { backgroundColor: '#000000' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
