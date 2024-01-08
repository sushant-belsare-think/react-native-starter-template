import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {OnBoardingSecondScreenStyle} from '../styles/OnBoardingSecondScreenStyle';
import {ImagePath} from '../constants/ImagePathConstant';
import {String} from '../constants/String';
import TexComponent from '../Components/TextComponent/TextComponent';
import OnBoardingButton from '../Components/Button/OnBoardingButton';

const OnBoardingSecondScreen = (props: any) => {
  const secondClick = () => {
    props.next(2);
  };

  return (
    <View style={OnBoardingSecondScreenStyle.container}>
      <View style={OnBoardingSecondScreenStyle.imageView}>
      <TouchableOpacity activeOpacity={1}>
      <View style={{backgroundColor: 'rgba(255, 255, 255, 0.32)', borderRadius: 16}}>
        <Image
          source={ImagePath.onBoardingSecondImage}
          style={OnBoardingSecondScreenStyle.imageStyle}
        />
        </View>
        </TouchableOpacity>
        <View style={OnBoardingSecondScreenStyle.main}>
          <View style={OnBoardingSecondScreenStyle.unselectedDots} />
          <View style={OnBoardingSecondScreenStyle.selectedDot} />
          <View style={OnBoardingSecondScreenStyle.unselectedDots} />
        </View>
        <TexComponent
          headText={String.SecondheadText}
          normalText={String.SecondsubText}
        />
        <OnBoardingButton buttonName={String.NEXT} onClick={secondClick} />
      </View>
    </View>
  );
};

export default OnBoardingSecondScreen;
