import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonOutlinedstyles as styles} from './ButtonOutlinedStyles';

const ButtonOutlined = ({text, onPress, color}: Props) => {
  const containerStyles = {
    borderColor: color,
  };
  const textStyles = {
    color: color,
  };
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, containerStyles]}
      onPress={onPress}>
      <Text style={[styles.buttonText, textStyles]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonOutlined;

type Props = {
  text: string;
  color?: string;
  onPress?: () => void;
};
