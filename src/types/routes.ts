import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Favorite: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

export type SearchProps = {
  navigation: SearchScreenNavigationProp;
};

type FavoriteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorite'
>;

export type FavoriteProps = {
  navigation: FavoriteScreenNavigationProp;
};
