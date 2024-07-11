import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from '../types/routes';
import Home from '../screen/HomeScreen';
import Search from '../screen/SearchScreen';
import Favorite from '../screen/FavoriteScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
