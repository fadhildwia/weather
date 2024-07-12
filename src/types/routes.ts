import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type BottomTabStackParamList = {
  Home: undefined;
  Search: undefined;
  Favorite: undefined;
};

export type RootStackParamList = {
  Detail: {
    city: string;
  };
  BottomTabNavigator: NavigatorScreenParams<BottomTabStackParamList>;
};

type HomeScreenNavigationProp = StackNavigationProp<
  BottomTabStackParamList,
  'Home'
>;

export type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

type SearchScreenNavigationProp = StackNavigationProp<
  BottomTabStackParamList,
  'Search'
>;

export type SearchProps = {
  navigation: SearchScreenNavigationProp;
};

type FavoriteScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export type FavoriteProps = {
  navigation: FavoriteScreenNavigationProp;
};

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

export type DetailProps = {
  navigation: DetailScreenNavigationProp;
  route: {
    params: {
      city: string;
    };
  };
};
