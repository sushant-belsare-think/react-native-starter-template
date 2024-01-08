import {View, Text, Modal, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontType} from '../../../../assets/fontType';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAppDispatch} from '../../../../lib';
import {cancleErrorComponent} from '../../store/reducers/AuthReducer';
import {transparent} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const ErrorComponent = ({isError, message, disableHandle, success, style}: any) => {
  const dispatch = useAppDispatch();

  const cancleModal = () => {
    disableHandle();
  };
  // console.log("hello" + message)

  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View
      style={[{
        paddingBottom: '15%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        flex: 1,
      },style && style]}>
      <View style={{backgroundColor: 'white', borderRadius: 10}}>
        <View
          style={{
            backgroundColor: success ? '#ddffdd' : '#DB565652',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'transparent',
            paddingVertical: 10,
            alignItems: 'center',
            paddingHorizontal: 20,
            flexDirection: 'row',
          }}>
          <Icon
            name={success ? 'checkcircle' : 'exclamationcircle'}
            size={15}
            color={success ? 'green' : '#DB5656'}
          />
          <Text
            style={{
              color: success ? 'green' : '#DB5656',
              fontFamily: fontType.outfit400,
            }}>
            {'  ' + message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ErrorComponent;
