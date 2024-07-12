/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';

import { Container, Header, Main, Text } from './styles';
import WorldMap from '../../assets/WorldMap/WorldMap.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import {
  _retrieveLocalStorageItem,
  _storeLocalStorageItem,
} from '../../utils/localStorage';
import { capitalize } from '../../utils/capitalize';
import { FavoriteProps } from '../../types/routes';

const Favorite = ({ navigation }: FavoriteProps) => {
  const [favorite, setFavorite] = useState<any>();

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

  const handleRemoveFavorite = (key: string) => {
    const newFavorite = favorite.filter(
      (item: string) => item !== key.toLowerCase(),
    );

    _storeLocalStorageItem({
      storageKey: 'Favorite',
      storageValue: JSON.stringify(newFavorite),
    });
    setFavorite(newFavorite);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { city: item })}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {capitalize(item)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFavorite(item)}
        style={{ marginLeft: 10 }}>
        <Icon name="trash-bin" size={15} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
          <FlatList
            data={favorite}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </ImageBackground>
      </Main>
    </Container>
  );
};

export default Favorite;
