import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SignUpScreenStyle} from '../../styles/SignUpScreenStyle';
import {useNavigation} from '@react-navigation/native';
import {String} from '../../constants/String';
import { useAppDispatch } from '../../../../lib';
import { resetIsFromDeepLink } from '../../store/reducers/AuthReducer';

const SignUpFooter = ({normalText, touchableText, navigateTo , touchableHandle}: Props) => {
  const navigation = useNavigation();

   const dispatch = useAppDispatch()
  const touchHandle=()=>{
    if(navigateTo)
    {
      navigation.navigate(navigateTo)
    }
    else if(touchableHandle)
    {
      touchableHandle()
    }
    dispatch(resetIsFromDeepLink())
  }

  return (
    <View style={SignUpScreenStyle.signUpView}>
      <>
        <Text style={SignUpScreenStyle.signUpTextfirst}>{normalText}</Text>
      </>
      <>
        <TouchableOpacity onPress={touchHandle}>
          <Text style={SignUpScreenStyle.signUpTextSecond}>
            {touchableText}
          </Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default SignUpFooter;

type Props = {
  navigateTo?: string;
  normalText: string;
  touchableText: string;
  touchableHandle?: any;
};
