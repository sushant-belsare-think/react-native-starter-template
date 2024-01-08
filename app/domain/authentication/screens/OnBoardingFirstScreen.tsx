import React from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {OnBoardingFirstScreenStyle} from '../styles/OnBoardingFirstScreenStyle';
import {Image} from 'react-native';
import {ImagePath} from '../constants/ImagePathConstant';
import {String} from '../constants/String';
import TexComponent from '../Components/TextComponent/TextComponent';
import OnBoardingButton from '../Components/Button/OnBoardingButton';
import {useNavigation} from '@react-navigation/native';
const OnBoardingFirstScreen = (props: any) => {
  const navigation = useNavigation();
  const firstClick = () => {
    // navigation.navigate('HomeScreen');
    props.next(1);
  };

  return (
    <View style={OnBoardingFirstScreenStyle.container}>
      <View style={OnBoardingFirstScreenStyle.imageView}>
        <TouchableOpacity activeOpacity={1}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.32)',
              borderRadius: 16,
            }}>
            <Image
              source={ImagePath.onBoardingFirstImage}
              style={OnBoardingFirstScreenStyle.imageStyle}
            />
          </View>
        </TouchableOpacity>
        <View style={OnBoardingFirstScreenStyle.main}>
          <View style={OnBoardingFirstScreenStyle.selectedDot} />
          <View style={OnBoardingFirstScreenStyle.unselectedDots} />
          <View style={OnBoardingFirstScreenStyle.unselectedDots} />
        </View>
        <TexComponent
          headText={String.FirstheadText}
          normalText={String.FirstsubText}
        />
        <OnBoardingButton buttonName={String.NEXT} onClick={firstClick} />
      </View>
    </View>
  );
};

export default OnBoardingFirstScreen;
