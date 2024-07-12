import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  icon: string;
  containerStyle?: {};
}

const Input = ({ icon, containerStyle = {}, ...rest }: InputProps) => {
  return (
    <Container style={containerStyle}>
      <Icon name={icon} size={20} color={'#666360'} />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default Input;
