import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {OnBoardingThirdScreenStyle} from '../styles/OnBoardingThirdScreenStyle';
import {ImagePath} from '../constants/ImagePathConstant';
import {String} from '../constants/String';
import TexComponent from '../Components/TextComponent/TextComponent';
import OnBoardingButton from '../Components/Button/OnBoardingButton';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../lib';
import {changeOrgainUserStatus} from '../store/reducers/AuthReducer';

const OnBoardingThirdScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const thirdClick = () => {
    navigation.navigate(String.SignIn);
    dispatch(changeOrgainUserStatus());
  };

  return (
    <>
      <View style={OnBoardingThirdScreenStyle.container}>
        <View style={OnBoardingThirdScreenStyle.subRoot}>
          <TouchableOpacity activeOpacity={1}>
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.32)',
                borderRadius: 16,
              }}>
              <Image
                source={ImagePath.onBoardingThirdImage}
                style={OnBoardingThirdScreenStyle.imageStyle}
              />
            </View>
          </TouchableOpacity>
          <View style={OnBoardingThirdScreenStyle.main}>
            <View style={OnBoardingThirdScreenStyle.unselectedDots} />
            <View style={OnBoardingThirdScreenStyle.unselectedDots} />
            <View style={OnBoardingThirdScreenStyle.selectedDot} />
          </View>
          <TexComponent
            headText={String.ThirdheadText}
            normalText={String.ThirdsubText}
          />
          <OnBoardingButton buttonName={String.SIGN_IN} onClick={thirdClick} />
        </View>
      </View>
    </>
  );
};

export default OnBoardingThirdScreen;
