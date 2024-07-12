import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

const Input = ({ icon, containerStyle = {}, ...rest }: InputProps) => {
  return (
    <Container style={containerStyle} isFocused={true} isErrored={false}>
      <Icon name={icon} size={20} color={'#666360'} />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={''}
        onFocus={() => {}}
        onBlur={() => {}}
        onChangeText={() => {}}
        {...rest}
      />
    </Container>
  );
};

export default Input;
