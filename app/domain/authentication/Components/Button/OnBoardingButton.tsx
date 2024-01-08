import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {OnBoardingButtonStyle} from './OnBoardingButtonStyle';

const OnBoardingButton = ({buttonName, onClick}: Props) => {
  return (
    <View style={OnBoardingButtonStyle.rootView}>
      <TouchableOpacity
        onPress={onClick}
        style={OnBoardingButtonStyle.buttonStyle}>
        <Text style={OnBoardingButtonStyle.newButtonText}>{buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingButton;

type Props = {
  onClick: () => void;
  buttonName: string;
};
