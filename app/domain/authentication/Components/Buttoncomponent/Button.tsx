import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonStyles} from './ButtonStyles';

const Button = ({text, onPress, disabled}: Props) => {
  const buttonContainer = {
    // backgroundColor: !disabled ? '#D0D0D0' : '#0F9347',
    // borderColor: !disabled ? '#D0D0D0' : '#0F9347',
    backgroundColor: "#0F9347",
    borderColor: "#0F9347"
  };
  const buttonText = {
    color: disabled ? 'white' : 'white',
  };

  return (
    <TouchableOpacity
      style={[ButtonStyles.buttonContainer, buttonContainer]}
      onPress={onPress}
      // disabled={!disabled}
      >
      <Text style={[ButtonStyles.buttonText, buttonText]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean | Function;
};
