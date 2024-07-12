import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.View`
  width: 80%;
  height: 55px;
  padding: 0 16px;
  background: #2d2d2d;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: #000000;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #ffffff;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
