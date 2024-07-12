import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #000000;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 10%;
  width: 100%;
`;

export const HeaderLocation = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const Main = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
`;

export const Temperature = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TemperatureText = styled.Text`
  color: #fff;
  font-size: 75px;
  text-align: center;
  font-weight: bold;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  height: 20%;
  width: 100%;
  align-items: center;
`;

export const ImageView = styled.View`
  width: 100%;
  align-items: center;
`;

export const Image = styled.Image`
  width: 250px;
  height: 250px;
`;

export const ReloadButton = styled.TouchableOpacity`
  margin-top: 20px;
`;
