import React from 'react';
import {View} from 'react-native';
import OnBoardingFirstScreen from '../../screens/OnBoardingFirstScreen';
import OnBoardingSecondScreen from '../../screens/OnBoardingSecondScreen';
import OnBoardingThirdScreen from '../../screens/OnBoardingThirdScreen';

const CarouselWrapper = ({item, index, nextHandlee}: any) => {
  const nextHandle2 = (val: any) => {
    nextHandlee(val);
  };

  return (
    <View key={index} style={{flex: 1}}>
      {item === 'OnBoardingFirstScreen' && (
        <OnBoardingFirstScreen next={nextHandle2} />
      )}
      {item === 'OnBoardingSecondScreen' && (
        <OnBoardingSecondScreen next={nextHandle2} />
      )}
      {item === 'OnBoardingThirdScreen' && <OnBoardingThirdScreen />}
    </View>
  );
};

export default CarouselWrapper;
