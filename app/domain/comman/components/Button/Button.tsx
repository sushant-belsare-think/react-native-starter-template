import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({text, touchableStyle, textStyle, onpress}: Props) => {
  return (
    <TouchableOpacity onPress={onpress} style={touchableStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

type Props = {
  onpress: () => void;
  text: string;
  touchableStyle: object;
  textStyle: object;
};
